'use strict';
var Kv = Object.create;
var Hi = Object.defineProperty;
var Yv = Object.getOwnPropertyDescriptor;
var Jv = Object.getOwnPropertyNames;
var Zv = Object.getPrototypeOf,
	Qv = Object.prototype.hasOwnProperty;
var B = (r, e) => () => (r && (e = r((r = 0))), e);
var E = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports),
	At = (r, e) => {
		for (var t in e) Hi(r, t, { get: e[t], enumerable: !0 });
	},
	Vf = (r, e, t, n) => {
		if ((e && typeof e == 'object') || typeof e == 'function')
			for (let i of Jv(e))
				!Qv.call(r, i) &&
					i !== t &&
					Hi(r, i, {
						get: () => e[i],
						enumerable: !(n = Yv(e, i)) || n.enumerable,
					});
		return r;
	};
var Wr = (r, e, t) => (
		(t = r != null ? Kv(Zv(r)) : {}),
		Vf(
			e || !r || !r.__esModule
				? Hi(t, 'default', { value: r, enumerable: !0 })
				: t,
			r,
		)
	),
	_e = (r) => Vf(Hi({}, '__esModule', { value: !0 }), r);
function Wf() {
	return (
		process.env.CI === 'true' ||
		process.env.TF_BUILD === 'true' ||
		process.env.GITHUB_ACTIONS === 'true' ||
		process.env.BUILDKITE === 'true' ||
		process.env.CIRCLECI === 'true' ||
		process.env.CIRRUS_CI === 'true' ||
		process.env.TRAVIS === 'true' ||
		!!process.env['bamboo.buildKey'] ||
		!!process.env.CODEBUILD_BUILD_ID ||
		!!process.env.GITLAB_CI ||
		!!process.env.HEROKU_TEST_RUN_ID ||
		!!process.env.BUILD_ID ||
		!!process.env.BUILD_BUILDID ||
		!!process.env.TEAMCITY_VERSION
	);
}
var Xf = B(() => {
	'use strict';
});
var zi = E((gA, Yf) => {
	'use strict';
	var aa = Symbol('singleComment'),
		Kf = Symbol('multiComment'),
		eb = () => '',
		tb = (r, e, t) => r.slice(e, t).replace(/\S/g, ' '),
		rb = (r, e) => {
			let t = e - 1,
				n = 0;
			for (; r[t] === '\\'; ) (t -= 1), (n += 1);
			return !!(n % 2);
		};
	Yf.exports = (r, e = {}) => {
		if (typeof r != 'string')
			throw new TypeError(
				`Expected argument \`jsonString\` to be a \`string\`, got \`${typeof r}\``,
			);
		let t = e.whitespace === !1 ? eb : tb,
			n = !1,
			i = !1,
			s = 0,
			o = '';
		for (let a = 0; a < r.length; a++) {
			let c = r[a],
				l = r[a + 1];
			if ((!i && c === '"' && (rb(r, a) || (n = !n)), !n)) {
				if (!i && c + l === '//') (o += r.slice(s, a)), (s = a), (i = aa), a++;
				else if (
					i === aa &&
					c + l ===
						`\r
`
				) {
					a++, (i = !1), (o += t(r, s, a)), (s = a);
					continue;
				} else if (
					i === aa &&
					c ===
						`
`
				)
					(i = !1), (o += t(r, s, a)), (s = a);
				else if (!i && c + l === '/*') {
					(o += r.slice(s, a)), (s = a), (i = Kf), a++;
					continue;
				} else if (i === Kf && c + l === '*/') {
					a++, (i = !1), (o += t(r, s, a + 1)), (s = a + 1);
					continue;
				}
			}
		}
		return o + (i ? t(r.slice(s)) : r.slice(s));
	};
});
var Jf = {};
At(Jf, {
	configureLightClientRequire: () => nb,
	configuredPaths: () => zn,
	lightClientRequire: () => ne,
});
function nb(r) {
	(zn = r),
		(ne = function (e) {
			if (zn.length === 0)
				throw new Error(
					'Light client require must have paths configured with `configureLightClientRequire`.',
				);
			let t;
			try {
				t = require.resolve(e, { paths: r });
			} catch (n) {
				throw (
					(process.env.NX_VERBOSE_LOGGING === 'true' &&
						console.error(
							`Was not able to require.resolve module ${e} from the following paths: ${r}. This may be expected.`,
						),
					n)
				);
			}
			try {
				return require(t);
			} catch (n) {
				throw (
					(process.env.NX_VERBOSE_LOGGING === 'true' &&
						console.error(
							`Was not able require module ${e} from path ${t}. This may be expected. `,
						),
					n)
				);
			}
		});
}
var ne,
	zn,
	Xr = B(() => {
		'use strict';
		zn = [];
	});
var J = E((vr) => {
	'use strict';
	Xr();
	try {
		try {
			let { output: r } = ne('nx/src/utils/output'),
				e;
			try {
				e = ne('nx/src/utils/app-root').workspaceRoot;
			} catch {
				e = ne('nx/src/utils/workspace-root').workspaceRoot;
			}
			(vr.workspaceRoot = e), (vr.output = r);
		} catch {
			let { output: e } = ne('@nrwl/workspace/src/utilities/output'),
				{ appRootPath: t } = ne('@nrwl/tao/src/utils/app-root');
			(vr.workspaceRoot = t), (vr.output = e);
		}
	} catch {
		let e = (t) => {
			var n;
			return `${t.title}

${
	(n = t.bodyLines) == null
		? void 0
		: n.join(`
`)
}`;
		};
		(vr.output = {
			note: (t) => console.info(e(t)),
			error: (t) => console.error(e(t)),
			warn: (t) => console.warn(e(t)),
			success: (t) => console.log(e(t)),
			addVerticalSeparator: () => '',
			addNewline: () =>
				console.log(`
`),
		}),
			(vr.workspaceRoot = process.cwd());
	}
});
function et() {
	var n, i;
	let r = JSON.parse(ib((0, Zf.readFileSync)(`${sb}/nx.json`).toString())),
		e = {},
		t = [];
	for (let s in r.targetDefaults) r.targetDefaults[s].cache && t.push(s);
	return (
		r.nxCloudAccessToken &&
			(e.accessToken ?? (e.accessToken = r.nxCloudAccessToken)),
		r.nxCloudUrl && (e.url ?? (e.url = r.nxCloudUrl)),
		r.nxCloudEncryptionKey && (e.encryptionKey = r.nxCloudEncryptionKey),
		r.parallel && (e.parallel ?? (e.parallel = r.parallel)),
		r.cacheDirectory &&
			(e.cacheDirectory ?? (e.cacheDirectory = r.cacheDirectory)),
		t.length && (e.cacheableOperations ?? (e.cacheableOperations = t)),
		{
			nxJson: r,
			nxCloudOptions: {
				...e,
				...((i = (n = r.tasksRunnerOptions) == null ? void 0 : n.default) ==
				null
					? void 0
					: i.options),
			},
		}
	);
}
var Zf,
	ib,
	sb,
	br = B(() => {
		'use strict';
		(Zf = require('fs')), (ib = zi()), ({ workspaceRoot: sb } = J());
	});
function Kr() {
	let { nxCloudOptions: r } = et();
	return !r.url || r.useLatestApi
		? !1
		: r.url.endsWith('snapshot.nx.app')
		? !0
		: !(r.url.endsWith('.nx.app') || r.url.indexOf('localhost') > -1);
}
var ca = B(() => {
	'use strict';
	br();
});
var rh = E((RA, ua) => {
	var ob = require('fs'),
		Qf = require('path'),
		ab = require('os');
	function eh(r) {
		console.log(`[dotenv][DEBUG] ${r}`);
	}
	var cb = `
`,
		ub = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,
		lb = /\\n/g,
		fb = /\r\n|\n|\r/;
	function th(r, e) {
		let t = !!(e && e.debug),
			n = {};
		return (
			r
				.toString()
				.split(fb)
				.forEach(function (i, s) {
					let o = i.match(ub);
					if (o != null) {
						let a = o[1],
							c = o[2] || '',
							l = c.length - 1,
							u = c[0] === '"' && c[l] === '"';
						(c[0] === "'" && c[l] === "'") || u
							? ((c = c.substring(1, l)), u && (c = c.replace(lb, cb)))
							: (c = c.trim()),
							(n[a] = c);
					} else t && eh(`did not match key and value when parsing line ${s + 1}: ${i}`);
				}),
			n
		);
	}
	function hb(r) {
		return r[0] === '~' ? Qf.join(ab.homedir(), r.slice(1)) : r;
	}
	function db(r) {
		let e = Qf.resolve(process.cwd(), '.env'),
			t = 'utf8',
			n = !1;
		r &&
			(r.path != null && (e = hb(r.path)),
			r.encoding != null && (t = r.encoding),
			r.debug != null && (n = !0));
		try {
			let i = th(ob.readFileSync(e, { encoding: t }), { debug: n });
			return (
				Object.keys(i).forEach(function (s) {
					Object.prototype.hasOwnProperty.call(process.env, s)
						? n &&
						  eh(
								`"${s}" is already defined in \`process.env\` and will not be overwritten`,
						  )
						: (process.env[s] = i[s]);
				}),
				{ parsed: i }
			);
		} catch (i) {
			return { error: i };
		}
	}
	ua.exports.config = db;
	ua.exports.parse = th;
});
var nh = E((Vn, la) => {
	(function (r, e) {
		typeof Vn == 'object' && typeof la == 'object'
			? (la.exports = e(require('child_process'), require('crypto')))
			: typeof define == 'function' && define.amd
			? define(['child_process', 'crypto'], e)
			: typeof Vn == 'object'
			? (Vn['electron-machine-id'] = e(
					require('child_process'),
					require('crypto'),
			  ))
			: (r['electron-machine-id'] = e(r.child_process, r.crypto));
	})(Vn, function (r, e) {
		return (function (t) {
			function n(s) {
				if (i[s]) return i[s].exports;
				var o = (i[s] = { exports: {}, id: s, loaded: !1 });
				return (
					t[s].call(o.exports, o, o.exports, n), (o.loaded = !0), o.exports
				);
			}
			var i = {};
			return (n.m = t), (n.c = i), (n.p = ''), n(0);
		})([
			function (t, n, i) {
				t.exports = i(34);
			},
			function (t, n, i) {
				var s = i(29)('wks'),
					o = i(33),
					a = i(2).Symbol,
					c = typeof a == 'function',
					l = (t.exports = function (u) {
						return s[u] || (s[u] = (c && a[u]) || (c ? a : o)('Symbol.' + u));
					});
				l.store = s;
			},
			function (t, n) {
				var i = (t.exports =
					typeof window < 'u' && window.Math == Math
						? window
						: typeof self < 'u' && self.Math == Math
						? self
						: Function('return this')());
				typeof __g == 'number' && (__g = i);
			},
			function (t, n, i) {
				var s = i(9);
				t.exports = function (o) {
					if (!s(o)) throw TypeError(o + ' is not an object!');
					return o;
				};
			},
			function (t, n, i) {
				t.exports = !i(24)(function () {
					return (
						Object.defineProperty({}, 'a', {
							get: function () {
								return 7;
							},
						}).a != 7
					);
				});
			},
			function (t, n, i) {
				var s = i(12),
					o = i(17);
				t.exports = i(4)
					? function (a, c, l) {
							return s.f(a, c, o(1, l));
					  }
					: function (a, c, l) {
							return (a[c] = l), a;
					  };
			},
			function (t, n) {
				var i = (t.exports = { version: '2.4.0' });
				typeof __e == 'number' && (__e = i);
			},
			function (t, n, i) {
				var s = i(14);
				t.exports = function (o, a, c) {
					if ((s(o), a === void 0)) return o;
					switch (c) {
						case 1:
							return function (l) {
								return o.call(a, l);
							};
						case 2:
							return function (l, u) {
								return o.call(a, l, u);
							};
						case 3:
							return function (l, u, f) {
								return o.call(a, l, u, f);
							};
					}
					return function () {
						return o.apply(a, arguments);
					};
				};
			},
			function (t, n) {
				var i = {}.hasOwnProperty;
				t.exports = function (s, o) {
					return i.call(s, o);
				};
			},
			function (t, n) {
				t.exports = function (i) {
					return typeof i == 'object' ? i !== null : typeof i == 'function';
				};
			},
			function (t, n) {
				t.exports = {};
			},
			function (t, n) {
				var i = {}.toString;
				t.exports = function (s) {
					return i.call(s).slice(8, -1);
				};
			},
			function (t, n, i) {
				var s = i(3),
					o = i(26),
					a = i(32),
					c = Object.defineProperty;
				n.f = i(4)
					? Object.defineProperty
					: function (l, u, f) {
							if ((s(l), (u = a(u, !0)), s(f), o))
								try {
									return c(l, u, f);
								} catch {}
							if ('get' in f || 'set' in f)
								throw TypeError('Accessors not supported!');
							return 'value' in f && (l[u] = f.value), l;
					  };
			},
			function (t, n, i) {
				var s = i(42),
					o = i(15);
				t.exports = function (a) {
					return s(o(a));
				};
			},
			function (t, n) {
				t.exports = function (i) {
					if (typeof i != 'function')
						throw TypeError(i + ' is not a function!');
					return i;
				};
			},
			function (t, n) {
				t.exports = function (i) {
					if (i == null) throw TypeError("Can't call method on  " + i);
					return i;
				};
			},
			function (t, n, i) {
				var s = i(9),
					o = i(2).document,
					a = s(o) && s(o.createElement);
				t.exports = function (c) {
					return a ? o.createElement(c) : {};
				};
			},
			function (t, n) {
				t.exports = function (i, s) {
					return {
						enumerable: !(1 & i),
						configurable: !(2 & i),
						writable: !(4 & i),
						value: s,
					};
				};
			},
			function (t, n, i) {
				var s = i(12).f,
					o = i(8),
					a = i(1)('toStringTag');
				t.exports = function (c, l, u) {
					c &&
						!o((c = u ? c : c.prototype), a) &&
						s(c, a, { configurable: !0, value: l });
				};
			},
			function (t, n, i) {
				var s = i(29)('keys'),
					o = i(33);
				t.exports = function (a) {
					return s[a] || (s[a] = o(a));
				};
			},
			function (t, n) {
				var i = Math.ceil,
					s = Math.floor;
				t.exports = function (o) {
					return isNaN((o = +o)) ? 0 : (o > 0 ? s : i)(o);
				};
			},
			function (t, n, i) {
				var s = i(11),
					o = i(1)('toStringTag'),
					a =
						s(
							(function () {
								return arguments;
							})(),
						) == 'Arguments',
					c = function (l, u) {
						try {
							return l[u];
						} catch {}
					};
				t.exports = function (l) {
					var u, f, h;
					return l === void 0
						? 'Undefined'
						: l === null
						? 'Null'
						: typeof (f = c((u = Object(l)), o)) == 'string'
						? f
						: a
						? s(u)
						: (h = s(u)) == 'Object' && typeof u.callee == 'function'
						? 'Arguments'
						: h;
				};
			},
			function (t, n) {
				t.exports =
					'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
						',',
					);
			},
			function (t, n, i) {
				var s = i(2),
					o = i(6),
					a = i(7),
					c = i(5),
					l = 'prototype',
					u = function (f, h, d) {
						var y,
							b,
							p,
							w = f & u.F,
							k = f & u.G,
							T = f & u.S,
							A = f & u.P,
							P = f & u.B,
							I = f & u.W,
							z = k ? o : o[h] || (o[h] = {}),
							G = z[l],
							O = k ? s : T ? s[h] : (s[h] || {})[l];
						k && (d = h);
						for (y in d)
							(b = !w && O && O[y] !== void 0),
								(b && y in z) ||
									((p = b ? O[y] : d[y]),
									(z[y] =
										k && typeof O[y] != 'function'
											? d[y]
											: P && b
											? a(p, s)
											: I && O[y] == p
											? (function (C) {
													var j = function (X, V, Y) {
														if (this instanceof C) {
															switch (arguments.length) {
																case 0:
																	return new C();
																case 1:
																	return new C(X);
																case 2:
																	return new C(X, V);
															}
															return new C(X, V, Y);
														}
														return C.apply(this, arguments);
													};
													return (j[l] = C[l]), j;
											  })(p)
											: A && typeof p == 'function'
											? a(Function.call, p)
											: p),
									A &&
										(((z.virtual || (z.virtual = {}))[y] = p),
										f & u.R && G && !G[y] && c(G, y, p)));
					};
				(u.F = 1),
					(u.G = 2),
					(u.S = 4),
					(u.P = 8),
					(u.B = 16),
					(u.W = 32),
					(u.U = 64),
					(u.R = 128),
					(t.exports = u);
			},
			function (t, n) {
				t.exports = function (i) {
					try {
						return !!i();
					} catch {
						return !0;
					}
				};
			},
			function (t, n, i) {
				t.exports = i(2).document && document.documentElement;
			},
			function (t, n, i) {
				t.exports =
					!i(4) &&
					!i(24)(function () {
						return (
							Object.defineProperty(i(16)('div'), 'a', {
								get: function () {
									return 7;
								},
							}).a != 7
						);
					});
			},
			function (t, n, i) {
				'use strict';
				var s = i(28),
					o = i(23),
					a = i(57),
					c = i(5),
					l = i(8),
					u = i(10),
					f = i(45),
					h = i(18),
					d = i(52),
					y = i(1)('iterator'),
					b = !([].keys && 'next' in [].keys()),
					p = '@@iterator',
					w = 'keys',
					k = 'values',
					T = function () {
						return this;
					};
				t.exports = function (A, P, I, z, G, O, C) {
					f(I, P, z);
					var j,
						X,
						V,
						Y = function (N) {
							if (!b && N in L) return L[N];
							switch (N) {
								case w:
									return function () {
										return new I(this, N);
									};
								case k:
									return function () {
										return new I(this, N);
									};
							}
							return function () {
								return new I(this, N);
							};
						},
						U = P + ' Iterator',
						K = G == k,
						$ = !1,
						L = A.prototype,
						H = L[y] || L[p] || (G && L[G]),
						le = H || Y(G),
						Se = G ? (K ? Y('entries') : le) : void 0,
						R = (P == 'Array' && L.entries) || H;
					if (
						(R &&
							((V = d(R.call(new A()))),
							V !== Object.prototype &&
								(h(V, U, !0), s || l(V, y) || c(V, y, T))),
						K &&
							H &&
							H.name !== k &&
							(($ = !0),
							(le = function () {
								return H.call(this);
							})),
						(s && !C) || (!b && !$ && L[y]) || c(L, y, le),
						(u[P] = le),
						(u[U] = T),
						G)
					)
						if (
							((j = {
								values: K ? le : Y(k),
								keys: O ? le : Y(w),
								entries: Se,
							}),
							C)
						)
							for (X in j) X in L || a(L, X, j[X]);
						else o(o.P + o.F * (b || $), P, j);
					return j;
				};
			},
			function (t, n) {
				t.exports = !0;
			},
			function (t, n, i) {
				var s = i(2),
					o = '__core-js_shared__',
					a = s[o] || (s[o] = {});
				t.exports = function (c) {
					return a[c] || (a[c] = {});
				};
			},
			function (t, n, i) {
				var s,
					o,
					a,
					c = i(7),
					l = i(41),
					u = i(25),
					f = i(16),
					h = i(2),
					d = h.process,
					y = h.setImmediate,
					b = h.clearImmediate,
					p = h.MessageChannel,
					w = 0,
					k = {},
					T = 'onreadystatechange',
					A = function () {
						var I = +this;
						if (k.hasOwnProperty(I)) {
							var z = k[I];
							delete k[I], z();
						}
					},
					P = function (I) {
						A.call(I.data);
					};
				(y && b) ||
					((y = function (I) {
						for (var z = [], G = 1; arguments.length > G; )
							z.push(arguments[G++]);
						return (
							(k[++w] = function () {
								l(typeof I == 'function' ? I : Function(I), z);
							}),
							s(w),
							w
						);
					}),
					(b = function (I) {
						delete k[I];
					}),
					i(11)(d) == 'process'
						? (s = function (I) {
								d.nextTick(c(A, I, 1));
						  })
						: p
						? ((o = new p()),
						  (a = o.port2),
						  (o.port1.onmessage = P),
						  (s = c(a.postMessage, a, 1)))
						: h.addEventListener &&
						  typeof postMessage == 'function' &&
						  !h.importScripts
						? ((s = function (I) {
								h.postMessage(I + '', '*');
						  }),
						  h.addEventListener('message', P, !1))
						: (s =
								T in f('script')
									? function (I) {
											u.appendChild(f('script'))[T] = function () {
												u.removeChild(this), A.call(I);
											};
									  }
									: function (I) {
											setTimeout(c(A, I, 1), 0);
									  })),
					(t.exports = { set: y, clear: b });
			},
			function (t, n, i) {
				var s = i(20),
					o = Math.min;
				t.exports = function (a) {
					return a > 0 ? o(s(a), 9007199254740991) : 0;
				};
			},
			function (t, n, i) {
				var s = i(9);
				t.exports = function (o, a) {
					if (!s(o)) return o;
					var c, l;
					if (
						(a &&
							typeof (c = o.toString) == 'function' &&
							!s((l = c.call(o)))) ||
						(typeof (c = o.valueOf) == 'function' && !s((l = c.call(o)))) ||
						(!a && typeof (c = o.toString) == 'function' && !s((l = c.call(o))))
					)
						return l;
					throw TypeError("Can't convert object to primitive value");
				};
			},
			function (t, n) {
				var i = 0,
					s = Math.random();
				t.exports = function (o) {
					return 'Symbol('.concat(
						o === void 0 ? '' : o,
						')_',
						(++i + s).toString(36),
					);
				};
			},
			function (t, n, i) {
				'use strict';
				function s(T) {
					return T && T.__esModule ? T : { default: T };
				}
				function o() {
					return process.platform !== 'win32'
						? ''
						: process.arch === 'ia32' &&
						  process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432')
						? 'mixed'
						: 'native';
				}
				function a(T) {
					return (0, y.createHash)('sha256').update(T).digest('hex');
				}
				function c(T) {
					switch (p) {
						case 'darwin':
							return T.split('IOPlatformUUID')[1]
								.split(
									`
`,
								)[0]
								.replace(/\=|\s+|\"/gi, '')
								.toLowerCase();
						case 'win32':
							return T.toString()
								.split('REG_SZ')[1]
								.replace(/\r+|\n+|\s+/gi, '')
								.toLowerCase();
						case 'linux':
							return T.toString()
								.replace(/\r+|\n+|\s+/gi, '')
								.toLowerCase();
						case 'freebsd':
							return T.toString()
								.replace(/\r+|\n+|\s+/gi, '')
								.toLowerCase();
						default:
							throw new Error('Unsupported platform: ' + process.platform);
					}
				}
				function l(T) {
					var A = c((0, d.execSync)(k[p]).toString());
					return T ? A : a(A);
				}
				function u(T) {
					return new h.default(function (A, P) {
						return (0, d.exec)(k[p], {}, function (I, z, G) {
							if (I)
								return P(
									new Error('Error while obtaining machine id: ' + I.stack),
								);
							var O = c(z.toString());
							return A(T ? O : a(O));
						});
					});
				}
				Object.defineProperty(n, '__esModule', { value: !0 });
				var f = i(35),
					h = s(f);
				(n.machineIdSync = l), (n.machineId = u);
				var d = i(70),
					y = i(71),
					b = process,
					p = b.platform,
					w = {
						native: '%windir%\\System32',
						mixed: '%windir%\\sysnative\\cmd.exe /c %windir%\\System32',
					},
					k = {
						darwin: 'ioreg -rd1 -c IOPlatformExpertDevice',
						win32:
							w[o()] +
							'\\REG.exe QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid',
						linux:
							'( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :',
						freebsd: 'kenv -q smbios.system.uuid || sysctl -n kern.hostuuid',
					};
			},
			function (t, n, i) {
				t.exports = { default: i(36), __esModule: !0 };
			},
			function (t, n, i) {
				i(66), i(68), i(69), i(67), (t.exports = i(6).Promise);
			},
			function (t, n) {
				t.exports = function () {};
			},
			function (t, n) {
				t.exports = function (i, s, o, a) {
					if (!(i instanceof s) || (a !== void 0 && a in i))
						throw TypeError(o + ': incorrect invocation!');
					return i;
				};
			},
			function (t, n, i) {
				var s = i(13),
					o = i(31),
					a = i(62);
				t.exports = function (c) {
					return function (l, u, f) {
						var h,
							d = s(l),
							y = o(d.length),
							b = a(f, y);
						if (c && u != u) {
							for (; y > b; ) if (((h = d[b++]), h != h)) return !0;
						} else
							for (; y > b; b++)
								if ((c || b in d) && d[b] === u) return c || b || 0;
						return !c && -1;
					};
				};
			},
			function (t, d, i) {
				var s = i(7),
					o = i(44),
					a = i(43),
					c = i(3),
					l = i(31),
					u = i(64),
					f = {},
					h = {},
					d = (t.exports = function (y, b, p, w, k) {
						var T,
							A,
							P,
							I,
							z = k
								? function () {
										return y;
								  }
								: u(y),
							G = s(p, w, b ? 2 : 1),
							O = 0;
						if (typeof z != 'function')
							throw TypeError(y + ' is not iterable!');
						if (a(z)) {
							for (T = l(y.length); T > O; O++)
								if (
									((I = b ? G(c((A = y[O]))[0], A[1]) : G(y[O])),
									I === f || I === h)
								)
									return I;
						} else
							for (P = z.call(y); !(A = P.next()).done; )
								if (((I = o(P, G, A.value, b)), I === f || I === h)) return I;
					});
				(d.BREAK = f), (d.RETURN = h);
			},
			function (t, n) {
				t.exports = function (i, s, o) {
					var a = o === void 0;
					switch (s.length) {
						case 0:
							return a ? i() : i.call(o);
						case 1:
							return a ? i(s[0]) : i.call(o, s[0]);
						case 2:
							return a ? i(s[0], s[1]) : i.call(o, s[0], s[1]);
						case 3:
							return a ? i(s[0], s[1], s[2]) : i.call(o, s[0], s[1], s[2]);
						case 4:
							return a
								? i(s[0], s[1], s[2], s[3])
								: i.call(o, s[0], s[1], s[2], s[3]);
					}
					return i.apply(o, s);
				};
			},
			function (t, n, i) {
				var s = i(11);
				t.exports = Object('z').propertyIsEnumerable(0)
					? Object
					: function (o) {
							return s(o) == 'String' ? o.split('') : Object(o);
					  };
			},
			function (t, n, i) {
				var s = i(10),
					o = i(1)('iterator'),
					a = Array.prototype;
				t.exports = function (c) {
					return c !== void 0 && (s.Array === c || a[o] === c);
				};
			},
			function (t, n, i) {
				var s = i(3);
				t.exports = function (o, a, c, l) {
					try {
						return l ? a(s(c)[0], c[1]) : a(c);
					} catch (f) {
						var u = o.return;
						throw (u !== void 0 && s(u.call(o)), f);
					}
				};
			},
			function (t, n, i) {
				'use strict';
				var s = i(49),
					o = i(17),
					a = i(18),
					c = {};
				i(5)(c, i(1)('iterator'), function () {
					return this;
				}),
					(t.exports = function (l, u, f) {
						(l.prototype = s(c, { next: o(1, f) })), a(l, u + ' Iterator');
					});
			},
			function (t, n, i) {
				var s = i(1)('iterator'),
					o = !1;
				try {
					var a = [7][s]();
					(a.return = function () {
						o = !0;
					}),
						Array.from(a, function () {
							throw 2;
						});
				} catch {}
				t.exports = function (c, l) {
					if (!l && !o) return !1;
					var u = !1;
					try {
						var f = [7],
							h = f[s]();
						(h.next = function () {
							return { done: (u = !0) };
						}),
							(f[s] = function () {
								return h;
							}),
							c(f);
					} catch {}
					return u;
				};
			},
			function (t, n) {
				t.exports = function (i, s) {
					return { value: s, done: !!i };
				};
			},
			function (t, n, i) {
				var s = i(2),
					o = i(30).set,
					a = s.MutationObserver || s.WebKitMutationObserver,
					c = s.process,
					l = s.Promise,
					u = i(11)(c) == 'process';
				t.exports = function () {
					var f,
						h,
						d,
						y = function () {
							var k, T;
							for (u && (k = c.domain) && k.exit(); f; ) {
								(T = f.fn), (f = f.next);
								try {
									T();
								} catch (A) {
									throw (f ? d() : (h = void 0), A);
								}
							}
							(h = void 0), k && k.enter();
						};
					if (u)
						d = function () {
							c.nextTick(y);
						};
					else if (a) {
						var b = !0,
							p = document.createTextNode('');
						new a(y).observe(p, { characterData: !0 }),
							(d = function () {
								p.data = b = !b;
							});
					} else if (l && l.resolve) {
						var w = l.resolve();
						d = function () {
							w.then(y);
						};
					} else
						d = function () {
							o.call(s, y);
						};
					return function (k) {
						var T = { fn: k, next: void 0 };
						h && (h.next = T), f || ((f = T), d()), (h = T);
					};
				};
			},
			function (t, n, i) {
				var s = i(3),
					o = i(50),
					a = i(22),
					c = i(19)('IE_PROTO'),
					l = function () {},
					u = 'prototype',
					f = function () {
						var h,
							d = i(16)('iframe'),
							y = a.length,
							b = '>';
						for (
							d.style.display = 'none',
								i(25).appendChild(d),
								d.src = 'javascript:',
								h = d.contentWindow.document,
								h.open(),
								h.write('<script>document.F=Object</script' + b),
								h.close(),
								f = h.F;
							y--;

						)
							delete f[u][a[y]];
						return f();
					};
				t.exports =
					Object.create ||
					function (h, d) {
						var y;
						return (
							h !== null
								? ((l[u] = s(h)), (y = new l()), (l[u] = null), (y[c] = h))
								: (y = f()),
							d === void 0 ? y : o(y, d)
						);
					};
			},
			function (t, n, i) {
				var s = i(12),
					o = i(3),
					a = i(54);
				t.exports = i(4)
					? Object.defineProperties
					: function (c, l) {
							o(c);
							for (var u, f = a(l), h = f.length, d = 0; h > d; )
								s.f(c, (u = f[d++]), l[u]);
							return c;
					  };
			},
			function (t, n, i) {
				var s = i(55),
					o = i(17),
					a = i(13),
					c = i(32),
					l = i(8),
					u = i(26),
					f = Object.getOwnPropertyDescriptor;
				n.f = i(4)
					? f
					: function (h, d) {
							if (((h = a(h)), (d = c(d, !0)), u))
								try {
									return f(h, d);
								} catch {}
							if (l(h, d)) return o(!s.f.call(h, d), h[d]);
					  };
			},
			function (t, n, i) {
				var s = i(8),
					o = i(63),
					a = i(19)('IE_PROTO'),
					c = Object.prototype;
				t.exports =
					Object.getPrototypeOf ||
					function (l) {
						return (
							(l = o(l)),
							s(l, a)
								? l[a]
								: typeof l.constructor == 'function' &&
								  l instanceof l.constructor
								? l.constructor.prototype
								: l instanceof Object
								? c
								: null
						);
					};
			},
			function (t, n, i) {
				var s = i(8),
					o = i(13),
					a = i(39)(!1),
					c = i(19)('IE_PROTO');
				t.exports = function (l, u) {
					var f,
						h = o(l),
						d = 0,
						y = [];
					for (f in h) f != c && s(h, f) && y.push(f);
					for (; u.length > d; ) s(h, (f = u[d++])) && (~a(y, f) || y.push(f));
					return y;
				};
			},
			function (t, n, i) {
				var s = i(53),
					o = i(22);
				t.exports =
					Object.keys ||
					function (a) {
						return s(a, o);
					};
			},
			function (t, n) {
				n.f = {}.propertyIsEnumerable;
			},
			function (t, n, i) {
				var s = i(5);
				t.exports = function (o, a, c) {
					for (var l in a) c && o[l] ? (o[l] = a[l]) : s(o, l, a[l]);
					return o;
				};
			},
			function (t, n, i) {
				t.exports = i(5);
			},
			function (t, n, i) {
				var s = i(9),
					o = i(3),
					a = function (c, l) {
						if ((o(c), !s(l) && l !== null))
							throw TypeError(l + ": can't set as prototype!");
					};
				t.exports = {
					set:
						Object.setPrototypeOf ||
						('__proto__' in {}
							? (function (c, l, u) {
									try {
										(u = i(7)(
											Function.call,
											i(51).f(Object.prototype, '__proto__').set,
											2,
										)),
											u(c, []),
											(l = !(c instanceof Array));
									} catch {
										l = !0;
									}
									return function (f, h) {
										return a(f, h), l ? (f.__proto__ = h) : u(f, h), f;
									};
							  })({}, !1)
							: void 0),
					check: a,
				};
			},
			function (t, n, i) {
				'use strict';
				var s = i(2),
					o = i(6),
					a = i(12),
					c = i(4),
					l = i(1)('species');
				t.exports = function (u) {
					var f = typeof o[u] == 'function' ? o[u] : s[u];
					c &&
						f &&
						!f[l] &&
						a.f(f, l, {
							configurable: !0,
							get: function () {
								return this;
							},
						});
				};
			},
			function (t, n, i) {
				var s = i(3),
					o = i(14),
					a = i(1)('species');
				t.exports = function (c, l) {
					var u,
						f = s(c).constructor;
					return f === void 0 || (u = s(f)[a]) == null ? l : o(u);
				};
			},
			function (t, n, i) {
				var s = i(20),
					o = i(15);
				t.exports = function (a) {
					return function (c, l) {
						var u,
							f,
							h = String(o(c)),
							d = s(l),
							y = h.length;
						return d < 0 || d >= y
							? a
								? ''
								: void 0
							: ((u = h.charCodeAt(d)),
							  u < 55296 ||
							  u > 56319 ||
							  d + 1 === y ||
							  (f = h.charCodeAt(d + 1)) < 56320 ||
							  f > 57343
									? a
										? h.charAt(d)
										: u
									: a
									? h.slice(d, d + 2)
									: ((u - 55296) << 10) + (f - 56320) + 65536);
					};
				};
			},
			function (t, n, i) {
				var s = i(20),
					o = Math.max,
					a = Math.min;
				t.exports = function (c, l) {
					return (c = s(c)), c < 0 ? o(c + l, 0) : a(c, l);
				};
			},
			function (t, n, i) {
				var s = i(15);
				t.exports = function (o) {
					return Object(s(o));
				};
			},
			function (t, n, i) {
				var s = i(21),
					o = i(1)('iterator'),
					a = i(10);
				t.exports = i(6).getIteratorMethod = function (c) {
					if (c != null) return c[o] || c['@@iterator'] || a[s(c)];
				};
			},
			function (t, n, i) {
				'use strict';
				var s = i(37),
					o = i(47),
					a = i(10),
					c = i(13);
				(t.exports = i(27)(
					Array,
					'Array',
					function (l, u) {
						(this._t = c(l)), (this._i = 0), (this._k = u);
					},
					function () {
						var l = this._t,
							u = this._k,
							f = this._i++;
						return !l || f >= l.length
							? ((this._t = void 0), o(1))
							: u == 'keys'
							? o(0, f)
							: u == 'values'
							? o(0, l[f])
							: o(0, [f, l[f]]);
					},
					'values',
				)),
					(a.Arguments = a.Array),
					s('keys'),
					s('values'),
					s('entries');
			},
			function (t, n) {},
			function (t, n, i) {
				'use strict';
				var s,
					o,
					a,
					c = i(28),
					l = i(2),
					u = i(7),
					f = i(21),
					h = i(23),
					d = i(9),
					y = (i(3), i(14)),
					b = i(38),
					p = i(40),
					w = (i(58).set, i(60)),
					k = i(30).set,
					T = i(48)(),
					A = 'Promise',
					P = l.TypeError,
					z = l.process,
					I = l[A],
					z = l.process,
					G = f(z) == 'process',
					O = function () {},
					C = !!(function () {
						try {
							var R = I.resolve(1),
								N = ((R.constructor = {})[i(1)('species')] = function (S) {
									S(O, O);
								});
							return (
								(G || typeof PromiseRejectionEvent == 'function') &&
								R.then(O) instanceof N
							);
						} catch {}
					})(),
					j = function (R, N) {
						return R === N || (R === I && N === a);
					},
					X = function (R) {
						var N;
						return !(!d(R) || typeof (N = R.then) != 'function') && N;
					},
					V = function (R) {
						return j(I, R) ? new Y(R) : new o(R);
					},
					Y = (o = function (R) {
						var N, S;
						(this.promise = new R(function (W, de) {
							if (N !== void 0 || S !== void 0)
								throw P('Bad Promise constructor');
							(N = W), (S = de);
						})),
							(this.resolve = y(N)),
							(this.reject = y(S));
					}),
					U = function (R) {
						try {
							R();
						} catch (N) {
							return { error: N };
						}
					},
					K = function (R, N) {
						if (!R._n) {
							R._n = !0;
							var S = R._c;
							T(function () {
								for (
									var W = R._v,
										de = R._s == 1,
										It = 0,
										ut = function (Et) {
											var ge,
												Vr,
												_r = de ? Et.ok : Et.fail,
												Le = Et.resolve,
												zt = Et.reject,
												m = Et.domain;
											try {
												_r
													? (de || (R._h == 2 && H(R), (R._h = 1)),
													  _r === !0
															? (ge = W)
															: (m && m.enter(), (ge = _r(W)), m && m.exit()),
													  ge === Et.promise
															? zt(P('Promise-chain cycle'))
															: (Vr = X(ge))
															? Vr.call(ge, Le, zt)
															: Le(ge))
													: zt(W);
											} catch (_) {
												zt(_);
											}
										};
									S.length > It;

								)
									ut(S[It++]);
								(R._c = []), (R._n = !1), N && !R._h && $(R);
							});
						}
					},
					$ = function (R) {
						k.call(l, function () {
							var N,
								S,
								W,
								de = R._v;
							if (
								(L(R) &&
									((N = U(function () {
										G
											? z.emit('unhandledRejection', de, R)
											: (S = l.onunhandledrejection)
											? S({ promise: R, reason: de })
											: (W = l.console) &&
											  W.error &&
											  W.error('Unhandled promise rejection', de);
									})),
									(R._h = G || L(R) ? 2 : 1)),
								(R._a = void 0),
								N)
							)
								throw N.error;
						});
					},
					L = function (R) {
						if (R._h == 1) return !1;
						for (var N, S = R._a || R._c, W = 0; S.length > W; )
							if (((N = S[W++]), N.fail || !L(N.promise))) return !1;
						return !0;
					},
					H = function (R) {
						k.call(l, function () {
							var N;
							G
								? z.emit('rejectionHandled', R)
								: (N = l.onrejectionhandled) && N({ promise: R, reason: R._v });
						});
					},
					le = function (R) {
						var N = this;
						N._d ||
							((N._d = !0),
							(N = N._w || N),
							(N._v = R),
							(N._s = 2),
							N._a || (N._a = N._c.slice()),
							K(N, !0));
					},
					Se = function (R) {
						var N,
							S = this;
						if (!S._d) {
							(S._d = !0), (S = S._w || S);
							try {
								if (S === R) throw P("Promise can't be resolved itself");
								(N = X(R))
									? T(function () {
											var W = { _w: S, _d: !1 };
											try {
												N.call(R, u(Se, W, 1), u(le, W, 1));
											} catch (de) {
												le.call(W, de);
											}
									  })
									: ((S._v = R), (S._s = 1), K(S, !1));
							} catch (W) {
								le.call({ _w: S, _d: !1 }, W);
							}
						}
					};
				C ||
					((I = function (R) {
						b(this, I, A, '_h'), y(R), s.call(this);
						try {
							R(u(Se, this, 1), u(le, this, 1));
						} catch (N) {
							le.call(this, N);
						}
					}),
					(s = function (R) {
						(this._c = []),
							(this._a = void 0),
							(this._s = 0),
							(this._d = !1),
							(this._v = void 0),
							(this._h = 0),
							(this._n = !1);
					}),
					(s.prototype = i(56)(I.prototype, {
						then: function (R, N) {
							var S = V(w(this, I));
							return (
								(S.ok = typeof R != 'function' || R),
								(S.fail = typeof N == 'function' && N),
								(S.domain = G ? z.domain : void 0),
								this._c.push(S),
								this._a && this._a.push(S),
								this._s && K(this, !1),
								S.promise
							);
						},
						catch: function (R) {
							return this.then(void 0, R);
						},
					})),
					(Y = function () {
						var R = new s();
						(this.promise = R),
							(this.resolve = u(Se, R, 1)),
							(this.reject = u(le, R, 1));
					})),
					h(h.G + h.W + h.F * !C, { Promise: I }),
					i(18)(I, A),
					i(59)(A),
					(a = i(6)[A]),
					h(h.S + h.F * !C, A, {
						reject: function (R) {
							var N = V(this),
								S = N.reject;
							return S(R), N.promise;
						},
					}),
					h(h.S + h.F * (c || !C), A, {
						resolve: function (R) {
							if (R instanceof I && j(R.constructor, this)) return R;
							var N = V(this),
								S = N.resolve;
							return S(R), N.promise;
						},
					}),
					h(
						h.S +
							h.F *
								!(
									C &&
									i(46)(function (R) {
										I.all(R).catch(O);
									})
								),
						A,
						{
							all: function (R) {
								var N = this,
									S = V(N),
									W = S.resolve,
									de = S.reject,
									It = U(function () {
										var ut = [],
											Et = 0,
											ge = 1;
										p(R, !1, function (Vr) {
											var _r = Et++,
												Le = !1;
											ut.push(void 0),
												ge++,
												N.resolve(Vr).then(function (zt) {
													Le || ((Le = !0), (ut[_r] = zt), --ge || W(ut));
												}, de);
										}),
											--ge || W(ut);
									});
								return It && de(It.error), S.promise;
							},
							race: function (R) {
								var N = this,
									S = V(N),
									W = S.reject,
									de = U(function () {
										p(R, !1, function (It) {
											N.resolve(It).then(S.resolve, W);
										});
									});
								return de && W(de.error), S.promise;
							},
						},
					);
			},
			function (t, n, i) {
				'use strict';
				var s = i(61)(!0);
				i(27)(
					String,
					'String',
					function (o) {
						(this._t = String(o)), (this._i = 0);
					},
					function () {
						var o,
							a = this._t,
							c = this._i;
						return c >= a.length
							? { value: void 0, done: !0 }
							: ((o = s(a, c)), (this._i += o.length), { value: o, done: !1 });
					},
				);
			},
			function (t, n, i) {
				i(65);
				for (
					var s = i(2),
						o = i(5),
						a = i(10),
						c = i(1)('toStringTag'),
						l = [
							'NodeList',
							'DOMTokenList',
							'MediaList',
							'StyleSheetList',
							'CSSRuleList',
						],
						u = 0;
					u < 5;
					u++
				) {
					var f = l[u],
						h = s[f],
						d = h && h.prototype;
					d && !d[c] && o(d, c, f), (a[f] = a.Array);
				}
			},
			function (t, n) {
				t.exports = require('child_process');
			},
			function (t, n) {
				t.exports = require('crypto');
			},
		]);
	});
});
function lt(r) {
	return !!r;
}
function lh() {
	return (
		process.env.NX_INVOKED_BY_RUNNER === 'true' ||
		process.env.NX_CLOUD === 'false'
	);
}
function tt() {
	try {
		return (0, fa.execSync)('git rev-parse HEAD', { stdio: 'pipe' })
			.toString()
			.trim();
	} catch {
		return;
	}
}
function Xi() {
	try {
		return (0, fa.execSync)('git rev-parse --symbolic-full-name HEAD', {
			stdio: 'pipe',
		})
			.toString()
			.trim();
	} catch {
		return;
	}
}
function Eb() {
	try {
		let r = (0, sh.readFileSync)((0, Vi.join)(yb, 'nx-cloud.env'));
		return pb.parse(r);
	} catch {
		return {};
	}
}
function gb() {
	let r = Eb();
	(Nt =
		process.env.NX_CLOUD_AUTH_TOKEN ||
		process.env.NX_CLOUD_ACCESS_TOKEN ||
		r.NX_CLOUD_AUTH_TOKEN ||
		r.NX_CLOUD_ACCESS_TOKEN),
		(Sr = process.env.NX_CLOUD_ENCRYPTION_KEY || r.NX_CLOUD_ENCRYPTION_KEY),
		(M =
			process.env.NX_VERBOSE_LOGGING === 'true' ||
			r.NX_VERBOSE_LOGGING === 'true'),
		(gt =
			process.env.NX_CLOUD_NO_TIMEOUTS === 'true' ||
			r.NX_CLOUD_NO_TIMEOUTS === 'true');
}
function je() {
	if (!Kr()) return fh();
}
function fh() {
	return process.env.NX_CI_EXECUTION_ID !== void 0
		? process.env.NX_CI_EXECUTION_ID
		: process.env.NX_RUN_GROUP !== void 0
		? process.env.NX_RUN_GROUP
		: process.env.CIRCLECI !== void 0 && process.env.CIRCLE_WORKFLOW_ID
		? process.env.CIRCLE_WORKFLOW_ID
		: process.env.TRAVIS_BUILD_ID !== void 0
		? process.env.TRAVIS_BUILD_ID
		: process.env.GITHUB_ACTIONS && process.env.GITHUB_RUN_ID
		? `${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT}`
		: process.env.BUILD_BUILDID
		? process.env.BUILD_BUILDID
		: process.env.BITBUCKET_BUILD_NUMBER !== void 0
		? process.env.BITBUCKET_BUILD_NUMBER
		: process.env.VERCEL_GIT_COMMIT_SHA !== void 0
		? process.env.VERCEL_GIT_COMMIT_SHA
		: process.env.CI_PIPELINE_ID
		? process.env.CI_PIPELINE_ID
		: process.env.BUILD_TAG
		? process.env.BUILD_TAG
		: null;
}
function we() {
	if (!Kr()) return process.env.NX_CI_EXECUTION_ENV ?? '';
}
function Fe() {
	if (process.env.NX_RUN_GROUP !== void 0) return process.env.NX_RUN_GROUP;
	let r = fh();
	return r ? (we() ? `${r}-${we()}` : r) : tt();
}
function Re() {
	if (process.env.NX_BRANCH !== void 0) return process.env.NX_BRANCH;
	if (process.env.CIRCLECI !== void 0) {
		if (process.env.CIRCLE_PR_NUMBER !== void 0)
			return process.env.CIRCLE_PR_NUMBER;
		if (process.env.CIRCLE_PULL_REQUEST !== void 0) {
			let r = process.env.CIRCLE_PULL_REQUEST.split('/');
			return r[r.length - 1];
		} else if (process.env.CIRCLE_BRANCH !== void 0)
			return process.env.CIRCLE_BRANCH;
	}
	if (process.env.TRAVIS_PULL_REQUEST !== void 0)
		return process.env.TRAVIS_PULL_REQUEST;
	if (process.env.GITHUB_ACTIONS) {
		if (process.env.GITHUB_REF) {
			let r = process.env.GITHUB_REF.match(/refs\/pull\/(\d+)\/merge/);
			if (r) return r[1];
		}
		return process.env.GITHUB_HEAD_REF ?? '';
	}
	return process.env.BITBUCKET_PR_ID !== void 0
		? process.env.BITBUCKET_PR_ID
		: process.env.VERCEL_GIT_COMMIT_REF !== void 0
		? process.env.VERCEL_GIT_COMMIT_REF
		: process.env.CI_MERGE_REQUEST_IID
		? process.env.CI_MERGE_REQUEST_IID
		: process.env.CI_COMMIT_BRANCH
		? process.env.CI_COMMIT_BRANCH
		: process.env.GIT_BRANCH
		? process.env.GIT_BRANCH
		: null;
}
function Yr() {
	let r = require('os'),
		e = (0, ih.createHash)('md5');
	return (
		e.update(mb()),
		{
			machineId: e.digest('base64'),
			platform: r.platform(),
			version: r.version ? r.version() : '',
			cpuCores: r.cpus().length,
		}
	);
}
function Ki() {
	let r = (0, Vi.parse)(process.argv[1]).name,
		e = `${process.argv.slice(2).join(' ')}`;
	return `${r} ${e}`;
}
var fa,
	ih,
	sh,
	Vi,
	pb,
	mb,
	yb,
	Wn,
	ha,
	da,
	Xn,
	oh,
	Kn,
	Vt,
	pa,
	ah,
	ch,
	Wi,
	uh,
	Nt,
	Sr,
	M,
	gt,
	oe = B(() => {
		'use strict';
		(fa = require('child_process')),
			(ih = require('crypto')),
			(sh = require('fs')),
			(Vi = require('path'));
		Xf();
		ca();
		(pb = rh()),
			({ machineIdSync: mb } = nh()),
			({ workspaceRoot: yb } = J()),
			(Wn = 9999999),
			(ha = process.env.NX_CLOUD_AGENT_TIMEOUT_MS
				? Number(process.env.NX_CLOUD_AGENT_TIMEOUT_MS)
				: 36e5),
			(da = process.env.NX_CLOUD_ORCHESTRATOR_TIMEOUT_MS
				? Number(process.env.NX_CLOUD_ORCHESTRATOR_TIMEOUT_MS)
				: 36e5),
			(Xn = 1e3 * 1e3 * 1e4),
			(oh = process.env.NX_CLOUD_UNLIMITED_OUTPUT === 'true'),
			(Kn = 1e3 * 1e3 * 300),
			(Vt = 166),
			(pa = process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT
				? Number(process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT)
				: null),
			(ah =
				process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_STOP_AGENTS_ON_FAILURE !=
				'false'),
			(ch = process.env.NX_CLOUD_FORCE_METRICS === 'true'),
			(Wi = process.env.NX_CLOUD_NUMBER_OF_RETRIES
				? Number(process.env.NX_CLOUD_NUMBER_OF_RETRIES)
				: Wf()
				? 10
				: 1),
			(uh = process.env.NX_NO_CLOUD === 'true');
		gb();
	});
function rt(r) {
	return new Promise((e) => {
		setTimeout(() => e(null), r);
	});
}
var Yn = B(() => {
	'use strict';
});
var ma = E((IA, hh) => {
	'use strict';
	hh.exports = function (e, t) {
		return function () {
			for (var i = new Array(arguments.length), s = 0; s < i.length; s++)
				i[s] = arguments[s];
			return e.apply(t, i);
		};
	};
});
var Me = E((AA, mh) => {
	'use strict';
	var _b = ma(),
		wr = Object.prototype.toString;
	function ga(r) {
		return wr.call(r) === '[object Array]';
	}
	function ya(r) {
		return typeof r > 'u';
	}
	function vb(r) {
		return (
			r !== null &&
			!ya(r) &&
			r.constructor !== null &&
			!ya(r.constructor) &&
			typeof r.constructor.isBuffer == 'function' &&
			r.constructor.isBuffer(r)
		);
	}
	function bb(r) {
		return wr.call(r) === '[object ArrayBuffer]';
	}
	function Sb(r) {
		return typeof FormData < 'u' && r instanceof FormData;
	}
	function wb(r) {
		var e;
		return (
			typeof ArrayBuffer < 'u' && ArrayBuffer.isView
				? (e = ArrayBuffer.isView(r))
				: (e = r && r.buffer && r.buffer instanceof ArrayBuffer),
			e
		);
	}
	function Rb(r) {
		return typeof r == 'string';
	}
	function xb(r) {
		return typeof r == 'number';
	}
	function dh(r) {
		return r !== null && typeof r == 'object';
	}
	function Yi(r) {
		if (wr.call(r) !== '[object Object]') return !1;
		var e = Object.getPrototypeOf(r);
		return e === null || e === Object.prototype;
	}
	function Tb(r) {
		return wr.call(r) === '[object Date]';
	}
	function Ob(r) {
		return wr.call(r) === '[object File]';
	}
	function Cb(r) {
		return wr.call(r) === '[object Blob]';
	}
	function ph(r) {
		return wr.call(r) === '[object Function]';
	}
	function Ib(r) {
		return dh(r) && ph(r.pipe);
	}
	function Ab(r) {
		return typeof URLSearchParams < 'u' && r instanceof URLSearchParams;
	}
	function Nb(r) {
		return r.trim ? r.trim() : r.replace(/^\s+|\s+$/g, '');
	}
	function Db() {
		return typeof navigator < 'u' &&
			(navigator.product === 'ReactNative' ||
				navigator.product === 'NativeScript' ||
				navigator.product === 'NS')
			? !1
			: typeof window < 'u' && typeof document < 'u';
	}
	function _a(r, e) {
		if (!(r === null || typeof r > 'u'))
			if ((typeof r != 'object' && (r = [r]), ga(r)))
				for (var t = 0, n = r.length; t < n; t++) e.call(null, r[t], t, r);
			else
				for (var i in r)
					Object.prototype.hasOwnProperty.call(r, i) &&
						e.call(null, r[i], i, r);
	}
	function Ea() {
		var r = {};
		function e(i, s) {
			Yi(r[s]) && Yi(i)
				? (r[s] = Ea(r[s], i))
				: Yi(i)
				? (r[s] = Ea({}, i))
				: ga(i)
				? (r[s] = i.slice())
				: (r[s] = i);
		}
		for (var t = 0, n = arguments.length; t < n; t++) _a(arguments[t], e);
		return r;
	}
	function kb(r, e, t) {
		return (
			_a(e, function (i, s) {
				t && typeof i == 'function' ? (r[s] = _b(i, t)) : (r[s] = i);
			}),
			r
		);
	}
	function Lb(r) {
		return r.charCodeAt(0) === 65279 && (r = r.slice(1)), r;
	}
	mh.exports = {
		isArray: ga,
		isArrayBuffer: bb,
		isBuffer: vb,
		isFormData: Sb,
		isArrayBufferView: wb,
		isString: Rb,
		isNumber: xb,
		isObject: dh,
		isPlainObject: Yi,
		isUndefined: ya,
		isDate: Tb,
		isFile: Ob,
		isBlob: Cb,
		isFunction: ph,
		isStream: Ib,
		isURLSearchParams: Ab,
		isStandardBrowserEnv: Db,
		forEach: _a,
		merge: Ea,
		extend: kb,
		trim: Nb,
		stripBOM: Lb,
	};
});
var Ji = E((NA, Eh) => {
	'use strict';
	var Jr = Me();
	function yh(r) {
		return encodeURIComponent(r)
			.replace(/%3A/gi, ':')
			.replace(/%24/g, '$')
			.replace(/%2C/gi, ',')
			.replace(/%20/g, '+')
			.replace(/%5B/gi, '[')
			.replace(/%5D/gi, ']');
	}
	Eh.exports = function (e, t, n) {
		if (!t) return e;
		var i;
		if (n) i = n(t);
		else if (Jr.isURLSearchParams(t)) i = t.toString();
		else {
			var s = [];
			Jr.forEach(t, function (c, l) {
				c === null ||
					typeof c > 'u' ||
					(Jr.isArray(c) ? (l = l + '[]') : (c = [c]),
					Jr.forEach(c, function (f) {
						Jr.isDate(f)
							? (f = f.toISOString())
							: Jr.isObject(f) && (f = JSON.stringify(f)),
							s.push(yh(l) + '=' + yh(f));
					}));
			}),
				(i = s.join('&'));
		}
		if (i) {
			var o = e.indexOf('#');
			o !== -1 && (e = e.slice(0, o)),
				(e += (e.indexOf('?') === -1 ? '?' : '&') + i);
		}
		return e;
	};
});
var _h = E((DA, gh) => {
	'use strict';
	var Pb = Me();
	function Zi() {
		this.handlers = [];
	}
	Zi.prototype.use = function (e, t, n) {
		return (
			this.handlers.push({
				fulfilled: e,
				rejected: t,
				synchronous: n ? n.synchronous : !1,
				runWhen: n ? n.runWhen : null,
			}),
			this.handlers.length - 1
		);
	};
	Zi.prototype.eject = function (e) {
		this.handlers[e] && (this.handlers[e] = null);
	};
	Zi.prototype.forEach = function (e) {
		Pb.forEach(this.handlers, function (n) {
			n !== null && e(n);
		});
	};
	gh.exports = Zi;
});
var bh = E((kA, vh) => {
	'use strict';
	var Fb = Me();
	vh.exports = function (e, t) {
		Fb.forEach(e, function (i, s) {
			s !== t &&
				s.toUpperCase() === t.toUpperCase() &&
				((e[t] = i), delete e[s]);
		});
	};
});
var Qi = E((LA, Sh) => {
	'use strict';
	Sh.exports = function (e, t, n, i, s) {
		return (
			(e.config = t),
			n && (e.code = n),
			(e.request = i),
			(e.response = s),
			(e.isAxiosError = !0),
			(e.toJSON = function () {
				return {
					message: this.message,
					name: this.name,
					description: this.description,
					number: this.number,
					fileName: this.fileName,
					lineNumber: this.lineNumber,
					columnNumber: this.columnNumber,
					stack: this.stack,
					config: this.config,
					code: this.code,
				};
			}),
			e
		);
	};
});
var es = E((PA, wh) => {
	'use strict';
	var Mb = Qi();
	wh.exports = function (e, t, n, i, s) {
		var o = new Error(e);
		return Mb(o, t, n, i, s);
	};
});
var va = E((FA, Rh) => {
	'use strict';
	var qb = es();
	Rh.exports = function (e, t, n) {
		var i = n.config.validateStatus;
		!n.status || !i || i(n.status)
			? e(n)
			: t(
					qb(
						'Request failed with status code ' + n.status,
						n.config,
						null,
						n.request,
						n,
					),
			  );
	};
});
var Th = E((MA, xh) => {
	'use strict';
	var ts = Me();
	xh.exports = ts.isStandardBrowserEnv()
		? (function () {
				return {
					write: function (t, n, i, s, o, a) {
						var c = [];
						c.push(t + '=' + encodeURIComponent(n)),
							ts.isNumber(i) && c.push('expires=' + new Date(i).toGMTString()),
							ts.isString(s) && c.push('path=' + s),
							ts.isString(o) && c.push('domain=' + o),
							a === !0 && c.push('secure'),
							(document.cookie = c.join('; '));
					},
					read: function (t) {
						var n = document.cookie.match(
							new RegExp('(^|;\\s*)(' + t + ')=([^;]*)'),
						);
						return n ? decodeURIComponent(n[3]) : null;
					},
					remove: function (t) {
						this.write(t, '', Date.now() - 864e5);
					},
				};
		  })()
		: (function () {
				return {
					write: function () {},
					read: function () {
						return null;
					},
					remove: function () {},
				};
		  })();
});
var Ch = E((qA, Oh) => {
	'use strict';
	Oh.exports = function (e) {
		return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
	};
});
var Ah = E((UA, Ih) => {
	'use strict';
	Ih.exports = function (e, t) {
		return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e;
	};
});
var ba = E((BA, Nh) => {
	'use strict';
	var Ub = Ch(),
		Bb = Ah();
	Nh.exports = function (e, t) {
		return e && !Ub(t) ? Bb(e, t) : t;
	};
});
var kh = E((jA, Dh) => {
	'use strict';
	var Sa = Me(),
		jb = [
			'age',
			'authorization',
			'content-length',
			'content-type',
			'etag',
			'expires',
			'from',
			'host',
			'if-modified-since',
			'if-unmodified-since',
			'last-modified',
			'location',
			'max-forwards',
			'proxy-authorization',
			'referer',
			'retry-after',
			'user-agent',
		];
	Dh.exports = function (e) {
		var t = {},
			n,
			i,
			s;
		return (
			e &&
				Sa.forEach(
					e.split(`
`),
					function (a) {
						if (
							((s = a.indexOf(':')),
							(n = Sa.trim(a.substr(0, s)).toLowerCase()),
							(i = Sa.trim(a.substr(s + 1))),
							n)
						) {
							if (t[n] && jb.indexOf(n) >= 0) return;
							n === 'set-cookie'
								? (t[n] = (t[n] ? t[n] : []).concat([i]))
								: (t[n] = t[n] ? t[n] + ', ' + i : i);
						}
					},
				),
			t
		);
	};
});
var Fh = E((GA, Ph) => {
	'use strict';
	var Lh = Me();
	Ph.exports = Lh.isStandardBrowserEnv()
		? (function () {
				var e = /(msie|trident)/i.test(navigator.userAgent),
					t = document.createElement('a'),
					n;
				function i(s) {
					var o = s;
					return (
						e && (t.setAttribute('href', o), (o = t.href)),
						t.setAttribute('href', o),
						{
							href: t.href,
							protocol: t.protocol ? t.protocol.replace(/:$/, '') : '',
							host: t.host,
							search: t.search ? t.search.replace(/^\?/, '') : '',
							hash: t.hash ? t.hash.replace(/^#/, '') : '',
							hostname: t.hostname,
							port: t.port,
							pathname:
								t.pathname.charAt(0) === '/' ? t.pathname : '/' + t.pathname,
						}
					);
				}
				return (
					(n = i(window.location.href)),
					function (o) {
						var a = Lh.isString(o) ? i(o) : o;
						return a.protocol === n.protocol && a.host === n.host;
					}
				);
		  })()
		: (function () {
				return function () {
					return !0;
				};
		  })();
});
var qh = E(($A, Mh) => {
	'use strict';
	var rs = Me(),
		Gb = va(),
		$b = Th(),
		Hb = Ji(),
		zb = ba(),
		Vb = kh(),
		Wb = Fh(),
		wa = es();
	Mh.exports = function (e) {
		return new Promise(function (n, i) {
			var s = e.data,
				o = e.headers,
				a = e.responseType;
			rs.isFormData(s) && delete o['Content-Type'];
			var c = new XMLHttpRequest();
			if (e.auth) {
				var l = e.auth.username || '',
					u = e.auth.password
						? unescape(encodeURIComponent(e.auth.password))
						: '';
				o.Authorization = 'Basic ' + btoa(l + ':' + u);
			}
			var f = zb(e.baseURL, e.url);
			c.open(e.method.toUpperCase(), Hb(f, e.params, e.paramsSerializer), !0),
				(c.timeout = e.timeout);
			function h() {
				if (c) {
					var y =
							'getAllResponseHeaders' in c
								? Vb(c.getAllResponseHeaders())
								: null,
						b =
							!a || a === 'text' || a === 'json' ? c.responseText : c.response,
						p = {
							data: b,
							status: c.status,
							statusText: c.statusText,
							headers: y,
							config: e,
							request: c,
						};
					Gb(n, i, p), (c = null);
				}
			}
			if (
				('onloadend' in c
					? (c.onloadend = h)
					: (c.onreadystatechange = function () {
							!c ||
								c.readyState !== 4 ||
								(c.status === 0 &&
									!(c.responseURL && c.responseURL.indexOf('file:') === 0)) ||
								setTimeout(h);
					  }),
				(c.onabort = function () {
					c && (i(wa('Request aborted', e, 'ECONNABORTED', c)), (c = null));
				}),
				(c.onerror = function () {
					i(wa('Network Error', e, null, c)), (c = null);
				}),
				(c.ontimeout = function () {
					var b = 'timeout of ' + e.timeout + 'ms exceeded';
					e.timeoutErrorMessage && (b = e.timeoutErrorMessage),
						i(
							wa(
								b,
								e,
								e.transitional && e.transitional.clarifyTimeoutError
									? 'ETIMEDOUT'
									: 'ECONNABORTED',
								c,
							),
						),
						(c = null);
				}),
				rs.isStandardBrowserEnv())
			) {
				var d =
					(e.withCredentials || Wb(f)) && e.xsrfCookieName
						? $b.read(e.xsrfCookieName)
						: void 0;
				d && (o[e.xsrfHeaderName] = d);
			}
			'setRequestHeader' in c &&
				rs.forEach(o, function (b, p) {
					typeof s > 'u' && p.toLowerCase() === 'content-type'
						? delete o[p]
						: c.setRequestHeader(p, b);
				}),
				rs.isUndefined(e.withCredentials) ||
					(c.withCredentials = !!e.withCredentials),
				a && a !== 'json' && (c.responseType = e.responseType),
				typeof e.onDownloadProgress == 'function' &&
					c.addEventListener('progress', e.onDownloadProgress),
				typeof e.onUploadProgress == 'function' &&
					c.upload &&
					c.upload.addEventListener('progress', e.onUploadProgress),
				e.cancelToken &&
					e.cancelToken.promise.then(function (b) {
						c && (c.abort(), i(b), (c = null));
					}),
				s || (s = null),
				c.send(s);
		});
	};
});
var Bh = E((HA, Uh) => {
	var Zr = 1e3,
		Qr = Zr * 60,
		en = Qr * 60,
		Rr = en * 24,
		Xb = Rr * 7,
		Kb = Rr * 365.25;
	Uh.exports = function (r, e) {
		e = e || {};
		var t = typeof r;
		if (t === 'string' && r.length > 0) return Yb(r);
		if (t === 'number' && isFinite(r)) return e.long ? Zb(r) : Jb(r);
		throw new Error(
			'val is not a non-empty string or a valid number. val=' +
				JSON.stringify(r),
		);
	};
	function Yb(r) {
		if (((r = String(r)), !(r.length > 100))) {
			var e =
				/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
					r,
				);
			if (e) {
				var t = parseFloat(e[1]),
					n = (e[2] || 'ms').toLowerCase();
				switch (n) {
					case 'years':
					case 'year':
					case 'yrs':
					case 'yr':
					case 'y':
						return t * Kb;
					case 'weeks':
					case 'week':
					case 'w':
						return t * Xb;
					case 'days':
					case 'day':
					case 'd':
						return t * Rr;
					case 'hours':
					case 'hour':
					case 'hrs':
					case 'hr':
					case 'h':
						return t * en;
					case 'minutes':
					case 'minute':
					case 'mins':
					case 'min':
					case 'm':
						return t * Qr;
					case 'seconds':
					case 'second':
					case 'secs':
					case 'sec':
					case 's':
						return t * Zr;
					case 'milliseconds':
					case 'millisecond':
					case 'msecs':
					case 'msec':
					case 'ms':
						return t;
					default:
						return;
				}
			}
		}
	}
	function Jb(r) {
		var e = Math.abs(r);
		return e >= Rr
			? Math.round(r / Rr) + 'd'
			: e >= en
			? Math.round(r / en) + 'h'
			: e >= Qr
			? Math.round(r / Qr) + 'm'
			: e >= Zr
			? Math.round(r / Zr) + 's'
			: r + 'ms';
	}
	function Zb(r) {
		var e = Math.abs(r);
		return e >= Rr
			? ns(r, e, Rr, 'day')
			: e >= en
			? ns(r, e, en, 'hour')
			: e >= Qr
			? ns(r, e, Qr, 'minute')
			: e >= Zr
			? ns(r, e, Zr, 'second')
			: r + ' ms';
	}
	function ns(r, e, t, n) {
		var i = e >= t * 1.5;
		return Math.round(r / t) + ' ' + n + (i ? 's' : '');
	}
});
var Ra = E((zA, jh) => {
	function Qb(r) {
		(t.debug = t),
			(t.default = t),
			(t.coerce = c),
			(t.disable = s),
			(t.enable = i),
			(t.enabled = o),
			(t.humanize = Bh()),
			(t.destroy = l),
			Object.keys(r).forEach((u) => {
				t[u] = r[u];
			}),
			(t.names = []),
			(t.skips = []),
			(t.formatters = {});
		function e(u) {
			let f = 0;
			for (let h = 0; h < u.length; h++)
				(f = (f << 5) - f + u.charCodeAt(h)), (f |= 0);
			return t.colors[Math.abs(f) % t.colors.length];
		}
		t.selectColor = e;
		function t(u) {
			let f,
				h = null,
				d,
				y;
			function b(...p) {
				if (!b.enabled) return;
				let w = b,
					k = Number(new Date()),
					T = k - (f || k);
				(w.diff = T),
					(w.prev = f),
					(w.curr = k),
					(f = k),
					(p[0] = t.coerce(p[0])),
					typeof p[0] != 'string' && p.unshift('%O');
				let A = 0;
				(p[0] = p[0].replace(/%([a-zA-Z%])/g, (I, z) => {
					if (I === '%%') return '%';
					A++;
					let G = t.formatters[z];
					if (typeof G == 'function') {
						let O = p[A];
						(I = G.call(w, O)), p.splice(A, 1), A--;
					}
					return I;
				})),
					t.formatArgs.call(w, p),
					(w.log || t.log).apply(w, p);
			}
			return (
				(b.namespace = u),
				(b.useColors = t.useColors()),
				(b.color = t.selectColor(u)),
				(b.extend = n),
				(b.destroy = t.destroy),
				Object.defineProperty(b, 'enabled', {
					enumerable: !0,
					configurable: !1,
					get: () =>
						h !== null
							? h
							: (d !== t.namespaces && ((d = t.namespaces), (y = t.enabled(u))),
							  y),
					set: (p) => {
						h = p;
					},
				}),
				typeof t.init == 'function' && t.init(b),
				b
			);
		}
		function n(u, f) {
			let h = t(this.namespace + (typeof f > 'u' ? ':' : f) + u);
			return (h.log = this.log), h;
		}
		function i(u) {
			t.save(u), (t.namespaces = u), (t.names = []), (t.skips = []);
			let f,
				h = (typeof u == 'string' ? u : '').split(/[\s,]+/),
				d = h.length;
			for (f = 0; f < d; f++)
				h[f] &&
					((u = h[f].replace(/\*/g, '.*?')),
					u[0] === '-'
						? t.skips.push(new RegExp('^' + u.slice(1) + '$'))
						: t.names.push(new RegExp('^' + u + '$')));
		}
		function s() {
			let u = [...t.names.map(a), ...t.skips.map(a).map((f) => '-' + f)].join(
				',',
			);
			return t.enable(''), u;
		}
		function o(u) {
			if (u[u.length - 1] === '*') return !0;
			let f, h;
			for (f = 0, h = t.skips.length; f < h; f++)
				if (t.skips[f].test(u)) return !1;
			for (f = 0, h = t.names.length; f < h; f++)
				if (t.names[f].test(u)) return !0;
			return !1;
		}
		function a(u) {
			return u
				.toString()
				.substring(2, u.toString().length - 2)
				.replace(/\.\*\?$/, '*');
		}
		function c(u) {
			return u instanceof Error ? u.stack || u.message : u;
		}
		function l() {
			console.warn(
				'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
			);
		}
		return t.enable(t.load()), t;
	}
	jh.exports = Qb;
});
var Gh = E((Xe, is) => {
	Xe.formatArgs = tS;
	Xe.save = rS;
	Xe.load = nS;
	Xe.useColors = eS;
	Xe.storage = iS();
	Xe.destroy = (() => {
		let r = !1;
		return () => {
			r ||
				((r = !0),
				console.warn(
					'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
				));
		};
	})();
	Xe.colors = [
		'#0000CC',
		'#0000FF',
		'#0033CC',
		'#0033FF',
		'#0066CC',
		'#0066FF',
		'#0099CC',
		'#0099FF',
		'#00CC00',
		'#00CC33',
		'#00CC66',
		'#00CC99',
		'#00CCCC',
		'#00CCFF',
		'#3300CC',
		'#3300FF',
		'#3333CC',
		'#3333FF',
		'#3366CC',
		'#3366FF',
		'#3399CC',
		'#3399FF',
		'#33CC00',
		'#33CC33',
		'#33CC66',
		'#33CC99',
		'#33CCCC',
		'#33CCFF',
		'#6600CC',
		'#6600FF',
		'#6633CC',
		'#6633FF',
		'#66CC00',
		'#66CC33',
		'#9900CC',
		'#9900FF',
		'#9933CC',
		'#9933FF',
		'#99CC00',
		'#99CC33',
		'#CC0000',
		'#CC0033',
		'#CC0066',
		'#CC0099',
		'#CC00CC',
		'#CC00FF',
		'#CC3300',
		'#CC3333',
		'#CC3366',
		'#CC3399',
		'#CC33CC',
		'#CC33FF',
		'#CC6600',
		'#CC6633',
		'#CC9900',
		'#CC9933',
		'#CCCC00',
		'#CCCC33',
		'#FF0000',
		'#FF0033',
		'#FF0066',
		'#FF0099',
		'#FF00CC',
		'#FF00FF',
		'#FF3300',
		'#FF3333',
		'#FF3366',
		'#FF3399',
		'#FF33CC',
		'#FF33FF',
		'#FF6600',
		'#FF6633',
		'#FF9900',
		'#FF9933',
		'#FFCC00',
		'#FFCC33',
	];
	function eS() {
		return typeof window < 'u' &&
			window.process &&
			(window.process.type === 'renderer' || window.process.__nwjs)
			? !0
			: typeof navigator < 'u' &&
			  navigator.userAgent &&
			  navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
			? !1
			: (typeof document < 'u' &&
					document.documentElement &&
					document.documentElement.style &&
					document.documentElement.style.WebkitAppearance) ||
			  (typeof window < 'u' &&
					window.console &&
					(window.console.firebug ||
						(window.console.exception && window.console.table))) ||
			  (typeof navigator < 'u' &&
					navigator.userAgent &&
					navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
					parseInt(RegExp.$1, 10) >= 31) ||
			  (typeof navigator < 'u' &&
					navigator.userAgent &&
					navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
	}
	function tS(r) {
		if (
			((r[0] =
				(this.useColors ? '%c' : '') +
				this.namespace +
				(this.useColors ? ' %c' : ' ') +
				r[0] +
				(this.useColors ? '%c ' : ' ') +
				'+' +
				is.exports.humanize(this.diff)),
			!this.useColors)
		)
			return;
		let e = 'color: ' + this.color;
		r.splice(1, 0, e, 'color: inherit');
		let t = 0,
			n = 0;
		r[0].replace(/%[a-zA-Z%]/g, (i) => {
			i !== '%%' && (t++, i === '%c' && (n = t));
		}),
			r.splice(n, 0, e);
	}
	Xe.log = console.debug || console.log || (() => {});
	function rS(r) {
		try {
			r ? Xe.storage.setItem('debug', r) : Xe.storage.removeItem('debug');
		} catch {}
	}
	function nS() {
		let r;
		try {
			r = Xe.storage.getItem('debug');
		} catch {}
		return (
			!r && typeof process < 'u' && 'env' in process && (r = process.env.DEBUG),
			r
		);
	}
	function iS() {
		try {
			return localStorage;
		} catch {}
	}
	is.exports = Ra()(Xe);
	var { formatters: sS } = is.exports;
	sS.j = function (r) {
		try {
			return JSON.stringify(r);
		} catch (e) {
			return '[UnexpectedJSONParseError]: ' + e.message;
		}
	};
});
var Hh = E((VA, $h) => {
	'use strict';
	$h.exports = (r, e = process.argv) => {
		let t = r.startsWith('-') ? '' : r.length === 1 ? '-' : '--',
			n = e.indexOf(t + r),
			i = e.indexOf('--');
		return n !== -1 && (i === -1 || n < i);
	};
});
var Wh = E((WA, Vh) => {
	'use strict';
	var oS = require('os'),
		zh = require('tty'),
		nt = Hh(),
		{ env: me } = process,
		Wt;
	nt('no-color') || nt('no-colors') || nt('color=false') || nt('color=never')
		? (Wt = 0)
		: (nt('color') || nt('colors') || nt('color=true') || nt('color=always')) &&
		  (Wt = 1);
	'FORCE_COLOR' in me &&
		(me.FORCE_COLOR === 'true'
			? (Wt = 1)
			: me.FORCE_COLOR === 'false'
			? (Wt = 0)
			: (Wt =
					me.FORCE_COLOR.length === 0
						? 1
						: Math.min(parseInt(me.FORCE_COLOR, 10), 3)));
	function xa(r) {
		return r === 0
			? !1
			: { level: r, hasBasic: !0, has256: r >= 2, has16m: r >= 3 };
	}
	function Ta(r, e) {
		if (Wt === 0) return 0;
		if (nt('color=16m') || nt('color=full') || nt('color=truecolor')) return 3;
		if (nt('color=256')) return 2;
		if (r && !e && Wt === void 0) return 0;
		let t = Wt || 0;
		if (me.TERM === 'dumb') return t;
		if (process.platform === 'win32') {
			let n = oS.release().split('.');
			return Number(n[0]) >= 10 && Number(n[2]) >= 10586
				? Number(n[2]) >= 14931
					? 3
					: 2
				: 1;
		}
		if ('CI' in me)
			return [
				'TRAVIS',
				'CIRCLECI',
				'APPVEYOR',
				'GITLAB_CI',
				'GITHUB_ACTIONS',
				'BUILDKITE',
			].some((n) => n in me) || me.CI_NAME === 'codeship'
				? 1
				: t;
		if ('TEAMCITY_VERSION' in me)
			return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(me.TEAMCITY_VERSION) ? 1 : 0;
		if (me.COLORTERM === 'truecolor') return 3;
		if ('TERM_PROGRAM' in me) {
			let n = parseInt((me.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
			switch (me.TERM_PROGRAM) {
				case 'iTerm.app':
					return n >= 3 ? 3 : 2;
				case 'Apple_Terminal':
					return 2;
			}
		}
		return /-256(color)?$/i.test(me.TERM)
			? 2
			: /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
					me.TERM,
			  ) || 'COLORTERM' in me
			? 1
			: t;
	}
	function aS(r) {
		let e = Ta(r, r && r.isTTY);
		return xa(e);
	}
	Vh.exports = {
		supportsColor: aS,
		stdout: xa(Ta(!0, zh.isatty(1))),
		stderr: xa(Ta(!0, zh.isatty(2))),
	};
});
var Kh = E((ve, os) => {
	var cS = require('tty'),
		ss = require('util');
	ve.init = mS;
	ve.log = hS;
	ve.formatArgs = lS;
	ve.save = dS;
	ve.load = pS;
	ve.useColors = uS;
	ve.destroy = ss.deprecate(() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	ve.colors = [6, 2, 3, 4, 5, 1];
	try {
		let r = Wh();
		r &&
			(r.stderr || r).level >= 2 &&
			(ve.colors = [
				20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63,
				68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128,
				129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168,
				169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200,
				201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221,
			]);
	} catch {}
	ve.inspectOpts = Object.keys(process.env)
		.filter((r) => /^debug_/i.test(r))
		.reduce((r, e) => {
			let t = e
					.substring(6)
					.toLowerCase()
					.replace(/_([a-z])/g, (i, s) => s.toUpperCase()),
				n = process.env[e];
			return (
				/^(yes|on|true|enabled)$/i.test(n)
					? (n = !0)
					: /^(no|off|false|disabled)$/i.test(n)
					? (n = !1)
					: n === 'null'
					? (n = null)
					: (n = Number(n)),
				(r[t] = n),
				r
			);
		}, {});
	function uS() {
		return 'colors' in ve.inspectOpts
			? !!ve.inspectOpts.colors
			: cS.isatty(process.stderr.fd);
	}
	function lS(r) {
		let { namespace: e, useColors: t } = this;
		if (t) {
			let n = this.color,
				i = '\x1B[3' + (n < 8 ? n : '8;5;' + n),
				s = `  ${i};1m${e} \x1B[0m`;
			(r[0] =
				s +
				r[0]
					.split(
						`
`,
					)
					.join(
						`
` + s,
					)),
				r.push(i + 'm+' + os.exports.humanize(this.diff) + '\x1B[0m');
		} else r[0] = fS() + e + ' ' + r[0];
	}
	function fS() {
		return ve.inspectOpts.hideDate ? '' : new Date().toISOString() + ' ';
	}
	function hS(...r) {
		return process.stderr.write(
			ss.format(...r) +
				`
`,
		);
	}
	function dS(r) {
		r ? (process.env.DEBUG = r) : delete process.env.DEBUG;
	}
	function pS() {
		return process.env.DEBUG;
	}
	function mS(r) {
		r.inspectOpts = {};
		let e = Object.keys(ve.inspectOpts);
		for (let t = 0; t < e.length; t++)
			r.inspectOpts[e[t]] = ve.inspectOpts[e[t]];
	}
	os.exports = Ra()(ve);
	var { formatters: Xh } = os.exports;
	Xh.o = function (r) {
		return (
			(this.inspectOpts.colors = this.useColors),
			ss
				.inspect(r, this.inspectOpts)
				.split(
					`
`,
				)
				.map((e) => e.trim())
				.join(' ')
		);
	};
	Xh.O = function (r) {
		return (
			(this.inspectOpts.colors = this.useColors),
			ss.inspect(r, this.inspectOpts)
		);
	};
});
var Yh = E((XA, Oa) => {
	typeof process > 'u' ||
	process.type === 'renderer' ||
	process.browser === !0 ||
	process.__nwjs
		? (Oa.exports = Gh())
		: (Oa.exports = Kh());
});
var Zh = E((KA, Jh) => {
	var Jn;
	Jh.exports = function () {
		if (!Jn) {
			try {
				Jn = Yh()('follow-redirects');
			} catch {}
			typeof Jn != 'function' && (Jn = function () {});
		}
		Jn.apply(null, arguments);
	};
});
var Pa = E((YA, La) => {
	var xr = require('url'),
		Ca = xr.URL,
		yS = require('http'),
		ES = require('https'),
		Aa = require('stream').Writable,
		td = require('assert'),
		rd = Zh(),
		Na = ['abort', 'aborted', 'connect', 'error', 'socket', 'timeout'],
		Da = Object.create(null);
	Na.forEach(function (r) {
		Da[r] = function (e, t, n) {
			this._redirectable.emit(r, e, t, n);
		};
	});
	var gS = Qn('ERR_INVALID_URL', 'Invalid URL', TypeError),
		Qh = Qn('ERR_FR_REDIRECTION_FAILURE', 'Redirected request failed'),
		_S = Qn(
			'ERR_FR_TOO_MANY_REDIRECTS',
			'Maximum number of redirects exceeded',
		),
		vS = Qn(
			'ERR_FR_MAX_BODY_LENGTH_EXCEEDED',
			'Request body larger than maxBodyLength limit',
		),
		bS = Qn('ERR_STREAM_WRITE_AFTER_END', 'write after end'),
		SS = Aa.prototype.destroy || id;
	function Ge(r, e) {
		Aa.call(this),
			this._sanitizeOptions(r),
			(this._options = r),
			(this._ended = !1),
			(this._ending = !1),
			(this._redirectCount = 0),
			(this._redirects = []),
			(this._requestBodyLength = 0),
			(this._requestBodyBuffers = []),
			e && this.on('response', e);
		var t = this;
		(this._onNativeResponse = function (n) {
			t._processResponse(n);
		}),
			this._performRequest();
	}
	Ge.prototype = Object.create(Aa.prototype);
	Ge.prototype.abort = function () {
		ka(this._currentRequest), this._currentRequest.abort(), this.emit('abort');
	};
	Ge.prototype.destroy = function (r) {
		return ka(this._currentRequest, r), SS.call(this, r), this;
	};
	Ge.prototype.write = function (r, e, t) {
		if (this._ending) throw new bS();
		if (!Tr(r) && !RS(r))
			throw new TypeError('data should be a string, Buffer or Uint8Array');
		if ((Zn(e) && ((t = e), (e = null)), r.length === 0)) {
			t && t();
			return;
		}
		this._requestBodyLength + r.length <= this._options.maxBodyLength
			? ((this._requestBodyLength += r.length),
			  this._requestBodyBuffers.push({ data: r, encoding: e }),
			  this._currentRequest.write(r, e, t))
			: (this.emit('error', new vS()), this.abort());
	};
	Ge.prototype.end = function (r, e, t) {
		if (
			(Zn(r) ? ((t = r), (r = e = null)) : Zn(e) && ((t = e), (e = null)), !r)
		)
			(this._ended = this._ending = !0),
				this._currentRequest.end(null, null, t);
		else {
			var n = this,
				i = this._currentRequest;
			this.write(r, e, function () {
				(n._ended = !0), i.end(null, null, t);
			}),
				(this._ending = !0);
		}
	};
	Ge.prototype.setHeader = function (r, e) {
		(this._options.headers[r] = e), this._currentRequest.setHeader(r, e);
	};
	Ge.prototype.removeHeader = function (r) {
		delete this._options.headers[r], this._currentRequest.removeHeader(r);
	};
	Ge.prototype.setTimeout = function (r, e) {
		var t = this;
		function n(o) {
			o.setTimeout(r),
				o.removeListener('timeout', o.destroy),
				o.addListener('timeout', o.destroy);
		}
		function i(o) {
			t._timeout && clearTimeout(t._timeout),
				(t._timeout = setTimeout(function () {
					t.emit('timeout'), s();
				}, r)),
				n(o);
		}
		function s() {
			t._timeout && (clearTimeout(t._timeout), (t._timeout = null)),
				t.removeListener('abort', s),
				t.removeListener('error', s),
				t.removeListener('response', s),
				t.removeListener('close', s),
				e && t.removeListener('timeout', e),
				t.socket || t._currentRequest.removeListener('socket', i);
		}
		return (
			e && this.on('timeout', e),
			this.socket ? i(this.socket) : this._currentRequest.once('socket', i),
			this.on('socket', n),
			this.on('abort', s),
			this.on('error', s),
			this.on('response', s),
			this.on('close', s),
			this
		);
	};
	['flushHeaders', 'getHeader', 'setNoDelay', 'setSocketKeepAlive'].forEach(
		function (r) {
			Ge.prototype[r] = function (e, t) {
				return this._currentRequest[r](e, t);
			};
		},
	);
	['aborted', 'connection', 'socket'].forEach(function (r) {
		Object.defineProperty(Ge.prototype, r, {
			get: function () {
				return this._currentRequest[r];
			},
		});
	});
	Ge.prototype._sanitizeOptions = function (r) {
		if (
			(r.headers || (r.headers = {}),
			r.host && (r.hostname || (r.hostname = r.host), delete r.host),
			!r.pathname && r.path)
		) {
			var e = r.path.indexOf('?');
			e < 0
				? (r.pathname = r.path)
				: ((r.pathname = r.path.substring(0, e)),
				  (r.search = r.path.substring(e)));
		}
	};
	Ge.prototype._performRequest = function () {
		var r = this._options.protocol,
			e = this._options.nativeProtocols[r];
		if (!e) {
			this.emit('error', new TypeError('Unsupported protocol ' + r));
			return;
		}
		if (this._options.agents) {
			var t = r.slice(0, -1);
			this._options.agent = this._options.agents[t];
		}
		var n = (this._currentRequest = e.request(
			this._options,
			this._onNativeResponse,
		));
		n._redirectable = this;
		for (var i of Na) n.on(i, Da[i]);
		if (
			((this._currentUrl = /^\//.test(this._options.path)
				? xr.format(this._options)
				: this._options.path),
			this._isRedirect)
		) {
			var s = 0,
				o = this,
				a = this._requestBodyBuffers;
			(function c(l) {
				if (n === o._currentRequest)
					if (l) o.emit('error', l);
					else if (s < a.length) {
						var u = a[s++];
						n.finished || n.write(u.data, u.encoding, c);
					} else o._ended && n.end();
			})();
		}
	};
	Ge.prototype._processResponse = function (r) {
		var e = r.statusCode;
		this._options.trackRedirects &&
			this._redirects.push({
				url: this._currentUrl,
				headers: r.headers,
				statusCode: e,
			});
		var t = r.headers.location;
		if (!t || this._options.followRedirects === !1 || e < 300 || e >= 400) {
			(r.responseUrl = this._currentUrl),
				(r.redirects = this._redirects),
				this.emit('response', r),
				(this._requestBodyBuffers = []);
			return;
		}
		if (
			(ka(this._currentRequest),
			r.destroy(),
			++this._redirectCount > this._options.maxRedirects)
		) {
			this.emit('error', new _S());
			return;
		}
		var n,
			i = this._options.beforeRedirect;
		i &&
			(n = Object.assign(
				{ Host: r.req.getHeader('host') },
				this._options.headers,
			));
		var s = this._options.method;
		(((e === 301 || e === 302) && this._options.method === 'POST') ||
			(e === 303 && !/^(?:GET|HEAD)$/.test(this._options.method))) &&
			((this._options.method = 'GET'),
			(this._requestBodyBuffers = []),
			Ia(/^content-/i, this._options.headers));
		var o = Ia(/^host$/i, this._options.headers),
			a = xr.parse(this._currentUrl),
			c = o || a.host,
			l = /^\w+:/.test(t)
				? this._currentUrl
				: xr.format(Object.assign(a, { host: c })),
			u;
		try {
			u = xr.resolve(l, t);
		} catch (y) {
			this.emit('error', new Qh({ cause: y }));
			return;
		}
		rd('redirecting to', u), (this._isRedirect = !0);
		var f = xr.parse(u);
		if (
			(Object.assign(this._options, f),
			((f.protocol !== a.protocol && f.protocol !== 'https:') ||
				(f.host !== c && !wS(f.host, c))) &&
				Ia(/^(?:authorization|cookie)$/i, this._options.headers),
			Zn(i))
		) {
			var h = { headers: r.headers, statusCode: e },
				d = { url: l, method: s, headers: n };
			try {
				i(this._options, h, d);
			} catch (y) {
				this.emit('error', y);
				return;
			}
			this._sanitizeOptions(this._options);
		}
		try {
			this._performRequest();
		} catch (y) {
			this.emit('error', new Qh({ cause: y }));
		}
	};
	function nd(r) {
		var e = { maxRedirects: 21, maxBodyLength: 10485760 },
			t = {};
		return (
			Object.keys(r).forEach(function (n) {
				var i = n + ':',
					s = (t[i] = r[n]),
					o = (e[n] = Object.create(s));
				function a(l, u, f) {
					if (Tr(l)) {
						var h;
						try {
							h = ed(new Ca(l));
						} catch {
							h = xr.parse(l);
						}
						if (!Tr(h.protocol)) throw new gS({ input: l });
						l = h;
					} else Ca && l instanceof Ca ? (l = ed(l)) : ((f = u), (u = l), (l = { protocol: i }));
					return (
						Zn(u) && ((f = u), (u = null)),
						(u = Object.assign(
							{ maxRedirects: e.maxRedirects, maxBodyLength: e.maxBodyLength },
							l,
							u,
						)),
						(u.nativeProtocols = t),
						!Tr(u.host) && !Tr(u.hostname) && (u.hostname = '::1'),
						td.equal(u.protocol, i, 'protocol mismatch'),
						rd('options', u),
						new Ge(u, f)
					);
				}
				function c(l, u, f) {
					var h = o.request(l, u, f);
					return h.end(), h;
				}
				Object.defineProperties(o, {
					request: { value: a, configurable: !0, enumerable: !0, writable: !0 },
					get: { value: c, configurable: !0, enumerable: !0, writable: !0 },
				});
			}),
			e
		);
	}
	function id() {}
	function ed(r) {
		var e = {
			protocol: r.protocol,
			hostname: r.hostname.startsWith('[')
				? r.hostname.slice(1, -1)
				: r.hostname,
			hash: r.hash,
			search: r.search,
			pathname: r.pathname,
			path: r.pathname + r.search,
			href: r.href,
		};
		return r.port !== '' && (e.port = Number(r.port)), e;
	}
	function Ia(r, e) {
		var t;
		for (var n in e) r.test(n) && ((t = e[n]), delete e[n]);
		return t === null || typeof t > 'u' ? void 0 : String(t).trim();
	}
	function Qn(r, e, t) {
		function n(i) {
			Error.captureStackTrace(this, this.constructor),
				Object.assign(this, i || {}),
				(this.code = r),
				(this.message = this.cause ? e + ': ' + this.cause.message : e);
		}
		return (
			(n.prototype = new (t || Error)()),
			(n.prototype.constructor = n),
			(n.prototype.name = 'Error [' + r + ']'),
			n
		);
	}
	function ka(r, e) {
		for (var t of Na) r.removeListener(t, Da[t]);
		r.on('error', id), r.destroy(e);
	}
	function wS(r, e) {
		td(Tr(r) && Tr(e));
		var t = r.length - e.length - 1;
		return t > 0 && r[t] === '.' && r.endsWith(e);
	}
	function Tr(r) {
		return typeof r == 'string' || r instanceof String;
	}
	function Zn(r) {
		return typeof r == 'function';
	}
	function RS(r) {
		return typeof r == 'object' && 'length' in r;
	}
	La.exports = nd({ http: yS, https: ES });
	La.exports.wrap = nd;
});
var Fa = E((JA, xS) => {
	xS.exports = {
		name: 'axios',
		version: '0.21.2',
		description: 'Promise based HTTP client for the browser and node.js',
		main: 'index.js',
		scripts: {
			test: 'grunt test',
			start: 'node ./sandbox/server.js',
			build: 'NODE_ENV=production grunt build',
			preversion: 'npm test',
			version:
				'npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json',
			postversion: 'git push && git push --tags',
			examples: 'node ./examples/server.js',
			coveralls:
				'cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js',
			fix: 'eslint --fix lib/**/*.js',
		},
		repository: { type: 'git', url: 'https://github.com/axios/axios.git' },
		keywords: ['xhr', 'http', 'ajax', 'promise', 'node'],
		author: 'Matt Zabriskie',
		license: 'MIT',
		bugs: { url: 'https://github.com/axios/axios/issues' },
		homepage: 'https://axios-http.com',
		devDependencies: {
			coveralls: '^3.0.0',
			'es6-promise': '^4.2.4',
			grunt: '^1.3.0',
			'grunt-banner': '^0.6.0',
			'grunt-cli': '^1.2.0',
			'grunt-contrib-clean': '^1.1.0',
			'grunt-contrib-watch': '^1.0.0',
			'grunt-eslint': '^23.0.0',
			'grunt-karma': '^4.0.0',
			'grunt-mocha-test': '^0.13.3',
			'grunt-ts': '^6.0.0-beta.19',
			'grunt-webpack': '^4.0.2',
			'istanbul-instrumenter-loader': '^1.0.0',
			'jasmine-core': '^2.4.1',
			karma: '^6.3.2',
			'karma-chrome-launcher': '^3.1.0',
			'karma-firefox-launcher': '^2.1.0',
			'karma-jasmine': '^1.1.1',
			'karma-jasmine-ajax': '^0.1.13',
			'karma-safari-launcher': '^1.0.0',
			'karma-sauce-launcher': '^4.3.6',
			'karma-sinon': '^1.0.5',
			'karma-sourcemap-loader': '^0.3.8',
			'karma-webpack': '^4.0.2',
			'load-grunt-tasks': '^3.5.2',
			minimist: '^1.2.0',
			mocha: '^8.2.1',
			sinon: '^4.5.0',
			'terser-webpack-plugin': '^4.2.3',
			typescript: '^4.0.5',
			'url-search-params': '^0.10.0',
			webpack: '^4.44.2',
			'webpack-dev-server': '^3.11.0',
		},
		browser: { './lib/adapters/http.js': './lib/adapters/xhr.js' },
		jsdelivr: 'dist/axios.min.js',
		unpkg: 'dist/axios.min.js',
		typings: './index.d.ts',
		dependencies: { 'follow-redirects': '^1.14.0' },
		bundlesize: [{ path: './dist/axios.min.js', threshold: '5kB' }],
	};
});
var ld = E((ZA, ud) => {
	'use strict';
	var ei = Me(),
		sd = va(),
		TS = ba(),
		OS = Ji(),
		CS = require('http'),
		IS = require('https'),
		AS = Pa().http,
		NS = Pa().https,
		od = require('url'),
		DS = require('zlib'),
		kS = Fa(),
		as = es(),
		Ma = Qi(),
		ad = /https:?/;
	function cd(r, e, t) {
		if (
			((r.hostname = e.host),
			(r.host = e.host),
			(r.port = e.port),
			(r.path = t),
			e.auth)
		) {
			var n = Buffer.from(
				e.auth.username + ':' + e.auth.password,
				'utf8',
			).toString('base64');
			r.headers['Proxy-Authorization'] = 'Basic ' + n;
		}
		r.beforeRedirect = function (s) {
			(s.headers.host = s.host), cd(s, e, s.href);
		};
	}
	ud.exports = function (e) {
		return new Promise(function (n, i) {
			var s = function (L) {
					n(L);
				},
				o = function (L) {
					i(L);
				},
				a = e.data,
				c = e.headers;
			if (
				('User-Agent' in c || 'user-agent' in c
					? !c['User-Agent'] &&
					  !c['user-agent'] &&
					  (delete c['User-Agent'], delete c['user-agent'])
					: (c['User-Agent'] = 'axios/' + kS.version),
				a && !ei.isStream(a))
			) {
				if (!Buffer.isBuffer(a))
					if (ei.isArrayBuffer(a)) a = Buffer.from(new Uint8Array(a));
					else if (ei.isString(a)) a = Buffer.from(a, 'utf-8');
					else
						return o(
							as(
								'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
								e,
							),
						);
				c['Content-Length'] = a.length;
			}
			var l = void 0;
			if (e.auth) {
				var u = e.auth.username || '',
					f = e.auth.password || '';
				l = u + ':' + f;
			}
			var h = TS(e.baseURL, e.url),
				d = od.parse(h),
				y = d.protocol || 'http:';
			if (!l && d.auth) {
				var b = d.auth.split(':'),
					p = b[0] || '',
					w = b[1] || '';
				l = p + ':' + w;
			}
			l && delete c.Authorization;
			var k = ad.test(y),
				T = k ? e.httpsAgent : e.httpAgent,
				A = {
					path: OS(d.path, e.params, e.paramsSerializer).replace(/^\?/, ''),
					method: e.method.toUpperCase(),
					headers: c,
					agent: T,
					agents: { http: e.httpAgent, https: e.httpsAgent },
					auth: l,
				};
			e.socketPath
				? (A.socketPath = e.socketPath)
				: ((A.hostname = d.hostname), (A.port = d.port));
			var P = e.proxy;
			if (!P && P !== !1) {
				var I = y.slice(0, -1) + '_proxy',
					z = process.env[I] || process.env[I.toUpperCase()];
				if (z) {
					var G = od.parse(z),
						O = process.env.no_proxy || process.env.NO_PROXY,
						C = !0;
					if (O) {
						var j = O.split(',').map(function (L) {
							return L.trim();
						});
						C = !j.some(function (L) {
							return L
								? L === '*' ||
								  (L[0] === '.' &&
										d.hostname.substr(d.hostname.length - L.length) === L)
									? !0
									: d.hostname === L
								: !1;
						});
					}
					if (
						C &&
						((P = { host: G.hostname, port: G.port, protocol: G.protocol }),
						G.auth)
					) {
						var X = G.auth.split(':');
						P.auth = { username: X[0], password: X[1] };
					}
				}
			}
			P &&
				((A.headers.host = d.hostname + (d.port ? ':' + d.port : '')),
				cd(
					A,
					P,
					y + '//' + d.hostname + (d.port ? ':' + d.port : '') + A.path,
				));
			var V,
				Y = k && (P ? ad.test(P.protocol) : !0);
			e.transport
				? (V = e.transport)
				: e.maxRedirects === 0
				? (V = Y ? IS : CS)
				: (e.maxRedirects && (A.maxRedirects = e.maxRedirects),
				  (V = Y ? NS : AS)),
				e.maxBodyLength > -1 && (A.maxBodyLength = e.maxBodyLength);
			var U = V.request(A, function (L) {
				if (!U.aborted) {
					var H = L,
						le = L.req || U;
					if (
						L.statusCode !== 204 &&
						le.method !== 'HEAD' &&
						e.decompress !== !1
					)
						switch (L.headers['content-encoding']) {
							case 'gzip':
							case 'compress':
							case 'deflate':
								(H = H.pipe(DS.createUnzip())),
									delete L.headers['content-encoding'];
								break;
						}
					var Se = {
						status: L.statusCode,
						statusText: L.statusMessage,
						headers: L.headers,
						config: e,
						request: le,
					};
					if (e.responseType === 'stream') (Se.data = H), sd(s, o, Se);
					else {
						var R = [],
							N = 0;
						H.on('data', function (W) {
							R.push(W),
								(N += W.length),
								e.maxContentLength > -1 &&
									N > e.maxContentLength &&
									(H.destroy(),
									o(
										as(
											'maxContentLength size of ' +
												e.maxContentLength +
												' exceeded',
											e,
											null,
											le,
										),
									));
						}),
							H.on('error', function (W) {
								U.aborted || o(Ma(W, e, null, le));
							}),
							H.on('end', function () {
								var W = Buffer.concat(R);
								e.responseType !== 'arraybuffer' &&
									((W = W.toString(e.responseEncoding)),
									(!e.responseEncoding || e.responseEncoding === 'utf8') &&
										(W = ei.stripBOM(W))),
									(Se.data = W),
									sd(s, o, Se);
							});
					}
				}
			});
			if (
				(U.on('error', function (L) {
					(U.aborted && L.code !== 'ERR_FR_TOO_MANY_REDIRECTS') ||
						o(Ma(L, e, null, U));
				}),
				e.timeout)
			) {
				var K = parseInt(e.timeout, 10);
				if (isNaN(K)) {
					o(
						as(
							'error trying to parse `config.timeout` to int',
							e,
							'ERR_PARSE_TIMEOUT',
							U,
						),
					);
					return;
				}
				U.setTimeout(K, function () {
					U.abort(),
						o(
							as(
								'timeout of ' + K + 'ms exceeded',
								e,
								e.transitional && e.transitional.clarifyTimeoutError
									? 'ETIMEDOUT'
									: 'ECONNABORTED',
								U,
							),
						);
				});
			}
			e.cancelToken &&
				e.cancelToken.promise.then(function (L) {
					U.aborted || (U.abort(), o(L));
				}),
				ei.isStream(a)
					? a
							.on('error', function (L) {
								o(Ma(L, e, null, U));
							})
							.pipe(U)
					: U.end(a);
		});
	};
});
var us = E((QA, dd) => {
	'use strict';
	var qe = Me(),
		fd = bh(),
		LS = Qi(),
		PS = { 'Content-Type': 'application/x-www-form-urlencoded' };
	function hd(r, e) {
		!qe.isUndefined(r) &&
			qe.isUndefined(r['Content-Type']) &&
			(r['Content-Type'] = e);
	}
	function FS() {
		var r;
		return (
			typeof XMLHttpRequest < 'u'
				? (r = qh())
				: typeof process < 'u' &&
				  Object.prototype.toString.call(process) === '[object process]' &&
				  (r = ld()),
			r
		);
	}
	var cs = {
		transitional: {
			silentJSONParsing: !0,
			forcedJSONParsing: !0,
			clarifyTimeoutError: !1,
		},
		adapter: FS(),
		transformRequest: [
			function (e, t) {
				return (
					fd(t, 'Accept'),
					fd(t, 'Content-Type'),
					qe.isFormData(e) ||
					qe.isArrayBuffer(e) ||
					qe.isBuffer(e) ||
					qe.isStream(e) ||
					qe.isFile(e) ||
					qe.isBlob(e)
						? e
						: qe.isArrayBufferView(e)
						? e.buffer
						: qe.isURLSearchParams(e)
						? (hd(t, 'application/x-www-form-urlencoded;charset=utf-8'),
						  e.toString())
						: qe.isObject(e) || (t && t['Content-Type'] === 'application/json')
						? (hd(t, 'application/json'), JSON.stringify(e))
						: e
				);
			},
		],
		transformResponse: [
			function (e) {
				var t = this.transitional,
					n = t && t.silentJSONParsing,
					i = t && t.forcedJSONParsing,
					s = !n && this.responseType === 'json';
				if (s || (i && qe.isString(e) && e.length))
					try {
						return JSON.parse(e);
					} catch (o) {
						if (s)
							throw o.name === 'SyntaxError' ? LS(o, this, 'E_JSON_PARSE') : o;
					}
				return e;
			},
		],
		timeout: 0,
		xsrfCookieName: 'XSRF-TOKEN',
		xsrfHeaderName: 'X-XSRF-TOKEN',
		maxContentLength: -1,
		maxBodyLength: -1,
		validateStatus: function (e) {
			return e >= 200 && e < 300;
		},
	};
	cs.headers = { common: { Accept: 'application/json, text/plain, */*' } };
	qe.forEach(['delete', 'get', 'head'], function (e) {
		cs.headers[e] = {};
	});
	qe.forEach(['post', 'put', 'patch'], function (e) {
		cs.headers[e] = qe.merge(PS);
	});
	dd.exports = cs;
});
var md = E((eN, pd) => {
	'use strict';
	var MS = Me(),
		qS = us();
	pd.exports = function (e, t, n) {
		var i = this || qS;
		return (
			MS.forEach(n, function (o) {
				e = o.call(i, e, t);
			}),
			e
		);
	};
});
var qa = E((tN, yd) => {
	'use strict';
	yd.exports = function (e) {
		return !!(e && e.__CANCEL__);
	};
});
var _d = E((rN, gd) => {
	'use strict';
	var Ed = Me(),
		Ua = md(),
		US = qa(),
		BS = us();
	function Ba(r) {
		r.cancelToken && r.cancelToken.throwIfRequested();
	}
	gd.exports = function (e) {
		Ba(e),
			(e.headers = e.headers || {}),
			(e.data = Ua.call(e, e.data, e.headers, e.transformRequest)),
			(e.headers = Ed.merge(
				e.headers.common || {},
				e.headers[e.method] || {},
				e.headers,
			)),
			Ed.forEach(
				['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
				function (i) {
					delete e.headers[i];
				},
			);
		var t = e.adapter || BS.adapter;
		return t(e).then(
			function (i) {
				return (
					Ba(e),
					(i.data = Ua.call(e, i.data, i.headers, e.transformResponse)),
					i
				);
			},
			function (i) {
				return (
					US(i) ||
						(Ba(e),
						i &&
							i.response &&
							(i.response.data = Ua.call(
								e,
								i.response.data,
								i.response.headers,
								e.transformResponse,
							))),
					Promise.reject(i)
				);
			},
		);
	};
});
var ja = E((nN, vd) => {
	'use strict';
	var xe = Me();
	vd.exports = function (e, t) {
		t = t || {};
		var n = {},
			i = ['url', 'method', 'data'],
			s = ['headers', 'auth', 'proxy', 'params'],
			o = [
				'baseURL',
				'transformRequest',
				'transformResponse',
				'paramsSerializer',
				'timeout',
				'timeoutMessage',
				'withCredentials',
				'adapter',
				'responseType',
				'xsrfCookieName',
				'xsrfHeaderName',
				'onUploadProgress',
				'onDownloadProgress',
				'decompress',
				'maxContentLength',
				'maxBodyLength',
				'maxRedirects',
				'transport',
				'httpAgent',
				'httpsAgent',
				'cancelToken',
				'socketPath',
				'responseEncoding',
			],
			a = ['validateStatus'];
		function c(h, d) {
			return xe.isPlainObject(h) && xe.isPlainObject(d)
				? xe.merge(h, d)
				: xe.isPlainObject(d)
				? xe.merge({}, d)
				: xe.isArray(d)
				? d.slice()
				: d;
		}
		function l(h) {
			xe.isUndefined(t[h])
				? xe.isUndefined(e[h]) || (n[h] = c(void 0, e[h]))
				: (n[h] = c(e[h], t[h]));
		}
		xe.forEach(i, function (d) {
			xe.isUndefined(t[d]) || (n[d] = c(void 0, t[d]));
		}),
			xe.forEach(s, l),
			xe.forEach(o, function (d) {
				xe.isUndefined(t[d])
					? xe.isUndefined(e[d]) || (n[d] = c(void 0, e[d]))
					: (n[d] = c(void 0, t[d]));
			}),
			xe.forEach(a, function (d) {
				d in t ? (n[d] = c(e[d], t[d])) : d in e && (n[d] = c(void 0, e[d]));
			});
		var u = i.concat(s).concat(o).concat(a),
			f = Object.keys(e)
				.concat(Object.keys(t))
				.filter(function (d) {
					return u.indexOf(d) === -1;
				});
		return xe.forEach(f, l), n;
	};
});
var xd = E((iN, Rd) => {
	'use strict';
	var Sd = Fa(),
		Ga = {};
	['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(
		function (r, e) {
			Ga[r] = function (n) {
				return typeof n === r || 'a' + (e < 1 ? 'n ' : ' ') + r;
			};
		},
	);
	var bd = {},
		jS = Sd.version.split('.');
	function wd(r, e) {
		for (var t = e ? e.split('.') : jS, n = r.split('.'), i = 0; i < 3; i++) {
			if (t[i] > n[i]) return !0;
			if (t[i] < n[i]) return !1;
		}
		return !1;
	}
	Ga.transitional = function (e, t, n) {
		var i = t && wd(t);
		function s(o, a) {
			return (
				'[Axios v' +
				Sd.version +
				"] Transitional option '" +
				o +
				"'" +
				a +
				(n ? '. ' + n : '')
			);
		}
		return function (o, a, c) {
			if (e === !1) throw new Error(s(a, ' has been removed in ' + t));
			return (
				i &&
					!bd[a] &&
					((bd[a] = !0),
					console.warn(
						s(
							a,
							' has been deprecated since v' +
								t +
								' and will be removed in the near future',
						),
					)),
				e ? e(o, a, c) : !0
			);
		};
	};
	function GS(r, e, t) {
		if (typeof r != 'object') throw new TypeError('options must be an object');
		for (var n = Object.keys(r), i = n.length; i-- > 0; ) {
			var s = n[i],
				o = e[s];
			if (o) {
				var a = r[s],
					c = a === void 0 || o(a, s, r);
				if (c !== !0) throw new TypeError('option ' + s + ' must be ' + c);
				continue;
			}
			if (t !== !0) throw Error('Unknown option ' + s);
		}
	}
	Rd.exports = { isOlderVersion: wd, assertOptions: GS, validators: Ga };
});
var Nd = E((sN, Ad) => {
	'use strict';
	var Cd = Me(),
		$S = Ji(),
		Td = _h(),
		Od = _d(),
		ls = ja(),
		Id = xd(),
		tn = Id.validators;
	function ti(r) {
		(this.defaults = r),
			(this.interceptors = { request: new Td(), response: new Td() });
	}
	ti.prototype.request = function (e) {
		typeof e == 'string'
			? ((e = arguments[1] || {}), (e.url = arguments[0]))
			: (e = e || {}),
			(e = ls(this.defaults, e)),
			e.method
				? (e.method = e.method.toLowerCase())
				: this.defaults.method
				? (e.method = this.defaults.method.toLowerCase())
				: (e.method = 'get');
		var t = e.transitional;
		t !== void 0 &&
			Id.assertOptions(
				t,
				{
					silentJSONParsing: tn.transitional(tn.boolean, '1.0.0'),
					forcedJSONParsing: tn.transitional(tn.boolean, '1.0.0'),
					clarifyTimeoutError: tn.transitional(tn.boolean, '1.0.0'),
				},
				!1,
			);
		var n = [],
			i = !0;
		this.interceptors.request.forEach(function (h) {
			(typeof h.runWhen == 'function' && h.runWhen(e) === !1) ||
				((i = i && h.synchronous), n.unshift(h.fulfilled, h.rejected));
		});
		var s = [];
		this.interceptors.response.forEach(function (h) {
			s.push(h.fulfilled, h.rejected);
		});
		var o;
		if (!i) {
			var a = [Od, void 0];
			for (
				Array.prototype.unshift.apply(a, n),
					a.concat(s),
					o = Promise.resolve(e);
				a.length;

			)
				o = o.then(a.shift(), a.shift());
			return o;
		}
		for (var c = e; n.length; ) {
			var l = n.shift(),
				u = n.shift();
			try {
				c = l(c);
			} catch (f) {
				u(f);
				break;
			}
		}
		try {
			o = Od(c);
		} catch (f) {
			return Promise.reject(f);
		}
		for (; s.length; ) o = o.then(s.shift(), s.shift());
		return o;
	};
	ti.prototype.getUri = function (e) {
		return (
			(e = ls(this.defaults, e)),
			$S(e.url, e.params, e.paramsSerializer).replace(/^\?/, '')
		);
	};
	Cd.forEach(['delete', 'get', 'head', 'options'], function (e) {
		ti.prototype[e] = function (t, n) {
			return this.request(
				ls(n || {}, { method: e, url: t, data: (n || {}).data }),
			);
		};
	});
	Cd.forEach(['post', 'put', 'patch'], function (e) {
		ti.prototype[e] = function (t, n, i) {
			return this.request(ls(i || {}, { method: e, url: t, data: n }));
		};
	});
	Ad.exports = ti;
});
var Ha = E((oN, Dd) => {
	'use strict';
	function $a(r) {
		this.message = r;
	}
	$a.prototype.toString = function () {
		return 'Cancel' + (this.message ? ': ' + this.message : '');
	};
	$a.prototype.__CANCEL__ = !0;
	Dd.exports = $a;
});
var Ld = E((aN, kd) => {
	'use strict';
	var HS = Ha();
	function fs(r) {
		if (typeof r != 'function')
			throw new TypeError('executor must be a function.');
		var e;
		this.promise = new Promise(function (i) {
			e = i;
		});
		var t = this;
		r(function (i) {
			t.reason || ((t.reason = new HS(i)), e(t.reason));
		});
	}
	fs.prototype.throwIfRequested = function () {
		if (this.reason) throw this.reason;
	};
	fs.source = function () {
		var e,
			t = new fs(function (i) {
				e = i;
			});
		return { token: t, cancel: e };
	};
	kd.exports = fs;
});
var Fd = E((cN, Pd) => {
	'use strict';
	Pd.exports = function (e) {
		return function (n) {
			return e.apply(null, n);
		};
	};
});
var qd = E((uN, Md) => {
	'use strict';
	Md.exports = function (e) {
		return typeof e == 'object' && e.isAxiosError === !0;
	};
});
var jd = E((lN, za) => {
	'use strict';
	var Ud = Me(),
		zS = ma(),
		hs = Nd(),
		VS = ja(),
		WS = us();
	function Bd(r) {
		var e = new hs(r),
			t = zS(hs.prototype.request, e);
		return Ud.extend(t, hs.prototype, e), Ud.extend(t, e), t;
	}
	var ft = Bd(WS);
	ft.Axios = hs;
	ft.create = function (e) {
		return Bd(VS(ft.defaults, e));
	};
	ft.Cancel = Ha();
	ft.CancelToken = Ld();
	ft.isCancel = qa();
	ft.all = function (e) {
		return Promise.all(e);
	};
	ft.spread = Fd();
	ft.isAxiosError = qd();
	za.exports = ft;
	za.exports.default = ft;
});
var Va = E((fN, Gd) => {
	Gd.exports = jd();
});
function Te(r, e = 1e4) {
	let t = (s) => s,
		n = process.env.NX_CLOUD_API || r.url || 'https://cloud.nx.app',
		i = Nt ? Nt : r.accessToken;
	if (!i)
		throw new Error(
			'Unable to authenticate. Either define accessToken in nx.json or set the NX_CLOUD_ACCESS_TOKEN env variable.',
		);
	if (r.customProxyConfigPath) {
		let { nxCloudProxyConfig: s } = require((0, Hd.join)(
			process.cwd(),
			r.customProxyConfigPath,
		));
		t = s ?? t;
	}
	return XS.create(
		t({
			baseURL: n,
			timeout: gt ? Wn : e,
			headers: {
				authorization: i,
				'Nx-Cloud-Client-Version': r.clientVersion || 'unknown',
			},
		}),
	);
}
async function Xa(r, e) {
	let t = new Date(),
		n = await e();
	return M && console.log(`${r}: ${new Date().getTime() - t.getTime()}`), n;
}
async function ce(r, e = Wi) {
	try {
		return await r();
	} catch (t) {
		let n = (t.response && t.response.status) || t.code;
		(n === 401 || n === 403) && (e = 0);
		let i = t.response
			? t.response.data.message
				? t.response.data.message
				: t.response.data
			: t.message;
		if (e === 0)
			throw (
				(typeof i != 'string' && (i = t.message),
				new Wa(
					'failure',
					`Error when connecting to Nx Cloud. Code: ${n}. Error: ${i}`,
					t,
				))
			);
		if (n == 429) {
			if (!ds) {
				let s = 1e4 + (Wi + 1 - e) * 6e4 * Math.random();
				$d.note({ title: `Received Code ${n}. ${i} Retrying in ${s}ms.` }),
					(ds = rt(s));
			}
			await ds, (ds = null);
		} else {
			let s = 1e3 + (Wi + 1 - e) * 4e3 * Math.random();
			M && $d.note({ title: `Received Code ${n}. Retrying in ${s}ms.` }),
				await rt(s);
		}
		return ce(r, e - 1);
	}
}
var Hd,
	$d,
	XS,
	Wa,
	ds,
	_t = B(() => {
		'use strict';
		Hd = require('path');
		oe();
		Yn();
		({ output: $d } = J()),
			(XS = Va()),
			(Wa = class {
				constructor(e, t, n) {
					this.type = e;
					this.message = t;
					this.axiosException = n;
				}
			});
		ds = null;
	});
function Xt(r) {
	KS()
		? (process.stdout.write(`   ${Ka(r)}`), vt.addNewline(), vt.addNewline())
		: YS()
		? (vt.addNewline(),
		  process.stdout.write(`${Ka(r)}`),
		  vt.addNewline(),
		  vt.addNewline())
		: (process.stdout.write(`  ${Ka(r)}`), vt.addNewline(), vt.addNewline());
}
function KS() {
	try {
		return (
			ne(
				'nx/src/tasks-runner/life-cycles/dynamic-run-many-terminal-output-life-cycle',
			),
			!0
		);
	} catch {
		try {
			return (
				ne(
					'@nrwl/workspace/src/tasks-runner/life-cycles/dynamic-run-many-terminal-output-life-cycle',
				),
				!0
			);
		} catch {
			return !1;
		}
	}
}
function Ka(r) {
	let e;
	if (typeof vt.dim == 'function') return vt.dim(r);
	try {
		return vt.colors.gray(r);
	} catch {
		return r;
	}
}
function YS() {
	return (
		process.argv.indexOf('run-many') === -1 &&
		process.argv.indexOf('affected') === -1
	);
}
var vt,
	ri = B(() => {
		'use strict';
		Xr();
		({ output: vt } = J());
	});
var Ya,
	zd,
	Oe,
	re,
	Ce,
	JS,
	ZS,
	rn,
	Dt = B(() => {
		'use strict';
		Ya = require('perf_hooks');
		_t();
		oe();
		ri();
		(zd = []),
			(Oe = (r) => {
				let e = Ya.performance.now();
				return {
					recordMetric: (n) => {
						let i = Ya.performance.now();
						(n.durationMs = i - e), (n.entryType = r), zd.push(n);
					},
				};
			}),
			(re = (r) => {
				var e;
				return {
					success:
						((e = r == null ? void 0 : r.status) == null
							? void 0
							: e.toString().startsWith('2')) ?? !1,
					statusCode: (r == null ? void 0 : r.status) ?? -1,
				};
			}),
			(Ce = { success: !1, statusCode: -1 }),
			(JS = 0.1),
			(ZS = 0.01),
			(rn = (r) => {
				let e;
				Re() ? (e = JS) : (e = ZS);
				try {
					return ch || Math.random() < e
						? (M && Xt('Submitting runner metrics for this run.'),
						  Te(r)
								.post('/nx-cloud/save-metrics', { entries: zd })
								.catch((n) => {}))
						: Promise.resolve();
				} catch {}
			});
	});
function ps(r) {
	return r[r.length - 1] === '/' ? r.substr(0, r.length - 1) : r;
}
var Ja = B(() => {
	'use strict';
});
var QS,
	Kt,
	ms = B(() => {
		'use strict';
		_t();
		({ output: QS } = J()),
			(Kt = class {
				constructor(e) {
					this.apiAxiosInstance = Te(e);
				}
				async reportError(e) {
					try {
						await ce(() =>
							this.apiAxiosInstance.post('/nx-cloud/report-client-error', {
								message: e,
							}),
						);
					} catch (t) {
						QS.warn({
							title: `Unable to record the following error: '${e}'`,
							bodyLines: [t.message],
						});
					}
				}
			});
	});
var sn,
	nn,
	Yt,
	ys = B(() => {
		'use strict';
		(sn = require('crypto')),
			(nn = require('fs')),
			(Yt = class {
				constructor(e) {
					e && (this.encryptionKey = this.to32bytes(e));
				}
				to32bytes(e) {
					let t = e;
					for (; t.length < 32; ) t += e;
					return Buffer.from(t).slice(0, 32);
				}
				hasEncryption() {
					return !!this.encryptionKey;
				}
				encryptFile(e) {
					let t = (0, sn.randomBytes)(16),
						n = (0, sn.createCipheriv)('aes-256-cbc', this.encryptionKey, t),
						i = (0, nn.readFileSync)(e),
						s = n.update(i),
						o = Buffer.concat([t, s, n.final()]);
					(0, nn.writeFileSync)(e, o);
				}
				decryptFile(e) {
					let t = (0, nn.readFileSync)(e);
					try {
						let n = (0, sn.createDecipheriv)(
								'aes-256-cbc',
								this.encryptionKey,
								t.slice(0, 16),
							),
							i = t.slice(16),
							s = n.update(i),
							o = Buffer.concat([s, n.final()]);
						(0, nn.writeFileSync)(e, o);
					} catch {
						throw new Error(
							'Could not decrypt the artifact. Please check your encryption key.',
						);
					}
				}
			});
	});
var on = E((xN, Wd) => {
	'use strict';
	var Vd = new Map([
		['C', 'cwd'],
		['f', 'file'],
		['z', 'gzip'],
		['P', 'preservePaths'],
		['U', 'unlink'],
		['strip-components', 'strip'],
		['stripComponents', 'strip'],
		['keep-newer', 'newer'],
		['keepNewer', 'newer'],
		['keep-newer-files', 'newer'],
		['keepNewerFiles', 'newer'],
		['k', 'keep'],
		['keep-existing', 'keep'],
		['keepExisting', 'keep'],
		['m', 'noMtime'],
		['no-mtime', 'noMtime'],
		['p', 'preserveOwner'],
		['L', 'follow'],
		['h', 'follow'],
	]);
	Wd.exports = (r) =>
		r
			? Object.keys(r)
					.map((e) => [Vd.has(e) ? Vd.get(e) : e, r[e]])
					.reduce((e, t) => ((e[t[0]] = t[1]), e), Object.create(null))
			: {};
});
var cn = E((TN, rp) => {
	'use strict';
	var Xd =
			typeof process == 'object' && process
				? process
				: { stdout: null, stderr: null },
		ew = require('events'),
		Kd = require('stream'),
		Yd = require('string_decoder').StringDecoder,
		kt = Symbol('EOF'),
		Lt = Symbol('maybeEmitEnd'),
		Jt = Symbol('emittedEnd'),
		Es = Symbol('emittingEnd'),
		ni = Symbol('emittedError'),
		gs = Symbol('closed'),
		Jd = Symbol('read'),
		_s = Symbol('flush'),
		Zd = Symbol('flushChunk'),
		$e = Symbol('encoding'),
		Pt = Symbol('decoder'),
		vs = Symbol('flowing'),
		ii = Symbol('paused'),
		an = Symbol('resume'),
		ye = Symbol('bufferLength'),
		Za = Symbol('bufferPush'),
		Qa = Symbol('bufferShift'),
		Ie = Symbol('objectMode'),
		Ae = Symbol('destroyed'),
		ec = Symbol('emitData'),
		Qd = Symbol('emitEnd'),
		tc = Symbol('emitEnd2'),
		Ft = Symbol('async'),
		si = (r) => Promise.resolve().then(r),
		ep = global._MP_NO_ITERATOR_SYMBOLS_ !== '1',
		tw =
			(ep && Symbol.asyncIterator) || Symbol('asyncIterator not implemented'),
		rw = (ep && Symbol.iterator) || Symbol('iterator not implemented'),
		nw = (r) => r === 'end' || r === 'finish' || r === 'prefinish',
		iw = (r) =>
			r instanceof ArrayBuffer ||
			(typeof r == 'object' &&
				r.constructor &&
				r.constructor.name === 'ArrayBuffer' &&
				r.byteLength >= 0),
		sw = (r) => !Buffer.isBuffer(r) && ArrayBuffer.isView(r),
		bs = class {
			constructor(e, t, n) {
				(this.src = e),
					(this.dest = t),
					(this.opts = n),
					(this.ondrain = () => e[an]()),
					t.on('drain', this.ondrain);
			}
			unpipe() {
				this.dest.removeListener('drain', this.ondrain);
			}
			proxyErrors() {}
			end() {
				this.unpipe(), this.opts.end && this.dest.end();
			}
		},
		rc = class extends bs {
			unpipe() {
				this.src.removeListener('error', this.proxyErrors), super.unpipe();
			}
			constructor(e, t, n) {
				super(e, t, n),
					(this.proxyErrors = (i) => t.emit('error', i)),
					e.on('error', this.proxyErrors);
			}
		};
	rp.exports = class tp extends Kd {
		constructor(e) {
			super(),
				(this[vs] = !1),
				(this[ii] = !1),
				(this.pipes = []),
				(this.buffer = []),
				(this[Ie] = (e && e.objectMode) || !1),
				this[Ie] ? (this[$e] = null) : (this[$e] = (e && e.encoding) || null),
				this[$e] === 'buffer' && (this[$e] = null),
				(this[Ft] = (e && !!e.async) || !1),
				(this[Pt] = this[$e] ? new Yd(this[$e]) : null),
				(this[kt] = !1),
				(this[Jt] = !1),
				(this[Es] = !1),
				(this[gs] = !1),
				(this[ni] = null),
				(this.writable = !0),
				(this.readable = !0),
				(this[ye] = 0),
				(this[Ae] = !1);
		}
		get bufferLength() {
			return this[ye];
		}
		get encoding() {
			return this[$e];
		}
		set encoding(e) {
			if (this[Ie]) throw new Error('cannot set encoding in objectMode');
			if (
				this[$e] &&
				e !== this[$e] &&
				((this[Pt] && this[Pt].lastNeed) || this[ye])
			)
				throw new Error('cannot change encoding');
			this[$e] !== e &&
				((this[Pt] = e ? new Yd(e) : null),
				this.buffer.length &&
					(this.buffer = this.buffer.map((t) => this[Pt].write(t)))),
				(this[$e] = e);
		}
		setEncoding(e) {
			this.encoding = e;
		}
		get objectMode() {
			return this[Ie];
		}
		set objectMode(e) {
			this[Ie] = this[Ie] || !!e;
		}
		get async() {
			return this[Ft];
		}
		set async(e) {
			this[Ft] = this[Ft] || !!e;
		}
		write(e, t, n) {
			if (this[kt]) throw new Error('write after end');
			if (this[Ae])
				return (
					this.emit(
						'error',
						Object.assign(
							new Error('Cannot call write after a stream was destroyed'),
							{ code: 'ERR_STREAM_DESTROYED' },
						),
					),
					!0
				);
			typeof t == 'function' && ((n = t), (t = 'utf8')), t || (t = 'utf8');
			let i = this[Ft] ? si : (s) => s();
			return (
				!this[Ie] &&
					!Buffer.isBuffer(e) &&
					(sw(e)
						? (e = Buffer.from(e.buffer, e.byteOffset, e.byteLength))
						: iw(e)
						? (e = Buffer.from(e))
						: typeof e != 'string' && (this.objectMode = !0)),
				this[Ie]
					? (this.flowing && this[ye] !== 0 && this[_s](!0),
					  this.flowing ? this.emit('data', e) : this[Za](e),
					  this[ye] !== 0 && this.emit('readable'),
					  n && i(n),
					  this.flowing)
					: e.length
					? (typeof e == 'string' &&
							!(t === this[$e] && !this[Pt].lastNeed) &&
							(e = Buffer.from(e, t)),
					  Buffer.isBuffer(e) && this[$e] && (e = this[Pt].write(e)),
					  this.flowing && this[ye] !== 0 && this[_s](!0),
					  this.flowing ? this.emit('data', e) : this[Za](e),
					  this[ye] !== 0 && this.emit('readable'),
					  n && i(n),
					  this.flowing)
					: (this[ye] !== 0 && this.emit('readable'), n && i(n), this.flowing)
			);
		}
		read(e) {
			if (this[Ae]) return null;
			if (this[ye] === 0 || e === 0 || e > this[ye]) return this[Lt](), null;
			this[Ie] && (e = null),
				this.buffer.length > 1 &&
					!this[Ie] &&
					(this.encoding
						? (this.buffer = [this.buffer.join('')])
						: (this.buffer = [Buffer.concat(this.buffer, this[ye])]));
			let t = this[Jd](e || null, this.buffer[0]);
			return this[Lt](), t;
		}
		[Jd](e, t) {
			return (
				e === t.length || e === null
					? this[Qa]()
					: ((this.buffer[0] = t.slice(e)),
					  (t = t.slice(0, e)),
					  (this[ye] -= e)),
				this.emit('data', t),
				!this.buffer.length && !this[kt] && this.emit('drain'),
				t
			);
		}
		end(e, t, n) {
			return (
				typeof e == 'function' && ((n = e), (e = null)),
				typeof t == 'function' && ((n = t), (t = 'utf8')),
				e && this.write(e, t),
				n && this.once('end', n),
				(this[kt] = !0),
				(this.writable = !1),
				(this.flowing || !this[ii]) && this[Lt](),
				this
			);
		}
		[an]() {
			this[Ae] ||
				((this[ii] = !1),
				(this[vs] = !0),
				this.emit('resume'),
				this.buffer.length
					? this[_s]()
					: this[kt]
					? this[Lt]()
					: this.emit('drain'));
		}
		resume() {
			return this[an]();
		}
		pause() {
			(this[vs] = !1), (this[ii] = !0);
		}
		get destroyed() {
			return this[Ae];
		}
		get flowing() {
			return this[vs];
		}
		get paused() {
			return this[ii];
		}
		[Za](e) {
			this[Ie] ? (this[ye] += 1) : (this[ye] += e.length), this.buffer.push(e);
		}
		[Qa]() {
			return (
				this.buffer.length &&
					(this[Ie] ? (this[ye] -= 1) : (this[ye] -= this.buffer[0].length)),
				this.buffer.shift()
			);
		}
		[_s](e) {
			do;
			while (this[Zd](this[Qa]()));
			!e && !this.buffer.length && !this[kt] && this.emit('drain');
		}
		[Zd](e) {
			return e ? (this.emit('data', e), this.flowing) : !1;
		}
		pipe(e, t) {
			if (this[Ae]) return;
			let n = this[Jt];
			return (
				(t = t || {}),
				e === Xd.stdout || e === Xd.stderr
					? (t.end = !1)
					: (t.end = t.end !== !1),
				(t.proxyErrors = !!t.proxyErrors),
				n
					? t.end && e.end()
					: (this.pipes.push(
							t.proxyErrors ? new rc(this, e, t) : new bs(this, e, t),
					  ),
					  this[Ft] ? si(() => this[an]()) : this[an]()),
				e
			);
		}
		unpipe(e) {
			let t = this.pipes.find((n) => n.dest === e);
			t && (this.pipes.splice(this.pipes.indexOf(t), 1), t.unpipe());
		}
		addListener(e, t) {
			return this.on(e, t);
		}
		on(e, t) {
			let n = super.on(e, t);
			return (
				e === 'data' && !this.pipes.length && !this.flowing
					? this[an]()
					: e === 'readable' && this[ye] !== 0
					? super.emit('readable')
					: nw(e) && this[Jt]
					? (super.emit(e), this.removeAllListeners(e))
					: e === 'error' &&
					  this[ni] &&
					  (this[Ft]
							? si(() => t.call(this, this[ni]))
							: t.call(this, this[ni])),
				n
			);
		}
		get emittedEnd() {
			return this[Jt];
		}
		[Lt]() {
			!this[Es] &&
				!this[Jt] &&
				!this[Ae] &&
				this.buffer.length === 0 &&
				this[kt] &&
				((this[Es] = !0),
				this.emit('end'),
				this.emit('prefinish'),
				this.emit('finish'),
				this[gs] && this.emit('close'),
				(this[Es] = !1));
		}
		emit(e, t, ...n) {
			if (e !== 'error' && e !== 'close' && e !== Ae && this[Ae]) return;
			if (e === 'data')
				return t ? (this[Ft] ? si(() => this[ec](t)) : this[ec](t)) : !1;
			if (e === 'end') return this[Qd]();
			if (e === 'close') {
				if (((this[gs] = !0), !this[Jt] && !this[Ae])) return;
				let s = super.emit('close');
				return this.removeAllListeners('close'), s;
			} else if (e === 'error') {
				this[ni] = t;
				let s = super.emit('error', t);
				return this[Lt](), s;
			} else if (e === 'resume') {
				let s = super.emit('resume');
				return this[Lt](), s;
			} else if (e === 'finish' || e === 'prefinish') {
				let s = super.emit(e);
				return this.removeAllListeners(e), s;
			}
			let i = super.emit(e, t, ...n);
			return this[Lt](), i;
		}
		[ec](e) {
			for (let n of this.pipes) n.dest.write(e) === !1 && this.pause();
			let t = super.emit('data', e);
			return this[Lt](), t;
		}
		[Qd]() {
			this[Jt] ||
				((this[Jt] = !0),
				(this.readable = !1),
				this[Ft] ? si(() => this[tc]()) : this[tc]());
		}
		[tc]() {
			if (this[Pt]) {
				let t = this[Pt].end();
				if (t) {
					for (let n of this.pipes) n.dest.write(t);
					super.emit('data', t);
				}
			}
			for (let t of this.pipes) t.end();
			let e = super.emit('end');
			return this.removeAllListeners('end'), e;
		}
		collect() {
			let e = [];
			this[Ie] || (e.dataLength = 0);
			let t = this.promise();
			return (
				this.on('data', (n) => {
					e.push(n), this[Ie] || (e.dataLength += n.length);
				}),
				t.then(() => e)
			);
		}
		concat() {
			return this[Ie]
				? Promise.reject(new Error('cannot concat in objectMode'))
				: this.collect().then((e) =>
						this[Ie]
							? Promise.reject(new Error('cannot concat in objectMode'))
							: this[$e]
							? e.join('')
							: Buffer.concat(e, e.dataLength),
				  );
		}
		promise() {
			return new Promise((e, t) => {
				this.on(Ae, () => t(new Error('stream destroyed'))),
					this.on('error', (n) => t(n)),
					this.on('end', () => e());
			});
		}
		[tw]() {
			return {
				next: () => {
					let t = this.read();
					if (t !== null) return Promise.resolve({ done: !1, value: t });
					if (this[kt]) return Promise.resolve({ done: !0 });
					let n = null,
						i = null,
						s = (l) => {
							this.removeListener('data', o),
								this.removeListener('end', a),
								i(l);
						},
						o = (l) => {
							this.removeListener('error', s),
								this.removeListener('end', a),
								this.pause(),
								n({ value: l, done: !!this[kt] });
						},
						a = () => {
							this.removeListener('error', s),
								this.removeListener('data', o),
								n({ done: !0 });
						},
						c = () => s(new Error('stream destroyed'));
					return new Promise((l, u) => {
						(i = u),
							(n = l),
							this.once(Ae, c),
							this.once('error', s),
							this.once('end', a),
							this.once('data', o);
					});
				},
			};
		}
		[rw]() {
			return {
				next: () => {
					let t = this.read();
					return { value: t, done: t === null };
				},
			};
		}
		destroy(e) {
			return this[Ae]
				? (e ? this.emit('error', e) : this.emit(Ae), this)
				: ((this[Ae] = !0),
				  (this.buffer.length = 0),
				  (this[ye] = 0),
				  typeof this.close == 'function' && !this[gs] && this.close(),
				  e ? this.emit('error', e) : this.emit(Ae),
				  this);
		}
		static isStream(e) {
			return (
				!!e &&
				(e instanceof tp ||
					e instanceof Kd ||
					(e instanceof ew &&
						(typeof e.pipe == 'function' ||
							(typeof e.write == 'function' && typeof e.end == 'function'))))
			);
		}
	};
});
var ip = E((ON, np) => {
	var ow = require('zlib').constants || { ZLIB_VERNUM: 4736 };
	np.exports = Object.freeze(
		Object.assign(
			Object.create(null),
			{
				Z_NO_FLUSH: 0,
				Z_PARTIAL_FLUSH: 1,
				Z_SYNC_FLUSH: 2,
				Z_FULL_FLUSH: 3,
				Z_FINISH: 4,
				Z_BLOCK: 5,
				Z_OK: 0,
				Z_STREAM_END: 1,
				Z_NEED_DICT: 2,
				Z_ERRNO: -1,
				Z_STREAM_ERROR: -2,
				Z_DATA_ERROR: -3,
				Z_MEM_ERROR: -4,
				Z_BUF_ERROR: -5,
				Z_VERSION_ERROR: -6,
				Z_NO_COMPRESSION: 0,
				Z_BEST_SPEED: 1,
				Z_BEST_COMPRESSION: 9,
				Z_DEFAULT_COMPRESSION: -1,
				Z_FILTERED: 1,
				Z_HUFFMAN_ONLY: 2,
				Z_RLE: 3,
				Z_FIXED: 4,
				Z_DEFAULT_STRATEGY: 0,
				DEFLATE: 1,
				INFLATE: 2,
				GZIP: 3,
				GUNZIP: 4,
				DEFLATERAW: 5,
				INFLATERAW: 6,
				UNZIP: 7,
				BROTLI_DECODE: 8,
				BROTLI_ENCODE: 9,
				Z_MIN_WINDOWBITS: 8,
				Z_MAX_WINDOWBITS: 15,
				Z_DEFAULT_WINDOWBITS: 15,
				Z_MIN_CHUNK: 64,
				Z_MAX_CHUNK: 1 / 0,
				Z_DEFAULT_CHUNK: 16384,
				Z_MIN_MEMLEVEL: 1,
				Z_MAX_MEMLEVEL: 9,
				Z_DEFAULT_MEMLEVEL: 8,
				Z_MIN_LEVEL: -1,
				Z_MAX_LEVEL: 9,
				Z_DEFAULT_LEVEL: -1,
				BROTLI_OPERATION_PROCESS: 0,
				BROTLI_OPERATION_FLUSH: 1,
				BROTLI_OPERATION_FINISH: 2,
				BROTLI_OPERATION_EMIT_METADATA: 3,
				BROTLI_MODE_GENERIC: 0,
				BROTLI_MODE_TEXT: 1,
				BROTLI_MODE_FONT: 2,
				BROTLI_DEFAULT_MODE: 0,
				BROTLI_MIN_QUALITY: 0,
				BROTLI_MAX_QUALITY: 11,
				BROTLI_DEFAULT_QUALITY: 11,
				BROTLI_MIN_WINDOW_BITS: 10,
				BROTLI_MAX_WINDOW_BITS: 24,
				BROTLI_LARGE_MAX_WINDOW_BITS: 30,
				BROTLI_DEFAULT_WINDOW: 22,
				BROTLI_MIN_INPUT_BLOCK_BITS: 16,
				BROTLI_MAX_INPUT_BLOCK_BITS: 24,
				BROTLI_PARAM_MODE: 0,
				BROTLI_PARAM_QUALITY: 1,
				BROTLI_PARAM_LGWIN: 2,
				BROTLI_PARAM_LGBLOCK: 3,
				BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4,
				BROTLI_PARAM_SIZE_HINT: 5,
				BROTLI_PARAM_LARGE_WINDOW: 6,
				BROTLI_PARAM_NPOSTFIX: 7,
				BROTLI_PARAM_NDIRECT: 8,
				BROTLI_DECODER_RESULT_ERROR: 0,
				BROTLI_DECODER_RESULT_SUCCESS: 1,
				BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2,
				BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3,
				BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0,
				BROTLI_DECODER_PARAM_LARGE_WINDOW: 1,
				BROTLI_DECODER_NO_ERROR: 0,
				BROTLI_DECODER_SUCCESS: 1,
				BROTLI_DECODER_NEEDS_MORE_INPUT: 2,
				BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3,
				BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1,
				BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2,
				BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3,
				BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4,
				BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5,
				BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6,
				BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7,
				BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8,
				BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9,
				BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10,
				BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11,
				BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12,
				BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13,
				BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14,
				BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15,
				BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16,
				BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19,
				BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20,
				BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21,
				BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22,
				BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25,
				BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26,
				BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27,
				BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30,
				BROTLI_DECODER_ERROR_UNREACHABLE: -31,
			},
			ow,
		),
	);
});
var gc = E((Ke) => {
	'use strict';
	var ac = require('assert'),
		Zt = require('buffer').Buffer,
		ap = require('zlib'),
		Or = (Ke.constants = ip()),
		aw = cn(),
		sp = Zt.concat,
		Cr = Symbol('_superWrite'),
		ln = class extends Error {
			constructor(e) {
				super('zlib: ' + e.message),
					(this.code = e.code),
					(this.errno = e.errno),
					this.code || (this.code = 'ZLIB_ERROR'),
					(this.message = 'zlib: ' + e.message),
					Error.captureStackTrace(this, this.constructor);
			}
			get name() {
				return 'ZlibError';
			}
		},
		cw = Symbol('opts'),
		oi = Symbol('flushFlag'),
		op = Symbol('finishFlushFlag'),
		Ec = Symbol('fullFlushFlag'),
		ie = Symbol('handle'),
		Ss = Symbol('onError'),
		un = Symbol('sawError'),
		nc = Symbol('level'),
		ic = Symbol('strategy'),
		sc = Symbol('ended'),
		CN = Symbol('_defaultFullFlush'),
		ws = class extends aw {
			constructor(e, t) {
				if (!e || typeof e != 'object')
					throw new TypeError('invalid options for ZlibBase constructor');
				super(e),
					(this[un] = !1),
					(this[sc] = !1),
					(this[cw] = e),
					(this[oi] = e.flush),
					(this[op] = e.finishFlush);
				try {
					this[ie] = new ap[t](e);
				} catch (n) {
					throw new ln(n);
				}
				(this[Ss] = (n) => {
					this[un] || ((this[un] = !0), this.close(), this.emit('error', n));
				}),
					this[ie].on('error', (n) => this[Ss](new ln(n))),
					this.once('end', () => this.close);
			}
			close() {
				this[ie] && (this[ie].close(), (this[ie] = null), this.emit('close'));
			}
			reset() {
				if (!this[un])
					return ac(this[ie], 'zlib binding closed'), this[ie].reset();
			}
			flush(e) {
				this.ended ||
					(typeof e != 'number' && (e = this[Ec]),
					this.write(Object.assign(Zt.alloc(0), { [oi]: e })));
			}
			end(e, t, n) {
				return (
					e && this.write(e, t),
					this.flush(this[op]),
					(this[sc] = !0),
					super.end(null, null, n)
				);
			}
			get ended() {
				return this[sc];
			}
			write(e, t, n) {
				if (
					(typeof t == 'function' && ((n = t), (t = 'utf8')),
					typeof e == 'string' && (e = Zt.from(e, t)),
					this[un])
				)
					return;
				ac(this[ie], 'zlib binding closed');
				let i = this[ie]._handle,
					s = i.close;
				i.close = () => {};
				let o = this[ie].close;
				(this[ie].close = () => {}), (Zt.concat = (l) => l);
				let a;
				try {
					let l = typeof e[oi] == 'number' ? e[oi] : this[oi];
					(a = this[ie]._processChunk(e, l)), (Zt.concat = sp);
				} catch (l) {
					(Zt.concat = sp), this[Ss](new ln(l));
				} finally {
					this[ie] &&
						((this[ie]._handle = i),
						(i.close = s),
						(this[ie].close = o),
						this[ie].removeAllListeners('error'));
				}
				this[ie] && this[ie].on('error', (l) => this[Ss](new ln(l)));
				let c;
				if (a)
					if (Array.isArray(a) && a.length > 0) {
						c = this[Cr](Zt.from(a[0]));
						for (let l = 1; l < a.length; l++) c = this[Cr](a[l]);
					} else c = this[Cr](Zt.from(a));
				return n && n(), c;
			}
			[Cr](e) {
				return super.write(e);
			}
		},
		Mt = class extends ws {
			constructor(e, t) {
				(e = e || {}),
					(e.flush = e.flush || Or.Z_NO_FLUSH),
					(e.finishFlush = e.finishFlush || Or.Z_FINISH),
					super(e, t),
					(this[Ec] = Or.Z_FULL_FLUSH),
					(this[nc] = e.level),
					(this[ic] = e.strategy);
			}
			params(e, t) {
				if (!this[un]) {
					if (!this[ie])
						throw new Error('cannot switch params when binding is closed');
					if (!this[ie].params)
						throw new Error('not supported in this implementation');
					if (this[nc] !== e || this[ic] !== t) {
						this.flush(Or.Z_SYNC_FLUSH), ac(this[ie], 'zlib binding closed');
						let n = this[ie].flush;
						this[ie].flush = (i, s) => {
							this.flush(i), s();
						};
						try {
							this[ie].params(e, t);
						} finally {
							this[ie].flush = n;
						}
						this[ie] && ((this[nc] = e), (this[ic] = t));
					}
				}
			}
		},
		cc = class extends Mt {
			constructor(e) {
				super(e, 'Deflate');
			}
		},
		uc = class extends Mt {
			constructor(e) {
				super(e, 'Inflate');
			}
		},
		oc = Symbol('_portable'),
		lc = class extends Mt {
			constructor(e) {
				super(e, 'Gzip'), (this[oc] = e && !!e.portable);
			}
			[Cr](e) {
				return this[oc]
					? ((this[oc] = !1), (e[9] = 255), super[Cr](e))
					: super[Cr](e);
			}
		},
		fc = class extends Mt {
			constructor(e) {
				super(e, 'Gunzip');
			}
		},
		hc = class extends Mt {
			constructor(e) {
				super(e, 'DeflateRaw');
			}
		},
		dc = class extends Mt {
			constructor(e) {
				super(e, 'InflateRaw');
			}
		},
		pc = class extends Mt {
			constructor(e) {
				super(e, 'Unzip');
			}
		},
		Rs = class extends ws {
			constructor(e, t) {
				(e = e || {}),
					(e.flush = e.flush || Or.BROTLI_OPERATION_PROCESS),
					(e.finishFlush = e.finishFlush || Or.BROTLI_OPERATION_FINISH),
					super(e, t),
					(this[Ec] = Or.BROTLI_OPERATION_FLUSH);
			}
		},
		mc = class extends Rs {
			constructor(e) {
				super(e, 'BrotliCompress');
			}
		},
		yc = class extends Rs {
			constructor(e) {
				super(e, 'BrotliDecompress');
			}
		};
	Ke.Deflate = cc;
	Ke.Inflate = uc;
	Ke.Gzip = lc;
	Ke.Gunzip = fc;
	Ke.DeflateRaw = hc;
	Ke.InflateRaw = dc;
	Ke.Unzip = pc;
	typeof ap.BrotliCompress == 'function'
		? ((Ke.BrotliCompress = mc), (Ke.BrotliDecompress = yc))
		: (Ke.BrotliCompress = Ke.BrotliDecompress =
				class {
					constructor() {
						throw new Error(
							'Brotli is not supported in this version of Node.js',
						);
					}
				});
});
var fn = E((NN, cp) => {
	var uw = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform;
	cp.exports = uw !== 'win32' ? (r) => r : (r) => r && r.replace(/\\/g, '/');
});
var xs = E((kN, up) => {
	'use strict';
	var lw = cn(),
		_c = fn(),
		vc = Symbol('slurp');
	up.exports = class extends lw {
		constructor(e, t, n) {
			switch (
				(super(),
				this.pause(),
				(this.extended = t),
				(this.globalExtended = n),
				(this.header = e),
				(this.startBlockSize = 512 * Math.ceil(e.size / 512)),
				(this.blockRemain = this.startBlockSize),
				(this.remain = e.size),
				(this.type = e.type),
				(this.meta = !1),
				(this.ignore = !1),
				this.type)
			) {
				case 'File':
				case 'OldFile':
				case 'Link':
				case 'SymbolicLink':
				case 'CharacterDevice':
				case 'BlockDevice':
				case 'Directory':
				case 'FIFO':
				case 'ContiguousFile':
				case 'GNUDumpDir':
					break;
				case 'NextFileHasLongLinkpath':
				case 'NextFileHasLongPath':
				case 'OldGnuLongPath':
				case 'GlobalExtendedHeader':
				case 'ExtendedHeader':
				case 'OldExtendedHeader':
					this.meta = !0;
					break;
				default:
					this.ignore = !0;
			}
			(this.path = _c(e.path)),
				(this.mode = e.mode),
				this.mode && (this.mode = this.mode & 4095),
				(this.uid = e.uid),
				(this.gid = e.gid),
				(this.uname = e.uname),
				(this.gname = e.gname),
				(this.size = e.size),
				(this.mtime = e.mtime),
				(this.atime = e.atime),
				(this.ctime = e.ctime),
				(this.linkpath = _c(e.linkpath)),
				(this.uname = e.uname),
				(this.gname = e.gname),
				t && this[vc](t),
				n && this[vc](n, !0);
		}
		write(e) {
			let t = e.length;
			if (t > this.blockRemain)
				throw new Error('writing more to entry than is appropriate');
			let n = this.remain,
				i = this.blockRemain;
			return (
				(this.remain = Math.max(0, n - t)),
				(this.blockRemain = Math.max(0, i - t)),
				this.ignore ? !0 : n >= t ? super.write(e) : super.write(e.slice(0, n))
			);
		}
		[vc](e, t) {
			for (let n in e)
				e[n] !== null &&
					e[n] !== void 0 &&
					!(t && n === 'path') &&
					(this[n] = n === 'path' || n === 'linkpath' ? _c(e[n]) : e[n]);
		}
	};
});
var bc = E((Ts) => {
	'use strict';
	Ts.name = new Map([
		['0', 'File'],
		['', 'OldFile'],
		['1', 'Link'],
		['2', 'SymbolicLink'],
		['3', 'CharacterDevice'],
		['4', 'BlockDevice'],
		['5', 'Directory'],
		['6', 'FIFO'],
		['7', 'ContiguousFile'],
		['g', 'GlobalExtendedHeader'],
		['x', 'ExtendedHeader'],
		['A', 'SolarisACL'],
		['D', 'GNUDumpDir'],
		['I', 'Inode'],
		['K', 'NextFileHasLongLinkpath'],
		['L', 'NextFileHasLongPath'],
		['M', 'ContinuationFile'],
		['N', 'OldGnuLongPath'],
		['S', 'SparseFile'],
		['V', 'TapeVolumeHeader'],
		['X', 'OldExtendedHeader'],
	]);
	Ts.code = new Map(Array.from(Ts.name).map((r) => [r[1], r[0]]));
});
var dp = E((PN, hp) => {
	'use strict';
	var fw = (r, e) => {
			if (Number.isSafeInteger(r)) r < 0 ? dw(r, e) : hw(r, e);
			else
				throw Error(
					'cannot encode number outside of javascript safe integer range',
				);
			return e;
		},
		hw = (r, e) => {
			e[0] = 128;
			for (var t = e.length; t > 1; t--)
				(e[t - 1] = r & 255), (r = Math.floor(r / 256));
		},
		dw = (r, e) => {
			e[0] = 255;
			var t = !1;
			r = r * -1;
			for (var n = e.length; n > 1; n--) {
				var i = r & 255;
				(r = Math.floor(r / 256)),
					t
						? (e[n - 1] = lp(i))
						: i === 0
						? (e[n - 1] = 0)
						: ((t = !0), (e[n - 1] = fp(i)));
			}
		},
		pw = (r) => {
			let e = r[0],
				t = e === 128 ? yw(r.slice(1, r.length)) : e === 255 ? mw(r) : null;
			if (t === null) throw Error('invalid base256 encoding');
			if (!Number.isSafeInteger(t))
				throw Error('parsed number outside of javascript safe integer range');
			return t;
		},
		mw = (r) => {
			for (var e = r.length, t = 0, n = !1, i = e - 1; i > -1; i--) {
				var s = r[i],
					o;
				n ? (o = lp(s)) : s === 0 ? (o = s) : ((n = !0), (o = fp(s))),
					o !== 0 && (t -= o * Math.pow(256, e - i - 1));
			}
			return t;
		},
		yw = (r) => {
			for (var e = r.length, t = 0, n = e - 1; n > -1; n--) {
				var i = r[n];
				i !== 0 && (t += i * Math.pow(256, e - n - 1));
			}
			return t;
		},
		lp = (r) => (255 ^ r) & 255,
		fp = (r) => ((255 ^ r) + 1) & 255;
	hp.exports = { encode: fw, parse: pw };
});
var dn = E((FN, mp) => {
	'use strict';
	var Sc = bc(),
		hn = require('path').posix,
		pp = dp(),
		wc = Symbol('slurp'),
		Ye = Symbol('type'),
		Tc = class {
			constructor(e, t, n, i) {
				(this.cksumValid = !1),
					(this.needPax = !1),
					(this.nullBlock = !1),
					(this.block = null),
					(this.path = null),
					(this.mode = null),
					(this.uid = null),
					(this.gid = null),
					(this.size = null),
					(this.mtime = null),
					(this.cksum = null),
					(this[Ye] = '0'),
					(this.linkpath = null),
					(this.uname = null),
					(this.gname = null),
					(this.devmaj = 0),
					(this.devmin = 0),
					(this.atime = null),
					(this.ctime = null),
					Buffer.isBuffer(e) ? this.decode(e, t || 0, n, i) : e && this.set(e);
			}
			decode(e, t, n, i) {
				if ((t || (t = 0), !e || !(e.length >= t + 512)))
					throw new Error('need 512 bytes for header');
				if (
					((this.path = Ir(e, t, 100)),
					(this.mode = Qt(e, t + 100, 8)),
					(this.uid = Qt(e, t + 108, 8)),
					(this.gid = Qt(e, t + 116, 8)),
					(this.size = Qt(e, t + 124, 12)),
					(this.mtime = Rc(e, t + 136, 12)),
					(this.cksum = Qt(e, t + 148, 12)),
					this[wc](n),
					this[wc](i, !0),
					(this[Ye] = Ir(e, t + 156, 1)),
					this[Ye] === '' && (this[Ye] = '0'),
					this[Ye] === '0' && this.path.substr(-1) === '/' && (this[Ye] = '5'),
					this[Ye] === '5' && (this.size = 0),
					(this.linkpath = Ir(e, t + 157, 100)),
					e.slice(t + 257, t + 265).toString() === 'ustar\x0000')
				)
					if (
						((this.uname = Ir(e, t + 265, 32)),
						(this.gname = Ir(e, t + 297, 32)),
						(this.devmaj = Qt(e, t + 329, 8)),
						(this.devmin = Qt(e, t + 337, 8)),
						e[t + 475] !== 0)
					) {
						let o = Ir(e, t + 345, 155);
						this.path = o + '/' + this.path;
					} else {
						let o = Ir(e, t + 345, 130);
						o && (this.path = o + '/' + this.path),
							(this.atime = Rc(e, t + 476, 12)),
							(this.ctime = Rc(e, t + 488, 12));
					}
				let s = 8 * 32;
				for (let o = t; o < t + 148; o++) s += e[o];
				for (let o = t + 156; o < t + 512; o++) s += e[o];
				(this.cksumValid = s === this.cksum),
					this.cksum === null && s === 8 * 32 && (this.nullBlock = !0);
			}
			[wc](e, t) {
				for (let n in e)
					e[n] !== null &&
						e[n] !== void 0 &&
						!(t && n === 'path') &&
						(this[n] = e[n]);
			}
			encode(e, t) {
				if (
					(e || ((e = this.block = Buffer.alloc(512)), (t = 0)),
					t || (t = 0),
					!(e.length >= t + 512))
				)
					throw new Error('need 512 bytes for header');
				let n = this.ctime || this.atime ? 130 : 155,
					i = Ew(this.path || '', n),
					s = i[0],
					o = i[1];
				(this.needPax = i[2]),
					(this.needPax = Ar(e, t, 100, s) || this.needPax),
					(this.needPax = er(e, t + 100, 8, this.mode) || this.needPax),
					(this.needPax = er(e, t + 108, 8, this.uid) || this.needPax),
					(this.needPax = er(e, t + 116, 8, this.gid) || this.needPax),
					(this.needPax = er(e, t + 124, 12, this.size) || this.needPax),
					(this.needPax = xc(e, t + 136, 12, this.mtime) || this.needPax),
					(e[t + 156] = this[Ye].charCodeAt(0)),
					(this.needPax = Ar(e, t + 157, 100, this.linkpath) || this.needPax),
					e.write('ustar\x0000', t + 257, 8),
					(this.needPax = Ar(e, t + 265, 32, this.uname) || this.needPax),
					(this.needPax = Ar(e, t + 297, 32, this.gname) || this.needPax),
					(this.needPax = er(e, t + 329, 8, this.devmaj) || this.needPax),
					(this.needPax = er(e, t + 337, 8, this.devmin) || this.needPax),
					(this.needPax = Ar(e, t + 345, n, o) || this.needPax),
					e[t + 475] !== 0
						? (this.needPax = Ar(e, t + 345, 155, o) || this.needPax)
						: ((this.needPax = Ar(e, t + 345, 130, o) || this.needPax),
						  (this.needPax = xc(e, t + 476, 12, this.atime) || this.needPax),
						  (this.needPax = xc(e, t + 488, 12, this.ctime) || this.needPax));
				let a = 8 * 32;
				for (let c = t; c < t + 148; c++) a += e[c];
				for (let c = t + 156; c < t + 512; c++) a += e[c];
				return (
					(this.cksum = a),
					er(e, t + 148, 8, this.cksum),
					(this.cksumValid = !0),
					this.needPax
				);
			}
			set(e) {
				for (let t in e) e[t] !== null && e[t] !== void 0 && (this[t] = e[t]);
			}
			get type() {
				return Sc.name.get(this[Ye]) || this[Ye];
			}
			get typeKey() {
				return this[Ye];
			}
			set type(e) {
				Sc.code.has(e) ? (this[Ye] = Sc.code.get(e)) : (this[Ye] = e);
			}
		},
		Ew = (r, e) => {
			let n = r,
				i = '',
				s,
				o = hn.parse(r).root || '.';
			if (Buffer.byteLength(n) < 100) s = [n, i, !1];
			else {
				(i = hn.dirname(n)), (n = hn.basename(n));
				do
					Buffer.byteLength(n) <= 100 && Buffer.byteLength(i) <= e
						? (s = [n, i, !1])
						: Buffer.byteLength(n) > 100 && Buffer.byteLength(i) <= e
						? (s = [n.substr(0, 100 - 1), i, !0])
						: ((n = hn.join(hn.basename(i), n)), (i = hn.dirname(i)));
				while (i !== o && !s);
				s || (s = [r.substr(0, 100 - 1), '', !0]);
			}
			return s;
		},
		Ir = (r, e, t) =>
			r
				.slice(e, e + t)
				.toString('utf8')
				.replace(/\0.*/, ''),
		Rc = (r, e, t) => gw(Qt(r, e, t)),
		gw = (r) => (r === null ? null : new Date(r * 1e3)),
		Qt = (r, e, t) => (r[e] & 128 ? pp.parse(r.slice(e, e + t)) : vw(r, e, t)),
		_w = (r) => (isNaN(r) ? null : r),
		vw = (r, e, t) =>
			_w(
				parseInt(
					r
						.slice(e, e + t)
						.toString('utf8')
						.replace(/\0.*$/, '')
						.trim(),
					8,
				),
			),
		bw = { 12: 8589934591, 8: 2097151 },
		er = (r, e, t, n) =>
			n === null
				? !1
				: n > bw[t] || n < 0
				? (pp.encode(n, r.slice(e, e + t)), !0)
				: (Sw(r, e, t, n), !1),
		Sw = (r, e, t, n) => r.write(ww(n, t), e, t, 'ascii'),
		ww = (r, e) => Rw(Math.floor(r).toString(8), e),
		Rw = (r, e) =>
			(r.length === e - 1
				? r
				: new Array(e - r.length - 1).join('0') + r + ' ') + '\0',
		xc = (r, e, t, n) => (n === null ? !1 : er(r, e, t, n.getTime() / 1e3)),
		xw = new Array(156).join('\0'),
		Ar = (r, e, t, n) =>
			n === null
				? !1
				: (r.write(n + xw, e, t, 'utf8'),
				  n.length !== Buffer.byteLength(n) || n.length > t);
	mp.exports = Tc;
});
var Os = E((MN, yp) => {
	'use strict';
	var Tw = dn(),
		Ow = require('path'),
		ai = class {
			constructor(e, t) {
				(this.atime = e.atime || null),
					(this.charset = e.charset || null),
					(this.comment = e.comment || null),
					(this.ctime = e.ctime || null),
					(this.gid = e.gid || null),
					(this.gname = e.gname || null),
					(this.linkpath = e.linkpath || null),
					(this.mtime = e.mtime || null),
					(this.path = e.path || null),
					(this.size = e.size || null),
					(this.uid = e.uid || null),
					(this.uname = e.uname || null),
					(this.dev = e.dev || null),
					(this.ino = e.ino || null),
					(this.nlink = e.nlink || null),
					(this.global = t || !1);
			}
			encode() {
				let e = this.encodeBody();
				if (e === '') return null;
				let t = Buffer.byteLength(e),
					n = 512 * Math.ceil(1 + t / 512),
					i = Buffer.allocUnsafe(n);
				for (let s = 0; s < 512; s++) i[s] = 0;
				new Tw({
					path: ('PaxHeader/' + Ow.basename(this.path)).slice(0, 99),
					mode: this.mode || 420,
					uid: this.uid || null,
					gid: this.gid || null,
					size: t,
					mtime: this.mtime || null,
					type: this.global ? 'GlobalExtendedHeader' : 'ExtendedHeader',
					linkpath: '',
					uname: this.uname || '',
					gname: this.gname || '',
					devmaj: 0,
					devmin: 0,
					atime: this.atime || null,
					ctime: this.ctime || null,
				}).encode(i),
					i.write(e, 512, t, 'utf8');
				for (let s = t + 512; s < i.length; s++) i[s] = 0;
				return i;
			}
			encodeBody() {
				return (
					this.encodeField('path') +
					this.encodeField('ctime') +
					this.encodeField('atime') +
					this.encodeField('dev') +
					this.encodeField('ino') +
					this.encodeField('nlink') +
					this.encodeField('charset') +
					this.encodeField('comment') +
					this.encodeField('gid') +
					this.encodeField('gname') +
					this.encodeField('linkpath') +
					this.encodeField('mtime') +
					this.encodeField('size') +
					this.encodeField('uid') +
					this.encodeField('uname')
				);
			}
			encodeField(e) {
				if (this[e] === null || this[e] === void 0) return '';
				let t = this[e] instanceof Date ? this[e].getTime() / 1e3 : this[e],
					n =
						' ' +
						(e === 'dev' || e === 'ino' || e === 'nlink' ? 'SCHILY.' : '') +
						e +
						'=' +
						t +
						`
`,
					i = Buffer.byteLength(n),
					s = Math.floor(Math.log(i) / Math.log(10)) + 1;
				return i + s >= Math.pow(10, s) && (s += 1), s + i + n;
			}
		};
	ai.parse = (r, e, t) => new ai(Cw(Iw(r), e), t);
	var Cw = (r, e) =>
			e ? Object.keys(r).reduce((t, n) => ((t[n] = r[n]), t), e) : r,
		Iw = (r) =>
			r
				.replace(/\n$/, '')
				.split(
					`
`,
				)
				.reduce(Aw, Object.create(null)),
		Aw = (r, e) => {
			let t = parseInt(e, 10);
			if (t !== Buffer.byteLength(e) + 1) return r;
			e = e.substr((t + ' ').length);
			let n = e.split('='),
				i = n.shift().replace(/^SCHILY\.(dev|ino|nlink)/, '$1');
			if (!i) return r;
			let s = n.join('=');
			return (
				(r[i] = /^([A-Z]+\.)?([mac]|birth|creation)time$/.test(i)
					? new Date(s * 1e3)
					: /^[0-9]+$/.test(s)
					? +s
					: s),
				r
			);
		};
	yp.exports = ai;
});
var pn = E((qN, Ep) => {
	Ep.exports = (r) => {
		let e = r.length - 1,
			t = -1;
		for (; e > -1 && r.charAt(e) === '/'; ) (t = e), e--;
		return t === -1 ? r : r.slice(0, t);
	};
});
var Cs = E((UN, gp) => {
	'use strict';
	gp.exports = (r) =>
		class extends r {
			warn(e, t, n = {}) {
				this.file && (n.file = this.file),
					this.cwd && (n.cwd = this.cwd),
					(n.code = (t instanceof Error && t.code) || e),
					(n.tarCode = e),
					!this.strict && n.recoverable !== !1
						? (t instanceof Error &&
								((n = Object.assign(t, n)), (t = t.message)),
						  this.emit('warn', n.tarCode, t, n))
						: t instanceof Error
						? this.emit('error', Object.assign(t, n))
						: this.emit('error', Object.assign(new Error(`${e}: ${t}`), n));
			}
		};
});
var Cc = E((jN, _p) => {
	'use strict';
	var Is = ['|', '<', '>', '?', ':'],
		Oc = Is.map((r) => String.fromCharCode(61440 + r.charCodeAt(0))),
		Nw = new Map(Is.map((r, e) => [r, Oc[e]])),
		Dw = new Map(Oc.map((r, e) => [r, Is[e]]));
	_p.exports = {
		encode: (r) => Is.reduce((e, t) => e.split(t).join(Nw.get(t)), r),
		decode: (r) => Oc.reduce((e, t) => e.split(t).join(Dw.get(t)), r),
	};
});
var Ic = E((GN, bp) => {
	var { isAbsolute: kw, parse: vp } = require('path').win32;
	bp.exports = (r) => {
		let e = '',
			t = vp(r);
		for (; kw(r) || t.root; ) {
			let n = r.charAt(0) === '/' && r.slice(0, 4) !== '//?/' ? '/' : t.root;
			(r = r.substr(n.length)), (e += n), (t = vp(r));
		}
		return [e, r];
	};
});
var wp = E(($N, Sp) => {
	'use strict';
	Sp.exports = (r, e, t) => (
		(r &= 4095),
		t && (r = (r | 384) & -19),
		e && (r & 256 && (r |= 64), r & 32 && (r |= 8), r & 4 && (r |= 1)),
		r
	);
});
var Uc = E((VN, Mp) => {
	'use strict';
	var Ap = cn(),
		Np = Os(),
		Dp = dn(),
		St = require('fs'),
		Rp = require('path'),
		bt = fn(),
		Lw = pn(),
		kp = (r, e) =>
			e ? ((r = bt(r).replace(/^\.(\/|$)/, '')), Lw(e) + '/' + r) : bt(r),
		Pw = 16 * 1024 * 1024,
		xp = Symbol('process'),
		Tp = Symbol('file'),
		Op = Symbol('directory'),
		Nc = Symbol('symlink'),
		Cp = Symbol('hardlink'),
		ci = Symbol('header'),
		As = Symbol('read'),
		Dc = Symbol('lstat'),
		Ns = Symbol('onlstat'),
		kc = Symbol('onread'),
		Lc = Symbol('onreadlink'),
		Pc = Symbol('openfile'),
		Fc = Symbol('onopenfile'),
		tr = Symbol('close'),
		Ds = Symbol('mode'),
		Mc = Symbol('awaitDrain'),
		Ac = Symbol('ondrain'),
		wt = Symbol('prefix'),
		Ip = Symbol('hadError'),
		Lp = Cs(),
		Fw = Cc(),
		Pp = Ic(),
		Fp = wp(),
		ks = Lp(
			class extends Ap {
				constructor(e, t) {
					if (((t = t || {}), super(t), typeof e != 'string'))
						throw new TypeError('path is required');
					(this.path = bt(e)),
						(this.portable = !!t.portable),
						(this.myuid = (process.getuid && process.getuid()) || 0),
						(this.myuser = process.env.USER || ''),
						(this.maxReadSize = t.maxReadSize || Pw),
						(this.linkCache = t.linkCache || new Map()),
						(this.statCache = t.statCache || new Map()),
						(this.preservePaths = !!t.preservePaths),
						(this.cwd = bt(t.cwd || process.cwd())),
						(this.strict = !!t.strict),
						(this.noPax = !!t.noPax),
						(this.noMtime = !!t.noMtime),
						(this.mtime = t.mtime || null),
						(this.prefix = t.prefix ? bt(t.prefix) : null),
						(this.fd = null),
						(this.blockLen = null),
						(this.blockRemain = null),
						(this.buf = null),
						(this.offset = null),
						(this.length = null),
						(this.pos = null),
						(this.remain = null),
						typeof t.onwarn == 'function' && this.on('warn', t.onwarn);
					let n = !1;
					if (!this.preservePaths) {
						let [i, s] = Pp(this.path);
						i && ((this.path = s), (n = i));
					}
					(this.win32 = !!t.win32 || process.platform === 'win32'),
						this.win32 &&
							((this.path = Fw.decode(this.path.replace(/\\/g, '/'))),
							(e = e.replace(/\\/g, '/'))),
						(this.absolute = bt(t.absolute || Rp.resolve(this.cwd, e))),
						this.path === '' && (this.path = './'),
						n &&
							this.warn('TAR_ENTRY_INFO', `stripping ${n} from absolute path`, {
								entry: this,
								path: n + this.path,
							}),
						this.statCache.has(this.absolute)
							? this[Ns](this.statCache.get(this.absolute))
							: this[Dc]();
				}
				emit(e, ...t) {
					return e === 'error' && (this[Ip] = !0), super.emit(e, ...t);
				}
				[Dc]() {
					St.lstat(this.absolute, (e, t) => {
						if (e) return this.emit('error', e);
						this[Ns](t);
					});
				}
				[Ns](e) {
					this.statCache.set(this.absolute, e),
						(this.stat = e),
						e.isFile() || (e.size = 0),
						(this.type = qw(e)),
						this.emit('stat', e),
						this[xp]();
				}
				[xp]() {
					switch (this.type) {
						case 'File':
							return this[Tp]();
						case 'Directory':
							return this[Op]();
						case 'SymbolicLink':
							return this[Nc]();
						default:
							return this.end();
					}
				}
				[Ds](e) {
					return Fp(e, this.type === 'Directory', this.portable);
				}
				[wt](e) {
					return kp(e, this.prefix);
				}
				[ci]() {
					this.type === 'Directory' && this.portable && (this.noMtime = !0),
						(this.header = new Dp({
							path: this[wt](this.path),
							linkpath:
								this.type === 'Link' ? this[wt](this.linkpath) : this.linkpath,
							mode: this[Ds](this.stat.mode),
							uid: this.portable ? null : this.stat.uid,
							gid: this.portable ? null : this.stat.gid,
							size: this.stat.size,
							mtime: this.noMtime ? null : this.mtime || this.stat.mtime,
							type: this.type,
							uname: this.portable
								? null
								: this.stat.uid === this.myuid
								? this.myuser
								: '',
							atime: this.portable ? null : this.stat.atime,
							ctime: this.portable ? null : this.stat.ctime,
						})),
						this.header.encode() &&
							!this.noPax &&
							super.write(
								new Np({
									atime: this.portable ? null : this.header.atime,
									ctime: this.portable ? null : this.header.ctime,
									gid: this.portable ? null : this.header.gid,
									mtime: this.noMtime ? null : this.mtime || this.header.mtime,
									path: this[wt](this.path),
									linkpath:
										this.type === 'Link'
											? this[wt](this.linkpath)
											: this.linkpath,
									size: this.header.size,
									uid: this.portable ? null : this.header.uid,
									uname: this.portable ? null : this.header.uname,
									dev: this.portable ? null : this.stat.dev,
									ino: this.portable ? null : this.stat.ino,
									nlink: this.portable ? null : this.stat.nlink,
								}).encode(),
							),
						super.write(this.header.block);
				}
				[Op]() {
					this.path.substr(-1) !== '/' && (this.path += '/'),
						(this.stat.size = 0),
						this[ci](),
						this.end();
				}
				[Nc]() {
					St.readlink(this.absolute, (e, t) => {
						if (e) return this.emit('error', e);
						this[Lc](t);
					});
				}
				[Lc](e) {
					(this.linkpath = bt(e)), this[ci](), this.end();
				}
				[Cp](e) {
					(this.type = 'Link'),
						(this.linkpath = bt(Rp.relative(this.cwd, e))),
						(this.stat.size = 0),
						this[ci](),
						this.end();
				}
				[Tp]() {
					if (this.stat.nlink > 1) {
						let e = this.stat.dev + ':' + this.stat.ino;
						if (this.linkCache.has(e)) {
							let t = this.linkCache.get(e);
							if (t.indexOf(this.cwd) === 0) return this[Cp](t);
						}
						this.linkCache.set(e, this.absolute);
					}
					if ((this[ci](), this.stat.size === 0)) return this.end();
					this[Pc]();
				}
				[Pc]() {
					St.open(this.absolute, 'r', (e, t) => {
						if (e) return this.emit('error', e);
						this[Fc](t);
					});
				}
				[Fc](e) {
					if (((this.fd = e), this[Ip])) return this[tr]();
					(this.blockLen = 512 * Math.ceil(this.stat.size / 512)),
						(this.blockRemain = this.blockLen);
					let t = Math.min(this.blockLen, this.maxReadSize);
					(this.buf = Buffer.allocUnsafe(t)),
						(this.offset = 0),
						(this.pos = 0),
						(this.remain = this.stat.size),
						(this.length = this.buf.length),
						this[As]();
				}
				[As]() {
					let { fd: e, buf: t, offset: n, length: i, pos: s } = this;
					St.read(e, t, n, i, s, (o, a) => {
						if (o) return this[tr](() => this.emit('error', o));
						this[kc](a);
					});
				}
				[tr](e) {
					St.close(this.fd, e);
				}
				[kc](e) {
					if (e <= 0 && this.remain > 0) {
						let i = new Error('encountered unexpected EOF');
						return (
							(i.path = this.absolute),
							(i.syscall = 'read'),
							(i.code = 'EOF'),
							this[tr](() => this.emit('error', i))
						);
					}
					if (e > this.remain) {
						let i = new Error('did not encounter expected EOF');
						return (
							(i.path = this.absolute),
							(i.syscall = 'read'),
							(i.code = 'EOF'),
							this[tr](() => this.emit('error', i))
						);
					}
					if (e === this.remain)
						for (let i = e; i < this.length && e < this.blockRemain; i++)
							(this.buf[i + this.offset] = 0), e++, this.remain++;
					let t =
						this.offset === 0 && e === this.buf.length
							? this.buf
							: this.buf.slice(this.offset, this.offset + e);
					this.write(t) ? this[Ac]() : this[Mc](() => this[Ac]());
				}
				[Mc](e) {
					this.once('drain', e);
				}
				write(e) {
					if (this.blockRemain < e.length) {
						let t = new Error('writing more data than expected');
						return (t.path = this.absolute), this.emit('error', t);
					}
					return (
						(this.remain -= e.length),
						(this.blockRemain -= e.length),
						(this.pos += e.length),
						(this.offset += e.length),
						super.write(e)
					);
				}
				[Ac]() {
					if (!this.remain)
						return (
							this.blockRemain && super.write(Buffer.alloc(this.blockRemain)),
							this[tr]((e) => (e ? this.emit('error', e) : this.end()))
						);
					this.offset >= this.length &&
						((this.buf = Buffer.allocUnsafe(
							Math.min(this.blockRemain, this.buf.length),
						)),
						(this.offset = 0)),
						(this.length = this.buf.length - this.offset),
						this[As]();
				}
			},
		),
		qc = class extends ks {
			[Dc]() {
				this[Ns](St.lstatSync(this.absolute));
			}
			[Nc]() {
				this[Lc](St.readlinkSync(this.absolute));
			}
			[Pc]() {
				this[Fc](St.openSync(this.absolute, 'r'));
			}
			[As]() {
				let e = !0;
				try {
					let { fd: t, buf: n, offset: i, length: s, pos: o } = this,
						a = St.readSync(t, n, i, s, o);
					this[kc](a), (e = !1);
				} finally {
					if (e)
						try {
							this[tr](() => {});
						} catch {}
				}
			}
			[Mc](e) {
				e();
			}
			[tr](e) {
				St.closeSync(this.fd), e();
			}
		},
		Mw = Lp(
			class extends Ap {
				constructor(e, t) {
					(t = t || {}),
						super(t),
						(this.preservePaths = !!t.preservePaths),
						(this.portable = !!t.portable),
						(this.strict = !!t.strict),
						(this.noPax = !!t.noPax),
						(this.noMtime = !!t.noMtime),
						(this.readEntry = e),
						(this.type = e.type),
						this.type === 'Directory' && this.portable && (this.noMtime = !0),
						(this.prefix = t.prefix || null),
						(this.path = bt(e.path)),
						(this.mode = this[Ds](e.mode)),
						(this.uid = this.portable ? null : e.uid),
						(this.gid = this.portable ? null : e.gid),
						(this.uname = this.portable ? null : e.uname),
						(this.gname = this.portable ? null : e.gname),
						(this.size = e.size),
						(this.mtime = this.noMtime ? null : t.mtime || e.mtime),
						(this.atime = this.portable ? null : e.atime),
						(this.ctime = this.portable ? null : e.ctime),
						(this.linkpath = bt(e.linkpath)),
						typeof t.onwarn == 'function' && this.on('warn', t.onwarn);
					let n = !1;
					if (!this.preservePaths) {
						let [i, s] = Pp(this.path);
						i && ((this.path = s), (n = i));
					}
					(this.remain = e.size),
						(this.blockRemain = e.startBlockSize),
						(this.header = new Dp({
							path: this[wt](this.path),
							linkpath:
								this.type === 'Link' ? this[wt](this.linkpath) : this.linkpath,
							mode: this.mode,
							uid: this.portable ? null : this.uid,
							gid: this.portable ? null : this.gid,
							size: this.size,
							mtime: this.noMtime ? null : this.mtime,
							type: this.type,
							uname: this.portable ? null : this.uname,
							atime: this.portable ? null : this.atime,
							ctime: this.portable ? null : this.ctime,
						})),
						n &&
							this.warn('TAR_ENTRY_INFO', `stripping ${n} from absolute path`, {
								entry: this,
								path: n + this.path,
							}),
						this.header.encode() &&
							!this.noPax &&
							super.write(
								new Np({
									atime: this.portable ? null : this.atime,
									ctime: this.portable ? null : this.ctime,
									gid: this.portable ? null : this.gid,
									mtime: this.noMtime ? null : this.mtime,
									path: this[wt](this.path),
									linkpath:
										this.type === 'Link'
											? this[wt](this.linkpath)
											: this.linkpath,
									size: this.size,
									uid: this.portable ? null : this.uid,
									uname: this.portable ? null : this.uname,
									dev: this.portable ? null : this.readEntry.dev,
									ino: this.portable ? null : this.readEntry.ino,
									nlink: this.portable ? null : this.readEntry.nlink,
								}).encode(),
							),
						super.write(this.header.block),
						e.pipe(this);
				}
				[wt](e) {
					return kp(e, this.prefix);
				}
				[Ds](e) {
					return Fp(e, this.type === 'Directory', this.portable);
				}
				write(e) {
					let t = e.length;
					if (t > this.blockRemain)
						throw new Error('writing more to entry than is appropriate');
					return (this.blockRemain -= t), super.write(e);
				}
				end() {
					return (
						this.blockRemain && super.write(Buffer.alloc(this.blockRemain)),
						super.end()
					);
				}
			},
		);
	ks.Sync = qc;
	ks.Tar = Mw;
	var qw = (r) =>
		r.isFile()
			? 'File'
			: r.isDirectory()
			? 'Directory'
			: r.isSymbolicLink()
			? 'SymbolicLink'
			: 'Unsupported';
	Mp.exports = ks;
});
var Up = E((WN, qp) => {
	'use strict';
	qp.exports = function (r) {
		r.prototype[Symbol.iterator] = function* () {
			for (let e = this.head; e; e = e.next) yield e.value;
		};
	};
});
var Bc = E((XN, Bp) => {
	'use strict';
	Bp.exports = Z;
	Z.Node = Nr;
	Z.create = Z;
	function Z(r) {
		var e = this;
		if (
			(e instanceof Z || (e = new Z()),
			(e.tail = null),
			(e.head = null),
			(e.length = 0),
			r && typeof r.forEach == 'function')
		)
			r.forEach(function (i) {
				e.push(i);
			});
		else if (arguments.length > 0)
			for (var t = 0, n = arguments.length; t < n; t++) e.push(arguments[t]);
		return e;
	}
	Z.prototype.removeNode = function (r) {
		if (r.list !== this)
			throw new Error('removing node which does not belong to this list');
		var e = r.next,
			t = r.prev;
		return (
			e && (e.prev = t),
			t && (t.next = e),
			r === this.head && (this.head = e),
			r === this.tail && (this.tail = t),
			r.list.length--,
			(r.next = null),
			(r.prev = null),
			(r.list = null),
			e
		);
	};
	Z.prototype.unshiftNode = function (r) {
		if (r !== this.head) {
			r.list && r.list.removeNode(r);
			var e = this.head;
			(r.list = this),
				(r.next = e),
				e && (e.prev = r),
				(this.head = r),
				this.tail || (this.tail = r),
				this.length++;
		}
	};
	Z.prototype.pushNode = function (r) {
		if (r !== this.tail) {
			r.list && r.list.removeNode(r);
			var e = this.tail;
			(r.list = this),
				(r.prev = e),
				e && (e.next = r),
				(this.tail = r),
				this.head || (this.head = r),
				this.length++;
		}
	};
	Z.prototype.push = function () {
		for (var r = 0, e = arguments.length; r < e; r++) Bw(this, arguments[r]);
		return this.length;
	};
	Z.prototype.unshift = function () {
		for (var r = 0, e = arguments.length; r < e; r++) jw(this, arguments[r]);
		return this.length;
	};
	Z.prototype.pop = function () {
		if (this.tail) {
			var r = this.tail.value;
			return (
				(this.tail = this.tail.prev),
				this.tail ? (this.tail.next = null) : (this.head = null),
				this.length--,
				r
			);
		}
	};
	Z.prototype.shift = function () {
		if (this.head) {
			var r = this.head.value;
			return (
				(this.head = this.head.next),
				this.head ? (this.head.prev = null) : (this.tail = null),
				this.length--,
				r
			);
		}
	};
	Z.prototype.forEach = function (r, e) {
		e = e || this;
		for (var t = this.head, n = 0; t !== null; n++)
			r.call(e, t.value, n, this), (t = t.next);
	};
	Z.prototype.forEachReverse = function (r, e) {
		e = e || this;
		for (var t = this.tail, n = this.length - 1; t !== null; n--)
			r.call(e, t.value, n, this), (t = t.prev);
	};
	Z.prototype.get = function (r) {
		for (var e = 0, t = this.head; t !== null && e < r; e++) t = t.next;
		if (e === r && t !== null) return t.value;
	};
	Z.prototype.getReverse = function (r) {
		for (var e = 0, t = this.tail; t !== null && e < r; e++) t = t.prev;
		if (e === r && t !== null) return t.value;
	};
	Z.prototype.map = function (r, e) {
		e = e || this;
		for (var t = new Z(), n = this.head; n !== null; )
			t.push(r.call(e, n.value, this)), (n = n.next);
		return t;
	};
	Z.prototype.mapReverse = function (r, e) {
		e = e || this;
		for (var t = new Z(), n = this.tail; n !== null; )
			t.push(r.call(e, n.value, this)), (n = n.prev);
		return t;
	};
	Z.prototype.reduce = function (r, e) {
		var t,
			n = this.head;
		if (arguments.length > 1) t = e;
		else if (this.head) (n = this.head.next), (t = this.head.value);
		else throw new TypeError('Reduce of empty list with no initial value');
		for (var i = 0; n !== null; i++) (t = r(t, n.value, i)), (n = n.next);
		return t;
	};
	Z.prototype.reduceReverse = function (r, e) {
		var t,
			n = this.tail;
		if (arguments.length > 1) t = e;
		else if (this.tail) (n = this.tail.prev), (t = this.tail.value);
		else throw new TypeError('Reduce of empty list with no initial value');
		for (var i = this.length - 1; n !== null; i--)
			(t = r(t, n.value, i)), (n = n.prev);
		return t;
	};
	Z.prototype.toArray = function () {
		for (var r = new Array(this.length), e = 0, t = this.head; t !== null; e++)
			(r[e] = t.value), (t = t.next);
		return r;
	};
	Z.prototype.toArrayReverse = function () {
		for (var r = new Array(this.length), e = 0, t = this.tail; t !== null; e++)
			(r[e] = t.value), (t = t.prev);
		return r;
	};
	Z.prototype.slice = function (r, e) {
		(e = e || this.length),
			e < 0 && (e += this.length),
			(r = r || 0),
			r < 0 && (r += this.length);
		var t = new Z();
		if (e < r || e < 0) return t;
		r < 0 && (r = 0), e > this.length && (e = this.length);
		for (var n = 0, i = this.head; i !== null && n < r; n++) i = i.next;
		for (; i !== null && n < e; n++, i = i.next) t.push(i.value);
		return t;
	};
	Z.prototype.sliceReverse = function (r, e) {
		(e = e || this.length),
			e < 0 && (e += this.length),
			(r = r || 0),
			r < 0 && (r += this.length);
		var t = new Z();
		if (e < r || e < 0) return t;
		r < 0 && (r = 0), e > this.length && (e = this.length);
		for (var n = this.length, i = this.tail; i !== null && n > e; n--)
			i = i.prev;
		for (; i !== null && n > r; n--, i = i.prev) t.push(i.value);
		return t;
	};
	Z.prototype.splice = function (r, e, ...t) {
		r > this.length && (r = this.length - 1), r < 0 && (r = this.length + r);
		for (var n = 0, i = this.head; i !== null && n < r; n++) i = i.next;
		for (var s = [], n = 0; i && n < e; n++)
			s.push(i.value), (i = this.removeNode(i));
		i === null && (i = this.tail),
			i !== this.head && i !== this.tail && (i = i.prev);
		for (var n = 0; n < t.length; n++) i = Uw(this, i, t[n]);
		return s;
	};
	Z.prototype.reverse = function () {
		for (var r = this.head, e = this.tail, t = r; t !== null; t = t.prev) {
			var n = t.prev;
			(t.prev = t.next), (t.next = n);
		}
		return (this.head = e), (this.tail = r), this;
	};
	function Uw(r, e, t) {
		var n = e === r.head ? new Nr(t, null, e, r) : new Nr(t, e, e.next, r);
		return (
			n.next === null && (r.tail = n),
			n.prev === null && (r.head = n),
			r.length++,
			n
		);
	}
	function Bw(r, e) {
		(r.tail = new Nr(e, r.tail, null, r)),
			r.head || (r.head = r.tail),
			r.length++;
	}
	function jw(r, e) {
		(r.head = new Nr(e, null, r.head, r)),
			r.tail || (r.tail = r.head),
			r.length++;
	}
	function Nr(r, e, t, n) {
		if (!(this instanceof Nr)) return new Nr(r, e, t, n);
		(this.list = n),
			(this.value = r),
			e ? ((e.next = this), (this.prev = e)) : (this.prev = null),
			t ? ((t.prev = this), (this.next = t)) : (this.next = null);
	}
	try {
		Up()(Z);
	} catch {}
});
var Gs = E((YN, Wp) => {
	'use strict';
	var Bs = class {
			constructor(e, t) {
				(this.path = e || './'),
					(this.absolute = t),
					(this.entry = null),
					(this.stat = null),
					(this.readdir = null),
					(this.pending = !1),
					(this.ignore = !1),
					(this.piped = !1);
			}
		},
		Gw = cn(),
		$w = gc(),
		Hw = xs(),
		Kc = Uc(),
		zw = Kc.Sync,
		Vw = Kc.Tar,
		Ww = Bc(),
		jp = Buffer.alloc(1024),
		Fs = Symbol('onStat'),
		Ls = Symbol('ended'),
		Rt = Symbol('queue'),
		mn = Symbol('current'),
		Dr = Symbol('process'),
		Ps = Symbol('processing'),
		Gp = Symbol('processJob'),
		xt = Symbol('jobs'),
		jc = Symbol('jobDone'),
		Ms = Symbol('addFSEntry'),
		$p = Symbol('addTarEntry'),
		zc = Symbol('stat'),
		Vc = Symbol('readdir'),
		qs = Symbol('onreaddir'),
		Us = Symbol('pipe'),
		Hp = Symbol('entry'),
		Gc = Symbol('entryOpt'),
		Wc = Symbol('writeEntryClass'),
		Vp = Symbol('write'),
		$c = Symbol('ondrain'),
		js = require('fs'),
		zp = require('path'),
		Xw = Cs(),
		Hc = fn(),
		Yc = Xw(
			class extends Gw {
				constructor(e) {
					super(e),
						(e = e || Object.create(null)),
						(this.opt = e),
						(this.file = e.file || ''),
						(this.cwd = e.cwd || process.cwd()),
						(this.maxReadSize = e.maxReadSize),
						(this.preservePaths = !!e.preservePaths),
						(this.strict = !!e.strict),
						(this.noPax = !!e.noPax),
						(this.prefix = Hc(e.prefix || '')),
						(this.linkCache = e.linkCache || new Map()),
						(this.statCache = e.statCache || new Map()),
						(this.readdirCache = e.readdirCache || new Map()),
						(this[Wc] = Kc),
						typeof e.onwarn == 'function' && this.on('warn', e.onwarn),
						(this.portable = !!e.portable),
						(this.zip = null),
						e.gzip
							? (typeof e.gzip != 'object' && (e.gzip = {}),
							  this.portable && (e.gzip.portable = !0),
							  (this.zip = new $w.Gzip(e.gzip)),
							  this.zip.on('data', (t) => super.write(t)),
							  this.zip.on('end', (t) => super.end()),
							  this.zip.on('drain', (t) => this[$c]()),
							  this.on('resume', (t) => this.zip.resume()))
							: this.on('drain', this[$c]),
						(this.noDirRecurse = !!e.noDirRecurse),
						(this.follow = !!e.follow),
						(this.noMtime = !!e.noMtime),
						(this.mtime = e.mtime || null),
						(this.filter =
							typeof e.filter == 'function' ? e.filter : (t) => !0),
						(this[Rt] = new Ww()),
						(this[xt] = 0),
						(this.jobs = +e.jobs || 4),
						(this[Ps] = !1),
						(this[Ls] = !1);
				}
				[Vp](e) {
					return super.write(e);
				}
				add(e) {
					return this.write(e), this;
				}
				end(e) {
					return e && this.write(e), (this[Ls] = !0), this[Dr](), this;
				}
				write(e) {
					if (this[Ls]) throw new Error('write after end');
					return e instanceof Hw ? this[$p](e) : this[Ms](e), this.flowing;
				}
				[$p](e) {
					let t = Hc(zp.resolve(this.cwd, e.path));
					if (!this.filter(e.path, e)) e.resume();
					else {
						let n = new Bs(e.path, t, !1);
						(n.entry = new Vw(e, this[Gc](n))),
							n.entry.on('end', (i) => this[jc](n)),
							(this[xt] += 1),
							this[Rt].push(n);
					}
					this[Dr]();
				}
				[Ms](e) {
					let t = Hc(zp.resolve(this.cwd, e));
					this[Rt].push(new Bs(e, t)), this[Dr]();
				}
				[zc](e) {
					(e.pending = !0), (this[xt] += 1);
					let t = this.follow ? 'stat' : 'lstat';
					js[t](e.absolute, (n, i) => {
						(e.pending = !1),
							(this[xt] -= 1),
							n ? this.emit('error', n) : this[Fs](e, i);
					});
				}
				[Fs](e, t) {
					this.statCache.set(e.absolute, t),
						(e.stat = t),
						this.filter(e.path, t) || (e.ignore = !0),
						this[Dr]();
				}
				[Vc](e) {
					(e.pending = !0),
						(this[xt] += 1),
						js.readdir(e.absolute, (t, n) => {
							if (((e.pending = !1), (this[xt] -= 1), t))
								return this.emit('error', t);
							this[qs](e, n);
						});
				}
				[qs](e, t) {
					this.readdirCache.set(e.absolute, t), (e.readdir = t), this[Dr]();
				}
				[Dr]() {
					if (!this[Ps]) {
						this[Ps] = !0;
						for (
							let e = this[Rt].head;
							e !== null && this[xt] < this.jobs;
							e = e.next
						)
							if ((this[Gp](e.value), e.value.ignore)) {
								let t = e.next;
								this[Rt].removeNode(e), (e.next = t);
							}
						(this[Ps] = !1),
							this[Ls] &&
								!this[Rt].length &&
								this[xt] === 0 &&
								(this.zip ? this.zip.end(jp) : (super.write(jp), super.end()));
					}
				}
				get [mn]() {
					return this[Rt] && this[Rt].head && this[Rt].head.value;
				}
				[jc](e) {
					this[Rt].shift(), (this[xt] -= 1), this[Dr]();
				}
				[Gp](e) {
					if (!e.pending) {
						if (e.entry) {
							e === this[mn] && !e.piped && this[Us](e);
							return;
						}
						if (
							(e.stat ||
								(this.statCache.has(e.absolute)
									? this[Fs](e, this.statCache.get(e.absolute))
									: this[zc](e)),
							!!e.stat &&
								!e.ignore &&
								!(
									!this.noDirRecurse &&
									e.stat.isDirectory() &&
									!e.readdir &&
									(this.readdirCache.has(e.absolute)
										? this[qs](e, this.readdirCache.get(e.absolute))
										: this[Vc](e),
									!e.readdir)
								))
						) {
							if (((e.entry = this[Hp](e)), !e.entry)) {
								e.ignore = !0;
								return;
							}
							e === this[mn] && !e.piped && this[Us](e);
						}
					}
				}
				[Gc](e) {
					return {
						onwarn: (t, n, i) => this.warn(t, n, i),
						noPax: this.noPax,
						cwd: this.cwd,
						absolute: e.absolute,
						preservePaths: this.preservePaths,
						maxReadSize: this.maxReadSize,
						strict: this.strict,
						portable: this.portable,
						linkCache: this.linkCache,
						statCache: this.statCache,
						noMtime: this.noMtime,
						mtime: this.mtime,
						prefix: this.prefix,
					};
				}
				[Hp](e) {
					this[xt] += 1;
					try {
						return new this[Wc](e.path, this[Gc](e))
							.on('end', () => this[jc](e))
							.on('error', (t) => this.emit('error', t));
					} catch (t) {
						this.emit('error', t);
					}
				}
				[$c]() {
					this[mn] && this[mn].entry && this[mn].entry.resume();
				}
				[Us](e) {
					(e.piped = !0),
						e.readdir &&
							e.readdir.forEach((i) => {
								let s = e.path,
									o = s === './' ? '' : s.replace(/\/*$/, '/');
								this[Ms](o + i);
							});
					let t = e.entry,
						n = this.zip;
					n
						? t.on('data', (i) => {
								n.write(i) || t.pause();
						  })
						: t.on('data', (i) => {
								super.write(i) || t.pause();
						  });
				}
				pause() {
					return this.zip && this.zip.pause(), super.pause();
				}
			},
		),
		Xc = class extends Yc {
			constructor(e) {
				super(e), (this[Wc] = zw);
			}
			pause() {}
			resume() {}
			[zc](e) {
				let t = this.follow ? 'statSync' : 'lstatSync';
				this[Fs](e, js[t](e.absolute));
			}
			[Vc](e, t) {
				this[qs](e, js.readdirSync(e.absolute));
			}
			[Us](e) {
				let t = e.entry,
					n = this.zip;
				e.readdir &&
					e.readdir.forEach((i) => {
						let s = e.path,
							o = s === './' ? '' : s.replace(/\/*$/, '/');
						this[Ms](o + i);
					}),
					n
						? t.on('data', (i) => {
								n.write(i);
						  })
						: t.on('data', (i) => {
								super[Vp](i);
						  });
			}
		};
	Yc.Sync = Xc;
	Wp.exports = Yc;
});
var wn = E((li) => {
	'use strict';
	var Kw = cn(),
		Yw = require('events').EventEmitter,
		He = require('fs'),
		Qc = He.writev;
	if (!Qc) {
		let r = process.binding('fs'),
			e = r.FSReqWrap || r.FSReqCallback;
		Qc = (t, n, i, s) => {
			let o = (c, l) => s(c, l, n),
				a = new e();
			(a.oncomplete = o), r.writeBuffers(t, n, i, a);
		};
	}
	var bn = Symbol('_autoClose'),
		ht = Symbol('_close'),
		ui = Symbol('_ended'),
		te = Symbol('_fd'),
		Xp = Symbol('_finished'),
		nr = Symbol('_flags'),
		Jc = Symbol('_flush'),
		eu = Symbol('_handleChunk'),
		tu = Symbol('_makeBuf'),
		Ws = Symbol('_mode'),
		$s = Symbol('_needDrain'),
		_n = Symbol('_onerror'),
		Sn = Symbol('_onopen'),
		Zc = Symbol('_onread'),
		En = Symbol('_onwrite'),
		ir = Symbol('_open'),
		qt = Symbol('_path'),
		kr = Symbol('_pos'),
		Tt = Symbol('_queue'),
		gn = Symbol('_read'),
		Kp = Symbol('_readSize'),
		rr = Symbol('_reading'),
		Hs = Symbol('_remain'),
		Yp = Symbol('_size'),
		zs = Symbol('_write'),
		yn = Symbol('_writing'),
		Vs = Symbol('_defaultFlag'),
		vn = Symbol('_errored'),
		Xs = class extends Kw {
			constructor(e, t) {
				if (
					((t = t || {}),
					super(t),
					(this.readable = !0),
					(this.writable = !1),
					typeof e != 'string')
				)
					throw new TypeError('path must be a string');
				(this[vn] = !1),
					(this[te] = typeof t.fd == 'number' ? t.fd : null),
					(this[qt] = e),
					(this[Kp] = t.readSize || 16 * 1024 * 1024),
					(this[rr] = !1),
					(this[Yp] = typeof t.size == 'number' ? t.size : 1 / 0),
					(this[Hs] = this[Yp]),
					(this[bn] = typeof t.autoClose == 'boolean' ? t.autoClose : !0),
					typeof this[te] == 'number' ? this[gn]() : this[ir]();
			}
			get fd() {
				return this[te];
			}
			get path() {
				return this[qt];
			}
			write() {
				throw new TypeError('this is a readable stream');
			}
			end() {
				throw new TypeError('this is a readable stream');
			}
			[ir]() {
				He.open(this[qt], 'r', (e, t) => this[Sn](e, t));
			}
			[Sn](e, t) {
				e ? this[_n](e) : ((this[te] = t), this.emit('open', t), this[gn]());
			}
			[tu]() {
				return Buffer.allocUnsafe(Math.min(this[Kp], this[Hs]));
			}
			[gn]() {
				if (!this[rr]) {
					this[rr] = !0;
					let e = this[tu]();
					if (e.length === 0)
						return process.nextTick(() => this[Zc](null, 0, e));
					He.read(this[te], e, 0, e.length, null, (t, n, i) =>
						this[Zc](t, n, i),
					);
				}
			}
			[Zc](e, t, n) {
				(this[rr] = !1), e ? this[_n](e) : this[eu](t, n) && this[gn]();
			}
			[ht]() {
				if (this[bn] && typeof this[te] == 'number') {
					let e = this[te];
					(this[te] = null),
						He.close(e, (t) =>
							t ? this.emit('error', t) : this.emit('close'),
						);
				}
			}
			[_n](e) {
				(this[rr] = !0), this[ht](), this.emit('error', e);
			}
			[eu](e, t) {
				let n = !1;
				return (
					(this[Hs] -= e),
					e > 0 && (n = super.write(e < t.length ? t.slice(0, e) : t)),
					(e === 0 || this[Hs] <= 0) && ((n = !1), this[ht](), super.end()),
					n
				);
			}
			emit(e, t) {
				switch (e) {
					case 'prefinish':
					case 'finish':
						break;
					case 'drain':
						typeof this[te] == 'number' && this[gn]();
						break;
					case 'error':
						return this[vn] ? void 0 : ((this[vn] = !0), super.emit(e, t));
					default:
						return super.emit(e, t);
				}
			}
		},
		ru = class extends Xs {
			[ir]() {
				let e = !0;
				try {
					this[Sn](null, He.openSync(this[qt], 'r')), (e = !1);
				} finally {
					e && this[ht]();
				}
			}
			[gn]() {
				let e = !0;
				try {
					if (!this[rr]) {
						this[rr] = !0;
						do {
							let t = this[tu](),
								n =
									t.length === 0
										? 0
										: He.readSync(this[te], t, 0, t.length, null);
							if (!this[eu](n, t)) break;
						} while (!0);
						this[rr] = !1;
					}
					e = !1;
				} finally {
					e && this[ht]();
				}
			}
			[ht]() {
				if (this[bn] && typeof this[te] == 'number') {
					let e = this[te];
					(this[te] = null), He.closeSync(e), this.emit('close');
				}
			}
		},
		Ks = class extends Yw {
			constructor(e, t) {
				(t = t || {}),
					super(t),
					(this.readable = !1),
					(this.writable = !0),
					(this[vn] = !1),
					(this[yn] = !1),
					(this[ui] = !1),
					(this[$s] = !1),
					(this[Tt] = []),
					(this[qt] = e),
					(this[te] = typeof t.fd == 'number' ? t.fd : null),
					(this[Ws] = t.mode === void 0 ? 438 : t.mode),
					(this[kr] = typeof t.start == 'number' ? t.start : null),
					(this[bn] = typeof t.autoClose == 'boolean' ? t.autoClose : !0);
				let n = this[kr] !== null ? 'r+' : 'w';
				(this[Vs] = t.flags === void 0),
					(this[nr] = this[Vs] ? n : t.flags),
					this[te] === null && this[ir]();
			}
			emit(e, t) {
				if (e === 'error') {
					if (this[vn]) return;
					this[vn] = !0;
				}
				return super.emit(e, t);
			}
			get fd() {
				return this[te];
			}
			get path() {
				return this[qt];
			}
			[_n](e) {
				this[ht](), (this[yn] = !0), this.emit('error', e);
			}
			[ir]() {
				He.open(this[qt], this[nr], this[Ws], (e, t) => this[Sn](e, t));
			}
			[Sn](e, t) {
				this[Vs] && this[nr] === 'r+' && e && e.code === 'ENOENT'
					? ((this[nr] = 'w'), this[ir]())
					: e
					? this[_n](e)
					: ((this[te] = t), this.emit('open', t), this[Jc]());
			}
			end(e, t) {
				return (
					e && this.write(e, t),
					(this[ui] = !0),
					!this[yn] &&
						!this[Tt].length &&
						typeof this[te] == 'number' &&
						this[En](null, 0),
					this
				);
			}
			write(e, t) {
				return (
					typeof e == 'string' && (e = Buffer.from(e, t)),
					this[ui]
						? (this.emit('error', new Error('write() after end()')), !1)
						: this[te] === null || this[yn] || this[Tt].length
						? (this[Tt].push(e), (this[$s] = !0), !1)
						: ((this[yn] = !0), this[zs](e), !0)
				);
			}
			[zs](e) {
				He.write(this[te], e, 0, e.length, this[kr], (t, n) => this[En](t, n));
			}
			[En](e, t) {
				e
					? this[_n](e)
					: (this[kr] !== null && (this[kr] += t),
					  this[Tt].length
							? this[Jc]()
							: ((this[yn] = !1),
							  this[ui] && !this[Xp]
									? ((this[Xp] = !0), this[ht](), this.emit('finish'))
									: this[$s] && ((this[$s] = !1), this.emit('drain'))));
			}
			[Jc]() {
				if (this[Tt].length === 0) this[ui] && this[En](null, 0);
				else if (this[Tt].length === 1) this[zs](this[Tt].pop());
				else {
					let e = this[Tt];
					(this[Tt] = []), Qc(this[te], e, this[kr], (t, n) => this[En](t, n));
				}
			}
			[ht]() {
				if (this[bn] && typeof this[te] == 'number') {
					let e = this[te];
					(this[te] = null),
						He.close(e, (t) =>
							t ? this.emit('error', t) : this.emit('close'),
						);
				}
			}
		},
		nu = class extends Ks {
			[ir]() {
				let e;
				if (this[Vs] && this[nr] === 'r+')
					try {
						e = He.openSync(this[qt], this[nr], this[Ws]);
					} catch (t) {
						if (t.code === 'ENOENT') return (this[nr] = 'w'), this[ir]();
						throw t;
					}
				else e = He.openSync(this[qt], this[nr], this[Ws]);
				this[Sn](null, e);
			}
			[ht]() {
				if (this[bn] && typeof this[te] == 'number') {
					let e = this[te];
					(this[te] = null), He.closeSync(e), this.emit('close');
				}
			}
			[zs](e) {
				let t = !0;
				try {
					this[En](null, He.writeSync(this[te], e, 0, e.length, this[kr])),
						(t = !1);
				} finally {
					if (t)
						try {
							this[ht]();
						} catch {}
				}
			}
		};
	li.ReadStream = Xs;
	li.ReadStreamSync = ru;
	li.WriteStream = Ks;
	li.WriteStreamSync = nu;
});
var ro = E((QN, nm) => {
	'use strict';
	var Jw = Cs(),
		Zw = dn(),
		Qw = require('events'),
		eR = Bc(),
		tR = 1024 * 1024,
		rR = xs(),
		Jp = Os(),
		nR = gc(),
		iu = Buffer.from([31, 139]),
		it = Symbol('state'),
		Lr = Symbol('writeEntry'),
		Ut = Symbol('readEntry'),
		su = Symbol('nextEntry'),
		Zp = Symbol('processEntry'),
		st = Symbol('extendedHeader'),
		fi = Symbol('globalExtendedHeader'),
		sr = Symbol('meta'),
		Qp = Symbol('emitMeta'),
		ae = Symbol('buffer'),
		Bt = Symbol('queue'),
		Pr = Symbol('ended'),
		em = Symbol('emittedEnd'),
		Fr = Symbol('emit'),
		ze = Symbol('unzip'),
		Ys = Symbol('consumeChunk'),
		Js = Symbol('consumeChunkSub'),
		ou = Symbol('consumeBody'),
		tm = Symbol('consumeMeta'),
		rm = Symbol('consumeHeader'),
		Zs = Symbol('consuming'),
		au = Symbol('bufferConcat'),
		cu = Symbol('maybeEnd'),
		hi = Symbol('writing'),
		or = Symbol('aborted'),
		Qs = Symbol('onDone'),
		Mr = Symbol('sawValidEntry'),
		eo = Symbol('sawNullBlock'),
		to = Symbol('sawEOF'),
		iR = (r) => !0;
	nm.exports = Jw(
		class extends Qw {
			constructor(e) {
				(e = e || {}),
					super(e),
					(this.file = e.file || ''),
					(this[Mr] = null),
					this.on(Qs, (t) => {
						(this[it] === 'begin' || this[Mr] === !1) &&
							this.warn('TAR_BAD_ARCHIVE', 'Unrecognized archive format');
					}),
					e.ondone
						? this.on(Qs, e.ondone)
						: this.on(Qs, (t) => {
								this.emit('prefinish'),
									this.emit('finish'),
									this.emit('end'),
									this.emit('close');
						  }),
					(this.strict = !!e.strict),
					(this.maxMetaEntrySize = e.maxMetaEntrySize || tR),
					(this.filter = typeof e.filter == 'function' ? e.filter : iR),
					(this.writable = !0),
					(this.readable = !1),
					(this[Bt] = new eR()),
					(this[ae] = null),
					(this[Ut] = null),
					(this[Lr] = null),
					(this[it] = 'begin'),
					(this[sr] = ''),
					(this[st] = null),
					(this[fi] = null),
					(this[Pr] = !1),
					(this[ze] = null),
					(this[or] = !1),
					(this[eo] = !1),
					(this[to] = !1),
					typeof e.onwarn == 'function' && this.on('warn', e.onwarn),
					typeof e.onentry == 'function' && this.on('entry', e.onentry);
			}
			[rm](e, t) {
				this[Mr] === null && (this[Mr] = !1);
				let n;
				try {
					n = new Zw(e, t, this[st], this[fi]);
				} catch (i) {
					return this.warn('TAR_ENTRY_INVALID', i);
				}
				if (n.nullBlock)
					this[eo]
						? ((this[to] = !0),
						  this[it] === 'begin' && (this[it] = 'header'),
						  this[Fr]('eof'))
						: ((this[eo] = !0), this[Fr]('nullBlock'));
				else if (((this[eo] = !1), !n.cksumValid))
					this.warn('TAR_ENTRY_INVALID', 'checksum failure', { header: n });
				else if (!n.path)
					this.warn('TAR_ENTRY_INVALID', 'path is required', { header: n });
				else {
					let i = n.type;
					if (/^(Symbolic)?Link$/.test(i) && !n.linkpath)
						this.warn('TAR_ENTRY_INVALID', 'linkpath required', { header: n });
					else if (!/^(Symbolic)?Link$/.test(i) && n.linkpath)
						this.warn('TAR_ENTRY_INVALID', 'linkpath forbidden', { header: n });
					else {
						let s = (this[Lr] = new rR(n, this[st], this[fi]));
						if (!this[Mr])
							if (s.remain) {
								let o = () => {
									s.invalid || (this[Mr] = !0);
								};
								s.on('end', o);
							} else this[Mr] = !0;
						s.meta
							? s.size > this.maxMetaEntrySize
								? ((s.ignore = !0),
								  this[Fr]('ignoredEntry', s),
								  (this[it] = 'ignore'),
								  s.resume())
								: s.size > 0 &&
								  ((this[sr] = ''),
								  s.on('data', (o) => (this[sr] += o)),
								  (this[it] = 'meta'))
							: ((this[st] = null),
							  (s.ignore = s.ignore || !this.filter(s.path, s)),
							  s.ignore
									? (this[Fr]('ignoredEntry', s),
									  (this[it] = s.remain ? 'ignore' : 'header'),
									  s.resume())
									: (s.remain
											? (this[it] = 'body')
											: ((this[it] = 'header'), s.end()),
									  this[Ut]
											? this[Bt].push(s)
											: (this[Bt].push(s), this[su]())));
					}
				}
			}
			[Zp](e) {
				let t = !0;
				return (
					e
						? Array.isArray(e)
							? this.emit.apply(this, e)
							: ((this[Ut] = e),
							  this.emit('entry', e),
							  e.emittedEnd || (e.on('end', (n) => this[su]()), (t = !1)))
						: ((this[Ut] = null), (t = !1)),
					t
				);
			}
			[su]() {
				do;
				while (this[Zp](this[Bt].shift()));
				if (!this[Bt].length) {
					let e = this[Ut];
					!e || e.flowing || e.size === e.remain
						? this[hi] || this.emit('drain')
						: e.once('drain', (n) => this.emit('drain'));
				}
			}
			[ou](e, t) {
				let n = this[Lr],
					i = n.blockRemain,
					s = i >= e.length && t === 0 ? e : e.slice(t, t + i);
				return (
					n.write(s),
					n.blockRemain || ((this[it] = 'header'), (this[Lr] = null), n.end()),
					s.length
				);
			}
			[tm](e, t) {
				let n = this[Lr],
					i = this[ou](e, t);
				return this[Lr] || this[Qp](n), i;
			}
			[Fr](e, t, n) {
				!this[Bt].length && !this[Ut]
					? this.emit(e, t, n)
					: this[Bt].push([e, t, n]);
			}
			[Qp](e) {
				switch ((this[Fr]('meta', this[sr]), e.type)) {
					case 'ExtendedHeader':
					case 'OldExtendedHeader':
						this[st] = Jp.parse(this[sr], this[st], !1);
						break;
					case 'GlobalExtendedHeader':
						this[fi] = Jp.parse(this[sr], this[fi], !0);
						break;
					case 'NextFileHasLongPath':
					case 'OldGnuLongPath':
						(this[st] = this[st] || Object.create(null)),
							(this[st].path = this[sr].replace(/\0.*/, ''));
						break;
					case 'NextFileHasLongLinkpath':
						(this[st] = this[st] || Object.create(null)),
							(this[st].linkpath = this[sr].replace(/\0.*/, ''));
						break;
					default:
						throw new Error('unknown meta: ' + e.type);
				}
			}
			abort(e) {
				(this[or] = !0),
					this.emit('abort', e),
					this.warn('TAR_ABORT', e, { recoverable: !1 });
			}
			write(e) {
				if (this[or]) return;
				if (this[ze] === null && e) {
					if (
						(this[ae] &&
							((e = Buffer.concat([this[ae], e])), (this[ae] = null)),
						e.length < iu.length)
					)
						return (this[ae] = e), !0;
					for (let n = 0; this[ze] === null && n < iu.length; n++)
						e[n] !== iu[n] && (this[ze] = !1);
					if (this[ze] === null) {
						let n = this[Pr];
						(this[Pr] = !1),
							(this[ze] = new nR.Unzip()),
							this[ze].on('data', (s) => this[Ys](s)),
							this[ze].on('error', (s) => this.abort(s)),
							this[ze].on('end', (s) => {
								(this[Pr] = !0), this[Ys]();
							}),
							(this[hi] = !0);
						let i = this[ze][n ? 'end' : 'write'](e);
						return (this[hi] = !1), i;
					}
				}
				(this[hi] = !0),
					this[ze] ? this[ze].write(e) : this[Ys](e),
					(this[hi] = !1);
				let t = this[Bt].length ? !1 : this[Ut] ? this[Ut].flowing : !0;
				return (
					!t &&
						!this[Bt].length &&
						this[Ut].once('drain', (n) => this.emit('drain')),
					t
				);
			}
			[au](e) {
				e &&
					!this[or] &&
					(this[ae] = this[ae] ? Buffer.concat([this[ae], e]) : e);
			}
			[cu]() {
				if (this[Pr] && !this[em] && !this[or] && !this[Zs]) {
					this[em] = !0;
					let e = this[Lr];
					if (e && e.blockRemain) {
						let t = this[ae] ? this[ae].length : 0;
						this.warn(
							'TAR_BAD_ARCHIVE',
							`Truncated input (needed ${e.blockRemain} more bytes, only ${t} available)`,
							{ entry: e },
						),
							this[ae] && e.write(this[ae]),
							e.end();
					}
					this[Fr](Qs);
				}
			}
			[Ys](e) {
				if (this[Zs]) this[au](e);
				else if (!e && !this[ae]) this[cu]();
				else {
					if (((this[Zs] = !0), this[ae])) {
						this[au](e);
						let t = this[ae];
						(this[ae] = null), this[Js](t);
					} else this[Js](e);
					for (
						;
						this[ae] && this[ae].length >= 512 && !this[or] && !this[to];

					) {
						let t = this[ae];
						(this[ae] = null), this[Js](t);
					}
					this[Zs] = !1;
				}
				(!this[ae] || this[Pr]) && this[cu]();
			}
			[Js](e) {
				let t = 0,
					n = e.length;
				for (; t + 512 <= n && !this[or] && !this[to]; )
					switch (this[it]) {
						case 'begin':
						case 'header':
							this[rm](e, t), (t += 512);
							break;
						case 'ignore':
						case 'body':
							t += this[ou](e, t);
							break;
						case 'meta':
							t += this[tm](e, t);
							break;
						default:
							throw new Error('invalid state: ' + this[it]);
					}
				t < n &&
					(this[ae]
						? (this[ae] = Buffer.concat([e.slice(t), this[ae]]))
						: (this[ae] = e.slice(t)));
			}
			end(e) {
				this[or] ||
					(this[ze] ? this[ze].end(e) : ((this[Pr] = !0), this.write(e)));
			}
		},
	);
});
var no = E((eD, am) => {
	'use strict';
	var sR = on(),
		sm = ro(),
		Rn = require('fs'),
		oR = wn(),
		im = require('path'),
		uu = pn();
	am.exports = (r, e, t) => {
		typeof r == 'function'
			? ((t = r), (e = null), (r = {}))
			: Array.isArray(r) && ((e = r), (r = {})),
			typeof e == 'function' && ((t = e), (e = null)),
			e ? (e = Array.from(e)) : (e = []);
		let n = sR(r);
		if (n.sync && typeof t == 'function')
			throw new TypeError('callback not supported for sync tar functions');
		if (!n.file && typeof t == 'function')
			throw new TypeError('callback only supported with file option');
		return (
			e.length && cR(n, e),
			n.noResume || aR(n),
			n.file && n.sync ? uR(n) : n.file ? lR(n, t) : om(n)
		);
	};
	var aR = (r) => {
			let e = r.onentry;
			r.onentry = e
				? (t) => {
						e(t), t.resume();
				  }
				: (t) => t.resume();
		},
		cR = (r, e) => {
			let t = new Map(e.map((s) => [uu(s), !0])),
				n = r.filter,
				i = (s, o) => {
					let a = o || im.parse(s).root || '.',
						c = s === a ? !1 : t.has(s) ? t.get(s) : i(im.dirname(s), a);
					return t.set(s, c), c;
				};
			r.filter = n ? (s, o) => n(s, o) && i(uu(s)) : (s) => i(uu(s));
		},
		uR = (r) => {
			let e = om(r),
				t = r.file,
				n = !0,
				i;
			try {
				let s = Rn.statSync(t),
					o = r.maxReadSize || 16 * 1024 * 1024;
				if (s.size < o) e.end(Rn.readFileSync(t));
				else {
					let a = 0,
						c = Buffer.allocUnsafe(o);
					for (i = Rn.openSync(t, 'r'); a < s.size; ) {
						let l = Rn.readSync(i, c, 0, o, a);
						(a += l), e.write(c.slice(0, l));
					}
					e.end();
				}
				n = !1;
			} finally {
				if (n && i)
					try {
						Rn.closeSync(i);
					} catch {}
			}
		},
		lR = (r, e) => {
			let t = new sm(r),
				n = r.maxReadSize || 16 * 1024 * 1024,
				i = r.file,
				s = new Promise((o, a) => {
					t.on('error', a),
						t.on('end', o),
						Rn.stat(i, (c, l) => {
							if (c) a(c);
							else {
								let u = new oR.ReadStream(i, { readSize: n, size: l.size });
								u.on('error', a), u.pipe(t);
							}
						});
				});
			return e ? s.then(e, e) : s;
		},
		om = (r) => new sm(r);
});
var dm = E((tD, hm) => {
	'use strict';
	var fR = on(),
		io = Gs(),
		cm = wn(),
		um = no(),
		lm = require('path');
	hm.exports = (r, e, t) => {
		if (
			(typeof e == 'function' && (t = e),
			Array.isArray(r) && ((e = r), (r = {})),
			!e || !Array.isArray(e) || !e.length)
		)
			throw new TypeError('no files or directories specified');
		e = Array.from(e);
		let n = fR(r);
		if (n.sync && typeof t == 'function')
			throw new TypeError('callback not supported for sync tar functions');
		if (!n.file && typeof t == 'function')
			throw new TypeError('callback only supported with file option');
		return n.file && n.sync
			? hR(n, e)
			: n.file
			? dR(n, e, t)
			: n.sync
			? pR(n, e)
			: mR(n, e);
	};
	var hR = (r, e) => {
			let t = new io.Sync(r),
				n = new cm.WriteStreamSync(r.file, { mode: r.mode || 438 });
			t.pipe(n), fm(t, e);
		},
		dR = (r, e, t) => {
			let n = new io(r),
				i = new cm.WriteStream(r.file, { mode: r.mode || 438 });
			n.pipe(i);
			let s = new Promise((o, a) => {
				i.on('error', a), i.on('close', o), n.on('error', a);
			});
			return lu(n, e), t ? s.then(t, t) : s;
		},
		fm = (r, e) => {
			e.forEach((t) => {
				t.charAt(0) === '@'
					? um({
							file: lm.resolve(r.cwd, t.substr(1)),
							sync: !0,
							noResume: !0,
							onentry: (n) => r.add(n),
					  })
					: r.add(t);
			}),
				r.end();
		},
		lu = (r, e) => {
			for (; e.length; ) {
				let t = e.shift();
				if (t.charAt(0) === '@')
					return um({
						file: lm.resolve(r.cwd, t.substr(1)),
						noResume: !0,
						onentry: (n) => r.add(n),
					}).then((n) => lu(r, e));
				r.add(t);
			}
			r.end();
		},
		pR = (r, e) => {
			let t = new io.Sync(r);
			return fm(t, e), t;
		},
		mR = (r, e) => {
			let t = new io(r);
			return lu(t, e), t;
		};
});
var fu = E((rD, vm) => {
	'use strict';
	var yR = on(),
		pm = Gs(),
		Je = require('fs'),
		mm = wn(),
		ym = no(),
		Em = require('path'),
		gm = dn();
	vm.exports = (r, e, t) => {
		let n = yR(r);
		if (!n.file) throw new TypeError('file is required');
		if (n.gzip) throw new TypeError('cannot append to compressed archives');
		if (!e || !Array.isArray(e) || !e.length)
			throw new TypeError('no files or directories specified');
		return (e = Array.from(e)), n.sync ? ER(n, e) : _R(n, e, t);
	};
	var ER = (r, e) => {
			let t = new pm.Sync(r),
				n = !0,
				i,
				s;
			try {
				try {
					i = Je.openSync(r.file, 'r+');
				} catch (c) {
					if (c.code === 'ENOENT') i = Je.openSync(r.file, 'w+');
					else throw c;
				}
				let o = Je.fstatSync(i),
					a = Buffer.alloc(512);
				e: for (s = 0; s < o.size; s += 512) {
					for (let u = 0, f = 0; u < 512; u += f) {
						if (
							((f = Je.readSync(i, a, u, a.length - u, s + u)),
							s === 0 && a[0] === 31 && a[1] === 139)
						)
							throw new Error('cannot append to compressed archives');
						if (!f) break e;
					}
					let c = new gm(a);
					if (!c.cksumValid) break;
					let l = 512 * Math.ceil(c.size / 512);
					if (s + l + 512 > o.size) break;
					(s += l), r.mtimeCache && r.mtimeCache.set(c.path, c.mtime);
				}
				(n = !1), gR(r, t, s, i, e);
			} finally {
				if (n)
					try {
						Je.closeSync(i);
					} catch {}
			}
		},
		gR = (r, e, t, n, i) => {
			let s = new mm.WriteStreamSync(r.file, { fd: n, start: t });
			e.pipe(s), vR(e, i);
		},
		_R = (r, e, t) => {
			e = Array.from(e);
			let n = new pm(r),
				i = (o, a, c) => {
					let l = (y, b) => {
							y ? Je.close(o, (p) => c(y)) : c(null, b);
						},
						u = 0;
					if (a === 0) return l(null, 0);
					let f = 0,
						h = Buffer.alloc(512),
						d = (y, b) => {
							if (y) return l(y);
							if (((f += b), f < 512 && b))
								return Je.read(o, h, f, h.length - f, u + f, d);
							if (u === 0 && h[0] === 31 && h[1] === 139)
								return l(new Error('cannot append to compressed archives'));
							if (f < 512) return l(null, u);
							let p = new gm(h);
							if (!p.cksumValid) return l(null, u);
							let w = 512 * Math.ceil(p.size / 512);
							if (u + w + 512 > a || ((u += w + 512), u >= a))
								return l(null, u);
							r.mtimeCache && r.mtimeCache.set(p.path, p.mtime),
								(f = 0),
								Je.read(o, h, 0, 512, u, d);
						};
					Je.read(o, h, 0, 512, u, d);
				},
				s = new Promise((o, a) => {
					n.on('error', a);
					let c = 'r+',
						l = (u, f) => {
							if (u && u.code === 'ENOENT' && c === 'r+')
								return (c = 'w+'), Je.open(r.file, c, l);
							if (u) return a(u);
							Je.fstat(f, (h, d) => {
								if (h) return Je.close(f, () => a(h));
								i(f, d.size, (y, b) => {
									if (y) return a(y);
									let p = new mm.WriteStream(r.file, { fd: f, start: b });
									n.pipe(p), p.on('error', a), p.on('close', o), _m(n, e);
								});
							});
						};
					Je.open(r.file, c, l);
				});
			return t ? s.then(t, t) : s;
		},
		vR = (r, e) => {
			e.forEach((t) => {
				t.charAt(0) === '@'
					? ym({
							file: Em.resolve(r.cwd, t.substr(1)),
							sync: !0,
							noResume: !0,
							onentry: (n) => r.add(n),
					  })
					: r.add(t);
			}),
				r.end();
		},
		_m = (r, e) => {
			for (; e.length; ) {
				let t = e.shift();
				if (t.charAt(0) === '@')
					return ym({
						file: Em.resolve(r.cwd, t.substr(1)),
						noResume: !0,
						onentry: (n) => r.add(n),
					}).then((n) => _m(r, e));
				r.add(t);
			}
			r.end();
		};
});
var Sm = E((nD, bm) => {
	'use strict';
	var bR = on(),
		SR = fu();
	bm.exports = (r, e, t) => {
		let n = bR(r);
		if (!n.file) throw new TypeError('file is required');
		if (n.gzip) throw new TypeError('cannot append to compressed archives');
		if (!e || !Array.isArray(e) || !e.length)
			throw new TypeError('no files or directories specified');
		return (e = Array.from(e)), wR(n), SR(n, e, t);
	};
	var wR = (r) => {
		let e = r.filter;
		r.mtimeCache || (r.mtimeCache = new Map()),
			(r.filter = e
				? (t, n) => e(t, n) && !(r.mtimeCache.get(t) > n.mtime)
				: (t, n) => !(r.mtimeCache.get(t) > n.mtime));
	};
});
var xm = E((iD, Rm) => {
	var { promisify: wm } = require('util'),
		ar = require('fs'),
		RR = (r) => {
			if (!r) r = { mode: 511, fs: ar };
			else if (typeof r == 'object') r = { mode: 511, fs: ar, ...r };
			else if (typeof r == 'number') r = { mode: r, fs: ar };
			else if (typeof r == 'string') r = { mode: parseInt(r, 8), fs: ar };
			else throw new TypeError('invalid options argument');
			return (
				(r.mkdir = r.mkdir || r.fs.mkdir || ar.mkdir),
				(r.mkdirAsync = wm(r.mkdir)),
				(r.stat = r.stat || r.fs.stat || ar.stat),
				(r.statAsync = wm(r.stat)),
				(r.statSync = r.statSync || r.fs.statSync || ar.statSync),
				(r.mkdirSync = r.mkdirSync || r.fs.mkdirSync || ar.mkdirSync),
				r
			);
		};
	Rm.exports = RR;
});
var Om = E((sD, Tm) => {
	var xR = process.env.__TESTING_MKDIRP_PLATFORM__ || process.platform,
		{ resolve: TR, parse: OR } = require('path'),
		CR = (r) => {
			if (/\0/.test(r))
				throw Object.assign(
					new TypeError('path must be a string without null bytes'),
					{ path: r, code: 'ERR_INVALID_ARG_VALUE' },
				);
			if (((r = TR(r)), xR === 'win32')) {
				let e = /[*|"<>?:]/,
					{ root: t } = OR(r);
				if (e.test(r.substr(t.length)))
					throw Object.assign(new Error('Illegal characters in path.'), {
						path: r,
						code: 'EINVAL',
					});
			}
			return r;
		};
	Tm.exports = CR;
});
var Dm = E((oD, Nm) => {
	var { dirname: Cm } = require('path'),
		Im = (r, e, t = void 0) =>
			t === e
				? Promise.resolve()
				: r.statAsync(e).then(
						(n) => (n.isDirectory() ? t : void 0),
						(n) => (n.code === 'ENOENT' ? Im(r, Cm(e), e) : void 0),
				  ),
		Am = (r, e, t = void 0) => {
			if (t !== e)
				try {
					return r.statSync(e).isDirectory() ? t : void 0;
				} catch (n) {
					return n.code === 'ENOENT' ? Am(r, Cm(e), e) : void 0;
				}
		};
	Nm.exports = { findMade: Im, findMadeSync: Am };
});
var pu = E((aD, Lm) => {
	var { dirname: km } = require('path'),
		hu = (r, e, t) => {
			e.recursive = !1;
			let n = km(r);
			return n === r
				? e.mkdirAsync(r, e).catch((i) => {
						if (i.code !== 'EISDIR') throw i;
				  })
				: e.mkdirAsync(r, e).then(
						() => t || r,
						(i) => {
							if (i.code === 'ENOENT') return hu(n, e).then((s) => hu(r, e, s));
							if (i.code !== 'EEXIST' && i.code !== 'EROFS') throw i;
							return e.statAsync(r).then(
								(s) => {
									if (s.isDirectory()) return t;
									throw i;
								},
								() => {
									throw i;
								},
							);
						},
				  );
		},
		du = (r, e, t) => {
			let n = km(r);
			if (((e.recursive = !1), n === r))
				try {
					return e.mkdirSync(r, e);
				} catch (i) {
					if (i.code !== 'EISDIR') throw i;
					return;
				}
			try {
				return e.mkdirSync(r, e), t || r;
			} catch (i) {
				if (i.code === 'ENOENT') return du(r, e, du(n, e, t));
				if (i.code !== 'EEXIST' && i.code !== 'EROFS') throw i;
				try {
					if (!e.statSync(r).isDirectory()) throw i;
				} catch {
					throw i;
				}
			}
		};
	Lm.exports = { mkdirpManual: hu, mkdirpManualSync: du };
});
var Mm = E((cD, Fm) => {
	var { dirname: Pm } = require('path'),
		{ findMade: IR, findMadeSync: AR } = Dm(),
		{ mkdirpManual: NR, mkdirpManualSync: DR } = pu(),
		kR = (r, e) => (
			(e.recursive = !0),
			Pm(r) === r
				? e.mkdirAsync(r, e)
				: IR(e, r).then((n) =>
						e
							.mkdirAsync(r, e)
							.then(() => n)
							.catch((i) => {
								if (i.code === 'ENOENT') return NR(r, e);
								throw i;
							}),
				  )
		),
		LR = (r, e) => {
			if (((e.recursive = !0), Pm(r) === r)) return e.mkdirSync(r, e);
			let n = AR(e, r);
			try {
				return e.mkdirSync(r, e), n;
			} catch (i) {
				if (i.code === 'ENOENT') return DR(r, e);
				throw i;
			}
		};
	Fm.exports = { mkdirpNative: kR, mkdirpNativeSync: LR };
});
var jm = E((uD, Bm) => {
	var qm = require('fs'),
		PR = process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version,
		mu = PR.replace(/^v/, '').split('.'),
		Um = +mu[0] > 10 || (+mu[0] == 10 && +mu[1] >= 12),
		FR = Um ? (r) => r.mkdir === qm.mkdir : () => !1,
		MR = Um ? (r) => r.mkdirSync === qm.mkdirSync : () => !1;
	Bm.exports = { useNative: FR, useNativeSync: MR };
});
var Wm = E((lD, Vm) => {
	var xn = xm(),
		Tn = Om(),
		{ mkdirpNative: Gm, mkdirpNativeSync: $m } = Mm(),
		{ mkdirpManual: Hm, mkdirpManualSync: zm } = pu(),
		{ useNative: qR, useNativeSync: UR } = jm(),
		On = (r, e) => ((r = Tn(r)), (e = xn(e)), qR(e) ? Gm(r, e) : Hm(r, e)),
		BR = (r, e) => ((r = Tn(r)), (e = xn(e)), UR(e) ? $m(r, e) : zm(r, e));
	On.sync = BR;
	On.native = (r, e) => Gm(Tn(r), xn(e));
	On.manual = (r, e) => Hm(Tn(r), xn(e));
	On.nativeSync = (r, e) => $m(Tn(r), xn(e));
	On.manualSync = (r, e) => zm(Tn(r), xn(e));
	Vm.exports = On;
});
var ey = E((fD, Qm) => {
	'use strict';
	var ot = require('fs'),
		qr = require('path'),
		jR = ot.lchown ? 'lchown' : 'chown',
		GR = ot.lchownSync ? 'lchownSync' : 'chownSync',
		Km =
			ot.lchown &&
			!process.version.match(/v1[1-9]+\./) &&
			!process.version.match(/v10\.[6-9]/),
		Xm = (r, e, t) => {
			try {
				return ot[GR](r, e, t);
			} catch (n) {
				if (n.code !== 'ENOENT') throw n;
			}
		},
		$R = (r, e, t) => {
			try {
				return ot.chownSync(r, e, t);
			} catch (n) {
				if (n.code !== 'ENOENT') throw n;
			}
		},
		HR = Km
			? (r, e, t, n) => (i) => {
					!i || i.code !== 'EISDIR' ? n(i) : ot.chown(r, e, t, n);
			  }
			: (r, e, t, n) => n,
		yu = Km
			? (r, e, t) => {
					try {
						return Xm(r, e, t);
					} catch (n) {
						if (n.code !== 'EISDIR') throw n;
						$R(r, e, t);
					}
			  }
			: (r, e, t) => Xm(r, e, t),
		zR = process.version,
		Ym = (r, e, t) => ot.readdir(r, e, t),
		VR = (r, e) => ot.readdirSync(r, e);
	/^v4\./.test(zR) && (Ym = (r, e, t) => ot.readdir(r, t));
	var so = (r, e, t, n) => {
			ot[jR](
				r,
				e,
				t,
				HR(r, e, t, (i) => {
					n(i && i.code !== 'ENOENT' ? i : null);
				}),
			);
		},
		Jm = (r, e, t, n, i) => {
			if (typeof e == 'string')
				return ot.lstat(qr.resolve(r, e), (s, o) => {
					if (s) return i(s.code !== 'ENOENT' ? s : null);
					(o.name = e), Jm(r, o, t, n, i);
				});
			if (e.isDirectory())
				Eu(qr.resolve(r, e.name), t, n, (s) => {
					if (s) return i(s);
					let o = qr.resolve(r, e.name);
					so(o, t, n, i);
				});
			else {
				let s = qr.resolve(r, e.name);
				so(s, t, n, i);
			}
		},
		Eu = (r, e, t, n) => {
			Ym(r, { withFileTypes: !0 }, (i, s) => {
				if (i) {
					if (i.code === 'ENOENT') return n();
					if (i.code !== 'ENOTDIR' && i.code !== 'ENOTSUP') return n(i);
				}
				if (i || !s.length) return so(r, e, t, n);
				let o = s.length,
					a = null,
					c = (l) => {
						if (!a) {
							if (l) return n((a = l));
							if (--o === 0) return so(r, e, t, n);
						}
					};
				s.forEach((l) => Jm(r, l, e, t, c));
			});
		},
		WR = (r, e, t, n) => {
			if (typeof e == 'string')
				try {
					let i = ot.lstatSync(qr.resolve(r, e));
					(i.name = e), (e = i);
				} catch (i) {
					if (i.code === 'ENOENT') return;
					throw i;
				}
			e.isDirectory() && Zm(qr.resolve(r, e.name), t, n),
				yu(qr.resolve(r, e.name), t, n);
		},
		Zm = (r, e, t) => {
			let n;
			try {
				n = VR(r, { withFileTypes: !0 });
			} catch (i) {
				if (i.code === 'ENOENT') return;
				if (i.code === 'ENOTDIR' || i.code === 'ENOTSUP') return yu(r, e, t);
				throw i;
			}
			return n && n.length && n.forEach((i) => WR(r, i, e, t)), yu(r, e, t);
		};
	Qm.exports = Eu;
	Eu.sync = Zm;
});
var iy = E((hD, gu) => {
	'use strict';
	var ty = Wm(),
		at = require('fs'),
		oo = require('path'),
		ry = ey(),
		dt = fn(),
		ao = class extends Error {
			constructor(e, t) {
				super('Cannot extract through symbolic link'),
					(this.path = t),
					(this.symlink = e);
			}
			get name() {
				return 'SylinkError';
			}
		},
		co = class extends Error {
			constructor(e, t) {
				super(t + ": Cannot cd into '" + e + "'"),
					(this.path = e),
					(this.code = t);
			}
			get name() {
				return 'CwdError';
			}
		},
		uo = (r, e) => r.get(dt(e)),
		di = (r, e, t) => r.set(dt(e), t),
		XR = (r, e) => {
			at.stat(r, (t, n) => {
				(t || !n.isDirectory()) && (t = new co(r, (t && t.code) || 'ENOTDIR')),
					e(t);
			});
		};
	gu.exports = (r, e, t) => {
		r = dt(r);
		let n = e.umask,
			i = e.mode | 448,
			s = (i & n) !== 0,
			o = e.uid,
			a = e.gid,
			c =
				typeof o == 'number' &&
				typeof a == 'number' &&
				(o !== e.processUid || a !== e.processGid),
			l = e.preserve,
			u = e.unlink,
			f = e.cache,
			h = dt(e.cwd),
			d = (p, w) => {
				p
					? t(p)
					: (di(f, r, !0),
					  w && c ? ry(w, o, a, (k) => d(k)) : s ? at.chmod(r, i, t) : t());
			};
		if (f && uo(f, r) === !0) return d();
		if (r === h) return XR(r, d);
		if (l) return ty(r, { mode: i }).then((p) => d(null, p), d);
		let b = dt(oo.relative(h, r)).split('/');
		lo(h, b, i, f, u, h, null, d);
	};
	var lo = (r, e, t, n, i, s, o, a) => {
			if (!e.length) return a(null, o);
			let c = e.shift(),
				l = dt(oo.resolve(r + '/' + c));
			if (uo(n, l)) return lo(l, e, t, n, i, s, o, a);
			at.mkdir(l, t, ny(l, e, t, n, i, s, o, a));
		},
		ny = (r, e, t, n, i, s, o, a) => (c) => {
			c
				? at.lstat(r, (l, u) => {
						if (l) (l.path = l.path && dt(l.path)), a(l);
						else if (u.isDirectory()) lo(r, e, t, n, i, s, o, a);
						else if (i)
							at.unlink(r, (f) => {
								if (f) return a(f);
								at.mkdir(r, t, ny(r, e, t, n, i, s, o, a));
							});
						else {
							if (u.isSymbolicLink())
								return a(new ao(r, r + '/' + e.join('/')));
							a(c);
						}
				  })
				: ((o = o || r), lo(r, e, t, n, i, s, o, a));
		},
		KR = (r) => {
			let e = !1,
				t = 'ENOTDIR';
			try {
				e = at.statSync(r).isDirectory();
			} catch (n) {
				t = n.code;
			} finally {
				if (!e) throw new co(r, t);
			}
		};
	gu.exports.sync = (r, e) => {
		r = dt(r);
		let t = e.umask,
			n = e.mode | 448,
			i = (n & t) !== 0,
			s = e.uid,
			o = e.gid,
			a =
				typeof s == 'number' &&
				typeof o == 'number' &&
				(s !== e.processUid || o !== e.processGid),
			c = e.preserve,
			l = e.unlink,
			u = e.cache,
			f = dt(e.cwd),
			h = (p) => {
				di(u, r, !0), p && a && ry.sync(p, s, o), i && at.chmodSync(r, n);
			};
		if (u && uo(u, r) === !0) return h();
		if (r === f) return KR(f), h();
		if (c) return h(ty.sync(r, n));
		let y = dt(oo.relative(f, r)).split('/'),
			b = null;
		for (let p = y.shift(), w = f; p && (w += '/' + p); p = y.shift())
			if (((w = dt(oo.resolve(w))), !uo(u, w)))
				try {
					at.mkdirSync(w, n), (b = b || w), di(u, w, !0);
				} catch {
					let T = at.lstatSync(w);
					if (T.isDirectory()) {
						di(u, w, !0);
						continue;
					} else if (l) {
						at.unlinkSync(w), at.mkdirSync(w, n), (b = b || w), di(u, w, !0);
						continue;
					} else if (T.isSymbolicLink())
						return new ao(w, w + '/' + y.join('/'));
				}
		return h(b);
	};
});
var vu = E((dD, sy) => {
	var _u = Object.create(null),
		{ hasOwnProperty: YR } = Object.prototype;
	sy.exports = (r) => (YR.call(_u, r) || (_u[r] = r.normalize('NFKD')), _u[r]);
});
var uy = E((pD, cy) => {
	var oy = require('assert'),
		JR = vu(),
		ZR = pn(),
		{ join: ay } = require('path'),
		QR = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform,
		ex = QR === 'win32';
	cy.exports = () => {
		let r = new Map(),
			e = new Map(),
			t = (l) =>
				l
					.split('/')
					.slice(0, -1)
					.reduce(
						(f, h) => (
							f.length && (h = ay(f[f.length - 1], h)), f.push(h || '/'), f
						),
						[],
					),
			n = new Set(),
			i = (l) => {
				let u = e.get(l);
				if (!u) throw new Error('function does not have any path reservations');
				return {
					paths: u.paths.map((f) => r.get(f)),
					dirs: [...u.dirs].map((f) => r.get(f)),
				};
			},
			s = (l) => {
				let { paths: u, dirs: f } = i(l);
				return (
					u.every((h) => h[0] === l) &&
					f.every((h) => h[0] instanceof Set && h[0].has(l))
				);
			},
			o = (l) => (n.has(l) || !s(l) ? !1 : (n.add(l), l(() => a(l)), !0)),
			a = (l) => {
				if (!n.has(l)) return !1;
				let { paths: u, dirs: f } = e.get(l),
					h = new Set();
				return (
					u.forEach((d) => {
						let y = r.get(d);
						oy.equal(y[0], l),
							y.length === 1
								? r.delete(d)
								: (y.shift(),
								  typeof y[0] == 'function'
										? h.add(y[0])
										: y[0].forEach((b) => h.add(b)));
					}),
					f.forEach((d) => {
						let y = r.get(d);
						oy(y[0] instanceof Set),
							y[0].size === 1 && y.length === 1
								? r.delete(d)
								: y[0].size === 1
								? (y.shift(), h.add(y[0]))
								: y[0].delete(l);
					}),
					n.delete(l),
					h.forEach((d) => o(d)),
					!0
				);
			};
		return {
			check: s,
			reserve: (l, u) => {
				l = ex
					? ['win32 parallelization disabled']
					: l.map((h) => JR(ZR(ay(h))).toLowerCase());
				let f = new Set(l.map((h) => t(h)).reduce((h, d) => h.concat(d)));
				return (
					e.set(u, { dirs: f, paths: l }),
					l.forEach((h) => {
						let d = r.get(h);
						d ? d.push(u) : r.set(h, [u]);
					}),
					f.forEach((h) => {
						let d = r.get(h);
						d
							? d[d.length - 1] instanceof Set
								? d[d.length - 1].add(u)
								: d.push(new Set([u]))
							: r.set(h, [new Set([u])]);
					}),
					o(u)
				);
			},
		};
	};
});
var hy = E((mD, fy) => {
	var tx = process.env.__FAKE_PLATFORM__ || process.platform,
		rx = tx === 'win32',
		nx = global.__FAKE_TESTING_FS__ || require('fs'),
		{
			O_CREAT: ix,
			O_TRUNC: sx,
			O_WRONLY: ox,
			UV_FS_O_FILEMAP: ly = 0,
		} = nx.constants,
		ax = rx && !!ly,
		cx = 512 * 1024,
		ux = ly | sx | ix | ox;
	fy.exports = ax ? (r) => (r < cx ? ux : 'w') : () => 'w';
});
var Iu = E((yD, Ty) => {
	'use strict';
	var lx = require('assert'),
		fx = ro(),
		Q = require('fs'),
		hx = wn(),
		jt = require('path'),
		wy = iy(),
		dy = Cc(),
		dx = uy(),
		px = Ic(),
		Ze = fn(),
		mx = pn(),
		yx = vu(),
		py = Symbol('onEntry'),
		wu = Symbol('checkFs'),
		my = Symbol('checkFs2'),
		po = Symbol('pruneCache'),
		Ru = Symbol('isReusable'),
		ct = Symbol('makeFs'),
		xu = Symbol('file'),
		Tu = Symbol('directory'),
		mo = Symbol('link'),
		yy = Symbol('symlink'),
		Ey = Symbol('hardlink'),
		gy = Symbol('unsupported'),
		_y = Symbol('checkPath'),
		cr = Symbol('mkdir'),
		Ne = Symbol('onError'),
		fo = Symbol('pending'),
		vy = Symbol('pend'),
		Cn = Symbol('unpend'),
		bu = Symbol('ended'),
		Su = Symbol('maybeClose'),
		Ou = Symbol('skip'),
		pi = Symbol('doChown'),
		mi = Symbol('uid'),
		yi = Symbol('gid'),
		Ei = Symbol('checkedCwd'),
		Ry = require('crypto'),
		xy = hy(),
		Ex = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform,
		gi = Ex === 'win32',
		gx = (r, e) => {
			if (!gi) return Q.unlink(r, e);
			let t = r + '.DELETE.' + Ry.randomBytes(16).toString('hex');
			Q.rename(r, t, (n) => {
				if (n) return e(n);
				Q.unlink(t, e);
			});
		},
		_x = (r) => {
			if (!gi) return Q.unlinkSync(r);
			let e = r + '.DELETE.' + Ry.randomBytes(16).toString('hex');
			Q.renameSync(r, e), Q.unlinkSync(e);
		},
		by = (r, e, t) => (r === r >>> 0 ? r : e === e >>> 0 ? e : t),
		Sy = (r) => yx(mx(Ze(r))).toLowerCase(),
		vx = (r, e) => {
			e = Sy(e);
			for (let t of r.keys()) {
				let n = Sy(t);
				(n === e || n.indexOf(e + '/') === 0) && r.delete(t);
			}
		},
		bx = (r) => {
			for (let e of r.keys()) r.delete(e);
		},
		_i = class extends fx {
			constructor(e) {
				if (
					(e || (e = {}),
					(e.ondone = (t) => {
						(this[bu] = !0), this[Su]();
					}),
					super(e),
					(this[Ei] = !1),
					(this.reservations = dx()),
					(this.transform =
						typeof e.transform == 'function' ? e.transform : null),
					(this.writable = !0),
					(this.readable = !1),
					(this[fo] = 0),
					(this[bu] = !1),
					(this.dirCache = e.dirCache || new Map()),
					typeof e.uid == 'number' || typeof e.gid == 'number')
				) {
					if (typeof e.uid != 'number' || typeof e.gid != 'number')
						throw new TypeError('cannot set owner without number uid and gid');
					if (e.preserveOwner)
						throw new TypeError(
							'cannot preserve owner in archive and also set owner explicitly',
						);
					(this.uid = e.uid), (this.gid = e.gid), (this.setOwner = !0);
				} else (this.uid = null), (this.gid = null), (this.setOwner = !1);
				e.preserveOwner === void 0 && typeof e.uid != 'number'
					? (this.preserveOwner = process.getuid && process.getuid() === 0)
					: (this.preserveOwner = !!e.preserveOwner),
					(this.processUid =
						(this.preserveOwner || this.setOwner) && process.getuid
							? process.getuid()
							: null),
					(this.processGid =
						(this.preserveOwner || this.setOwner) && process.getgid
							? process.getgid()
							: null),
					(this.forceChown = e.forceChown === !0),
					(this.win32 = !!e.win32 || gi),
					(this.newer = !!e.newer),
					(this.keep = !!e.keep),
					(this.noMtime = !!e.noMtime),
					(this.preservePaths = !!e.preservePaths),
					(this.unlink = !!e.unlink),
					(this.cwd = Ze(jt.resolve(e.cwd || process.cwd()))),
					(this.strip = +e.strip || 0),
					(this.processUmask = e.noChmod ? 0 : process.umask()),
					(this.umask =
						typeof e.umask == 'number' ? e.umask : this.processUmask),
					(this.dmode = e.dmode || 511 & ~this.umask),
					(this.fmode = e.fmode || 438 & ~this.umask),
					this.on('entry', (t) => this[py](t));
			}
			warn(e, t, n = {}) {
				return (
					(e === 'TAR_BAD_ARCHIVE' || e === 'TAR_ABORT') &&
						(n.recoverable = !1),
					super.warn(e, t, n)
				);
			}
			[Su]() {
				this[bu] &&
					this[fo] === 0 &&
					(this.emit('prefinish'),
					this.emit('finish'),
					this.emit('end'),
					this.emit('close'));
			}
			[_y](e) {
				if (this.strip) {
					let t = Ze(e.path).split('/');
					if (t.length < this.strip) return !1;
					if (((e.path = t.slice(this.strip).join('/')), e.type === 'Link')) {
						let n = Ze(e.linkpath).split('/');
						if (n.length >= this.strip)
							e.linkpath = n.slice(this.strip).join('/');
						else return !1;
					}
				}
				if (!this.preservePaths) {
					let t = Ze(e.path),
						n = t.split('/');
					if (n.includes('..') || (gi && /^[a-z]:\.\.$/i.test(n[0])))
						return (
							this.warn('TAR_ENTRY_ERROR', "path contains '..'", {
								entry: e,
								path: t,
							}),
							!1
						);
					let [i, s] = px(t);
					i &&
						((e.path = s),
						this.warn('TAR_ENTRY_INFO', `stripping ${i} from absolute path`, {
							entry: e,
							path: t,
						}));
				}
				if (
					(jt.isAbsolute(e.path)
						? (e.absolute = Ze(jt.resolve(e.path)))
						: (e.absolute = Ze(jt.resolve(this.cwd, e.path))),
					!this.preservePaths &&
						e.absolute.indexOf(this.cwd + '/') !== 0 &&
						e.absolute !== this.cwd)
				)
					return (
						this.warn('TAR_ENTRY_ERROR', 'path escaped extraction target', {
							entry: e,
							path: Ze(e.path),
							resolvedPath: e.absolute,
							cwd: this.cwd,
						}),
						!1
					);
				if (
					e.absolute === this.cwd &&
					e.type !== 'Directory' &&
					e.type !== 'GNUDumpDir'
				)
					return !1;
				if (this.win32) {
					let { root: t } = jt.win32.parse(e.absolute);
					e.absolute = t + dy.encode(e.absolute.substr(t.length));
					let { root: n } = jt.win32.parse(e.path);
					e.path = n + dy.encode(e.path.substr(n.length));
				}
				return !0;
			}
			[py](e) {
				if (!this[_y](e)) return e.resume();
				switch ((lx.equal(typeof e.absolute, 'string'), e.type)) {
					case 'Directory':
					case 'GNUDumpDir':
						e.mode && (e.mode = e.mode | 448);
					case 'File':
					case 'OldFile':
					case 'ContiguousFile':
					case 'Link':
					case 'SymbolicLink':
						return this[wu](e);
					case 'CharacterDevice':
					case 'BlockDevice':
					case 'FIFO':
					default:
						return this[gy](e);
				}
			}
			[Ne](e, t) {
				e.name === 'CwdError'
					? this.emit('error', e)
					: (this.warn('TAR_ENTRY_ERROR', e, { entry: t }),
					  this[Cn](),
					  t.resume());
			}
			[cr](e, t, n) {
				wy(
					Ze(e),
					{
						uid: this.uid,
						gid: this.gid,
						processUid: this.processUid,
						processGid: this.processGid,
						umask: this.processUmask,
						preserve: this.preservePaths,
						unlink: this.unlink,
						cache: this.dirCache,
						cwd: this.cwd,
						mode: t,
						noChmod: this.noChmod,
					},
					n,
				);
			}
			[pi](e) {
				return (
					this.forceChown ||
					(this.preserveOwner &&
						((typeof e.uid == 'number' && e.uid !== this.processUid) ||
							(typeof e.gid == 'number' && e.gid !== this.processGid))) ||
					(typeof this.uid == 'number' && this.uid !== this.processUid) ||
					(typeof this.gid == 'number' && this.gid !== this.processGid)
				);
			}
			[mi](e) {
				return by(this.uid, e.uid, this.processUid);
			}
			[yi](e) {
				return by(this.gid, e.gid, this.processGid);
			}
			[xu](e, t) {
				let n = e.mode & 4095 || this.fmode,
					i = new hx.WriteStream(e.absolute, {
						flags: xy(e.size),
						mode: n,
						autoClose: !1,
					});
				i.on('error', (c) => {
					i.fd && Q.close(i.fd, () => {}),
						(i.write = () => !0),
						this[Ne](c, e),
						t();
				});
				let s = 1,
					o = (c) => {
						if (c) {
							i.fd && Q.close(i.fd, () => {}), this[Ne](c, e), t();
							return;
						}
						--s === 0 &&
							Q.close(i.fd, (l) => {
								l ? this[Ne](l, e) : this[Cn](), t();
							});
					};
				i.on('finish', (c) => {
					let l = e.absolute,
						u = i.fd;
					if (e.mtime && !this.noMtime) {
						s++;
						let f = e.atime || new Date(),
							h = e.mtime;
						Q.futimes(u, f, h, (d) =>
							d ? Q.utimes(l, f, h, (y) => o(y && d)) : o(),
						);
					}
					if (this[pi](e)) {
						s++;
						let f = this[mi](e),
							h = this[yi](e);
						Q.fchown(u, f, h, (d) =>
							d ? Q.chown(l, f, h, (y) => o(y && d)) : o(),
						);
					}
					o();
				});
				let a = (this.transform && this.transform(e)) || e;
				a !== e &&
					(a.on('error', (c) => {
						this[Ne](c, e), t();
					}),
					e.pipe(a)),
					a.pipe(i);
			}
			[Tu](e, t) {
				let n = e.mode & 4095 || this.dmode;
				this[cr](e.absolute, n, (i) => {
					if (i) {
						this[Ne](i, e), t();
						return;
					}
					let s = 1,
						o = (a) => {
							--s === 0 && (t(), this[Cn](), e.resume());
						};
					e.mtime &&
						!this.noMtime &&
						(s++, Q.utimes(e.absolute, e.atime || new Date(), e.mtime, o)),
						this[pi](e) &&
							(s++, Q.chown(e.absolute, this[mi](e), this[yi](e), o)),
						o();
				});
			}
			[gy](e) {
				(e.unsupported = !0),
					this.warn(
						'TAR_ENTRY_UNSUPPORTED',
						`unsupported entry type: ${e.type}`,
						{ entry: e },
					),
					e.resume();
			}
			[yy](e, t) {
				this[mo](e, e.linkpath, 'symlink', t);
			}
			[Ey](e, t) {
				let n = Ze(jt.resolve(this.cwd, e.linkpath));
				this[mo](e, n, 'link', t);
			}
			[vy]() {
				this[fo]++;
			}
			[Cn]() {
				this[fo]--, this[Su]();
			}
			[Ou](e) {
				this[Cn](), e.resume();
			}
			[Ru](e, t) {
				return (
					e.type === 'File' && !this.unlink && t.isFile() && t.nlink <= 1 && !gi
				);
			}
			[wu](e) {
				this[vy]();
				let t = [e.path];
				e.linkpath && t.push(e.linkpath),
					this.reservations.reserve(t, (n) => this[my](e, n));
			}
			[po](e) {
				e.type === 'SymbolicLink'
					? bx(this.dirCache)
					: e.type !== 'Directory' && vx(this.dirCache, e.absolute);
			}
			[my](e, t) {
				this[po](e);
				let n = (a) => {
						this[po](e), t(a);
					},
					i = () => {
						this[cr](this.cwd, this.dmode, (a) => {
							if (a) {
								this[Ne](a, e), n();
								return;
							}
							(this[Ei] = !0), s();
						});
					},
					s = () => {
						if (e.absolute !== this.cwd) {
							let a = Ze(jt.dirname(e.absolute));
							if (a !== this.cwd)
								return this[cr](a, this.dmode, (c) => {
									if (c) {
										this[Ne](c, e), n();
										return;
									}
									o();
								});
						}
						o();
					},
					o = () => {
						Q.lstat(e.absolute, (a, c) => {
							if (c && (this.keep || (this.newer && c.mtime > e.mtime))) {
								this[Ou](e), n();
								return;
							}
							if (a || this[Ru](e, c)) return this[ct](null, e, n);
							if (c.isDirectory()) {
								if (e.type === 'Directory') {
									let l = !this.noChmod && e.mode && (c.mode & 4095) !== e.mode,
										u = (f) => this[ct](f, e, n);
									return l ? Q.chmod(e.absolute, e.mode, u) : u();
								}
								if (e.absolute !== this.cwd)
									return Q.rmdir(e.absolute, (l) => this[ct](l, e, n));
							}
							if (e.absolute === this.cwd) return this[ct](null, e, n);
							gx(e.absolute, (l) => this[ct](l, e, n));
						});
					};
				this[Ei] ? s() : i();
			}
			[ct](e, t, n) {
				if (e) {
					this[Ne](e, t), n();
					return;
				}
				switch (t.type) {
					case 'File':
					case 'OldFile':
					case 'ContiguousFile':
						return this[xu](t, n);
					case 'Link':
						return this[Ey](t, n);
					case 'SymbolicLink':
						return this[yy](t, n);
					case 'Directory':
					case 'GNUDumpDir':
						return this[Tu](t, n);
				}
			}
			[mo](e, t, n, i) {
				Q[n](t, e.absolute, (s) => {
					s ? this[Ne](s, e) : (this[Cn](), e.resume()), i();
				});
			}
		},
		ho = (r) => {
			try {
				return [null, r()];
			} catch (e) {
				return [e, null];
			}
		},
		Cu = class extends _i {
			[ct](e, t) {
				return super[ct](e, t, () => {});
			}
			[wu](e) {
				if ((this[po](e), !this[Ei])) {
					let s = this[cr](this.cwd, this.dmode);
					if (s) return this[Ne](s, e);
					this[Ei] = !0;
				}
				if (e.absolute !== this.cwd) {
					let s = Ze(jt.dirname(e.absolute));
					if (s !== this.cwd) {
						let o = this[cr](s, this.dmode);
						if (o) return this[Ne](o, e);
					}
				}
				let [t, n] = ho(() => Q.lstatSync(e.absolute));
				if (n && (this.keep || (this.newer && n.mtime > e.mtime)))
					return this[Ou](e);
				if (t || this[Ru](e, n)) return this[ct](null, e);
				if (n.isDirectory()) {
					if (e.type === 'Directory') {
						let o = !this.noChmod && e.mode && (n.mode & 4095) !== e.mode,
							[a] = o
								? ho(() => {
										Q.chmodSync(e.absolute, e.mode);
								  })
								: [];
						return this[ct](a, e);
					}
					let [s] = ho(() => Q.rmdirSync(e.absolute));
					this[ct](s, e);
				}
				let [i] = e.absolute === this.cwd ? [] : ho(() => _x(e.absolute));
				this[ct](i, e);
			}
			[xu](e, t) {
				let n = e.mode & 4095 || this.fmode,
					i = (a) => {
						let c;
						try {
							Q.closeSync(s);
						} catch (l) {
							c = l;
						}
						(a || c) && this[Ne](a || c, e), t();
					},
					s;
				try {
					s = Q.openSync(e.absolute, xy(e.size), n);
				} catch (a) {
					return i(a);
				}
				let o = (this.transform && this.transform(e)) || e;
				o !== e && (o.on('error', (a) => this[Ne](a, e)), e.pipe(o)),
					o.on('data', (a) => {
						try {
							Q.writeSync(s, a, 0, a.length);
						} catch (c) {
							i(c);
						}
					}),
					o.on('end', (a) => {
						let c = null;
						if (e.mtime && !this.noMtime) {
							let l = e.atime || new Date(),
								u = e.mtime;
							try {
								Q.futimesSync(s, l, u);
							} catch (f) {
								try {
									Q.utimesSync(e.absolute, l, u);
								} catch {
									c = f;
								}
							}
						}
						if (this[pi](e)) {
							let l = this[mi](e),
								u = this[yi](e);
							try {
								Q.fchownSync(s, l, u);
							} catch (f) {
								try {
									Q.chownSync(e.absolute, l, u);
								} catch {
									c = c || f;
								}
							}
						}
						i(c);
					});
			}
			[Tu](e, t) {
				let n = e.mode & 4095 || this.dmode,
					i = this[cr](e.absolute, n);
				if (i) {
					this[Ne](i, e), t();
					return;
				}
				if (e.mtime && !this.noMtime)
					try {
						Q.utimesSync(e.absolute, e.atime || new Date(), e.mtime);
					} catch {}
				if (this[pi](e))
					try {
						Q.chownSync(e.absolute, this[mi](e), this[yi](e));
					} catch {}
				t(), e.resume();
			}
			[cr](e, t) {
				try {
					return wy.sync(Ze(e), {
						uid: this.uid,
						gid: this.gid,
						processUid: this.processUid,
						processGid: this.processGid,
						umask: this.processUmask,
						preserve: this.preservePaths,
						unlink: this.unlink,
						cache: this.dirCache,
						cwd: this.cwd,
						mode: t,
					});
				} catch (n) {
					return n;
				}
			}
			[mo](e, t, n, i) {
				try {
					Q[n + 'Sync'](t, e.absolute), i(), e.resume();
				} catch (s) {
					return this[Ne](s, e);
				}
			}
		};
	_i.Sync = Cu;
	Ty.exports = _i;
});
var Ny = E((ED, Ay) => {
	'use strict';
	var Sx = on(),
		yo = Iu(),
		Cy = require('fs'),
		Iy = wn(),
		Oy = require('path'),
		Au = pn();
	Ay.exports = (r, e, t) => {
		typeof r == 'function'
			? ((t = r), (e = null), (r = {}))
			: Array.isArray(r) && ((e = r), (r = {})),
			typeof e == 'function' && ((t = e), (e = null)),
			e ? (e = Array.from(e)) : (e = []);
		let n = Sx(r);
		if (n.sync && typeof t == 'function')
			throw new TypeError('callback not supported for sync tar functions');
		if (!n.file && typeof t == 'function')
			throw new TypeError('callback only supported with file option');
		return (
			e.length && wx(n, e),
			n.file && n.sync ? Rx(n) : n.file ? xx(n, t) : n.sync ? Tx(n) : Ox(n)
		);
	};
	var wx = (r, e) => {
			let t = new Map(e.map((s) => [Au(s), !0])),
				n = r.filter,
				i = (s, o) => {
					let a = o || Oy.parse(s).root || '.',
						c = s === a ? !1 : t.has(s) ? t.get(s) : i(Oy.dirname(s), a);
					return t.set(s, c), c;
				};
			r.filter = n ? (s, o) => n(s, o) && i(Au(s)) : (s) => i(Au(s));
		},
		Rx = (r) => {
			let e = new yo.Sync(r),
				t = r.file,
				n = Cy.statSync(t),
				i = r.maxReadSize || 16 * 1024 * 1024;
			new Iy.ReadStreamSync(t, { readSize: i, size: n.size }).pipe(e);
		},
		xx = (r, e) => {
			let t = new yo(r),
				n = r.maxReadSize || 16 * 1024 * 1024,
				i = r.file,
				s = new Promise((o, a) => {
					t.on('error', a),
						t.on('close', o),
						Cy.stat(i, (c, l) => {
							if (c) a(c);
							else {
								let u = new Iy.ReadStream(i, { readSize: n, size: l.size });
								u.on('error', a), u.pipe(t);
							}
						});
				});
			return e ? s.then(e, e) : s;
		},
		Tx = (r) => new yo.Sync(r),
		Ox = (r) => new yo(r);
});
var Dy = E((fe) => {
	'use strict';
	fe.c = fe.create = dm();
	fe.r = fe.replace = fu();
	fe.t = fe.list = no();
	fe.u = fe.update = Sm();
	fe.x = fe.extract = Ny();
	fe.Pack = Gs();
	fe.Unpack = Iu();
	fe.Parse = ro();
	fe.ReadEntry = xs();
	fe.WriteEntry = Uc();
	fe.Header = dn();
	fe.Pax = Os();
	fe.types = bc();
});
var Ly,
	De,
	Ur,
	Py,
	ky,
	Eo,
	vi,
	ur,
	go = B(() => {
		'use strict';
		(Ly = require('crypto')),
			(De = require('fs')),
			(Ur = Wr(require('path'))),
			(Py = require('path'));
		_t();
		oe();
		Dt();
		Yn();
		(ky = Va()),
			(Eo = Dy()),
			({ output: vi } = J()),
			(ur = class {
				constructor(e, t, n, i) {
					this.encryption = e;
					this.errorReporter = t;
					this.context = i;
					this.storedHashes = [];
					this.axiosConfigBuilder = (e) => e;
					if (n.customProxyConfigPath) {
						let { fileServerProxyConfig: s } = require((0, Py.join)(
							process.cwd(),
							n.customProxyConfigPath,
						));
						this.axiosConfigBuilder = s ?? this.axiosConfigBuilder;
					}
				}
				async retrieve(e, t, n) {
					M &&
						vi.note({
							title: `Nx Cloud: Downloading ${e}`,
							bodyLines: [`RETRIEVAL URL: ${t}`],
						});
					let i = this.createFileName(e, n),
						s = this.createCommitFilePath(e, n);
					try {
						await this.downloadFile(t, i, s),
							this.createCommitFile(s),
							M && vi.note({ title: `Nx Cloud: Downloaded ${e}` });
					} catch (o) {
						let a = o.message || o.toString(),
							c = `Failed to download or untar the cached artifacts for ${e}. Context: ${this.context}. Url: ${t}. Error: ${a}.`;
						throw (
							((this.context === 'dte-agent' || this.context === 'dte-main') &&
								vi.note({
									title: `An error occurred while trying to download artifacts in the DTE context. Hash: ${e}. Url: ${t}.`,
									bodyLines: [
										'- Please update the nx-cloud package to the latest version.',
										'- Please update the nx package to 15.8.9 or higher. You can do it without updating the plugins.',
										'- If you are not able to update the nx package, and you are passing --configuration to a run-many or an affected command, define that configuration for all the projects.',
									],
								}),
							await this.errorReporter.reportError(c),
							new Error(c))
						);
					}
				}
				async store(e, t, n) {
					M &&
						vi.note({
							title: `Nx Cloud: Storing ${e}`,
							bodyLines: [`STORAGE URL: ${t}`],
						});
					let i;
					if (process.env.NRWL_INTERNAL_TAR_DEBUG) {
						let o = 1,
							a = !1,
							c = [];
						for (; o <= 3 && !a; ) {
							i = await this.createFile(e, n);
							let l = `/tmp/${e}/attempt${o}`;
							(0, De.mkdirSync)(l, { recursive: !0 });
							try {
								let u = (0, De.createReadStream)(i).pipe(Eo.x({ cwd: l }));
								await this.convertStreamIntoPromise(u), (a = !0);
							} catch (u) {
								console.error(u), await rt(5e3);
							}
							c.push({ attempt: o, success: a }), o++;
						}
						if (c.some((l) => !l.success)) {
							console.error(JSON.stringify(c, null, 2));
							let l = c
								.filter((u) => !u.success)
								.map((u) => u.attempt)
								.join(', ');
							throw new Error(
								`Untar failed for hash ${e} in attempts ${l} out of ${c.length}`,
							);
						}
					} else i = await this.createFile(e, n);
					await this.uploadFile(t, i),
						this.storedHashes.push(e),
						M && vi.note({ title: `Nx Cloud: Stored ${e}` });
				}
				createFileName(e, t) {
					return Ur.join(t, `${e}.tar.gz`);
				}
				async downloadFile(e, t, n) {
					var o;
					let i = Oe('retrieveFile'),
						s;
					try {
						let a = new URL(e),
							c = a.origin + a.pathname,
							l = {};
						for (let [u, f] of a.searchParams.entries()) l[u] = f;
						(s = await ce(() =>
							ky(
								c,
								this.axiosConfigBuilder({
									method: 'GET',
									responseType: 'stream',
									maxContentLength: gt ? Xn : Kn,
									maxBodyLength: gt ? Xn : Kn,
									timeout: gt ? Wn : 6e4,
									params: l,
								}),
							),
						)),
							i.recordMetric({
								...re(s),
								payloadSize: s.data.headers['content-length'],
							});
					} catch (a) {
						throw (
							(i.recordMetric(
								(o = a == null ? void 0 : a.axiosException) != null &&
									o.response
									? re(a.axiosException.response)
									: Ce,
							),
							a)
						);
					}
					if ((0, De.existsSync)(t)) {
						let a = 0;
						for (; a++ < 50; ) {
							if ((0, De.existsSync)(n)) return;
							await rt(500);
						}
					}
					if (this.encryption.hasEncryption()) {
						await new Promise((c) => {
							s.data
								.pipe((0, De.createWriteStream)(t))
								.on('close', () => c(null));
						}),
							this.encryption.decryptFile(t);
						let a = (0, De.createReadStream)(t).pipe(
							Eo.x({ cwd: Ur.dirname(t) }),
						);
						return this.convertStreamIntoPromise(a);
					} else {
						let a = s.data.pipe(Eo.x({ cwd: Ur.dirname(t) }));
						return this.convertStreamIntoPromise(a);
					}
				}
				convertStreamIntoPromise(e) {
					return new Promise((t, n) => {
						e.on('error', (i) => {
							i.tarCode === 'TAR_ABORT' &&
							i.message.indexOf('incorrect header check') > -1
								? (console.warn(
										'FileStorage: Decompression OK, Trailing garbage ignored.',
								  ),
								  t(null))
								: n(i);
						}),
							e.on('close', () => t(null));
					});
				}
				createCommitFile(e) {
					(0, De.writeFileSync)(e, 'true');
				}
				createCommitFilePath(e, t) {
					return Ur.join(t, `${e}.commit`);
				}
				async createFile(e, t) {
					let n = this.createFileName(e, t);
					try {
						(0, De.unlinkSync)(Ur.join(t, e, 'source'));
					} catch {}
					return (
						await Eo.c({ gzip: !0, file: n, cwd: t }, [e]),
						this.encryption.hasEncryption() && this.encryption.encryptFile(n),
						n
					);
				}
				async uploadFile(e, t) {
					var a;
					let n = Oe('storeFile'),
						i = (0, De.readFileSync)(t),
						s = this.generateMD5(i),
						o = this.getFileUploadHeaders(e, s);
					try {
						let c = await ce(() =>
							ky(
								e,
								this.axiosConfigBuilder({
									method: 'PUT',
									data: i,
									headers: o,
									maxContentLength: gt ? Xn : Kn,
									maxBodyLength: gt ? Xn : Kn,
									timeout: gt ? Wn : 12e4,
								}),
							),
						);
						n.recordMetric({
							...re(c),
							payloadSize: c.config.headers['Content-Length'],
						});
					} catch (c) {
						throw (
							(n.recordMetric(
								(a = c == null ? void 0 : c.axiosException) != null &&
									a.response
									? re(c.axiosException.response)
									: Ce,
							),
							c)
						);
					}
				}
				generateMD5(e) {
					let t = (0, Ly.createHash)('md5');
					return t.update(e), t.digest('base64');
				}
				getFileUploadHeaders(e, t) {
					let n = e.includes('/file/'),
						i = {
							'Content-Type': 'application/octet-stream',
							'x-ms-blob-type': 'BlockBlob',
						};
					return n && (i['Content-MD5'] = t), i;
				}
			});
	});
var _o,
	Fy = B(() => {
		'use strict';
		oe();
		ri();
		_o = class {
			constructor(e, t, n) {
				this.runContext = e;
				this.taskExecutions = t;
				this.distributedExecutionId = n;
			}
			printCacheHitsMessage() {
				if (lt(this.distributedExecutionId) || !this.runContext.runUrl) return;
				let e = !!this.taskExecutions.find((s) => s.status !== 0),
					t = !!this.taskExecutions.find((s) => s.cacheStatus === 'cache-miss'),
					n = this.taskExecutions
						.filter(
							(s) => this.runContext.statuses[s.hash] === 'remote-cache-hit',
						)
						.map((s) => s.projectName),
					i = [];
				if (e)
					i.push(
						`View structured, searchable error logs at ${this.runContext.runUrl}`,
					);
				else if (t)
					i.push(
						`View logs and investigate cache misses at ${this.runContext.runUrl}`,
					);
				else if (n.length > 0) {
					let s = n.length === 1 ? n[0] : `${n.length} tasks`;
					i.push(
						`Nx Cloud made it possible to reuse ${s}: ${this.runContext.runUrl}`,
					);
				} else
					this.runContext.runUrl &&
						i.push(`View logs and run details at ${this.runContext.runUrl}`);
				i.length > 0 && Xt(i.join(' '));
			}
		};
	});
var Cx,
	In,
	Nu = B(() => {
		'use strict';
		ri();
		({ output: Cx } = J()),
			(In = class {
				constructor(e) {
					this.options = e;
					this.cacheError = null;
					this.apiError = null;
					this.message = null;
				}
				get anyErrors() {
					return this.cacheError || this.apiError;
				}
				printMessages() {
					if (this.anyErrors) {
						let e = [];
						this.cacheError && e.push(`- ${this.cacheError}`),
							this.apiError &&
								this.apiError !== this.cacheError &&
								e.push(`- ${this.apiError}`),
							Cx.warn({ title: 'Nx Cloud Problems', bodyLines: e });
					}
					this.message && Xt(this.message);
				}
				extractErrorMessage(e, t) {
					if (e.code === 'ECONNABORTED')
						return `Cannot connect to Nx Cloud (scope: ${t}, code: ${e.code}). Try invoking the command with the NX_CLOUD_NO_TIMEOUTS env variable set to 'true'.`;
					if (
						e.code === 'ECONNREFUSED' ||
						e.code === 'EAI_AGAIN' ||
						e.code === 'ENOTFOUND' ||
						e.code === 'EPROTO'
					)
						return `Cannot connect to Nx Cloud (scope: ${t}, code: ${e.code}).`;
					if (e.response && e.response.status === 401)
						return e.response.data.message
							? e.response.data.message
							: e.response.data;
					if (e.response && e.response.status === 402)
						return this.options.showUsageWarnings === !1 ||
							this.options.showUsageWarnings === void 0
							? null
							: e.response.data.message
							? e.response.data.message
							: e.response.data;
					{
						let n = '';
						e.response && e.response.data && e.response.data.message
							? (n = `. ${e.response.data.message}`)
							: e.response && e.response.data && (n = `. ${e.response.data}`);
						let i = e.code ? ` (code: ${e.code})` : '';
						return `${e.message}${n}${i}`;
					}
				}
			});
	});
var lr,
	vo = B(() => {
		'use strict';
		lr = class {
			constructor(e = []) {
				this.normalizedMaskedProperties = [];
				this.normalizedMaskedProperties = Array.from(new Set(e)).map(
					this.toCamelCase,
				);
			}
			obfuscate(e) {
				return (
					this.normalizedMaskedProperties.length &&
						(this.normalizedMaskedProperties.forEach((n) => {
							let i = new RegExp(`(--${n}=)[\\S]*`);
							e = e.replace(i, '$1********');
						}),
						this.normalizedMaskedProperties
							.filter((n) => n in process.env)
							.map((n) => process.env[n])
							.forEach((n) => {
								e = e.replace(n, '********');
							})),
					e
				);
			}
			toCamelCase(e) {
				return e.indexOf('-') > 1
					? e.toLowerCase().replace(/-(.)/g, (t, n) => n.toUpperCase())
					: e;
			}
		};
	});
function An(r) {
	return r.overrides.__overrides_unparsed__
		? r.overrides.__overrides_unparsed__.join(' ')
		: Du(r.overrides).join(' ');
}
function Du(r) {
	let e = [];
	for (let t of Object.keys(r)) {
		let n = r[t];
		My(t, n, e);
	}
	return e;
}
function My(r, e, t) {
	if (r === '_') t.push(...e);
	else if (e === !0) t.push(`--${r}`);
	else if (e === !1) t.push(`--no-${r}`);
	else if (Array.isArray(e)) e.forEach((n) => My(r, n, t));
	else if (typeof e == 'string' && Ix(e)) {
		let n = e.replace(/"/g, String.raw`\"`);
		t.push(`--${r}="${n}"`);
	} else e != null && t.push(`--${r}=${e}`);
}
function Ix(r) {
	return r.includes(' ') || r.includes('{') || r.includes('"');
}
var bi = B(() => {
	'use strict';
});
function bo(r, e, t, n, i) {
	let s;
	r
		? r.startsWith('./')
			? (s = (0, Pu.join)(qy, r))
			: (s = r)
		: (s = (0, Pu.join)(qy, 'node_modules', '.cache', 'nx'));
	try {
		let o = kx(s, t),
			a = e.obfuscate(o);
		if (oh) return a;
		let c = n === 'cache-miss' ? (i === 0 ? Nx : Ax) : Dx;
		return a.length > c
			? `TRUNCATED

${a.slice(a.length - c)}`
			: a;
	} catch (o) {
		return process.env.NX_VERBOSE_LOGGING === 'true' && console.error(o), '';
	}
}
function kx(r, e) {
	try {
		return (0, ku.readFileSync)(Lu.join(r, 'terminalOutputs', e)).toString();
	} catch {
		try {
			return (0, ku.readFileSync)(Lu.join(r, e, 'terminalOutput')).toString();
		} catch {
			return '';
		}
	}
}
var ku,
	Lu,
	Pu,
	qy,
	Ax,
	Nx,
	Dx,
	Fu = B(() => {
		'use strict';
		(ku = require('fs')), (Lu = Wr(require('path'))), (Pu = require('path'));
		oe();
		({ workspaceRoot: qy } = J()), (Ax = 2e5), (Nx = 2e4), (Dx = 2e4);
	});
var Uy,
	So,
	By = B(() => {
		'use strict';
		Uy = require('crypto');
		bi();
		Fu();
		So = class {
			constructor(e, t, n, i, s, o) {
				this.runContext = e;
				this.cacheDirectory = t;
				this.collectTerminalOutput = n;
				this.cacheableOperations = i;
				this.outputObfuscator = s;
				this.tasks = o;
			}
			scheduleTask(e) {
				this.runContext.scheduledTasks.push(e);
			}
			startTask(e) {
				this.tasks.push({
					taskId: e.id,
					startTime: new Date().toISOString(),
					target: e.target.target,
					projectName: e.target.project,
					hash: e.hash,
					hashDetails: this.cleanUpHashDetails(e.hashDetails),
					params: An(e),
					uploadedToStorage: !1,
				});
			}
			endTasks(e) {
				for (let t of e) {
					let n,
						i = t.status === 'remote-cache',
						s = t.status === 'cache',
						o =
							t.status === 'local-cache' ||
							t.status === 'local-cache-kept-existing' ||
							s;
					this.runContext.statuses[t.task.hash]
						? (n = this.runContext.statuses[t.task.hash])
						: i
						? (n = 'remote-cache-hit')
						: o
						? (n = 'local-cache-hit')
						: (n = 'cache-miss'),
						this.updateStartedTask(t, n);
				}
			}
			endCommand() {}
			updateStartedTask(e, t) {
				let n = this.tasks.find((i) => i.taskId === e.task.id);
				if (!n) throw new Error(`Cannot find task ${e.task.id}`);
				e != null && e.startTime && e != null && e.endTime
					? ((n.startTime = new Date(e.startTime).toISOString()),
					  (n.endTime = new Date(e.endTime).toISOString()))
					: (n.endTime = new Date().toISOString()),
					(n.status = e.code),
					(n.params = this.outputObfuscator.obfuscate(n.params)),
					(n.cacheStatus = t),
					this.collectTerminalOutput &&
						(n.terminalOutput = this.getTerminalOutput(
							e.task.hash,
							n.cacheStatus,
							e.code,
						));
			}
			getTerminalOutput(e, t, n) {
				return bo(this.cacheDirectory, this.outputObfuscator, e, t, n);
			}
			cleanUpHashDetails(e) {
				let t = {},
					n = [];
				for (let i of Object.keys(e.nodes))
					i.startsWith('npm:') ? n.push(e.nodes[i]) : (t[i] = e.nodes[i]);
				if ((n.sort(), n.length > 0)) {
					let i = (0, Uy.createHash)('md5');
					i.update(n.join('|')), (t.npmDependencies = i.digest('base64'));
				}
				return { nodes: t, runtime: e.runtime, implicitDeps: e.implicitDeps };
			}
		};
	});
var Mu,
	wo,
	jy = B(() => {
		'use strict';
		oe();
		({ output: Mu } = J()),
			(wo = class {
				constructor(e, t, n, i, s, o) {
					this.messages = e;
					this.api = t;
					this.runContext = n;
					this.fileStorage = i;
					this.distributedExecutionId = s;
					this.storeInCurrentProcess = o;
					this.storeRequests = [];
					this.delayedStoreRequests = [];
				}
				async retrieve(e, t) {
					if (this.messages.cacheError) return !1;
					let n = await this.hashUrls(e);
					if (!n || !n.get)
						return (
							M && Mu.note({ title: `Nx Cloud: Cache miss ${e}.` }),
							(this.runContext.statuses[e] = 'cache-miss'),
							!1
						);
					try {
						return (
							await this.fileStorage.retrieve(e, n.get, t),
							(this.runContext.statuses[e] = 'remote-cache-hit'),
							!0
						);
					} catch (i) {
						let s = i.axiosException ?? i;
						return (
							s.response && s.response.status === 404
								? M &&
								  Mu.note({ title: `Nx Cloud: Cache miss ${e}. Status 404.` })
								: (this.messages.cacheError = this.messages.extractErrorMessage(
										s,
										'storage',
								  )),
							(this.runContext.statuses[e] = 'cache-miss'),
							!1
						);
					}
				}
				async store(e, t) {
					if (this.messages.cacheError) return !1;
					let n = Promise.resolve().then(async () => {
						let i = await this.hashUrls(e);
						if (!i) return !1;
						if (!i.put)
							return (
								M &&
									Mu.note({
										title: `Nx Cloud: Skipping storing ${e}.`,
										bodyLines: [
											'There are several reasons why this can happen.',
											'Maybe you are using a read-only token or the artifact has already being uploaded.',
										],
									}),
								!0
							);
						if (!this.storeInCurrentProcess)
							return (
								this.delayedStoreRequests.push({ hash: e, url: i.put }), !0
							);
						try {
							return await this.fileStorage.store(e, i.put, t), !0;
						} catch (s) {
							let o = s.axiosException ?? s;
							return (
								(this.messages.cacheError = this.messages.extractErrorMessage(
									o,
									'storage',
								)),
								!1
							);
						}
					});
					return this.storeRequests.push(n), n;
				}
				async hashUrls(e) {
					if (e in this.runContext.requests)
						return (await this.runContext.requests[e])[e];
					{
						let t = this.runContext.scheduledTasks
							.filter((i) => !this.runContext.requests[i.hash])
							.map((i) => i.hash);
						t.indexOf(e) === -1 && t.push(e);
						let n = this.api.startRun(this.distributedExecutionId, t);
						return (
							t.forEach((i) => {
								this.runContext.requests[i] = n;
							}),
							(await n)[e]
						);
					}
				}
				async waitForStoreRequestsToComplete() {
					if (
						!(await Promise.all(this.storeRequests).then((t) =>
							t.reduce((n, i) => n && i, !0),
						))
					)
						throw new Error('Error when storing artifacts');
				}
			});
	});
function fr() {
	for (let r of Object.values(Lx))
		if (r.detectorFn(process.env)) {
			let e = r.contextRetrieverFn(process.env);
			return (
				M && console.log(JSON.stringify(e, null, 2)),
				{ ...e, inferredFromTaskRunner: !0 }
			);
		}
	return M && console.log('[Nx Cloud] Did not identify a VCS platform.'), null;
}
function Px(r) {
	return r.CIRCLECI === 'true';
}
function Fx(r) {
	M && console.log('[Nx Cloud] Detected Env: CircleCI');
	let e = (n) => {
			if (n.CIRCLE_PR_NUMBER !== void 0) return n.CIRCLE_PR_NUMBER;
			if (n.CIRCLE_PULL_REQUEST !== void 0) {
				let i = n.CIRCLE_PULL_REQUEST.split('/');
				return i[i.length - 1];
			}
			return n.CIRCLE_BRANCH !== void 0 ? n.CIRCLE_BRANCH : 'unknown';
		},
		t = (n) =>
			n.CIRCLE_USERNAME !== void 0
				? n.CIRCLE_USERNAME
				: n.CIRCLE_PR_USERNAME
				? n.CIRCLE_PR_USERNAME
				: null;
	return {
		branch: e(r),
		ref: r.CIRCLE_BRANCH ?? null,
		title: Uu(),
		headSha: r.CIRCLE_SHA1 ?? 'unknown',
		baseSha: null,
		commitLink: r.CIRCLE_PULL_REQUEST ?? null,
		author: t(r),
		authorUrl: null,
		authorAvatarUrl: null,
	};
}
function Mx(r) {
	return r.TRAVIS === 'true';
}
function qx(r) {
	return (
		M && console.log('[Nx Cloud] Detected Env: TravisCI'),
		{
			branch: ((t) =>
				t.TRAVIS_EVENT_TYPE === 'pull_request'
					? t.TRAVIS_PULL_REQUEST
					: t.TRAVIS_BRANCH)(r),
			ref: null,
			title: r.TRAVIS_COMMIT_MESSAGE,
			headSha: r.TRAVIS_COMMIT ?? 'unknown',
			baseSha: null,
			commitLink: null,
			author: Gy(),
			authorUrl: null,
			authorAvatarUrl: null,
		}
	);
}
function Ux(r) {
	return r.GITHUB_ACTIONS === 'true';
}
function Bx(r) {
	M && console.log('[Nx Cloud] Detected Env: GitHub Actions');
	let e = (i) => {
			if (i.GITHUB_REF) {
				let s = i.GITHUB_REF.match(/refs\/pull\/(\d+)\/merge/);
				if (s) return s[1];
			}
			return i.GITHUB_HEAD_REF
				? i.GITHUB_HEAD_REF
				: i.GITHUB_REF_NAME
				? i.GITHUB_REF_NAME
				: 'unknown';
		},
		t = (i) => {
			let s = `${i.GITHUB_SERVER_URL}/${i.GITHUB_REPOSITORY}`;
			return i.GITHUB_EVENT_NAME === 'pull_request'
				? `${s}/pull/${e(i)}`
				: `${s}/commit/${i.GITHUB_SHA}`;
		},
		n = (i) =>
			i.GITHUB_HEAD_REF
				? i.GITHUB_HEAD_REF
				: i.GITHUB_REF
				? i.GITHUB_REF
				: null;
	return {
		branch: e(r),
		ref: n(r),
		title: Uu(),
		headSha: r.GITHUB_SHA ?? 'unknown',
		baseSha: null,
		commitLink: t(r),
		author: r.GITHUB_ACTOR ?? null,
		authorUrl: `https://github.com/${r.GITHUB_ACTOR}`,
		authorAvatarUrl: `https://avatars.githubusercontent.com/u/${r.GITHUB_ACTOR_ID}`,
	};
}
function jx(r) {
	return r.BITBUCKET_BUILD_NUMBER != null;
}
function Gx(r) {
	return (
		M && console.log('[Nx Cloud] Detected Env: BitBucket Pipelines'),
		{
			branch: r.BITBUCKET_PR_ID ?? r.BITBUCKET_BRANCH ?? 'unknown',
			ref: null,
			title: Uu(),
			headSha: r.BITBUCKET_COMMIT ?? 'unknown',
			baseSha: null,
			commitLink: null,
			author: Gy(),
			authorUrl: null,
			authorAvatarUrl: null,
		}
	);
}
function $x(r) {
	return r.BUILD_BUILDID !== void 0 && r.AGENT_NAME !== void 0;
}
function Hx(r) {
	return (
		M && console.log('[Nx Cloud] Detected Env: Azure DevOps'),
		{
			branch:
				r.SYSTEM_PULLREQUEST_PULLREQUESTNUMBER ??
				r.BUILD_SOURCEBRANCHNAME ??
				'unknown',
			ref: null,
			title: r.BUILD_SOURCEVERSIONMESSAGE ?? null,
			headSha: tt() ?? 'unknown',
			baseSha: null,
			commitLink: null,
			author: r.BUILD_REQUESTEDFOR ?? null,
			authorUrl: null,
			authorAvatarUrl: null,
		}
	);
}
function zx(r) {
	return r.GITLAB_CI === 'true';
}
function Vx(r) {
	return (
		M && console.log('[Nx Cloud] Detected Env: GitLab Pipelines'),
		{
			branch: ((t) =>
				t.CI_MERGE_REQUEST_IID
					? t.CI_MERGE_REQUEST_IID
					: t.CI_COMMIT_BRANCH
					? t.CI_COMMIT_BRANCH
					: 'unknown')(r),
			ref: r.CI_COMMIT_REF_NAME ?? null,
			title: r.CI_COMMIT_MESSAGE ?? null,
			headSha: tt() ?? 'unknown',
			baseSha: null,
			commitLink: null,
			author: r.GITLAB_USER_NAME ?? null,
			authorUrl: null,
			authorAvatarUrl: null,
		}
	);
}
function Uu() {
	try {
		return (0, qu.execSync)('git log -1 --pretty=%B', {
			encoding: 'utf-8',
		}).trim();
	} catch {
		return null;
	}
}
function Gy() {
	try {
		return (0, qu.execSync)('git log -1 --pretty=%aN', {
			encoding: 'utf-8',
		}).trim();
	} catch {
		return null;
	}
}
var qu,
	Lx,
	Ro = B(() => {
		'use strict';
		qu = require('child_process');
		oe();
		Lx = {
			CIRCLE_CI: { detectorFn: Px, contextRetrieverFn: Fx },
			TRAVIS_CI: { detectorFn: Mx, contextRetrieverFn: qx },
			GITHUB_ACTIONS: { detectorFn: Ux, contextRetrieverFn: Bx },
			BITBUCKET_PIPELINES: { detectorFn: jx, contextRetrieverFn: Gx },
			AZURE_DEVOPS: { detectorFn: $x, contextRetrieverFn: Hx },
			GITLAB_PIPELINES: { detectorFn: zx, contextRetrieverFn: Vx },
		};
	});
var $y,
	Hy,
	zy,
	xo,
	Nn,
	Bu = B(() => {
		'use strict';
		($y = require('fs')), (Hy = require('util')), (zy = require('zlib'));
		_t();
		oe();
		Ro();
		ca();
		Dt();
		({ output: xo } = J()),
			(Nn = class {
				constructor(e, t, n, i) {
					this.messages = e;
					this.runContext = t;
					this.machineInfo = i;
					this.apiAxiosInstance = Te(n);
				}
				async startRun(e, t) {
					var i;
					if (this.messages.apiError) return {};
					let n = Oe('startRun');
					try {
						let s = {
							meta: { nxCloudVersion: this.nxCloudVersion() },
							branch: Re(),
							runGroup: Fe(),
							ciExecutionId: je(),
							ciExecutionEnv: we(),
							distributedExecutionId: e,
							hashes: t,
							machineInfo: this.machineInfo,
							vcsContext: fr(),
						};
						M &&
							xo.note({
								title: 'RunStart',
								bodyLines: [
									`
` + JSON.stringify(s, null, 2),
								],
							});
						let o = await Xa('RunStart duration', () =>
							ce(() => this.apiAxiosInstance.post('/nx-cloud/runs/start', s)),
						);
						return (
							n.recordMetric(re(o)),
							o.data &&
								o.data.message &&
								(this.messages.message = o.data.message),
							!o.data || !o.data.urls
								? ((this.messages.apiError = `Invalid Nx Cloud response: ${JSON.stringify(
										o.data,
								  )}`),
								  {})
								: o.data.urls
						);
					} catch (s) {
						return (
							n.recordMetric(
								(i = s == null ? void 0 : s.axiosException) != null &&
									i.response
									? re(s.axiosException.response)
									: Ce,
							),
							(this.messages.apiError = this.messages.extractErrorMessage(
								s,
								'api',
							)),
							{}
						);
					}
				}
				createReqBody(e, t, n, i) {
					if (Kr()) for (let o of t) delete o.uploadedToStorage;
					let s = {
						meta: { nxCloudVersion: this.nxCloudVersion() },
						tasks: t,
						run: e,
						linkId: i,
						...(Kr() ? {} : n),
						machineInfo: this.machineInfo,
						vcsContext: fr(),
					};
					return JSON.stringify(s);
				}
				async endRun(e, t, n, i) {
					var l;
					if (this.messages.apiError) return !1;
					let s = this.createReqBody(e, t, n, i);
					s.length > 20 * 1e3 * 1e3 &&
						(s = this.createReqBody(
							e,
							t.map((u) => ({ ...u, hashDetails: void 0 })),
							n,
							i,
						));
					let o = Buffer.from(s),
						a = await (0, Hy.promisify)(zy.gzip)(o),
						c = Oe('endRun');
					try {
						if (M) {
							let f = t.map((h) => ({
								...h,
								terminalOutput: h.terminalOutput
									? `${h.terminalOutput.slice(0, 20)}...`
									: void 0,
							}));
							xo.note({
								title: 'RunEnd. Completed tasks',
								bodyLines: [
									`
` + JSON.stringify(f, null, 2),
								],
							});
						}
						let u = await Xa('RunEnd duration', () =>
							ce(() =>
								this.apiAxiosInstance.post('/nx-cloud/runs/end', a, {
									headers: {
										...this.apiAxiosInstance.defaults.headers,
										'Content-Encoding': 'gzip',
										'Content-Type': 'application/octet-stream',
									},
								}),
							),
						);
						if (u) {
							if (
								(c.recordMetric(re(u)),
								u.data && u.data.runUrl && u.data.status === 'success')
							)
								return (this.runContext.runUrl = u.data.runUrl), !0;
							u.data && u.data.status
								? (this.messages.apiError = `Invalid end run response: ${JSON.stringify(
										u.data.message,
								  )}`)
								: u.data && typeof u.data == 'string'
								? u.data !== 'success' &&
								  (this.messages.apiError = `Invalid end run response: ${JSON.stringify(
										u.data,
								  )}`)
								: (this.messages.apiError = `Invalid end run response: ${JSON.stringify(
										u.data,
								  )}`),
								M &&
									xo.note({
										title: 'Invalid end run response',
										bodyLines: [JSON.stringify(u.data, null, 2)],
									});
						} else
							xo.error({
								title: 'Nx Cloud: Unknown Error Occurred',
								bodyLines: [
									'Run completion responded with `undefined`.',
									'Run Details:',
									JSON.stringify(e, null, 2),
									'Stack Trace:',
									JSON.stringify(new Error().stack, null, 2),
								],
							});
						return !1;
					} catch (u) {
						c.recordMetric(
							(l = u == null ? void 0 : u.axiosException) != null && l.response
								? re(u.axiosException.response)
								: Ce,
						);
						let f = u.axiosException ?? u;
						return (
							(this.messages.apiError = this.messages.extractErrorMessage(
								f,
								'api',
							)),
							!1
						);
					}
				}
				nxCloudVersion() {
					try {
						let e = JSON.parse((0, $y.readFileSync)('package.json').toString());
						return (
							e.devDependencies['nx-cloud'] ||
							e.devDependencies['@nrwl/nx-cloud']
						);
					} catch {
						return 'unknown';
					}
				}
			});
	});
function To() {
	let r = '';
	for (let e = 0; e < 10; ++e) r += Vy[Math.floor(Math.random() * Vy.length)];
	return r;
}
var Wy,
	Wx,
	Xx,
	Vy,
	ju = B(() => {
		'use strict';
		(Wy = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
			(Wx = '0123456789'),
			(Xx = Wy.toLowerCase()),
			(Vy = Wy + Xx + Wx);
	});
var pt = E((Ue) => {
	'use strict';
	var Gu = require('path');
	Xr();
	try {
		try {
			let r;
			try {
				r = ne('nx/src/utils/app-root').workspaceRoot;
			} catch {
				r = ne('nx/src/utils/workspace-root').workspaceRoot;
			}
			let { getDependencyConfigs: e } = ne('nx/src/tasks-runner/utils'),
				t = ne('nx/tasks-runners/default').default,
				{ CompositeLifeCycle: n } = ne('nx/src/tasks-runner/life-cycle'),
				i = null;
			try {
				i = ne('nx/src/index').initTasksRunner;
			} catch {}
			let s;
			try {
				s = ne('nx/src/devkit-exports').cacheDir;
			} catch {
				try {
					s = ne('nx/src/utils/cache-directory').cacheDir;
				} catch {
					s = (0, Gu.join)(r, './node_modules/.cache/nx');
				}
			}
			let o = ne('nx/src/tasks-runner/utils').isCacheableTask;
			(Ue.cacheDirectory = s),
				(Ue.runnerReturnsPromise = !0),
				(Ue.tasksRunner = t),
				(Ue.CompositeLifeCycle = n),
				(Ue.getDependencyConfigs = e),
				(Ue.initTasksRunner = i),
				(Ue.isCacheableTask = o);
		} catch {
			let { appRootPath: e } = ne('@nrwl/tao/src/utils/app-root'),
				{ getDependencyConfigs: t } = ne(
					'@nrwl/workspace/src/tasks-runner/utils',
				),
				{ tasksRunnerV2: n } = ne(
					'@nrwl/workspace/src/tasks-runner/tasks-runner-v2',
				),
				i;
			try {
				i = ne(
					'@nrwl/workspace/src/tasks-runner/life-cycle',
				).CompositeLifeCycle;
			} catch {}
			let s = ne('@nrwl/workspace/src/tasks-runner/utils').isCacheableTask;
			(Ue.cacheDirectory = (0, Gu.join)(e, './node_modules/.cache/nx')),
				(Ue.runnerReturnsPromise = !1),
				(Ue.tasksRunner = n),
				(Ue.CompositeLifeCycle = i),
				(Ue.getDependencyConfigs = t),
				(Ue.initTasksRunner = null),
				(Ue.isCacheableTask = s);
		}
	} catch (r) {
		process.env.NX_VERBOSE_LOGGING === 'true' && console.log(r),
			console.error('NX CLOUD ERROR'),
			console.error('---------------------------------------'),
			console.error(
				'This version of Nx Cloud is incompatible with the @nrwl/* and @nx/* packages in your workspace, or Nx was not installed properly.',
			),
			console.error(''),
			console.error('Verify your install step was successful, and if it was,'),
			console.error(
				'match your @nrwl/nx-cloud version to the same major version of your @nx/* and @nrwl/* packages and try again.',
			),
			console.error('---------------------------------------'),
			process.exit(1);
	}
});
var Ve = E(($u) => {
	'use strict';
	$u.fromCallback = function (r) {
		return Object.defineProperty(
			function () {
				if (typeof arguments[arguments.length - 1] == 'function')
					r.apply(this, arguments);
				else
					return new Promise((e, t) => {
						(arguments[arguments.length] = (n, i) => {
							if (n) return t(n);
							e(i);
						}),
							arguments.length++,
							r.apply(this, arguments);
					});
			},
			'name',
			{ value: r.name },
		);
	};
	$u.fromPromise = function (r) {
		return Object.defineProperty(
			function () {
				let e = arguments[arguments.length - 1];
				if (typeof e != 'function') return r.apply(this, arguments);
				r.apply(this, arguments).then((t) => e(null, t), e);
			},
			'name',
			{ value: r.name },
		);
	};
});
var Ky = E((YD, Xy) => {
	var hr = require('constants'),
		Kx = process.cwd,
		Oo = null,
		Yx = process.env.GRACEFUL_FS_PLATFORM || process.platform;
	process.cwd = function () {
		return Oo || (Oo = Kx.call(process)), Oo;
	};
	try {
		process.cwd();
	} catch {}
	typeof process.chdir == 'function' &&
		((Hu = process.chdir),
		(process.chdir = function (r) {
			(Oo = null), Hu.call(process, r);
		}),
		Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Hu));
	var Hu;
	Xy.exports = Jx;
	function Jx(r) {
		hr.hasOwnProperty('O_SYMLINK') &&
			process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) &&
			e(r),
			r.lutimes || t(r),
			(r.chown = s(r.chown)),
			(r.fchown = s(r.fchown)),
			(r.lchown = s(r.lchown)),
			(r.chmod = n(r.chmod)),
			(r.fchmod = n(r.fchmod)),
			(r.lchmod = n(r.lchmod)),
			(r.chownSync = o(r.chownSync)),
			(r.fchownSync = o(r.fchownSync)),
			(r.lchownSync = o(r.lchownSync)),
			(r.chmodSync = i(r.chmodSync)),
			(r.fchmodSync = i(r.fchmodSync)),
			(r.lchmodSync = i(r.lchmodSync)),
			(r.stat = a(r.stat)),
			(r.fstat = a(r.fstat)),
			(r.lstat = a(r.lstat)),
			(r.statSync = c(r.statSync)),
			(r.fstatSync = c(r.fstatSync)),
			(r.lstatSync = c(r.lstatSync)),
			r.chmod &&
				!r.lchmod &&
				((r.lchmod = function (u, f, h) {
					h && process.nextTick(h);
				}),
				(r.lchmodSync = function () {})),
			r.chown &&
				!r.lchown &&
				((r.lchown = function (u, f, h, d) {
					d && process.nextTick(d);
				}),
				(r.lchownSync = function () {})),
			Yx === 'win32' &&
				(r.rename =
					typeof r.rename != 'function'
						? r.rename
						: (function (u) {
								function f(h, d, y) {
									var b = Date.now(),
										p = 0;
									u(h, d, function w(k) {
										if (
											k &&
											(k.code === 'EACCES' ||
												k.code === 'EPERM' ||
												k.code === 'EBUSY') &&
											Date.now() - b < 6e4
										) {
											setTimeout(function () {
												r.stat(d, function (T, A) {
													T && T.code === 'ENOENT' ? u(h, d, w) : y(k);
												});
											}, p),
												p < 100 && (p += 10);
											return;
										}
										y && y(k);
									});
								}
								return Object.setPrototypeOf && Object.setPrototypeOf(f, u), f;
						  })(r.rename)),
			(r.read =
				typeof r.read != 'function'
					? r.read
					: (function (u) {
							function f(h, d, y, b, p, w) {
								var k;
								if (w && typeof w == 'function') {
									var T = 0;
									k = function (A, P, I) {
										if (A && A.code === 'EAGAIN' && T < 10)
											return T++, u.call(r, h, d, y, b, p, k);
										w.apply(this, arguments);
									};
								}
								return u.call(r, h, d, y, b, p, k);
							}
							return Object.setPrototypeOf && Object.setPrototypeOf(f, u), f;
					  })(r.read)),
			(r.readSync =
				typeof r.readSync != 'function'
					? r.readSync
					: (function (u) {
							return function (f, h, d, y, b) {
								for (var p = 0; ; )
									try {
										return u.call(r, f, h, d, y, b);
									} catch (w) {
										if (w.code === 'EAGAIN' && p < 10) {
											p++;
											continue;
										}
										throw w;
									}
							};
					  })(r.readSync));
		function e(u) {
			(u.lchmod = function (f, h, d) {
				u.open(f, hr.O_WRONLY | hr.O_SYMLINK, h, function (y, b) {
					if (y) {
						d && d(y);
						return;
					}
					u.fchmod(b, h, function (p) {
						u.close(b, function (w) {
							d && d(p || w);
						});
					});
				});
			}),
				(u.lchmodSync = function (f, h) {
					var d = u.openSync(f, hr.O_WRONLY | hr.O_SYMLINK, h),
						y = !0,
						b;
					try {
						(b = u.fchmodSync(d, h)), (y = !1);
					} finally {
						if (y)
							try {
								u.closeSync(d);
							} catch {}
						else u.closeSync(d);
					}
					return b;
				});
		}
		function t(u) {
			hr.hasOwnProperty('O_SYMLINK') && u.futimes
				? ((u.lutimes = function (f, h, d, y) {
						u.open(f, hr.O_SYMLINK, function (b, p) {
							if (b) {
								y && y(b);
								return;
							}
							u.futimes(p, h, d, function (w) {
								u.close(p, function (k) {
									y && y(w || k);
								});
							});
						});
				  }),
				  (u.lutimesSync = function (f, h, d) {
						var y = u.openSync(f, hr.O_SYMLINK),
							b,
							p = !0;
						try {
							(b = u.futimesSync(y, h, d)), (p = !1);
						} finally {
							if (p)
								try {
									u.closeSync(y);
								} catch {}
							else u.closeSync(y);
						}
						return b;
				  }))
				: u.futimes &&
				  ((u.lutimes = function (f, h, d, y) {
						y && process.nextTick(y);
				  }),
				  (u.lutimesSync = function () {}));
		}
		function n(u) {
			return (
				u &&
				function (f, h, d) {
					return u.call(r, f, h, function (y) {
						l(y) && (y = null), d && d.apply(this, arguments);
					});
				}
			);
		}
		function i(u) {
			return (
				u &&
				function (f, h) {
					try {
						return u.call(r, f, h);
					} catch (d) {
						if (!l(d)) throw d;
					}
				}
			);
		}
		function s(u) {
			return (
				u &&
				function (f, h, d, y) {
					return u.call(r, f, h, d, function (b) {
						l(b) && (b = null), y && y.apply(this, arguments);
					});
				}
			);
		}
		function o(u) {
			return (
				u &&
				function (f, h, d) {
					try {
						return u.call(r, f, h, d);
					} catch (y) {
						if (!l(y)) throw y;
					}
				}
			);
		}
		function a(u) {
			return (
				u &&
				function (f, h, d) {
					typeof h == 'function' && ((d = h), (h = null));
					function y(b, p) {
						p &&
							(p.uid < 0 && (p.uid += 4294967296),
							p.gid < 0 && (p.gid += 4294967296)),
							d && d.apply(this, arguments);
					}
					return h ? u.call(r, f, h, y) : u.call(r, f, y);
				}
			);
		}
		function c(u) {
			return (
				u &&
				function (f, h) {
					var d = h ? u.call(r, f, h) : u.call(r, f);
					return (
						d &&
							(d.uid < 0 && (d.uid += 4294967296),
							d.gid < 0 && (d.gid += 4294967296)),
						d
					);
				}
			);
		}
		function l(u) {
			if (!u || u.code === 'ENOSYS') return !0;
			var f = !process.getuid || process.getuid() !== 0;
			return !!(f && (u.code === 'EINVAL' || u.code === 'EPERM'));
		}
	}
});
var Zy = E((JD, Jy) => {
	var Yy = require('stream').Stream;
	Jy.exports = Zx;
	function Zx(r) {
		return { ReadStream: e, WriteStream: t };
		function e(n, i) {
			if (!(this instanceof e)) return new e(n, i);
			Yy.call(this);
			var s = this;
			(this.path = n),
				(this.fd = null),
				(this.readable = !0),
				(this.paused = !1),
				(this.flags = 'r'),
				(this.mode = 438),
				(this.bufferSize = 64 * 1024),
				(i = i || {});
			for (var o = Object.keys(i), a = 0, c = o.length; a < c; a++) {
				var l = o[a];
				this[l] = i[l];
			}
			if (
				(this.encoding && this.setEncoding(this.encoding),
				this.start !== void 0)
			) {
				if (typeof this.start != 'number')
					throw TypeError('start must be a Number');
				if (this.end === void 0) this.end = 1 / 0;
				else if (typeof this.end != 'number')
					throw TypeError('end must be a Number');
				if (this.start > this.end) throw new Error('start must be <= end');
				this.pos = this.start;
			}
			if (this.fd !== null) {
				process.nextTick(function () {
					s._read();
				});
				return;
			}
			r.open(this.path, this.flags, this.mode, function (u, f) {
				if (u) {
					s.emit('error', u), (s.readable = !1);
					return;
				}
				(s.fd = f), s.emit('open', f), s._read();
			});
		}
		function t(n, i) {
			if (!(this instanceof t)) return new t(n, i);
			Yy.call(this),
				(this.path = n),
				(this.fd = null),
				(this.writable = !0),
				(this.flags = 'w'),
				(this.encoding = 'binary'),
				(this.mode = 438),
				(this.bytesWritten = 0),
				(i = i || {});
			for (var s = Object.keys(i), o = 0, a = s.length; o < a; o++) {
				var c = s[o];
				this[c] = i[c];
			}
			if (this.start !== void 0) {
				if (typeof this.start != 'number')
					throw TypeError('start must be a Number');
				if (this.start < 0) throw new Error('start must be >= zero');
				this.pos = this.start;
			}
			(this.busy = !1),
				(this._queue = []),
				this.fd === null &&
					((this._open = r.open),
					this._queue.push([
						this._open,
						this.path,
						this.flags,
						this.mode,
						void 0,
					]),
					this.flush());
		}
	}
});
var eE = E((ZD, Qy) => {
	'use strict';
	Qy.exports = eT;
	var Qx =
		Object.getPrototypeOf ||
		function (r) {
			return r.__proto__;
		};
	function eT(r) {
		if (r === null || typeof r != 'object') return r;
		if (r instanceof Object) var e = { __proto__: Qx(r) };
		else var e = Object.create(null);
		return (
			Object.getOwnPropertyNames(r).forEach(function (t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
			}),
			e
		);
	}
});
var Ee = E((QD, Wu) => {
	var ue = require('fs'),
		tT = Ky(),
		rT = Zy(),
		nT = eE(),
		Co = require('util'),
		be,
		Ao;
	typeof Symbol == 'function' && typeof Symbol.for == 'function'
		? ((be = Symbol.for('graceful-fs.queue')),
		  (Ao = Symbol.for('graceful-fs.previous')))
		: ((be = '___graceful-fs.queue'), (Ao = '___graceful-fs.previous'));
	function iT() {}
	function nE(r, e) {
		Object.defineProperty(r, be, {
			get: function () {
				return e;
			},
		});
	}
	var Br = iT;
	Co.debuglog
		? (Br = Co.debuglog('gfs4'))
		: /\bgfs4\b/i.test(process.env.NODE_DEBUG || '') &&
		  (Br = function () {
				var r = Co.format.apply(Co, arguments);
				(r =
					'GFS4: ' +
					r.split(/\n/).join(`
GFS4: `)),
					console.error(r);
		  });
	ue[be] ||
		((tE = global[be] || []),
		nE(ue, tE),
		(ue.close = (function (r) {
			function e(t, n) {
				return r.call(ue, t, function (i) {
					i || rE(), typeof n == 'function' && n.apply(this, arguments);
				});
			}
			return Object.defineProperty(e, Ao, { value: r }), e;
		})(ue.close)),
		(ue.closeSync = (function (r) {
			function e(t) {
				r.apply(ue, arguments), rE();
			}
			return Object.defineProperty(e, Ao, { value: r }), e;
		})(ue.closeSync)),
		/\bgfs4\b/i.test(process.env.NODE_DEBUG || '') &&
			process.on('exit', function () {
				Br(ue[be]), require('assert').equal(ue[be].length, 0);
			}));
	var tE;
	global[be] || nE(global, ue[be]);
	Wu.exports = zu(nT(ue));
	process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH &&
		!ue.__patched &&
		((Wu.exports = zu(ue)), (ue.__patched = !0));
	function zu(r) {
		tT(r),
			(r.gracefulify = zu),
			(r.createReadStream = P),
			(r.createWriteStream = I);
		var e = r.readFile;
		r.readFile = t;
		function t(O, C, j) {
			return typeof C == 'function' && ((j = C), (C = null)), X(O, C, j);
			function X(V, Y, U, K) {
				return e(V, Y, function ($) {
					$ && ($.code === 'EMFILE' || $.code === 'ENFILE')
						? Dn([X, [V, Y, U], $, K || Date.now(), Date.now()])
						: typeof U == 'function' && U.apply(this, arguments);
				});
			}
		}
		var n = r.writeFile;
		r.writeFile = i;
		function i(O, C, j, X) {
			return typeof j == 'function' && ((X = j), (j = null)), V(O, C, j, X);
			function V(Y, U, K, $, L) {
				return n(Y, U, K, function (H) {
					H && (H.code === 'EMFILE' || H.code === 'ENFILE')
						? Dn([V, [Y, U, K, $], H, L || Date.now(), Date.now()])
						: typeof $ == 'function' && $.apply(this, arguments);
				});
			}
		}
		var s = r.appendFile;
		s && (r.appendFile = o);
		function o(O, C, j, X) {
			return typeof j == 'function' && ((X = j), (j = null)), V(O, C, j, X);
			function V(Y, U, K, $, L) {
				return s(Y, U, K, function (H) {
					H && (H.code === 'EMFILE' || H.code === 'ENFILE')
						? Dn([V, [Y, U, K, $], H, L || Date.now(), Date.now()])
						: typeof $ == 'function' && $.apply(this, arguments);
				});
			}
		}
		var a = r.copyFile;
		a && (r.copyFile = c);
		function c(O, C, j, X) {
			return typeof j == 'function' && ((X = j), (j = 0)), V(O, C, j, X);
			function V(Y, U, K, $, L) {
				return a(Y, U, K, function (H) {
					H && (H.code === 'EMFILE' || H.code === 'ENFILE')
						? Dn([V, [Y, U, K, $], H, L || Date.now(), Date.now()])
						: typeof $ == 'function' && $.apply(this, arguments);
				});
			}
		}
		var l = r.readdir;
		r.readdir = f;
		var u = /^v[0-5]\./;
		function f(O, C, j) {
			typeof C == 'function' && ((j = C), (C = null));
			var X = u.test(process.version)
				? function (U, K, $, L) {
						return l(U, V(U, K, $, L));
				  }
				: function (U, K, $, L) {
						return l(U, K, V(U, K, $, L));
				  };
			return X(O, C, j);
			function V(Y, U, K, $) {
				return function (L, H) {
					L && (L.code === 'EMFILE' || L.code === 'ENFILE')
						? Dn([X, [Y, U, K], L, $ || Date.now(), Date.now()])
						: (H && H.sort && H.sort(),
						  typeof K == 'function' && K.call(this, L, H));
				};
			}
		}
		if (process.version.substr(0, 4) === 'v0.8') {
			var h = rT(r);
			(w = h.ReadStream), (T = h.WriteStream);
		}
		var d = r.ReadStream;
		d && ((w.prototype = Object.create(d.prototype)), (w.prototype.open = k));
		var y = r.WriteStream;
		y && ((T.prototype = Object.create(y.prototype)), (T.prototype.open = A)),
			Object.defineProperty(r, 'ReadStream', {
				get: function () {
					return w;
				},
				set: function (O) {
					w = O;
				},
				enumerable: !0,
				configurable: !0,
			}),
			Object.defineProperty(r, 'WriteStream', {
				get: function () {
					return T;
				},
				set: function (O) {
					T = O;
				},
				enumerable: !0,
				configurable: !0,
			});
		var b = w;
		Object.defineProperty(r, 'FileReadStream', {
			get: function () {
				return b;
			},
			set: function (O) {
				b = O;
			},
			enumerable: !0,
			configurable: !0,
		});
		var p = T;
		Object.defineProperty(r, 'FileWriteStream', {
			get: function () {
				return p;
			},
			set: function (O) {
				p = O;
			},
			enumerable: !0,
			configurable: !0,
		});
		function w(O, C) {
			return this instanceof w
				? (d.apply(this, arguments), this)
				: w.apply(Object.create(w.prototype), arguments);
		}
		function k() {
			var O = this;
			G(O.path, O.flags, O.mode, function (C, j) {
				C
					? (O.autoClose && O.destroy(), O.emit('error', C))
					: ((O.fd = j), O.emit('open', j), O.read());
			});
		}
		function T(O, C) {
			return this instanceof T
				? (y.apply(this, arguments), this)
				: T.apply(Object.create(T.prototype), arguments);
		}
		function A() {
			var O = this;
			G(O.path, O.flags, O.mode, function (C, j) {
				C ? (O.destroy(), O.emit('error', C)) : ((O.fd = j), O.emit('open', j));
			});
		}
		function P(O, C) {
			return new r.ReadStream(O, C);
		}
		function I(O, C) {
			return new r.WriteStream(O, C);
		}
		var z = r.open;
		r.open = G;
		function G(O, C, j, X) {
			return typeof j == 'function' && ((X = j), (j = null)), V(O, C, j, X);
			function V(Y, U, K, $, L) {
				return z(Y, U, K, function (H, le) {
					H && (H.code === 'EMFILE' || H.code === 'ENFILE')
						? Dn([V, [Y, U, K, $], H, L || Date.now(), Date.now()])
						: typeof $ == 'function' && $.apply(this, arguments);
				});
			}
		}
		return r;
	}
	function Dn(r) {
		Br('ENQUEUE', r[0].name, r[1]), ue[be].push(r), Vu();
	}
	var Io;
	function rE() {
		for (var r = Date.now(), e = 0; e < ue[be].length; ++e)
			ue[be][e].length > 2 && ((ue[be][e][3] = r), (ue[be][e][4] = r));
		Vu();
	}
	function Vu() {
		if ((clearTimeout(Io), (Io = void 0), ue[be].length !== 0)) {
			var r = ue[be].shift(),
				e = r[0],
				t = r[1],
				n = r[2],
				i = r[3],
				s = r[4];
			if (i === void 0) Br('RETRY', e.name, t), e.apply(null, t);
			else if (Date.now() - i >= 6e4) {
				Br('TIMEOUT', e.name, t);
				var o = t.pop();
				typeof o == 'function' && o.call(null, n);
			} else {
				var a = Date.now() - s,
					c = Math.max(s - i, 1),
					l = Math.min(c * 1.2, 100);
				a >= l
					? (Br('RETRY', e.name, t), e.apply(null, t.concat([i])))
					: ue[be].push(r);
			}
			Io === void 0 && (Io = setTimeout(Vu, 0));
		}
	}
});
var Xu = E((kn) => {
	'use strict';
	var sT = Ve().fromCallback,
		Ot = Ee(),
		oT = [
			'access',
			'appendFile',
			'chmod',
			'chown',
			'close',
			'copyFile',
			'fchmod',
			'fchown',
			'fdatasync',
			'fstat',
			'fsync',
			'ftruncate',
			'futimes',
			'lchown',
			'lchmod',
			'link',
			'lstat',
			'mkdir',
			'mkdtemp',
			'open',
			'readFile',
			'readdir',
			'readlink',
			'realpath',
			'rename',
			'rmdir',
			'stat',
			'symlink',
			'truncate',
			'unlink',
			'utimes',
			'writeFile',
		].filter((r) => typeof Ot[r] == 'function');
	Object.keys(Ot).forEach((r) => {
		r !== 'promises' && (kn[r] = Ot[r]);
	});
	oT.forEach((r) => {
		kn[r] = sT(Ot[r]);
	});
	kn.exists = function (r, e) {
		return typeof e == 'function'
			? Ot.exists(r, e)
			: new Promise((t) => Ot.exists(r, t));
	};
	kn.read = function (r, e, t, n, i, s) {
		return typeof s == 'function'
			? Ot.read(r, e, t, n, i, s)
			: new Promise((o, a) => {
					Ot.read(r, e, t, n, i, (c, l, u) => {
						if (c) return a(c);
						o({ bytesRead: l, buffer: u });
					});
			  });
	};
	kn.write = function (r, e, ...t) {
		return typeof t[t.length - 1] == 'function'
			? Ot.write(r, e, ...t)
			: new Promise((n, i) => {
					Ot.write(r, e, ...t, (s, o, a) => {
						if (s) return i(s);
						n({ bytesWritten: o, buffer: a });
					});
			  });
	};
});
var Yu = E((tk, sE) => {
	'use strict';
	var Ku = require('path');
	function iE(r) {
		return (
			(r = Ku.normalize(Ku.resolve(r)).split(Ku.sep)),
			r.length > 0 ? r[0] : null
		);
	}
	var aT = /[<>:"|?*]/;
	function cT(r) {
		let e = iE(r);
		return (r = r.replace(e, '')), aT.test(r);
	}
	sE.exports = { getRootPath: iE, invalidWin32Path: cT };
});
var aE = E((rk, oE) => {
	'use strict';
	var uT = Ee(),
		Ju = require('path'),
		lT = Yu().invalidWin32Path,
		fT = parseInt('0777', 8);
	function Zu(r, e, t, n) {
		if (
			(typeof e == 'function'
				? ((t = e), (e = {}))
				: (!e || typeof e != 'object') && (e = { mode: e }),
			process.platform === 'win32' && lT(r))
		) {
			let o = new Error(r + ' contains invalid WIN32 path characters.');
			return (o.code = 'EINVAL'), t(o);
		}
		let i = e.mode,
			s = e.fs || uT;
		i === void 0 && (i = fT & ~process.umask()),
			n || (n = null),
			(t = t || function () {}),
			(r = Ju.resolve(r)),
			s.mkdir(r, i, (o) => {
				if (!o) return (n = n || r), t(null, n);
				switch (o.code) {
					case 'ENOENT':
						if (Ju.dirname(r) === r) return t(o);
						Zu(Ju.dirname(r), e, (a, c) => {
							a ? t(a, c) : Zu(r, e, t, c);
						});
						break;
					default:
						s.stat(r, (a, c) => {
							a || !c.isDirectory() ? t(o, n) : t(null, n);
						});
						break;
				}
			});
	}
	oE.exports = Zu;
});
var uE = E((nk, cE) => {
	'use strict';
	var hT = Ee(),
		Qu = require('path'),
		dT = Yu().invalidWin32Path,
		pT = parseInt('0777', 8);
	function el(r, e, t) {
		(!e || typeof e != 'object') && (e = { mode: e });
		let n = e.mode,
			i = e.fs || hT;
		if (process.platform === 'win32' && dT(r)) {
			let s = new Error(r + ' contains invalid WIN32 path characters.');
			throw ((s.code = 'EINVAL'), s);
		}
		n === void 0 && (n = pT & ~process.umask()),
			t || (t = null),
			(r = Qu.resolve(r));
		try {
			i.mkdirSync(r, n), (t = t || r);
		} catch (s) {
			if (s.code === 'ENOENT') {
				if (Qu.dirname(r) === r) throw s;
				(t = el(Qu.dirname(r), e, t)), el(r, e, t);
			} else {
				let o;
				try {
					o = i.statSync(r);
				} catch {
					throw s;
				}
				if (!o.isDirectory()) throw s;
			}
		}
		return t;
	}
	cE.exports = el;
});
var Qe = E((ik, lE) => {
	'use strict';
	var mT = Ve().fromCallback,
		tl = mT(aE()),
		rl = uE();
	lE.exports = {
		mkdirs: tl,
		mkdirsSync: rl,
		mkdirp: tl,
		mkdirpSync: rl,
		ensureDir: tl,
		ensureDirSync: rl,
	};
});
var nl = E((sk, hE) => {
	'use strict';
	var ke = Ee(),
		fE = require('os'),
		No = require('path');
	function yT() {
		let r = No.join(
			'millis-test-sync' +
				Date.now().toString() +
				Math.random().toString().slice(2),
		);
		r = No.join(fE.tmpdir(), r);
		let e = new Date(1435410243862);
		ke.writeFileSync(
			r,
			'https://github.com/jprichardson/node-fs-extra/pull/141',
		);
		let t = ke.openSync(r, 'r+');
		return (
			ke.futimesSync(t, e, e),
			ke.closeSync(t),
			ke.statSync(r).mtime > 1435410243e3
		);
	}
	function ET(r) {
		let e = No.join(
			'millis-test' + Date.now().toString() + Math.random().toString().slice(2),
		);
		e = No.join(fE.tmpdir(), e);
		let t = new Date(1435410243862);
		ke.writeFile(
			e,
			'https://github.com/jprichardson/node-fs-extra/pull/141',
			(n) => {
				if (n) return r(n);
				ke.open(e, 'r+', (i, s) => {
					if (i) return r(i);
					ke.futimes(s, t, t, (o) => {
						if (o) return r(o);
						ke.close(s, (a) => {
							if (a) return r(a);
							ke.stat(e, (c, l) => {
								if (c) return r(c);
								r(null, l.mtime > 1435410243e3);
							});
						});
					});
				});
			},
		);
	}
	function gT(r) {
		if (typeof r == 'number') return Math.floor(r / 1e3) * 1e3;
		if (r instanceof Date) return new Date(Math.floor(r.getTime() / 1e3) * 1e3);
		throw new Error('fs-extra: timeRemoveMillis() unknown parameter type');
	}
	function _T(r, e, t, n) {
		ke.open(r, 'r+', (i, s) => {
			if (i) return n(i);
			ke.futimes(s, e, t, (o) => {
				ke.close(s, (a) => {
					n && n(o || a);
				});
			});
		});
	}
	function vT(r, e, t) {
		let n = ke.openSync(r, 'r+');
		return ke.futimesSync(n, e, t), ke.closeSync(n);
	}
	hE.exports = {
		hasMillisRes: ET,
		hasMillisResSync: yT,
		timeRemoveMillis: gT,
		utimesMillis: _T,
		utimesMillisSync: vT,
	};
});
var il = E((ok, dE) => {
	'use strict';
	dE.exports = function (r) {
		if (typeof Buffer.allocUnsafe == 'function')
			try {
				return Buffer.allocUnsafe(r);
			} catch {
				return new Buffer(r);
			}
		return new Buffer(r);
	};
});
var _E = E((ak, gE) => {
	'use strict';
	var se = Ee(),
		Gt = require('path'),
		bT = Qe().mkdirsSync,
		ST = nl().utimesMillisSync,
		Do = Symbol('notExist');
	function wT(r, e, t) {
		typeof t == 'function' && (t = { filter: t }),
			(t = t || {}),
			(t.clobber = 'clobber' in t ? !!t.clobber : !0),
			(t.overwrite = 'overwrite' in t ? !!t.overwrite : t.clobber),
			t.preserveTimestamps &&
				process.arch === 'ia32' &&
				console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
		let n = EE(r, e);
		if (t.filter && !t.filter(r, e)) return;
		let i = Gt.dirname(e);
		return se.existsSync(i) || bT(i), pE(n, r, e, t);
	}
	function pE(r, e, t, n) {
		if (!(n.filter && !n.filter(e, t))) return RT(r, e, t, n);
	}
	function RT(r, e, t, n) {
		let s = (n.dereference ? se.statSync : se.lstatSync)(e);
		if (s.isDirectory()) return CT(s, r, e, t, n);
		if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice())
			return xT(s, r, e, t, n);
		if (s.isSymbolicLink()) return NT(r, e, t, n);
	}
	function xT(r, e, t, n, i) {
		return e === Do ? mE(r, t, n, i) : TT(r, t, n, i);
	}
	function TT(r, e, t, n) {
		if (n.overwrite) return se.unlinkSync(t), mE(r, e, t, n);
		if (n.errorOnExist) throw new Error(`'${t}' already exists`);
	}
	function mE(r, e, t, n) {
		return typeof se.copyFileSync == 'function'
			? (se.copyFileSync(e, t),
			  se.chmodSync(t, r.mode),
			  n.preserveTimestamps ? ST(t, r.atime, r.mtime) : void 0)
			: OT(r, e, t, n);
	}
	function OT(r, e, t, n) {
		let s = il()(65536),
			o = se.openSync(e, 'r'),
			a = se.openSync(t, 'w', r.mode),
			c = 0;
		for (; c < r.size; ) {
			let l = se.readSync(o, s, 0, 65536, c);
			se.writeSync(a, s, 0, l), (c += l);
		}
		n.preserveTimestamps && se.futimesSync(a, r.atime, r.mtime),
			se.closeSync(o),
			se.closeSync(a);
	}
	function CT(r, e, t, n, i) {
		if (e === Do) return IT(r, t, n, i);
		if (e && !e.isDirectory())
			throw new Error(
				`Cannot overwrite non-directory '${n}' with directory '${t}'.`,
			);
		return yE(t, n, i);
	}
	function IT(r, e, t, n) {
		return se.mkdirSync(t), yE(e, t, n), se.chmodSync(t, r.mode);
	}
	function yE(r, e, t) {
		se.readdirSync(r).forEach((n) => AT(n, r, e, t));
	}
	function AT(r, e, t, n) {
		let i = Gt.join(e, r),
			s = Gt.join(t, r),
			o = EE(i, s);
		return pE(o, i, s, n);
	}
	function NT(r, e, t, n) {
		let i = se.readlinkSync(e);
		if ((n.dereference && (i = Gt.resolve(process.cwd(), i)), r === Do))
			return se.symlinkSync(i, t);
		{
			let s;
			try {
				s = se.readlinkSync(t);
			} catch (o) {
				if (o.code === 'EINVAL' || o.code === 'UNKNOWN')
					return se.symlinkSync(i, t);
				throw o;
			}
			if ((n.dereference && (s = Gt.resolve(process.cwd(), s)), sl(i, s)))
				throw new Error(
					`Cannot copy '${i}' to a subdirectory of itself, '${s}'.`,
				);
			if (se.statSync(t).isDirectory() && sl(s, i))
				throw new Error(`Cannot overwrite '${s}' with '${i}'.`);
			return DT(i, t);
		}
	}
	function DT(r, e) {
		return se.unlinkSync(e), se.symlinkSync(r, e);
	}
	function sl(r, e) {
		let t = Gt.resolve(r).split(Gt.sep),
			n = Gt.resolve(e).split(Gt.sep);
		return t.reduce((i, s, o) => i && n[o] === s, !0);
	}
	function kT(r, e) {
		let t = se.statSync(r),
			n;
		try {
			n = se.statSync(e);
		} catch (i) {
			if (i.code === 'ENOENT') return { srcStat: t, destStat: Do };
			throw i;
		}
		return { srcStat: t, destStat: n };
	}
	function EE(r, e) {
		let { srcStat: t, destStat: n } = kT(r, e);
		if (n.ino && n.ino === t.ino)
			throw new Error('Source and destination must not be the same.');
		if (t.isDirectory() && sl(r, e))
			throw new Error(
				`Cannot copy '${r}' to a subdirectory of itself, '${e}'.`,
			);
		return n;
	}
	gE.exports = wT;
});
var ol = E((ck, vE) => {
	'use strict';
	vE.exports = { copySync: _E() };
});
var Ct = E((uk, SE) => {
	'use strict';
	var LT = Ve().fromPromise,
		bE = Xu();
	function PT(r) {
		return bE
			.access(r)
			.then(() => !0)
			.catch(() => !1);
	}
	SE.exports = { pathExists: LT(PT), pathExistsSync: bE.existsSync };
});
var DE = E((lk, NE) => {
	'use strict';
	var he = Ee(),
		$t = require('path'),
		FT = Qe().mkdirs,
		MT = Ct().pathExists,
		qT = nl().utimesMillis,
		ko = Symbol('notExist');
	function UT(r, e, t, n) {
		typeof t == 'function' && !n
			? ((n = t), (t = {}))
			: typeof t == 'function' && (t = { filter: t }),
			(n = n || function () {}),
			(t = t || {}),
			(t.clobber = 'clobber' in t ? !!t.clobber : !0),
			(t.overwrite = 'overwrite' in t ? !!t.overwrite : t.clobber),
			t.preserveTimestamps &&
				process.arch === 'ia32' &&
				console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`),
			AE(r, e, (i, s) =>
				i ? n(i) : t.filter ? xE(wE, s, r, e, t, n) : wE(s, r, e, t, n),
			);
	}
	function wE(r, e, t, n, i) {
		let s = $t.dirname(t);
		MT(s, (o, a) => {
			if (o) return i(o);
			if (a) return al(r, e, t, n, i);
			FT(s, (c) => (c ? i(c) : al(r, e, t, n, i)));
		});
	}
	function xE(r, e, t, n, i, s) {
		Promise.resolve(i.filter(t, n)).then(
			(o) => (o ? (e ? r(e, t, n, i, s) : r(t, n, i, s)) : s()),
			(o) => s(o),
		);
	}
	function al(r, e, t, n, i) {
		return n.filter ? xE(RE, r, e, t, n, i) : RE(r, e, t, n, i);
	}
	function RE(r, e, t, n, i) {
		(n.dereference ? he.stat : he.lstat)(e, (o, a) => {
			if (o) return i(o);
			if (a.isDirectory()) return $T(a, r, e, t, n, i);
			if (a.isFile() || a.isCharacterDevice() || a.isBlockDevice())
				return BT(a, r, e, t, n, i);
			if (a.isSymbolicLink()) return VT(r, e, t, n, i);
		});
	}
	function BT(r, e, t, n, i, s) {
		return e === ko ? TE(r, t, n, i, s) : jT(r, t, n, i, s);
	}
	function jT(r, e, t, n, i) {
		if (n.overwrite) he.unlink(t, (s) => (s ? i(s) : TE(r, e, t, n, i)));
		else return n.errorOnExist ? i(new Error(`'${t}' already exists`)) : i();
	}
	function TE(r, e, t, n, i) {
		return typeof he.copyFile == 'function'
			? he.copyFile(e, t, (s) => (s ? i(s) : OE(r, t, n, i)))
			: GT(r, e, t, n, i);
	}
	function GT(r, e, t, n, i) {
		let s = he.createReadStream(e);
		s.on('error', (o) => i(o)).once('open', () => {
			let o = he.createWriteStream(t, { mode: r.mode });
			o.on('error', (a) => i(a))
				.on('open', () => s.pipe(o))
				.once('close', () => OE(r, t, n, i));
		});
	}
	function OE(r, e, t, n) {
		he.chmod(e, r.mode, (i) =>
			i ? n(i) : t.preserveTimestamps ? qT(e, r.atime, r.mtime, n) : n(),
		);
	}
	function $T(r, e, t, n, i, s) {
		return e === ko
			? HT(r, t, n, i, s)
			: e && !e.isDirectory()
			? s(
					new Error(
						`Cannot overwrite non-directory '${n}' with directory '${t}'.`,
					),
			  )
			: CE(t, n, i, s);
	}
	function HT(r, e, t, n, i) {
		he.mkdir(t, (s) => {
			if (s) return i(s);
			CE(e, t, n, (o) => (o ? i(o) : he.chmod(t, r.mode, i)));
		});
	}
	function CE(r, e, t, n) {
		he.readdir(r, (i, s) => (i ? n(i) : IE(s, r, e, t, n)));
	}
	function IE(r, e, t, n, i) {
		let s = r.pop();
		return s ? zT(r, s, e, t, n, i) : i();
	}
	function zT(r, e, t, n, i, s) {
		let o = $t.join(t, e),
			a = $t.join(n, e);
		AE(o, a, (c, l) => {
			if (c) return s(c);
			al(l, o, a, i, (u) => (u ? s(u) : IE(r, t, n, i, s)));
		});
	}
	function VT(r, e, t, n, i) {
		he.readlink(e, (s, o) => {
			if (s) return i(s);
			if ((n.dereference && (o = $t.resolve(process.cwd(), o)), r === ko))
				return he.symlink(o, t, i);
			he.readlink(t, (a, c) =>
				a
					? a.code === 'EINVAL' || a.code === 'UNKNOWN'
						? he.symlink(o, t, i)
						: i(a)
					: (n.dereference && (c = $t.resolve(process.cwd(), c)),
					  cl(o, c)
							? i(
									new Error(
										`Cannot copy '${o}' to a subdirectory of itself, '${c}'.`,
									),
							  )
							: r.isDirectory() && cl(c, o)
							? i(new Error(`Cannot overwrite '${c}' with '${o}'.`))
							: WT(o, t, i)),
			);
		});
	}
	function WT(r, e, t) {
		he.unlink(e, (n) => (n ? t(n) : he.symlink(r, e, t)));
	}
	function cl(r, e) {
		let t = $t.resolve(r).split($t.sep),
			n = $t.resolve(e).split($t.sep);
		return t.reduce((i, s, o) => i && n[o] === s, !0);
	}
	function XT(r, e, t) {
		he.stat(r, (n, i) => {
			if (n) return t(n);
			he.stat(e, (s, o) =>
				s
					? s.code === 'ENOENT'
						? t(null, { srcStat: i, destStat: ko })
						: t(s)
					: t(null, { srcStat: i, destStat: o }),
			);
		});
	}
	function AE(r, e, t) {
		XT(r, e, (n, i) => {
			if (n) return t(n);
			let { srcStat: s, destStat: o } = i;
			return o.ino && o.ino === s.ino
				? t(new Error('Source and destination must not be the same.'))
				: s.isDirectory() && cl(r, e)
				? t(
						new Error(
							`Cannot copy '${r}' to a subdirectory of itself, '${e}'.`,
						),
				  )
				: t(null, o);
		});
	}
	NE.exports = UT;
});
var ul = E((fk, kE) => {
	'use strict';
	var KT = Ve().fromCallback;
	kE.exports = { copy: KT(DE()) };
});
var GE = E((hk, jE) => {
	'use strict';
	var LE = Ee(),
		qE = require('path'),
		ee = require('assert'),
		Si = process.platform === 'win32';
	function UE(r) {
		['unlink', 'chmod', 'stat', 'lstat', 'rmdir', 'readdir'].forEach((t) => {
			(r[t] = r[t] || LE[t]), (t = t + 'Sync'), (r[t] = r[t] || LE[t]);
		}),
			(r.maxBusyTries = r.maxBusyTries || 3);
	}
	function ll(r, e, t) {
		let n = 0;
		typeof e == 'function' && ((t = e), (e = {})),
			ee(r, 'rimraf: missing path'),
			ee.strictEqual(typeof r, 'string', 'rimraf: path should be a string'),
			ee.strictEqual(
				typeof t,
				'function',
				'rimraf: callback function required',
			),
			ee(e, 'rimraf: invalid options argument provided'),
			ee.strictEqual(typeof e, 'object', 'rimraf: options should be object'),
			UE(e),
			PE(r, e, function i(s) {
				if (s) {
					if (
						(s.code === 'EBUSY' ||
							s.code === 'ENOTEMPTY' ||
							s.code === 'EPERM') &&
						n < e.maxBusyTries
					) {
						n++;
						let o = n * 100;
						return setTimeout(() => PE(r, e, i), o);
					}
					s.code === 'ENOENT' && (s = null);
				}
				t(s);
			});
	}
	function PE(r, e, t) {
		ee(r),
			ee(e),
			ee(typeof t == 'function'),
			e.lstat(r, (n, i) => {
				if (n && n.code === 'ENOENT') return t(null);
				if (n && n.code === 'EPERM' && Si) return FE(r, e, n, t);
				if (i && i.isDirectory()) return Lo(r, e, n, t);
				e.unlink(r, (s) => {
					if (s) {
						if (s.code === 'ENOENT') return t(null);
						if (s.code === 'EPERM') return Si ? FE(r, e, s, t) : Lo(r, e, s, t);
						if (s.code === 'EISDIR') return Lo(r, e, s, t);
					}
					return t(s);
				});
			});
	}
	function FE(r, e, t, n) {
		ee(r),
			ee(e),
			ee(typeof n == 'function'),
			t && ee(t instanceof Error),
			e.chmod(r, 438, (i) => {
				i
					? n(i.code === 'ENOENT' ? null : t)
					: e.stat(r, (s, o) => {
							s
								? n(s.code === 'ENOENT' ? null : t)
								: o.isDirectory()
								? Lo(r, e, t, n)
								: e.unlink(r, n);
					  });
			});
	}
	function ME(r, e, t) {
		let n;
		ee(r), ee(e), t && ee(t instanceof Error);
		try {
			e.chmodSync(r, 438);
		} catch (i) {
			if (i.code === 'ENOENT') return;
			throw t;
		}
		try {
			n = e.statSync(r);
		} catch (i) {
			if (i.code === 'ENOENT') return;
			throw t;
		}
		n.isDirectory() ? Po(r, e, t) : e.unlinkSync(r);
	}
	function Lo(r, e, t, n) {
		ee(r),
			ee(e),
			t && ee(t instanceof Error),
			ee(typeof n == 'function'),
			e.rmdir(r, (i) => {
				i &&
				(i.code === 'ENOTEMPTY' || i.code === 'EEXIST' || i.code === 'EPERM')
					? YT(r, e, n)
					: i && i.code === 'ENOTDIR'
					? n(t)
					: n(i);
			});
	}
	function YT(r, e, t) {
		ee(r),
			ee(e),
			ee(typeof t == 'function'),
			e.readdir(r, (n, i) => {
				if (n) return t(n);
				let s = i.length,
					o;
				if (s === 0) return e.rmdir(r, t);
				i.forEach((a) => {
					ll(qE.join(r, a), e, (c) => {
						if (!o) {
							if (c) return t((o = c));
							--s === 0 && e.rmdir(r, t);
						}
					});
				});
			});
	}
	function BE(r, e) {
		let t;
		(e = e || {}),
			UE(e),
			ee(r, 'rimraf: missing path'),
			ee.strictEqual(typeof r, 'string', 'rimraf: path should be a string'),
			ee(e, 'rimraf: missing options'),
			ee.strictEqual(typeof e, 'object', 'rimraf: options should be object');
		try {
			t = e.lstatSync(r);
		} catch (n) {
			if (n.code === 'ENOENT') return;
			n.code === 'EPERM' && Si && ME(r, e, n);
		}
		try {
			t && t.isDirectory() ? Po(r, e, null) : e.unlinkSync(r);
		} catch (n) {
			if (n.code === 'ENOENT') return;
			if (n.code === 'EPERM') return Si ? ME(r, e, n) : Po(r, e, n);
			if (n.code !== 'EISDIR') throw n;
			Po(r, e, n);
		}
	}
	function Po(r, e, t) {
		ee(r), ee(e), t && ee(t instanceof Error);
		try {
			e.rmdirSync(r);
		} catch (n) {
			if (n.code === 'ENOTDIR') throw t;
			if (n.code === 'ENOTEMPTY' || n.code === 'EEXIST' || n.code === 'EPERM')
				JT(r, e);
			else if (n.code !== 'ENOENT') throw n;
		}
	}
	function JT(r, e) {
		if (
			(ee(r), ee(e), e.readdirSync(r).forEach((t) => BE(qE.join(r, t), e)), Si)
		) {
			let t = Date.now();
			do
				try {
					return e.rmdirSync(r, e);
				} catch {}
			while (Date.now() - t < 500);
		} else return e.rmdirSync(r, e);
	}
	jE.exports = ll;
	ll.sync = BE;
});
var wi = E((dk, HE) => {
	'use strict';
	var ZT = Ve().fromCallback,
		$E = GE();
	HE.exports = { remove: ZT($E), removeSync: $E.sync };
});
var ZE = E((pk, JE) => {
	'use strict';
	var QT = Ve().fromCallback,
		WE = require('fs'),
		XE = require('path'),
		KE = Qe(),
		YE = wi(),
		zE = QT(function (e, t) {
			(t = t || function () {}),
				WE.readdir(e, (n, i) => {
					if (n) return KE.mkdirs(e, t);
					(i = i.map((o) => XE.join(e, o))), s();
					function s() {
						let o = i.pop();
						if (!o) return t();
						YE.remove(o, (a) => {
							if (a) return t(a);
							s();
						});
					}
				});
		});
	function VE(r) {
		let e;
		try {
			e = WE.readdirSync(r);
		} catch {
			return KE.mkdirsSync(r);
		}
		e.forEach((t) => {
			(t = XE.join(r, t)), YE.removeSync(t);
		});
	}
	JE.exports = {
		emptyDirSync: VE,
		emptydirSync: VE,
		emptyDir: zE,
		emptydir: zE,
	};
});
var rg = E((mk, tg) => {
	'use strict';
	var eO = Ve().fromCallback,
		QE = require('path'),
		Ri = Ee(),
		eg = Qe(),
		tO = Ct().pathExists;
	function rO(r, e) {
		function t() {
			Ri.writeFile(r, '', (n) => {
				if (n) return e(n);
				e();
			});
		}
		Ri.stat(r, (n, i) => {
			if (!n && i.isFile()) return e();
			let s = QE.dirname(r);
			tO(s, (o, a) => {
				if (o) return e(o);
				if (a) return t();
				eg.mkdirs(s, (c) => {
					if (c) return e(c);
					t();
				});
			});
		});
	}
	function nO(r) {
		let e;
		try {
			e = Ri.statSync(r);
		} catch {}
		if (e && e.isFile()) return;
		let t = QE.dirname(r);
		Ri.existsSync(t) || eg.mkdirsSync(t), Ri.writeFileSync(r, '');
	}
	tg.exports = { createFile: eO(rO), createFileSync: nO };
});
var ag = E((yk, og) => {
	'use strict';
	var iO = Ve().fromCallback,
		ig = require('path'),
		jr = Ee(),
		sg = Qe(),
		ng = Ct().pathExists;
	function sO(r, e, t) {
		function n(i, s) {
			jr.link(i, s, (o) => {
				if (o) return t(o);
				t(null);
			});
		}
		ng(e, (i, s) => {
			if (i) return t(i);
			if (s) return t(null);
			jr.lstat(r, (o) => {
				if (o)
					return (o.message = o.message.replace('lstat', 'ensureLink')), t(o);
				let a = ig.dirname(e);
				ng(a, (c, l) => {
					if (c) return t(c);
					if (l) return n(r, e);
					sg.mkdirs(a, (u) => {
						if (u) return t(u);
						n(r, e);
					});
				});
			});
		});
	}
	function oO(r, e) {
		if (jr.existsSync(e)) return;
		try {
			jr.lstatSync(r);
		} catch (s) {
			throw ((s.message = s.message.replace('lstat', 'ensureLink')), s);
		}
		let n = ig.dirname(e);
		return jr.existsSync(n) || sg.mkdirsSync(n), jr.linkSync(r, e);
	}
	og.exports = { createLink: iO(sO), createLinkSync: oO };
});
var ug = E((Ek, cg) => {
	'use strict';
	var dr = require('path'),
		xi = Ee(),
		aO = Ct().pathExists;
	function cO(r, e, t) {
		if (dr.isAbsolute(r))
			return xi.lstat(r, (n) =>
				n
					? ((n.message = n.message.replace('lstat', 'ensureSymlink')), t(n))
					: t(null, { toCwd: r, toDst: r }),
			);
		{
			let n = dr.dirname(e),
				i = dr.join(n, r);
			return aO(i, (s, o) =>
				s
					? t(s)
					: o
					? t(null, { toCwd: i, toDst: r })
					: xi.lstat(r, (a) =>
							a
								? ((a.message = a.message.replace('lstat', 'ensureSymlink')),
								  t(a))
								: t(null, { toCwd: r, toDst: dr.relative(n, r) }),
					  ),
			);
		}
	}
	function uO(r, e) {
		let t;
		if (dr.isAbsolute(r)) {
			if (((t = xi.existsSync(r)), !t))
				throw new Error('absolute srcpath does not exist');
			return { toCwd: r, toDst: r };
		} else {
			let n = dr.dirname(e),
				i = dr.join(n, r);
			if (((t = xi.existsSync(i)), t)) return { toCwd: i, toDst: r };
			if (((t = xi.existsSync(r)), !t))
				throw new Error('relative srcpath does not exist');
			return { toCwd: r, toDst: dr.relative(n, r) };
		}
	}
	cg.exports = { symlinkPaths: cO, symlinkPathsSync: uO };
});
var hg = E((gk, fg) => {
	'use strict';
	var lg = Ee();
	function lO(r, e, t) {
		if (
			((t = typeof e == 'function' ? e : t),
			(e = typeof e == 'function' ? !1 : e),
			e)
		)
			return t(null, e);
		lg.lstat(r, (n, i) => {
			if (n) return t(null, 'file');
			(e = i && i.isDirectory() ? 'dir' : 'file'), t(null, e);
		});
	}
	function fO(r, e) {
		let t;
		if (e) return e;
		try {
			t = lg.lstatSync(r);
		} catch {
			return 'file';
		}
		return t && t.isDirectory() ? 'dir' : 'file';
	}
	fg.exports = { symlinkType: lO, symlinkTypeSync: fO };
});
var _g = E((_k, gg) => {
	'use strict';
	var hO = Ve().fromCallback,
		pg = require('path'),
		Ln = Ee(),
		mg = Qe(),
		dO = mg.mkdirs,
		pO = mg.mkdirsSync,
		yg = ug(),
		mO = yg.symlinkPaths,
		yO = yg.symlinkPathsSync,
		Eg = hg(),
		EO = Eg.symlinkType,
		gO = Eg.symlinkTypeSync,
		dg = Ct().pathExists;
	function _O(r, e, t, n) {
		(n = typeof t == 'function' ? t : n),
			(t = typeof t == 'function' ? !1 : t),
			dg(e, (i, s) => {
				if (i) return n(i);
				if (s) return n(null);
				mO(r, e, (o, a) => {
					if (o) return n(o);
					(r = a.toDst),
						EO(a.toCwd, t, (c, l) => {
							if (c) return n(c);
							let u = pg.dirname(e);
							dg(u, (f, h) => {
								if (f) return n(f);
								if (h) return Ln.symlink(r, e, l, n);
								dO(u, (d) => {
									if (d) return n(d);
									Ln.symlink(r, e, l, n);
								});
							});
						});
				});
			});
	}
	function vO(r, e, t) {
		if (Ln.existsSync(e)) return;
		let i = yO(r, e);
		(r = i.toDst), (t = gO(i.toCwd, t));
		let s = pg.dirname(e);
		return Ln.existsSync(s) || pO(s), Ln.symlinkSync(r, e, t);
	}
	gg.exports = { createSymlink: hO(_O), createSymlinkSync: vO };
});
var bg = E((vk, vg) => {
	'use strict';
	var Fo = rg(),
		Mo = ag(),
		qo = _g();
	vg.exports = {
		createFile: Fo.createFile,
		createFileSync: Fo.createFileSync,
		ensureFile: Fo.createFile,
		ensureFileSync: Fo.createFileSync,
		createLink: Mo.createLink,
		createLinkSync: Mo.createLinkSync,
		ensureLink: Mo.createLink,
		ensureLinkSync: Mo.createLinkSync,
		createSymlink: qo.createSymlink,
		createSymlinkSync: qo.createSymlinkSync,
		ensureSymlink: qo.createSymlink,
		ensureSymlinkSync: qo.createSymlinkSync,
	};
});
var xg = E((bk, Rg) => {
	var Pn;
	try {
		Pn = Ee();
	} catch {
		Pn = require('fs');
	}
	function bO(r, e, t) {
		t == null && ((t = e), (e = {})),
			typeof e == 'string' && (e = { encoding: e }),
			(e = e || {});
		var n = e.fs || Pn,
			i = !0;
		'throws' in e && (i = e.throws),
			n.readFile(r, e, function (s, o) {
				if (s) return t(s);
				o = wg(o);
				var a;
				try {
					a = JSON.parse(o, e ? e.reviver : null);
				} catch (c) {
					return i ? ((c.message = r + ': ' + c.message), t(c)) : t(null, null);
				}
				t(null, a);
			});
	}
	function SO(r, e) {
		(e = e || {}), typeof e == 'string' && (e = { encoding: e });
		var t = e.fs || Pn,
			n = !0;
		'throws' in e && (n = e.throws);
		try {
			var i = t.readFileSync(r, e);
			return (i = wg(i)), JSON.parse(i, e.reviver);
		} catch (s) {
			if (n) throw ((s.message = r + ': ' + s.message), s);
			return null;
		}
	}
	function Sg(r, e) {
		var t,
			n = `
`;
		typeof e == 'object' &&
			e !== null &&
			(e.spaces && (t = e.spaces), e.EOL && (n = e.EOL));
		var i = JSON.stringify(r, e ? e.replacer : null, t);
		return i.replace(/\n/g, n) + n;
	}
	function wO(r, e, t, n) {
		n == null && ((n = t), (t = {})), (t = t || {});
		var i = t.fs || Pn,
			s = '';
		try {
			s = Sg(e, t);
		} catch (o) {
			n && n(o, null);
			return;
		}
		i.writeFile(r, s, t, n);
	}
	function RO(r, e, t) {
		t = t || {};
		var n = t.fs || Pn,
			i = Sg(e, t);
		return n.writeFileSync(r, i, t);
	}
	function wg(r) {
		return (
			Buffer.isBuffer(r) && (r = r.toString('utf8')),
			(r = r.replace(/^\uFEFF/, '')),
			r
		);
	}
	var xO = { readFile: bO, readFileSync: SO, writeFile: wO, writeFileSync: RO };
	Rg.exports = xO;
});
var Bo = E((Sk, Og) => {
	'use strict';
	var Tg = Ve().fromCallback,
		Uo = xg();
	Og.exports = {
		readJson: Tg(Uo.readFile),
		readJsonSync: Uo.readFileSync,
		writeJson: Tg(Uo.writeFile),
		writeJsonSync: Uo.writeFileSync,
	};
});
var Ag = E((wk, Ig) => {
	'use strict';
	var TO = require('path'),
		OO = Qe(),
		CO = Ct().pathExists,
		Cg = Bo();
	function IO(r, e, t, n) {
		typeof t == 'function' && ((n = t), (t = {}));
		let i = TO.dirname(r);
		CO(i, (s, o) => {
			if (s) return n(s);
			if (o) return Cg.writeJson(r, e, t, n);
			OO.mkdirs(i, (a) => {
				if (a) return n(a);
				Cg.writeJson(r, e, t, n);
			});
		});
	}
	Ig.exports = IO;
});
var Dg = E((Rk, Ng) => {
	'use strict';
	var AO = Ee(),
		NO = require('path'),
		DO = Qe(),
		kO = Bo();
	function LO(r, e, t) {
		let n = NO.dirname(r);
		AO.existsSync(n) || DO.mkdirsSync(n), kO.writeJsonSync(r, e, t);
	}
	Ng.exports = LO;
});
var Lg = E((xk, kg) => {
	'use strict';
	var PO = Ve().fromCallback,
		Be = Bo();
	Be.outputJson = PO(Ag());
	Be.outputJsonSync = Dg();
	Be.outputJSON = Be.outputJson;
	Be.outputJSONSync = Be.outputJsonSync;
	Be.writeJSON = Be.writeJson;
	Be.writeJSONSync = Be.writeJsonSync;
	Be.readJSON = Be.readJson;
	Be.readJSONSync = Be.readJsonSync;
	kg.exports = Be;
});
var qg = E((Tk, Mg) => {
	'use strict';
	var We = Ee(),
		Gr = require('path'),
		FO = ol().copySync,
		fl = wi().removeSync,
		MO = Qe().mkdirsSync,
		qO = il();
	function Fg(r, e, t) {
		t = t || {};
		let n = t.overwrite || t.clobber || !1;
		if (((r = Gr.resolve(r)), (e = Gr.resolve(e)), r === e))
			return We.accessSync(r);
		if (jO(r, e)) throw new Error(`Cannot move '${r}' into itself '${e}'.`);
		MO(Gr.dirname(e)), i();
		function i() {
			if (n)
				try {
					return We.renameSync(r, e);
				} catch (s) {
					if (
						s.code === 'ENOTEMPTY' ||
						s.code === 'EEXIST' ||
						s.code === 'EPERM'
					)
						return fl(e), (t.overwrite = !1), Fg(r, e, t);
					if (s.code !== 'EXDEV') throw s;
					return Pg(r, e, n);
				}
			else
				try {
					return We.linkSync(r, e), We.unlinkSync(r);
				} catch (s) {
					if (
						s.code === 'EXDEV' ||
						s.code === 'EISDIR' ||
						s.code === 'EPERM' ||
						s.code === 'ENOTSUP'
					)
						return Pg(r, e, n);
					throw s;
				}
		}
	}
	function Pg(r, e, t) {
		return We.statSync(r).isDirectory() ? BO(r, e, t) : UO(r, e, t);
	}
	function UO(r, e, t) {
		let i = qO(65536),
			s = t ? 'w' : 'wx',
			o = We.openSync(r, 'r'),
			a = We.fstatSync(o),
			c = We.openSync(e, s, a.mode),
			l = 0;
		for (; l < a.size; ) {
			let u = We.readSync(o, i, 0, 65536, l);
			We.writeSync(c, i, 0, u), (l += u);
		}
		return We.closeSync(o), We.closeSync(c), We.unlinkSync(r);
	}
	function BO(r, e, t) {
		let n = { overwrite: !1 };
		t && fl(e), i();
		function i() {
			return FO(r, e, n), fl(r);
		}
	}
	function jO(r, e) {
		try {
			return (
				We.statSync(r).isDirectory() &&
				r !== e &&
				e.indexOf(r) > -1 &&
				e.split(Gr.dirname(r) + Gr.sep)[1].split(Gr.sep)[0] === Gr.basename(r)
			);
		} catch {
			return !1;
		}
	}
	Mg.exports = { moveSync: Fg };
});
var Gg = E((Ok, jg) => {
	'use strict';
	var GO = Ve().fromCallback,
		hl = Ee(),
		Ti = require('path'),
		$O = ul().copy,
		Bg = wi().remove,
		HO = Qe().mkdirp,
		zO = Ct().pathExists;
	function VO(r, e, t, n) {
		typeof t == 'function' && ((n = t), (t = {}));
		let i = t.overwrite || t.clobber || !1;
		if (((r = Ti.resolve(r)), (e = Ti.resolve(e)), r === e))
			return hl.access(r, n);
		hl.stat(r, (s, o) => {
			if (s) return n(s);
			if (o.isDirectory() && KO(r, e))
				return n(
					new Error(`Cannot move '${r}' to a subdirectory of itself, '${e}'.`),
				);
			HO(Ti.dirname(e), (a) => (a ? n(a) : WO(r, e, i, n)));
		});
	}
	function WO(r, e, t, n) {
		if (t) return Bg(e, (i) => (i ? n(i) : Ug(r, e, t, n)));
		zO(e, (i, s) =>
			i ? n(i) : s ? n(new Error('dest already exists.')) : Ug(r, e, t, n),
		);
	}
	function Ug(r, e, t, n) {
		hl.rename(r, e, (i) =>
			i ? (i.code !== 'EXDEV' ? n(i) : XO(r, e, t, n)) : n(),
		);
	}
	function XO(r, e, t, n) {
		$O(r, e, { overwrite: t, errorOnExist: !0 }, (s) => (s ? n(s) : Bg(r, n)));
	}
	function KO(r, e) {
		let t = r.split(Ti.sep),
			n = e.split(Ti.sep);
		return t.reduce((i, s, o) => i && n[o] === s, !0);
	}
	jg.exports = { move: GO(VO) };
});
var Vg = E((Ck, zg) => {
	'use strict';
	var YO = Ve().fromCallback,
		Oi = Ee(),
		$g = require('path'),
		Hg = Qe(),
		JO = Ct().pathExists;
	function ZO(r, e, t, n) {
		typeof t == 'function' && ((n = t), (t = 'utf8'));
		let i = $g.dirname(r);
		JO(i, (s, o) => {
			if (s) return n(s);
			if (o) return Oi.writeFile(r, e, t, n);
			Hg.mkdirs(i, (a) => {
				if (a) return n(a);
				Oi.writeFile(r, e, t, n);
			});
		});
	}
	function QO(r, ...e) {
		let t = $g.dirname(r);
		if (Oi.existsSync(t)) return Oi.writeFileSync(r, ...e);
		Hg.mkdirsSync(t), Oi.writeFileSync(r, ...e);
	}
	zg.exports = { outputFile: YO(ZO), outputFileSync: QO };
});
var jo = E((Ik, dl) => {
	'use strict';
	dl.exports = Object.assign(
		{},
		Xu(),
		ol(),
		ul(),
		ZE(),
		bg(),
		Lg(),
		Qe(),
		qg(),
		Gg(),
		Vg(),
		Ct(),
		wi(),
	);
	var Wg = require('fs');
	Object.getOwnPropertyDescriptor(Wg, 'promises') &&
		Object.defineProperty(dl.exports, 'promises', {
			get() {
				return Wg.promises;
			},
		});
});
var ml = E((pl) => {
	'use strict';
	Object.defineProperty(pl, '__esModule', { value: !0 });
	function eC(r) {
		return typeof r == 'function';
	}
	pl.isFunction = eC;
});
var Go = E((El) => {
	'use strict';
	Object.defineProperty(El, '__esModule', { value: !0 });
	var yl = !1;
	El.config = {
		Promise: void 0,
		set useDeprecatedSynchronousErrorHandling(r) {
			if (r) {
				var e = new Error();
				console.warn(
					`DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: 
` + e.stack,
				);
			} else
				yl &&
					console.log('RxJS: Back to a better error behavior. Thank you. <3');
			yl = r;
		},
		get useDeprecatedSynchronousErrorHandling() {
			return yl;
		},
	};
});
var $o = E((gl) => {
	'use strict';
	Object.defineProperty(gl, '__esModule', { value: !0 });
	function tC(r) {
		setTimeout(function () {
			throw r;
		}, 0);
	}
	gl.hostReportError = tC;
});
var vl = E((_l) => {
	'use strict';
	Object.defineProperty(_l, '__esModule', { value: !0 });
	var rC = Go(),
		nC = $o();
	_l.empty = {
		closed: !0,
		next: function (r) {},
		error: function (r) {
			if (rC.config.useDeprecatedSynchronousErrorHandling) throw r;
			nC.hostReportError(r);
		},
		complete: function () {},
	};
});
var Xg = E((bl) => {
	'use strict';
	Object.defineProperty(bl, '__esModule', { value: !0 });
	bl.isArray = (function () {
		return (
			Array.isArray ||
			function (r) {
				return r && typeof r.length == 'number';
			}
		);
	})();
});
var wl = E((Sl) => {
	'use strict';
	Object.defineProperty(Sl, '__esModule', { value: !0 });
	function iC(r) {
		return r !== null && typeof r == 'object';
	}
	Sl.isObject = iC;
});
var Kg = E((Rl) => {
	'use strict';
	Object.defineProperty(Rl, '__esModule', { value: !0 });
	var sC = (function () {
		function r(e) {
			return (
				Error.call(this),
				(this.message = e
					? e.length +
					  ` errors occurred during unsubscription:
` +
					  e.map(function (t, n) {
							return n + 1 + ') ' + t.toString();
					  }).join(`
  `)
					: ''),
				(this.name = 'UnsubscriptionError'),
				(this.errors = e),
				this
			);
		}
		return (r.prototype = Object.create(Error.prototype)), r;
	})();
	Rl.UnsubscriptionError = sC;
});
var pr = E((xl) => {
	'use strict';
	Object.defineProperty(xl, '__esModule', { value: !0 });
	var oC = Xg(),
		aC = wl(),
		cC = ml(),
		Ho = Kg(),
		uC = (function () {
			function r(e) {
				(this.closed = !1),
					(this._parentOrParents = null),
					(this._subscriptions = null),
					e && (this._unsubscribe = e);
			}
			return (
				(r.prototype.unsubscribe = function () {
					var e;
					if (!this.closed) {
						var t = this,
							n = t._parentOrParents,
							i = t._unsubscribe,
							s = t._subscriptions;
						if (
							((this.closed = !0),
							(this._parentOrParents = null),
							(this._subscriptions = null),
							n instanceof r)
						)
							n.remove(this);
						else if (n !== null)
							for (var o = 0; o < n.length; ++o) {
								var a = n[o];
								a.remove(this);
							}
						if (cC.isFunction(i))
							try {
								i.call(this);
							} catch (u) {
								e = u instanceof Ho.UnsubscriptionError ? Yg(u.errors) : [u];
							}
						if (oC.isArray(s))
							for (var o = -1, c = s.length; ++o < c; ) {
								var l = s[o];
								if (aC.isObject(l))
									try {
										l.unsubscribe();
									} catch (f) {
										(e = e || []),
											f instanceof Ho.UnsubscriptionError
												? (e = e.concat(Yg(f.errors)))
												: e.push(f);
									}
							}
						if (e) throw new Ho.UnsubscriptionError(e);
					}
				}),
				(r.prototype.add = function (e) {
					var t = e;
					if (!e) return r.EMPTY;
					switch (typeof e) {
						case 'function':
							t = new r(e);
						case 'object':
							if (t === this || t.closed || typeof t.unsubscribe != 'function')
								return t;
							if (this.closed) return t.unsubscribe(), t;
							if (!(t instanceof r)) {
								var n = t;
								(t = new r()), (t._subscriptions = [n]);
							}
							break;
						default:
							throw new Error(
								'unrecognized teardown ' + e + ' added to Subscription.',
							);
					}
					var i = t._parentOrParents;
					if (i === null) t._parentOrParents = this;
					else if (i instanceof r) {
						if (i === this) return t;
						t._parentOrParents = [i, this];
					} else if (i.indexOf(this) === -1) i.push(this);
					else return t;
					var s = this._subscriptions;
					return s === null ? (this._subscriptions = [t]) : s.push(t), t;
				}),
				(r.prototype.remove = function (e) {
					var t = this._subscriptions;
					if (t) {
						var n = t.indexOf(e);
						n !== -1 && t.splice(n, 1);
					}
				}),
				(r.EMPTY = (function (e) {
					return (e.closed = !0), e;
				})(new r())),
				r
			);
		})();
	xl.Subscription = uC;
	function Yg(r) {
		return r.reduce(function (e, t) {
			return e.concat(t instanceof Ho.UnsubscriptionError ? t.errors : t);
		}, []);
	}
});
var zo = E((Ci) => {
	'use strict';
	Object.defineProperty(Ci, '__esModule', { value: !0 });
	Ci.rxSubscriber = (function () {
		return typeof Symbol == 'function'
			? Symbol('rxSubscriber')
			: '@@rxSubscriber_' + Math.random();
	})();
	Ci.$$rxSubscriber = Ci.rxSubscriber;
});
var $r = E((Mn) => {
	'use strict';
	var Zg =
		(Mn && Mn.__extends) ||
		(function () {
			var r = function (e, t) {
				return (
					(r =
						Object.setPrototypeOf ||
						({ __proto__: [] } instanceof Array &&
							function (n, i) {
								n.__proto__ = i;
							}) ||
						function (n, i) {
							for (var s in i) i.hasOwnProperty(s) && (n[s] = i[s]);
						}),
					r(e, t)
				);
			};
			return function (e, t) {
				r(e, t);
				function n() {
					this.constructor = e;
				}
				e.prototype =
					t === null
						? Object.create(t)
						: ((n.prototype = t.prototype), new n());
			};
		})();
	Object.defineProperty(Mn, '__esModule', { value: !0 });
	var Jg = ml(),
		Tl = vl(),
		lC = pr(),
		fC = zo(),
		Fn = Go(),
		Vo = $o(),
		Qg = (function (r) {
			Zg(e, r);
			function e(t, n, i) {
				var s = r.call(this) || this;
				switch (
					((s.syncErrorValue = null),
					(s.syncErrorThrown = !1),
					(s.syncErrorThrowable = !1),
					(s.isStopped = !1),
					arguments.length)
				) {
					case 0:
						s.destination = Tl.empty;
						break;
					case 1:
						if (!t) {
							s.destination = Tl.empty;
							break;
						}
						if (typeof t == 'object') {
							t instanceof e
								? ((s.syncErrorThrowable = t.syncErrorThrowable),
								  (s.destination = t),
								  t.add(s))
								: ((s.syncErrorThrowable = !0), (s.destination = new Ol(s, t)));
							break;
						}
					default:
						(s.syncErrorThrowable = !0), (s.destination = new Ol(s, t, n, i));
						break;
				}
				return s;
			}
			return (
				(e.prototype[fC.rxSubscriber] = function () {
					return this;
				}),
				(e.create = function (t, n, i) {
					var s = new e(t, n, i);
					return (s.syncErrorThrowable = !1), s;
				}),
				(e.prototype.next = function (t) {
					this.isStopped || this._next(t);
				}),
				(e.prototype.error = function (t) {
					this.isStopped || ((this.isStopped = !0), this._error(t));
				}),
				(e.prototype.complete = function () {
					this.isStopped || ((this.isStopped = !0), this._complete());
				}),
				(e.prototype.unsubscribe = function () {
					this.closed ||
						((this.isStopped = !0), r.prototype.unsubscribe.call(this));
				}),
				(e.prototype._next = function (t) {
					this.destination.next(t);
				}),
				(e.prototype._error = function (t) {
					this.destination.error(t), this.unsubscribe();
				}),
				(e.prototype._complete = function () {
					this.destination.complete(), this.unsubscribe();
				}),
				(e.prototype._unsubscribeAndRecycle = function () {
					var t = this._parentOrParents;
					return (
						(this._parentOrParents = null),
						this.unsubscribe(),
						(this.closed = !1),
						(this.isStopped = !1),
						(this._parentOrParents = t),
						this
					);
				}),
				e
			);
		})(lC.Subscription);
	Mn.Subscriber = Qg;
	var Ol = (function (r) {
		Zg(e, r);
		function e(t, n, i, s) {
			var o = r.call(this) || this;
			o._parentSubscriber = t;
			var a,
				c = o;
			return (
				Jg.isFunction(n)
					? (a = n)
					: n &&
					  ((a = n.next),
					  (i = n.error),
					  (s = n.complete),
					  n !== Tl.empty &&
							((c = Object.create(n)),
							Jg.isFunction(c.unsubscribe) && o.add(c.unsubscribe.bind(c)),
							(c.unsubscribe = o.unsubscribe.bind(o)))),
				(o._context = c),
				(o._next = a),
				(o._error = i),
				(o._complete = s),
				o
			);
		}
		return (
			(e.prototype.next = function (t) {
				if (!this.isStopped && this._next) {
					var n = this._parentSubscriber;
					!Fn.config.useDeprecatedSynchronousErrorHandling ||
					!n.syncErrorThrowable
						? this.__tryOrUnsub(this._next, t)
						: this.__tryOrSetError(n, this._next, t) && this.unsubscribe();
				}
			}),
			(e.prototype.error = function (t) {
				if (!this.isStopped) {
					var n = this._parentSubscriber,
						i = Fn.config.useDeprecatedSynchronousErrorHandling;
					if (this._error)
						!i || !n.syncErrorThrowable
							? (this.__tryOrUnsub(this._error, t), this.unsubscribe())
							: (this.__tryOrSetError(n, this._error, t), this.unsubscribe());
					else if (n.syncErrorThrowable)
						i
							? ((n.syncErrorValue = t), (n.syncErrorThrown = !0))
							: Vo.hostReportError(t),
							this.unsubscribe();
					else {
						if ((this.unsubscribe(), i)) throw t;
						Vo.hostReportError(t);
					}
				}
			}),
			(e.prototype.complete = function () {
				var t = this;
				if (!this.isStopped) {
					var n = this._parentSubscriber;
					if (this._complete) {
						var i = function () {
							return t._complete.call(t._context);
						};
						!Fn.config.useDeprecatedSynchronousErrorHandling ||
						!n.syncErrorThrowable
							? (this.__tryOrUnsub(i), this.unsubscribe())
							: (this.__tryOrSetError(n, i), this.unsubscribe());
					} else this.unsubscribe();
				}
			}),
			(e.prototype.__tryOrUnsub = function (t, n) {
				try {
					t.call(this._context, n);
				} catch (i) {
					if (
						(this.unsubscribe(),
						Fn.config.useDeprecatedSynchronousErrorHandling)
					)
						throw i;
					Vo.hostReportError(i);
				}
			}),
			(e.prototype.__tryOrSetError = function (t, n, i) {
				if (!Fn.config.useDeprecatedSynchronousErrorHandling)
					throw new Error('bad call');
				try {
					n.call(this._context, i);
				} catch (s) {
					return Fn.config.useDeprecatedSynchronousErrorHandling
						? ((t.syncErrorValue = s), (t.syncErrorThrown = !0), !0)
						: (Vo.hostReportError(s), !0);
				}
				return !1;
			}),
			(e.prototype._unsubscribe = function () {
				var t = this._parentSubscriber;
				(this._context = null),
					(this._parentSubscriber = null),
					t.unsubscribe();
			}),
			e
		);
	})(Qg);
	Mn.SafeSubscriber = Ol;
});
var e_ = E((Cl) => {
	'use strict';
	Object.defineProperty(Cl, '__esModule', { value: !0 });
	var hC = $r();
	function dC(r) {
		for (; r; ) {
			var e = r,
				t = e.closed,
				n = e.destination,
				i = e.isStopped;
			if (t || i) return !1;
			n && n instanceof hC.Subscriber ? (r = n) : (r = null);
		}
		return !0;
	}
	Cl.canReportError = dC;
});
var r_ = E((Al) => {
	'use strict';
	Object.defineProperty(Al, '__esModule', { value: !0 });
	var Il = $r(),
		t_ = zo(),
		pC = vl();
	function mC(r, e, t) {
		if (r) {
			if (r instanceof Il.Subscriber) return r;
			if (r[t_.rxSubscriber]) return r[t_.rxSubscriber]();
		}
		return !r && !e && !t
			? new Il.Subscriber(pC.empty)
			: new Il.Subscriber(r, e, t);
	}
	Al.toSubscriber = mC;
});
var qn = E((Nl) => {
	'use strict';
	Object.defineProperty(Nl, '__esModule', { value: !0 });
	Nl.observable = (function () {
		return (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
	})();
});
var n_ = E((Dl) => {
	'use strict';
	Object.defineProperty(Dl, '__esModule', { value: !0 });
	function yC(r) {
		return r;
	}
	Dl.identity = yC;
});
var s_ = E((Wo) => {
	'use strict';
	Object.defineProperty(Wo, '__esModule', { value: !0 });
	var EC = n_();
	function gC() {
		for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
		return i_(r);
	}
	Wo.pipe = gC;
	function i_(r) {
		return r.length === 0
			? EC.identity
			: r.length === 1
			? r[0]
			: function (t) {
					return r.reduce(function (n, i) {
						return i(n);
					}, t);
			  };
	}
	Wo.pipeFromArray = i_;
});
var mr = E((kl) => {
	'use strict';
	Object.defineProperty(kl, '__esModule', { value: !0 });
	var _C = e_(),
		vC = r_(),
		bC = qn(),
		SC = s_(),
		Xo = Go(),
		wC = (function () {
			function r(e) {
				(this._isScalar = !1), e && (this._subscribe = e);
			}
			return (
				(r.prototype.lift = function (e) {
					var t = new r();
					return (t.source = this), (t.operator = e), t;
				}),
				(r.prototype.subscribe = function (e, t, n) {
					var i = this.operator,
						s = vC.toSubscriber(e, t, n);
					if (
						(i
							? s.add(i.call(s, this.source))
							: s.add(
									this.source ||
										(Xo.config.useDeprecatedSynchronousErrorHandling &&
											!s.syncErrorThrowable)
										? this._subscribe(s)
										: this._trySubscribe(s),
							  ),
						Xo.config.useDeprecatedSynchronousErrorHandling &&
							s.syncErrorThrowable &&
							((s.syncErrorThrowable = !1), s.syncErrorThrown))
					)
						throw s.syncErrorValue;
					return s;
				}),
				(r.prototype._trySubscribe = function (e) {
					try {
						return this._subscribe(e);
					} catch (t) {
						Xo.config.useDeprecatedSynchronousErrorHandling &&
							((e.syncErrorThrown = !0), (e.syncErrorValue = t)),
							_C.canReportError(e) ? e.error(t) : console.warn(t);
					}
				}),
				(r.prototype.forEach = function (e, t) {
					var n = this;
					return (
						(t = o_(t)),
						new t(function (i, s) {
							var o;
							o = n.subscribe(
								function (a) {
									try {
										e(a);
									} catch (c) {
										s(c), o && o.unsubscribe();
									}
								},
								s,
								i,
							);
						})
					);
				}),
				(r.prototype._subscribe = function (e) {
					var t = this.source;
					return t && t.subscribe(e);
				}),
				(r.prototype[bC.observable] = function () {
					return this;
				}),
				(r.prototype.pipe = function () {
					for (var e = [], t = 0; t < arguments.length; t++)
						e[t] = arguments[t];
					return e.length === 0 ? this : SC.pipeFromArray(e)(this);
				}),
				(r.prototype.toPromise = function (e) {
					var t = this;
					return (
						(e = o_(e)),
						new e(function (n, i) {
							var s;
							t.subscribe(
								function (o) {
									return (s = o);
								},
								function (o) {
									return i(o);
								},
								function () {
									return n(s);
								},
							);
						})
					);
				}),
				(r.create = function (e) {
					return new r(e);
				}),
				r
			);
		})();
	kl.Observable = wC;
	function o_(r) {
		if ((r || (r = Xo.config.Promise || Promise), !r))
			throw new Error('no Promise impl found');
		return r;
	}
});
var a_ = E((Ll) => {
	'use strict';
	Object.defineProperty(Ll, '__esModule', { value: !0 });
	var RC = (function () {
		function r() {
			return (
				Error.call(this),
				(this.message = 'object unsubscribed'),
				(this.name = 'ObjectUnsubscribedError'),
				this
			);
		}
		return (r.prototype = Object.create(Error.prototype)), r;
	})();
	Ll.ObjectUnsubscribedError = RC;
});
var c_ = E((Ii) => {
	'use strict';
	var xC =
		(Ii && Ii.__extends) ||
		(function () {
			var r = function (e, t) {
				return (
					(r =
						Object.setPrototypeOf ||
						({ __proto__: [] } instanceof Array &&
							function (n, i) {
								n.__proto__ = i;
							}) ||
						function (n, i) {
							for (var s in i) i.hasOwnProperty(s) && (n[s] = i[s]);
						}),
					r(e, t)
				);
			};
			return function (e, t) {
				r(e, t);
				function n() {
					this.constructor = e;
				}
				e.prototype =
					t === null
						? Object.create(t)
						: ((n.prototype = t.prototype), new n());
			};
		})();
	Object.defineProperty(Ii, '__esModule', { value: !0 });
	var TC = pr(),
		OC = (function (r) {
			xC(e, r);
			function e(t, n) {
				var i = r.call(this) || this;
				return (i.subject = t), (i.subscriber = n), (i.closed = !1), i;
			}
			return (
				(e.prototype.unsubscribe = function () {
					if (!this.closed) {
						this.closed = !0;
						var t = this.subject,
							n = t.observers;
						if (
							((this.subject = null),
							!(!n || n.length === 0 || t.isStopped || t.closed))
						) {
							var i = n.indexOf(this.subscriber);
							i !== -1 && n.splice(i, 1);
						}
					}
				}),
				e
			);
		})(TC.Subscription);
	Ii.SubjectSubscription = OC;
});
var h_ = E((Hr) => {
	'use strict';
	var Ml =
		(Hr && Hr.__extends) ||
		(function () {
			var r = function (e, t) {
				return (
					(r =
						Object.setPrototypeOf ||
						({ __proto__: [] } instanceof Array &&
							function (n, i) {
								n.__proto__ = i;
							}) ||
						function (n, i) {
							for (var s in i) i.hasOwnProperty(s) && (n[s] = i[s]);
						}),
					r(e, t)
				);
			};
			return function (e, t) {
				r(e, t);
				function n() {
					this.constructor = e;
				}
				e.prototype =
					t === null
						? Object.create(t)
						: ((n.prototype = t.prototype), new n());
			};
		})();
	Object.defineProperty(Hr, '__esModule', { value: !0 });
	var u_ = mr(),
		CC = $r(),
		Pl = pr(),
		Ai = a_(),
		IC = c_(),
		AC = zo(),
		l_ = (function (r) {
			Ml(e, r);
			function e(t) {
				var n = r.call(this, t) || this;
				return (n.destination = t), n;
			}
			return e;
		})(CC.Subscriber);
	Hr.SubjectSubscriber = l_;
	var f_ = (function (r) {
		Ml(e, r);
		function e() {
			var t = r.call(this) || this;
			return (
				(t.observers = []),
				(t.closed = !1),
				(t.isStopped = !1),
				(t.hasError = !1),
				(t.thrownError = null),
				t
			);
		}
		return (
			(e.prototype[AC.rxSubscriber] = function () {
				return new l_(this);
			}),
			(e.prototype.lift = function (t) {
				var n = new Fl(this, this);
				return (n.operator = t), n;
			}),
			(e.prototype.next = function (t) {
				if (this.closed) throw new Ai.ObjectUnsubscribedError();
				if (!this.isStopped)
					for (
						var n = this.observers, i = n.length, s = n.slice(), o = 0;
						o < i;
						o++
					)
						s[o].next(t);
			}),
			(e.prototype.error = function (t) {
				if (this.closed) throw new Ai.ObjectUnsubscribedError();
				(this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
				for (
					var n = this.observers, i = n.length, s = n.slice(), o = 0;
					o < i;
					o++
				)
					s[o].error(t);
				this.observers.length = 0;
			}),
			(e.prototype.complete = function () {
				if (this.closed) throw new Ai.ObjectUnsubscribedError();
				this.isStopped = !0;
				for (
					var t = this.observers, n = t.length, i = t.slice(), s = 0;
					s < n;
					s++
				)
					i[s].complete();
				this.observers.length = 0;
			}),
			(e.prototype.unsubscribe = function () {
				(this.isStopped = !0), (this.closed = !0), (this.observers = null);
			}),
			(e.prototype._trySubscribe = function (t) {
				if (this.closed) throw new Ai.ObjectUnsubscribedError();
				return r.prototype._trySubscribe.call(this, t);
			}),
			(e.prototype._subscribe = function (t) {
				if (this.closed) throw new Ai.ObjectUnsubscribedError();
				return this.hasError
					? (t.error(this.thrownError), Pl.Subscription.EMPTY)
					: this.isStopped
					? (t.complete(), Pl.Subscription.EMPTY)
					: (this.observers.push(t), new IC.SubjectSubscription(this, t));
			}),
			(e.prototype.asObservable = function () {
				var t = new u_.Observable();
				return (t.source = this), t;
			}),
			(e.create = function (t, n) {
				return new Fl(t, n);
			}),
			e
		);
	})(u_.Observable);
	Hr.Subject = f_;
	var Fl = (function (r) {
		Ml(e, r);
		function e(t, n) {
			var i = r.call(this) || this;
			return (i.destination = t), (i.source = n), i;
		}
		return (
			(e.prototype.next = function (t) {
				var n = this.destination;
				n && n.next && n.next(t);
			}),
			(e.prototype.error = function (t) {
				var n = this.destination;
				n && n.error && this.destination.error(t);
			}),
			(e.prototype.complete = function () {
				var t = this.destination;
				t && t.complete && this.destination.complete();
			}),
			(e.prototype._subscribe = function (t) {
				var n = this.source;
				return n ? this.source.subscribe(t) : Pl.Subscription.EMPTY;
			}),
			e
		);
	})(f_);
	Hr.AnonymousSubject = Fl;
});
function kC(r, e, t) {
	let n = Yr();
	return new Nn(r, t, e, n);
}
function LC(r, e, t) {
	let n = JSON.stringify(r.map((i) => ({ taskId: i.taskId, hash: i.hash })));
	M && Ko.note({ title: `Executed tasks with hashes: ${n}` }),
		(0, d_.writeFileSync)(p_.join(e, `tasks-hashes-${t}`), n);
}
function PC(r, e, t) {
	r.filter((i) => i.cacheStatus === 'local-cache-hit')
		.map((i) => i.hash)
		.forEach((i) => e.store(i, t));
}
async function ql({
	daemon: r,
	options: e,
	fileStorage: t,
	remoteCache: n,
	api: i,
	outputObfuscator: s,
	runStartTime: o,
	messages: a,
	endOfRunMessage: c,
	taskExecutions: l,
	versionOfNxBefore133: u,
	inner: f,
	encryptionKey: h,
	storeInCurrentProcess: d,
	distributedExecutionId: y,
	runContext: b,
}) {
	let p = new Date().toISOString(),
		w = Re(),
		k = {
			command: s.obfuscate(Ki()),
			startTime: o,
			endTime: p,
			distributedExecutionId: y,
			branch: w,
			runGroup: Fe(),
			sha: w ? tt() : void 0,
			inner: f,
		},
		T = {
			branch: w,
			runGroup: Fe(),
			ciExecutionId: je(),
			ciExecutionEnv: we(),
		};
	if (d) {
		lt(y) && (LC(l, Yo, y), PC(l, n, Yo));
		try {
			await n.waitForStoreRequestsToComplete();
		} catch {
			return (
				Ko.error({ title: "Nx Cloud wasn't able to store artifacts." }),
				a.printMessages(),
				!1
			);
		}
		for (let A of t.storedHashes) {
			let P = l.find((I) => I.hash === A);
			if (!P) throw new Error(`Task with hash ${A} isn't recorded`);
			P.uploadedToStorage = !0;
		}
		try {
			await i.endRun(k, l, T);
		} catch {
			return (
				Ko.error({ title: "Nx Cloud wasn't able to record its run." }),
				a.printMessages(),
				!1
			);
		}
		await rn(e);
	} else
		try {
			let A = Nt ? Nt : e.accessToken,
				P = To(),
				I = require.resolve('./lib/daemon/process-run-end');
			await r.processInBackground(I, {
				encryptionKey: h,
				runnerOptions: { ...e, accessToken: A },
				delayedStoreRequests: n.delayedStoreRequests,
				ciExecutionContext: T,
				runEnd: { runData: k, taskExecutions: l, linkId: P },
				lightRunnerResolutionPaths: zn,
			}),
				(b.runUrl = `${ps(e.url || 'https://nx.app')}/runs/${P}`);
		} catch (A) {
			return (
				Ko.warn({
					title: 'Nx Cloud Problems',
					bodyLines: [A.message || A.toString()],
				}),
				!1
			);
		}
	return (
		u
			? setTimeout(() => {
					a.printMessages(), !a.anyErrors && !f && c.printCacheHitsMessage();
			  }, 0)
			: (a.printMessages(), !a.anyErrors && !f && c.printCacheHitsMessage()),
		!0
	);
}
function FC(r, e, t, n) {
	let i = new So(r, Yo, !0, e.cacheableOperations || [], t, n);
	try {
		let { CompositeLifeCycle: s } = pt();
		return s ? new s([e.lifeCycle, i]) : i;
	} catch {
		return i;
	}
}
async function MC(r, e, t, n, i) {
	if (n.skipNxCache) return;
	let s = t.map((c) => c.hash).filter((c) => !!c),
		o = await Promise.all(
			s.map((c) => {
				let l = (0, m_.join)(Yo, `${c}.commit`);
				return DC(l);
			}),
		),
		a = [];
	for (let c = 0; c < o.length; ++c) o[c] || a.push(s[c]);
	if (a.length > 0) {
		let c = r.startRun(i, a);
		for (let l of a) e.requests[l] = c;
	}
}
function Ni(r, e, t, n = !1) {
	var P;
	let i = process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_ID,
		s = { statuses: {}, scheduledTasks: [], requests: {}, allTasks: r },
		o = e.lifeCycle === void 0,
		a = [],
		c = new In(e),
		l = kC(c, e, s),
		u = new _o(s, a, i),
		f = new lr(e.maskedProperties),
		h = new Date().toISOString(),
		d = FC(s, e, f, a),
		y = Sr || e.encryptionKey,
		b = new Yt(y),
		p = new Kt(e),
		w = lt(i) || !((P = t.daemon) != null && P.enabled()),
		k = new ur(b, p, e, 'cloud-enabled-runner'),
		T = new wo(c, l, s, k, i, w);
	MC(l, s, r, e, i), delete process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_ID;
	let A = NC(r, { ...e, remoteCache: T, lifeCycle: d }, t);
	if (A.subscribe) {
		let { Subject: I } = h_(),
			z = new I();
		return (
			A.subscribe({
				next: (G) => z.next(G),
				error: (G) => z.error(G),
				complete: async () => {
					!(await ql({
						daemon: t.daemon,
						options: e,
						fileStorage: k,
						remoteCache: T,
						api: l,
						outputObfuscator: f,
						runStartTime: h,
						messages: c,
						endOfRunMessage: u,
						taskExecutions: a,
						versionOfNxBefore133: o,
						inner: n,
						encryptionKey: y,
						storeInCurrentProcess: w,
						runContext: s,
						distributedExecutionId: i,
					})) &&
						lt(i) &&
						process.exit(Vt),
						z.complete();
				},
			}),
			z
		);
	} else
		return A.then(
			async (I) => (
				!(await ql({
					daemon: t.daemon,
					options: e,
					fileStorage: k,
					remoteCache: T,
					api: l,
					outputObfuscator: f,
					runStartTime: h,
					messages: c,
					endOfRunMessage: u,
					taskExecutions: a,
					versionOfNxBefore133: o,
					inner: n,
					encryptionKey: y,
					storeInCurrentProcess: w,
					runContext: s,
					distributedExecutionId: i,
				})) &&
					lt(i) &&
					process.exit(Vt),
				I
			),
		).catch(async (I) => {
			throw (
				(!(await ql({
					daemon: t.daemon,
					options: e,
					fileStorage: k,
					remoteCache: T,
					api: l,
					outputObfuscator: f,
					runStartTime: h,
					messages: c,
					endOfRunMessage: u,
					taskExecutions: a,
					versionOfNxBefore133: o,
					inner: n,
					encryptionKey: y,
					storeInCurrentProcess: w,
					runContext: s,
					distributedExecutionId: i,
				})) &&
					lt(i) &&
					process.exit(Vt),
				I)
			);
		});
}
var d_,
	p_,
	m_,
	Ko,
	NC,
	Yo,
	DC,
	y_ = B(() => {
		'use strict';
		(d_ = require('fs')), (p_ = Wr(require('path'))), (m_ = require('path'));
		oe();
		Xr();
		Dt();
		Ja();
		ms();
		ys();
		go();
		Fy();
		Nu();
		vo();
		By();
		jy();
		Bu();
		ju();
		({ output: Ko } = J()),
			({ tasksRunner: NC, cacheDirectory: Yo } = pt()),
			({ pathExists: DC } = jo());
	});
function v_() {
	qC(g_), UC(__, 'true');
}
function b_(r) {
	if (r === !0) return !0;
	if (r === !1) return !1;
	let e = process.env.NX_CLOUD_DISTRIBUTED_EXECUTION;
	if (e === 'false' || e === 'FALSE' || e === '0') return !1;
	if (e === 'true' || e === 'TRUE' || e === '1') return !0;
	try {
		return (0, E_.readFileSync)(__), !0;
	} catch {
		return !1;
	}
}
var E_,
	Ul,
	qC,
	UC,
	BC,
	g_,
	__,
	Bl = B(() => {
		'use strict';
		(E_ = require('fs')),
			(Ul = require('path')),
			({ ensureDirSync: qC, writeFileSync: UC } = jo()),
			(BC = process.env.NX_CACHE_DIRECTORY
				? [process.env.NX_CACHE_DIRECTORY]
				: ['node_modules', '.cache', 'nx']),
			(g_ = (0, Ul.join)(process.cwd(), ...BC)),
			(__ = (0, Ul.join)(g_, 'NX_CLOUD_DISTRIBUTED_EXECUTION'));
	});
async function Di(r) {
	let e = Te(r);
	return await ce(() => e.get('/nx-cloud/executions/workspace-status'));
}
var jl = B(() => {
	'use strict';
	_t();
});
var S_ = E((Gl) => {
	'use strict';
	Object.defineProperty(Gl, '__esModule', { value: !0 });
	Gl.subscribeToArray = function (r) {
		return function (e) {
			for (var t = 0, n = r.length; t < n && !e.closed; t++) e.next(r[t]);
			e.complete();
		};
	};
});
var w_ = E(($l) => {
	'use strict';
	Object.defineProperty($l, '__esModule', { value: !0 });
	var jC = $o();
	$l.subscribeToPromise = function (r) {
		return function (e) {
			return (
				r
					.then(
						function (t) {
							e.closed || (e.next(t), e.complete());
						},
						function (t) {
							return e.error(t);
						},
					)
					.then(null, jC.hostReportError),
				e
			);
		};
	};
});
var ki = E((Un) => {
	'use strict';
	Object.defineProperty(Un, '__esModule', { value: !0 });
	function R_() {
		return typeof Symbol != 'function' || !Symbol.iterator
			? '@@iterator'
			: Symbol.iterator;
	}
	Un.getSymbolIterator = R_;
	Un.iterator = R_();
	Un.$$iterator = Un.iterator;
});
var x_ = E((Hl) => {
	'use strict';
	Object.defineProperty(Hl, '__esModule', { value: !0 });
	var GC = ki();
	Hl.subscribeToIterable = function (r) {
		return function (e) {
			var t = r[GC.iterator]();
			do {
				var n = t.next();
				if (n.done) {
					e.complete();
					break;
				}
				if ((e.next(n.value), e.closed)) break;
			} while (!0);
			return (
				typeof t.return == 'function' &&
					e.add(function () {
						t.return && t.return();
					}),
				e
			);
		};
	};
});
var T_ = E((zl) => {
	'use strict';
	Object.defineProperty(zl, '__esModule', { value: !0 });
	var $C = qn();
	zl.subscribeToObservable = function (r) {
		return function (e) {
			var t = r[$C.observable]();
			if (typeof t.subscribe != 'function')
				throw new TypeError(
					'Provided object does not correctly implement Symbol.observable',
				);
			return t.subscribe(e);
		};
	};
});
var Wl = E((Vl) => {
	'use strict';
	Object.defineProperty(Vl, '__esModule', { value: !0 });
	Vl.isArrayLike = function (r) {
		return r && typeof r.length == 'number' && typeof r != 'function';
	};
});
var Kl = E((Xl) => {
	'use strict';
	Object.defineProperty(Xl, '__esModule', { value: !0 });
	function HC(r) {
		return (
			!!r && typeof r.subscribe != 'function' && typeof r.then == 'function'
		);
	}
	Xl.isPromise = HC;
});
var Jl = E((Yl) => {
	'use strict';
	Object.defineProperty(Yl, '__esModule', { value: !0 });
	var zC = S_(),
		VC = w_(),
		WC = x_(),
		XC = T_(),
		KC = Wl(),
		YC = Kl(),
		JC = wl(),
		ZC = ki(),
		QC = qn();
	Yl.subscribeTo = function (r) {
		if (r && typeof r[QC.observable] == 'function')
			return XC.subscribeToObservable(r);
		if (KC.isArrayLike(r)) return zC.subscribeToArray(r);
		if (YC.isPromise(r)) return VC.subscribeToPromise(r);
		if (r && typeof r[ZC.iterator] == 'function')
			return WC.subscribeToIterable(r);
		var e = JC.isObject(r) ? 'an invalid object' : "'" + r + "'",
			t =
				'You provided ' +
				e +
				' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.';
		throw new TypeError(t);
	};
});
var O_ = E((Zl) => {
	'use strict';
	Object.defineProperty(Zl, '__esModule', { value: !0 });
	var e0 = mr(),
		t0 = pr(),
		r0 = qn();
	function n0(r, e) {
		return new e0.Observable(function (t) {
			var n = new t0.Subscription();
			return (
				n.add(
					e.schedule(function () {
						var i = r[r0.observable]();
						n.add(
							i.subscribe({
								next: function (s) {
									n.add(
										e.schedule(function () {
											return t.next(s);
										}),
									);
								},
								error: function (s) {
									n.add(
										e.schedule(function () {
											return t.error(s);
										}),
									);
								},
								complete: function () {
									n.add(
										e.schedule(function () {
											return t.complete();
										}),
									);
								},
							}),
						);
					}),
				),
				n
			);
		});
	}
	Zl.scheduleObservable = n0;
});
var C_ = E((Ql) => {
	'use strict';
	Object.defineProperty(Ql, '__esModule', { value: !0 });
	var i0 = mr(),
		s0 = pr();
	function o0(r, e) {
		return new i0.Observable(function (t) {
			var n = new s0.Subscription();
			return (
				n.add(
					e.schedule(function () {
						return r.then(
							function (i) {
								n.add(
									e.schedule(function () {
										t.next(i),
											n.add(
												e.schedule(function () {
													return t.complete();
												}),
											);
									}),
								);
							},
							function (i) {
								n.add(
									e.schedule(function () {
										return t.error(i);
									}),
								);
							},
						);
					}),
				),
				n
			);
		});
	}
	Ql.schedulePromise = o0;
});
var I_ = E((ef) => {
	'use strict';
	Object.defineProperty(ef, '__esModule', { value: !0 });
	var a0 = mr(),
		c0 = pr();
	function u0(r, e) {
		return new a0.Observable(function (t) {
			var n = new c0.Subscription(),
				i = 0;
			return (
				n.add(
					e.schedule(function () {
						if (i === r.length) {
							t.complete();
							return;
						}
						t.next(r[i++]), t.closed || n.add(this.schedule());
					}),
				),
				n
			);
		});
	}
	ef.scheduleArray = u0;
});
var A_ = E((tf) => {
	'use strict';
	Object.defineProperty(tf, '__esModule', { value: !0 });
	var l0 = mr(),
		f0 = pr(),
		h0 = ki();
	function d0(r, e) {
		if (!r) throw new Error('Iterable cannot be null');
		return new l0.Observable(function (t) {
			var n = new f0.Subscription(),
				i;
			return (
				n.add(function () {
					i && typeof i.return == 'function' && i.return();
				}),
				n.add(
					e.schedule(function () {
						(i = r[h0.iterator]()),
							n.add(
								e.schedule(function () {
									if (!t.closed) {
										var s, o;
										try {
											var a = i.next();
											(s = a.value), (o = a.done);
										} catch (c) {
											t.error(c);
											return;
										}
										o ? t.complete() : (t.next(s), this.schedule());
									}
								}),
							);
					}),
				),
				n
			);
		});
	}
	tf.scheduleIterable = d0;
});
var N_ = E((rf) => {
	'use strict';
	Object.defineProperty(rf, '__esModule', { value: !0 });
	var p0 = qn();
	function m0(r) {
		return r && typeof r[p0.observable] == 'function';
	}
	rf.isInteropObservable = m0;
});
var D_ = E((nf) => {
	'use strict';
	Object.defineProperty(nf, '__esModule', { value: !0 });
	var y0 = ki();
	function E0(r) {
		return r && typeof r[y0.iterator] == 'function';
	}
	nf.isIterable = E0;
});
var k_ = E((sf) => {
	'use strict';
	Object.defineProperty(sf, '__esModule', { value: !0 });
	var g0 = O_(),
		_0 = C_(),
		v0 = I_(),
		b0 = A_(),
		S0 = N_(),
		w0 = Kl(),
		R0 = Wl(),
		x0 = D_();
	function T0(r, e) {
		if (r != null) {
			if (S0.isInteropObservable(r)) return g0.scheduleObservable(r, e);
			if (w0.isPromise(r)) return _0.schedulePromise(r, e);
			if (R0.isArrayLike(r)) return v0.scheduleArray(r, e);
			if (x0.isIterable(r) || typeof r == 'string')
				return b0.scheduleIterable(r, e);
		}
		throw new TypeError(((r !== null && typeof r) || r) + ' is not observable');
	}
	sf.scheduled = T0;
});
var af = E((of) => {
	'use strict';
	Object.defineProperty(of, '__esModule', { value: !0 });
	var L_ = mr(),
		O0 = Jl(),
		C0 = k_();
	function I0(r, e) {
		return e
			? C0.scheduled(r, e)
			: r instanceof L_.Observable
			? r
			: new L_.Observable(O0.subscribeTo(r));
	}
	of.from = I0;
});
var P_ = E((Li) => {
	'use strict';
	var A0 =
		(Li && Li.__extends) ||
		(function () {
			var r = function (e, t) {
				return (
					(r =
						Object.setPrototypeOf ||
						({ __proto__: [] } instanceof Array &&
							function (n, i) {
								n.__proto__ = i;
							}) ||
						function (n, i) {
							for (var s in i) i.hasOwnProperty(s) && (n[s] = i[s]);
						}),
					r(e, t)
				);
			};
			return function (e, t) {
				r(e, t);
				function n() {
					this.constructor = e;
				}
				e.prototype =
					t === null
						? Object.create(t)
						: ((n.prototype = t.prototype), new n());
			};
		})();
	Object.defineProperty(Li, '__esModule', { value: !0 });
	var N0 = $r(),
		D0 = (function (r) {
			A0(e, r);
			function e() {
				return (r !== null && r.apply(this, arguments)) || this;
			}
			return (
				(e.prototype.notifyNext = function (t, n, i, s, o) {
					this.destination.next(n);
				}),
				(e.prototype.notifyError = function (t, n) {
					this.destination.error(t);
				}),
				(e.prototype.notifyComplete = function (t) {
					this.destination.complete();
				}),
				e
			);
		})(N0.Subscriber);
	Li.OuterSubscriber = D0;
});
var cf = E((Pi) => {
	'use strict';
	var k0 =
		(Pi && Pi.__extends) ||
		(function () {
			var r = function (e, t) {
				return (
					(r =
						Object.setPrototypeOf ||
						({ __proto__: [] } instanceof Array &&
							function (n, i) {
								n.__proto__ = i;
							}) ||
						function (n, i) {
							for (var s in i) i.hasOwnProperty(s) && (n[s] = i[s]);
						}),
					r(e, t)
				);
			};
			return function (e, t) {
				r(e, t);
				function n() {
					this.constructor = e;
				}
				e.prototype =
					t === null
						? Object.create(t)
						: ((n.prototype = t.prototype), new n());
			};
		})();
	Object.defineProperty(Pi, '__esModule', { value: !0 });
	var L0 = $r(),
		P0 = (function (r) {
			k0(e, r);
			function e(t, n, i) {
				var s = r.call(this) || this;
				return (
					(s.parent = t),
					(s.outerValue = n),
					(s.outerIndex = i),
					(s.index = 0),
					s
				);
			}
			return (
				(e.prototype._next = function (t) {
					this.parent.notifyNext(
						this.outerValue,
						t,
						this.outerIndex,
						this.index++,
						this,
					);
				}),
				(e.prototype._error = function (t) {
					this.parent.notifyError(t, this), this.unsubscribe();
				}),
				(e.prototype._complete = function () {
					this.parent.notifyComplete(this), this.unsubscribe();
				}),
				e
			);
		})(L0.Subscriber);
	Pi.InnerSubscriber = P0;
});
var F_ = E((uf) => {
	'use strict';
	Object.defineProperty(uf, '__esModule', { value: !0 });
	var F0 = cf(),
		M0 = Jl(),
		q0 = mr();
	function U0(r, e, t, n, i) {
		if ((i === void 0 && (i = new F0.InnerSubscriber(r, t, n)), !i.closed))
			return e instanceof q0.Observable ? e.subscribe(i) : M0.subscribeTo(e)(i);
	}
	uf.subscribeToResult = U0;
});
var q_ = E((Bn) => {
	'use strict';
	var B0 =
		(Bn && Bn.__extends) ||
		(function () {
			var r = function (e, t) {
				return (
					(r =
						Object.setPrototypeOf ||
						({ __proto__: [] } instanceof Array &&
							function (n, i) {
								n.__proto__ = i;
							}) ||
						function (n, i) {
							for (var s in i) i.hasOwnProperty(s) && (n[s] = i[s]);
						}),
					r(e, t)
				);
			};
			return function (e, t) {
				r(e, t);
				function n() {
					this.constructor = e;
				}
				e.prototype =
					t === null
						? Object.create(t)
						: ((n.prototype = t.prototype), new n());
			};
		})();
	Object.defineProperty(Bn, '__esModule', { value: !0 });
	var j0 = $r();
	function G0(r, e) {
		return function (n) {
			if (typeof r != 'function')
				throw new TypeError(
					'argument is not a function. Are you looking for `mapTo()`?',
				);
			return n.lift(new M_(r, e));
		};
	}
	Bn.map = G0;
	var M_ = (function () {
		function r(e, t) {
			(this.project = e), (this.thisArg = t);
		}
		return (
			(r.prototype.call = function (e, t) {
				return t.subscribe(new $0(e, this.project, this.thisArg));
			}),
			r
		);
	})();
	Bn.MapOperator = M_;
	var $0 = (function (r) {
		B0(e, r);
		function e(t, n, i) {
			var s = r.call(this, t) || this;
			return (s.project = n), (s.count = 0), (s.thisArg = i || s), s;
		}
		return (
			(e.prototype._next = function (t) {
				var n;
				try {
					n = this.project.call(this.thisArg, t, this.count++);
				} catch (i) {
					this.destination.error(i);
					return;
				}
				this.destination.next(n);
			}),
			e
		);
	})(j0.Subscriber);
});
var B_ = E((Fi) => {
	'use strict';
	var H0 =
		(Fi && Fi.__extends) ||
		(function () {
			var r = function (e, t) {
				return (
					(r =
						Object.setPrototypeOf ||
						({ __proto__: [] } instanceof Array &&
							function (n, i) {
								n.__proto__ = i;
							}) ||
						function (n, i) {
							for (var s in i) i.hasOwnProperty(s) && (n[s] = i[s]);
						}),
					r(e, t)
				);
			};
			return function (e, t) {
				r(e, t);
				function n() {
					this.constructor = e;
				}
				e.prototype =
					t === null
						? Object.create(t)
						: ((n.prototype = t.prototype), new n());
			};
		})();
	Object.defineProperty(Fi, '__esModule', { value: !0 });
	var z0 = P_(),
		V0 = cf(),
		W0 = F_(),
		X0 = q_(),
		K0 = af();
	function U_(r, e) {
		return typeof e == 'function'
			? function (t) {
					return t.pipe(
						U_(function (n, i) {
							return K0.from(r(n, i)).pipe(
								X0.map(function (s, o) {
									return e(n, s, i, o);
								}),
							);
						}),
					);
			  }
			: function (t) {
					return t.lift(new Y0(r));
			  };
	}
	Fi.switchMap = U_;
	var Y0 = (function () {
			function r(e) {
				this.project = e;
			}
			return (
				(r.prototype.call = function (e, t) {
					return t.subscribe(new J0(e, this.project));
				}),
				r
			);
		})(),
		J0 = (function (r) {
			H0(e, r);
			function e(t, n) {
				var i = r.call(this, t) || this;
				return (i.project = n), (i.index = 0), i;
			}
			return (
				(e.prototype._next = function (t) {
					var n,
						i = this.index++;
					try {
						n = this.project(t, i);
					} catch (s) {
						this.destination.error(s);
						return;
					}
					this._innerSub(n, t, i);
				}),
				(e.prototype._innerSub = function (t, n, i) {
					var s = this.innerSubscription;
					s && s.unsubscribe();
					var o = new V0.InnerSubscriber(this, n, i),
						a = this.destination;
					a.add(o),
						(this.innerSubscription = W0.subscribeToResult(
							this,
							t,
							void 0,
							void 0,
							o,
						)),
						this.innerSubscription !== o && a.add(this.innerSubscription);
				}),
				(e.prototype._complete = function () {
					var t = this.innerSubscription;
					(!t || t.closed) && r.prototype._complete.call(this),
						this.unsubscribe();
				}),
				(e.prototype._unsubscribe = function () {
					this.innerSubscription = null;
				}),
				(e.prototype.notifyComplete = function (t) {
					var n = this.destination;
					n.remove(t),
						(this.innerSubscription = null),
						this.isStopped && r.prototype._complete.call(this);
				}),
				(e.prototype.notifyNext = function (t, n, i, s, o) {
					this.destination.next(n);
				}),
				e
			);
		})(z0.OuterSubscriber);
});
var lf,
	Z0,
	Q0,
	eI,
	j_,
	tI,
	jn,
	ff = B(() => {
		'use strict';
		lf = require('path');
		oe();
		({ readFile: Z0, copy: Q0, mkdirSync: eI } = jo()),
			({ output: j_, workspaceRoot: tI } = J()),
			(jn = class {
				constructor(e, t) {
					this.fileStorage = e;
					this.cacheDirectory = t;
					eI(t, { recursive: !0 });
				}
				async retrieveAndExtract(e, t) {
					M && j_.note({ title: `Retrieving artifacts from ${t}` }),
						await this.fileStorage.retrieve(e, t, this.cacheDirectory),
						M && j_.note({ title: 'Extracting artifacts' });
					let n = (0, lf.join)(this.cacheDirectory, e, 'outputs');
					return (
						await Q0(n, tI),
						(
							await Z0((0, lf.join)(this.cacheDirectory, e, 'terminalOutput'))
						).toString()
					);
				}
			});
	});
function yr(r, e) {
	return !!r || !!e;
}
function Er() {
	rI.error({
		title: 'Unable to determine the context for running Nx in CI',
		bodyLines: [
			"- Nx tried to determine the context automatically but wasn't able to do it.",
			'- Use the NX_CI_EXECUTION_ID env variable to set it manually.',
			'- NX_CI_EXECUTION_ID must be a unique value for every CI execution/run.',
		],
	});
}
var rI,
	Mi = B(() => {
		'use strict';
		({ output: rI } = J());
	});
function G_(r, e, t, n, i, s, o) {
	let a = i.map((l) =>
			l.map((u) => ({
				taskId: u.id,
				hash: u.hash,
				projectName: u.target.project,
				target: u.target.target,
				configuration: u.target.configuration || null,
				params: An(u),
				projectRoot: u.projectRoot,
			})),
		),
		c = {
			command: Ki(),
			branch: r,
			runGroup: e,
			ciExecutionId: t,
			ciExecutionEnv: n,
			tasks: a,
			maxParallel: nI(s),
			commitSha: o,
		};
	return pa && (c.agentCount = pa), ah || (c.stopAgentsOnFailure = !1), c;
}
function nI(r) {
	return r.parallel === 'false' || r.parallel === !1
		? 1
		: r.parallel === 'true' || r.parallel === !0
		? Number(r.maxParallel || 3)
		: r.parallel === void 0
		? r.maxParallel
			? Number(r.maxParallel)
			: 3
		: Number(r.parallel) || 3;
}
var hf,
	Gn,
	df = B(() => {
		'use strict';
		_t();
		oe();
		Ro();
		Dt();
		bi();
		({ output: hf } = J()),
			(Gn = class {
				constructor(e) {
					this.apiAxiosInstance = Te(e, 6e4);
				}
				async start(e) {
					var i;
					let t = Oe('dteStart'),
						n;
					M &&
						hf.note({
							title: 'Starting a distributed execution',
							bodyLines: [JSON.stringify(e, null, 2)],
						});
					try {
						(n = await ce(() =>
							this.apiAxiosInstance.post('/nx-cloud/executions/start', e),
						)),
							t.recordMetric(re(n));
					} catch (s) {
						throw (
							(t.recordMetric(
								(i = s == null ? void 0 : s.axiosException) != null &&
									i.response
									? re(s.axiosException.response)
									: Ce,
							),
							s)
						);
					}
					if (!n.data.enabled)
						throw new Error(
							'Workspace is disabled. Cannot perform distributed task executions.',
						);
					if (n.data.error) throw new Error(n.data.error);
					return n.data.id;
				}
				async status(e, t) {
					var i;
					let n = Oe('dteStatus');
					try {
						let s = await ce(() =>
							this.apiAxiosInstance.post('/nx-cloud/executions/status', {
								id: e,
								prevUpdatedAt: t,
							}),
						);
						return n.recordMetric(re(s)), s.data;
					} catch (s) {
						n.recordMetric(
							(i = s == null ? void 0 : s.axiosException) != null && i.response
								? re(s.axiosException.response)
								: Ce,
						),
							hf.error({ title: s.message }),
							process.exit(1);
					}
				}
				async completeRunGroupWithError(e, t, n, i, s) {
					var a;
					let o = Oe('completeRunGroup');
					M &&
						hf.note({
							title: 'Completing with an error',
							bodyLines: [
								`ciExecutionId: ${n}`,
								`ciExecutionEnv: ${i}`,
								`runGroup: ${t}`,
								`error: ${s}`,
							],
						});
					try {
						let c = await ce(
							() =>
								this.apiAxiosInstance.post(
									'/nx-cloud/executions/complete-run-group',
									{
										branch: e,
										runGroup: t,
										ciExecutionId: n,
										ciExecutionEnv: i,
										criticalErrorMessage: s,
										vcsContext: fr(),
									},
								),
							3,
						);
						o.recordMetric(re(c));
					} catch (c) {
						o.recordMetric(
							(a = c == null ? void 0 : c.axiosException) != null && a.response
								? re(c.axiosException.response)
								: Ce,
						);
					}
				}
			});
	});
function Jo(r) {
	let e = new Object(),
		t;
	return (n) => {
		e !== n
			? ((e = n), (t = new Date()))
			: new Date().getTime() - t.getTime() > r.timeout &&
			  (iI.error({ title: r.title }), process.exit(1));
	};
}
var iI,
	pf = B(() => {
		'use strict';
		({ output: iI } = J());
	});
async function $_(r, e, t) {
	M && mf.note({ title: `Processing task ${t.taskId}` });
	let n = e.find((s) => t.taskId === s.id);
	if (!n) throw new Error(`Found unknown task: ${t.taskId}`);
	let i = await r.retrieveAndExtract(t.hash, t.url);
	mf.logCommand(sI(n)), process.stdout.write(i), mf.addVerticalSeparator();
}
function sI(r) {
	let e = r.target.configuration ? `:${r.target.configuration}` : '';
	return [
		'nx',
		'run',
		`${r.target.project}:${r.target.target}${e}`,
		An(r),
	].join(' ');
}
var mf,
	H_ = B(() => {
		'use strict';
		oe();
		bi();
		({ output: mf } = J());
	});
async function z_(r, e, t, n) {
	let i = null,
		s = {},
		o = Jo({
			title: `No new completed tasks after ${da / 1e3} seconds.`,
			timeout: da,
		});
	for (await rt(1e3); ; ) {
		M && yf.note({ title: 'Waiting...' });
		let a = await r.status(t, i);
		M &&
			yf.note({
				title: 'Status update',
				bodyLines: [
					`executionId: ${t}`,
					`executionStatus: ${a.executionStatus}`,
					`number of completed tasks: ${a.completedTasks.length}`,
					`error: ${a.criticalErrorMessage}`,
				],
			}),
			a.criticalErrorMessage &&
				(yf.error({
					title: 'Distributed Execution Terminated',
					bodyLines: ['Error:', a.criticalErrorMessage],
				}),
				process.exit(1)),
			a.updatedAt || (await rt(5e3)),
			(i = a.updatedAt),
			o(a.completedTasks.length);
		for (let c of a.completedTasks)
			s[c.taskId] || (await $_(e, n, c), (s[c.taskId] = !0));
		if (a.executionStatus === 'COMPLETED')
			return { commandStatus: a.commandStatus, runUrl: a.runUrl };
	}
}
var yf,
	V_ = B(() => {
		'use strict';
		pf();
		oe();
		Yn();
		H_();
		({ output: yf } = J());
	});
function W_(r) {
	let e = [],
		t = new Set(Object.values(r.tasks).map((i) => i.id)),
		n = 0;
	for (; t.size > 0; ) {
		let i = (e[n] = []);
		for (let s of t) {
			let o = !0;
			for (let c of r.dependencies[s])
				if (t.has(c)) {
					o = !1;
					break;
				}
			if (!o) continue;
			let a = r.tasks[s];
			i.push(a);
		}
		for (let s of i) t.delete(s.id);
		n++;
	}
	return e;
}
var X_ = B(() => {
	'use strict';
});
function Y_(r, e, t) {
	let n = JSON.parse(cI((0, K_.readFileSync)(`${oI}/nx.json`).toString()));
	return new Ef(e, uI(n, r)).createTaskGraph(t);
}
function uI(r, e) {
	let t = r.targetDependencies ?? {},
		n = e ? e.strictlyOrderedTargets ?? ['build'] : [];
	for (let i of n)
		(t[i] = t[i] || []), t[i].push({ target: i, projects: 'dependencies' });
	return t;
}
var K_,
	oI,
	aI,
	cI,
	Ef,
	J_ = B(() => {
		'use strict';
		(K_ = require('fs')),
			({ workspaceRoot: oI } = J()),
			({ getDependencyConfigs: aI } = pt()),
			(cI = zi());
		Ef = class {
			constructor(e, t) {
				this.projectGraph = e;
				this.defaultTargetDependencies = t;
			}
			createTaskGraph(e) {
				let t = { roots: [], tasks: {}, dependencies: {} };
				for (let n of e) {
					this.addTaskToGraph(n, t);
					let i = aI(
						n.target,
						this.defaultTargetDependencies,
						this.projectGraph,
					);
					i && this.addTaskDependencies(n, i, e, t);
				}
				return (
					(t.roots = Object.keys(t.dependencies).filter(
						(n) => t.dependencies[n].length === 0,
					)),
					t
				);
			}
			addTaskDependencies(e, t, n, i) {
				for (let s of t)
					if (s.projects === 'self')
						for (let o of n)
							o.target.project === e.target.project &&
								o.target.target === s.target &&
								i.dependencies[e.id].push(o.id);
					else if (s.projects === 'dependencies') {
						let o = new Set();
						this.addDependencies(e.target.project, s.target, n, i, e.id, o);
					}
			}
			addDependencies(e, t, n, i, s, o) {
				o.add(e);
				let a = this.projectGraph.dependencies[e];
				if (a) {
					let c = a.map((l) => l.target);
					for (let l of c) {
						if (o.has(l)) continue;
						let u = this.findTask({ project: l, target: t }, n);
						u
							? i.dependencies[s].indexOf(u.id) === -1 &&
							  i.dependencies[s].push(u.id)
							: this.addDependencies(l, t, n, i, s, o);
					}
				}
			}
			findTask({ project: e, target: t }, n) {
				return n.find((i) => i.target.project === e && i.target.target === t);
			}
			addTaskToGraph(e, t) {
				(t.tasks[e.id] = e), (t.dependencies[e.id] = []);
			}
		};
	});
var _f = {};
At(_f, { nxCloudDistributedTasksRunner: () => fI });
function hI(r, e, t) {
	return r.taskGraph ? r.taskGraph : Y_(t, r.projectGraph, e);
}
function dI(r, e, t, n, i) {
	process.on('SIGINT', async () => {
		await r.completeRunGroupWithError(
			e,
			t,
			n,
			i,
			'Main job was terminated via SIGINT',
		),
			process.exit(1);
	}),
		process.on('SIGTERM', async () => {
			await r.completeRunGroupWithError(
				e,
				t,
				n,
				i,
				'Main job was terminated via SIGTERM',
			),
				process.exit(1);
		});
}
async function pI(r, e, t, n, i, s, o, a, c, l) {
	let u = await r.start(G_(n, i, s, o, W_(a), e, c));
	return await z_(r, t, u, Object.values(a.tasks));
}
var qi,
	lI,
	gf,
	fI,
	vf = B(() => {
		'use strict';
		ff();
		oe();
		Dt();
		ms();
		Mi();
		ys();
		go();
		df();
		V_();
		X_();
		J_();
		({ output: qi } = J()),
			({ cacheDirectory: lI } = pt()),
			(gf = class {
				scheduleTask(e) {}
				startTask(e) {}
				endTasks(e) {}
			}),
			(fI = async (r, e, t) => {
				e.skipNxCache &&
					qi.warn({
						title:
							'--skip-nx-cache is ignored when using distributed tasks execution (DTE).',
						bodyLine: ['DTE needs the cache to share files between agents.'],
					}),
					M && qi.note({ title: 'Starting distributed command execution' }),
					(e.lifeCycle = new gf());
				let n = Re(),
					i = Fe(),
					s = je(),
					o = we(),
					a = tt(),
					c = Xi();
				yr(i, s) || (Er(), process.exit(1));
				let l = new Yt(Sr || e.encryptionKey),
					u = new Kt(e),
					f = new jn(new ur(l, u, e, 'dte-main'), lI),
					h = new Gn(e);
				dI(h, n, i, s, o);
				try {
					let d = hI(t, r, e),
						y = await pI(h, e, f, n, i, s, o, d, a, c);
					y.commandStatus === 0
						? qi.success({
								title: 'Successfully completed running the command.',
								bodyLines: [`See run details at ${y.runUrl}`],
						  })
						: qi.error({
								title: 'Command execution failed.',
								bodyLines: [`See run details at ${y.runUrl}`],
						  }),
						await rn(e),
						process.exit(y.commandStatus);
				} catch (d) {
					qi.error({
						title: 'Unable to complete a run.',
						bodyLines: [d.message],
					}),
						d.axiosException ? console.log(d.axiosException) : console.log(d);
					try {
						await h.completeRunGroupWithError(
							n,
							i,
							s,
							o,
							`Main job terminated with an error: "${d.message}"`,
						);
					} finally {
						process.exit(1);
					}
				}
			});
	});
var Q_ = {};
At(Q_, { default: () => SI });
function EI(r, e, t) {
	let { from: n } = af(),
		{ switchMap: i } = B_();
	return n(Di(e)).pipe(
		i((s) =>
			s.data.enabled
				? (vf(), _e(_f)).nxCloudDistributedTasksRunner(r, e, t)
				: (zr.warn({
						title: 'Nx Cloud: Workspace Disabled',
						bodyLines: [
							'This run and following runs will not use distributed task execution until',
							'the outstanding balance is paid or additional coupons are added for this',
							'workspace. If you believe you are receiving this message in error, please',
							'contact support at cloud-support@nrwl.io.',
							'',
							'Execution will now continue using this machine only.',
						],
				  }),
				  (process.env.NX_INVOKED_BY_RUNNER = 'true'),
				  Ni(r, e, t)),
		),
	);
}
async function gI(r, e, t) {
	return (await Di(e)).data.enabled
		? (vf(), _e(_f)).nxCloudDistributedTasksRunner(r, e, t)
		: (zr.warn({
				title: 'Nx Cloud: Workspace Disabled',
				bodyLines: [
					'This run and following runs will not use distributed task execution until',
					'the outstanding balance is paid.',
					'',
					'If you believe you are receiving this message in error, please',
					'contact support at cloud-support@nrwl.io.',
					'',
					'Execution will now continue using this machine only.',
				],
		  }),
		  (process.env.NX_INVOKED_BY_RUNNER = 'true'),
		  Ni(r, e, t));
}
function _I(r, e) {
	let t = e.cacheableOperations || [];
	return r.some((n) => bf(n, { cacheableOperations: t }));
}
function vI(r, e) {
	let t = e.cacheableOperations || [];
	for (let n of r)
		bf(n, { cacheableOperations: t }) ||
			(zr.error({
				title: 'Distributed task execution only works for cacheable targets',
				bodyLines: [
					`Target '${n.target.project}:${n.target.target}' cannot be executed.`,
					'To be able to replay the output of the target, distributed task execution only supports cacheable targets.',
					`You can verify that '${n.target.target}' is part of the list of cacheable targets in the 'nx.json' file.`,
					'You can invoke this command without distribution by doing "NX_CLOUD_DISTRIBUTED_EXECUTION=false nx ...".',
				],
			}),
			process.exit(1));
}
function bI(r, e) {
	let t = e.cacheableOperations || [];
	for (let n of r)
		bf(n, { cacheableOperations: t }) ||
			(zr.error({
				title: 'Distributed task execution only works for cacheable targets',
				bodyLines: [
					`Target ${n.target.project}:${n.target.target} cannot be executed.`,
					'To be able to replay the output of the target, distributed task execution only supports cacheable targets.',
					`You can still invoke "nx ${n.target.target} ${n.target.project}" from within a cacheable target when using "nx:run-commands".`,
				],
			}),
			process.exit(Vt));
}
var zr,
	Z_,
	mI,
	bf,
	yI,
	SI,
	ev = B(() => {
		'use strict';
		y_();
		Bl();
		oe();
		jl();
		({ output: zr } = J()),
			({
				tasksRunner: Z_,
				runnerReturnsPromise: mI,
				isCacheableTask: bf,
			} = pt()),
			(yI = (r, e, t = {}) => {
				let n = t.nxArgs || {},
					i = !Nt && !e.accessToken,
					s = n.cloud === !1 || uh;
				return i || s || e.skipNxCache
					? (i &&
							zr.warn({
								title: 'No access token found',
								bodyLines: [
									'Nx will continue running, but nothing will be written or read from the remote cache.',
									'Run details will also not be available in the Nx Cloud UI.',
								],
							}),
					  s &&
							zr.warn({
								title: 'Nx Cloud Manually Disabled',
								bodyLines: [
									'Nx will continue running, but nothing will be written or read from the remote cache.',
									'Run details will also not be available in the Nx Cloud UI.',
									'',
									"If this wasn't intentional, check for the NX_NO_CLOUD environment variable, the --no-cloud flag",
								],
							}),
					  e.skipNxCache &&
							zr.warn({
								title:
									'--skip-nx-cache disables the connection to Nx Cloud for the current run.',
								bodyLines: [
									'The remote cache will not be read from or written to during this run.',
								],
							}),
					  Z_(r, e, t))
					: lh()
					? _I(r, e)
						? Ni(r, e, t, !0)
						: Z_(r, e, t)
					: (lt(process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_ID) && bI(r, e),
					  b_(n.dte) && !lt(process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_ID)
							? (vI(r, e), mI ? gI(r, e, t) : EI(r, e, t))
							: ((process.env.NX_INVOKED_BY_RUNNER = 'true'), Ni(r, e, t)));
			});
		SI = yI;
	});
var Sf = {};
At(Sf, { cleanUpAgents: () => xI });
async function xI() {
	let r = `${RI}/lockfiles`;
	return (
		M && wI.note({ title: 'Cleaning up agent metadata for this workspace.' }),
		(0, tv.rm)(r, { recursive: !0, force: !0 }, (e) => {
			if (e) throw e;
		})
	);
}
var tv,
	wI,
	RI,
	wf = B(() => {
		'use strict';
		tv = require('fs');
		oe();
		({ output: wI } = J()), ({ cacheDirectory: RI } = pt());
	});
var Rf = {};
At(Rf, { runCommandAndStoreInCloud: () => TI });
async function TI() {
	let { nxCloudOptions: r } = et(),
		e = Te(r),
		t = new Gn(r),
		n = new lr(r.maskedProperties),
		i = Re(),
		s = Fe(),
		o = je(),
		a = we(),
		c = OI(process.argv),
		[l, ...u] = c,
		f = new Date().toISOString(),
		{ statusCode: h, terminalOutput: d } = await CI(l, u),
		y = new Date().toISOString(),
		b = {
			statusCode: h,
			terminalOutput: d,
			userCommandAndArgsString: c.join(' '),
			startTime: f,
			endTime: y,
			branch: i,
			runGroup: s,
			ciExecutionId: o,
			ciExecutionEnv: a,
		};
	await AI(e, n, r, b, t), process.exit(h);
}
function OI(r) {
	let e = r.findIndex((n) => n === 'record') + 1,
		t;
	if (e < process.argv.length) {
		let n = process.argv[e] === '--' ? 1 : 0;
		t = process.argv.slice(e + n);
	} else
		console.log(
			'Invalid command. Use `nx-cloud record [my command] [my arg1] [my arg...]`',
		),
			process.exit(1);
	return t;
}
function CI(r, e) {
	return new Promise((t, n) => {
		try {
			let i = iv.spawn(r, e, { stdio: ['inherit', 'pipe', 'pipe', 'ipc'] }),
				s = [];
			i.stdout.on('data', (o) => {
				process.stdout.write(o), s.push(o.toString());
			}),
				i.stderr.on('data', (o) => {
					process.stderr.write(o), s.push(o.toString());
				}),
				i.on('exit', (o, a) => {
					let c = o ?? DI(a || ''),
						l = s.join('');
					t({ statusCode: c, terminalOutput: l });
				});
		} catch (i) {
			n(i);
		}
	});
}
function II(r, e) {
	let t = r.obfuscate(e.terminalOutput),
		n =
			t.length > nv
				? `TRUNCATED

${t.slice(t.length - nv)}`
				: t;
	return {
		taskId: 'nx-cloud-tasks-runner:record-command',
		target: 'record-command',
		projectName: 'nx-cloud-tasks-runner',
		hash: '',
		startTime: e.startTime,
		endTime: e.endTime,
		hashDetails: {},
		params: e.userCommandAndArgsString,
		cacheStatus: 'n/a',
		status: e.statusCode,
		terminalOutput: n,
	};
}
async function AI(r, e, t, n, i) {
	let s = `nx-cloud record -- ${n.userCommandAndArgsString}`,
		o = {
			meta: { nxCloudVersion: '0.0.0' },
			tasks: [II(e, n)],
			run: {
				command: s,
				startTime: n.startTime,
				endTime: n.endTime,
				branch: n.branch,
				runGroup: n.runGroup,
				sha: n.branch ? tt() : void 0,
			},
			branch: n.branch,
			runGroup: n.runGroup,
			ciExecutionId: n.ciExecutionId,
			ciExecutionEnv: n.ciExecutionEnv,
			machineInfo: Yr(),
		},
		a = Buffer.from(JSON.stringify(o)),
		c = await (0, sv.promisify)(ov.gzip)(a),
		l = await ce(() =>
			r.post('/nx-cloud/runs/end', c, {
				headers: {
					...r.defaults.headers,
					'Content-Encoding': 'gzip',
					'Content-Type': 'application/octet-stream',
				},
			}),
		);
	process.env.NX_CLOUD_SILENT_RECORD !== 'true' && NI(l.data.runUrl),
		n.statusCode !== 0 &&
			(n.ciExecutionId || n.runGroup) &&
			(await i.completeRunGroupWithError(
				n.branch,
				n.runGroup,
				n.ciExecutionId,
				n.ciExecutionEnv,
				null,
			));
}
function NI(r) {
	rv.addVerticalSeparator(),
		rv.note({ title: 'Nx Cloud: Successfully recorded command output' }),
		Xt(`You can view or share your output by visiting ${r}`);
}
function DI(r) {
	return r === 'SIGHUP'
		? 128 + 1
		: r === 'SIGINT'
		? 128 + 2
		: r === 'SIGTERM'
		? 128 + 15
		: 128;
}
var iv,
	sv,
	ov,
	rv,
	nv,
	xf = B(() => {
		'use strict';
		(iv = Wr(require('child_process'))),
			(sv = require('util')),
			(ov = require('zlib'));
		_t();
		oe();
		br();
		ri();
		df();
		vo();
		({ output: rv } = J()), (nv = 2e5);
	});
function av() {
	kI.error({
		title: 'Invalid Task Runner Configuration',
		bodyLines: [
			'To use Distributed Task Execution, your default task runner configuration must',
			'use the "nx-cloud" task runner.',
			'',
			'This can be adjusted in "nx.json".',
		],
	});
}
var kI,
	cv = B(() => {
		'use strict';
		({ output: kI } = J());
	});
var uv,
	Zo,
	lv = B(() => {
		'use strict';
		_t();
		oe();
		Dt();
		({ output: uv } = J()),
			(Zo = class {
				constructor(e, t, n, i, s, o) {
					this.branch = t;
					this.runGroup = n;
					this.ciExecutionId = i;
					this.ciExecutionEnv = s;
					this.agentName = o;
					this.apiAxiosInstance = Te(e, 6e4);
				}
				async tasks(e, t, n, i) {
					var o;
					let s = Oe('dtePollTasks');
					try {
						let a = await ce(() =>
							this.apiAxiosInstance.post('/nx-cloud/executions/tasks', {
								runGroup: this.runGroup,
								ciExecutionId: this.ciExecutionId,
								ciExecutionEnv: this.ciExecutionEnv,
								agentName: this.agentName,
								executionId: e,
								statusCode: t,
								completedTasks: n,
								targets: i,
							}),
						);
						return s.recordMetric(re(a)), a.data;
					} catch (a) {
						throw (
							(s.recordMetric(
								(o = a == null ? void 0 : a.axiosException) != null &&
									o.response
									? re(a.axiosException.response)
									: Ce,
							),
							a)
						);
					}
				}
				async completeRunGroupWithError(e) {
					var n;
					M &&
						uv.note({
							title: 'Completing with an error',
							bodyLines: [
								`ciExecutionId: ${this.ciExecutionId}`,
								`ciExecutionEnv: ${this.ciExecutionEnv}`,
								`runGroup: ${this.runGroup}`,
								`error: ${e}`,
							],
						});
					let t = Oe('completeRunGroup');
					try {
						let i = await ce(() =>
							this.apiAxiosInstance.post(
								'/nx-cloud/executions/complete-run-group',
								{
									branch: this.branch,
									runGroup: this.runGroup,
									ciExecutionId: this.ciExecutionId,
									ciExecutionEnv: this.ciExecutionEnv,
									agentName: this.agentName,
									criticalErrorMessage: e,
								},
							),
						);
						M && uv.note({ title: 'Completed run group with an error' }),
							t.recordMetric(re(i));
					} catch (i) {
						t.recordMetric(
							(n = i == null ? void 0 : i.axiosException) != null && n.response
								? re(i.axiosException.response)
								: Ce,
						),
							console.error(i);
					}
				}
			});
	});
async function fv(r, e, t, n, i) {
	let s = 0,
		o = null,
		a = Jo({
			title: `No new messages received after ${ha / 1e3} seconds`,
			timeout: ha,
		}),
		c = [],
		l = new Date(),
		u = !1,
		f = {};
	for (;;) {
		if (
			(M && Ui.note({ title: `${r} fetching tasks...` }),
			(o = await e.tasks(o ? o.executionId : null, s, c, i)),
			M &&
				Ui.note({
					title: `${r} received an API Response`,
					bodyLines: [
						`completed: ${o.completed}`,
						`status: ${o.status}`,
						`retryDuring: ${o.retryDuring}`,
						`executionId: ${o.executionId}`,
						`number of tasks: ${o.tasks.length}`,
						`error: ${o.criticalErrorMessage}`,
						`maxParallel: ${o.maxParallel}`,
					],
				}),
			o.criticalErrorMessage &&
				(Ui.error({
					title: 'Distributed Execution Terminated',
					bodyLines: ['Error:', o.criticalErrorMessage],
				}),
				process.exit(1)),
			o != null &&
				o.retryDuring &&
				(o == null ? void 0 : o.retryDuring) !== 0 &&
				!u &&
				new Date().getTime() - l.getTime() > o.retryDuring)
		) {
			await rt(2e4);
			continue;
		}
		if ((o == null ? void 0 : o.status) !== void 0) {
			if (
				o.status === 'RUN_GROUP_COMPLETED' ||
				o.status === 'NO_FURTHER_TASKS_TO_RUN'
			)
				return;
		} else if (o.completed) return;
		if ((a(o.tasks.map((d) => d.taskId).join('')), !o.executionId)) {
			M && Ui.note({ title: `${r} waiting...` }),
				await rt(5e3),
				(s = 0),
				(c = []);
			continue;
		}
		if (((u = !0), o.completedTasks))
			for (let d of o.completedTasks)
				f[d.taskId] ||
					(Ui.note({
						title: `${r} downloading artifacts for ${d.taskId} Hash: ${d.hash} Url: ${d.url}`,
					}),
					await t.retrieveAndExtract(d.hash, d.url),
					(f[d.taskId] = !0));
		let h = await n(o.executionId, o.tasks, o.maxParallel);
		for (let d of h.completedTasks) f[d.taskId] = !0;
		(s = h.completedStatusCode), (c = h.completedTasks);
	}
}
var Ui,
	hv = B(() => {
		'use strict';
		pf();
		oe();
		Yn();
		({ output: Ui } = J());
	});
var Qo = E((NL, vv) => {
	'use strict';
	var LI = require('util'),
		dv = require('path'),
		PI = require('fs');
	function Bi(r) {
		if (
			((r !== r.toLowerCase() && r !== r.toUpperCase()) ||
				(r = r.toLowerCase()),
			r.indexOf('-') === -1 && r.indexOf('_') === -1)
		)
			return r;
		{
			let t = '',
				n = !1,
				i = r.match(/^-+/);
			for (let s = i ? i[0].length : 0; s < r.length; s++) {
				let o = r.charAt(s);
				n && ((n = !1), (o = o.toUpperCase())),
					s !== 0 && (o === '-' || o === '_')
						? (n = !0)
						: o !== '-' && o !== '_' && (t += o);
			}
			return t;
		}
	}
	function Ev(r, e) {
		let t = r.toLowerCase();
		e = e || '-';
		let n = '';
		for (let i = 0; i < r.length; i++) {
			let s = t.charAt(i),
				o = r.charAt(i);
			s !== o && i > 0 ? (n += `${e}${t.charAt(i)}`) : (n += o);
		}
		return n;
	}
	function gv(r) {
		return r == null
			? !1
			: typeof r == 'number' || /^0x[0-9a-f]+$/i.test(r)
			? !0
			: /^0[^.]/.test(r)
			? !1
			: /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(r);
	}
	function FI(r) {
		if (Array.isArray(r))
			return r.map((o) => (typeof o != 'string' ? o + '' : o));
		r = r.trim();
		let e = 0,
			t = null,
			n = null,
			i = null,
			s = [];
		for (let o = 0; o < r.length; o++) {
			if (((t = n), (n = r.charAt(o)), n === ' ' && !i)) {
				t !== ' ' && e++;
				continue;
			}
			n === i ? (i = null) : (n === "'" || n === '"') && !i && (i = n),
				s[e] || (s[e] = ''),
				(s[e] += n);
		}
		return s;
	}
	var mt;
	(function (r) {
		(r.BOOLEAN = 'boolean'),
			(r.STRING = 'string'),
			(r.NUMBER = 'number'),
			(r.ARRAY = 'array');
	})(mt || (mt = {}));
	var Ht,
		Af = class {
			constructor(e) {
				Ht = e;
			}
			parse(e, t) {
				let n = Object.assign(
						{
							alias: void 0,
							array: void 0,
							boolean: void 0,
							config: void 0,
							configObjects: void 0,
							configuration: void 0,
							coerce: void 0,
							count: void 0,
							default: void 0,
							envPrefix: void 0,
							narg: void 0,
							normalize: void 0,
							string: void 0,
							number: void 0,
							__: void 0,
							key: void 0,
						},
						t,
					),
					i = FI(e),
					s = typeof e == 'string',
					o = MI(Object.assign(Object.create(null), n.alias)),
					a = Object.assign(
						{
							'boolean-negation': !0,
							'camel-case-expansion': !0,
							'combine-arrays': !1,
							'dot-notation': !0,
							'duplicate-arguments-array': !0,
							'flatten-duplicate-arrays': !0,
							'greedy-arrays': !0,
							'halt-at-non-option': !1,
							'nargs-eats-options': !1,
							'negation-prefix': 'no-',
							'parse-numbers': !0,
							'parse-positional-numbers': !0,
							'populate--': !1,
							'set-placeholder-key': !1,
							'short-option-groups': !0,
							'strip-aliased': !1,
							'strip-dashed': !1,
							'unknown-options-as-args': !1,
						},
						n.configuration,
					),
					c = Object.assign(Object.create(null), n.default),
					l = n.configObjects || [],
					u = n.envPrefix,
					f = a['populate--'],
					h = f ? '--' : '_',
					d = Object.create(null),
					y = Object.create(null),
					b = n.__ || Ht.format,
					p = {
						aliases: Object.create(null),
						arrays: Object.create(null),
						bools: Object.create(null),
						strings: Object.create(null),
						numbers: Object.create(null),
						counts: Object.create(null),
						normalize: Object.create(null),
						configs: Object.create(null),
						nargs: Object.create(null),
						coercions: Object.create(null),
						keys: [],
					},
					w = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/,
					k = new RegExp('^--' + a['negation-prefix'] + '(.+)');
				[]
					.concat(n.array || [])
					.filter(Boolean)
					.forEach(function (m) {
						let _ = typeof m == 'object' ? m.key : m,
							x = Object.keys(m)
								.map(function (v) {
									return {
										boolean: 'bools',
										string: 'strings',
										number: 'numbers',
									}[v];
								})
								.filter(Boolean)
								.pop();
						x && (p[x][_] = !0), (p.arrays[_] = !0), p.keys.push(_);
					}),
					[]
						.concat(n.boolean || [])
						.filter(Boolean)
						.forEach(function (m) {
							(p.bools[m] = !0), p.keys.push(m);
						}),
					[]
						.concat(n.string || [])
						.filter(Boolean)
						.forEach(function (m) {
							(p.strings[m] = !0), p.keys.push(m);
						}),
					[]
						.concat(n.number || [])
						.filter(Boolean)
						.forEach(function (m) {
							(p.numbers[m] = !0), p.keys.push(m);
						}),
					[]
						.concat(n.count || [])
						.filter(Boolean)
						.forEach(function (m) {
							(p.counts[m] = !0), p.keys.push(m);
						}),
					[]
						.concat(n.normalize || [])
						.filter(Boolean)
						.forEach(function (m) {
							(p.normalize[m] = !0), p.keys.push(m);
						}),
					typeof n.narg == 'object' &&
						Object.entries(n.narg).forEach(([m, _]) => {
							typeof _ == 'number' && ((p.nargs[m] = _), p.keys.push(m));
						}),
					typeof n.coerce == 'object' &&
						Object.entries(n.coerce).forEach(([m, _]) => {
							typeof _ == 'function' && ((p.coercions[m] = _), p.keys.push(m));
						}),
					typeof n.config < 'u' &&
						(Array.isArray(n.config) || typeof n.config == 'string'
							? []
									.concat(n.config)
									.filter(Boolean)
									.forEach(function (m) {
										p.configs[m] = !0;
									})
							: typeof n.config == 'object' &&
							  Object.entries(n.config).forEach(([m, _]) => {
									(typeof _ == 'boolean' || typeof _ == 'function') &&
										(p.configs[m] = _);
							  })),
					N(n.key, o, n.default, p.arrays),
					Object.keys(c).forEach(function (m) {
						(p.aliases[m] || []).forEach(function (_) {
							c[_] = c[m];
						});
					});
				let T = null;
				zt();
				let A = [],
					P = Object.assign(Object.create(null), { _: [] }),
					I = {};
				for (let m = 0; m < i.length; m++) {
					let _ = i[m],
						x = _.replace(/^-{3,}/, '---'),
						v,
						g,
						F,
						D,
						q,
						pe;
					if (_ !== '--' && /^-/.test(_) && ut(_)) z(_);
					else if (x.match(/^---+(=|$)/)) {
						z(_);
						continue;
					} else if (
						_.match(/^--.+=/) ||
						(!a['short-option-groups'] && _.match(/^-.+=/))
					)
						(D = _.match(/^--?([^=]+)=([\s\S]*)$/)),
							D !== null &&
								Array.isArray(D) &&
								D.length >= 3 &&
								(S(D[1], p.arrays)
									? (m = O(m, D[1], i, D[2]))
									: S(D[1], p.nargs) !== !1
									? (m = G(m, D[1], i, D[2]))
									: C(D[1], D[2], !0));
					else if (_.match(k) && a['boolean-negation'])
						(D = _.match(k)),
							D !== null &&
								Array.isArray(D) &&
								D.length >= 2 &&
								((g = D[1]), C(g, S(g, p.arrays) ? [!1] : !1));
					else if (
						_.match(/^--.+/) ||
						(!a['short-option-groups'] && _.match(/^-[^-]+/))
					)
						(D = _.match(/^--?(.+)/)),
							D !== null &&
								Array.isArray(D) &&
								D.length >= 2 &&
								((g = D[1]),
								S(g, p.arrays)
									? (m = O(m, g, i))
									: S(g, p.nargs) !== !1
									? (m = G(m, g, i))
									: ((q = i[m + 1]),
									  (q !== void 0 &&
											(!q.match(/^-/) || q.match(w)) &&
											!S(g, p.bools) &&
											!S(g, p.counts)) ||
									  /^(true|false)$/.test(q)
											? (C(g, q), m++)
											: C(g, ge(g))));
					else if (_.match(/^-.\..+=/))
						(D = _.match(/^-([^=]+)=([\s\S]*)$/)),
							D !== null && Array.isArray(D) && D.length >= 3 && C(D[1], D[2]);
					else if (_.match(/^-.\..+/) && !_.match(w))
						(q = i[m + 1]),
							(D = _.match(/^-(.\..+)/)),
							D !== null &&
								Array.isArray(D) &&
								D.length >= 2 &&
								((g = D[1]),
								q !== void 0 &&
								!q.match(/^-/) &&
								!S(g, p.bools) &&
								!S(g, p.counts)
									? (C(g, q), m++)
									: C(g, ge(g)));
					else if (_.match(/^-[^-]+/) && !_.match(w)) {
						(F = _.slice(1, -1).split('')), (v = !1);
						for (let Pe = 0; Pe < F.length; Pe++) {
							if (((q = _.slice(Pe + 2)), F[Pe + 1] && F[Pe + 1] === '=')) {
								(pe = _.slice(Pe + 3)),
									(g = F[Pe]),
									S(g, p.arrays)
										? (m = O(m, g, i, pe))
										: S(g, p.nargs) !== !1
										? (m = G(m, g, i, pe))
										: C(g, pe),
									(v = !0);
								break;
							}
							if (q === '-') {
								C(F[Pe], q);
								continue;
							}
							if (
								/[A-Za-z]/.test(F[Pe]) &&
								/^-?\d+(\.\d*)?(e-?\d+)?$/.test(q) &&
								S(q, p.bools) === !1
							) {
								C(F[Pe], q), (v = !0);
								break;
							}
							if (F[Pe + 1] && F[Pe + 1].match(/\W/)) {
								C(F[Pe], q), (v = !0);
								break;
							} else C(F[Pe], ge(F[Pe]));
						}
						(g = _.slice(-1)[0]),
							!v &&
								g !== '-' &&
								(S(g, p.arrays)
									? (m = O(m, g, i))
									: S(g, p.nargs) !== !1
									? (m = G(m, g, i))
									: ((q = i[m + 1]),
									  (q !== void 0 &&
											(!/^(-|--)[^-]/.test(q) || q.match(w)) &&
											!S(g, p.bools) &&
											!S(g, p.counts)) ||
									  /^(true|false)$/.test(q)
											? (C(g, q), m++)
											: C(g, ge(g))));
					} else if (
						_.match(/^-[0-9]$/) &&
						_.match(w) &&
						S(_.slice(1), p.bools)
					)
						(g = _.slice(1)), C(g, ge(g));
					else if (_ === '--') {
						A = i.slice(m + 1);
						break;
					} else if (a['halt-at-non-option']) {
						A = i.slice(m);
						break;
					} else z(_);
				}
				$(P, !0),
					$(P, !1),
					Y(P),
					K(),
					le(P, p.aliases, c, !0),
					L(P),
					a['set-placeholder-key'] && H(P),
					Object.keys(p.counts).forEach(function (m) {
						Se(P, m.split('.')) || C(m, 0);
					}),
					f && A.length && (P[h] = []),
					A.forEach(function (m) {
						P[h].push(m);
					}),
					a['camel-case-expansion'] &&
						a['strip-dashed'] &&
						Object.keys(P)
							.filter((m) => m !== '--' && m.includes('-'))
							.forEach((m) => {
								delete P[m];
							}),
					a['strip-aliased'] &&
						[].concat(...Object.keys(o).map((m) => o[m])).forEach((m) => {
							a['camel-case-expansion'] &&
								m.includes('-') &&
								delete P[
									m
										.split('.')
										.map((_) => Bi(_))
										.join('.')
								],
								delete P[m];
						});
				function z(m) {
					let _ = V('_', m);
					(typeof _ == 'string' || typeof _ == 'number') && P._.push(_);
				}
				function G(m, _, x, v) {
					let g,
						F = S(_, p.nargs);
					if (((F = typeof F != 'number' || isNaN(F) ? 1 : F), F === 0))
						return (
							Le(v) || (T = Error(b('Argument unexpected for: %s', _))),
							C(_, ge(_)),
							m
						);
					let D = Le(v) ? 0 : 1;
					if (a['nargs-eats-options'])
						x.length - (m + 1) + D < F &&
							(T = Error(b('Not enough arguments following: %s', _))),
							(D = F);
					else {
						for (
							g = m + 1;
							g < x.length &&
							(!x[g].match(/^-[^0-9]/) || x[g].match(w) || ut(x[g]));
							g++
						)
							D++;
						D < F && (T = Error(b('Not enough arguments following: %s', _)));
					}
					let q = Math.min(D, F);
					for (!Le(v) && q > 0 && (C(_, v), q--), g = m + 1; g < q + m + 1; g++)
						C(_, x[g]);
					return m + q;
				}
				function O(m, _, x, v) {
					let g = [],
						F = v || x[m + 1],
						D = S(_, p.nargs);
					if (S(_, p.bools) && !/^(true|false)$/.test(F)) g.push(!0);
					else if (Le(F) || (Le(v) && /^-/.test(F) && !w.test(F) && !ut(F))) {
						if (c[_] !== void 0) {
							let q = c[_];
							g = Array.isArray(q) ? q : [q];
						}
					} else {
						Le(v) || g.push(X(_, v, !0));
						for (
							let q = m + 1;
							q < x.length &&
							!(
								(!a['greedy-arrays'] && g.length > 0) ||
								(D && typeof D == 'number' && g.length >= D) ||
								((F = x[q]), /^-/.test(F) && !w.test(F) && !ut(F))
							);
							q++
						)
							(m = q), g.push(X(_, F, s));
					}
					return (
						typeof D == 'number' &&
							((D && g.length < D) || (isNaN(D) && g.length === 0)) &&
							(T = Error(b('Not enough arguments following: %s', _))),
						C(_, g),
						m
					);
				}
				function C(m, _, x = s) {
					if (/-/.test(m) && a['camel-case-expansion']) {
						let F = m
							.split('.')
							.map(function (D) {
								return Bi(D);
							})
							.join('.');
						j(m, F);
					}
					let v = X(m, _, x),
						g = m.split('.');
					R(P, g, v),
						p.aliases[m] &&
							p.aliases[m].forEach(function (F) {
								let D = F.split('.');
								R(P, D, v);
							}),
						g.length > 1 &&
							a['dot-notation'] &&
							(p.aliases[g[0]] || []).forEach(function (F) {
								let D = F.split('.'),
									q = [].concat(g);
								q.shift(),
									(D = D.concat(q)),
									(p.aliases[m] || []).includes(D.join('.')) || R(P, D, v);
							}),
						S(m, p.normalize) &&
							!S(m, p.arrays) &&
							[m].concat(p.aliases[m] || []).forEach(function (D) {
								Object.defineProperty(I, D, {
									enumerable: !0,
									get() {
										return _;
									},
									set(q) {
										_ = typeof q == 'string' ? Ht.normalize(q) : q;
									},
								});
							});
				}
				function j(m, _) {
					(p.aliases[m] && p.aliases[m].length) ||
						((p.aliases[m] = [_]), (d[_] = !0)),
						(p.aliases[_] && p.aliases[_].length) || j(_, m);
				}
				function X(m, _, x) {
					x && (_ = qI(_)),
						(S(m, p.bools) || S(m, p.counts)) &&
							typeof _ == 'string' &&
							(_ = _ === 'true');
					let v = Array.isArray(_)
						? _.map(function (g) {
								return V(m, g);
						  })
						: V(m, _);
					return (
						S(m, p.counts) && (Le(v) || typeof v == 'boolean') && (v = Tf()),
						S(m, p.normalize) &&
							S(m, p.arrays) &&
							(Array.isArray(_)
								? (v = _.map((g) => Ht.normalize(g)))
								: (v = Ht.normalize(_))),
						v
					);
				}
				function V(m, _) {
					return (
						(!a['parse-positional-numbers'] && m === '_') ||
							(!S(m, p.strings) &&
								!S(m, p.bools) &&
								!Array.isArray(_) &&
								((gv(_) &&
									a['parse-numbers'] &&
									Number.isSafeInteger(Math.floor(parseFloat(`${_}`)))) ||
									(!Le(_) && S(m, p.numbers))) &&
								(_ = Number(_))),
						_
					);
				}
				function Y(m) {
					let _ = Object.create(null);
					le(_, p.aliases, c),
						Object.keys(p.configs).forEach(function (x) {
							let v = m[x] || _[x];
							if (v)
								try {
									let g = null,
										F = Ht.resolve(Ht.cwd(), v),
										D = p.configs[x];
									if (typeof D == 'function') {
										try {
											g = D(F);
										} catch (q) {
											g = q;
										}
										if (g instanceof Error) {
											T = g;
											return;
										}
									} else g = Ht.require(F);
									U(g);
								} catch (g) {
									g.name === 'PermissionDenied'
										? (T = g)
										: m[x] && (T = Error(b('Invalid JSON config file: %s', v)));
								}
						});
				}
				function U(m, _) {
					Object.keys(m).forEach(function (x) {
						let v = m[x],
							g = _ ? _ + '.' + x : x;
						typeof v == 'object' &&
						v !== null &&
						!Array.isArray(v) &&
						a['dot-notation']
							? U(v, g)
							: (!Se(P, g.split('.')) ||
									(S(g, p.arrays) && a['combine-arrays'])) &&
							  C(g, v);
					});
				}
				function K() {
					typeof l < 'u' &&
						l.forEach(function (m) {
							U(m);
						});
				}
				function $(m, _) {
					if (typeof u > 'u') return;
					let x = typeof u == 'string' ? u : '',
						v = Ht.env();
					Object.keys(v).forEach(function (g) {
						if (x === '' || g.lastIndexOf(x, 0) === 0) {
							let F = g.split('__').map(function (D, q) {
								return q === 0 && (D = D.substring(x.length)), Bi(D);
							});
							((_ && p.configs[F.join('.')]) || !_) &&
								!Se(m, F) &&
								C(F.join('.'), v[g]);
						}
					});
				}
				function L(m) {
					let _,
						x = new Set();
					Object.keys(m).forEach(function (v) {
						if (!x.has(v) && ((_ = S(v, p.coercions)), typeof _ == 'function'))
							try {
								let g = V(v, _(m[v]));
								[].concat(p.aliases[v] || [], v).forEach((F) => {
									x.add(F), (m[F] = g);
								});
							} catch (g) {
								T = g;
							}
					});
				}
				function H(m) {
					return (
						p.keys.forEach((_) => {
							~_.indexOf('.') || (typeof m[_] > 'u' && (m[_] = void 0));
						}),
						m
					);
				}
				function le(m, _, x, v = !1) {
					Object.keys(x).forEach(function (g) {
						Se(m, g.split('.')) ||
							(R(m, g.split('.'), x[g]),
							v && (y[g] = !0),
							(_[g] || []).forEach(function (F) {
								Se(m, F.split('.')) || R(m, F.split('.'), x[g]);
							}));
					});
				}
				function Se(m, _) {
					let x = m;
					a['dot-notation'] || (_ = [_.join('.')]),
						_.slice(0, -1).forEach(function (g) {
							x = x[g] || {};
						});
					let v = _[_.length - 1];
					return typeof x != 'object' ? !1 : v in x;
				}
				function R(m, _, x) {
					let v = m;
					a['dot-notation'] || (_ = [_.join('.')]),
						_.slice(0, -1).forEach(function (pe) {
							(pe = pv(pe)),
								typeof v == 'object' && v[pe] === void 0 && (v[pe] = {}),
								typeof v[pe] != 'object' || Array.isArray(v[pe])
									? (Array.isArray(v[pe])
											? v[pe].push({})
											: (v[pe] = [v[pe], {}]),
									  (v = v[pe][v[pe].length - 1]))
									: (v = v[pe]);
						});
					let g = pv(_[_.length - 1]),
						F = S(_.join('.'), p.arrays),
						D = Array.isArray(x),
						q = a['duplicate-arguments-array'];
					!q &&
						S(g, p.nargs) &&
						((q = !0),
						((!Le(v[g]) && p.nargs[g] === 1) ||
							(Array.isArray(v[g]) && v[g].length === p.nargs[g])) &&
							(v[g] = void 0)),
						x === Tf()
							? (v[g] = Tf(v[g]))
							: Array.isArray(v[g])
							? q && F && D
								? (v[g] = a['flatten-duplicate-arrays']
										? v[g].concat(x)
										: (Array.isArray(v[g][0]) ? v[g] : [v[g]]).concat([x]))
								: !q && !!F == !!D
								? (v[g] = x)
								: (v[g] = v[g].concat([x]))
							: v[g] === void 0 && F
							? (v[g] = D ? x : [x])
							: q && !(v[g] === void 0 || S(g, p.counts) || S(g, p.bools))
							? (v[g] = [v[g], x])
							: (v[g] = x);
				}
				function N(...m) {
					m.forEach(function (_) {
						Object.keys(_ || {}).forEach(function (x) {
							p.aliases[x] ||
								((p.aliases[x] = [].concat(o[x] || [])),
								p.aliases[x].concat(x).forEach(function (v) {
									if (/-/.test(v) && a['camel-case-expansion']) {
										let g = Bi(v);
										g !== x &&
											p.aliases[x].indexOf(g) === -1 &&
											(p.aliases[x].push(g), (d[g] = !0));
									}
								}),
								p.aliases[x].concat(x).forEach(function (v) {
									if (
										v.length > 1 &&
										/[A-Z]/.test(v) &&
										a['camel-case-expansion']
									) {
										let g = Ev(v, '-');
										g !== x &&
											p.aliases[x].indexOf(g) === -1 &&
											(p.aliases[x].push(g), (d[g] = !0));
									}
								}),
								p.aliases[x].forEach(function (v) {
									p.aliases[v] = [x].concat(
										p.aliases[x].filter(function (g) {
											return v !== g;
										}),
									);
								}));
						});
					});
				}
				function S(m, _) {
					let x = [].concat(p.aliases[m] || [], m),
						v = Object.keys(_),
						g = x.find((F) => v.includes(F));
					return g ? _[g] : !1;
				}
				function W(m) {
					let _ = Object.keys(p);
					return [].concat(_.map((v) => p[v])).some(function (v) {
						return Array.isArray(v) ? v.includes(m) : v[m];
					});
				}
				function de(m, ..._) {
					return [].concat(..._).some(function (v) {
						let g = m.match(v);
						return g && W(g[1]);
					});
				}
				function It(m) {
					if (m.match(w) || !m.match(/^-[^-]+/)) return !1;
					let _ = !0,
						x,
						v = m.slice(1).split('');
					for (let g = 0; g < v.length; g++) {
						if (((x = m.slice(g + 2)), !W(v[g]))) {
							_ = !1;
							break;
						}
						if (
							(v[g + 1] && v[g + 1] === '=') ||
							x === '-' ||
							(/[A-Za-z]/.test(v[g]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(x)) ||
							(v[g + 1] && v[g + 1].match(/\W/))
						)
							break;
					}
					return _;
				}
				function ut(m) {
					return a['unknown-options-as-args'] && Et(m);
				}
				function Et(m) {
					return (
						(m = m.replace(/^-{3,}/, '--')),
						m.match(w) || It(m)
							? !1
							: !de(
									m,
									/^-+([^=]+?)=[\s\S]*$/,
									k,
									/^-+([^=]+?)$/,
									/^-+([^=]+?)-$/,
									/^-+([^=]+?\d+)$/,
									/^-+([^=]+?)\W+.*$/,
							  )
					);
				}
				function ge(m) {
					return !S(m, p.bools) && !S(m, p.counts) && `${m}` in c
						? c[m]
						: Vr(_r(m));
				}
				function Vr(m) {
					return {
						[mt.BOOLEAN]: !0,
						[mt.STRING]: '',
						[mt.NUMBER]: void 0,
						[mt.ARRAY]: [],
					}[m];
				}
				function _r(m) {
					let _ = mt.BOOLEAN;
					return (
						S(m, p.strings)
							? (_ = mt.STRING)
							: S(m, p.numbers)
							? (_ = mt.NUMBER)
							: S(m, p.bools)
							? (_ = mt.BOOLEAN)
							: S(m, p.arrays) && (_ = mt.ARRAY),
						_
					);
				}
				function Le(m) {
					return m === void 0;
				}
				function zt() {
					Object.keys(p.counts).find((m) =>
						S(m, p.arrays)
							? ((T = Error(
									b(
										'Invalid configuration: %s, opts.count excludes opts.array.',
										m,
									),
							  )),
							  !0)
							: S(m, p.nargs)
							? ((T = Error(
									b(
										'Invalid configuration: %s, opts.count excludes opts.narg.',
										m,
									),
							  )),
							  !0)
							: !1,
					);
				}
				return {
					aliases: Object.assign({}, p.aliases),
					argv: Object.assign(I, P),
					configuration: a,
					defaulted: Object.assign({}, y),
					error: T,
					newAliases: Object.assign({}, d),
				};
			}
		};
	function MI(r) {
		let e = [],
			t = Object.create(null),
			n = !0;
		for (
			Object.keys(r).forEach(function (i) {
				e.push([].concat(r[i], i));
			});
			n;

		) {
			n = !1;
			for (let i = 0; i < e.length; i++)
				for (let s = i + 1; s < e.length; s++)
					if (
						e[i].filter(function (a) {
							return e[s].indexOf(a) !== -1;
						}).length
					) {
						(e[i] = e[i].concat(e[s])), e.splice(s, 1), (n = !0);
						break;
					}
		}
		return (
			e.forEach(function (i) {
				i = i.filter(function (o, a, c) {
					return c.indexOf(o) === a;
				});
				let s = i.pop();
				s !== void 0 && typeof s == 'string' && (t[s] = i);
			}),
			t
		);
	}
	function Tf(r) {
		return r !== void 0 ? r + 1 : 1;
	}
	function pv(r) {
		return r === '__proto__' ? '___proto___' : r;
	}
	function qI(r) {
		return typeof r == 'string' &&
			(r[0] === "'" || r[0] === '"') &&
			r[r.length - 1] === r[0]
			? r.substring(1, r.length - 1)
			: r;
	}
	var Of,
		Cf,
		If,
		mv =
			process && process.env && process.env.YARGS_MIN_NODE_VERSION
				? Number(process.env.YARGS_MIN_NODE_VERSION)
				: 12,
		yv =
			(Cf =
				(Of = process == null ? void 0 : process.versions) === null ||
				Of === void 0
					? void 0
					: Of.node) !== null && Cf !== void 0
				? Cf
				: (If = process == null ? void 0 : process.version) === null ||
				  If === void 0
				? void 0
				: If.slice(1);
	if (yv && Number(yv.match(/^([^.]+)/)[1]) < mv)
		throw Error(
			`yargs parser supports a minimum Node.js version of ${mv}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`,
		);
	var UI = process ? process.env : {},
		_v = new Af({
			cwd: process.cwd,
			env: () => UI,
			format: LI.format,
			normalize: dv.normalize,
			resolve: dv.resolve,
			require: (r) => {
				if (typeof require < 'u') return require(r);
				if (r.match(/\.json$/)) return JSON.parse(PI.readFileSync(r, 'utf8'));
				throw Error('only .json config files are supported in ESM');
			},
		}),
		ji = function (e, t) {
			return _v.parse(e.slice(), t).argv;
		};
	ji.detailed = function (r, e) {
		return _v.parse(r.slice(), e);
	};
	ji.camelCase = Bi;
	ji.decamelize = Ev;
	ji.looksLikeNumber = gv;
	vv.exports = ji;
});
async function bv(r) {
	let e = await BI(r);
	return async (t, n, i) => {
		let s = n.map((c) => {
			let l = jI(c.params, {
					configuration: { 'camel-case-expansion': !1, 'dot-notation': !0 },
				}),
				u = Du(l);
			return (
				l._.length == 0 && delete l._,
				{
					id: c.taskId,
					target: {
						project: c.projectName,
						target: c.target,
						configuration: c.configuration,
					},
					overrides: { ...l, __overrides_unparsed__: u },
					projectRoot: c.projectRoot,
				}
			);
		});
		(process.env.NX_CACHE_FAILURES = 'true'),
			(process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_ID = t),
			(process.env.NX_STREAM_OUTPUT = 'true'),
			(process.env.NX_PREFIX_OUTPUT = 'true');
		let o = await e.invoke({ tasks: s, parallel: i });
		return {
			completedTasks: Object.values(o.taskGraph.tasks).map((c) => ({
				taskId: c.id,
				hash: c.hash,
			})),
			completedStatusCode: o.status,
		};
	};
}
var BI,
	jI,
	Sv = B(() => {
		'use strict';
		bi();
		({ initTasksRunner: BI } = pt()), (jI = Qo());
	});
async function Rv() {
	let r = zI();
	return async function (t, n, i) {
		let s = 0,
			o = [];
		for (let a of HI(n)) {
			let c = a.configuration ? `--configuration=${a.configuration}` : '',
				l = i > 1 ? ` --parallel --max-parallel=${i}` : '',
				u = `npx nx run-many --target=${
					a.target
				} ${c} --projects=${a.projects.join(',')} ${a.params}${l}`;
			M && GI.note({ title: `Executing: '${u}'` });
			try {
				(0, wv.execSync)(u, {
					stdio: ['ignore', 'inherit', 'inherit'],
					env: {
						...process.env,
						NX_CACHE_FAILURES: 'true',
						NX_CLOUD_DISTRIBUTED_EXECUTION_ID: t,
						NX_STREAM_OUTPUT: 'true',
						NX_PREFIX_OUTPUT: 'true',
					},
				}),
					o.push(...r(t));
			} catch (f) {
				if (f.status === Vt) throw f;
				(s = 1), o.push(...r(t));
			}
		}
		return { completedStatusCode: s, completedTasks: o };
	};
}
function HI(r) {
	let e = [];
	return (
		r.forEach((t) => {
			let n = e.find(
				(i) => i.target === t.target && i.configuration === t.configuration,
			);
			n
				? n.projects.push(t.projectName)
				: e.push({
						target: t.target,
						projects: [t.projectName],
						params: t.params,
						configuration: t.configuration,
				  });
		}),
		e
	);
}
function zI() {
	return (r) => {
		let e = `Command execution failed (distributed task execution: ${r}). Tasks hashes haven't been recorded.`,
			t;
		try {
			let n = `${$I}/tasks-hashes-${r}`;
			(t = JSON.parse((0, ea.readFileSync)(n).toString())),
				(0, ea.unlinkSync)(n);
		} catch {
			throw new Error(e);
		}
		if (t.length == 0) throw new Error(e);
		return t;
	};
}
var wv,
	ea,
	GI,
	$I,
	xv = B(() => {
		'use strict';
		(wv = require('child_process')), (ea = require('fs'));
		oe();
		({ output: GI } = J()), ({ cacheDirectory: $I } = pt());
	});
var Df = {};
At(Df, { startAgent: () => XI });
async function XI() {
	let r = Re(),
		e = Fe(),
		t = je(),
		n = we();
	yr(e, t) || (Er(), process.exit(1)),
		gr.targets && gr.targets.length
			? Gi.note({
					title: `Starting an agent for running Nx target(s) [${gr.targets.join(
						', ',
					)}]`,
			  })
			: Gi.note({ title: 'Starting an agent for running Nx tasks' });
	let { nxJson: i, nxCloudOptions: s } = et();
	function o() {
		var b;
		let y = (b = i.tasksRunnerOptions) == null ? void 0 : b.default;
		return i.nxCloudAccessToken && !y
			? !0
			: (!(y != null && y.runner) && i.nxCloudAccessToken) ||
					(y == null ? void 0 : y.runner) === 'nx-cloud' ||
					(y == null ? void 0 : y.runner) === '@nrwl/nx-cloud';
	}
	if (!o()) return av(), process.exit(1);
	(await Di(s)) ||
		(Gi.error({
			title: 'Nx Cloud: Workspace is disabled',
			bodyLines: [
				'Distributed Task Execution is disabled when your workspace is disabled',
				'',
				"Organization administrators can find more information on the 'Billing and Plans' page in the Nx Cloud Webapp",
			],
		}),
		process.exit(1));
	let c = KI(),
		l = new Zo(s, r, e, t, n, c);
	YI(l, s, c);
	let u = new Yt(Sr || s.encryptionKey),
		f = new Kt(s),
		h = new jn(new ur(u, f, s, 'dte-agent'), Tv),
		d = WI ? await bv(s) : await Rv();
	return fv(c, l, h, d, gr.targets)
		.then(async (y) => (await rn(s), y))
		.catch(async (y) => {
			throw (
				(await l.completeRunGroupWithError(
					`Critical Error in Agent: "${y.message}"`,
				),
				y)
			);
		});
}
function KI() {
	return process.env.NX_AGENT_NAME !== void 0
		? process.env.NX_AGENT_NAME
		: process.env.CIRCLECI !== void 0 && process.env.CIRCLE_STAGE
		? process.env.CIRCLE_STAGE
		: process.env.CIRCLECI !== void 0 && process.env.CIRCLE_JOB
		? process.env.CIRCLE_JOB
		: `Agent ${Math.floor(Math.random() * 1e5)}`;
}
function YI(r, e, t) {
	let n = `${Tv}/lockfiles`,
		i = `${n}/${t}.lock`;
	(0, yt.existsSync)(n) || (0, yt.mkdirSync)(n, { recursive: !0 });
	let s = (0, yt.readdirSync)(n);
	s.length &&
		(s.includes(`${t}.lock`) &&
			(Gi.error({
				title: 'Duplicate Agent ID Detected',
				bodyLines: [
					'We have detected another agent with this ID running in this workspace. This should not happen.',
					'',
					'End all currently running agents, run "npx nx-cloud clean-up-agents", and try again.',
				],
			}),
			process.exit(1)),
		Gi.warn({
			title: 'Other Nx Cloud Agents Detected',
			bodyLines: [
				'We have detected other agents running in this workspace. This can cause unexpected behavior.',
				'',
				'This can also be a false positive caused by agents that did not shut down correctly.',
				'If you believe this is the case, run "npx nx-cloud clean-up-agents".',
			],
		})),
		(0, yt.writeFileSync)(i, ''),
		process.on('exit', (o) => {
			Nf(i, o);
		}),
		process.on('SIGTERM', async () => {
			await r.completeRunGroupWithError('Agent was terminated via SIGTERM'),
				Nf(i, 1);
		}),
		process.on('SIGINT', async () => {
			await r.completeRunGroupWithError('Agent was terminated via SIGINT'),
				Nf(i, 1);
		});
}
function Nf(r, e) {
	(0, yt.existsSync)(r) && ((0, yt.unlinkSync)(r), process.exit(e));
}
var yt,
	VI,
	YL,
	Gi,
	JL,
	WI,
	Tv,
	gr,
	kf = B(() => {
		'use strict';
		yt = require('fs');
		ff();
		oe();
		br();
		jl();
		Dt();
		ms();
		cv();
		Mi();
		ys();
		go();
		lv();
		hv();
		Sv();
		xv();
		(VI = Qo()),
			(YL = zi()),
			({ output: Gi, workspaceRoot: JL } = J()),
			({ initTasksRunner: WI, cacheDirectory: Tv } = pt()),
			(gr = VI(process.argv, { array: ['targets'], default: {} }));
		gr.targets &&
			gr.targets.length === 1 &&
			(gr.targets = gr.targets[0].split(',').map((r) => r.trim()));
	});
var Ov,
	$n,
	Lf = B(() => {
		'use strict';
		_t();
		Ro();
		Dt();
		({ output: Ov } = J()),
			($n = class {
				constructor(e) {
					this.apiAxiosInstance = Te(e);
				}
				async createRunGroup(e, t, n, i, s, o, a, c, l) {
					var f;
					let u = Oe('createRunGroup');
					try {
						let h = await ce(() =>
							this.apiAxiosInstance.post(
								'/nx-cloud/executions/create-run-group',
								{
									branch: e,
									runGroup: t,
									ciExecutionId: n,
									ciExecutionEnv: i,
									stopAgentsOnFailure: s,
									agentCount: o,
									stopAgentsAfter: a,
									commitSha: c,
									vcsContext: fr(),
								},
							),
						);
						u.recordMetric(re(h));
					} catch (h) {
						u.recordMetric(
							(f = h == null ? void 0 : h.axiosException) != null && f.response
								? re(h.axiosException.response)
								: Ce,
						),
							Ov.error({ title: h.message }),
							process.exit(1);
					}
				}
				async completeRunGroup(e, t, n, i) {
					var o;
					let s = Oe('completeRunGroup');
					try {
						let a = await ce(() =>
							this.apiAxiosInstance.post(
								'/nx-cloud/executions/complete-run-group',
								{
									branch: e,
									runGroup: t,
									ciExecutionId: n,
									ciExecutionEnv: i,
									vcsContext: fr(),
								},
							),
						);
						s.recordMetric(re(a));
					} catch (a) {
						s.recordMetric(
							(o = a == null ? void 0 : a.axiosException) != null && o.response
								? re(a.axiosException.response)
								: Ce,
						),
							Ov.error({ title: a.message }),
							process.exit(1);
					}
				}
			});
	});
var Pf = {};
At(Pf, { startCiRun: () => ZI });
async function ZI() {
	let r = Re(),
		e = Fe(),
		t = je(),
		n = we(),
		i = tt(),
		s = Xi();
	yr(e, t) || (Er(), process.exit(1)),
		M &&
			Cv.note({
				title: `Creating run group. branch: ${r}, ciExecutionId: ${t}, ciExecutionEnv: ${n}, runGroup: ${e}, commitSha: ${i}`,
			}),
		$i.commandCount &&
			(Cv.error({
				title:
					'--command-count is deprecated. Use --stop-agents-after instead.',
				bodyLines: [
					'E.g., npx nx-cloud start-ci-run --stop-agents-after="e2e"',
				],
			}),
			process.exit(1));
	let { nxCloudOptions: o } = et();
	await new $n(o).createRunGroup(
		r,
		e,
		t,
		n,
		$i.stopAgentsOnFailure,
		$i.agentCount,
		$i.stopAgentsAfter,
		i,
		s,
	),
		$i.useDteByDefault && v_();
}
var JI,
	Cv,
	aP,
	$i,
	Ff = B(() => {
		'use strict';
		Bl();
		oe();
		br();
		Lf();
		Mi();
		(JI = Qo()),
			({ output: Cv, workspaceRoot: aP } = J()),
			($i = JI(process.argv, {
				boolean: ['stop-agents-on-failure', 'use-dte-by-default'],
				number: ['agent-count', 'command-count'],
				string: ['stop-agents-after'],
				default: { useDteByDefault: !0 },
			}));
	});
var ta = {};
At(ta, { stopAllAgents: () => eA });
async function eA() {
	let r = Re(),
		e = Fe(),
		t = je(),
		n = we();
	yr(e, t) || (Er(), process.exit(1)),
		M &&
			QI.note({
				title: `Stopping all agents running tasks for run group. branch: ${r}, ciExecutionId: ${t}, ciExecutionEnv: ${n}, runGroup: ${e}`,
			});
	let { nxCloudOptions: i } = et();
	await new $n(i).completeRunGroup(r, e, t, n);
}
var QI,
	ra = B(() => {
		'use strict';
		oe();
		br();
		Lf();
		Mi();
		({ output: QI } = J());
	});
var qf = E((hP, Av) => {
	'use strict';
	var Iv = require('fs'),
		Mf;
	function tA() {
		try {
			return Iv.statSync('/.dockerenv'), !0;
		} catch {
			return !1;
		}
	}
	function rA() {
		try {
			return Iv.readFileSync('/proc/self/cgroup', 'utf8').includes('docker');
		} catch {
			return !1;
		}
	}
	Av.exports = () => (Mf === void 0 && (Mf = tA() || rA()), Mf);
});
var kv = E((dP, Uf) => {
	'use strict';
	var nA = require('os'),
		iA = require('fs'),
		Nv = qf(),
		Dv = () => {
			if (process.platform !== 'linux') return !1;
			if (nA.release().toLowerCase().includes('microsoft')) return !Nv();
			try {
				return iA
					.readFileSync('/proc/version', 'utf8')
					.toLowerCase()
					.includes('microsoft')
					? !Nv()
					: !1;
			} catch {
				return !1;
			}
		};
	process.env.__IS_WSL_TEST__ ? (Uf.exports = Dv) : (Uf.exports = Dv());
});
var Pv = E((pP, Lv) => {
	'use strict';
	Lv.exports = (r, e, t) => {
		let n = (i) =>
			Object.defineProperty(r, e, { value: i, enumerable: !0, writable: !0 });
		return (
			Object.defineProperty(r, e, {
				configurable: !0,
				enumerable: !0,
				get() {
					let i = t();
					return n(i), i;
				},
				set(i) {
					n(i);
				},
			}),
			r
		);
	};
});
var Gv = E((mP, jv) => {
	var sA = require('path'),
		oA = require('child_process'),
		{ promises: ia, constants: Bv } = require('fs'),
		na = kv(),
		aA = qf(),
		jf = Pv(),
		Fv = sA.join(__dirname, 'xdg-open'),
		{ platform: Hn, arch: Mv } = process,
		cA = () => {
			try {
				return ia.statSync('/run/.containerenv'), !0;
			} catch {
				return !1;
			}
		},
		Bf;
	function uA() {
		return Bf === void 0 && (Bf = cA() || aA()), Bf;
	}
	var lA = (() => {
			let r = '/mnt/',
				e;
			return async function () {
				if (e) return e;
				let t = '/etc/wsl.conf',
					n = !1;
				try {
					await ia.access(t, Bv.F_OK), (n = !0);
				} catch {}
				if (!n) return r;
				let i = await ia.readFile(t, { encoding: 'utf8' }),
					s = /(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(i);
				return s
					? ((e = s.groups.mountPoint.trim()),
					  (e = e.endsWith('/') ? e : `${e}/`),
					  e)
					: r;
			};
		})(),
		qv = async (r, e) => {
			let t;
			for (let n of r)
				try {
					return await e(n);
				} catch (i) {
					t = i;
				}
			throw t;
		},
		sa = async (r) => {
			if (
				((r = {
					wait: !1,
					background: !1,
					newInstance: !1,
					allowNonzeroExitCode: !1,
					...r,
				}),
				Array.isArray(r.app))
			)
				return qv(r.app, (a) => sa({ ...r, app: a }));
			let { name: e, arguments: t = [] } = r.app || {};
			if (((t = [...t]), Array.isArray(e)))
				return qv(e, (a) => sa({ ...r, app: { name: a, arguments: t } }));
			let n,
				i = [],
				s = {};
			if (Hn === 'darwin')
				(n = 'open'),
					r.wait && i.push('--wait-apps'),
					r.background && i.push('--background'),
					r.newInstance && i.push('--new'),
					e && i.push('-a', e);
			else if (Hn === 'win32' || (na && !uA() && !e)) {
				let a = await lA();
				(n = na
					? `${a}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`
					: `${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`),
					i.push(
						'-NoProfile',
						'-NonInteractive',
						'\u2013ExecutionPolicy',
						'Bypass',
						'-EncodedCommand',
					),
					na || (s.windowsVerbatimArguments = !0);
				let c = ['Start'];
				r.wait && c.push('-Wait'),
					e
						? (c.push(`"\`"${e}\`""`, '-ArgumentList'),
						  r.target && t.unshift(r.target))
						: r.target && c.push(`"${r.target}"`),
					t.length > 0 &&
						((t = t.map((l) => `"\`"${l}\`""`)), c.push(t.join(','))),
					(r.target = Buffer.from(c.join(' '), 'utf16le').toString('base64'));
			} else {
				if (e) n = e;
				else {
					let a = !__dirname || __dirname === '/',
						c = !1;
					try {
						await ia.access(Fv, Bv.X_OK), (c = !0);
					} catch {}
					n =
						process.versions.electron || Hn === 'android' || a || !c
							? 'xdg-open'
							: Fv;
				}
				t.length > 0 && i.push(...t),
					r.wait || ((s.stdio = 'ignore'), (s.detached = !0));
			}
			r.target && i.push(r.target),
				Hn === 'darwin' && t.length > 0 && i.push('--args', ...t);
			let o = oA.spawn(n, i, s);
			return r.wait
				? new Promise((a, c) => {
						o.once('error', c),
							o.once('close', (l) => {
								if (!r.allowNonzeroExitCode && l > 0) {
									c(new Error(`Exited with code ${l}`));
									return;
								}
								a(o);
							});
				  })
				: (o.unref(), o);
		},
		Gf = (r, e) => {
			if (typeof r != 'string') throw new TypeError('Expected a `target`');
			return sa({ ...e, target: r });
		},
		fA = (r, e) => {
			if (typeof r != 'string') throw new TypeError('Expected a `name`');
			let { arguments: t = [] } = e || {};
			if (t != null && !Array.isArray(t))
				throw new TypeError('Expected `appArguments` as Array type');
			return sa({ ...e, app: { name: r, arguments: t } });
		};
	function Uv(r) {
		if (typeof r == 'string' || Array.isArray(r)) return r;
		let { [Mv]: e } = r;
		if (!e) throw new Error(`${Mv} is not supported`);
		return e;
	}
	function $f({ [Hn]: r }, { wsl: e }) {
		if (e && na) return Uv(e);
		if (!r) throw new Error(`${Hn} is not supported`);
		return Uv(r);
	}
	var oa = {};
	jf(oa, 'chrome', () =>
		$f(
			{
				darwin: 'google chrome',
				win32: 'chrome',
				linux: ['google-chrome', 'google-chrome-stable', 'chromium'],
			},
			{
				wsl: {
					ia32: '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',
					x64: [
						'/mnt/c/Program Files/Google/Chrome/Application/chrome.exe',
						'/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',
					],
				},
			},
		),
	);
	jf(oa, 'firefox', () =>
		$f(
			{
				darwin: 'firefox',
				win32: 'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
				linux: 'firefox',
			},
			{ wsl: '/mnt/c/Program Files/Mozilla Firefox/firefox.exe' },
		),
	);
	jf(oa, 'edge', () =>
		$f(
			{
				darwin: 'microsoft edge',
				win32: 'msedge',
				linux: ['microsoft-edge', 'microsoft-edge-dev'],
			},
			{
				wsl: '/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
			},
		),
	);
	Gf.apps = oa;
	Gf.openApp = fA;
	jv.exports = Gf;
});
function $v() {
	let { output: r } = J();
	r.error({
		title: 'Connections to Nx Cloud are disabled for this workspace',
		bodyLines: [
			'This was an intentional decision by someone on your team.',
			'Nx Cloud cannot and will not be enabled.',
			'',
			"To allow connections to Nx Cloud again, remove the 'neverConnectToCloud'",
			'property in nx.json.',
		],
	});
}
var Hv = B(() => {
	'use strict';
});
var Hf = {};
At(Hf, { uploadAndShowRunDetails: () => pA });
async function dA(r) {
	let e = new In(r),
		t = {},
		n = Yr(),
		i = new Nn(e, t, r, n),
		s = new lr(r.maskedProperties),
		o = JSON.parse(
			(0, Vv.readFileSync)((0, Xv.join)(zv, 'run.json')).toString(),
		),
		a = o.tasks.map((l) => ({
			...l,
			terminalOutput: bo(zv, s, l.hash, l.cacheStatus, l.status),
		})),
		c = To();
	return (
		await i.endRun(
			o.run,
			a,
			{
				branch: null,
				runGroup: null,
				ciExecutionId: null,
				ciExecutionEnv: null,
			},
			c,
		),
		`${ps(r.url || 'https://nx.app')}/runs/${c}`
	);
}
async function pA() {
	let { nxJson: r, nxCloudOptions: e } = et();
	r.neverConnectToCloud && ($v(), process.exit(1));
	let t = await dA(e);
	hA.success({
		title: 'Successfully uploaded the run details',
		bodyLines: [`View run details at ${t}`],
	}),
		(0, Wv.default)(t);
}
var Vv,
	Wv,
	Xv,
	hA,
	zv,
	zf = B(() => {
		'use strict';
		(Vv = require('fs')), (Wv = Wr(Gv())), (Xv = require('path'));
		oe();
		br();
		Hv();
		Ja();
		Bu();
		ju();
		Nu();
		vo();
		Fu();
		({ output: hA } = J()), ({ cacheDirectory: zv } = pt());
	});
exports.nxCloudTasksRunner = (...r) => (ev(), _e(Q_)).default(...r);
exports.configureLightClientRequire = () =>
	(Xr(), _e(Jf)).configureLightClientRequire;
var mA = {
	'clean-up-agents': () => (wf(), _e(Sf)).cleanUpAgents(),
	record: () => (xf(), _e(Rf)).runCommandAndStoreInCloud(),
	'start-agent': () => (kf(), _e(Df)).startAgent(),
	'start-ci-run': () => (Ff(), _e(Pf)).startCiRun(),
	'stop-all-agents': () => (ra(), _e(ta)).stopAllAgents(),
	'complete-run-group': () => (ra(), _e(ta)).stopAllAgents(),
	'upload-and-show-run-details': () => (zf(), _e(Hf)).uploadAndShowRunDetails(),
};
exports.commands = mA;
exports.cleanUpAgents = () => (wf(), _e(Sf)).cleanUpAgents();
exports.runCommandAndStoreInCloud = () =>
	(xf(), _e(Rf)).runCommandAndStoreInCloud();
exports.startAgent = () => (kf(), _e(Df)).startAgent();
exports.startCiRun = () => (Ff(), _e(Pf)).startCiRun();
exports.stopAllAgents = () => (ra(), _e(ta)).stopAllAgents();
exports.uploadAndShowRunDetails = () =>
	(zf(), _e(Hf)).uploadAndShowRunDetails();
