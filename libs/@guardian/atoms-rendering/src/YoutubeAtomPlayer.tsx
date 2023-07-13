import type { Participations } from '@guardian/ab-core';
import type { AdsConfig } from '@guardian/commercial';
import {
	buildAdsConfigWithConsent,
	buildImaAdTagUrl,
	disabledAds,
} from '@guardian/commercial';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import { log } from '@guardian/libs';
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import type { google } from './ima';
import type { AdTargeting, VideoEventKey } from './types';
import type { PlayerListenerName } from './YouTubePlayer';
import { YouTubePlayer } from './YouTubePlayer';

export declare class ImaManager {
	constructor(
		player: YT.Player,
		id: string,
		adContainerId: string,
		makeAdsRequestCallback: (
			adsRequest: { adTagUrl: string },
			adsRenderingSettings: google.ima.AdsRenderingSettings,
		) => void,
	);
	getAdsLoader: () => google.ima.AdsLoader;
	getAdsManager: () => google.ima.AdsManager;
}

type Props = {
	uniqueId: string;
	videoId: string;
	adTargeting: AdTargeting;
	consentState: ConsentState;
	height: number;
	width: number;
	title?: string;
	origin?: string;
	eventEmitters: Array<(event: VideoEventKey) => void>;
	autoPlay: boolean;
	onReady: () => void;
	enableIma: boolean;
	pauseVideo: boolean;
	deactivateVideo: () => void;
	abTestParticipations: Participations;
};

type CustomPlayEventDetail = { videoId: string };
const customPlayEventName = 'video:play';

type ProgressEvents = {
	hasSentPlayEvent: boolean;
	hasSent25Event: boolean;
	hasSent50Event: boolean;
	hasSent75Event: boolean;
	hasSentEndEvent: boolean;
};

/**
 *  E.g.
 *  name: onReady, onStateChange, etc...
 *  listener: YT.PlayerEventHandler<PlayerEvent>, YT.PlayerEventHandler<OnStateChangeEvent>
 */
type PlayerListener<T extends PlayerListenerName> = {
	name: T;
	listener: NonNullable<YT.Events[T]>;
};

type PlayerListeners = Array<PlayerListener<PlayerListenerName>>;

/**
 * Given a YT.PlayerEventHandler, (e.g. PlayerEventHandler<OnStateChangeEvent>)
 * return its event type (e.g. OnStateChangeEvent)
 */
type ExtractEventType<T> = T extends YT.PlayerEventHandler<infer X> ? X : never;

const dispatchCustomPlayEvent = (uniqueId: string) => {
	document.dispatchEvent(
		new CustomEvent(customPlayEventName, {
			detail: { uniqueId },
		}),
	);
};

/**
 * ProgressEvents are a ref, see below
 */
const createOnStateChangeListener =
	(
		videoId: string,
		uniqueId: string,
		progressEvents: ProgressEvents,
		eventEmitters: Props['eventEmitters'],
	): YT.PlayerEventHandler<YT.OnStateChangeEvent> =>
	(event) => {
		const loggerFrom = 'YoutubeAtomPlayer onStateChange';
		log('dotcom', {
			from: loggerFrom,
			videoId,
			event,
		});

		/**
		 * event.target is the actual underlying YT player
		 */
		const player = event.target;

		if (event.data === YT.PlayerState.PLAYING) {
			/**
			 * Emit video play event so other components
			 * get aware when a video is played
			 */
			dispatchCustomPlayEvent(uniqueId);

			if (!progressEvents.hasSentPlayEvent) {
				log('dotcom', {
					from: loggerFrom,
					videoId,
					msg: 'start play',
					event,
				});
				eventEmitters.forEach((eventEmitter) => eventEmitter('play'));
				progressEvents.hasSentPlayEvent = true;

				/**
				 * Set a timeout to check progress again in the future
				 */
				setTimeout(() => {
					checkProgress();
				}, 3000);
			} else {
				log('dotcom', {
					from: loggerFrom,
					videoId,
					msg: 'resume',
					event,
				});
				eventEmitters.forEach((eventEmitter) => eventEmitter('resume'));
			}

			const checkProgress = () => {
				if (!player) return null;
				const currentTime = player?.getCurrentTime();
				const duration = player?.getDuration();

				if (!duration ?? !currentTime) return;

				const percentPlayed = (currentTime / duration) * 100;

				if (!progressEvents.hasSent25Event && 25 < percentPlayed) {
					log('dotcom', {
						from: loggerFrom,
						videoId,
						msg: 'played 25%',
						event,
					});
					eventEmitters.forEach((eventEmitter) => eventEmitter('25'));
					progressEvents.hasSent25Event = true;
				}

				if (!progressEvents.hasSent50Event && 50 < percentPlayed) {
					log('dotcom', {
						from: loggerFrom,
						videoId,
						msg: 'played 50%',
						event,
					});
					eventEmitters.forEach((eventEmitter) => eventEmitter('50'));
					progressEvents.hasSent50Event = true;
				}

				if (!progressEvents.hasSent75Event && 75 < percentPlayed) {
					log('dotcom', {
						from: loggerFrom,
						videoId,
						msg: 'played 75%',
						event,
					});
					eventEmitters.forEach((eventEmitter) => eventEmitter('75'));
					progressEvents.hasSent75Event = true;
				}

				const currentPlayerState = player?.getPlayerState();

				if (currentPlayerState !== YT.PlayerState.ENDED) {
					/**
					 * Set a timeout to check progress again in the future
					 */
					setTimeout(() => checkProgress(), 3000);
				}

				return null;
			};
		}

		if (event.data === YT.PlayerState.PAUSED) {
			log('dotcom', {
				from: loggerFrom,
				videoId,
				msg: 'pause',
				event,
			});
			eventEmitters.forEach((eventEmitter) => eventEmitter('pause'));
		}

		if (event.data === YT.PlayerState.CUED) {
			log('dotcom', {
				from: loggerFrom,
				videoId,
				msg: 'cued',
				event,
			});
			eventEmitters.forEach((eventEmitter) => eventEmitter('cued'));
			progressEvents.hasSentPlayEvent = false;
		}

		if (
			event.data === YT.PlayerState.ENDED &&
			!progressEvents.hasSentEndEvent
		) {
			log('dotcom', {
				from: loggerFrom,
				videoId,
				msg: 'ended',
				event,
			});
			eventEmitters.forEach((eventEmitter) => eventEmitter('end'));
			progressEvents.hasSentEndEvent = true;
			progressEvents.hasSentPlayEvent = false;
		}
	};

/**
 * returns an onReady listener
 */
const createOnReadyListener =
	(
		videoId: string,
		onReadyCallback: () => void,
		setPlayerReady: () => void,
		instantiateImaManager?: (player: YT.Player) => void,
	) =>
	(event: YT.PlayerEvent) => {
		log('dotcom', {
			from: 'YoutubeAtomPlayer onReady',
			videoId,
			msg: 'Ready',
			event,
		});
		/**
		 * Callback to notify YoutubeAtom that the player is ready
		 */
		onReadyCallback();

		/**
		 * Callback to set value of playerReady ref
		 */
		setPlayerReady();

		/**
		 * instantiate IMA manager if IMA enabled
		 */
		if (instantiateImaManager) {
			try {
				instantiateImaManager(event.target);
			} catch (e) {
				log('commercial', 'error instantiating IMA manager:', e);
			}
		}
	};

const createInstantiateImaManager =
	(
		uniqueId: string,
		id: string,
		adContainerId: string,
		adTargeting: AdTargeting | undefined,
		consentState: ConsentState,
		abTestParticipations: Participations,
		imaManager: React.MutableRefObject<ImaManager | undefined>,
		adsManager: React.MutableRefObject<google.ima.AdsManager | undefined>,
	) =>
	(player: YT.Player) => {
		const adTargetingEnabled = adTargeting && !adTargeting.disableAds;
		const adUnit =
			adTargetingEnabled && adTargeting.adUnit ? adTargeting.adUnit : '';
		const customParams =
			adTargetingEnabled && adTargeting.customParams
				? adTargeting.customParams
				: {};

		const makeAdsRequestCallback = (
			adsRequest: { adTagUrl: string },
			adsRenderingSettings: google.ima.AdsRenderingSettings,
		) => {
			adsRequest.adTagUrl = buildImaAdTagUrl({
				adUnit,
				customParams,
				consentState,
				clientSideParticipations: abTestParticipations,
			});
			if (window.google) {
				adsRenderingSettings.uiElements = [
					window.google.ima.UiElements.AdAttribution,
				];
			}
		};

		if (typeof window.YT.ImaManager !== 'undefined') {
			imaManager.current = new window.YT.ImaManager(
				player,
				id,
				adContainerId,
				makeAdsRequestCallback,
			);
			const adsLoader = imaManager.current.getAdsLoader();

			const onAdsManagerLoaded = () => {
				adsManager.current = imaManager.current?.getAdsManager();
				if (window.google) {
					adsManager.current?.addEventListener(
						window.google.ima.AdEvent.Type.Started,
						() => {
							dispatchCustomPlayEvent(uniqueId);
						},
					);
				}
			};

			if (window.google) {
				adsLoader.addEventListener(
					window.google.ima.AdsManagerLoadedEvent.Type.AdsManagerLoaded,
					onAdsManagerLoaded,
					false,
				);
			}
		} else {
			console.warn(
				'YT.ImaManager is undefined, probably because the youtube iframe_api script was fetched from ' +
					"a domain that isn't allow-listed (theguardian.com, thegulocal.com, gutools.co.uk). " +
					'If you are running an app locally, use dev-nginx to proxy one of these domains to localhost.',
			);
		}
	};

export const YoutubeAtomPlayer = ({
	uniqueId,
	videoId,
	adTargeting,
	consentState,
	height,
	width,
	title,
	origin,
	eventEmitters,
	autoPlay,
	onReady,
	enableIma,
	pauseVideo,
	deactivateVideo,
	abTestParticipations,
}: Props): JSX.Element => {
	/**
	 * useRef for player and progressEvents
	 * Provides mutable persistent state for the player across renders
	 * Does not cause re-renders on update
	 */
	const player = useRef<YouTubePlayer>();
	const progressEvents = useRef<ProgressEvents>({
		hasSentPlayEvent: false,
		hasSent25Event: false,
		hasSent50Event: false,
		hasSent75Event: false,
		hasSentEndEvent: false,
	});

	const [playerReady, setPlayerReady] = useState<boolean>(false);
	const playerReadyCallback = useCallback(() => setPlayerReady(true), []);
	const playerListeners = useRef<PlayerListeners>([]);
	/**
	 * A map ref with a key of eventname and a value of eventHandler
	 */
	const customListeners = useRef<
		Record<string, (event: CustomEventInit<CustomPlayEventDetail>) => void>
	>({});

	const imaManager = useRef<ImaManager>();
	const adsManager = useRef<google.ima.AdsManager>();

	const id = `youtube-video-${uniqueId}`;
	const imaAdContainerId = `ima-ad-container-${uniqueId}`;

	/**
	 * Initialise player useEffect
	 */
	useEffect(
		() => {
			if (!player.current) {
				log('dotcom', {
					from: 'YoutubeAtomPlayer initialise',
					videoId,
				});

				const adsConfig: AdsConfig =
					!adTargeting || adTargeting.disableAds || enableIma
						? disabledAds
						: buildAdsConfigWithConsent({
								adUnit: adTargeting.adUnit,
								clientSideParticipations: abTestParticipations,
								consentState,
								customParams: adTargeting.customParams,
								isAdFreeUser: false,
						  });

				const embedConfig = {
					relatedChannels: [],
					adsConfig,
					enableIma,
					/**
					 * YouTube recommends disabling related videos when IMA is enabled
					 */
					disableRelatedVideos: enableIma,
				};

				const instantiateImaManager = enableIma
					? createInstantiateImaManager(
							uniqueId,
							id,
							imaAdContainerId,
							adTargeting,
							consentState,
							abTestParticipations,
							imaManager,
							adsManager,
					  )
					: undefined;

				const onReadyListener = createOnReadyListener(
					videoId,
					onReady,
					playerReadyCallback,
					instantiateImaManager,
				);

				const onStateChangeListener = createOnStateChangeListener(
					videoId,
					uniqueId,
					progressEvents.current,
					eventEmitters,
				);

				player.current = new YouTubePlayer(id, {
					height,
					width,
					videoId,
					playerVars: {
						modestbranding: 1,
						origin,
						playsinline: 1,
						rel: 0,
					},
					embedConfig,
					events: {
						onReady: onReadyListener,
						onStateChange: onStateChangeListener,
					},
				});

				/**
				 * Pause the current video when another video is played
				 */
				const handleCustomPlayEvent = (
					event: CustomEventInit<CustomPlayEventDetail>,
				) => {
					if (event instanceof CustomEvent) {
						const playedVideoId = event.detail.uniqueId;
						const thisVideoId = uniqueId;
						if (playedVideoId !== thisVideoId) {
							const playerStatePromise = player.current?.getPlayerState();
							playerStatePromise?.then((playerState) => {
								if (playerState && playerState === YT.PlayerState.PLAYING) {
									player.current?.pauseVideo();
								}
							});
							// pause ima ads playing on other videos
							adsManager.current?.pause();
							// mark player as inactive
							deactivateVideo();
						}
					}
				};

				/**
				 * add listener for custom play event
				 */
				document.addEventListener(customPlayEventName, handleCustomPlayEvent);

				customListeners.current[customPlayEventName] = handleCustomPlayEvent;

				playerListeners.current.push(
					{ name: 'onReady', listener: onReadyListener },
					{ name: 'onStateChange', listener: onStateChangeListener },
				);
			}
		},
		/**
		 * useEffect dependencies are mostly static but added to array for correctness
		 */
		[
			adTargeting,
			autoPlay,
			consentState,
			eventEmitters,
			height,
			onReady,
			origin,
			videoId,
			width,
			enableIma,
		],
	);

	/**
	 * Autoplay useEffect
	 */
	useEffect(() => {
		if (playerReady && autoPlay) {
			/**
			 * Autoplay is determined by the parent
			 * Typically true when there is a preceding overlay
			 */
			log('dotcom', {
				from: 'YoutubeAtomPlayer autoplay',
				videoId,
				msg: 'Playing video',
			});
			player.current?.playVideo();
		}
	}, [playerReady, autoPlay]);

	/**
	 * Player pause useEffect
	 */
	useEffect(() => {
		/**
		 * if the 'pauseVideo' prop is true this should pause the video
		 *
		 * 'pauseVideo' is controlled by the close sticky video button
		 */
		if (pauseVideo) {
			player.current?.pauseVideo();
		}
	}, [pauseVideo]);

	/**
	 * Unregister listeners useLayoutEffect
	 */
	useLayoutEffect(() => {
		/**
		 * Unregister listeners before component unmount
		 *
		 * An empty dependency array will call its cleanup on unmount.
		 *
		 * Use useLayoutEffect to ensure the cleanup function is run
		 * before the component is removed from the DOM. Usually clean up
		 * functions will run after the render and commit phase.
		 *
		 * If we attempt to unregister listeners after the component is
		 * removed from the DOM the YouTube API logs a warning to the console.
		 */
		return () => {
			playerListeners.current.forEach((playerListener) => {
				type T = ExtractEventType<typeof playerListener.name>;
				player.current?.removeEventListener<T>(
					playerListener.name,
					playerListener.listener,
				);
			});

			Object.entries(customListeners.current).forEach(
				([eventName, eventHandler]) => {
					document.removeEventListener(eventName, eventHandler);
				},
			);
		};
	}, []);

	/**
	 * An element for the YouTube iFrame to hook into the dom
	 */
	return (
		<>
			<div
				id={id}
				data-atom-id={id}
				data-testid={id}
				data-atom-type="youtube"
				title={title}
			></div>
			{enableIma && (
				<div id={imaAdContainerId} data-atom-type="ima-ad-container"></div>
			)}
		</>
	);
};
