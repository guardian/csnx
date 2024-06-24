/* eslint-disable -- this is third party code */
/* istanbul ignore file */
// Reference : https://docs.sourcepoint.com/hc/en-us/articles/18007731422099-Enable-GPP-Multi-State-Privacy-String-MSPS-with-U-S-Privacy-CCPA-solution
export const stub_gpp_ccpa = () => {
	(window.__gpp_addFrame = function (e) {
		if (!window.frames[e]) {
			if (document.body) {
				var t = document.createElement('iframe');
				(t.style.cssText = 'display:none'),
					(t.name = e),
					document.body.appendChild(t);
			} else window.setTimeout(window.__gpp_addFrame, 10, e);
		}
	}),
		(window.__gpp_stub = function () {
			var e = arguments;
			if (
				((__gpp.queue = __gpp.queue || []),
				(__gpp.events = __gpp.events || []),
				!e.length || (1 == e.length && 'queue' == e[0]))
			) {
				return __gpp.queue;
			}
			if (1 == e.length && 'events' == e[0]) return __gpp.events;
			var t = e[0],
				p = e.length > 1 ? e[1] : null,
				n = e.length > 2 ? e[2] : null;
			if ('ping' === t) {
				return {
					gppVersion: '1.0',
					cmpStatus: 'stub',
					cmpDisplayStatus: 'hidden',
					supportedAPIs: ['tcfeuv2', 'tcfcav2', 'uspv1'],
					cmpId: 31,
				};
			}
			if ('addEventListener' === t) {
				'lastId' in __gpp || (__gpp.lastId = 0), __gpp.lastId++;
				var a = __gpp.lastId;
				return (
					__gpp.events.push({ id: a, callback: p, parameter: n }),
					{
						eventName: 'listenerRegistered',
						listenerId: a,
						data: !0,
						pingData: {
							gppVersion: '1.0',
							cmpStatus: 'stub',
							cmpDisplayStatus: 'hidden',
							supportedAPIs: ['tcfeuv2', 'tcfva', 'usnat'],
							cmpId: 31,
						},
					}
				);
			}
			if ('removeEventListener' === t) {
				for (var s = !1, i = 0; i < __gpp.events.length; i++) {
					if (__gpp.events[i].id == n) {
						__gpp.events.splice(i, 1), (s = !0);
						break;
					}
				}
				return {
					eventName: 'listenerRemoved',
					listenerId: n,
					data: s,
					pingData: {
						gppVersion: '1.0',
						cmpStatus: 'stub',
						cmpDisplayStatus: 'hidden',
						supportedAPIs: ['tcfeuv2', 'tcfva', 'usnat'],
						cmpId: 31,
					},
				};
			}
			return 'getGPPData' === t
				? {
						sectionId: 3,
						gppVersion: 1,
						sectionList: [],
						applicableSections: [0],
						gppString: '',
						pingData: {
							gppVersion: '1.0',
							cmpStatus: 'stub',
							cmpDisplayStatus: 'hidden',
							supportedAPIs: ['tcfeuv2', 'tcfva', 'usnat'],
							cmpId: 31,
						},
					}
				: 'hasSection' === t || 'getSection' === t || 'getField' === t
					? null
					: void __gpp.queue.push([].slice.apply(e));
		}),
		(window.__gpp_msghandler = function (e) {
			var t = 'string' == typeof e.data;
			try {
				var p = t ? JSON.parse(e.data) : e.data;
			} catch (e) {
				p = null;
			}
			if ('object' == typeof p && null !== p && '__gppCall' in p) {
				var n = p.__gppCall;
				window.__gpp(
					n.command,
					function (p, a) {
						var s = {
							__gppReturn: {
								returnValue: p,
								success: a,
								callId: n.callId,
							},
						};
						e.source.postMessage(t ? JSON.stringify(s) : s, '*');
					},
					'parameter' in n ? n.parameter : null,
					'version' in n ? n.version : 1,
				);
			}
		}),
		('__gpp' in window && 'function' == typeof window.__gpp) ||
			((window.__gpp = window.__gpp_stub),
			window.addEventListener('message', window.__gpp_msghandler, !1),
			window.__gpp_addFrame('__gppLocator'));
};
