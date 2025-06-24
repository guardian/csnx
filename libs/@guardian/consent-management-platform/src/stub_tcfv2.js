/* eslint-disable -- this is third party code */
/* istanbul ignore file */

/*
This code is the TCFv2 stub made available by Sourcepoint.

See the documentation on how to retrieve the latest version:
https://documentation.sourcepoint.com/implementation/web-implementation/multi-campaign-web-implementation#stub-file
*/

export const stub_tcfv2 = () => {
	!(function (t) {
		var e = {};
		function n(r) {
			if (e[r]) return e[r].exports;
			var o = (e[r] = { i: r, l: !1, exports: {} });
			return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
		}
		(n.m = t),
			(n.c = e),
			(n.d = function (t, e, r) {
				n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
			}),
			(n.r = function (t) {
				'undefined' != typeof Symbol &&
					Symbol.toStringTag &&
					Object.defineProperty(t, Symbol.toStringTag, {
						value: 'Module',
					}),
					Object.defineProperty(t, '__esModule', { value: !0 });
			}),
			(n.t = function (t, e) {
				if ((1 & e && (t = n(t)), 8 & e)) return t;
				if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
				var r = Object.create(null);
				if (
					(n.r(r),
					Object.defineProperty(r, 'default', {
						enumerable: !0,
						value: t,
					}),
					2 & e && 'string' != typeof t)
				)
					for (var o in t)
						n.d(
							r,
							o,
							function (e) {
								return t[e];
							}.bind(null, o),
						);
				return r;
			}),
			(n.n = function (t) {
				var e =
					t && t.__esModule
						? function () {
								return t.default;
							}
						: function () {
								return t;
							};
				return n.d(e, 'a', e), e;
			}),
			(n.o = function (t, e) {
				return Object.prototype.hasOwnProperty.call(t, e);
			}),
			(n.p = ''),
			n((n.s = 3));
	})([
		function (t, e, n) {
			var r = n(2);
			t.exports = !r(function () {
				return (
					7 !=
					Object.defineProperty({}, 'a', {
						get: function () {
							return 7;
						},
					}).a
				);
			});
		},
		function (t, e) {
			t.exports = function (t) {
				return 'object' == typeof t ? null !== t : 'function' == typeof t;
			};
		},
		function (t, e) {
			t.exports = function (t) {
				try {
					return !!t();
				} catch (t) {
					return !0;
				}
			};
		},
		function (t, e, n) {
			n(4),
				(function () {
					if ('function' != typeof window.__tcfapi) {
						var t,
							e = [],
							n = window,
							r = n.document;
						!n.__tcfapi &&
							(function t() {
								var e = !!n.frames.__tcfapiLocator;
								if (!e)
									if (r.body) {
										var o = r.createElement('iframe');
										(o.style.cssText = 'display:none'),
											(o.name = '__tcfapiLocator'),
											r.body.appendChild(o);
									} else setTimeout(t, 5);
								return !e;
							})() &&
							((n.__tcfapi = function () {
								for (
									var n = arguments.length, r = new Array(n), o = 0;
									o < n;
									o++
								)
									r[o] = arguments[o];
								if (!r.length) return e;
								if ('setGdprApplies' === r[0])
									r.length > 3 &&
										2 === parseInt(r[1], 10) &&
										'boolean' == typeof r[3] &&
										((t = r[3]), 'function' == typeof r[2] && r[2]('set', !0));
								else if ('ping' === r[0]) {
									var i = {
										gdprApplies: t,
										cmpLoaded: !1,
										apiVersion: '2.0',
									};
									'function' == typeof r[2] && r[2](i, !0);
								} else e.push(r);
							}),
							n.addEventListener(
								'message',
								function (t) {
									var e = 'string' == typeof t.data,
										r = {};
									try {
										r = e ? JSON.parse(t.data) : t.data;
									} catch (t) {}
									var o = r.__tcfapiCall;
									// WARNING
									// This function call has been modified from the provided Sourcepoint code.
									// The parameter order has been updated as the original function call was incorrect as per the TCF specification.
									// See:
									// - Required interface: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#how-does-the-cmp-provide-the-api
									// - Update to function: https://github.com/guardian/consent-management-platform/pull/561/commits/f6113f4a1f8fbe6cec5b4ea8e7b29b969fdb60f3#diff-b58313c0ab5f7b3c35c9d788a1e37e18c982fef7fb8a9b562d728163ffb8a8a1L152
									o &&
										n.__tcfapi(
											o.command,
											o.version,
											function (n, r) {
												var i = {
													__tcfapiReturn: {
														returnValue: n,
														success: r,
														callId: o.callId,
													},
												};
												e && (i = JSON.stringify(i)),
													t.source.postMessage(i, '*');
											},
											o.parameter,
										);
								},
								!1,
							));
					}
				})();
		},
		function (t, e, n) {
			var r = n(0),
				o = n(5).f,
				i = Function.prototype,
				c = i.toString,
				u = /^s*function ([^ (]*)/;
			r &&
				!('name' in i) &&
				o(i, 'name', {
					configurable: !0,
					get: function () {
						try {
							return c.call(this).match(u)[1];
						} catch (t) {
							return '';
						}
					},
				});
		},
		function (t, e, n) {
			var r = n(0),
				o = n(6),
				i = n(10),
				c = n(11),
				u = Object.defineProperty;
			e.f = r
				? u
				: function (t, e, n) {
						if ((i(t), (e = c(e, !0)), i(n), o))
							try {
								return u(t, e, n);
							} catch (t) {}
						if ('get' in n || 'set' in n)
							throw TypeError('Accessors not supported');
						return 'value' in n && (t[e] = n.value), t;
					};
		},
		function (t, e, n) {
			var r = n(0),
				o = n(2),
				i = n(7);
			t.exports =
				!r &&
				!o(function () {
					return (
						7 !=
						Object.defineProperty(i('div'), 'a', {
							get: function () {
								return 7;
							},
						}).a
					);
				});
		},
		function (t, e, n) {
			var r = n(8),
				o = n(1),
				i = r.document,
				c = o(i) && o(i.createElement);
			t.exports = function (t) {
				return c ? i.createElement(t) : {};
			};
		},
		function (t, e, n) {
			(function (e) {
				var n = function (t) {
					return t && t.Math == Math && t;
				};
				t.exports =
					n('object' == typeof globalThis && globalThis) ||
					n('object' == typeof window && window) ||
					n('object' == typeof self && self) ||
					n('object' == typeof e && e) ||
					Function('return this')();
			}).call(this, n(9));
		},
		function (t, e) {
			var n;
			n = (function () {
				return this;
			})();
			try {
				n = n || new Function('return this')();
			} catch (t) {
				'object' == typeof window && (n = window);
			}
			t.exports = n;
		},
		function (t, e, n) {
			var r = n(1);
			t.exports = function (t) {
				if (!r(t)) throw TypeError(String(t) + ' is not an object');
				return t;
			};
		},
		function (t, e, n) {
			var r = n(1);
			t.exports = function (t, e) {
				if (!r(t)) return t;
				var n, o;
				if (e && 'function' == typeof (n = t.toString) && !r((o = n.call(t))))
					return o;
				if ('function' == typeof (n = t.valueOf) && !r((o = n.call(t))))
					return o;
				if (!e && 'function' == typeof (n = t.toString) && !r((o = n.call(t))))
					return o;
				throw TypeError("Can't convert object to primitive value");
			};
		},
	]);
};
