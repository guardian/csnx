/* eslint-disable -- this is third party code */
/* istanbul ignore file */

/*
This code is the CCPA stub made available by Sourcepoint.

See the documentation on how to retrieve the latest version:
https://documentation.sourcepoint.com/implementation/web-implementation/multi-campaign-web-implementation#stub-file
*/

export const stub_ccpa = () => {
	(function () {
		var e = false;
		var c = window;
		var t = document;
		function r() {
			if (!c.frames['__uspapiLocator']) {
				if (t.body) {
					var a = t.body;
					var e = t.createElement('iframe');
					e.style.cssText = 'display:none';
					e.name = '__uspapiLocator';
					a.appendChild(e);
				} else {
					setTimeout(r, 5);
				}
			}
		}
		r();
		function p() {
			var a = arguments;
			__uspapi.a = __uspapi.a || [];
			if (!a.length) {
				return __uspapi.a;
			} else if (a[0] === 'ping') {
				a[2]({ gdprAppliesGlobally: e, cmpLoaded: false }, true);
			} else {
				__uspapi.a.push([].slice.apply(a));
			}
		}
		function l(t) {
			var r = typeof t.data === 'string';
			try {
				var a = r ? JSON.parse(t.data) : t.data;
				if (a.__cmpCall) {
					var n = a.__cmpCall;
					c.__uspapi(n.command, n.parameter, function (a, e) {
						var c = {
							__cmpReturn: {
								returnValue: a,
								success: e,
								callId: n.callId,
							},
						};
						t.source.postMessage(r ? JSON.stringify(c) : c, '*');
					});
				}
			} catch (a) {}
		}
		if (typeof __uspapi !== 'function') {
			c.__uspapi = p;
			__uspapi.msgHandler = l;
			c.addEventListener('message', l, false);
		}
	})();
};
