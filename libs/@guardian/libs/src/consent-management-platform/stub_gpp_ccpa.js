/* eslint-disable -- this is third party code */
/* istanbul ignore file */
// Reference : https://docs.sourcepoint.com/hc/en-us/articles/18007731422099-Enable-GPP-Multi-State-Privacy-String-MSPS-with-U-S-Privacy-CCPA-solution
export const stub_gpp_ccpa = () => {
	(window.__gpp_addFrame = function (e) {
		if (!window.frames[e])
			if (document.body) {
				var t = document.createElement('iframe');
				(t.style.cssText = 'display:none'),
					(t.name = e),
					document.body.appendChild(t);
			} else window.setTimeout(window.__gpp_addFrame, 10, e);
	}),
		(window.__gpp_stub = function () {
			var e = arguments;
			if (
				((__gpp.queue = __gpp.queue || []),
				(__gpp.events = __gpp.events || []),
				!e.length || (1 == e.length && 'queue' == e[0]))
			)
				return __gpp.queue;
			if (1 == e.length && 'events' == e[0]) return __gpp.events;
			var t = e[0],
				p = e.length > 1 ? e[1] : null,
				s = e.length > 2 ? e[2] : null;
			if ('ping' === t)
				p(
					{
						gppVersion: '1.1',
						cmpStatus: 'stub',
						cmpDisplayStatus: 'hidden',
						signalStatus: 'not ready',
						supportedAPIs: [
							'2:tcfeuv2',
							'5:tcfcav1',
							'6:uspv1',
							'7:usnatv1',
							'8:uscav1',
							'9:usvav1',
							'10:uscov1',
							'11:usutv1',
							'12:usctv1',
						],
						cmpId: 0,
						sectionList: [],
						applicableSections: [],
						gppString: '',
						parsedSections: {},
					},
					!0,
				);
			else if ('addEventListener' === t) {
				'lastId' in __gpp || (__gpp.lastId = 0), __gpp.lastId++;
				var n = __gpp.lastId;
				__gpp.events.push({ id: n, callback: p, parameter: s }),
					p(
						{
							eventName: 'listenerRegistered',
							listenerId: n,
							data: !0,
							pingData: {
								gppVersion: '1.1',
								cmpStatus: 'stub',
								cmpDisplayStatus: 'hidden',
								signalStatus: 'not ready',
								supportedAPIs: [
									'2:tcfeuv2',
									'5:tcfcav1',
									'6:uspv1',
									'7:usnatv1',
									'8:uscav1',
									'9:usvav1',
									'10:uscov1',
									'11:usutv1',
									'12:usctv1',
								],
								cmpId: 0,
								sectionList: [],
								applicableSections: [],
								gppString: '',
								parsedSections: {},
							},
						},
						!0,
					);
			} else if ('removeEventListener' === t) {
				for (var a = !1, i = 0; i < __gpp.events.length; i++)
					if (__gpp.events[i].id == s) {
						__gpp.events.splice(i, 1), (a = !0);
						break;
					}
				p(
					{
						eventName: 'listenerRemoved',
						listenerId: s,
						data: a,
						pingData: {
							gppVersion: '1.1',
							cmpStatus: 'stub',
							cmpDisplayStatus: 'hidden',
							signalStatus: 'not ready',
							supportedAPIs: [
								'2:tcfeuv2',
								'5:tcfcav1',
								'6:uspv1',
								'7:usnatv1',
								'8:uscav1',
								'9:usvav1',
								'10:uscov1',
								'11:usutv1',
								'12:usctv1',
							],
							cmpId: 0,
							sectionList: [],
							applicableSections: [],
							gppString: '',
							parsedSections: {},
						},
					},
					!0,
				);
			} else
				'hasSection' === t
					? p(!1, !0)
					: 'getSection' === t || 'getField' === t
						? p(null, !0)
						: __gpp.queue.push([].slice.apply(e));
		}),
		(window.__gpp_msghandler = function (e) {
			var t = 'string' == typeof e.data;
			try {
				var p = t ? JSON.parse(e.data) : e.data;
			} catch (e) {
				p = null;
			}
			if ('object' == typeof p && null !== p && '__gppCall' in p) {
				var s = p.__gppCall;
				window.__gpp(
					s.command,
					function (p, n) {
						var a = {
							__gppReturn: {
								returnValue: p,
								success: n,
								callId: s.callId,
							},
						};
						e.source.postMessage(t ? JSON.stringify(a) : a, '*');
					},
					'parameter' in s ? s.parameter : null,
					'version' in s ? s.version : '1.1',
				);
			}
		}),
		('__gpp' in window && 'function' == typeof window.__gpp) ||
			((window.__gpp = window.__gpp_stub),
			window.addEventListener('message', window.__gpp_msghandler, !1),
			window.__gpp_addFrame('__gppLocator'));
};
