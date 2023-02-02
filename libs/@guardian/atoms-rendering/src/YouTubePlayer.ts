import type { AdsConfig } from '@guardian/commercial-core';
import { log } from '@guardian/libs';
import { loadYouTubeAPI } from './loadYouTubeIframeApi';

type EmbedConfig = {
	embedConfig: {
		relatedChannels: string[];
		adsConfig: AdsConfig;
		enableIma: boolean;
	};
};

type PlayerOptions = YT.PlayerOptions & EmbedConfig;

// PlayerEvent, OnStateChangeEvent, etc.
export type PlayerListenerName = keyof YT.Events;

class YouTubePlayer {
	playerPromise: Promise<YT.Player>;
	private _player?: YT.Player;

	constructor(id: string, playerOptions: PlayerOptions) {
		this.playerPromise = this.setPlayer(id, playerOptions);
	}

	private async setPlayer(id: string, playerOptions: PlayerOptions) {
		const YTAPI = await loadYouTubeAPI(playerOptions.embedConfig.enableIma);
		const playerPromise = new Promise<YT.Player>((resolve, reject) => {
			try {
				this._player = new YTAPI.Player(id, playerOptions);
				resolve(this._player);
			} catch (e) {
				this.logError(e as Error);
				reject(e);
			}
		});
		return playerPromise;
	}

	private logError(e: Error) {
		log('dotcom', `YouTubePlayer failed to load: ${e.message}`);
	}

	getPlayerState(): Promise<YT.PlayerState | void> {
		return this.playerPromise
			.then((player) => {
				return player.getPlayerState();
			})
			.catch(this.logError);
	}

	playVideo(): Promise<void> {
		return this.playerPromise
			.then((player) => {
				player.playVideo();
			})
			.catch(this.logError);
	}

	pauseVideo(): Promise<void> {
		return this.playerPromise
			.then((player) => {
				player.pauseVideo();
			})
			.catch(this.logError);
	}

	stopVideo(): Promise<void> {
		return this.playerPromise
			.then((player) => {
				player.stopVideo();
			})
			.catch(this.logError);
	}

	removeEventListener<T extends YT.PlayerEvent>(
		eventName: PlayerListenerName,
		listener: YT.PlayerEventHandler<T>,
	): void {
		/**
		 * If the YouTube API hasn't finished loading,
		 * this._player may be undefined in which case removeEventListener
		 * will fail silently.
		 */
		this._player?.removeEventListener<T>(eventName, listener);
	}
}

export { YouTubePlayer };
