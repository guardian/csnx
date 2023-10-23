'use strict';
var pf = Object.create;
var Jr = Object.defineProperty;
var mf = Object.getOwnPropertyDescriptor;
var Ef = Object.getOwnPropertyNames;
var yf = Object.getPrototypeOf,
	_f = Object.prototype.hasOwnProperty;
var ee = (r, e) => () => (r && (e = r((r = 0))), e);
var E = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports),
	Pe = (r, e) => {
		for (var t in e) Jr(r, t, { get: e[t], enumerable: !0 });
	},
	ia = (r, e, t, s) => {
		if ((e && typeof e == 'object') || typeof e == 'function')
			for (let i of Ef(e))
				!_f.call(r, i) &&
					i !== t &&
					Jr(r, i, {
						get: () => e[i],
						enumerable: !(s = mf(e, i)) || s.enumerable,
					});
		return r;
	};
var Rf = (r, e, t) => (
		(t = r != null ? pf(yf(r)) : {}),
		ia(
			e || !r || !r.__esModule
				? Jr(t, 'default', { value: r, enumerable: !0 })
				: t,
			r,
		)
	),
	ke = (r) => ia(Jr({}, '__esModule', { value: !0 }), r);
var na = {};
Pe(na, {
	configureLightClientRequire: () => gf,
	configuredPaths: () => vi,
	lightClientRequire: () => F,
});
function gf(r) {
	(vi = r),
		(F = function (e) {
			if (vi.length === 0)
				throw new Error(
					'Light client require must have paths configured with `configureLightClientRequire`.',
				);
			let t;
			try {
				t = require.resolve(e, { paths: r });
			} catch (s) {
				throw (
					(process.env.NX_VERBOSE_LOGGING === 'true' &&
						console.error(
							`Was not able to require.resolve module ${e} from the following paths: ${r}. This may be expected.`,
						),
					s)
				);
			}
			try {
				return require(t);
			} catch (s) {
				throw (
					(process.env.NX_VERBOSE_LOGGING === 'true' &&
						console.error(
							`Was not able require module ${e} from path ${t}. This may be expected. `,
						),
					s)
				);
			}
		});
}
var F,
	vi,
	Rr = ee(() => {
		'use strict';
		vi = [];
	});
var oa = E((te) => {
	'use strict';
	var Ci = require('path');
	Rr();
	try {
		try {
			let r;
			try {
				r = F('nx/src/utils/app-root').workspaceRoot;
			} catch {
				r = F('nx/src/utils/workspace-root').workspaceRoot;
			}
			let { getDependencyConfigs: e } = F('nx/src/tasks-runner/utils'),
				t = F('nx/tasks-runners/default').default,
				{ CompositeLifeCycle: s } = F('nx/src/tasks-runner/life-cycle'),
				i = null;
			try {
				i = F('nx/src/index').initTasksRunner;
			} catch {}
			let n;
			try {
				n = F('nx/src/devkit-exports').cacheDir;
			} catch {
				try {
					n = F('nx/src/utils/cache-directory').cacheDir;
				} catch {
					n = (0, Ci.join)(r, './node_modules/.cache/nx');
				}
			}
			let o = F('nx/src/tasks-runner/utils').isCacheableTask;
			(te.cacheDirectory = n),
				(te.runnerReturnsPromise = !0),
				(te.tasksRunner = t),
				(te.CompositeLifeCycle = s),
				(te.getDependencyConfigs = e),
				(te.initTasksRunner = i),
				(te.isCacheableTask = o);
		} catch {
			let { appRootPath: e } = F('@nrwl/tao/src/utils/app-root'),
				{ getDependencyConfigs: t } = F(
					'@nrwl/workspace/src/tasks-runner/utils',
				),
				{ tasksRunnerV2: s } = F(
					'@nrwl/workspace/src/tasks-runner/tasks-runner-v2',
				),
				i;
			try {
				i = F('@nrwl/workspace/src/tasks-runner/life-cycle').CompositeLifeCycle;
			} catch {}
			let n = F('@nrwl/workspace/src/tasks-runner/utils').isCacheableTask;
			(te.cacheDirectory = (0, Ci.join)(e, './node_modules/.cache/nx')),
				(te.runnerReturnsPromise = !1),
				(te.tasksRunner = s),
				(te.CompositeLifeCycle = i),
				(te.getDependencyConfigs = t),
				(te.initTasksRunner = null),
				(te.isCacheableTask = n);
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
function aa() {
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
var ca = ee(() => {
	'use strict';
});
var ha = E((Oy, la) => {
	'use strict';
	var wi = Symbol('singleComment'),
		ua = Symbol('multiComment'),
		vf = () => '',
		Cf = (r, e, t) => r.slice(e, t).replace(/\S/g, ' '),
		wf = (r, e) => {
			let t = e - 1,
				s = 0;
			for (; r[t] === '\\'; ) (t -= 1), (s += 1);
			return !!(s % 2);
		};
	la.exports = (r, e = {}) => {
		if (typeof r != 'string')
			throw new TypeError(
				`Expected argument \`jsonString\` to be a \`string\`, got \`${typeof r}\``,
			);
		let t = e.whitespace === !1 ? vf : Cf,
			s = !1,
			i = !1,
			n = 0,
			o = '';
		for (let a = 0; a < r.length; a++) {
			let c = r[a],
				u = r[a + 1];
			if ((!i && c === '"' && (wf(r, a) || (s = !s)), !s)) {
				if (!i && c + u === '//') (o += r.slice(n, a)), (n = a), (i = wi), a++;
				else if (
					i === wi &&
					c + u ===
						`\r
`
				) {
					a++, (i = !1), (o += t(r, n, a)), (n = a);
					continue;
				} else if (
					i === wi &&
					c ===
						`
`
				)
					(i = !1), (o += t(r, n, a)), (n = a);
				else if (!i && c + u === '/*') {
					(o += r.slice(n, a)), (n = a), (i = ua), a++;
					continue;
				} else if (i === ua && c + u === '*/') {
					a++, (i = !1), (o += t(r, n, a + 1)), (n = a + 1);
					continue;
				}
			}
		}
		return o + (i ? t(r.slice(n)) : r.slice(n));
	};
});
var qe = E((ft) => {
	'use strict';
	Rr();
	try {
		try {
			let { output: r } = F('nx/src/utils/output'),
				e;
			try {
				e = F('nx/src/utils/app-root').workspaceRoot;
			} catch {
				e = F('nx/src/utils/workspace-root').workspaceRoot;
			}
			(ft.workspaceRoot = e), (ft.output = r);
		} catch {
			let { output: e } = F('@nrwl/workspace/src/utilities/output'),
				{ appRootPath: t } = F('@nrwl/tao/src/utils/app-root');
			(ft.workspaceRoot = t), (ft.output = e);
		}
	} catch {
		let e = (t) => {
			var s;
			return `${t.title}

${
	(s = t.bodyLines) == null
		? void 0
		: s.join(`
`)
}`;
		};
		(ft.output = {
			note: (t) => console.info(e(t)),
			error: (t) => console.error(e(t)),
			warn: (t) => console.warn(e(t)),
			success: (t) => console.log(e(t)),
			addVerticalSeparator: () => '',
			addNewline: () =>
				console.log(`
`),
		}),
			(ft.workspaceRoot = process.cwd());
	}
});
function da() {
	var s, i;
	let r = JSON.parse(Sf((0, fa.readFileSync)(`${Tf}/nx.json`).toString())),
		e = {},
		t = [];
	for (let n in r.targetDefaults) r.targetDefaults[n].cache && t.push(n);
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
				...((i = (s = r.tasksRunnerOptions) == null ? void 0 : s.default) ==
				null
					? void 0
					: i.options),
			},
		}
	);
}
var fa,
	Sf,
	Tf,
	pa = ee(() => {
		'use strict';
		(fa = require('fs')), (Sf = ha()), ({ workspaceRoot: Tf } = qe());
	});
function Ut() {
	let { nxCloudOptions: r } = da();
	return !r.url || r.useLatestApi
		? !1
		: r.url.endsWith('snapshot.nx.app')
		? !0
		: !(r.url.endsWith('.nx.app') || r.url.indexOf('localhost') > -1);
}
var Si = ee(() => {
	'use strict';
	pa();
});
var _a = E((Ly, Ti) => {
	var Of = require('fs'),
		ma = require('path'),
		xf = require('os');
	function Ea(r) {
		console.log(`[dotenv][DEBUG] ${r}`);
	}
	var bf = `
`,
		If = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,
		Nf = /\\n/g,
		Af = /\r\n|\n|\r/;
	function ya(r, e) {
		let t = !!(e && e.debug),
			s = {};
		return (
			r
				.toString()
				.split(Af)
				.forEach(function (i, n) {
					let o = i.match(If);
					if (o != null) {
						let a = o[1],
							c = o[2] || '',
							u = c.length - 1,
							l = c[0] === '"' && c[u] === '"';
						(c[0] === "'" && c[u] === "'") || l
							? ((c = c.substring(1, u)), l && (c = c.replace(Nf, bf)))
							: (c = c.trim()),
							(s[a] = c);
					} else t && Ea(`did not match key and value when parsing line ${n + 1}: ${i}`);
				}),
			s
		);
	}
	function Lf(r) {
		return r[0] === '~' ? ma.join(xf.homedir(), r.slice(1)) : r;
	}
	function Df(r) {
		let e = ma.resolve(process.cwd(), '.env'),
			t = 'utf8',
			s = !1;
		r &&
			(r.path != null && (e = Lf(r.path)),
			r.encoding != null && (t = r.encoding),
			r.debug != null && (s = !0));
		try {
			let i = ya(Of.readFileSync(e, { encoding: t }), { debug: s });
			return (
				Object.keys(i).forEach(function (n) {
					Object.prototype.hasOwnProperty.call(process.env, n)
						? s &&
						  Ea(
								`"${n}" is already defined in \`process.env\` and will not be overwritten`,
						  )
						: (process.env[n] = i[n]);
				}),
				{ parsed: i }
			);
		} catch (i) {
			return { error: i };
		}
	}
	Ti.exports.config = Df;
	Ti.exports.parse = ya;
});
var Ra = E((gr, Oi) => {
	(function (r, e) {
		typeof gr == 'object' && typeof Oi == 'object'
			? (Oi.exports = e(require('child_process'), require('crypto')))
			: typeof define == 'function' && define.amd
			? define(['child_process', 'crypto'], e)
			: typeof gr == 'object'
			? (gr['electron-machine-id'] = e(
					require('child_process'),
					require('crypto'),
			  ))
			: (r['electron-machine-id'] = e(r.child_process, r.crypto));
	})(gr, function (r, e) {
		return (function (t) {
			function s(n) {
				if (i[n]) return i[n].exports;
				var o = (i[n] = { exports: {}, id: n, loaded: !1 });
				return (
					t[n].call(o.exports, o, o.exports, s), (o.loaded = !0), o.exports
				);
			}
			var i = {};
			return (s.m = t), (s.c = i), (s.p = ''), s(0);
		})([
			function (t, s, i) {
				t.exports = i(34);
			},
			function (t, s, i) {
				var n = i(29)('wks'),
					o = i(33),
					a = i(2).Symbol,
					c = typeof a == 'function',
					u = (t.exports = function (l) {
						return n[l] || (n[l] = (c && a[l]) || (c ? a : o)('Symbol.' + l));
					});
				u.store = n;
			},
			function (t, s) {
				var i = (t.exports =
					typeof window < 'u' && window.Math == Math
						? window
						: typeof self < 'u' && self.Math == Math
						? self
						: Function('return this')());
				typeof __g == 'number' && (__g = i);
			},
			function (t, s, i) {
				var n = i(9);
				t.exports = function (o) {
					if (!n(o)) throw TypeError(o + ' is not an object!');
					return o;
				};
			},
			function (t, s, i) {
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
			function (t, s, i) {
				var n = i(12),
					o = i(17);
				t.exports = i(4)
					? function (a, c, u) {
							return n.f(a, c, o(1, u));
					  }
					: function (a, c, u) {
							return (a[c] = u), a;
					  };
			},
			function (t, s) {
				var i = (t.exports = { version: '2.4.0' });
				typeof __e == 'number' && (__e = i);
			},
			function (t, s, i) {
				var n = i(14);
				t.exports = function (o, a, c) {
					if ((n(o), a === void 0)) return o;
					switch (c) {
						case 1:
							return function (u) {
								return o.call(a, u);
							};
						case 2:
							return function (u, l) {
								return o.call(a, u, l);
							};
						case 3:
							return function (u, l, h) {
								return o.call(a, u, l, h);
							};
					}
					return function () {
						return o.apply(a, arguments);
					};
				};
			},
			function (t, s) {
				var i = {}.hasOwnProperty;
				t.exports = function (n, o) {
					return i.call(n, o);
				};
			},
			function (t, s) {
				t.exports = function (i) {
					return typeof i == 'object' ? i !== null : typeof i == 'function';
				};
			},
			function (t, s) {
				t.exports = {};
			},
			function (t, s) {
				var i = {}.toString;
				t.exports = function (n) {
					return i.call(n).slice(8, -1);
				};
			},
			function (t, s, i) {
				var n = i(3),
					o = i(26),
					a = i(32),
					c = Object.defineProperty;
				s.f = i(4)
					? Object.defineProperty
					: function (u, l, h) {
							if ((n(u), (l = a(l, !0)), n(h), o))
								try {
									return c(u, l, h);
								} catch {}
							if ('get' in h || 'set' in h)
								throw TypeError('Accessors not supported!');
							return 'value' in h && (u[l] = h.value), u;
					  };
			},
			function (t, s, i) {
				var n = i(42),
					o = i(15);
				t.exports = function (a) {
					return n(o(a));
				};
			},
			function (t, s) {
				t.exports = function (i) {
					if (typeof i != 'function')
						throw TypeError(i + ' is not a function!');
					return i;
				};
			},
			function (t, s) {
				t.exports = function (i) {
					if (i == null) throw TypeError("Can't call method on  " + i);
					return i;
				};
			},
			function (t, s, i) {
				var n = i(9),
					o = i(2).document,
					a = n(o) && n(o.createElement);
				t.exports = function (c) {
					return a ? o.createElement(c) : {};
				};
			},
			function (t, s) {
				t.exports = function (i, n) {
					return {
						enumerable: !(1 & i),
						configurable: !(2 & i),
						writable: !(4 & i),
						value: n,
					};
				};
			},
			function (t, s, i) {
				var n = i(12).f,
					o = i(8),
					a = i(1)('toStringTag');
				t.exports = function (c, u, l) {
					c &&
						!o((c = l ? c : c.prototype), a) &&
						n(c, a, { configurable: !0, value: u });
				};
			},
			function (t, s, i) {
				var n = i(29)('keys'),
					o = i(33);
				t.exports = function (a) {
					return n[a] || (n[a] = o(a));
				};
			},
			function (t, s) {
				var i = Math.ceil,
					n = Math.floor;
				t.exports = function (o) {
					return isNaN((o = +o)) ? 0 : (o > 0 ? n : i)(o);
				};
			},
			function (t, s, i) {
				var n = i(11),
					o = i(1)('toStringTag'),
					a =
						n(
							(function () {
								return arguments;
							})(),
						) == 'Arguments',
					c = function (u, l) {
						try {
							return u[l];
						} catch {}
					};
				t.exports = function (u) {
					var l, h, f;
					return u === void 0
						? 'Undefined'
						: u === null
						? 'Null'
						: typeof (h = c((l = Object(u)), o)) == 'string'
						? h
						: a
						? n(l)
						: (f = n(l)) == 'Object' && typeof l.callee == 'function'
						? 'Arguments'
						: f;
				};
			},
			function (t, s) {
				t.exports =
					'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
						',',
					);
			},
			function (t, s, i) {
				var n = i(2),
					o = i(6),
					a = i(7),
					c = i(5),
					u = 'prototype',
					l = function (h, f, d) {
						var p,
							y,
							_,
							g = h & l.F,
							T = h & l.G,
							S = h & l.S,
							w = h & l.P,
							A = h & l.B,
							v = h & l.W,
							L = T ? o : o[f] || (o[f] = {}),
							b = L[u],
							B = T ? n : S ? n[f] : (n[f] || {})[u];
						T && (d = f);
						for (p in d)
							(y = !g && B && B[p] !== void 0),
								(y && p in L) ||
									((_ = y ? B[p] : d[p]),
									(L[p] =
										T && typeof B[p] != 'function'
											? d[p]
											: A && y
											? a(_, n)
											: v && B[p] == _
											? (function (q) {
													var le = function (ie, H, Ee) {
														if (this instanceof q) {
															switch (arguments.length) {
																case 0:
																	return new q();
																case 1:
																	return new q(ie);
																case 2:
																	return new q(ie, H);
															}
															return new q(ie, H, Ee);
														}
														return q.apply(this, arguments);
													};
													return (le[u] = q[u]), le;
											  })(_)
											: w && typeof _ == 'function'
											? a(Function.call, _)
											: _),
									w &&
										(((L.virtual || (L.virtual = {}))[p] = _),
										h & l.R && b && !b[p] && c(b, p, _)));
					};
				(l.F = 1),
					(l.G = 2),
					(l.S = 4),
					(l.P = 8),
					(l.B = 16),
					(l.W = 32),
					(l.U = 64),
					(l.R = 128),
					(t.exports = l);
			},
			function (t, s) {
				t.exports = function (i) {
					try {
						return !!i();
					} catch {
						return !0;
					}
				};
			},
			function (t, s, i) {
				t.exports = i(2).document && document.documentElement;
			},
			function (t, s, i) {
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
			function (t, s, i) {
				'use strict';
				var n = i(28),
					o = i(23),
					a = i(57),
					c = i(5),
					u = i(8),
					l = i(10),
					h = i(45),
					f = i(18),
					d = i(52),
					p = i(1)('iterator'),
					y = !([].keys && 'next' in [].keys()),
					_ = '@@iterator',
					g = 'keys',
					T = 'values',
					S = function () {
						return this;
					};
				t.exports = function (w, A, v, L, b, B, q) {
					h(v, A, L);
					var le,
						ie,
						H,
						Ee = function (R) {
							if (!y && R in O) return O[R];
							switch (R) {
								case g:
									return function () {
										return new v(this, R);
									};
								case T:
									return function () {
										return new v(this, R);
									};
							}
							return function () {
								return new v(this, R);
							};
						},
						k = A + ' Iterator',
						we = b == T,
						ne = !1,
						O = w.prototype,
						W = O[p] || O[_] || (b && O[b]),
						z = W || Ee(b),
						Ie = b ? (we ? Ee('entries') : z) : void 0,
						m = (A == 'Array' && O.entries) || W;
					if (
						(m &&
							((H = d(m.call(new w()))),
							H !== Object.prototype &&
								(f(H, k, !0), n || u(H, p) || c(H, p, S))),
						we &&
							W &&
							W.name !== T &&
							((ne = !0),
							(z = function () {
								return W.call(this);
							})),
						(n && !q) || (!y && !ne && O[p]) || c(O, p, z),
						(l[A] = z),
						(l[k] = S),
						b)
					)
						if (
							((le = {
								values: we ? z : Ee(T),
								keys: B ? z : Ee(g),
								entries: Ie,
							}),
							q)
						)
							for (ie in le) ie in O || a(O, ie, le[ie]);
						else o(o.P + o.F * (y || ne), A, le);
					return le;
				};
			},
			function (t, s) {
				t.exports = !0;
			},
			function (t, s, i) {
				var n = i(2),
					o = '__core-js_shared__',
					a = n[o] || (n[o] = {});
				t.exports = function (c) {
					return a[c] || (a[c] = {});
				};
			},
			function (t, s, i) {
				var n,
					o,
					a,
					c = i(7),
					u = i(41),
					l = i(25),
					h = i(16),
					f = i(2),
					d = f.process,
					p = f.setImmediate,
					y = f.clearImmediate,
					_ = f.MessageChannel,
					g = 0,
					T = {},
					S = 'onreadystatechange',
					w = function () {
						var v = +this;
						if (T.hasOwnProperty(v)) {
							var L = T[v];
							delete T[v], L();
						}
					},
					A = function (v) {
						w.call(v.data);
					};
				(p && y) ||
					((p = function (v) {
						for (var L = [], b = 1; arguments.length > b; )
							L.push(arguments[b++]);
						return (
							(T[++g] = function () {
								u(typeof v == 'function' ? v : Function(v), L);
							}),
							n(g),
							g
						);
					}),
					(y = function (v) {
						delete T[v];
					}),
					i(11)(d) == 'process'
						? (n = function (v) {
								d.nextTick(c(w, v, 1));
						  })
						: _
						? ((o = new _()),
						  (a = o.port2),
						  (o.port1.onmessage = A),
						  (n = c(a.postMessage, a, 1)))
						: f.addEventListener &&
						  typeof postMessage == 'function' &&
						  !f.importScripts
						? ((n = function (v) {
								f.postMessage(v + '', '*');
						  }),
						  f.addEventListener('message', A, !1))
						: (n =
								S in h('script')
									? function (v) {
											l.appendChild(h('script'))[S] = function () {
												l.removeChild(this), w.call(v);
											};
									  }
									: function (v) {
											setTimeout(c(w, v, 1), 0);
									  })),
					(t.exports = { set: p, clear: y });
			},
			function (t, s, i) {
				var n = i(20),
					o = Math.min;
				t.exports = function (a) {
					return a > 0 ? o(n(a), 9007199254740991) : 0;
				};
			},
			function (t, s, i) {
				var n = i(9);
				t.exports = function (o, a) {
					if (!n(o)) return o;
					var c, u;
					if (
						(a &&
							typeof (c = o.toString) == 'function' &&
							!n((u = c.call(o)))) ||
						(typeof (c = o.valueOf) == 'function' && !n((u = c.call(o)))) ||
						(!a && typeof (c = o.toString) == 'function' && !n((u = c.call(o))))
					)
						return u;
					throw TypeError("Can't convert object to primitive value");
				};
			},
			function (t, s) {
				var i = 0,
					n = Math.random();
				t.exports = function (o) {
					return 'Symbol('.concat(
						o === void 0 ? '' : o,
						')_',
						(++i + n).toString(36),
					);
				};
			},
			function (t, s, i) {
				'use strict';
				function n(S) {
					return S && S.__esModule ? S : { default: S };
				}
				function o() {
					return process.platform !== 'win32'
						? ''
						: process.arch === 'ia32' &&
						  process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432')
						? 'mixed'
						: 'native';
				}
				function a(S) {
					return (0, p.createHash)('sha256').update(S).digest('hex');
				}
				function c(S) {
					switch (_) {
						case 'darwin':
							return S.split('IOPlatformUUID')[1]
								.split(
									`
`,
								)[0]
								.replace(/\=|\s+|\"/gi, '')
								.toLowerCase();
						case 'win32':
							return S.toString()
								.split('REG_SZ')[1]
								.replace(/\r+|\n+|\s+/gi, '')
								.toLowerCase();
						case 'linux':
							return S.toString()
								.replace(/\r+|\n+|\s+/gi, '')
								.toLowerCase();
						case 'freebsd':
							return S.toString()
								.replace(/\r+|\n+|\s+/gi, '')
								.toLowerCase();
						default:
							throw new Error('Unsupported platform: ' + process.platform);
					}
				}
				function u(S) {
					var w = c((0, d.execSync)(T[_]).toString());
					return S ? w : a(w);
				}
				function l(S) {
					return new f.default(function (w, A) {
						return (0, d.exec)(T[_], {}, function (v, L, b) {
							if (v)
								return A(
									new Error('Error while obtaining machine id: ' + v.stack),
								);
							var B = c(L.toString());
							return w(S ? B : a(B));
						});
					});
				}
				Object.defineProperty(s, '__esModule', { value: !0 });
				var h = i(35),
					f = n(h);
				(s.machineIdSync = u), (s.machineId = l);
				var d = i(70),
					p = i(71),
					y = process,
					_ = y.platform,
					g = {
						native: '%windir%\\System32',
						mixed: '%windir%\\sysnative\\cmd.exe /c %windir%\\System32',
					},
					T = {
						darwin: 'ioreg -rd1 -c IOPlatformExpertDevice',
						win32:
							g[o()] +
							'\\REG.exe QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid',
						linux:
							'( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :',
						freebsd: 'kenv -q smbios.system.uuid || sysctl -n kern.hostuuid',
					};
			},
			function (t, s, i) {
				t.exports = { default: i(36), __esModule: !0 };
			},
			function (t, s, i) {
				i(66), i(68), i(69), i(67), (t.exports = i(6).Promise);
			},
			function (t, s) {
				t.exports = function () {};
			},
			function (t, s) {
				t.exports = function (i, n, o, a) {
					if (!(i instanceof n) || (a !== void 0 && a in i))
						throw TypeError(o + ': incorrect invocation!');
					return i;
				};
			},
			function (t, s, i) {
				var n = i(13),
					o = i(31),
					a = i(62);
				t.exports = function (c) {
					return function (u, l, h) {
						var f,
							d = n(u),
							p = o(d.length),
							y = a(h, p);
						if (c && l != l) {
							for (; p > y; ) if (((f = d[y++]), f != f)) return !0;
						} else
							for (; p > y; y++)
								if ((c || y in d) && d[y] === l) return c || y || 0;
						return !c && -1;
					};
				};
			},
			function (t, d, i) {
				var n = i(7),
					o = i(44),
					a = i(43),
					c = i(3),
					u = i(31),
					l = i(64),
					h = {},
					f = {},
					d = (t.exports = function (p, y, _, g, T) {
						var S,
							w,
							A,
							v,
							L = T
								? function () {
										return p;
								  }
								: l(p),
							b = n(_, g, y ? 2 : 1),
							B = 0;
						if (typeof L != 'function')
							throw TypeError(p + ' is not iterable!');
						if (a(L)) {
							for (S = u(p.length); S > B; B++)
								if (
									((v = y ? b(c((w = p[B]))[0], w[1]) : b(p[B])),
									v === h || v === f)
								)
									return v;
						} else
							for (A = L.call(p); !(w = A.next()).done; )
								if (((v = o(A, b, w.value, y)), v === h || v === f)) return v;
					});
				(d.BREAK = h), (d.RETURN = f);
			},
			function (t, s) {
				t.exports = function (i, n, o) {
					var a = o === void 0;
					switch (n.length) {
						case 0:
							return a ? i() : i.call(o);
						case 1:
							return a ? i(n[0]) : i.call(o, n[0]);
						case 2:
							return a ? i(n[0], n[1]) : i.call(o, n[0], n[1]);
						case 3:
							return a ? i(n[0], n[1], n[2]) : i.call(o, n[0], n[1], n[2]);
						case 4:
							return a
								? i(n[0], n[1], n[2], n[3])
								: i.call(o, n[0], n[1], n[2], n[3]);
					}
					return i.apply(o, n);
				};
			},
			function (t, s, i) {
				var n = i(11);
				t.exports = Object('z').propertyIsEnumerable(0)
					? Object
					: function (o) {
							return n(o) == 'String' ? o.split('') : Object(o);
					  };
			},
			function (t, s, i) {
				var n = i(10),
					o = i(1)('iterator'),
					a = Array.prototype;
				t.exports = function (c) {
					return c !== void 0 && (n.Array === c || a[o] === c);
				};
			},
			function (t, s, i) {
				var n = i(3);
				t.exports = function (o, a, c, u) {
					try {
						return u ? a(n(c)[0], c[1]) : a(c);
					} catch (h) {
						var l = o.return;
						throw (l !== void 0 && n(l.call(o)), h);
					}
				};
			},
			function (t, s, i) {
				'use strict';
				var n = i(49),
					o = i(17),
					a = i(18),
					c = {};
				i(5)(c, i(1)('iterator'), function () {
					return this;
				}),
					(t.exports = function (u, l, h) {
						(u.prototype = n(c, { next: o(1, h) })), a(u, l + ' Iterator');
					});
			},
			function (t, s, i) {
				var n = i(1)('iterator'),
					o = !1;
				try {
					var a = [7][n]();
					(a.return = function () {
						o = !0;
					}),
						Array.from(a, function () {
							throw 2;
						});
				} catch {}
				t.exports = function (c, u) {
					if (!u && !o) return !1;
					var l = !1;
					try {
						var h = [7],
							f = h[n]();
						(f.next = function () {
							return { done: (l = !0) };
						}),
							(h[n] = function () {
								return f;
							}),
							c(h);
					} catch {}
					return l;
				};
			},
			function (t, s) {
				t.exports = function (i, n) {
					return { value: n, done: !!i };
				};
			},
			function (t, s, i) {
				var n = i(2),
					o = i(30).set,
					a = n.MutationObserver || n.WebKitMutationObserver,
					c = n.process,
					u = n.Promise,
					l = i(11)(c) == 'process';
				t.exports = function () {
					var h,
						f,
						d,
						p = function () {
							var T, S;
							for (l && (T = c.domain) && T.exit(); h; ) {
								(S = h.fn), (h = h.next);
								try {
									S();
								} catch (w) {
									throw (h ? d() : (f = void 0), w);
								}
							}
							(f = void 0), T && T.enter();
						};
					if (l)
						d = function () {
							c.nextTick(p);
						};
					else if (a) {
						var y = !0,
							_ = document.createTextNode('');
						new a(p).observe(_, { characterData: !0 }),
							(d = function () {
								_.data = y = !y;
							});
					} else if (u && u.resolve) {
						var g = u.resolve();
						d = function () {
							g.then(p);
						};
					} else
						d = function () {
							o.call(n, p);
						};
					return function (T) {
						var S = { fn: T, next: void 0 };
						f && (f.next = S), h || ((h = S), d()), (f = S);
					};
				};
			},
			function (t, s, i) {
				var n = i(3),
					o = i(50),
					a = i(22),
					c = i(19)('IE_PROTO'),
					u = function () {},
					l = 'prototype',
					h = function () {
						var f,
							d = i(16)('iframe'),
							p = a.length,
							y = '>';
						for (
							d.style.display = 'none',
								i(25).appendChild(d),
								d.src = 'javascript:',
								f = d.contentWindow.document,
								f.open(),
								f.write('<script>document.F=Object</script' + y),
								f.close(),
								h = f.F;
							p--;

						)
							delete h[l][a[p]];
						return h();
					};
				t.exports =
					Object.create ||
					function (f, d) {
						var p;
						return (
							f !== null
								? ((u[l] = n(f)), (p = new u()), (u[l] = null), (p[c] = f))
								: (p = h()),
							d === void 0 ? p : o(p, d)
						);
					};
			},
			function (t, s, i) {
				var n = i(12),
					o = i(3),
					a = i(54);
				t.exports = i(4)
					? Object.defineProperties
					: function (c, u) {
							o(c);
							for (var l, h = a(u), f = h.length, d = 0; f > d; )
								n.f(c, (l = h[d++]), u[l]);
							return c;
					  };
			},
			function (t, s, i) {
				var n = i(55),
					o = i(17),
					a = i(13),
					c = i(32),
					u = i(8),
					l = i(26),
					h = Object.getOwnPropertyDescriptor;
				s.f = i(4)
					? h
					: function (f, d) {
							if (((f = a(f)), (d = c(d, !0)), l))
								try {
									return h(f, d);
								} catch {}
							if (u(f, d)) return o(!n.f.call(f, d), f[d]);
					  };
			},
			function (t, s, i) {
				var n = i(8),
					o = i(63),
					a = i(19)('IE_PROTO'),
					c = Object.prototype;
				t.exports =
					Object.getPrototypeOf ||
					function (u) {
						return (
							(u = o(u)),
							n(u, a)
								? u[a]
								: typeof u.constructor == 'function' &&
								  u instanceof u.constructor
								? u.constructor.prototype
								: u instanceof Object
								? c
								: null
						);
					};
			},
			function (t, s, i) {
				var n = i(8),
					o = i(13),
					a = i(39)(!1),
					c = i(19)('IE_PROTO');
				t.exports = function (u, l) {
					var h,
						f = o(u),
						d = 0,
						p = [];
					for (h in f) h != c && n(f, h) && p.push(h);
					for (; l.length > d; ) n(f, (h = l[d++])) && (~a(p, h) || p.push(h));
					return p;
				};
			},
			function (t, s, i) {
				var n = i(53),
					o = i(22);
				t.exports =
					Object.keys ||
					function (a) {
						return n(a, o);
					};
			},
			function (t, s) {
				s.f = {}.propertyIsEnumerable;
			},
			function (t, s, i) {
				var n = i(5);
				t.exports = function (o, a, c) {
					for (var u in a) c && o[u] ? (o[u] = a[u]) : n(o, u, a[u]);
					return o;
				};
			},
			function (t, s, i) {
				t.exports = i(5);
			},
			function (t, s, i) {
				var n = i(9),
					o = i(3),
					a = function (c, u) {
						if ((o(c), !n(u) && u !== null))
							throw TypeError(u + ": can't set as prototype!");
					};
				t.exports = {
					set:
						Object.setPrototypeOf ||
						('__proto__' in {}
							? (function (c, u, l) {
									try {
										(l = i(7)(
											Function.call,
											i(51).f(Object.prototype, '__proto__').set,
											2,
										)),
											l(c, []),
											(u = !(c instanceof Array));
									} catch {
										u = !0;
									}
									return function (h, f) {
										return a(h, f), u ? (h.__proto__ = f) : l(h, f), h;
									};
							  })({}, !1)
							: void 0),
					check: a,
				};
			},
			function (t, s, i) {
				'use strict';
				var n = i(2),
					o = i(6),
					a = i(12),
					c = i(4),
					u = i(1)('species');
				t.exports = function (l) {
					var h = typeof o[l] == 'function' ? o[l] : n[l];
					c &&
						h &&
						!h[u] &&
						a.f(h, u, {
							configurable: !0,
							get: function () {
								return this;
							},
						});
				};
			},
			function (t, s, i) {
				var n = i(3),
					o = i(14),
					a = i(1)('species');
				t.exports = function (c, u) {
					var l,
						h = n(c).constructor;
					return h === void 0 || (l = n(h)[a]) == null ? u : o(l);
				};
			},
			function (t, s, i) {
				var n = i(20),
					o = i(15);
				t.exports = function (a) {
					return function (c, u) {
						var l,
							h,
							f = String(o(c)),
							d = n(u),
							p = f.length;
						return d < 0 || d >= p
							? a
								? ''
								: void 0
							: ((l = f.charCodeAt(d)),
							  l < 55296 ||
							  l > 56319 ||
							  d + 1 === p ||
							  (h = f.charCodeAt(d + 1)) < 56320 ||
							  h > 57343
									? a
										? f.charAt(d)
										: l
									: a
									? f.slice(d, d + 2)
									: ((l - 55296) << 10) + (h - 56320) + 65536);
					};
				};
			},
			function (t, s, i) {
				var n = i(20),
					o = Math.max,
					a = Math.min;
				t.exports = function (c, u) {
					return (c = n(c)), c < 0 ? o(c + u, 0) : a(c, u);
				};
			},
			function (t, s, i) {
				var n = i(15);
				t.exports = function (o) {
					return Object(n(o));
				};
			},
			function (t, s, i) {
				var n = i(21),
					o = i(1)('iterator'),
					a = i(10);
				t.exports = i(6).getIteratorMethod = function (c) {
					if (c != null) return c[o] || c['@@iterator'] || a[n(c)];
				};
			},
			function (t, s, i) {
				'use strict';
				var n = i(37),
					o = i(47),
					a = i(10),
					c = i(13);
				(t.exports = i(27)(
					Array,
					'Array',
					function (u, l) {
						(this._t = c(u)), (this._i = 0), (this._k = l);
					},
					function () {
						var u = this._t,
							l = this._k,
							h = this._i++;
						return !u || h >= u.length
							? ((this._t = void 0), o(1))
							: l == 'keys'
							? o(0, h)
							: l == 'values'
							? o(0, u[h])
							: o(0, [h, u[h]]);
					},
					'values',
				)),
					(a.Arguments = a.Array),
					n('keys'),
					n('values'),
					n('entries');
			},
			function (t, s) {},
			function (t, s, i) {
				'use strict';
				var n,
					o,
					a,
					c = i(28),
					u = i(2),
					l = i(7),
					h = i(21),
					f = i(23),
					d = i(9),
					p = (i(3), i(14)),
					y = i(38),
					_ = i(40),
					g = (i(58).set, i(60)),
					T = i(30).set,
					S = i(48)(),
					w = 'Promise',
					A = u.TypeError,
					L = u.process,
					v = u[w],
					L = u.process,
					b = h(L) == 'process',
					B = function () {},
					q = !!(function () {
						try {
							var m = v.resolve(1),
								R = ((m.constructor = {})[i(1)('species')] = function (C) {
									C(B, B);
								});
							return (
								(b || typeof PromiseRejectionEvent == 'function') &&
								m.then(B) instanceof R
							);
						} catch {}
					})(),
					le = function (m, R) {
						return m === R || (m === v && R === a);
					},
					ie = function (m) {
						var R;
						return !(!d(m) || typeof (R = m.then) != 'function') && R;
					},
					H = function (m) {
						return le(v, m) ? new Ee(m) : new o(m);
					},
					Ee = (o = function (m) {
						var R, C;
						(this.promise = new m(function (x, K) {
							if (R !== void 0 || C !== void 0)
								throw A('Bad Promise constructor');
							(R = x), (C = K);
						})),
							(this.resolve = p(R)),
							(this.reject = p(C));
					}),
					k = function (m) {
						try {
							m();
						} catch (R) {
							return { error: R };
						}
					},
					we = function (m, R) {
						if (!m._n) {
							m._n = !0;
							var C = m._c;
							S(function () {
								for (
									var x = m._v,
										K = m._s == 1,
										ht = 0,
										Dt = function (Ze) {
											var Ne,
												Yr,
												yr = K ? Ze.ok : Ze.fail,
												_r = Ze.resolve,
												Ft = Ze.reject,
												Zr = Ze.domain;
											try {
												yr
													? (K || (m._h == 2 && W(m), (m._h = 1)),
													  yr === !0
															? (Ne = x)
															: (Zr && Zr.enter(),
															  (Ne = yr(x)),
															  Zr && Zr.exit()),
													  Ne === Ze.promise
															? Ft(A('Promise-chain cycle'))
															: (Yr = ie(Ne))
															? Yr.call(Ne, _r, Ft)
															: _r(Ne))
													: Ft(x);
											} catch (df) {
												Ft(df);
											}
										};
									C.length > ht;

								)
									Dt(C[ht++]);
								(m._c = []), (m._n = !1), R && !m._h && ne(m);
							});
						}
					},
					ne = function (m) {
						T.call(u, function () {
							var R,
								C,
								x,
								K = m._v;
							if (
								(O(m) &&
									((R = k(function () {
										b
											? L.emit('unhandledRejection', K, m)
											: (C = u.onunhandledrejection)
											? C({ promise: m, reason: K })
											: (x = u.console) &&
											  x.error &&
											  x.error('Unhandled promise rejection', K);
									})),
									(m._h = b || O(m) ? 2 : 1)),
								(m._a = void 0),
								R)
							)
								throw R.error;
						});
					},
					O = function (m) {
						if (m._h == 1) return !1;
						for (var R, C = m._a || m._c, x = 0; C.length > x; )
							if (((R = C[x++]), R.fail || !O(R.promise))) return !1;
						return !0;
					},
					W = function (m) {
						T.call(u, function () {
							var R;
							b
								? L.emit('rejectionHandled', m)
								: (R = u.onrejectionhandled) && R({ promise: m, reason: m._v });
						});
					},
					z = function (m) {
						var R = this;
						R._d ||
							((R._d = !0),
							(R = R._w || R),
							(R._v = m),
							(R._s = 2),
							R._a || (R._a = R._c.slice()),
							we(R, !0));
					},
					Ie = function (m) {
						var R,
							C = this;
						if (!C._d) {
							(C._d = !0), (C = C._w || C);
							try {
								if (C === m) throw A("Promise can't be resolved itself");
								(R = ie(m))
									? S(function () {
											var x = { _w: C, _d: !1 };
											try {
												R.call(m, l(Ie, x, 1), l(z, x, 1));
											} catch (K) {
												z.call(x, K);
											}
									  })
									: ((C._v = m), (C._s = 1), we(C, !1));
							} catch (x) {
								z.call({ _w: C, _d: !1 }, x);
							}
						}
					};
				q ||
					((v = function (m) {
						y(this, v, w, '_h'), p(m), n.call(this);
						try {
							m(l(Ie, this, 1), l(z, this, 1));
						} catch (R) {
							z.call(this, R);
						}
					}),
					(n = function (m) {
						(this._c = []),
							(this._a = void 0),
							(this._s = 0),
							(this._d = !1),
							(this._v = void 0),
							(this._h = 0),
							(this._n = !1);
					}),
					(n.prototype = i(56)(v.prototype, {
						then: function (m, R) {
							var C = H(g(this, v));
							return (
								(C.ok = typeof m != 'function' || m),
								(C.fail = typeof R == 'function' && R),
								(C.domain = b ? L.domain : void 0),
								this._c.push(C),
								this._a && this._a.push(C),
								this._s && we(this, !1),
								C.promise
							);
						},
						catch: function (m) {
							return this.then(void 0, m);
						},
					})),
					(Ee = function () {
						var m = new n();
						(this.promise = m),
							(this.resolve = l(Ie, m, 1)),
							(this.reject = l(z, m, 1));
					})),
					f(f.G + f.W + f.F * !q, { Promise: v }),
					i(18)(v, w),
					i(59)(w),
					(a = i(6)[w]),
					f(f.S + f.F * !q, w, {
						reject: function (m) {
							var R = H(this),
								C = R.reject;
							return C(m), R.promise;
						},
					}),
					f(f.S + f.F * (c || !q), w, {
						resolve: function (m) {
							if (m instanceof v && le(m.constructor, this)) return m;
							var R = H(this),
								C = R.resolve;
							return C(m), R.promise;
						},
					}),
					f(
						f.S +
							f.F *
								!(
									q &&
									i(46)(function (m) {
										v.all(m).catch(B);
									})
								),
						w,
						{
							all: function (m) {
								var R = this,
									C = H(R),
									x = C.resolve,
									K = C.reject,
									ht = k(function () {
										var Dt = [],
											Ze = 0,
											Ne = 1;
										_(m, !1, function (Yr) {
											var yr = Ze++,
												_r = !1;
											Dt.push(void 0),
												Ne++,
												R.resolve(Yr).then(function (Ft) {
													_r || ((_r = !0), (Dt[yr] = Ft), --Ne || x(Dt));
												}, K);
										}),
											--Ne || x(Dt);
									});
								return ht && K(ht.error), C.promise;
							},
							race: function (m) {
								var R = this,
									C = H(R),
									x = C.reject,
									K = k(function () {
										_(m, !1, function (ht) {
											R.resolve(ht).then(C.resolve, x);
										});
									});
								return K && x(K.error), C.promise;
							},
						},
					);
			},
			function (t, s, i) {
				'use strict';
				var n = i(61)(!0);
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
							: ((o = n(a, c)), (this._i += o.length), { value: o, done: !1 });
					},
				);
			},
			function (t, s, i) {
				i(65);
				for (
					var n = i(2),
						o = i(5),
						a = i(10),
						c = i(1)('toStringTag'),
						u = [
							'NodeList',
							'DOMTokenList',
							'MediaList',
							'StyleSheetList',
							'CSSRuleList',
						],
						l = 0;
					l < 5;
					l++
				) {
					var h = u[l],
						f = n[h],
						d = f && f.prototype;
					d && !d[c] && o(d, c, h), (a[h] = a.Array);
				}
			},
			function (t, s) {
				t.exports = require('child_process');
			},
			function (t, s) {
				t.exports = require('crypto');
			},
		]);
	});
});
var Sa = {};
Pe(Sa, {
	ACCESS_TOKEN: () => wr,
	DEFAULT_FILE_SIZE_LIMIT: () => Pt,
	DISTRIBUTED_TASK_EXECUTION_INTERNAL_ERROR_STATUS_CODE: () => qf,
	ENCRYPTION_KEY: () => Ca,
	NO_COMPLETED_TASKS_TIMEOUT: () => Pf,
	NO_MESSAGES_TIMEOUT: () => Mf,
	NUMBER_OF_AXIOS_RETRIES: () => Cr,
	NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT: () => Hf,
	NX_CLOUD_DISTRIBUTED_EXECUTION_STOP_AGENTS_ON_FAILURE: () => Gf,
	NX_CLOUD_FORCE_METRICS: () => bi,
	NX_CLOUD_NO_TIMEOUTS: () => Se,
	NX_CLOUD_UNLIMITED_OUTPUT: () => kf,
	NX_NO_CLOUD: () => zf,
	UNLIMITED_FILE_SIZE: () => Mt,
	UNLIMITED_TIMEOUT: () => Bt,
	VERBOSE_LOGGING: () => M,
	agentRunningInDistributedExecution: () => Vf,
	extractGitRef: () => jf,
	extractGitSha: () => Sr,
	getBranch: () => Tr,
	getCIExecutionEnv: () => vr,
	getCIExecutionId: () => Ii,
	getMachineInfo: () => Xf,
	getRunGroup: () => Ni,
	nxInvokedByRunner: () => $f,
	parseCommand: () => Yf,
});
function Vf(r) {
	return !!r;
}
function $f() {
	return (
		process.env.NX_INVOKED_BY_RUNNER === 'true' ||
		process.env.NX_CLOUD === 'false'
	);
}
function Sr() {
	try {
		return (0, xi.execSync)('git rev-parse HEAD', { stdio: 'pipe' })
			.toString()
			.trim();
	} catch {
		return;
	}
}
function jf() {
	try {
		return (0, xi.execSync)('git rev-parse --symbolic-full-name HEAD', {
			stdio: 'pipe',
		})
			.toString()
			.trim();
	} catch {
		return;
	}
}
function Wf() {
	try {
		let r = (0, va.readFileSync)((0, Qr.join)(Bf, 'nx-cloud.env'));
		return Ff.parse(r);
	} catch {
		return {};
	}
}
function Kf() {
	let r = Wf();
	(wr =
		process.env.NX_CLOUD_AUTH_TOKEN ||
		process.env.NX_CLOUD_ACCESS_TOKEN ||
		r.NX_CLOUD_AUTH_TOKEN ||
		r.NX_CLOUD_ACCESS_TOKEN),
		(Ca = process.env.NX_CLOUD_ENCRYPTION_KEY || r.NX_CLOUD_ENCRYPTION_KEY),
		(M =
			process.env.NX_VERBOSE_LOGGING === 'true' ||
			r.NX_VERBOSE_LOGGING === 'true'),
		(Se =
			process.env.NX_CLOUD_NO_TIMEOUTS === 'true' ||
			r.NX_CLOUD_NO_TIMEOUTS === 'true');
}
function Ii() {
	if (!Ut()) return wa();
}
function wa() {
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
function vr() {
	if (!Ut()) return process.env.NX_CI_EXECUTION_ENV ?? '';
}
function Ni() {
	if (process.env.NX_RUN_GROUP !== void 0) return process.env.NX_RUN_GROUP;
	let r = wa();
	return r ? (vr() ? `${r}-${vr()}` : r) : Sr();
}
function Tr() {
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
function Xf() {
	let r = require('os'),
		e = (0, ga.createHash)('md5');
	return (
		e.update(Uf()),
		{
			machineId: e.digest('base64'),
			platform: r.platform(),
			version: r.version ? r.version() : '',
			cpuCores: r.cpus().length,
		}
	);
}
function Yf() {
	let r = (0, Qr.parse)(process.argv[1]).name,
		e = `${process.argv.slice(2).join(' ')}`;
	return `${r} ${e}`;
}
var xi,
	ga,
	va,
	Qr,
	Ff,
	Uf,
	Bf,
	Bt,
	Mf,
	Pf,
	Mt,
	kf,
	Pt,
	qf,
	Hf,
	Gf,
	bi,
	Cr,
	zf,
	wr,
	Ca,
	M,
	Se,
	dt = ee(() => {
		'use strict';
		(xi = require('child_process')),
			(ga = require('crypto')),
			(va = require('fs')),
			(Qr = require('path'));
		ca();
		Si();
		(Ff = _a()),
			({ machineIdSync: Uf } = Ra()),
			({ workspaceRoot: Bf } = qe()),
			(Bt = 9999999),
			(Mf = process.env.NX_CLOUD_AGENT_TIMEOUT_MS
				? Number(process.env.NX_CLOUD_AGENT_TIMEOUT_MS)
				: 36e5),
			(Pf = process.env.NX_CLOUD_ORCHESTRATOR_TIMEOUT_MS
				? Number(process.env.NX_CLOUD_ORCHESTRATOR_TIMEOUT_MS)
				: 36e5),
			(Mt = 1e3 * 1e3 * 1e4),
			(kf = process.env.NX_CLOUD_UNLIMITED_OUTPUT === 'true'),
			(Pt = 1e3 * 1e3 * 300),
			(qf = 166),
			(Hf = process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT
				? Number(process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT)
				: null),
			(Gf =
				process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_STOP_AGENTS_ON_FAILURE !=
				'false'),
			(bi = process.env.NX_CLOUD_FORCE_METRICS === 'true'),
			(Cr = process.env.NX_CLOUD_NUMBER_OF_RETRIES
				? Number(process.env.NX_CLOUD_NUMBER_OF_RETRIES)
				: aa()
				? 10
				: 1),
			(zf = process.env.NX_NO_CLOUD === 'true');
		Kf();
	});
function kt(r) {
	return new Promise((e) => {
		setTimeout(() => e(null), r);
	});
}
var Ai = ee(() => {
	'use strict';
});
var Li = E((By, Ta) => {
	'use strict';
	Ta.exports = function (e, t) {
		return function () {
			for (var i = new Array(arguments.length), n = 0; n < i.length; n++)
				i[n] = arguments[n];
			return e.apply(t, i);
		};
	};
});
var re = E((My, ba) => {
	'use strict';
	var Zf = Li(),
		pt = Object.prototype.toString;
	function Ui(r) {
		return pt.call(r) === '[object Array]';
	}
	function Di(r) {
		return typeof r > 'u';
	}
	function Jf(r) {
		return (
			r !== null &&
			!Di(r) &&
			r.constructor !== null &&
			!Di(r.constructor) &&
			typeof r.constructor.isBuffer == 'function' &&
			r.constructor.isBuffer(r)
		);
	}
	function Qf(r) {
		return pt.call(r) === '[object ArrayBuffer]';
	}
	function ed(r) {
		return typeof FormData < 'u' && r instanceof FormData;
	}
	function td(r) {
		var e;
		return (
			typeof ArrayBuffer < 'u' && ArrayBuffer.isView
				? (e = ArrayBuffer.isView(r))
				: (e = r && r.buffer && r.buffer instanceof ArrayBuffer),
			e
		);
	}
	function rd(r) {
		return typeof r == 'string';
	}
	function sd(r) {
		return typeof r == 'number';
	}
	function Oa(r) {
		return r !== null && typeof r == 'object';
	}
	function es(r) {
		if (pt.call(r) !== '[object Object]') return !1;
		var e = Object.getPrototypeOf(r);
		return e === null || e === Object.prototype;
	}
	function id(r) {
		return pt.call(r) === '[object Date]';
	}
	function nd(r) {
		return pt.call(r) === '[object File]';
	}
	function od(r) {
		return pt.call(r) === '[object Blob]';
	}
	function xa(r) {
		return pt.call(r) === '[object Function]';
	}
	function ad(r) {
		return Oa(r) && xa(r.pipe);
	}
	function cd(r) {
		return typeof URLSearchParams < 'u' && r instanceof URLSearchParams;
	}
	function ud(r) {
		return r.trim ? r.trim() : r.replace(/^\s+|\s+$/g, '');
	}
	function ld() {
		return typeof navigator < 'u' &&
			(navigator.product === 'ReactNative' ||
				navigator.product === 'NativeScript' ||
				navigator.product === 'NS')
			? !1
			: typeof window < 'u' && typeof document < 'u';
	}
	function Bi(r, e) {
		if (!(r === null || typeof r > 'u'))
			if ((typeof r != 'object' && (r = [r]), Ui(r)))
				for (var t = 0, s = r.length; t < s; t++) e.call(null, r[t], t, r);
			else
				for (var i in r)
					Object.prototype.hasOwnProperty.call(r, i) &&
						e.call(null, r[i], i, r);
	}
	function Fi() {
		var r = {};
		function e(i, n) {
			es(r[n]) && es(i)
				? (r[n] = Fi(r[n], i))
				: es(i)
				? (r[n] = Fi({}, i))
				: Ui(i)
				? (r[n] = i.slice())
				: (r[n] = i);
		}
		for (var t = 0, s = arguments.length; t < s; t++) Bi(arguments[t], e);
		return r;
	}
	function hd(r, e, t) {
		return (
			Bi(e, function (i, n) {
				t && typeof i == 'function' ? (r[n] = Zf(i, t)) : (r[n] = i);
			}),
			r
		);
	}
	function fd(r) {
		return r.charCodeAt(0) === 65279 && (r = r.slice(1)), r;
	}
	ba.exports = {
		isArray: Ui,
		isArrayBuffer: Qf,
		isBuffer: Jf,
		isFormData: ed,
		isArrayBufferView: td,
		isString: rd,
		isNumber: sd,
		isObject: Oa,
		isPlainObject: es,
		isUndefined: Di,
		isDate: id,
		isFile: nd,
		isBlob: od,
		isFunction: xa,
		isStream: ad,
		isURLSearchParams: cd,
		isStandardBrowserEnv: ld,
		forEach: Bi,
		merge: Fi,
		extend: hd,
		trim: ud,
		stripBOM: fd,
	};
});
var ts = E((Py, Na) => {
	'use strict';
	var qt = re();
	function Ia(r) {
		return encodeURIComponent(r)
			.replace(/%3A/gi, ':')
			.replace(/%24/g, '$')
			.replace(/%2C/gi, ',')
			.replace(/%20/g, '+')
			.replace(/%5B/gi, '[')
			.replace(/%5D/gi, ']');
	}
	Na.exports = function (e, t, s) {
		if (!t) return e;
		var i;
		if (s) i = s(t);
		else if (qt.isURLSearchParams(t)) i = t.toString();
		else {
			var n = [];
			qt.forEach(t, function (c, u) {
				c === null ||
					typeof c > 'u' ||
					(qt.isArray(c) ? (u = u + '[]') : (c = [c]),
					qt.forEach(c, function (h) {
						qt.isDate(h)
							? (h = h.toISOString())
							: qt.isObject(h) && (h = JSON.stringify(h)),
							n.push(Ia(u) + '=' + Ia(h));
					}));
			}),
				(i = n.join('&'));
		}
		if (i) {
			var o = e.indexOf('#');
			o !== -1 && (e = e.slice(0, o)),
				(e += (e.indexOf('?') === -1 ? '?' : '&') + i);
		}
		return e;
	};
});
var La = E((ky, Aa) => {
	'use strict';
	var dd = re();
	function rs() {
		this.handlers = [];
	}
	rs.prototype.use = function (e, t, s) {
		return (
			this.handlers.push({
				fulfilled: e,
				rejected: t,
				synchronous: s ? s.synchronous : !1,
				runWhen: s ? s.runWhen : null,
			}),
			this.handlers.length - 1
		);
	};
	rs.prototype.eject = function (e) {
		this.handlers[e] && (this.handlers[e] = null);
	};
	rs.prototype.forEach = function (e) {
		dd.forEach(this.handlers, function (s) {
			s !== null && e(s);
		});
	};
	Aa.exports = rs;
});
var Fa = E((qy, Da) => {
	'use strict';
	var pd = re();
	Da.exports = function (e, t) {
		pd.forEach(e, function (i, n) {
			n !== t &&
				n.toUpperCase() === t.toUpperCase() &&
				((e[t] = i), delete e[n]);
		});
	};
});
var ss = E((Hy, Ua) => {
	'use strict';
	Ua.exports = function (e, t, s, i, n) {
		return (
			(e.config = t),
			s && (e.code = s),
			(e.request = i),
			(e.response = n),
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
var is = E((Gy, Ba) => {
	'use strict';
	var md = ss();
	Ba.exports = function (e, t, s, i, n) {
		var o = new Error(e);
		return md(o, t, s, i, n);
	};
});
var Mi = E((zy, Ma) => {
	'use strict';
	var Ed = is();
	Ma.exports = function (e, t, s) {
		var i = s.config.validateStatus;
		!s.status || !i || i(s.status)
			? e(s)
			: t(
					Ed(
						'Request failed with status code ' + s.status,
						s.config,
						null,
						s.request,
						s,
					),
			  );
	};
});
var ka = E((Vy, Pa) => {
	'use strict';
	var ns = re();
	Pa.exports = ns.isStandardBrowserEnv()
		? (function () {
				return {
					write: function (t, s, i, n, o, a) {
						var c = [];
						c.push(t + '=' + encodeURIComponent(s)),
							ns.isNumber(i) && c.push('expires=' + new Date(i).toGMTString()),
							ns.isString(n) && c.push('path=' + n),
							ns.isString(o) && c.push('domain=' + o),
							a === !0 && c.push('secure'),
							(document.cookie = c.join('; '));
					},
					read: function (t) {
						var s = document.cookie.match(
							new RegExp('(^|;\\s*)(' + t + ')=([^;]*)'),
						);
						return s ? decodeURIComponent(s[3]) : null;
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
var Ha = E(($y, qa) => {
	'use strict';
	qa.exports = function (e) {
		return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
	};
});
var za = E((jy, Ga) => {
	'use strict';
	Ga.exports = function (e, t) {
		return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e;
	};
});
var Pi = E((Wy, Va) => {
	'use strict';
	var yd = Ha(),
		_d = za();
	Va.exports = function (e, t) {
		return e && !yd(t) ? _d(e, t) : t;
	};
});
var ja = E((Ky, $a) => {
	'use strict';
	var ki = re(),
		Rd = [
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
	$a.exports = function (e) {
		var t = {},
			s,
			i,
			n;
		return (
			e &&
				ki.forEach(
					e.split(`
`),
					function (a) {
						if (
							((n = a.indexOf(':')),
							(s = ki.trim(a.substr(0, n)).toLowerCase()),
							(i = ki.trim(a.substr(n + 1))),
							s)
						) {
							if (t[s] && Rd.indexOf(s) >= 0) return;
							s === 'set-cookie'
								? (t[s] = (t[s] ? t[s] : []).concat([i]))
								: (t[s] = t[s] ? t[s] + ', ' + i : i);
						}
					},
				),
			t
		);
	};
});
var Xa = E((Xy, Ka) => {
	'use strict';
	var Wa = re();
	Ka.exports = Wa.isStandardBrowserEnv()
		? (function () {
				var e = /(msie|trident)/i.test(navigator.userAgent),
					t = document.createElement('a'),
					s;
				function i(n) {
					var o = n;
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
					(s = i(window.location.href)),
					function (o) {
						var a = Wa.isString(o) ? i(o) : o;
						return a.protocol === s.protocol && a.host === s.host;
					}
				);
		  })()
		: (function () {
				return function () {
					return !0;
				};
		  })();
});
var Za = E((Yy, Ya) => {
	'use strict';
	var os = re(),
		gd = Mi(),
		vd = ka(),
		Cd = ts(),
		wd = Pi(),
		Sd = ja(),
		Td = Xa(),
		qi = is();
	Ya.exports = function (e) {
		return new Promise(function (s, i) {
			var n = e.data,
				o = e.headers,
				a = e.responseType;
			os.isFormData(n) && delete o['Content-Type'];
			var c = new XMLHttpRequest();
			if (e.auth) {
				var u = e.auth.username || '',
					l = e.auth.password
						? unescape(encodeURIComponent(e.auth.password))
						: '';
				o.Authorization = 'Basic ' + btoa(u + ':' + l);
			}
			var h = wd(e.baseURL, e.url);
			c.open(e.method.toUpperCase(), Cd(h, e.params, e.paramsSerializer), !0),
				(c.timeout = e.timeout);
			function f() {
				if (c) {
					var p =
							'getAllResponseHeaders' in c
								? Sd(c.getAllResponseHeaders())
								: null,
						y =
							!a || a === 'text' || a === 'json' ? c.responseText : c.response,
						_ = {
							data: y,
							status: c.status,
							statusText: c.statusText,
							headers: p,
							config: e,
							request: c,
						};
					gd(s, i, _), (c = null);
				}
			}
			if (
				('onloadend' in c
					? (c.onloadend = f)
					: (c.onreadystatechange = function () {
							!c ||
								c.readyState !== 4 ||
								(c.status === 0 &&
									!(c.responseURL && c.responseURL.indexOf('file:') === 0)) ||
								setTimeout(f);
					  }),
				(c.onabort = function () {
					c && (i(qi('Request aborted', e, 'ECONNABORTED', c)), (c = null));
				}),
				(c.onerror = function () {
					i(qi('Network Error', e, null, c)), (c = null);
				}),
				(c.ontimeout = function () {
					var y = 'timeout of ' + e.timeout + 'ms exceeded';
					e.timeoutErrorMessage && (y = e.timeoutErrorMessage),
						i(
							qi(
								y,
								e,
								e.transitional && e.transitional.clarifyTimeoutError
									? 'ETIMEDOUT'
									: 'ECONNABORTED',
								c,
							),
						),
						(c = null);
				}),
				os.isStandardBrowserEnv())
			) {
				var d =
					(e.withCredentials || Td(h)) && e.xsrfCookieName
						? vd.read(e.xsrfCookieName)
						: void 0;
				d && (o[e.xsrfHeaderName] = d);
			}
			'setRequestHeader' in c &&
				os.forEach(o, function (y, _) {
					typeof n > 'u' && _.toLowerCase() === 'content-type'
						? delete o[_]
						: c.setRequestHeader(_, y);
				}),
				os.isUndefined(e.withCredentials) ||
					(c.withCredentials = !!e.withCredentials),
				a && a !== 'json' && (c.responseType = e.responseType),
				typeof e.onDownloadProgress == 'function' &&
					c.addEventListener('progress', e.onDownloadProgress),
				typeof e.onUploadProgress == 'function' &&
					c.upload &&
					c.upload.addEventListener('progress', e.onUploadProgress),
				e.cancelToken &&
					e.cancelToken.promise.then(function (y) {
						c && (c.abort(), i(y), (c = null));
					}),
				n || (n = null),
				c.send(n);
		});
	};
});
var Qa = E((Zy, Ja) => {
	var Ht = 1e3,
		Gt = Ht * 60,
		zt = Gt * 60,
		mt = zt * 24,
		Od = mt * 7,
		xd = mt * 365.25;
	Ja.exports = function (r, e) {
		e = e || {};
		var t = typeof r;
		if (t === 'string' && r.length > 0) return bd(r);
		if (t === 'number' && isFinite(r)) return e.long ? Nd(r) : Id(r);
		throw new Error(
			'val is not a non-empty string or a valid number. val=' +
				JSON.stringify(r),
		);
	};
	function bd(r) {
		if (((r = String(r)), !(r.length > 100))) {
			var e =
				/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
					r,
				);
			if (e) {
				var t = parseFloat(e[1]),
					s = (e[2] || 'ms').toLowerCase();
				switch (s) {
					case 'years':
					case 'year':
					case 'yrs':
					case 'yr':
					case 'y':
						return t * xd;
					case 'weeks':
					case 'week':
					case 'w':
						return t * Od;
					case 'days':
					case 'day':
					case 'd':
						return t * mt;
					case 'hours':
					case 'hour':
					case 'hrs':
					case 'hr':
					case 'h':
						return t * zt;
					case 'minutes':
					case 'minute':
					case 'mins':
					case 'min':
					case 'm':
						return t * Gt;
					case 'seconds':
					case 'second':
					case 'secs':
					case 'sec':
					case 's':
						return t * Ht;
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
	function Id(r) {
		var e = Math.abs(r);
		return e >= mt
			? Math.round(r / mt) + 'd'
			: e >= zt
			? Math.round(r / zt) + 'h'
			: e >= Gt
			? Math.round(r / Gt) + 'm'
			: e >= Ht
			? Math.round(r / Ht) + 's'
			: r + 'ms';
	}
	function Nd(r) {
		var e = Math.abs(r);
		return e >= mt
			? as(r, e, mt, 'day')
			: e >= zt
			? as(r, e, zt, 'hour')
			: e >= Gt
			? as(r, e, Gt, 'minute')
			: e >= Ht
			? as(r, e, Ht, 'second')
			: r + ' ms';
	}
	function as(r, e, t, s) {
		var i = e >= t * 1.5;
		return Math.round(r / t) + ' ' + s + (i ? 's' : '');
	}
});
var Hi = E((Jy, ec) => {
	function Ad(r) {
		(t.debug = t),
			(t.default = t),
			(t.coerce = c),
			(t.disable = n),
			(t.enable = i),
			(t.enabled = o),
			(t.humanize = Qa()),
			(t.destroy = u),
			Object.keys(r).forEach((l) => {
				t[l] = r[l];
			}),
			(t.names = []),
			(t.skips = []),
			(t.formatters = {});
		function e(l) {
			let h = 0;
			for (let f = 0; f < l.length; f++)
				(h = (h << 5) - h + l.charCodeAt(f)), (h |= 0);
			return t.colors[Math.abs(h) % t.colors.length];
		}
		t.selectColor = e;
		function t(l) {
			let h,
				f = null,
				d,
				p;
			function y(..._) {
				if (!y.enabled) return;
				let g = y,
					T = Number(new Date()),
					S = T - (h || T);
				(g.diff = S),
					(g.prev = h),
					(g.curr = T),
					(h = T),
					(_[0] = t.coerce(_[0])),
					typeof _[0] != 'string' && _.unshift('%O');
				let w = 0;
				(_[0] = _[0].replace(/%([a-zA-Z%])/g, (v, L) => {
					if (v === '%%') return '%';
					w++;
					let b = t.formatters[L];
					if (typeof b == 'function') {
						let B = _[w];
						(v = b.call(g, B)), _.splice(w, 1), w--;
					}
					return v;
				})),
					t.formatArgs.call(g, _),
					(g.log || t.log).apply(g, _);
			}
			return (
				(y.namespace = l),
				(y.useColors = t.useColors()),
				(y.color = t.selectColor(l)),
				(y.extend = s),
				(y.destroy = t.destroy),
				Object.defineProperty(y, 'enabled', {
					enumerable: !0,
					configurable: !1,
					get: () =>
						f !== null
							? f
							: (d !== t.namespaces && ((d = t.namespaces), (p = t.enabled(l))),
							  p),
					set: (_) => {
						f = _;
					},
				}),
				typeof t.init == 'function' && t.init(y),
				y
			);
		}
		function s(l, h) {
			let f = t(this.namespace + (typeof h > 'u' ? ':' : h) + l);
			return (f.log = this.log), f;
		}
		function i(l) {
			t.save(l), (t.namespaces = l), (t.names = []), (t.skips = []);
			let h,
				f = (typeof l == 'string' ? l : '').split(/[\s,]+/),
				d = f.length;
			for (h = 0; h < d; h++)
				f[h] &&
					((l = f[h].replace(/\*/g, '.*?')),
					l[0] === '-'
						? t.skips.push(new RegExp('^' + l.slice(1) + '$'))
						: t.names.push(new RegExp('^' + l + '$')));
		}
		function n() {
			let l = [...t.names.map(a), ...t.skips.map(a).map((h) => '-' + h)].join(
				',',
			);
			return t.enable(''), l;
		}
		function o(l) {
			if (l[l.length - 1] === '*') return !0;
			let h, f;
			for (h = 0, f = t.skips.length; h < f; h++)
				if (t.skips[h].test(l)) return !1;
			for (h = 0, f = t.names.length; h < f; h++)
				if (t.names[h].test(l)) return !0;
			return !1;
		}
		function a(l) {
			return l
				.toString()
				.substring(2, l.toString().length - 2)
				.replace(/\.\*\?$/, '*');
		}
		function c(l) {
			return l instanceof Error ? l.stack || l.message : l;
		}
		function u() {
			console.warn(
				'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
			);
		}
		return t.enable(t.load()), t;
	}
	ec.exports = Ad;
});
var tc = E((he, cs) => {
	he.formatArgs = Dd;
	he.save = Fd;
	he.load = Ud;
	he.useColors = Ld;
	he.storage = Bd();
	he.destroy = (() => {
		let r = !1;
		return () => {
			r ||
				((r = !0),
				console.warn(
					'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
				));
		};
	})();
	he.colors = [
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
	function Ld() {
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
	function Dd(r) {
		if (
			((r[0] =
				(this.useColors ? '%c' : '') +
				this.namespace +
				(this.useColors ? ' %c' : ' ') +
				r[0] +
				(this.useColors ? '%c ' : ' ') +
				'+' +
				cs.exports.humanize(this.diff)),
			!this.useColors)
		)
			return;
		let e = 'color: ' + this.color;
		r.splice(1, 0, e, 'color: inherit');
		let t = 0,
			s = 0;
		r[0].replace(/%[a-zA-Z%]/g, (i) => {
			i !== '%%' && (t++, i === '%c' && (s = t));
		}),
			r.splice(s, 0, e);
	}
	he.log = console.debug || console.log || (() => {});
	function Fd(r) {
		try {
			r ? he.storage.setItem('debug', r) : he.storage.removeItem('debug');
		} catch {}
	}
	function Ud() {
		let r;
		try {
			r = he.storage.getItem('debug');
		} catch {}
		return (
			!r && typeof process < 'u' && 'env' in process && (r = process.env.DEBUG),
			r
		);
	}
	function Bd() {
		try {
			return localStorage;
		} catch {}
	}
	cs.exports = Hi()(he);
	var { formatters: Md } = cs.exports;
	Md.j = function (r) {
		try {
			return JSON.stringify(r);
		} catch (e) {
			return '[UnexpectedJSONParseError]: ' + e.message;
		}
	};
});
var sc = E((Qy, rc) => {
	'use strict';
	rc.exports = (r, e = process.argv) => {
		let t = r.startsWith('-') ? '' : r.length === 1 ? '-' : '--',
			s = e.indexOf(t + r),
			i = e.indexOf('--');
		return s !== -1 && (i === -1 || s < i);
	};
});
var oc = E((e_, nc) => {
	'use strict';
	var Pd = require('os'),
		ic = require('tty'),
		ye = sc(),
		{ env: V } = process,
		Je;
	ye('no-color') || ye('no-colors') || ye('color=false') || ye('color=never')
		? (Je = 0)
		: (ye('color') || ye('colors') || ye('color=true') || ye('color=always')) &&
		  (Je = 1);
	'FORCE_COLOR' in V &&
		(V.FORCE_COLOR === 'true'
			? (Je = 1)
			: V.FORCE_COLOR === 'false'
			? (Je = 0)
			: (Je =
					V.FORCE_COLOR.length === 0
						? 1
						: Math.min(parseInt(V.FORCE_COLOR, 10), 3)));
	function Gi(r) {
		return r === 0
			? !1
			: { level: r, hasBasic: !0, has256: r >= 2, has16m: r >= 3 };
	}
	function zi(r, e) {
		if (Je === 0) return 0;
		if (ye('color=16m') || ye('color=full') || ye('color=truecolor')) return 3;
		if (ye('color=256')) return 2;
		if (r && !e && Je === void 0) return 0;
		let t = Je || 0;
		if (V.TERM === 'dumb') return t;
		if (process.platform === 'win32') {
			let s = Pd.release().split('.');
			return Number(s[0]) >= 10 && Number(s[2]) >= 10586
				? Number(s[2]) >= 14931
					? 3
					: 2
				: 1;
		}
		if ('CI' in V)
			return [
				'TRAVIS',
				'CIRCLECI',
				'APPVEYOR',
				'GITLAB_CI',
				'GITHUB_ACTIONS',
				'BUILDKITE',
			].some((s) => s in V) || V.CI_NAME === 'codeship'
				? 1
				: t;
		if ('TEAMCITY_VERSION' in V)
			return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(V.TEAMCITY_VERSION) ? 1 : 0;
		if (V.COLORTERM === 'truecolor') return 3;
		if ('TERM_PROGRAM' in V) {
			let s = parseInt((V.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
			switch (V.TERM_PROGRAM) {
				case 'iTerm.app':
					return s >= 3 ? 3 : 2;
				case 'Apple_Terminal':
					return 2;
			}
		}
		return /-256(color)?$/i.test(V.TERM)
			? 2
			: /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
					V.TERM,
			  ) || 'COLORTERM' in V
			? 1
			: t;
	}
	function kd(r) {
		let e = zi(r, r && r.isTTY);
		return Gi(e);
	}
	nc.exports = {
		supportsColor: kd,
		stdout: Gi(zi(!0, ic.isatty(1))),
		stderr: Gi(zi(!0, ic.isatty(2))),
	};
});
var cc = E((j, ls) => {
	var qd = require('tty'),
		us = require('util');
	j.init = Wd;
	j.log = Vd;
	j.formatArgs = Gd;
	j.save = $d;
	j.load = jd;
	j.useColors = Hd;
	j.destroy = us.deprecate(() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	j.colors = [6, 2, 3, 4, 5, 1];
	try {
		let r = oc();
		r &&
			(r.stderr || r).level >= 2 &&
			(j.colors = [
				20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63,
				68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128,
				129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168,
				169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200,
				201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221,
			]);
	} catch {}
	j.inspectOpts = Object.keys(process.env)
		.filter((r) => /^debug_/i.test(r))
		.reduce((r, e) => {
			let t = e
					.substring(6)
					.toLowerCase()
					.replace(/_([a-z])/g, (i, n) => n.toUpperCase()),
				s = process.env[e];
			return (
				/^(yes|on|true|enabled)$/i.test(s)
					? (s = !0)
					: /^(no|off|false|disabled)$/i.test(s)
					? (s = !1)
					: s === 'null'
					? (s = null)
					: (s = Number(s)),
				(r[t] = s),
				r
			);
		}, {});
	function Hd() {
		return 'colors' in j.inspectOpts
			? !!j.inspectOpts.colors
			: qd.isatty(process.stderr.fd);
	}
	function Gd(r) {
		let { namespace: e, useColors: t } = this;
		if (t) {
			let s = this.color,
				i = '\x1B[3' + (s < 8 ? s : '8;5;' + s),
				n = `  ${i};1m${e} \x1B[0m`;
			(r[0] =
				n +
				r[0]
					.split(
						`
`,
					)
					.join(
						`
` + n,
					)),
				r.push(i + 'm+' + ls.exports.humanize(this.diff) + '\x1B[0m');
		} else r[0] = zd() + e + ' ' + r[0];
	}
	function zd() {
		return j.inspectOpts.hideDate ? '' : new Date().toISOString() + ' ';
	}
	function Vd(...r) {
		return process.stderr.write(
			us.format(...r) +
				`
`,
		);
	}
	function $d(r) {
		r ? (process.env.DEBUG = r) : delete process.env.DEBUG;
	}
	function jd() {
		return process.env.DEBUG;
	}
	function Wd(r) {
		r.inspectOpts = {};
		let e = Object.keys(j.inspectOpts);
		for (let t = 0; t < e.length; t++)
			r.inspectOpts[e[t]] = j.inspectOpts[e[t]];
	}
	ls.exports = Hi()(j);
	var { formatters: ac } = ls.exports;
	ac.o = function (r) {
		return (
			(this.inspectOpts.colors = this.useColors),
			us
				.inspect(r, this.inspectOpts)
				.split(
					`
`,
				)
				.map((e) => e.trim())
				.join(' ')
		);
	};
	ac.O = function (r) {
		return (
			(this.inspectOpts.colors = this.useColors),
			us.inspect(r, this.inspectOpts)
		);
	};
});
var uc = E((t_, Vi) => {
	typeof process > 'u' ||
	process.type === 'renderer' ||
	process.browser === !0 ||
	process.__nwjs
		? (Vi.exports = tc())
		: (Vi.exports = cc());
});
var hc = E((r_, lc) => {
	var Or;
	lc.exports = function () {
		if (!Or) {
			try {
				Or = uc()('follow-redirects');
			} catch {}
			typeof Or != 'function' && (Or = function () {});
		}
		Or.apply(null, arguments);
	};
});
var Ji = E((s_, Zi) => {
	var Et = require('url'),
		$i = Et.URL,
		Kd = require('http'),
		Xd = require('https'),
		Wi = require('stream').Writable,
		pc = require('assert'),
		mc = hc(),
		Ki = ['abort', 'aborted', 'connect', 'error', 'socket', 'timeout'],
		Xi = Object.create(null);
	Ki.forEach(function (r) {
		Xi[r] = function (e, t, s) {
			this._redirectable.emit(r, e, t, s);
		};
	});
	var Yd = br('ERR_INVALID_URL', 'Invalid URL', TypeError),
		fc = br('ERR_FR_REDIRECTION_FAILURE', 'Redirected request failed'),
		Zd = br(
			'ERR_FR_TOO_MANY_REDIRECTS',
			'Maximum number of redirects exceeded',
		),
		Jd = br(
			'ERR_FR_MAX_BODY_LENGTH_EXCEEDED',
			'Request body larger than maxBodyLength limit',
		),
		Qd = br('ERR_STREAM_WRITE_AFTER_END', 'write after end'),
		ep = Wi.prototype.destroy || yc;
	function oe(r, e) {
		Wi.call(this),
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
		(this._onNativeResponse = function (s) {
			t._processResponse(s);
		}),
			this._performRequest();
	}
	oe.prototype = Object.create(Wi.prototype);
	oe.prototype.abort = function () {
		Yi(this._currentRequest), this._currentRequest.abort(), this.emit('abort');
	};
	oe.prototype.destroy = function (r) {
		return Yi(this._currentRequest, r), ep.call(this, r), this;
	};
	oe.prototype.write = function (r, e, t) {
		if (this._ending) throw new Qd();
		if (!yt(r) && !rp(r))
			throw new TypeError('data should be a string, Buffer or Uint8Array');
		if ((xr(e) && ((t = e), (e = null)), r.length === 0)) {
			t && t();
			return;
		}
		this._requestBodyLength + r.length <= this._options.maxBodyLength
			? ((this._requestBodyLength += r.length),
			  this._requestBodyBuffers.push({ data: r, encoding: e }),
			  this._currentRequest.write(r, e, t))
			: (this.emit('error', new Jd()), this.abort());
	};
	oe.prototype.end = function (r, e, t) {
		if (
			(xr(r) ? ((t = r), (r = e = null)) : xr(e) && ((t = e), (e = null)), !r)
		)
			(this._ended = this._ending = !0),
				this._currentRequest.end(null, null, t);
		else {
			var s = this,
				i = this._currentRequest;
			this.write(r, e, function () {
				(s._ended = !0), i.end(null, null, t);
			}),
				(this._ending = !0);
		}
	};
	oe.prototype.setHeader = function (r, e) {
		(this._options.headers[r] = e), this._currentRequest.setHeader(r, e);
	};
	oe.prototype.removeHeader = function (r) {
		delete this._options.headers[r], this._currentRequest.removeHeader(r);
	};
	oe.prototype.setTimeout = function (r, e) {
		var t = this;
		function s(o) {
			o.setTimeout(r),
				o.removeListener('timeout', o.destroy),
				o.addListener('timeout', o.destroy);
		}
		function i(o) {
			t._timeout && clearTimeout(t._timeout),
				(t._timeout = setTimeout(function () {
					t.emit('timeout'), n();
				}, r)),
				s(o);
		}
		function n() {
			t._timeout && (clearTimeout(t._timeout), (t._timeout = null)),
				t.removeListener('abort', n),
				t.removeListener('error', n),
				t.removeListener('response', n),
				t.removeListener('close', n),
				e && t.removeListener('timeout', e),
				t.socket || t._currentRequest.removeListener('socket', i);
		}
		return (
			e && this.on('timeout', e),
			this.socket ? i(this.socket) : this._currentRequest.once('socket', i),
			this.on('socket', s),
			this.on('abort', n),
			this.on('error', n),
			this.on('response', n),
			this.on('close', n),
			this
		);
	};
	['flushHeaders', 'getHeader', 'setNoDelay', 'setSocketKeepAlive'].forEach(
		function (r) {
			oe.prototype[r] = function (e, t) {
				return this._currentRequest[r](e, t);
			};
		},
	);
	['aborted', 'connection', 'socket'].forEach(function (r) {
		Object.defineProperty(oe.prototype, r, {
			get: function () {
				return this._currentRequest[r];
			},
		});
	});
	oe.prototype._sanitizeOptions = function (r) {
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
	oe.prototype._performRequest = function () {
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
		var s = (this._currentRequest = e.request(
			this._options,
			this._onNativeResponse,
		));
		s._redirectable = this;
		for (var i of Ki) s.on(i, Xi[i]);
		if (
			((this._currentUrl = /^\//.test(this._options.path)
				? Et.format(this._options)
				: this._options.path),
			this._isRedirect)
		) {
			var n = 0,
				o = this,
				a = this._requestBodyBuffers;
			(function c(u) {
				if (s === o._currentRequest)
					if (u) o.emit('error', u);
					else if (n < a.length) {
						var l = a[n++];
						s.finished || s.write(l.data, l.encoding, c);
					} else o._ended && s.end();
			})();
		}
	};
	oe.prototype._processResponse = function (r) {
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
			(Yi(this._currentRequest),
			r.destroy(),
			++this._redirectCount > this._options.maxRedirects)
		) {
			this.emit('error', new Zd());
			return;
		}
		var s,
			i = this._options.beforeRedirect;
		i &&
			(s = Object.assign(
				{ Host: r.req.getHeader('host') },
				this._options.headers,
			));
		var n = this._options.method;
		(((e === 301 || e === 302) && this._options.method === 'POST') ||
			(e === 303 && !/^(?:GET|HEAD)$/.test(this._options.method))) &&
			((this._options.method = 'GET'),
			(this._requestBodyBuffers = []),
			ji(/^content-/i, this._options.headers));
		var o = ji(/^host$/i, this._options.headers),
			a = Et.parse(this._currentUrl),
			c = o || a.host,
			u = /^\w+:/.test(t)
				? this._currentUrl
				: Et.format(Object.assign(a, { host: c })),
			l;
		try {
			l = Et.resolve(u, t);
		} catch (p) {
			this.emit('error', new fc({ cause: p }));
			return;
		}
		mc('redirecting to', l), (this._isRedirect = !0);
		var h = Et.parse(l);
		if (
			(Object.assign(this._options, h),
			((h.protocol !== a.protocol && h.protocol !== 'https:') ||
				(h.host !== c && !tp(h.host, c))) &&
				ji(/^(?:authorization|cookie)$/i, this._options.headers),
			xr(i))
		) {
			var f = { headers: r.headers, statusCode: e },
				d = { url: u, method: n, headers: s };
			try {
				i(this._options, f, d);
			} catch (p) {
				this.emit('error', p);
				return;
			}
			this._sanitizeOptions(this._options);
		}
		try {
			this._performRequest();
		} catch (p) {
			this.emit('error', new fc({ cause: p }));
		}
	};
	function Ec(r) {
		var e = { maxRedirects: 21, maxBodyLength: 10485760 },
			t = {};
		return (
			Object.keys(r).forEach(function (s) {
				var i = s + ':',
					n = (t[i] = r[s]),
					o = (e[s] = Object.create(n));
				function a(u, l, h) {
					if (yt(u)) {
						var f;
						try {
							f = dc(new $i(u));
						} catch {
							f = Et.parse(u);
						}
						if (!yt(f.protocol)) throw new Yd({ input: u });
						u = f;
					} else $i && u instanceof $i ? (u = dc(u)) : ((h = l), (l = u), (u = { protocol: i }));
					return (
						xr(l) && ((h = l), (l = null)),
						(l = Object.assign(
							{ maxRedirects: e.maxRedirects, maxBodyLength: e.maxBodyLength },
							u,
							l,
						)),
						(l.nativeProtocols = t),
						!yt(l.host) && !yt(l.hostname) && (l.hostname = '::1'),
						pc.equal(l.protocol, i, 'protocol mismatch'),
						mc('options', l),
						new oe(l, h)
					);
				}
				function c(u, l, h) {
					var f = o.request(u, l, h);
					return f.end(), f;
				}
				Object.defineProperties(o, {
					request: { value: a, configurable: !0, enumerable: !0, writable: !0 },
					get: { value: c, configurable: !0, enumerable: !0, writable: !0 },
				});
			}),
			e
		);
	}
	function yc() {}
	function dc(r) {
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
	function ji(r, e) {
		var t;
		for (var s in e) r.test(s) && ((t = e[s]), delete e[s]);
		return t === null || typeof t > 'u' ? void 0 : String(t).trim();
	}
	function br(r, e, t) {
		function s(i) {
			Error.captureStackTrace(this, this.constructor),
				Object.assign(this, i || {}),
				(this.code = r),
				(this.message = this.cause ? e + ': ' + this.cause.message : e);
		}
		return (
			(s.prototype = new (t || Error)()),
			(s.prototype.constructor = s),
			(s.prototype.name = 'Error [' + r + ']'),
			s
		);
	}
	function Yi(r, e) {
		for (var t of Ki) r.removeListener(t, Xi[t]);
		r.on('error', yc), r.destroy(e);
	}
	function tp(r, e) {
		pc(yt(r) && yt(e));
		var t = r.length - e.length - 1;
		return t > 0 && r[t] === '.' && r.endsWith(e);
	}
	function yt(r) {
		return typeof r == 'string' || r instanceof String;
	}
	function xr(r) {
		return typeof r == 'function';
	}
	function rp(r) {
		return typeof r == 'object' && 'length' in r;
	}
	Zi.exports = Ec({ http: Kd, https: Xd });
	Zi.exports.wrap = Ec;
});
var Qi = E((i_, sp) => {
	sp.exports = {
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
var wc = E((n_, Cc) => {
	'use strict';
	var Ir = re(),
		_c = Mi(),
		ip = Pi(),
		np = ts(),
		op = require('http'),
		ap = require('https'),
		cp = Ji().http,
		up = Ji().https,
		Rc = require('url'),
		lp = require('zlib'),
		hp = Qi(),
		hs = is(),
		en = ss(),
		gc = /https:?/;
	function vc(r, e, t) {
		if (
			((r.hostname = e.host),
			(r.host = e.host),
			(r.port = e.port),
			(r.path = t),
			e.auth)
		) {
			var s = Buffer.from(
				e.auth.username + ':' + e.auth.password,
				'utf8',
			).toString('base64');
			r.headers['Proxy-Authorization'] = 'Basic ' + s;
		}
		r.beforeRedirect = function (n) {
			(n.headers.host = n.host), vc(n, e, n.href);
		};
	}
	Cc.exports = function (e) {
		return new Promise(function (s, i) {
			var n = function (O) {
					s(O);
				},
				o = function (O) {
					i(O);
				},
				a = e.data,
				c = e.headers;
			if (
				('User-Agent' in c || 'user-agent' in c
					? !c['User-Agent'] &&
					  !c['user-agent'] &&
					  (delete c['User-Agent'], delete c['user-agent'])
					: (c['User-Agent'] = 'axios/' + hp.version),
				a && !Ir.isStream(a))
			) {
				if (!Buffer.isBuffer(a))
					if (Ir.isArrayBuffer(a)) a = Buffer.from(new Uint8Array(a));
					else if (Ir.isString(a)) a = Buffer.from(a, 'utf-8');
					else
						return o(
							hs(
								'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
								e,
							),
						);
				c['Content-Length'] = a.length;
			}
			var u = void 0;
			if (e.auth) {
				var l = e.auth.username || '',
					h = e.auth.password || '';
				u = l + ':' + h;
			}
			var f = ip(e.baseURL, e.url),
				d = Rc.parse(f),
				p = d.protocol || 'http:';
			if (!u && d.auth) {
				var y = d.auth.split(':'),
					_ = y[0] || '',
					g = y[1] || '';
				u = _ + ':' + g;
			}
			u && delete c.Authorization;
			var T = gc.test(p),
				S = T ? e.httpsAgent : e.httpAgent,
				w = {
					path: np(d.path, e.params, e.paramsSerializer).replace(/^\?/, ''),
					method: e.method.toUpperCase(),
					headers: c,
					agent: S,
					agents: { http: e.httpAgent, https: e.httpsAgent },
					auth: u,
				};
			e.socketPath
				? (w.socketPath = e.socketPath)
				: ((w.hostname = d.hostname), (w.port = d.port));
			var A = e.proxy;
			if (!A && A !== !1) {
				var v = p.slice(0, -1) + '_proxy',
					L = process.env[v] || process.env[v.toUpperCase()];
				if (L) {
					var b = Rc.parse(L),
						B = process.env.no_proxy || process.env.NO_PROXY,
						q = !0;
					if (B) {
						var le = B.split(',').map(function (O) {
							return O.trim();
						});
						q = !le.some(function (O) {
							return O
								? O === '*' ||
								  (O[0] === '.' &&
										d.hostname.substr(d.hostname.length - O.length) === O)
									? !0
									: d.hostname === O
								: !1;
						});
					}
					if (
						q &&
						((A = { host: b.hostname, port: b.port, protocol: b.protocol }),
						b.auth)
					) {
						var ie = b.auth.split(':');
						A.auth = { username: ie[0], password: ie[1] };
					}
				}
			}
			A &&
				((w.headers.host = d.hostname + (d.port ? ':' + d.port : '')),
				vc(
					w,
					A,
					p + '//' + d.hostname + (d.port ? ':' + d.port : '') + w.path,
				));
			var H,
				Ee = T && (A ? gc.test(A.protocol) : !0);
			e.transport
				? (H = e.transport)
				: e.maxRedirects === 0
				? (H = Ee ? ap : op)
				: (e.maxRedirects && (w.maxRedirects = e.maxRedirects),
				  (H = Ee ? up : cp)),
				e.maxBodyLength > -1 && (w.maxBodyLength = e.maxBodyLength);
			var k = H.request(w, function (O) {
				if (!k.aborted) {
					var W = O,
						z = O.req || k;
					if (
						O.statusCode !== 204 &&
						z.method !== 'HEAD' &&
						e.decompress !== !1
					)
						switch (O.headers['content-encoding']) {
							case 'gzip':
							case 'compress':
							case 'deflate':
								(W = W.pipe(lp.createUnzip())),
									delete O.headers['content-encoding'];
								break;
						}
					var Ie = {
						status: O.statusCode,
						statusText: O.statusMessage,
						headers: O.headers,
						config: e,
						request: z,
					};
					if (e.responseType === 'stream') (Ie.data = W), _c(n, o, Ie);
					else {
						var m = [],
							R = 0;
						W.on('data', function (x) {
							m.push(x),
								(R += x.length),
								e.maxContentLength > -1 &&
									R > e.maxContentLength &&
									(W.destroy(),
									o(
										hs(
											'maxContentLength size of ' +
												e.maxContentLength +
												' exceeded',
											e,
											null,
											z,
										),
									));
						}),
							W.on('error', function (x) {
								k.aborted || o(en(x, e, null, z));
							}),
							W.on('end', function () {
								var x = Buffer.concat(m);
								e.responseType !== 'arraybuffer' &&
									((x = x.toString(e.responseEncoding)),
									(!e.responseEncoding || e.responseEncoding === 'utf8') &&
										(x = Ir.stripBOM(x))),
									(Ie.data = x),
									_c(n, o, Ie);
							});
					}
				}
			});
			if (
				(k.on('error', function (O) {
					(k.aborted && O.code !== 'ERR_FR_TOO_MANY_REDIRECTS') ||
						o(en(O, e, null, k));
				}),
				e.timeout)
			) {
				var we = parseInt(e.timeout, 10);
				if (isNaN(we)) {
					o(
						hs(
							'error trying to parse `config.timeout` to int',
							e,
							'ERR_PARSE_TIMEOUT',
							k,
						),
					);
					return;
				}
				k.setTimeout(we, function () {
					k.abort(),
						o(
							hs(
								'timeout of ' + we + 'ms exceeded',
								e,
								e.transitional && e.transitional.clarifyTimeoutError
									? 'ETIMEDOUT'
									: 'ECONNABORTED',
								k,
							),
						);
				});
			}
			e.cancelToken &&
				e.cancelToken.promise.then(function (O) {
					k.aborted || (k.abort(), o(O));
				}),
				Ir.isStream(a)
					? a
							.on('error', function (O) {
								o(en(O, e, null, k));
							})
							.pipe(k)
					: k.end(a);
		});
	};
});
var ds = E((o_, Oc) => {
	'use strict';
	var se = re(),
		Sc = Fa(),
		fp = ss(),
		dp = { 'Content-Type': 'application/x-www-form-urlencoded' };
	function Tc(r, e) {
		!se.isUndefined(r) &&
			se.isUndefined(r['Content-Type']) &&
			(r['Content-Type'] = e);
	}
	function pp() {
		var r;
		return (
			typeof XMLHttpRequest < 'u'
				? (r = Za())
				: typeof process < 'u' &&
				  Object.prototype.toString.call(process) === '[object process]' &&
				  (r = wc()),
			r
		);
	}
	var fs = {
		transitional: {
			silentJSONParsing: !0,
			forcedJSONParsing: !0,
			clarifyTimeoutError: !1,
		},
		adapter: pp(),
		transformRequest: [
			function (e, t) {
				return (
					Sc(t, 'Accept'),
					Sc(t, 'Content-Type'),
					se.isFormData(e) ||
					se.isArrayBuffer(e) ||
					se.isBuffer(e) ||
					se.isStream(e) ||
					se.isFile(e) ||
					se.isBlob(e)
						? e
						: se.isArrayBufferView(e)
						? e.buffer
						: se.isURLSearchParams(e)
						? (Tc(t, 'application/x-www-form-urlencoded;charset=utf-8'),
						  e.toString())
						: se.isObject(e) || (t && t['Content-Type'] === 'application/json')
						? (Tc(t, 'application/json'), JSON.stringify(e))
						: e
				);
			},
		],
		transformResponse: [
			function (e) {
				var t = this.transitional,
					s = t && t.silentJSONParsing,
					i = t && t.forcedJSONParsing,
					n = !s && this.responseType === 'json';
				if (n || (i && se.isString(e) && e.length))
					try {
						return JSON.parse(e);
					} catch (o) {
						if (n)
							throw o.name === 'SyntaxError' ? fp(o, this, 'E_JSON_PARSE') : o;
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
	fs.headers = { common: { Accept: 'application/json, text/plain, */*' } };
	se.forEach(['delete', 'get', 'head'], function (e) {
		fs.headers[e] = {};
	});
	se.forEach(['post', 'put', 'patch'], function (e) {
		fs.headers[e] = se.merge(dp);
	});
	Oc.exports = fs;
});
var bc = E((a_, xc) => {
	'use strict';
	var mp = re(),
		Ep = ds();
	xc.exports = function (e, t, s) {
		var i = this || Ep;
		return (
			mp.forEach(s, function (o) {
				e = o.call(i, e, t);
			}),
			e
		);
	};
});
var tn = E((c_, Ic) => {
	'use strict';
	Ic.exports = function (e) {
		return !!(e && e.__CANCEL__);
	};
});
var Lc = E((u_, Ac) => {
	'use strict';
	var Nc = re(),
		rn = bc(),
		yp = tn(),
		_p = ds();
	function sn(r) {
		r.cancelToken && r.cancelToken.throwIfRequested();
	}
	Ac.exports = function (e) {
		sn(e),
			(e.headers = e.headers || {}),
			(e.data = rn.call(e, e.data, e.headers, e.transformRequest)),
			(e.headers = Nc.merge(
				e.headers.common || {},
				e.headers[e.method] || {},
				e.headers,
			)),
			Nc.forEach(
				['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
				function (i) {
					delete e.headers[i];
				},
			);
		var t = e.adapter || _p.adapter;
		return t(e).then(
			function (i) {
				return (
					sn(e),
					(i.data = rn.call(e, i.data, i.headers, e.transformResponse)),
					i
				);
			},
			function (i) {
				return (
					yp(i) ||
						(sn(e),
						i &&
							i.response &&
							(i.response.data = rn.call(
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
var nn = E((l_, Dc) => {
	'use strict';
	var X = re();
	Dc.exports = function (e, t) {
		t = t || {};
		var s = {},
			i = ['url', 'method', 'data'],
			n = ['headers', 'auth', 'proxy', 'params'],
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
		function c(f, d) {
			return X.isPlainObject(f) && X.isPlainObject(d)
				? X.merge(f, d)
				: X.isPlainObject(d)
				? X.merge({}, d)
				: X.isArray(d)
				? d.slice()
				: d;
		}
		function u(f) {
			X.isUndefined(t[f])
				? X.isUndefined(e[f]) || (s[f] = c(void 0, e[f]))
				: (s[f] = c(e[f], t[f]));
		}
		X.forEach(i, function (d) {
			X.isUndefined(t[d]) || (s[d] = c(void 0, t[d]));
		}),
			X.forEach(n, u),
			X.forEach(o, function (d) {
				X.isUndefined(t[d])
					? X.isUndefined(e[d]) || (s[d] = c(void 0, e[d]))
					: (s[d] = c(void 0, t[d]));
			}),
			X.forEach(a, function (d) {
				d in t ? (s[d] = c(e[d], t[d])) : d in e && (s[d] = c(void 0, e[d]));
			});
		var l = i.concat(n).concat(o).concat(a),
			h = Object.keys(e)
				.concat(Object.keys(t))
				.filter(function (d) {
					return l.indexOf(d) === -1;
				});
		return X.forEach(h, u), s;
	};
});
var Pc = E((h_, Mc) => {
	'use strict';
	var Uc = Qi(),
		on = {};
	['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(
		function (r, e) {
			on[r] = function (s) {
				return typeof s === r || 'a' + (e < 1 ? 'n ' : ' ') + r;
			};
		},
	);
	var Fc = {},
		Rp = Uc.version.split('.');
	function Bc(r, e) {
		for (var t = e ? e.split('.') : Rp, s = r.split('.'), i = 0; i < 3; i++) {
			if (t[i] > s[i]) return !0;
			if (t[i] < s[i]) return !1;
		}
		return !1;
	}
	on.transitional = function (e, t, s) {
		var i = t && Bc(t);
		function n(o, a) {
			return (
				'[Axios v' +
				Uc.version +
				"] Transitional option '" +
				o +
				"'" +
				a +
				(s ? '. ' + s : '')
			);
		}
		return function (o, a, c) {
			if (e === !1) throw new Error(n(a, ' has been removed in ' + t));
			return (
				i &&
					!Fc[a] &&
					((Fc[a] = !0),
					console.warn(
						n(
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
	function gp(r, e, t) {
		if (typeof r != 'object') throw new TypeError('options must be an object');
		for (var s = Object.keys(r), i = s.length; i-- > 0; ) {
			var n = s[i],
				o = e[n];
			if (o) {
				var a = r[n],
					c = a === void 0 || o(a, n, r);
				if (c !== !0) throw new TypeError('option ' + n + ' must be ' + c);
				continue;
			}
			if (t !== !0) throw Error('Unknown option ' + n);
		}
	}
	Mc.exports = { isOlderVersion: Bc, assertOptions: gp, validators: on };
});
var Vc = E((f_, zc) => {
	'use strict';
	var Hc = re(),
		vp = ts(),
		kc = La(),
		qc = Lc(),
		ps = nn(),
		Gc = Pc(),
		Vt = Gc.validators;
	function Nr(r) {
		(this.defaults = r),
			(this.interceptors = { request: new kc(), response: new kc() });
	}
	Nr.prototype.request = function (e) {
		typeof e == 'string'
			? ((e = arguments[1] || {}), (e.url = arguments[0]))
			: (e = e || {}),
			(e = ps(this.defaults, e)),
			e.method
				? (e.method = e.method.toLowerCase())
				: this.defaults.method
				? (e.method = this.defaults.method.toLowerCase())
				: (e.method = 'get');
		var t = e.transitional;
		t !== void 0 &&
			Gc.assertOptions(
				t,
				{
					silentJSONParsing: Vt.transitional(Vt.boolean, '1.0.0'),
					forcedJSONParsing: Vt.transitional(Vt.boolean, '1.0.0'),
					clarifyTimeoutError: Vt.transitional(Vt.boolean, '1.0.0'),
				},
				!1,
			);
		var s = [],
			i = !0;
		this.interceptors.request.forEach(function (f) {
			(typeof f.runWhen == 'function' && f.runWhen(e) === !1) ||
				((i = i && f.synchronous), s.unshift(f.fulfilled, f.rejected));
		});
		var n = [];
		this.interceptors.response.forEach(function (f) {
			n.push(f.fulfilled, f.rejected);
		});
		var o;
		if (!i) {
			var a = [qc, void 0];
			for (
				Array.prototype.unshift.apply(a, s),
					a.concat(n),
					o = Promise.resolve(e);
				a.length;

			)
				o = o.then(a.shift(), a.shift());
			return o;
		}
		for (var c = e; s.length; ) {
			var u = s.shift(),
				l = s.shift();
			try {
				c = u(c);
			} catch (h) {
				l(h);
				break;
			}
		}
		try {
			o = qc(c);
		} catch (h) {
			return Promise.reject(h);
		}
		for (; n.length; ) o = o.then(n.shift(), n.shift());
		return o;
	};
	Nr.prototype.getUri = function (e) {
		return (
			(e = ps(this.defaults, e)),
			vp(e.url, e.params, e.paramsSerializer).replace(/^\?/, '')
		);
	};
	Hc.forEach(['delete', 'get', 'head', 'options'], function (e) {
		Nr.prototype[e] = function (t, s) {
			return this.request(
				ps(s || {}, { method: e, url: t, data: (s || {}).data }),
			);
		};
	});
	Hc.forEach(['post', 'put', 'patch'], function (e) {
		Nr.prototype[e] = function (t, s, i) {
			return this.request(ps(i || {}, { method: e, url: t, data: s }));
		};
	});
	zc.exports = Nr;
});
var cn = E((d_, $c) => {
	'use strict';
	function an(r) {
		this.message = r;
	}
	an.prototype.toString = function () {
		return 'Cancel' + (this.message ? ': ' + this.message : '');
	};
	an.prototype.__CANCEL__ = !0;
	$c.exports = an;
});
var Wc = E((p_, jc) => {
	'use strict';
	var Cp = cn();
	function ms(r) {
		if (typeof r != 'function')
			throw new TypeError('executor must be a function.');
		var e;
		this.promise = new Promise(function (i) {
			e = i;
		});
		var t = this;
		r(function (i) {
			t.reason || ((t.reason = new Cp(i)), e(t.reason));
		});
	}
	ms.prototype.throwIfRequested = function () {
		if (this.reason) throw this.reason;
	};
	ms.source = function () {
		var e,
			t = new ms(function (i) {
				e = i;
			});
		return { token: t, cancel: e };
	};
	jc.exports = ms;
});
var Xc = E((m_, Kc) => {
	'use strict';
	Kc.exports = function (e) {
		return function (s) {
			return e.apply(null, s);
		};
	};
});
var Zc = E((E_, Yc) => {
	'use strict';
	Yc.exports = function (e) {
		return typeof e == 'object' && e.isAxiosError === !0;
	};
});
var eu = E((y_, un) => {
	'use strict';
	var Jc = re(),
		wp = Li(),
		Es = Vc(),
		Sp = nn(),
		Tp = ds();
	function Qc(r) {
		var e = new Es(r),
			t = wp(Es.prototype.request, e);
		return Jc.extend(t, Es.prototype, e), Jc.extend(t, e), t;
	}
	var Te = Qc(Tp);
	Te.Axios = Es;
	Te.create = function (e) {
		return Qc(Sp(Te.defaults, e));
	};
	Te.Cancel = cn();
	Te.CancelToken = Wc();
	Te.isCancel = tn();
	Te.all = function (e) {
		return Promise.all(e);
	};
	Te.spread = Xc();
	Te.isAxiosError = Zc();
	un.exports = Te;
	un.exports.default = Te;
});
var ln = E((__, tu) => {
	tu.exports = eu();
});
function $t(r, e = 1e4) {
	let t = (n) => n,
		s = process.env.NX_CLOUD_API || r.url || 'https://cloud.nx.app',
		i = wr ? wr : r.accessToken;
	if (!i)
		throw new Error(
			'Unable to authenticate. Either define accessToken in nx.json or set the NX_CLOUD_ACCESS_TOKEN env variable.',
		);
	if (r.customProxyConfigPath) {
		let { nxCloudProxyConfig: n } = require((0, su.join)(
			process.cwd(),
			r.customProxyConfigPath,
		));
		t = n ?? t;
	}
	return Op.create(
		t({
			baseURL: s,
			timeout: Se ? Bt : e,
			headers: {
				authorization: i,
				'Nx-Cloud-Client-Version': r.clientVersion || 'unknown',
			},
		}),
	);
}
async function fn(r, e) {
	let t = new Date(),
		s = await e();
	return M && console.log(`${r}: ${new Date().getTime() - t.getTime()}`), s;
}
async function He(r, e = Cr) {
	try {
		return await r();
	} catch (t) {
		let s = (t.response && t.response.status) || t.code;
		(s === 401 || s === 403) && (e = 0);
		let i = t.response
			? t.response.data.message
				? t.response.data.message
				: t.response.data
			: t.message;
		if (e === 0)
			throw (
				(typeof i != 'string' && (i = t.message),
				new hn(
					'failure',
					`Error when connecting to Nx Cloud. Code: ${s}. Error: ${i}`,
					t,
				))
			);
		if (s == 429) {
			if (!ys) {
				let n = 1e4 + (Cr + 1 - e) * 6e4 * Math.random();
				ru.note({ title: `Received Code ${s}. ${i} Retrying in ${n}ms.` }),
					(ys = kt(n));
			}
			await ys, (ys = null);
		} else {
			let n = 1e3 + (Cr + 1 - e) * 4e3 * Math.random();
			M && ru.note({ title: `Received Code ${s}. Retrying in ${n}ms.` }),
				await kt(n);
		}
		return He(r, e - 1);
	}
}
var su,
	ru,
	Op,
	hn,
	ys,
	Ar = ee(() => {
		'use strict';
		su = require('path');
		dt();
		Ai();
		({ output: ru } = qe()),
			(Op = ln()),
			(hn = class {
				constructor(e, t, s) {
					this.type = e;
					this.message = t;
					this.axiosException = s;
				}
			});
		ys = null;
	});
function _s(r) {
	xp()
		? (process.stdout.write(`   ${dn(r)}`), Ae.addNewline(), Ae.addNewline())
		: bp()
		? (Ae.addNewline(),
		  process.stdout.write(`${dn(r)}`),
		  Ae.addNewline(),
		  Ae.addNewline())
		: (process.stdout.write(`  ${dn(r)}`), Ae.addNewline(), Ae.addNewline());
}
function xp() {
	try {
		return (
			F(
				'nx/src/tasks-runner/life-cycles/dynamic-run-many-terminal-output-life-cycle',
			),
			!0
		);
	} catch {
		try {
			return (
				F(
					'@nrwl/workspace/src/tasks-runner/life-cycles/dynamic-run-many-terminal-output-life-cycle',
				),
				!0
			);
		} catch {
			return !1;
		}
	}
}
function dn(r) {
	let e;
	if (typeof Ae.dim == 'function') return Ae.dim(r);
	try {
		return Ae.colors.gray(r);
	} catch {
		return r;
	}
}
function bp() {
	return (
		process.argv.indexOf('run-many') === -1 &&
		process.argv.indexOf('affected') === -1
	);
}
var Ae,
	pn = ee(() => {
		'use strict';
		Rr();
		({ output: Ae } = qe());
	});
var nu = {};
Pe(nu, {
	RUNNER_FAILURE_PERF_ENTRY: () => Rt,
	createMetricRecorder: () => _t,
	mapRespToPerfEntry: () => Oe,
	submitRunMetrics: () => Ap,
});
var mn,
	iu,
	_t,
	Oe,
	Rt,
	Ip,
	Np,
	Ap,
	Rs = ee(() => {
		'use strict';
		mn = require('perf_hooks');
		Ar();
		dt();
		pn();
		(iu = []),
			(_t = (r) => {
				let e = mn.performance.now();
				return {
					recordMetric: (s) => {
						let i = mn.performance.now();
						(s.durationMs = i - e), (s.entryType = r), iu.push(s);
					},
				};
			}),
			(Oe = (r) => {
				var e;
				return {
					success:
						((e = r == null ? void 0 : r.status) == null
							? void 0
							: e.toString().startsWith('2')) ?? !1,
					statusCode: (r == null ? void 0 : r.status) ?? -1,
				};
			}),
			(Rt = { success: !1, statusCode: -1 }),
			(Ip = 0.1),
			(Np = 0.01),
			(Ap = (r) => {
				let e;
				Tr() ? (e = Ip) : (e = Np);
				try {
					return bi || Math.random() < e
						? (M && _s('Submitting runner metrics for this run.'),
						  $t(r)
								.post('/nx-cloud/save-metrics', { entries: iu })
								.catch((s) => {}))
						: Promise.resolve();
				} catch {}
			});
	});
var jt = E((x_, au) => {
	'use strict';
	var ou = new Map([
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
	au.exports = (r) =>
		r
			? Object.keys(r)
					.map((e) => [ou.has(e) ? ou.get(e) : e, r[e]])
					.reduce((e, t) => ((e[t[0]] = t[1]), e), Object.create(null))
			: {};
});
var Kt = E((b_, Eu) => {
	'use strict';
	var cu =
			typeof process == 'object' && process
				? process
				: { stdout: null, stderr: null },
		Lp = require('events'),
		uu = require('stream'),
		lu = require('string_decoder').StringDecoder,
		Ge = Symbol('EOF'),
		ze = Symbol('maybeEmitEnd'),
		Qe = Symbol('emittedEnd'),
		gs = Symbol('emittingEnd'),
		Lr = Symbol('emittedError'),
		vs = Symbol('closed'),
		hu = Symbol('read'),
		Cs = Symbol('flush'),
		fu = Symbol('flushChunk'),
		ae = Symbol('encoding'),
		Ve = Symbol('decoder'),
		ws = Symbol('flowing'),
		Dr = Symbol('paused'),
		Wt = Symbol('resume'),
		$ = Symbol('bufferLength'),
		En = Symbol('bufferPush'),
		yn = Symbol('bufferShift'),
		Y = Symbol('objectMode'),
		Z = Symbol('destroyed'),
		_n = Symbol('emitData'),
		du = Symbol('emitEnd'),
		Rn = Symbol('emitEnd2'),
		$e = Symbol('async'),
		Fr = (r) => Promise.resolve().then(r),
		pu = global._MP_NO_ITERATOR_SYMBOLS_ !== '1',
		Dp =
			(pu && Symbol.asyncIterator) || Symbol('asyncIterator not implemented'),
		Fp = (pu && Symbol.iterator) || Symbol('iterator not implemented'),
		Up = (r) => r === 'end' || r === 'finish' || r === 'prefinish',
		Bp = (r) =>
			r instanceof ArrayBuffer ||
			(typeof r == 'object' &&
				r.constructor &&
				r.constructor.name === 'ArrayBuffer' &&
				r.byteLength >= 0),
		Mp = (r) => !Buffer.isBuffer(r) && ArrayBuffer.isView(r),
		Ss = class {
			constructor(e, t, s) {
				(this.src = e),
					(this.dest = t),
					(this.opts = s),
					(this.ondrain = () => e[Wt]()),
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
		gn = class extends Ss {
			unpipe() {
				this.src.removeListener('error', this.proxyErrors), super.unpipe();
			}
			constructor(e, t, s) {
				super(e, t, s),
					(this.proxyErrors = (i) => t.emit('error', i)),
					e.on('error', this.proxyErrors);
			}
		};
	Eu.exports = class mu extends uu {
		constructor(e) {
			super(),
				(this[ws] = !1),
				(this[Dr] = !1),
				(this.pipes = []),
				(this.buffer = []),
				(this[Y] = (e && e.objectMode) || !1),
				this[Y] ? (this[ae] = null) : (this[ae] = (e && e.encoding) || null),
				this[ae] === 'buffer' && (this[ae] = null),
				(this[$e] = (e && !!e.async) || !1),
				(this[Ve] = this[ae] ? new lu(this[ae]) : null),
				(this[Ge] = !1),
				(this[Qe] = !1),
				(this[gs] = !1),
				(this[vs] = !1),
				(this[Lr] = null),
				(this.writable = !0),
				(this.readable = !0),
				(this[$] = 0),
				(this[Z] = !1);
		}
		get bufferLength() {
			return this[$];
		}
		get encoding() {
			return this[ae];
		}
		set encoding(e) {
			if (this[Y]) throw new Error('cannot set encoding in objectMode');
			if (
				this[ae] &&
				e !== this[ae] &&
				((this[Ve] && this[Ve].lastNeed) || this[$])
			)
				throw new Error('cannot change encoding');
			this[ae] !== e &&
				((this[Ve] = e ? new lu(e) : null),
				this.buffer.length &&
					(this.buffer = this.buffer.map((t) => this[Ve].write(t)))),
				(this[ae] = e);
		}
		setEncoding(e) {
			this.encoding = e;
		}
		get objectMode() {
			return this[Y];
		}
		set objectMode(e) {
			this[Y] = this[Y] || !!e;
		}
		get async() {
			return this[$e];
		}
		set async(e) {
			this[$e] = this[$e] || !!e;
		}
		write(e, t, s) {
			if (this[Ge]) throw new Error('write after end');
			if (this[Z])
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
			typeof t == 'function' && ((s = t), (t = 'utf8')), t || (t = 'utf8');
			let i = this[$e] ? Fr : (n) => n();
			return (
				!this[Y] &&
					!Buffer.isBuffer(e) &&
					(Mp(e)
						? (e = Buffer.from(e.buffer, e.byteOffset, e.byteLength))
						: Bp(e)
						? (e = Buffer.from(e))
						: typeof e != 'string' && (this.objectMode = !0)),
				this[Y]
					? (this.flowing && this[$] !== 0 && this[Cs](!0),
					  this.flowing ? this.emit('data', e) : this[En](e),
					  this[$] !== 0 && this.emit('readable'),
					  s && i(s),
					  this.flowing)
					: e.length
					? (typeof e == 'string' &&
							!(t === this[ae] && !this[Ve].lastNeed) &&
							(e = Buffer.from(e, t)),
					  Buffer.isBuffer(e) && this[ae] && (e = this[Ve].write(e)),
					  this.flowing && this[$] !== 0 && this[Cs](!0),
					  this.flowing ? this.emit('data', e) : this[En](e),
					  this[$] !== 0 && this.emit('readable'),
					  s && i(s),
					  this.flowing)
					: (this[$] !== 0 && this.emit('readable'), s && i(s), this.flowing)
			);
		}
		read(e) {
			if (this[Z]) return null;
			if (this[$] === 0 || e === 0 || e > this[$]) return this[ze](), null;
			this[Y] && (e = null),
				this.buffer.length > 1 &&
					!this[Y] &&
					(this.encoding
						? (this.buffer = [this.buffer.join('')])
						: (this.buffer = [Buffer.concat(this.buffer, this[$])]));
			let t = this[hu](e || null, this.buffer[0]);
			return this[ze](), t;
		}
		[hu](e, t) {
			return (
				e === t.length || e === null
					? this[yn]()
					: ((this.buffer[0] = t.slice(e)),
					  (t = t.slice(0, e)),
					  (this[$] -= e)),
				this.emit('data', t),
				!this.buffer.length && !this[Ge] && this.emit('drain'),
				t
			);
		}
		end(e, t, s) {
			return (
				typeof e == 'function' && ((s = e), (e = null)),
				typeof t == 'function' && ((s = t), (t = 'utf8')),
				e && this.write(e, t),
				s && this.once('end', s),
				(this[Ge] = !0),
				(this.writable = !1),
				(this.flowing || !this[Dr]) && this[ze](),
				this
			);
		}
		[Wt]() {
			this[Z] ||
				((this[Dr] = !1),
				(this[ws] = !0),
				this.emit('resume'),
				this.buffer.length
					? this[Cs]()
					: this[Ge]
					? this[ze]()
					: this.emit('drain'));
		}
		resume() {
			return this[Wt]();
		}
		pause() {
			(this[ws] = !1), (this[Dr] = !0);
		}
		get destroyed() {
			return this[Z];
		}
		get flowing() {
			return this[ws];
		}
		get paused() {
			return this[Dr];
		}
		[En](e) {
			this[Y] ? (this[$] += 1) : (this[$] += e.length), this.buffer.push(e);
		}
		[yn]() {
			return (
				this.buffer.length &&
					(this[Y] ? (this[$] -= 1) : (this[$] -= this.buffer[0].length)),
				this.buffer.shift()
			);
		}
		[Cs](e) {
			do;
			while (this[fu](this[yn]()));
			!e && !this.buffer.length && !this[Ge] && this.emit('drain');
		}
		[fu](e) {
			return e ? (this.emit('data', e), this.flowing) : !1;
		}
		pipe(e, t) {
			if (this[Z]) return;
			let s = this[Qe];
			return (
				(t = t || {}),
				e === cu.stdout || e === cu.stderr
					? (t.end = !1)
					: (t.end = t.end !== !1),
				(t.proxyErrors = !!t.proxyErrors),
				s
					? t.end && e.end()
					: (this.pipes.push(
							t.proxyErrors ? new gn(this, e, t) : new Ss(this, e, t),
					  ),
					  this[$e] ? Fr(() => this[Wt]()) : this[Wt]()),
				e
			);
		}
		unpipe(e) {
			let t = this.pipes.find((s) => s.dest === e);
			t && (this.pipes.splice(this.pipes.indexOf(t), 1), t.unpipe());
		}
		addListener(e, t) {
			return this.on(e, t);
		}
		on(e, t) {
			let s = super.on(e, t);
			return (
				e === 'data' && !this.pipes.length && !this.flowing
					? this[Wt]()
					: e === 'readable' && this[$] !== 0
					? super.emit('readable')
					: Up(e) && this[Qe]
					? (super.emit(e), this.removeAllListeners(e))
					: e === 'error' &&
					  this[Lr] &&
					  (this[$e]
							? Fr(() => t.call(this, this[Lr]))
							: t.call(this, this[Lr])),
				s
			);
		}
		get emittedEnd() {
			return this[Qe];
		}
		[ze]() {
			!this[gs] &&
				!this[Qe] &&
				!this[Z] &&
				this.buffer.length === 0 &&
				this[Ge] &&
				((this[gs] = !0),
				this.emit('end'),
				this.emit('prefinish'),
				this.emit('finish'),
				this[vs] && this.emit('close'),
				(this[gs] = !1));
		}
		emit(e, t, ...s) {
			if (e !== 'error' && e !== 'close' && e !== Z && this[Z]) return;
			if (e === 'data')
				return t ? (this[$e] ? Fr(() => this[_n](t)) : this[_n](t)) : !1;
			if (e === 'end') return this[du]();
			if (e === 'close') {
				if (((this[vs] = !0), !this[Qe] && !this[Z])) return;
				let n = super.emit('close');
				return this.removeAllListeners('close'), n;
			} else if (e === 'error') {
				this[Lr] = t;
				let n = super.emit('error', t);
				return this[ze](), n;
			} else if (e === 'resume') {
				let n = super.emit('resume');
				return this[ze](), n;
			} else if (e === 'finish' || e === 'prefinish') {
				let n = super.emit(e);
				return this.removeAllListeners(e), n;
			}
			let i = super.emit(e, t, ...s);
			return this[ze](), i;
		}
		[_n](e) {
			for (let s of this.pipes) s.dest.write(e) === !1 && this.pause();
			let t = super.emit('data', e);
			return this[ze](), t;
		}
		[du]() {
			this[Qe] ||
				((this[Qe] = !0),
				(this.readable = !1),
				this[$e] ? Fr(() => this[Rn]()) : this[Rn]());
		}
		[Rn]() {
			if (this[Ve]) {
				let t = this[Ve].end();
				if (t) {
					for (let s of this.pipes) s.dest.write(t);
					super.emit('data', t);
				}
			}
			for (let t of this.pipes) t.end();
			let e = super.emit('end');
			return this.removeAllListeners('end'), e;
		}
		collect() {
			let e = [];
			this[Y] || (e.dataLength = 0);
			let t = this.promise();
			return (
				this.on('data', (s) => {
					e.push(s), this[Y] || (e.dataLength += s.length);
				}),
				t.then(() => e)
			);
		}
		concat() {
			return this[Y]
				? Promise.reject(new Error('cannot concat in objectMode'))
				: this.collect().then((e) =>
						this[Y]
							? Promise.reject(new Error('cannot concat in objectMode'))
							: this[ae]
							? e.join('')
							: Buffer.concat(e, e.dataLength),
				  );
		}
		promise() {
			return new Promise((e, t) => {
				this.on(Z, () => t(new Error('stream destroyed'))),
					this.on('error', (s) => t(s)),
					this.on('end', () => e());
			});
		}
		[Dp]() {
			return {
				next: () => {
					let t = this.read();
					if (t !== null) return Promise.resolve({ done: !1, value: t });
					if (this[Ge]) return Promise.resolve({ done: !0 });
					let s = null,
						i = null,
						n = (u) => {
							this.removeListener('data', o),
								this.removeListener('end', a),
								i(u);
						},
						o = (u) => {
							this.removeListener('error', n),
								this.removeListener('end', a),
								this.pause(),
								s({ value: u, done: !!this[Ge] });
						},
						a = () => {
							this.removeListener('error', n),
								this.removeListener('data', o),
								s({ done: !0 });
						},
						c = () => n(new Error('stream destroyed'));
					return new Promise((u, l) => {
						(i = l),
							(s = u),
							this.once(Z, c),
							this.once('error', n),
							this.once('end', a),
							this.once('data', o);
					});
				},
			};
		}
		[Fp]() {
			return {
				next: () => {
					let t = this.read();
					return { value: t, done: t === null };
				},
			};
		}
		destroy(e) {
			return this[Z]
				? (e ? this.emit('error', e) : this.emit(Z), this)
				: ((this[Z] = !0),
				  (this.buffer.length = 0),
				  (this[$] = 0),
				  typeof this.close == 'function' && !this[vs] && this.close(),
				  e ? this.emit('error', e) : this.emit(Z),
				  this);
		}
		static isStream(e) {
			return (
				!!e &&
				(e instanceof mu ||
					e instanceof uu ||
					(e instanceof Lp &&
						(typeof e.pipe == 'function' ||
							(typeof e.write == 'function' && typeof e.end == 'function'))))
			);
		}
	};
});
var _u = E((I_, yu) => {
	var Pp = require('zlib').constants || { ZLIB_VERNUM: 4736 };
	yu.exports = Object.freeze(
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
			Pp,
		),
	);
});
var Bn = E((fe) => {
	'use strict';
	var Tn = require('assert'),
		et = require('buffer').Buffer,
		vu = require('zlib'),
		gt = (fe.constants = _u()),
		kp = Kt(),
		Ru = et.concat,
		vt = Symbol('_superWrite'),
		Yt = class extends Error {
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
		qp = Symbol('opts'),
		Ur = Symbol('flushFlag'),
		gu = Symbol('finishFlushFlag'),
		Un = Symbol('fullFlushFlag'),
		U = Symbol('handle'),
		Ts = Symbol('onError'),
		Xt = Symbol('sawError'),
		vn = Symbol('level'),
		Cn = Symbol('strategy'),
		wn = Symbol('ended'),
		N_ = Symbol('_defaultFullFlush'),
		Os = class extends kp {
			constructor(e, t) {
				if (!e || typeof e != 'object')
					throw new TypeError('invalid options for ZlibBase constructor');
				super(e),
					(this[Xt] = !1),
					(this[wn] = !1),
					(this[qp] = e),
					(this[Ur] = e.flush),
					(this[gu] = e.finishFlush);
				try {
					this[U] = new vu[t](e);
				} catch (s) {
					throw new Yt(s);
				}
				(this[Ts] = (s) => {
					this[Xt] || ((this[Xt] = !0), this.close(), this.emit('error', s));
				}),
					this[U].on('error', (s) => this[Ts](new Yt(s))),
					this.once('end', () => this.close);
			}
			close() {
				this[U] && (this[U].close(), (this[U] = null), this.emit('close'));
			}
			reset() {
				if (!this[Xt])
					return Tn(this[U], 'zlib binding closed'), this[U].reset();
			}
			flush(e) {
				this.ended ||
					(typeof e != 'number' && (e = this[Un]),
					this.write(Object.assign(et.alloc(0), { [Ur]: e })));
			}
			end(e, t, s) {
				return (
					e && this.write(e, t),
					this.flush(this[gu]),
					(this[wn] = !0),
					super.end(null, null, s)
				);
			}
			get ended() {
				return this[wn];
			}
			write(e, t, s) {
				if (
					(typeof t == 'function' && ((s = t), (t = 'utf8')),
					typeof e == 'string' && (e = et.from(e, t)),
					this[Xt])
				)
					return;
				Tn(this[U], 'zlib binding closed');
				let i = this[U]._handle,
					n = i.close;
				i.close = () => {};
				let o = this[U].close;
				(this[U].close = () => {}), (et.concat = (u) => u);
				let a;
				try {
					let u = typeof e[Ur] == 'number' ? e[Ur] : this[Ur];
					(a = this[U]._processChunk(e, u)), (et.concat = Ru);
				} catch (u) {
					(et.concat = Ru), this[Ts](new Yt(u));
				} finally {
					this[U] &&
						((this[U]._handle = i),
						(i.close = n),
						(this[U].close = o),
						this[U].removeAllListeners('error'));
				}
				this[U] && this[U].on('error', (u) => this[Ts](new Yt(u)));
				let c;
				if (a)
					if (Array.isArray(a) && a.length > 0) {
						c = this[vt](et.from(a[0]));
						for (let u = 1; u < a.length; u++) c = this[vt](a[u]);
					} else c = this[vt](et.from(a));
				return s && s(), c;
			}
			[vt](e) {
				return super.write(e);
			}
		},
		je = class extends Os {
			constructor(e, t) {
				(e = e || {}),
					(e.flush = e.flush || gt.Z_NO_FLUSH),
					(e.finishFlush = e.finishFlush || gt.Z_FINISH),
					super(e, t),
					(this[Un] = gt.Z_FULL_FLUSH),
					(this[vn] = e.level),
					(this[Cn] = e.strategy);
			}
			params(e, t) {
				if (!this[Xt]) {
					if (!this[U])
						throw new Error('cannot switch params when binding is closed');
					if (!this[U].params)
						throw new Error('not supported in this implementation');
					if (this[vn] !== e || this[Cn] !== t) {
						this.flush(gt.Z_SYNC_FLUSH), Tn(this[U], 'zlib binding closed');
						let s = this[U].flush;
						this[U].flush = (i, n) => {
							this.flush(i), n();
						};
						try {
							this[U].params(e, t);
						} finally {
							this[U].flush = s;
						}
						this[U] && ((this[vn] = e), (this[Cn] = t));
					}
				}
			}
		},
		On = class extends je {
			constructor(e) {
				super(e, 'Deflate');
			}
		},
		xn = class extends je {
			constructor(e) {
				super(e, 'Inflate');
			}
		},
		Sn = Symbol('_portable'),
		bn = class extends je {
			constructor(e) {
				super(e, 'Gzip'), (this[Sn] = e && !!e.portable);
			}
			[vt](e) {
				return this[Sn]
					? ((this[Sn] = !1), (e[9] = 255), super[vt](e))
					: super[vt](e);
			}
		},
		In = class extends je {
			constructor(e) {
				super(e, 'Gunzip');
			}
		},
		Nn = class extends je {
			constructor(e) {
				super(e, 'DeflateRaw');
			}
		},
		An = class extends je {
			constructor(e) {
				super(e, 'InflateRaw');
			}
		},
		Ln = class extends je {
			constructor(e) {
				super(e, 'Unzip');
			}
		},
		xs = class extends Os {
			constructor(e, t) {
				(e = e || {}),
					(e.flush = e.flush || gt.BROTLI_OPERATION_PROCESS),
					(e.finishFlush = e.finishFlush || gt.BROTLI_OPERATION_FINISH),
					super(e, t),
					(this[Un] = gt.BROTLI_OPERATION_FLUSH);
			}
		},
		Dn = class extends xs {
			constructor(e) {
				super(e, 'BrotliCompress');
			}
		},
		Fn = class extends xs {
			constructor(e) {
				super(e, 'BrotliDecompress');
			}
		};
	fe.Deflate = On;
	fe.Inflate = xn;
	fe.Gzip = bn;
	fe.Gunzip = In;
	fe.DeflateRaw = Nn;
	fe.InflateRaw = An;
	fe.Unzip = Ln;
	typeof vu.BrotliCompress == 'function'
		? ((fe.BrotliCompress = Dn), (fe.BrotliDecompress = Fn))
		: (fe.BrotliCompress = fe.BrotliDecompress =
				class {
					constructor() {
						throw new Error(
							'Brotli is not supported in this version of Node.js',
						);
					}
				});
});
var Zt = E((D_, Cu) => {
	var Hp = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform;
	Cu.exports = Hp !== 'win32' ? (r) => r : (r) => r && r.replace(/\\/g, '/');
});
var bs = E((U_, wu) => {
	'use strict';
	var Gp = Kt(),
		Mn = Zt(),
		Pn = Symbol('slurp');
	wu.exports = class extends Gp {
		constructor(e, t, s) {
			switch (
				(super(),
				this.pause(),
				(this.extended = t),
				(this.globalExtended = s),
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
			(this.path = Mn(e.path)),
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
				(this.linkpath = Mn(e.linkpath)),
				(this.uname = e.uname),
				(this.gname = e.gname),
				t && this[Pn](t),
				s && this[Pn](s, !0);
		}
		write(e) {
			let t = e.length;
			if (t > this.blockRemain)
				throw new Error('writing more to entry than is appropriate');
			let s = this.remain,
				i = this.blockRemain;
			return (
				(this.remain = Math.max(0, s - t)),
				(this.blockRemain = Math.max(0, i - t)),
				this.ignore ? !0 : s >= t ? super.write(e) : super.write(e.slice(0, s))
			);
		}
		[Pn](e, t) {
			for (let s in e)
				e[s] !== null &&
					e[s] !== void 0 &&
					!(t && s === 'path') &&
					(this[s] = s === 'path' || s === 'linkpath' ? Mn(e[s]) : e[s]);
		}
	};
});
var kn = E((Is) => {
	'use strict';
	Is.name = new Map([
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
	Is.code = new Map(Array.from(Is.name).map((r) => [r[1], r[0]]));
});
var xu = E((M_, Ou) => {
	'use strict';
	var zp = (r, e) => {
			if (Number.isSafeInteger(r)) r < 0 ? $p(r, e) : Vp(r, e);
			else
				throw Error(
					'cannot encode number outside of javascript safe integer range',
				);
			return e;
		},
		Vp = (r, e) => {
			e[0] = 128;
			for (var t = e.length; t > 1; t--)
				(e[t - 1] = r & 255), (r = Math.floor(r / 256));
		},
		$p = (r, e) => {
			e[0] = 255;
			var t = !1;
			r = r * -1;
			for (var s = e.length; s > 1; s--) {
				var i = r & 255;
				(r = Math.floor(r / 256)),
					t
						? (e[s - 1] = Su(i))
						: i === 0
						? (e[s - 1] = 0)
						: ((t = !0), (e[s - 1] = Tu(i)));
			}
		},
		jp = (r) => {
			let e = r[0],
				t = e === 128 ? Kp(r.slice(1, r.length)) : e === 255 ? Wp(r) : null;
			if (t === null) throw Error('invalid base256 encoding');
			if (!Number.isSafeInteger(t))
				throw Error('parsed number outside of javascript safe integer range');
			return t;
		},
		Wp = (r) => {
			for (var e = r.length, t = 0, s = !1, i = e - 1; i > -1; i--) {
				var n = r[i],
					o;
				s ? (o = Su(n)) : n === 0 ? (o = n) : ((s = !0), (o = Tu(n))),
					o !== 0 && (t -= o * Math.pow(256, e - i - 1));
			}
			return t;
		},
		Kp = (r) => {
			for (var e = r.length, t = 0, s = e - 1; s > -1; s--) {
				var i = r[s];
				i !== 0 && (t += i * Math.pow(256, e - s - 1));
			}
			return t;
		},
		Su = (r) => (255 ^ r) & 255,
		Tu = (r) => ((255 ^ r) + 1) & 255;
	Ou.exports = { encode: zp, parse: jp };
});
var Qt = E((P_, Iu) => {
	'use strict';
	var qn = kn(),
		Jt = require('path').posix,
		bu = xu(),
		Hn = Symbol('slurp'),
		de = Symbol('type'),
		Vn = class {
			constructor(e, t, s, i) {
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
					(this[de] = '0'),
					(this.linkpath = null),
					(this.uname = null),
					(this.gname = null),
					(this.devmaj = 0),
					(this.devmin = 0),
					(this.atime = null),
					(this.ctime = null),
					Buffer.isBuffer(e) ? this.decode(e, t || 0, s, i) : e && this.set(e);
			}
			decode(e, t, s, i) {
				if ((t || (t = 0), !e || !(e.length >= t + 512)))
					throw new Error('need 512 bytes for header');
				if (
					((this.path = Ct(e, t, 100)),
					(this.mode = tt(e, t + 100, 8)),
					(this.uid = tt(e, t + 108, 8)),
					(this.gid = tt(e, t + 116, 8)),
					(this.size = tt(e, t + 124, 12)),
					(this.mtime = Gn(e, t + 136, 12)),
					(this.cksum = tt(e, t + 148, 12)),
					this[Hn](s),
					this[Hn](i, !0),
					(this[de] = Ct(e, t + 156, 1)),
					this[de] === '' && (this[de] = '0'),
					this[de] === '0' && this.path.substr(-1) === '/' && (this[de] = '5'),
					this[de] === '5' && (this.size = 0),
					(this.linkpath = Ct(e, t + 157, 100)),
					e.slice(t + 257, t + 265).toString() === 'ustar\x0000')
				)
					if (
						((this.uname = Ct(e, t + 265, 32)),
						(this.gname = Ct(e, t + 297, 32)),
						(this.devmaj = tt(e, t + 329, 8)),
						(this.devmin = tt(e, t + 337, 8)),
						e[t + 475] !== 0)
					) {
						let o = Ct(e, t + 345, 155);
						this.path = o + '/' + this.path;
					} else {
						let o = Ct(e, t + 345, 130);
						o && (this.path = o + '/' + this.path),
							(this.atime = Gn(e, t + 476, 12)),
							(this.ctime = Gn(e, t + 488, 12));
					}
				let n = 8 * 32;
				for (let o = t; o < t + 148; o++) n += e[o];
				for (let o = t + 156; o < t + 512; o++) n += e[o];
				(this.cksumValid = n === this.cksum),
					this.cksum === null && n === 8 * 32 && (this.nullBlock = !0);
			}
			[Hn](e, t) {
				for (let s in e)
					e[s] !== null &&
						e[s] !== void 0 &&
						!(t && s === 'path') &&
						(this[s] = e[s]);
			}
			encode(e, t) {
				if (
					(e || ((e = this.block = Buffer.alloc(512)), (t = 0)),
					t || (t = 0),
					!(e.length >= t + 512))
				)
					throw new Error('need 512 bytes for header');
				let s = this.ctime || this.atime ? 130 : 155,
					i = Xp(this.path || '', s),
					n = i[0],
					o = i[1];
				(this.needPax = i[2]),
					(this.needPax = wt(e, t, 100, n) || this.needPax),
					(this.needPax = rt(e, t + 100, 8, this.mode) || this.needPax),
					(this.needPax = rt(e, t + 108, 8, this.uid) || this.needPax),
					(this.needPax = rt(e, t + 116, 8, this.gid) || this.needPax),
					(this.needPax = rt(e, t + 124, 12, this.size) || this.needPax),
					(this.needPax = zn(e, t + 136, 12, this.mtime) || this.needPax),
					(e[t + 156] = this[de].charCodeAt(0)),
					(this.needPax = wt(e, t + 157, 100, this.linkpath) || this.needPax),
					e.write('ustar\x0000', t + 257, 8),
					(this.needPax = wt(e, t + 265, 32, this.uname) || this.needPax),
					(this.needPax = wt(e, t + 297, 32, this.gname) || this.needPax),
					(this.needPax = rt(e, t + 329, 8, this.devmaj) || this.needPax),
					(this.needPax = rt(e, t + 337, 8, this.devmin) || this.needPax),
					(this.needPax = wt(e, t + 345, s, o) || this.needPax),
					e[t + 475] !== 0
						? (this.needPax = wt(e, t + 345, 155, o) || this.needPax)
						: ((this.needPax = wt(e, t + 345, 130, o) || this.needPax),
						  (this.needPax = zn(e, t + 476, 12, this.atime) || this.needPax),
						  (this.needPax = zn(e, t + 488, 12, this.ctime) || this.needPax));
				let a = 8 * 32;
				for (let c = t; c < t + 148; c++) a += e[c];
				for (let c = t + 156; c < t + 512; c++) a += e[c];
				return (
					(this.cksum = a),
					rt(e, t + 148, 8, this.cksum),
					(this.cksumValid = !0),
					this.needPax
				);
			}
			set(e) {
				for (let t in e) e[t] !== null && e[t] !== void 0 && (this[t] = e[t]);
			}
			get type() {
				return qn.name.get(this[de]) || this[de];
			}
			get typeKey() {
				return this[de];
			}
			set type(e) {
				qn.code.has(e) ? (this[de] = qn.code.get(e)) : (this[de] = e);
			}
		},
		Xp = (r, e) => {
			let s = r,
				i = '',
				n,
				o = Jt.parse(r).root || '.';
			if (Buffer.byteLength(s) < 100) n = [s, i, !1];
			else {
				(i = Jt.dirname(s)), (s = Jt.basename(s));
				do
					Buffer.byteLength(s) <= 100 && Buffer.byteLength(i) <= e
						? (n = [s, i, !1])
						: Buffer.byteLength(s) > 100 && Buffer.byteLength(i) <= e
						? (n = [s.substr(0, 100 - 1), i, !0])
						: ((s = Jt.join(Jt.basename(i), s)), (i = Jt.dirname(i)));
				while (i !== o && !n);
				n || (n = [r.substr(0, 100 - 1), '', !0]);
			}
			return n;
		},
		Ct = (r, e, t) =>
			r
				.slice(e, e + t)
				.toString('utf8')
				.replace(/\0.*/, ''),
		Gn = (r, e, t) => Yp(tt(r, e, t)),
		Yp = (r) => (r === null ? null : new Date(r * 1e3)),
		tt = (r, e, t) => (r[e] & 128 ? bu.parse(r.slice(e, e + t)) : Jp(r, e, t)),
		Zp = (r) => (isNaN(r) ? null : r),
		Jp = (r, e, t) =>
			Zp(
				parseInt(
					r
						.slice(e, e + t)
						.toString('utf8')
						.replace(/\0.*$/, '')
						.trim(),
					8,
				),
			),
		Qp = { 12: 8589934591, 8: 2097151 },
		rt = (r, e, t, s) =>
			s === null
				? !1
				: s > Qp[t] || s < 0
				? (bu.encode(s, r.slice(e, e + t)), !0)
				: (em(r, e, t, s), !1),
		em = (r, e, t, s) => r.write(tm(s, t), e, t, 'ascii'),
		tm = (r, e) => rm(Math.floor(r).toString(8), e),
		rm = (r, e) =>
			(r.length === e - 1
				? r
				: new Array(e - r.length - 1).join('0') + r + ' ') + '\0',
		zn = (r, e, t, s) => (s === null ? !1 : rt(r, e, t, s.getTime() / 1e3)),
		sm = new Array(156).join('\0'),
		wt = (r, e, t, s) =>
			s === null
				? !1
				: (r.write(s + sm, e, t, 'utf8'),
				  s.length !== Buffer.byteLength(s) || s.length > t);
	Iu.exports = Vn;
});
var Ns = E((k_, Nu) => {
	'use strict';
	var im = Qt(),
		nm = require('path'),
		Br = class {
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
					s = 512 * Math.ceil(1 + t / 512),
					i = Buffer.allocUnsafe(s);
				for (let n = 0; n < 512; n++) i[n] = 0;
				new im({
					path: ('PaxHeader/' + nm.basename(this.path)).slice(0, 99),
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
				for (let n = t + 512; n < i.length; n++) i[n] = 0;
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
					s =
						' ' +
						(e === 'dev' || e === 'ino' || e === 'nlink' ? 'SCHILY.' : '') +
						e +
						'=' +
						t +
						`
`,
					i = Buffer.byteLength(s),
					n = Math.floor(Math.log(i) / Math.log(10)) + 1;
				return i + n >= Math.pow(10, n) && (n += 1), n + i + s;
			}
		};
	Br.parse = (r, e, t) => new Br(om(am(r), e), t);
	var om = (r, e) =>
			e ? Object.keys(r).reduce((t, s) => ((t[s] = r[s]), t), e) : r,
		am = (r) =>
			r
				.replace(/\n$/, '')
				.split(
					`
`,
				)
				.reduce(cm, Object.create(null)),
		cm = (r, e) => {
			let t = parseInt(e, 10);
			if (t !== Buffer.byteLength(e) + 1) return r;
			e = e.substr((t + ' ').length);
			let s = e.split('='),
				i = s.shift().replace(/^SCHILY\.(dev|ino|nlink)/, '$1');
			if (!i) return r;
			let n = s.join('=');
			return (
				(r[i] = /^([A-Z]+\.)?([mac]|birth|creation)time$/.test(i)
					? new Date(n * 1e3)
					: /^[0-9]+$/.test(n)
					? +n
					: n),
				r
			);
		};
	Nu.exports = Br;
});
var er = E((q_, Au) => {
	Au.exports = (r) => {
		let e = r.length - 1,
			t = -1;
		for (; e > -1 && r.charAt(e) === '/'; ) (t = e), e--;
		return t === -1 ? r : r.slice(0, t);
	};
});
var As = E((H_, Lu) => {
	'use strict';
	Lu.exports = (r) =>
		class extends r {
			warn(e, t, s = {}) {
				this.file && (s.file = this.file),
					this.cwd && (s.cwd = this.cwd),
					(s.code = (t instanceof Error && t.code) || e),
					(s.tarCode = e),
					!this.strict && s.recoverable !== !1
						? (t instanceof Error &&
								((s = Object.assign(t, s)), (t = t.message)),
						  this.emit('warn', s.tarCode, t, s))
						: t instanceof Error
						? this.emit('error', Object.assign(t, s))
						: this.emit('error', Object.assign(new Error(`${e}: ${t}`), s));
			}
		};
});
var jn = E((z_, Du) => {
	'use strict';
	var Ls = ['|', '<', '>', '?', ':'],
		$n = Ls.map((r) => String.fromCharCode(61440 + r.charCodeAt(0))),
		um = new Map(Ls.map((r, e) => [r, $n[e]])),
		lm = new Map($n.map((r, e) => [r, Ls[e]]));
	Du.exports = {
		encode: (r) => Ls.reduce((e, t) => e.split(t).join(um.get(t)), r),
		decode: (r) => $n.reduce((e, t) => e.split(t).join(lm.get(t)), r),
	};
});
var Wn = E((V_, Uu) => {
	var { isAbsolute: hm, parse: Fu } = require('path').win32;
	Uu.exports = (r) => {
		let e = '',
			t = Fu(r);
		for (; hm(r) || t.root; ) {
			let s = r.charAt(0) === '/' && r.slice(0, 4) !== '//?/' ? '/' : t.root;
			(r = r.substr(s.length)), (e += s), (t = Fu(r));
		}
		return [e, r];
	};
});
var Mu = E(($_, Bu) => {
	'use strict';
	Bu.exports = (r, e, t) => (
		(r &= 4095),
		t && (r = (r | 384) & -19),
		e && (r & 256 && (r |= 64), r & 32 && (r |= 8), r & 4 && (r |= 1)),
		r
	);
});
var so = E((K_, Zu) => {
	'use strict';
	var Vu = Kt(),
		$u = Ns(),
		ju = Qt(),
		De = require('fs'),
		Pu = require('path'),
		Le = Zt(),
		fm = er(),
		Wu = (r, e) =>
			e ? ((r = Le(r).replace(/^\.(\/|$)/, '')), fm(e) + '/' + r) : Le(r),
		dm = 16 * 1024 * 1024,
		ku = Symbol('process'),
		qu = Symbol('file'),
		Hu = Symbol('directory'),
		Xn = Symbol('symlink'),
		Gu = Symbol('hardlink'),
		Mr = Symbol('header'),
		Ds = Symbol('read'),
		Yn = Symbol('lstat'),
		Fs = Symbol('onlstat'),
		Zn = Symbol('onread'),
		Jn = Symbol('onreadlink'),
		Qn = Symbol('openfile'),
		eo = Symbol('onopenfile'),
		st = Symbol('close'),
		Us = Symbol('mode'),
		to = Symbol('awaitDrain'),
		Kn = Symbol('ondrain'),
		Fe = Symbol('prefix'),
		zu = Symbol('hadError'),
		Ku = As(),
		pm = jn(),
		Xu = Wn(),
		Yu = Mu(),
		Bs = Ku(
			class extends Vu {
				constructor(e, t) {
					if (((t = t || {}), super(t), typeof e != 'string'))
						throw new TypeError('path is required');
					(this.path = Le(e)),
						(this.portable = !!t.portable),
						(this.myuid = (process.getuid && process.getuid()) || 0),
						(this.myuser = process.env.USER || ''),
						(this.maxReadSize = t.maxReadSize || dm),
						(this.linkCache = t.linkCache || new Map()),
						(this.statCache = t.statCache || new Map()),
						(this.preservePaths = !!t.preservePaths),
						(this.cwd = Le(t.cwd || process.cwd())),
						(this.strict = !!t.strict),
						(this.noPax = !!t.noPax),
						(this.noMtime = !!t.noMtime),
						(this.mtime = t.mtime || null),
						(this.prefix = t.prefix ? Le(t.prefix) : null),
						(this.fd = null),
						(this.blockLen = null),
						(this.blockRemain = null),
						(this.buf = null),
						(this.offset = null),
						(this.length = null),
						(this.pos = null),
						(this.remain = null),
						typeof t.onwarn == 'function' && this.on('warn', t.onwarn);
					let s = !1;
					if (!this.preservePaths) {
						let [i, n] = Xu(this.path);
						i && ((this.path = n), (s = i));
					}
					(this.win32 = !!t.win32 || process.platform === 'win32'),
						this.win32 &&
							((this.path = pm.decode(this.path.replace(/\\/g, '/'))),
							(e = e.replace(/\\/g, '/'))),
						(this.absolute = Le(t.absolute || Pu.resolve(this.cwd, e))),
						this.path === '' && (this.path = './'),
						s &&
							this.warn('TAR_ENTRY_INFO', `stripping ${s} from absolute path`, {
								entry: this,
								path: s + this.path,
							}),
						this.statCache.has(this.absolute)
							? this[Fs](this.statCache.get(this.absolute))
							: this[Yn]();
				}
				emit(e, ...t) {
					return e === 'error' && (this[zu] = !0), super.emit(e, ...t);
				}
				[Yn]() {
					De.lstat(this.absolute, (e, t) => {
						if (e) return this.emit('error', e);
						this[Fs](t);
					});
				}
				[Fs](e) {
					this.statCache.set(this.absolute, e),
						(this.stat = e),
						e.isFile() || (e.size = 0),
						(this.type = Em(e)),
						this.emit('stat', e),
						this[ku]();
				}
				[ku]() {
					switch (this.type) {
						case 'File':
							return this[qu]();
						case 'Directory':
							return this[Hu]();
						case 'SymbolicLink':
							return this[Xn]();
						default:
							return this.end();
					}
				}
				[Us](e) {
					return Yu(e, this.type === 'Directory', this.portable);
				}
				[Fe](e) {
					return Wu(e, this.prefix);
				}
				[Mr]() {
					this.type === 'Directory' && this.portable && (this.noMtime = !0),
						(this.header = new ju({
							path: this[Fe](this.path),
							linkpath:
								this.type === 'Link' ? this[Fe](this.linkpath) : this.linkpath,
							mode: this[Us](this.stat.mode),
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
								new $u({
									atime: this.portable ? null : this.header.atime,
									ctime: this.portable ? null : this.header.ctime,
									gid: this.portable ? null : this.header.gid,
									mtime: this.noMtime ? null : this.mtime || this.header.mtime,
									path: this[Fe](this.path),
									linkpath:
										this.type === 'Link'
											? this[Fe](this.linkpath)
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
				[Hu]() {
					this.path.substr(-1) !== '/' && (this.path += '/'),
						(this.stat.size = 0),
						this[Mr](),
						this.end();
				}
				[Xn]() {
					De.readlink(this.absolute, (e, t) => {
						if (e) return this.emit('error', e);
						this[Jn](t);
					});
				}
				[Jn](e) {
					(this.linkpath = Le(e)), this[Mr](), this.end();
				}
				[Gu](e) {
					(this.type = 'Link'),
						(this.linkpath = Le(Pu.relative(this.cwd, e))),
						(this.stat.size = 0),
						this[Mr](),
						this.end();
				}
				[qu]() {
					if (this.stat.nlink > 1) {
						let e = this.stat.dev + ':' + this.stat.ino;
						if (this.linkCache.has(e)) {
							let t = this.linkCache.get(e);
							if (t.indexOf(this.cwd) === 0) return this[Gu](t);
						}
						this.linkCache.set(e, this.absolute);
					}
					if ((this[Mr](), this.stat.size === 0)) return this.end();
					this[Qn]();
				}
				[Qn]() {
					De.open(this.absolute, 'r', (e, t) => {
						if (e) return this.emit('error', e);
						this[eo](t);
					});
				}
				[eo](e) {
					if (((this.fd = e), this[zu])) return this[st]();
					(this.blockLen = 512 * Math.ceil(this.stat.size / 512)),
						(this.blockRemain = this.blockLen);
					let t = Math.min(this.blockLen, this.maxReadSize);
					(this.buf = Buffer.allocUnsafe(t)),
						(this.offset = 0),
						(this.pos = 0),
						(this.remain = this.stat.size),
						(this.length = this.buf.length),
						this[Ds]();
				}
				[Ds]() {
					let { fd: e, buf: t, offset: s, length: i, pos: n } = this;
					De.read(e, t, s, i, n, (o, a) => {
						if (o) return this[st](() => this.emit('error', o));
						this[Zn](a);
					});
				}
				[st](e) {
					De.close(this.fd, e);
				}
				[Zn](e) {
					if (e <= 0 && this.remain > 0) {
						let i = new Error('encountered unexpected EOF');
						return (
							(i.path = this.absolute),
							(i.syscall = 'read'),
							(i.code = 'EOF'),
							this[st](() => this.emit('error', i))
						);
					}
					if (e > this.remain) {
						let i = new Error('did not encounter expected EOF');
						return (
							(i.path = this.absolute),
							(i.syscall = 'read'),
							(i.code = 'EOF'),
							this[st](() => this.emit('error', i))
						);
					}
					if (e === this.remain)
						for (let i = e; i < this.length && e < this.blockRemain; i++)
							(this.buf[i + this.offset] = 0), e++, this.remain++;
					let t =
						this.offset === 0 && e === this.buf.length
							? this.buf
							: this.buf.slice(this.offset, this.offset + e);
					this.write(t) ? this[Kn]() : this[to](() => this[Kn]());
				}
				[to](e) {
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
				[Kn]() {
					if (!this.remain)
						return (
							this.blockRemain && super.write(Buffer.alloc(this.blockRemain)),
							this[st]((e) => (e ? this.emit('error', e) : this.end()))
						);
					this.offset >= this.length &&
						((this.buf = Buffer.allocUnsafe(
							Math.min(this.blockRemain, this.buf.length),
						)),
						(this.offset = 0)),
						(this.length = this.buf.length - this.offset),
						this[Ds]();
				}
			},
		),
		ro = class extends Bs {
			[Yn]() {
				this[Fs](De.lstatSync(this.absolute));
			}
			[Xn]() {
				this[Jn](De.readlinkSync(this.absolute));
			}
			[Qn]() {
				this[eo](De.openSync(this.absolute, 'r'));
			}
			[Ds]() {
				let e = !0;
				try {
					let { fd: t, buf: s, offset: i, length: n, pos: o } = this,
						a = De.readSync(t, s, i, n, o);
					this[Zn](a), (e = !1);
				} finally {
					if (e)
						try {
							this[st](() => {});
						} catch {}
				}
			}
			[to](e) {
				e();
			}
			[st](e) {
				De.closeSync(this.fd), e();
			}
		},
		mm = Ku(
			class extends Vu {
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
						(this.path = Le(e.path)),
						(this.mode = this[Us](e.mode)),
						(this.uid = this.portable ? null : e.uid),
						(this.gid = this.portable ? null : e.gid),
						(this.uname = this.portable ? null : e.uname),
						(this.gname = this.portable ? null : e.gname),
						(this.size = e.size),
						(this.mtime = this.noMtime ? null : t.mtime || e.mtime),
						(this.atime = this.portable ? null : e.atime),
						(this.ctime = this.portable ? null : e.ctime),
						(this.linkpath = Le(e.linkpath)),
						typeof t.onwarn == 'function' && this.on('warn', t.onwarn);
					let s = !1;
					if (!this.preservePaths) {
						let [i, n] = Xu(this.path);
						i && ((this.path = n), (s = i));
					}
					(this.remain = e.size),
						(this.blockRemain = e.startBlockSize),
						(this.header = new ju({
							path: this[Fe](this.path),
							linkpath:
								this.type === 'Link' ? this[Fe](this.linkpath) : this.linkpath,
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
						s &&
							this.warn('TAR_ENTRY_INFO', `stripping ${s} from absolute path`, {
								entry: this,
								path: s + this.path,
							}),
						this.header.encode() &&
							!this.noPax &&
							super.write(
								new $u({
									atime: this.portable ? null : this.atime,
									ctime: this.portable ? null : this.ctime,
									gid: this.portable ? null : this.gid,
									mtime: this.noMtime ? null : this.mtime,
									path: this[Fe](this.path),
									linkpath:
										this.type === 'Link'
											? this[Fe](this.linkpath)
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
				[Fe](e) {
					return Wu(e, this.prefix);
				}
				[Us](e) {
					return Yu(e, this.type === 'Directory', this.portable);
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
	Bs.Sync = ro;
	Bs.Tar = mm;
	var Em = (r) =>
		r.isFile()
			? 'File'
			: r.isDirectory()
			? 'Directory'
			: r.isSymbolicLink()
			? 'SymbolicLink'
			: 'Unsupported';
	Zu.exports = Bs;
});
var Qu = E((X_, Ju) => {
	'use strict';
	Ju.exports = function (r) {
		r.prototype[Symbol.iterator] = function* () {
			for (let e = this.head; e; e = e.next) yield e.value;
		};
	};
});
var io = E((Y_, el) => {
	'use strict';
	el.exports = I;
	I.Node = St;
	I.create = I;
	function I(r) {
		var e = this;
		if (
			(e instanceof I || (e = new I()),
			(e.tail = null),
			(e.head = null),
			(e.length = 0),
			r && typeof r.forEach == 'function')
		)
			r.forEach(function (i) {
				e.push(i);
			});
		else if (arguments.length > 0)
			for (var t = 0, s = arguments.length; t < s; t++) e.push(arguments[t]);
		return e;
	}
	I.prototype.removeNode = function (r) {
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
	I.prototype.unshiftNode = function (r) {
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
	I.prototype.pushNode = function (r) {
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
	I.prototype.push = function () {
		for (var r = 0, e = arguments.length; r < e; r++) _m(this, arguments[r]);
		return this.length;
	};
	I.prototype.unshift = function () {
		for (var r = 0, e = arguments.length; r < e; r++) Rm(this, arguments[r]);
		return this.length;
	};
	I.prototype.pop = function () {
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
	I.prototype.shift = function () {
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
	I.prototype.forEach = function (r, e) {
		e = e || this;
		for (var t = this.head, s = 0; t !== null; s++)
			r.call(e, t.value, s, this), (t = t.next);
	};
	I.prototype.forEachReverse = function (r, e) {
		e = e || this;
		for (var t = this.tail, s = this.length - 1; t !== null; s--)
			r.call(e, t.value, s, this), (t = t.prev);
	};
	I.prototype.get = function (r) {
		for (var e = 0, t = this.head; t !== null && e < r; e++) t = t.next;
		if (e === r && t !== null) return t.value;
	};
	I.prototype.getReverse = function (r) {
		for (var e = 0, t = this.tail; t !== null && e < r; e++) t = t.prev;
		if (e === r && t !== null) return t.value;
	};
	I.prototype.map = function (r, e) {
		e = e || this;
		for (var t = new I(), s = this.head; s !== null; )
			t.push(r.call(e, s.value, this)), (s = s.next);
		return t;
	};
	I.prototype.mapReverse = function (r, e) {
		e = e || this;
		for (var t = new I(), s = this.tail; s !== null; )
			t.push(r.call(e, s.value, this)), (s = s.prev);
		return t;
	};
	I.prototype.reduce = function (r, e) {
		var t,
			s = this.head;
		if (arguments.length > 1) t = e;
		else if (this.head) (s = this.head.next), (t = this.head.value);
		else throw new TypeError('Reduce of empty list with no initial value');
		for (var i = 0; s !== null; i++) (t = r(t, s.value, i)), (s = s.next);
		return t;
	};
	I.prototype.reduceReverse = function (r, e) {
		var t,
			s = this.tail;
		if (arguments.length > 1) t = e;
		else if (this.tail) (s = this.tail.prev), (t = this.tail.value);
		else throw new TypeError('Reduce of empty list with no initial value');
		for (var i = this.length - 1; s !== null; i--)
			(t = r(t, s.value, i)), (s = s.prev);
		return t;
	};
	I.prototype.toArray = function () {
		for (var r = new Array(this.length), e = 0, t = this.head; t !== null; e++)
			(r[e] = t.value), (t = t.next);
		return r;
	};
	I.prototype.toArrayReverse = function () {
		for (var r = new Array(this.length), e = 0, t = this.tail; t !== null; e++)
			(r[e] = t.value), (t = t.prev);
		return r;
	};
	I.prototype.slice = function (r, e) {
		(e = e || this.length),
			e < 0 && (e += this.length),
			(r = r || 0),
			r < 0 && (r += this.length);
		var t = new I();
		if (e < r || e < 0) return t;
		r < 0 && (r = 0), e > this.length && (e = this.length);
		for (var s = 0, i = this.head; i !== null && s < r; s++) i = i.next;
		for (; i !== null && s < e; s++, i = i.next) t.push(i.value);
		return t;
	};
	I.prototype.sliceReverse = function (r, e) {
		(e = e || this.length),
			e < 0 && (e += this.length),
			(r = r || 0),
			r < 0 && (r += this.length);
		var t = new I();
		if (e < r || e < 0) return t;
		r < 0 && (r = 0), e > this.length && (e = this.length);
		for (var s = this.length, i = this.tail; i !== null && s > e; s--)
			i = i.prev;
		for (; i !== null && s > r; s--, i = i.prev) t.push(i.value);
		return t;
	};
	I.prototype.splice = function (r, e, ...t) {
		r > this.length && (r = this.length - 1), r < 0 && (r = this.length + r);
		for (var s = 0, i = this.head; i !== null && s < r; s++) i = i.next;
		for (var n = [], s = 0; i && s < e; s++)
			n.push(i.value), (i = this.removeNode(i));
		i === null && (i = this.tail),
			i !== this.head && i !== this.tail && (i = i.prev);
		for (var s = 0; s < t.length; s++) i = ym(this, i, t[s]);
		return n;
	};
	I.prototype.reverse = function () {
		for (var r = this.head, e = this.tail, t = r; t !== null; t = t.prev) {
			var s = t.prev;
			(t.prev = t.next), (t.next = s);
		}
		return (this.head = e), (this.tail = r), this;
	};
	function ym(r, e, t) {
		var s = e === r.head ? new St(t, null, e, r) : new St(t, e, e.next, r);
		return (
			s.next === null && (r.tail = s),
			s.prev === null && (r.head = s),
			r.length++,
			s
		);
	}
	function _m(r, e) {
		(r.tail = new St(e, r.tail, null, r)),
			r.head || (r.head = r.tail),
			r.length++;
	}
	function Rm(r, e) {
		(r.head = new St(e, null, r.head, r)),
			r.tail || (r.tail = r.head),
			r.length++;
	}
	function St(r, e, t, s) {
		if (!(this instanceof St)) return new St(r, e, t, s);
		(this.list = s),
			(this.value = r),
			e ? ((e.next = this), (this.prev = e)) : (this.prev = null),
			t ? ((t.prev = this), (this.next = t)) : (this.next = null);
	}
	try {
		Qu()(I);
	} catch {}
});
var $s = E((J_, al) => {
	'use strict';
	var zs = class {
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
		gm = Kt(),
		vm = Bn(),
		Cm = bs(),
		po = so(),
		wm = po.Sync,
		Sm = po.Tar,
		Tm = io(),
		tl = Buffer.alloc(1024),
		ks = Symbol('onStat'),
		Ms = Symbol('ended'),
		Ue = Symbol('queue'),
		tr = Symbol('current'),
		Tt = Symbol('process'),
		Ps = Symbol('processing'),
		rl = Symbol('processJob'),
		Be = Symbol('jobs'),
		no = Symbol('jobDone'),
		qs = Symbol('addFSEntry'),
		sl = Symbol('addTarEntry'),
		uo = Symbol('stat'),
		lo = Symbol('readdir'),
		Hs = Symbol('onreaddir'),
		Gs = Symbol('pipe'),
		il = Symbol('entry'),
		oo = Symbol('entryOpt'),
		ho = Symbol('writeEntryClass'),
		ol = Symbol('write'),
		ao = Symbol('ondrain'),
		Vs = require('fs'),
		nl = require('path'),
		Om = As(),
		co = Zt(),
		mo = Om(
			class extends gm {
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
						(this.prefix = co(e.prefix || '')),
						(this.linkCache = e.linkCache || new Map()),
						(this.statCache = e.statCache || new Map()),
						(this.readdirCache = e.readdirCache || new Map()),
						(this[ho] = po),
						typeof e.onwarn == 'function' && this.on('warn', e.onwarn),
						(this.portable = !!e.portable),
						(this.zip = null),
						e.gzip
							? (typeof e.gzip != 'object' && (e.gzip = {}),
							  this.portable && (e.gzip.portable = !0),
							  (this.zip = new vm.Gzip(e.gzip)),
							  this.zip.on('data', (t) => super.write(t)),
							  this.zip.on('end', (t) => super.end()),
							  this.zip.on('drain', (t) => this[ao]()),
							  this.on('resume', (t) => this.zip.resume()))
							: this.on('drain', this[ao]),
						(this.noDirRecurse = !!e.noDirRecurse),
						(this.follow = !!e.follow),
						(this.noMtime = !!e.noMtime),
						(this.mtime = e.mtime || null),
						(this.filter =
							typeof e.filter == 'function' ? e.filter : (t) => !0),
						(this[Ue] = new Tm()),
						(this[Be] = 0),
						(this.jobs = +e.jobs || 4),
						(this[Ps] = !1),
						(this[Ms] = !1);
				}
				[ol](e) {
					return super.write(e);
				}
				add(e) {
					return this.write(e), this;
				}
				end(e) {
					return e && this.write(e), (this[Ms] = !0), this[Tt](), this;
				}
				write(e) {
					if (this[Ms]) throw new Error('write after end');
					return e instanceof Cm ? this[sl](e) : this[qs](e), this.flowing;
				}
				[sl](e) {
					let t = co(nl.resolve(this.cwd, e.path));
					if (!this.filter(e.path, e)) e.resume();
					else {
						let s = new zs(e.path, t, !1);
						(s.entry = new Sm(e, this[oo](s))),
							s.entry.on('end', (i) => this[no](s)),
							(this[Be] += 1),
							this[Ue].push(s);
					}
					this[Tt]();
				}
				[qs](e) {
					let t = co(nl.resolve(this.cwd, e));
					this[Ue].push(new zs(e, t)), this[Tt]();
				}
				[uo](e) {
					(e.pending = !0), (this[Be] += 1);
					let t = this.follow ? 'stat' : 'lstat';
					Vs[t](e.absolute, (s, i) => {
						(e.pending = !1),
							(this[Be] -= 1),
							s ? this.emit('error', s) : this[ks](e, i);
					});
				}
				[ks](e, t) {
					this.statCache.set(e.absolute, t),
						(e.stat = t),
						this.filter(e.path, t) || (e.ignore = !0),
						this[Tt]();
				}
				[lo](e) {
					(e.pending = !0),
						(this[Be] += 1),
						Vs.readdir(e.absolute, (t, s) => {
							if (((e.pending = !1), (this[Be] -= 1), t))
								return this.emit('error', t);
							this[Hs](e, s);
						});
				}
				[Hs](e, t) {
					this.readdirCache.set(e.absolute, t), (e.readdir = t), this[Tt]();
				}
				[Tt]() {
					if (!this[Ps]) {
						this[Ps] = !0;
						for (
							let e = this[Ue].head;
							e !== null && this[Be] < this.jobs;
							e = e.next
						)
							if ((this[rl](e.value), e.value.ignore)) {
								let t = e.next;
								this[Ue].removeNode(e), (e.next = t);
							}
						(this[Ps] = !1),
							this[Ms] &&
								!this[Ue].length &&
								this[Be] === 0 &&
								(this.zip ? this.zip.end(tl) : (super.write(tl), super.end()));
					}
				}
				get [tr]() {
					return this[Ue] && this[Ue].head && this[Ue].head.value;
				}
				[no](e) {
					this[Ue].shift(), (this[Be] -= 1), this[Tt]();
				}
				[rl](e) {
					if (!e.pending) {
						if (e.entry) {
							e === this[tr] && !e.piped && this[Gs](e);
							return;
						}
						if (
							(e.stat ||
								(this.statCache.has(e.absolute)
									? this[ks](e, this.statCache.get(e.absolute))
									: this[uo](e)),
							!!e.stat &&
								!e.ignore &&
								!(
									!this.noDirRecurse &&
									e.stat.isDirectory() &&
									!e.readdir &&
									(this.readdirCache.has(e.absolute)
										? this[Hs](e, this.readdirCache.get(e.absolute))
										: this[lo](e),
									!e.readdir)
								))
						) {
							if (((e.entry = this[il](e)), !e.entry)) {
								e.ignore = !0;
								return;
							}
							e === this[tr] && !e.piped && this[Gs](e);
						}
					}
				}
				[oo](e) {
					return {
						onwarn: (t, s, i) => this.warn(t, s, i),
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
				[il](e) {
					this[Be] += 1;
					try {
						return new this[ho](e.path, this[oo](e))
							.on('end', () => this[no](e))
							.on('error', (t) => this.emit('error', t));
					} catch (t) {
						this.emit('error', t);
					}
				}
				[ao]() {
					this[tr] && this[tr].entry && this[tr].entry.resume();
				}
				[Gs](e) {
					(e.piped = !0),
						e.readdir &&
							e.readdir.forEach((i) => {
								let n = e.path,
									o = n === './' ? '' : n.replace(/\/*$/, '/');
								this[qs](o + i);
							});
					let t = e.entry,
						s = this.zip;
					s
						? t.on('data', (i) => {
								s.write(i) || t.pause();
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
		fo = class extends mo {
			constructor(e) {
				super(e), (this[ho] = wm);
			}
			pause() {}
			resume() {}
			[uo](e) {
				let t = this.follow ? 'statSync' : 'lstatSync';
				this[ks](e, Vs[t](e.absolute));
			}
			[lo](e, t) {
				this[Hs](e, Vs.readdirSync(e.absolute));
			}
			[Gs](e) {
				let t = e.entry,
					s = this.zip;
				e.readdir &&
					e.readdir.forEach((i) => {
						let n = e.path,
							o = n === './' ? '' : n.replace(/\/*$/, '/');
						this[qs](o + i);
					}),
					s
						? t.on('data', (i) => {
								s.write(i);
						  })
						: t.on('data', (i) => {
								super[ol](i);
						  });
			}
		};
	mo.Sync = fo;
	al.exports = mo;
});
var ur = E((kr) => {
	'use strict';
	var xm = Kt(),
		bm = require('events').EventEmitter,
		ce = require('fs'),
		_o = ce.writev;
	if (!_o) {
		let r = process.binding('fs'),
			e = r.FSReqWrap || r.FSReqCallback;
		_o = (t, s, i, n) => {
			let o = (c, u) => n(c, u, s),
				a = new e();
			(a.oncomplete = o), r.writeBuffers(t, s, i, a);
		};
	}
	var ar = Symbol('_autoClose'),
		xe = Symbol('_close'),
		Pr = Symbol('_ended'),
		D = Symbol('_fd'),
		cl = Symbol('_finished'),
		nt = Symbol('_flags'),
		Eo = Symbol('_flush'),
		Ro = Symbol('_handleChunk'),
		go = Symbol('_makeBuf'),
		Ys = Symbol('_mode'),
		js = Symbol('_needDrain'),
		nr = Symbol('_onerror'),
		cr = Symbol('_onopen'),
		yo = Symbol('_onread'),
		sr = Symbol('_onwrite'),
		ot = Symbol('_open'),
		We = Symbol('_path'),
		Ot = Symbol('_pos'),
		Me = Symbol('_queue'),
		ir = Symbol('_read'),
		ul = Symbol('_readSize'),
		it = Symbol('_reading'),
		Ws = Symbol('_remain'),
		ll = Symbol('_size'),
		Ks = Symbol('_write'),
		rr = Symbol('_writing'),
		Xs = Symbol('_defaultFlag'),
		or = Symbol('_errored'),
		Zs = class extends xm {
			constructor(e, t) {
				if (
					((t = t || {}),
					super(t),
					(this.readable = !0),
					(this.writable = !1),
					typeof e != 'string')
				)
					throw new TypeError('path must be a string');
				(this[or] = !1),
					(this[D] = typeof t.fd == 'number' ? t.fd : null),
					(this[We] = e),
					(this[ul] = t.readSize || 16 * 1024 * 1024),
					(this[it] = !1),
					(this[ll] = typeof t.size == 'number' ? t.size : 1 / 0),
					(this[Ws] = this[ll]),
					(this[ar] = typeof t.autoClose == 'boolean' ? t.autoClose : !0),
					typeof this[D] == 'number' ? this[ir]() : this[ot]();
			}
			get fd() {
				return this[D];
			}
			get path() {
				return this[We];
			}
			write() {
				throw new TypeError('this is a readable stream');
			}
			end() {
				throw new TypeError('this is a readable stream');
			}
			[ot]() {
				ce.open(this[We], 'r', (e, t) => this[cr](e, t));
			}
			[cr](e, t) {
				e ? this[nr](e) : ((this[D] = t), this.emit('open', t), this[ir]());
			}
			[go]() {
				return Buffer.allocUnsafe(Math.min(this[ul], this[Ws]));
			}
			[ir]() {
				if (!this[it]) {
					this[it] = !0;
					let e = this[go]();
					if (e.length === 0)
						return process.nextTick(() => this[yo](null, 0, e));
					ce.read(this[D], e, 0, e.length, null, (t, s, i) =>
						this[yo](t, s, i),
					);
				}
			}
			[yo](e, t, s) {
				(this[it] = !1), e ? this[nr](e) : this[Ro](t, s) && this[ir]();
			}
			[xe]() {
				if (this[ar] && typeof this[D] == 'number') {
					let e = this[D];
					(this[D] = null),
						ce.close(e, (t) =>
							t ? this.emit('error', t) : this.emit('close'),
						);
				}
			}
			[nr](e) {
				(this[it] = !0), this[xe](), this.emit('error', e);
			}
			[Ro](e, t) {
				let s = !1;
				return (
					(this[Ws] -= e),
					e > 0 && (s = super.write(e < t.length ? t.slice(0, e) : t)),
					(e === 0 || this[Ws] <= 0) && ((s = !1), this[xe](), super.end()),
					s
				);
			}
			emit(e, t) {
				switch (e) {
					case 'prefinish':
					case 'finish':
						break;
					case 'drain':
						typeof this[D] == 'number' && this[ir]();
						break;
					case 'error':
						return this[or] ? void 0 : ((this[or] = !0), super.emit(e, t));
					default:
						return super.emit(e, t);
				}
			}
		},
		vo = class extends Zs {
			[ot]() {
				let e = !0;
				try {
					this[cr](null, ce.openSync(this[We], 'r')), (e = !1);
				} finally {
					e && this[xe]();
				}
			}
			[ir]() {
				let e = !0;
				try {
					if (!this[it]) {
						this[it] = !0;
						do {
							let t = this[go](),
								s =
									t.length === 0
										? 0
										: ce.readSync(this[D], t, 0, t.length, null);
							if (!this[Ro](s, t)) break;
						} while (!0);
						this[it] = !1;
					}
					e = !1;
				} finally {
					e && this[xe]();
				}
			}
			[xe]() {
				if (this[ar] && typeof this[D] == 'number') {
					let e = this[D];
					(this[D] = null), ce.closeSync(e), this.emit('close');
				}
			}
		},
		Js = class extends bm {
			constructor(e, t) {
				(t = t || {}),
					super(t),
					(this.readable = !1),
					(this.writable = !0),
					(this[or] = !1),
					(this[rr] = !1),
					(this[Pr] = !1),
					(this[js] = !1),
					(this[Me] = []),
					(this[We] = e),
					(this[D] = typeof t.fd == 'number' ? t.fd : null),
					(this[Ys] = t.mode === void 0 ? 438 : t.mode),
					(this[Ot] = typeof t.start == 'number' ? t.start : null),
					(this[ar] = typeof t.autoClose == 'boolean' ? t.autoClose : !0);
				let s = this[Ot] !== null ? 'r+' : 'w';
				(this[Xs] = t.flags === void 0),
					(this[nt] = this[Xs] ? s : t.flags),
					this[D] === null && this[ot]();
			}
			emit(e, t) {
				if (e === 'error') {
					if (this[or]) return;
					this[or] = !0;
				}
				return super.emit(e, t);
			}
			get fd() {
				return this[D];
			}
			get path() {
				return this[We];
			}
			[nr](e) {
				this[xe](), (this[rr] = !0), this.emit('error', e);
			}
			[ot]() {
				ce.open(this[We], this[nt], this[Ys], (e, t) => this[cr](e, t));
			}
			[cr](e, t) {
				this[Xs] && this[nt] === 'r+' && e && e.code === 'ENOENT'
					? ((this[nt] = 'w'), this[ot]())
					: e
					? this[nr](e)
					: ((this[D] = t), this.emit('open', t), this[Eo]());
			}
			end(e, t) {
				return (
					e && this.write(e, t),
					(this[Pr] = !0),
					!this[rr] &&
						!this[Me].length &&
						typeof this[D] == 'number' &&
						this[sr](null, 0),
					this
				);
			}
			write(e, t) {
				return (
					typeof e == 'string' && (e = Buffer.from(e, t)),
					this[Pr]
						? (this.emit('error', new Error('write() after end()')), !1)
						: this[D] === null || this[rr] || this[Me].length
						? (this[Me].push(e), (this[js] = !0), !1)
						: ((this[rr] = !0), this[Ks](e), !0)
				);
			}
			[Ks](e) {
				ce.write(this[D], e, 0, e.length, this[Ot], (t, s) => this[sr](t, s));
			}
			[sr](e, t) {
				e
					? this[nr](e)
					: (this[Ot] !== null && (this[Ot] += t),
					  this[Me].length
							? this[Eo]()
							: ((this[rr] = !1),
							  this[Pr] && !this[cl]
									? ((this[cl] = !0), this[xe](), this.emit('finish'))
									: this[js] && ((this[js] = !1), this.emit('drain'))));
			}
			[Eo]() {
				if (this[Me].length === 0) this[Pr] && this[sr](null, 0);
				else if (this[Me].length === 1) this[Ks](this[Me].pop());
				else {
					let e = this[Me];
					(this[Me] = []), _o(this[D], e, this[Ot], (t, s) => this[sr](t, s));
				}
			}
			[xe]() {
				if (this[ar] && typeof this[D] == 'number') {
					let e = this[D];
					(this[D] = null),
						ce.close(e, (t) =>
							t ? this.emit('error', t) : this.emit('close'),
						);
				}
			}
		},
		Co = class extends Js {
			[ot]() {
				let e;
				if (this[Xs] && this[nt] === 'r+')
					try {
						e = ce.openSync(this[We], this[nt], this[Ys]);
					} catch (t) {
						if (t.code === 'ENOENT') return (this[nt] = 'w'), this[ot]();
						throw t;
					}
				else e = ce.openSync(this[We], this[nt], this[Ys]);
				this[cr](null, e);
			}
			[xe]() {
				if (this[ar] && typeof this[D] == 'number') {
					let e = this[D];
					(this[D] = null), ce.closeSync(e), this.emit('close');
				}
			}
			[Ks](e) {
				let t = !0;
				try {
					this[sr](null, ce.writeSync(this[D], e, 0, e.length, this[Ot])),
						(t = !1);
				} finally {
					if (t)
						try {
							this[xe]();
						} catch {}
				}
			}
		};
	kr.ReadStream = Zs;
	kr.ReadStreamSync = vo;
	kr.WriteStream = Js;
	kr.WriteStreamSync = Co;
});
var ni = E((tR, yl) => {
	'use strict';
	var Im = As(),
		Nm = Qt(),
		Am = require('events'),
		Lm = io(),
		Dm = 1024 * 1024,
		Fm = bs(),
		hl = Ns(),
		Um = Bn(),
		wo = Buffer.from([31, 139]),
		_e = Symbol('state'),
		xt = Symbol('writeEntry'),
		Ke = Symbol('readEntry'),
		So = Symbol('nextEntry'),
		fl = Symbol('processEntry'),
		Re = Symbol('extendedHeader'),
		qr = Symbol('globalExtendedHeader'),
		at = Symbol('meta'),
		dl = Symbol('emitMeta'),
		P = Symbol('buffer'),
		Xe = Symbol('queue'),
		bt = Symbol('ended'),
		pl = Symbol('emittedEnd'),
		It = Symbol('emit'),
		ue = Symbol('unzip'),
		Qs = Symbol('consumeChunk'),
		ei = Symbol('consumeChunkSub'),
		To = Symbol('consumeBody'),
		ml = Symbol('consumeMeta'),
		El = Symbol('consumeHeader'),
		ti = Symbol('consuming'),
		Oo = Symbol('bufferConcat'),
		xo = Symbol('maybeEnd'),
		Hr = Symbol('writing'),
		ct = Symbol('aborted'),
		ri = Symbol('onDone'),
		Nt = Symbol('sawValidEntry'),
		si = Symbol('sawNullBlock'),
		ii = Symbol('sawEOF'),
		Bm = (r) => !0;
	yl.exports = Im(
		class extends Am {
			constructor(e) {
				(e = e || {}),
					super(e),
					(this.file = e.file || ''),
					(this[Nt] = null),
					this.on(ri, (t) => {
						(this[_e] === 'begin' || this[Nt] === !1) &&
							this.warn('TAR_BAD_ARCHIVE', 'Unrecognized archive format');
					}),
					e.ondone
						? this.on(ri, e.ondone)
						: this.on(ri, (t) => {
								this.emit('prefinish'),
									this.emit('finish'),
									this.emit('end'),
									this.emit('close');
						  }),
					(this.strict = !!e.strict),
					(this.maxMetaEntrySize = e.maxMetaEntrySize || Dm),
					(this.filter = typeof e.filter == 'function' ? e.filter : Bm),
					(this.writable = !0),
					(this.readable = !1),
					(this[Xe] = new Lm()),
					(this[P] = null),
					(this[Ke] = null),
					(this[xt] = null),
					(this[_e] = 'begin'),
					(this[at] = ''),
					(this[Re] = null),
					(this[qr] = null),
					(this[bt] = !1),
					(this[ue] = null),
					(this[ct] = !1),
					(this[si] = !1),
					(this[ii] = !1),
					typeof e.onwarn == 'function' && this.on('warn', e.onwarn),
					typeof e.onentry == 'function' && this.on('entry', e.onentry);
			}
			[El](e, t) {
				this[Nt] === null && (this[Nt] = !1);
				let s;
				try {
					s = new Nm(e, t, this[Re], this[qr]);
				} catch (i) {
					return this.warn('TAR_ENTRY_INVALID', i);
				}
				if (s.nullBlock)
					this[si]
						? ((this[ii] = !0),
						  this[_e] === 'begin' && (this[_e] = 'header'),
						  this[It]('eof'))
						: ((this[si] = !0), this[It]('nullBlock'));
				else if (((this[si] = !1), !s.cksumValid))
					this.warn('TAR_ENTRY_INVALID', 'checksum failure', { header: s });
				else if (!s.path)
					this.warn('TAR_ENTRY_INVALID', 'path is required', { header: s });
				else {
					let i = s.type;
					if (/^(Symbolic)?Link$/.test(i) && !s.linkpath)
						this.warn('TAR_ENTRY_INVALID', 'linkpath required', { header: s });
					else if (!/^(Symbolic)?Link$/.test(i) && s.linkpath)
						this.warn('TAR_ENTRY_INVALID', 'linkpath forbidden', { header: s });
					else {
						let n = (this[xt] = new Fm(s, this[Re], this[qr]));
						if (!this[Nt])
							if (n.remain) {
								let o = () => {
									n.invalid || (this[Nt] = !0);
								};
								n.on('end', o);
							} else this[Nt] = !0;
						n.meta
							? n.size > this.maxMetaEntrySize
								? ((n.ignore = !0),
								  this[It]('ignoredEntry', n),
								  (this[_e] = 'ignore'),
								  n.resume())
								: n.size > 0 &&
								  ((this[at] = ''),
								  n.on('data', (o) => (this[at] += o)),
								  (this[_e] = 'meta'))
							: ((this[Re] = null),
							  (n.ignore = n.ignore || !this.filter(n.path, n)),
							  n.ignore
									? (this[It]('ignoredEntry', n),
									  (this[_e] = n.remain ? 'ignore' : 'header'),
									  n.resume())
									: (n.remain
											? (this[_e] = 'body')
											: ((this[_e] = 'header'), n.end()),
									  this[Ke]
											? this[Xe].push(n)
											: (this[Xe].push(n), this[So]())));
					}
				}
			}
			[fl](e) {
				let t = !0;
				return (
					e
						? Array.isArray(e)
							? this.emit.apply(this, e)
							: ((this[Ke] = e),
							  this.emit('entry', e),
							  e.emittedEnd || (e.on('end', (s) => this[So]()), (t = !1)))
						: ((this[Ke] = null), (t = !1)),
					t
				);
			}
			[So]() {
				do;
				while (this[fl](this[Xe].shift()));
				if (!this[Xe].length) {
					let e = this[Ke];
					!e || e.flowing || e.size === e.remain
						? this[Hr] || this.emit('drain')
						: e.once('drain', (s) => this.emit('drain'));
				}
			}
			[To](e, t) {
				let s = this[xt],
					i = s.blockRemain,
					n = i >= e.length && t === 0 ? e : e.slice(t, t + i);
				return (
					s.write(n),
					s.blockRemain || ((this[_e] = 'header'), (this[xt] = null), s.end()),
					n.length
				);
			}
			[ml](e, t) {
				let s = this[xt],
					i = this[To](e, t);
				return this[xt] || this[dl](s), i;
			}
			[It](e, t, s) {
				!this[Xe].length && !this[Ke]
					? this.emit(e, t, s)
					: this[Xe].push([e, t, s]);
			}
			[dl](e) {
				switch ((this[It]('meta', this[at]), e.type)) {
					case 'ExtendedHeader':
					case 'OldExtendedHeader':
						this[Re] = hl.parse(this[at], this[Re], !1);
						break;
					case 'GlobalExtendedHeader':
						this[qr] = hl.parse(this[at], this[qr], !0);
						break;
					case 'NextFileHasLongPath':
					case 'OldGnuLongPath':
						(this[Re] = this[Re] || Object.create(null)),
							(this[Re].path = this[at].replace(/\0.*/, ''));
						break;
					case 'NextFileHasLongLinkpath':
						(this[Re] = this[Re] || Object.create(null)),
							(this[Re].linkpath = this[at].replace(/\0.*/, ''));
						break;
					default:
						throw new Error('unknown meta: ' + e.type);
				}
			}
			abort(e) {
				(this[ct] = !0),
					this.emit('abort', e),
					this.warn('TAR_ABORT', e, { recoverable: !1 });
			}
			write(e) {
				if (this[ct]) return;
				if (this[ue] === null && e) {
					if (
						(this[P] && ((e = Buffer.concat([this[P], e])), (this[P] = null)),
						e.length < wo.length)
					)
						return (this[P] = e), !0;
					for (let s = 0; this[ue] === null && s < wo.length; s++)
						e[s] !== wo[s] && (this[ue] = !1);
					if (this[ue] === null) {
						let s = this[bt];
						(this[bt] = !1),
							(this[ue] = new Um.Unzip()),
							this[ue].on('data', (n) => this[Qs](n)),
							this[ue].on('error', (n) => this.abort(n)),
							this[ue].on('end', (n) => {
								(this[bt] = !0), this[Qs]();
							}),
							(this[Hr] = !0);
						let i = this[ue][s ? 'end' : 'write'](e);
						return (this[Hr] = !1), i;
					}
				}
				(this[Hr] = !0),
					this[ue] ? this[ue].write(e) : this[Qs](e),
					(this[Hr] = !1);
				let t = this[Xe].length ? !1 : this[Ke] ? this[Ke].flowing : !0;
				return (
					!t &&
						!this[Xe].length &&
						this[Ke].once('drain', (s) => this.emit('drain')),
					t
				);
			}
			[Oo](e) {
				e && !this[ct] && (this[P] = this[P] ? Buffer.concat([this[P], e]) : e);
			}
			[xo]() {
				if (this[bt] && !this[pl] && !this[ct] && !this[ti]) {
					this[pl] = !0;
					let e = this[xt];
					if (e && e.blockRemain) {
						let t = this[P] ? this[P].length : 0;
						this.warn(
							'TAR_BAD_ARCHIVE',
							`Truncated input (needed ${e.blockRemain} more bytes, only ${t} available)`,
							{ entry: e },
						),
							this[P] && e.write(this[P]),
							e.end();
					}
					this[It](ri);
				}
			}
			[Qs](e) {
				if (this[ti]) this[Oo](e);
				else if (!e && !this[P]) this[xo]();
				else {
					if (((this[ti] = !0), this[P])) {
						this[Oo](e);
						let t = this[P];
						(this[P] = null), this[ei](t);
					} else this[ei](e);
					for (; this[P] && this[P].length >= 512 && !this[ct] && !this[ii]; ) {
						let t = this[P];
						(this[P] = null), this[ei](t);
					}
					this[ti] = !1;
				}
				(!this[P] || this[bt]) && this[xo]();
			}
			[ei](e) {
				let t = 0,
					s = e.length;
				for (; t + 512 <= s && !this[ct] && !this[ii]; )
					switch (this[_e]) {
						case 'begin':
						case 'header':
							this[El](e, t), (t += 512);
							break;
						case 'ignore':
						case 'body':
							t += this[To](e, t);
							break;
						case 'meta':
							t += this[ml](e, t);
							break;
						default:
							throw new Error('invalid state: ' + this[_e]);
					}
				t < s &&
					(this[P]
						? (this[P] = Buffer.concat([e.slice(t), this[P]]))
						: (this[P] = e.slice(t)));
			}
			end(e) {
				this[ct] ||
					(this[ue] ? this[ue].end(e) : ((this[bt] = !0), this.write(e)));
			}
		},
	);
});
var oi = E((rR, vl) => {
	'use strict';
	var Mm = jt(),
		Rl = ni(),
		lr = require('fs'),
		Pm = ur(),
		_l = require('path'),
		bo = er();
	vl.exports = (r, e, t) => {
		typeof r == 'function'
			? ((t = r), (e = null), (r = {}))
			: Array.isArray(r) && ((e = r), (r = {})),
			typeof e == 'function' && ((t = e), (e = null)),
			e ? (e = Array.from(e)) : (e = []);
		let s = Mm(r);
		if (s.sync && typeof t == 'function')
			throw new TypeError('callback not supported for sync tar functions');
		if (!s.file && typeof t == 'function')
			throw new TypeError('callback only supported with file option');
		return (
			e.length && qm(s, e),
			s.noResume || km(s),
			s.file && s.sync ? Hm(s) : s.file ? Gm(s, t) : gl(s)
		);
	};
	var km = (r) => {
			let e = r.onentry;
			r.onentry = e
				? (t) => {
						e(t), t.resume();
				  }
				: (t) => t.resume();
		},
		qm = (r, e) => {
			let t = new Map(e.map((n) => [bo(n), !0])),
				s = r.filter,
				i = (n, o) => {
					let a = o || _l.parse(n).root || '.',
						c = n === a ? !1 : t.has(n) ? t.get(n) : i(_l.dirname(n), a);
					return t.set(n, c), c;
				};
			r.filter = s ? (n, o) => s(n, o) && i(bo(n)) : (n) => i(bo(n));
		},
		Hm = (r) => {
			let e = gl(r),
				t = r.file,
				s = !0,
				i;
			try {
				let n = lr.statSync(t),
					o = r.maxReadSize || 16 * 1024 * 1024;
				if (n.size < o) e.end(lr.readFileSync(t));
				else {
					let a = 0,
						c = Buffer.allocUnsafe(o);
					for (i = lr.openSync(t, 'r'); a < n.size; ) {
						let u = lr.readSync(i, c, 0, o, a);
						(a += u), e.write(c.slice(0, u));
					}
					e.end();
				}
				s = !1;
			} finally {
				if (s && i)
					try {
						lr.closeSync(i);
					} catch {}
			}
		},
		Gm = (r, e) => {
			let t = new Rl(r),
				s = r.maxReadSize || 16 * 1024 * 1024,
				i = r.file,
				n = new Promise((o, a) => {
					t.on('error', a),
						t.on('end', o),
						lr.stat(i, (c, u) => {
							if (c) a(c);
							else {
								let l = new Pm.ReadStream(i, { readSize: s, size: u.size });
								l.on('error', a), l.pipe(t);
							}
						});
				});
			return e ? n.then(e, e) : n;
		},
		gl = (r) => new Rl(r);
});
var xl = E((sR, Ol) => {
	'use strict';
	var zm = jt(),
		ai = $s(),
		Cl = ur(),
		wl = oi(),
		Sl = require('path');
	Ol.exports = (r, e, t) => {
		if (
			(typeof e == 'function' && (t = e),
			Array.isArray(r) && ((e = r), (r = {})),
			!e || !Array.isArray(e) || !e.length)
		)
			throw new TypeError('no files or directories specified');
		e = Array.from(e);
		let s = zm(r);
		if (s.sync && typeof t == 'function')
			throw new TypeError('callback not supported for sync tar functions');
		if (!s.file && typeof t == 'function')
			throw new TypeError('callback only supported with file option');
		return s.file && s.sync
			? Vm(s, e)
			: s.file
			? $m(s, e, t)
			: s.sync
			? jm(s, e)
			: Wm(s, e);
	};
	var Vm = (r, e) => {
			let t = new ai.Sync(r),
				s = new Cl.WriteStreamSync(r.file, { mode: r.mode || 438 });
			t.pipe(s), Tl(t, e);
		},
		$m = (r, e, t) => {
			let s = new ai(r),
				i = new Cl.WriteStream(r.file, { mode: r.mode || 438 });
			s.pipe(i);
			let n = new Promise((o, a) => {
				i.on('error', a), i.on('close', o), s.on('error', a);
			});
			return Io(s, e), t ? n.then(t, t) : n;
		},
		Tl = (r, e) => {
			e.forEach((t) => {
				t.charAt(0) === '@'
					? wl({
							file: Sl.resolve(r.cwd, t.substr(1)),
							sync: !0,
							noResume: !0,
							onentry: (s) => r.add(s),
					  })
					: r.add(t);
			}),
				r.end();
		},
		Io = (r, e) => {
			for (; e.length; ) {
				let t = e.shift();
				if (t.charAt(0) === '@')
					return wl({
						file: Sl.resolve(r.cwd, t.substr(1)),
						noResume: !0,
						onentry: (s) => r.add(s),
					}).then((s) => Io(r, e));
				r.add(t);
			}
			r.end();
		},
		jm = (r, e) => {
			let t = new ai.Sync(r);
			return Tl(t, e), t;
		},
		Wm = (r, e) => {
			let t = new ai(r);
			return Io(t, e), t;
		};
});
var No = E((iR, Fl) => {
	'use strict';
	var Km = jt(),
		bl = $s(),
		pe = require('fs'),
		Il = ur(),
		Nl = oi(),
		Al = require('path'),
		Ll = Qt();
	Fl.exports = (r, e, t) => {
		let s = Km(r);
		if (!s.file) throw new TypeError('file is required');
		if (s.gzip) throw new TypeError('cannot append to compressed archives');
		if (!e || !Array.isArray(e) || !e.length)
			throw new TypeError('no files or directories specified');
		return (e = Array.from(e)), s.sync ? Xm(s, e) : Zm(s, e, t);
	};
	var Xm = (r, e) => {
			let t = new bl.Sync(r),
				s = !0,
				i,
				n;
			try {
				try {
					i = pe.openSync(r.file, 'r+');
				} catch (c) {
					if (c.code === 'ENOENT') i = pe.openSync(r.file, 'w+');
					else throw c;
				}
				let o = pe.fstatSync(i),
					a = Buffer.alloc(512);
				e: for (n = 0; n < o.size; n += 512) {
					for (let l = 0, h = 0; l < 512; l += h) {
						if (
							((h = pe.readSync(i, a, l, a.length - l, n + l)),
							n === 0 && a[0] === 31 && a[1] === 139)
						)
							throw new Error('cannot append to compressed archives');
						if (!h) break e;
					}
					let c = new Ll(a);
					if (!c.cksumValid) break;
					let u = 512 * Math.ceil(c.size / 512);
					if (n + u + 512 > o.size) break;
					(n += u), r.mtimeCache && r.mtimeCache.set(c.path, c.mtime);
				}
				(s = !1), Ym(r, t, n, i, e);
			} finally {
				if (s)
					try {
						pe.closeSync(i);
					} catch {}
			}
		},
		Ym = (r, e, t, s, i) => {
			let n = new Il.WriteStreamSync(r.file, { fd: s, start: t });
			e.pipe(n), Jm(e, i);
		},
		Zm = (r, e, t) => {
			e = Array.from(e);
			let s = new bl(r),
				i = (o, a, c) => {
					let u = (p, y) => {
							p ? pe.close(o, (_) => c(p)) : c(null, y);
						},
						l = 0;
					if (a === 0) return u(null, 0);
					let h = 0,
						f = Buffer.alloc(512),
						d = (p, y) => {
							if (p) return u(p);
							if (((h += y), h < 512 && y))
								return pe.read(o, f, h, f.length - h, l + h, d);
							if (l === 0 && f[0] === 31 && f[1] === 139)
								return u(new Error('cannot append to compressed archives'));
							if (h < 512) return u(null, l);
							let _ = new Ll(f);
							if (!_.cksumValid) return u(null, l);
							let g = 512 * Math.ceil(_.size / 512);
							if (l + g + 512 > a || ((l += g + 512), l >= a))
								return u(null, l);
							r.mtimeCache && r.mtimeCache.set(_.path, _.mtime),
								(h = 0),
								pe.read(o, f, 0, 512, l, d);
						};
					pe.read(o, f, 0, 512, l, d);
				},
				n = new Promise((o, a) => {
					s.on('error', a);
					let c = 'r+',
						u = (l, h) => {
							if (l && l.code === 'ENOENT' && c === 'r+')
								return (c = 'w+'), pe.open(r.file, c, u);
							if (l) return a(l);
							pe.fstat(h, (f, d) => {
								if (f) return pe.close(h, () => a(f));
								i(h, d.size, (p, y) => {
									if (p) return a(p);
									let _ = new Il.WriteStream(r.file, { fd: h, start: y });
									s.pipe(_), _.on('error', a), _.on('close', o), Dl(s, e);
								});
							});
						};
					pe.open(r.file, c, u);
				});
			return t ? n.then(t, t) : n;
		},
		Jm = (r, e) => {
			e.forEach((t) => {
				t.charAt(0) === '@'
					? Nl({
							file: Al.resolve(r.cwd, t.substr(1)),
							sync: !0,
							noResume: !0,
							onentry: (s) => r.add(s),
					  })
					: r.add(t);
			}),
				r.end();
		},
		Dl = (r, e) => {
			for (; e.length; ) {
				let t = e.shift();
				if (t.charAt(0) === '@')
					return Nl({
						file: Al.resolve(r.cwd, t.substr(1)),
						noResume: !0,
						onentry: (s) => r.add(s),
					}).then((s) => Dl(r, e));
				r.add(t);
			}
			r.end();
		};
});
var Bl = E((nR, Ul) => {
	'use strict';
	var Qm = jt(),
		eE = No();
	Ul.exports = (r, e, t) => {
		let s = Qm(r);
		if (!s.file) throw new TypeError('file is required');
		if (s.gzip) throw new TypeError('cannot append to compressed archives');
		if (!e || !Array.isArray(e) || !e.length)
			throw new TypeError('no files or directories specified');
		return (e = Array.from(e)), tE(s), eE(s, e, t);
	};
	var tE = (r) => {
		let e = r.filter;
		r.mtimeCache || (r.mtimeCache = new Map()),
			(r.filter = e
				? (t, s) => e(t, s) && !(r.mtimeCache.get(t) > s.mtime)
				: (t, s) => !(r.mtimeCache.get(t) > s.mtime));
	};
});
var kl = E((oR, Pl) => {
	var { promisify: Ml } = require('util'),
		ut = require('fs'),
		rE = (r) => {
			if (!r) r = { mode: 511, fs: ut };
			else if (typeof r == 'object') r = { mode: 511, fs: ut, ...r };
			else if (typeof r == 'number') r = { mode: r, fs: ut };
			else if (typeof r == 'string') r = { mode: parseInt(r, 8), fs: ut };
			else throw new TypeError('invalid options argument');
			return (
				(r.mkdir = r.mkdir || r.fs.mkdir || ut.mkdir),
				(r.mkdirAsync = Ml(r.mkdir)),
				(r.stat = r.stat || r.fs.stat || ut.stat),
				(r.statAsync = Ml(r.stat)),
				(r.statSync = r.statSync || r.fs.statSync || ut.statSync),
				(r.mkdirSync = r.mkdirSync || r.fs.mkdirSync || ut.mkdirSync),
				r
			);
		};
	Pl.exports = rE;
});
var Hl = E((aR, ql) => {
	var sE = process.env.__TESTING_MKDIRP_PLATFORM__ || process.platform,
		{ resolve: iE, parse: nE } = require('path'),
		oE = (r) => {
			if (/\0/.test(r))
				throw Object.assign(
					new TypeError('path must be a string without null bytes'),
					{ path: r, code: 'ERR_INVALID_ARG_VALUE' },
				);
			if (((r = iE(r)), sE === 'win32')) {
				let e = /[*|"<>?:]/,
					{ root: t } = nE(r);
				if (e.test(r.substr(t.length)))
					throw Object.assign(new Error('Illegal characters in path.'), {
						path: r,
						code: 'EINVAL',
					});
			}
			return r;
		};
	ql.exports = oE;
});
var jl = E((cR, $l) => {
	var { dirname: Gl } = require('path'),
		zl = (r, e, t = void 0) =>
			t === e
				? Promise.resolve()
				: r.statAsync(e).then(
						(s) => (s.isDirectory() ? t : void 0),
						(s) => (s.code === 'ENOENT' ? zl(r, Gl(e), e) : void 0),
				  ),
		Vl = (r, e, t = void 0) => {
			if (t !== e)
				try {
					return r.statSync(e).isDirectory() ? t : void 0;
				} catch (s) {
					return s.code === 'ENOENT' ? Vl(r, Gl(e), e) : void 0;
				}
		};
	$l.exports = { findMade: zl, findMadeSync: Vl };
});
var Do = E((uR, Kl) => {
	var { dirname: Wl } = require('path'),
		Ao = (r, e, t) => {
			e.recursive = !1;
			let s = Wl(r);
			return s === r
				? e.mkdirAsync(r, e).catch((i) => {
						if (i.code !== 'EISDIR') throw i;
				  })
				: e.mkdirAsync(r, e).then(
						() => t || r,
						(i) => {
							if (i.code === 'ENOENT') return Ao(s, e).then((n) => Ao(r, e, n));
							if (i.code !== 'EEXIST' && i.code !== 'EROFS') throw i;
							return e.statAsync(r).then(
								(n) => {
									if (n.isDirectory()) return t;
									throw i;
								},
								() => {
									throw i;
								},
							);
						},
				  );
		},
		Lo = (r, e, t) => {
			let s = Wl(r);
			if (((e.recursive = !1), s === r))
				try {
					return e.mkdirSync(r, e);
				} catch (i) {
					if (i.code !== 'EISDIR') throw i;
					return;
				}
			try {
				return e.mkdirSync(r, e), t || r;
			} catch (i) {
				if (i.code === 'ENOENT') return Lo(r, e, Lo(s, e, t));
				if (i.code !== 'EEXIST' && i.code !== 'EROFS') throw i;
				try {
					if (!e.statSync(r).isDirectory()) throw i;
				} catch {
					throw i;
				}
			}
		};
	Kl.exports = { mkdirpManual: Ao, mkdirpManualSync: Lo };
});
var Zl = E((lR, Yl) => {
	var { dirname: Xl } = require('path'),
		{ findMade: aE, findMadeSync: cE } = jl(),
		{ mkdirpManual: uE, mkdirpManualSync: lE } = Do(),
		hE = (r, e) => (
			(e.recursive = !0),
			Xl(r) === r
				? e.mkdirAsync(r, e)
				: aE(e, r).then((s) =>
						e
							.mkdirAsync(r, e)
							.then(() => s)
							.catch((i) => {
								if (i.code === 'ENOENT') return uE(r, e);
								throw i;
							}),
				  )
		),
		fE = (r, e) => {
			if (((e.recursive = !0), Xl(r) === r)) return e.mkdirSync(r, e);
			let s = cE(e, r);
			try {
				return e.mkdirSync(r, e), s;
			} catch (i) {
				if (i.code === 'ENOENT') return lE(r, e);
				throw i;
			}
		};
	Yl.exports = { mkdirpNative: hE, mkdirpNativeSync: fE };
});
var th = E((hR, eh) => {
	var Jl = require('fs'),
		dE = process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version,
		Fo = dE.replace(/^v/, '').split('.'),
		Ql = +Fo[0] > 10 || (+Fo[0] == 10 && +Fo[1] >= 12),
		pE = Ql ? (r) => r.mkdir === Jl.mkdir : () => !1,
		mE = Ql ? (r) => r.mkdirSync === Jl.mkdirSync : () => !1;
	eh.exports = { useNative: pE, useNativeSync: mE };
});
var ah = E((fR, oh) => {
	var hr = kl(),
		fr = Hl(),
		{ mkdirpNative: rh, mkdirpNativeSync: sh } = Zl(),
		{ mkdirpManual: ih, mkdirpManualSync: nh } = Do(),
		{ useNative: EE, useNativeSync: yE } = th(),
		dr = (r, e) => ((r = fr(r)), (e = hr(e)), EE(e) ? rh(r, e) : ih(r, e)),
		_E = (r, e) => ((r = fr(r)), (e = hr(e)), yE(e) ? sh(r, e) : nh(r, e));
	dr.sync = _E;
	dr.native = (r, e) => rh(fr(r), hr(e));
	dr.manual = (r, e) => ih(fr(r), hr(e));
	dr.nativeSync = (r, e) => sh(fr(r), hr(e));
	dr.manualSync = (r, e) => nh(fr(r), hr(e));
	oh.exports = dr;
});
var ph = E((dR, dh) => {
	'use strict';
	var ge = require('fs'),
		At = require('path'),
		RE = ge.lchown ? 'lchown' : 'chown',
		gE = ge.lchownSync ? 'lchownSync' : 'chownSync',
		uh =
			ge.lchown &&
			!process.version.match(/v1[1-9]+\./) &&
			!process.version.match(/v10\.[6-9]/),
		ch = (r, e, t) => {
			try {
				return ge[gE](r, e, t);
			} catch (s) {
				if (s.code !== 'ENOENT') throw s;
			}
		},
		vE = (r, e, t) => {
			try {
				return ge.chownSync(r, e, t);
			} catch (s) {
				if (s.code !== 'ENOENT') throw s;
			}
		},
		CE = uh
			? (r, e, t, s) => (i) => {
					!i || i.code !== 'EISDIR' ? s(i) : ge.chown(r, e, t, s);
			  }
			: (r, e, t, s) => s,
		Uo = uh
			? (r, e, t) => {
					try {
						return ch(r, e, t);
					} catch (s) {
						if (s.code !== 'EISDIR') throw s;
						vE(r, e, t);
					}
			  }
			: (r, e, t) => ch(r, e, t),
		wE = process.version,
		lh = (r, e, t) => ge.readdir(r, e, t),
		SE = (r, e) => ge.readdirSync(r, e);
	/^v4\./.test(wE) && (lh = (r, e, t) => ge.readdir(r, t));
	var ci = (r, e, t, s) => {
			ge[RE](
				r,
				e,
				t,
				CE(r, e, t, (i) => {
					s(i && i.code !== 'ENOENT' ? i : null);
				}),
			);
		},
		hh = (r, e, t, s, i) => {
			if (typeof e == 'string')
				return ge.lstat(At.resolve(r, e), (n, o) => {
					if (n) return i(n.code !== 'ENOENT' ? n : null);
					(o.name = e), hh(r, o, t, s, i);
				});
			if (e.isDirectory())
				Bo(At.resolve(r, e.name), t, s, (n) => {
					if (n) return i(n);
					let o = At.resolve(r, e.name);
					ci(o, t, s, i);
				});
			else {
				let n = At.resolve(r, e.name);
				ci(n, t, s, i);
			}
		},
		Bo = (r, e, t, s) => {
			lh(r, { withFileTypes: !0 }, (i, n) => {
				if (i) {
					if (i.code === 'ENOENT') return s();
					if (i.code !== 'ENOTDIR' && i.code !== 'ENOTSUP') return s(i);
				}
				if (i || !n.length) return ci(r, e, t, s);
				let o = n.length,
					a = null,
					c = (u) => {
						if (!a) {
							if (u) return s((a = u));
							if (--o === 0) return ci(r, e, t, s);
						}
					};
				n.forEach((u) => hh(r, u, e, t, c));
			});
		},
		TE = (r, e, t, s) => {
			if (typeof e == 'string')
				try {
					let i = ge.lstatSync(At.resolve(r, e));
					(i.name = e), (e = i);
				} catch (i) {
					if (i.code === 'ENOENT') return;
					throw i;
				}
			e.isDirectory() && fh(At.resolve(r, e.name), t, s),
				Uo(At.resolve(r, e.name), t, s);
		},
		fh = (r, e, t) => {
			let s;
			try {
				s = SE(r, { withFileTypes: !0 });
			} catch (i) {
				if (i.code === 'ENOENT') return;
				if (i.code === 'ENOTDIR' || i.code === 'ENOTSUP') return Uo(r, e, t);
				throw i;
			}
			return s && s.length && s.forEach((i) => TE(r, i, e, t)), Uo(r, e, t);
		};
	dh.exports = Bo;
	Bo.sync = fh;
});
var _h = E((pR, Mo) => {
	'use strict';
	var mh = ah(),
		ve = require('fs'),
		ui = require('path'),
		Eh = ph(),
		be = Zt(),
		li = class extends Error {
			constructor(e, t) {
				super('Cannot extract through symbolic link'),
					(this.path = t),
					(this.symlink = e);
			}
			get name() {
				return 'SylinkError';
			}
		},
		hi = class extends Error {
			constructor(e, t) {
				super(t + ": Cannot cd into '" + e + "'"),
					(this.path = e),
					(this.code = t);
			}
			get name() {
				return 'CwdError';
			}
		},
		fi = (r, e) => r.get(be(e)),
		Gr = (r, e, t) => r.set(be(e), t),
		OE = (r, e) => {
			ve.stat(r, (t, s) => {
				(t || !s.isDirectory()) && (t = new hi(r, (t && t.code) || 'ENOTDIR')),
					e(t);
			});
		};
	Mo.exports = (r, e, t) => {
		r = be(r);
		let s = e.umask,
			i = e.mode | 448,
			n = (i & s) !== 0,
			o = e.uid,
			a = e.gid,
			c =
				typeof o == 'number' &&
				typeof a == 'number' &&
				(o !== e.processUid || a !== e.processGid),
			u = e.preserve,
			l = e.unlink,
			h = e.cache,
			f = be(e.cwd),
			d = (_, g) => {
				_
					? t(_)
					: (Gr(h, r, !0),
					  g && c ? Eh(g, o, a, (T) => d(T)) : n ? ve.chmod(r, i, t) : t());
			};
		if (h && fi(h, r) === !0) return d();
		if (r === f) return OE(r, d);
		if (u) return mh(r, { mode: i }).then((_) => d(null, _), d);
		let y = be(ui.relative(f, r)).split('/');
		di(f, y, i, h, l, f, null, d);
	};
	var di = (r, e, t, s, i, n, o, a) => {
			if (!e.length) return a(null, o);
			let c = e.shift(),
				u = be(ui.resolve(r + '/' + c));
			if (fi(s, u)) return di(u, e, t, s, i, n, o, a);
			ve.mkdir(u, t, yh(u, e, t, s, i, n, o, a));
		},
		yh = (r, e, t, s, i, n, o, a) => (c) => {
			c
				? ve.lstat(r, (u, l) => {
						if (u) (u.path = u.path && be(u.path)), a(u);
						else if (l.isDirectory()) di(r, e, t, s, i, n, o, a);
						else if (i)
							ve.unlink(r, (h) => {
								if (h) return a(h);
								ve.mkdir(r, t, yh(r, e, t, s, i, n, o, a));
							});
						else {
							if (l.isSymbolicLink())
								return a(new li(r, r + '/' + e.join('/')));
							a(c);
						}
				  })
				: ((o = o || r), di(r, e, t, s, i, n, o, a));
		},
		xE = (r) => {
			let e = !1,
				t = 'ENOTDIR';
			try {
				e = ve.statSync(r).isDirectory();
			} catch (s) {
				t = s.code;
			} finally {
				if (!e) throw new hi(r, t);
			}
		};
	Mo.exports.sync = (r, e) => {
		r = be(r);
		let t = e.umask,
			s = e.mode | 448,
			i = (s & t) !== 0,
			n = e.uid,
			o = e.gid,
			a =
				typeof n == 'number' &&
				typeof o == 'number' &&
				(n !== e.processUid || o !== e.processGid),
			c = e.preserve,
			u = e.unlink,
			l = e.cache,
			h = be(e.cwd),
			f = (_) => {
				Gr(l, r, !0), _ && a && Eh.sync(_, n, o), i && ve.chmodSync(r, s);
			};
		if (l && fi(l, r) === !0) return f();
		if (r === h) return xE(h), f();
		if (c) return f(mh.sync(r, s));
		let p = be(ui.relative(h, r)).split('/'),
			y = null;
		for (let _ = p.shift(), g = h; _ && (g += '/' + _); _ = p.shift())
			if (((g = be(ui.resolve(g))), !fi(l, g)))
				try {
					ve.mkdirSync(g, s), (y = y || g), Gr(l, g, !0);
				} catch {
					let S = ve.lstatSync(g);
					if (S.isDirectory()) {
						Gr(l, g, !0);
						continue;
					} else if (u) {
						ve.unlinkSync(g), ve.mkdirSync(g, s), (y = y || g), Gr(l, g, !0);
						continue;
					} else if (S.isSymbolicLink())
						return new li(g, g + '/' + p.join('/'));
				}
		return f(y);
	};
});
var ko = E((mR, Rh) => {
	var Po = Object.create(null),
		{ hasOwnProperty: bE } = Object.prototype;
	Rh.exports = (r) => (bE.call(Po, r) || (Po[r] = r.normalize('NFKD')), Po[r]);
});
var wh = E((ER, Ch) => {
	var gh = require('assert'),
		IE = ko(),
		NE = er(),
		{ join: vh } = require('path'),
		AE = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform,
		LE = AE === 'win32';
	Ch.exports = () => {
		let r = new Map(),
			e = new Map(),
			t = (u) =>
				u
					.split('/')
					.slice(0, -1)
					.reduce(
						(h, f) => (
							h.length && (f = vh(h[h.length - 1], f)), h.push(f || '/'), h
						),
						[],
					),
			s = new Set(),
			i = (u) => {
				let l = e.get(u);
				if (!l) throw new Error('function does not have any path reservations');
				return {
					paths: l.paths.map((h) => r.get(h)),
					dirs: [...l.dirs].map((h) => r.get(h)),
				};
			},
			n = (u) => {
				let { paths: l, dirs: h } = i(u);
				return (
					l.every((f) => f[0] === u) &&
					h.every((f) => f[0] instanceof Set && f[0].has(u))
				);
			},
			o = (u) => (s.has(u) || !n(u) ? !1 : (s.add(u), u(() => a(u)), !0)),
			a = (u) => {
				if (!s.has(u)) return !1;
				let { paths: l, dirs: h } = e.get(u),
					f = new Set();
				return (
					l.forEach((d) => {
						let p = r.get(d);
						gh.equal(p[0], u),
							p.length === 1
								? r.delete(d)
								: (p.shift(),
								  typeof p[0] == 'function'
										? f.add(p[0])
										: p[0].forEach((y) => f.add(y)));
					}),
					h.forEach((d) => {
						let p = r.get(d);
						gh(p[0] instanceof Set),
							p[0].size === 1 && p.length === 1
								? r.delete(d)
								: p[0].size === 1
								? (p.shift(), f.add(p[0]))
								: p[0].delete(u);
					}),
					s.delete(u),
					f.forEach((d) => o(d)),
					!0
				);
			};
		return {
			check: n,
			reserve: (u, l) => {
				u = LE
					? ['win32 parallelization disabled']
					: u.map((f) => IE(NE(vh(f))).toLowerCase());
				let h = new Set(u.map((f) => t(f)).reduce((f, d) => f.concat(d)));
				return (
					e.set(l, { dirs: h, paths: u }),
					u.forEach((f) => {
						let d = r.get(f);
						d ? d.push(l) : r.set(f, [l]);
					}),
					h.forEach((f) => {
						let d = r.get(f);
						d
							? d[d.length - 1] instanceof Set
								? d[d.length - 1].add(l)
								: d.push(new Set([l]))
							: r.set(f, [new Set([l])]);
					}),
					o(l)
				);
			},
		};
	};
});
var Oh = E((yR, Th) => {
	var DE = process.env.__FAKE_PLATFORM__ || process.platform,
		FE = DE === 'win32',
		UE = global.__FAKE_TESTING_FS__ || require('fs'),
		{
			O_CREAT: BE,
			O_TRUNC: ME,
			O_WRONLY: PE,
			UV_FS_O_FILEMAP: Sh = 0,
		} = UE.constants,
		kE = FE && !!Sh,
		qE = 512 * 1024,
		HE = Sh | ME | BE | PE;
	Th.exports = kE ? (r) => (r < qE ? HE : 'w') : () => 'w';
});
var Ko = E((_R, qh) => {
	'use strict';
	var GE = require('assert'),
		zE = ni(),
		N = require('fs'),
		VE = ur(),
		Ye = require('path'),
		Mh = _h(),
		xh = jn(),
		$E = wh(),
		jE = Wn(),
		me = Zt(),
		WE = er(),
		KE = ko(),
		bh = Symbol('onEntry'),
		Go = Symbol('checkFs'),
		Ih = Symbol('checkFs2'),
		Ei = Symbol('pruneCache'),
		zo = Symbol('isReusable'),
		Ce = Symbol('makeFs'),
		Vo = Symbol('file'),
		$o = Symbol('directory'),
		yi = Symbol('link'),
		Nh = Symbol('symlink'),
		Ah = Symbol('hardlink'),
		Lh = Symbol('unsupported'),
		Dh = Symbol('checkPath'),
		lt = Symbol('mkdir'),
		J = Symbol('onError'),
		pi = Symbol('pending'),
		Fh = Symbol('pend'),
		pr = Symbol('unpend'),
		qo = Symbol('ended'),
		Ho = Symbol('maybeClose'),
		jo = Symbol('skip'),
		zr = Symbol('doChown'),
		Vr = Symbol('uid'),
		$r = Symbol('gid'),
		jr = Symbol('checkedCwd'),
		Ph = require('crypto'),
		kh = Oh(),
		XE = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform,
		Wr = XE === 'win32',
		YE = (r, e) => {
			if (!Wr) return N.unlink(r, e);
			let t = r + '.DELETE.' + Ph.randomBytes(16).toString('hex');
			N.rename(r, t, (s) => {
				if (s) return e(s);
				N.unlink(t, e);
			});
		},
		ZE = (r) => {
			if (!Wr) return N.unlinkSync(r);
			let e = r + '.DELETE.' + Ph.randomBytes(16).toString('hex');
			N.renameSync(r, e), N.unlinkSync(e);
		},
		Uh = (r, e, t) => (r === r >>> 0 ? r : e === e >>> 0 ? e : t),
		Bh = (r) => KE(WE(me(r))).toLowerCase(),
		JE = (r, e) => {
			e = Bh(e);
			for (let t of r.keys()) {
				let s = Bh(t);
				(s === e || s.indexOf(e + '/') === 0) && r.delete(t);
			}
		},
		QE = (r) => {
			for (let e of r.keys()) r.delete(e);
		},
		Kr = class extends zE {
			constructor(e) {
				if (
					(e || (e = {}),
					(e.ondone = (t) => {
						(this[qo] = !0), this[Ho]();
					}),
					super(e),
					(this[jr] = !1),
					(this.reservations = $E()),
					(this.transform =
						typeof e.transform == 'function' ? e.transform : null),
					(this.writable = !0),
					(this.readable = !1),
					(this[pi] = 0),
					(this[qo] = !1),
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
					(this.win32 = !!e.win32 || Wr),
					(this.newer = !!e.newer),
					(this.keep = !!e.keep),
					(this.noMtime = !!e.noMtime),
					(this.preservePaths = !!e.preservePaths),
					(this.unlink = !!e.unlink),
					(this.cwd = me(Ye.resolve(e.cwd || process.cwd()))),
					(this.strip = +e.strip || 0),
					(this.processUmask = e.noChmod ? 0 : process.umask()),
					(this.umask =
						typeof e.umask == 'number' ? e.umask : this.processUmask),
					(this.dmode = e.dmode || 511 & ~this.umask),
					(this.fmode = e.fmode || 438 & ~this.umask),
					this.on('entry', (t) => this[bh](t));
			}
			warn(e, t, s = {}) {
				return (
					(e === 'TAR_BAD_ARCHIVE' || e === 'TAR_ABORT') &&
						(s.recoverable = !1),
					super.warn(e, t, s)
				);
			}
			[Ho]() {
				this[qo] &&
					this[pi] === 0 &&
					(this.emit('prefinish'),
					this.emit('finish'),
					this.emit('end'),
					this.emit('close'));
			}
			[Dh](e) {
				if (this.strip) {
					let t = me(e.path).split('/');
					if (t.length < this.strip) return !1;
					if (((e.path = t.slice(this.strip).join('/')), e.type === 'Link')) {
						let s = me(e.linkpath).split('/');
						if (s.length >= this.strip)
							e.linkpath = s.slice(this.strip).join('/');
						else return !1;
					}
				}
				if (!this.preservePaths) {
					let t = me(e.path),
						s = t.split('/');
					if (s.includes('..') || (Wr && /^[a-z]:\.\.$/i.test(s[0])))
						return (
							this.warn('TAR_ENTRY_ERROR', "path contains '..'", {
								entry: e,
								path: t,
							}),
							!1
						);
					let [i, n] = jE(t);
					i &&
						((e.path = n),
						this.warn('TAR_ENTRY_INFO', `stripping ${i} from absolute path`, {
							entry: e,
							path: t,
						}));
				}
				if (
					(Ye.isAbsolute(e.path)
						? (e.absolute = me(Ye.resolve(e.path)))
						: (e.absolute = me(Ye.resolve(this.cwd, e.path))),
					!this.preservePaths &&
						e.absolute.indexOf(this.cwd + '/') !== 0 &&
						e.absolute !== this.cwd)
				)
					return (
						this.warn('TAR_ENTRY_ERROR', 'path escaped extraction target', {
							entry: e,
							path: me(e.path),
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
					let { root: t } = Ye.win32.parse(e.absolute);
					e.absolute = t + xh.encode(e.absolute.substr(t.length));
					let { root: s } = Ye.win32.parse(e.path);
					e.path = s + xh.encode(e.path.substr(s.length));
				}
				return !0;
			}
			[bh](e) {
				if (!this[Dh](e)) return e.resume();
				switch ((GE.equal(typeof e.absolute, 'string'), e.type)) {
					case 'Directory':
					case 'GNUDumpDir':
						e.mode && (e.mode = e.mode | 448);
					case 'File':
					case 'OldFile':
					case 'ContiguousFile':
					case 'Link':
					case 'SymbolicLink':
						return this[Go](e);
					case 'CharacterDevice':
					case 'BlockDevice':
					case 'FIFO':
					default:
						return this[Lh](e);
				}
			}
			[J](e, t) {
				e.name === 'CwdError'
					? this.emit('error', e)
					: (this.warn('TAR_ENTRY_ERROR', e, { entry: t }),
					  this[pr](),
					  t.resume());
			}
			[lt](e, t, s) {
				Mh(
					me(e),
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
					s,
				);
			}
			[zr](e) {
				return (
					this.forceChown ||
					(this.preserveOwner &&
						((typeof e.uid == 'number' && e.uid !== this.processUid) ||
							(typeof e.gid == 'number' && e.gid !== this.processGid))) ||
					(typeof this.uid == 'number' && this.uid !== this.processUid) ||
					(typeof this.gid == 'number' && this.gid !== this.processGid)
				);
			}
			[Vr](e) {
				return Uh(this.uid, e.uid, this.processUid);
			}
			[$r](e) {
				return Uh(this.gid, e.gid, this.processGid);
			}
			[Vo](e, t) {
				let s = e.mode & 4095 || this.fmode,
					i = new VE.WriteStream(e.absolute, {
						flags: kh(e.size),
						mode: s,
						autoClose: !1,
					});
				i.on('error', (c) => {
					i.fd && N.close(i.fd, () => {}),
						(i.write = () => !0),
						this[J](c, e),
						t();
				});
				let n = 1,
					o = (c) => {
						if (c) {
							i.fd && N.close(i.fd, () => {}), this[J](c, e), t();
							return;
						}
						--n === 0 &&
							N.close(i.fd, (u) => {
								u ? this[J](u, e) : this[pr](), t();
							});
					};
				i.on('finish', (c) => {
					let u = e.absolute,
						l = i.fd;
					if (e.mtime && !this.noMtime) {
						n++;
						let h = e.atime || new Date(),
							f = e.mtime;
						N.futimes(l, h, f, (d) =>
							d ? N.utimes(u, h, f, (p) => o(p && d)) : o(),
						);
					}
					if (this[zr](e)) {
						n++;
						let h = this[Vr](e),
							f = this[$r](e);
						N.fchown(l, h, f, (d) =>
							d ? N.chown(u, h, f, (p) => o(p && d)) : o(),
						);
					}
					o();
				});
				let a = (this.transform && this.transform(e)) || e;
				a !== e &&
					(a.on('error', (c) => {
						this[J](c, e), t();
					}),
					e.pipe(a)),
					a.pipe(i);
			}
			[$o](e, t) {
				let s = e.mode & 4095 || this.dmode;
				this[lt](e.absolute, s, (i) => {
					if (i) {
						this[J](i, e), t();
						return;
					}
					let n = 1,
						o = (a) => {
							--n === 0 && (t(), this[pr](), e.resume());
						};
					e.mtime &&
						!this.noMtime &&
						(n++, N.utimes(e.absolute, e.atime || new Date(), e.mtime, o)),
						this[zr](e) &&
							(n++, N.chown(e.absolute, this[Vr](e), this[$r](e), o)),
						o();
				});
			}
			[Lh](e) {
				(e.unsupported = !0),
					this.warn(
						'TAR_ENTRY_UNSUPPORTED',
						`unsupported entry type: ${e.type}`,
						{ entry: e },
					),
					e.resume();
			}
			[Nh](e, t) {
				this[yi](e, e.linkpath, 'symlink', t);
			}
			[Ah](e, t) {
				let s = me(Ye.resolve(this.cwd, e.linkpath));
				this[yi](e, s, 'link', t);
			}
			[Fh]() {
				this[pi]++;
			}
			[pr]() {
				this[pi]--, this[Ho]();
			}
			[jo](e) {
				this[pr](), e.resume();
			}
			[zo](e, t) {
				return (
					e.type === 'File' && !this.unlink && t.isFile() && t.nlink <= 1 && !Wr
				);
			}
			[Go](e) {
				this[Fh]();
				let t = [e.path];
				e.linkpath && t.push(e.linkpath),
					this.reservations.reserve(t, (s) => this[Ih](e, s));
			}
			[Ei](e) {
				e.type === 'SymbolicLink'
					? QE(this.dirCache)
					: e.type !== 'Directory' && JE(this.dirCache, e.absolute);
			}
			[Ih](e, t) {
				this[Ei](e);
				let s = (a) => {
						this[Ei](e), t(a);
					},
					i = () => {
						this[lt](this.cwd, this.dmode, (a) => {
							if (a) {
								this[J](a, e), s();
								return;
							}
							(this[jr] = !0), n();
						});
					},
					n = () => {
						if (e.absolute !== this.cwd) {
							let a = me(Ye.dirname(e.absolute));
							if (a !== this.cwd)
								return this[lt](a, this.dmode, (c) => {
									if (c) {
										this[J](c, e), s();
										return;
									}
									o();
								});
						}
						o();
					},
					o = () => {
						N.lstat(e.absolute, (a, c) => {
							if (c && (this.keep || (this.newer && c.mtime > e.mtime))) {
								this[jo](e), s();
								return;
							}
							if (a || this[zo](e, c)) return this[Ce](null, e, s);
							if (c.isDirectory()) {
								if (e.type === 'Directory') {
									let u = !this.noChmod && e.mode && (c.mode & 4095) !== e.mode,
										l = (h) => this[Ce](h, e, s);
									return u ? N.chmod(e.absolute, e.mode, l) : l();
								}
								if (e.absolute !== this.cwd)
									return N.rmdir(e.absolute, (u) => this[Ce](u, e, s));
							}
							if (e.absolute === this.cwd) return this[Ce](null, e, s);
							YE(e.absolute, (u) => this[Ce](u, e, s));
						});
					};
				this[jr] ? n() : i();
			}
			[Ce](e, t, s) {
				if (e) {
					this[J](e, t), s();
					return;
				}
				switch (t.type) {
					case 'File':
					case 'OldFile':
					case 'ContiguousFile':
						return this[Vo](t, s);
					case 'Link':
						return this[Ah](t, s);
					case 'SymbolicLink':
						return this[Nh](t, s);
					case 'Directory':
					case 'GNUDumpDir':
						return this[$o](t, s);
				}
			}
			[yi](e, t, s, i) {
				N[s](t, e.absolute, (n) => {
					n ? this[J](n, e) : (this[pr](), e.resume()), i();
				});
			}
		},
		mi = (r) => {
			try {
				return [null, r()];
			} catch (e) {
				return [e, null];
			}
		},
		Wo = class extends Kr {
			[Ce](e, t) {
				return super[Ce](e, t, () => {});
			}
			[Go](e) {
				if ((this[Ei](e), !this[jr])) {
					let n = this[lt](this.cwd, this.dmode);
					if (n) return this[J](n, e);
					this[jr] = !0;
				}
				if (e.absolute !== this.cwd) {
					let n = me(Ye.dirname(e.absolute));
					if (n !== this.cwd) {
						let o = this[lt](n, this.dmode);
						if (o) return this[J](o, e);
					}
				}
				let [t, s] = mi(() => N.lstatSync(e.absolute));
				if (s && (this.keep || (this.newer && s.mtime > e.mtime)))
					return this[jo](e);
				if (t || this[zo](e, s)) return this[Ce](null, e);
				if (s.isDirectory()) {
					if (e.type === 'Directory') {
						let o = !this.noChmod && e.mode && (s.mode & 4095) !== e.mode,
							[a] = o
								? mi(() => {
										N.chmodSync(e.absolute, e.mode);
								  })
								: [];
						return this[Ce](a, e);
					}
					let [n] = mi(() => N.rmdirSync(e.absolute));
					this[Ce](n, e);
				}
				let [i] = e.absolute === this.cwd ? [] : mi(() => ZE(e.absolute));
				this[Ce](i, e);
			}
			[Vo](e, t) {
				let s = e.mode & 4095 || this.fmode,
					i = (a) => {
						let c;
						try {
							N.closeSync(n);
						} catch (u) {
							c = u;
						}
						(a || c) && this[J](a || c, e), t();
					},
					n;
				try {
					n = N.openSync(e.absolute, kh(e.size), s);
				} catch (a) {
					return i(a);
				}
				let o = (this.transform && this.transform(e)) || e;
				o !== e && (o.on('error', (a) => this[J](a, e)), e.pipe(o)),
					o.on('data', (a) => {
						try {
							N.writeSync(n, a, 0, a.length);
						} catch (c) {
							i(c);
						}
					}),
					o.on('end', (a) => {
						let c = null;
						if (e.mtime && !this.noMtime) {
							let u = e.atime || new Date(),
								l = e.mtime;
							try {
								N.futimesSync(n, u, l);
							} catch (h) {
								try {
									N.utimesSync(e.absolute, u, l);
								} catch {
									c = h;
								}
							}
						}
						if (this[zr](e)) {
							let u = this[Vr](e),
								l = this[$r](e);
							try {
								N.fchownSync(n, u, l);
							} catch (h) {
								try {
									N.chownSync(e.absolute, u, l);
								} catch {
									c = c || h;
								}
							}
						}
						i(c);
					});
			}
			[$o](e, t) {
				let s = e.mode & 4095 || this.dmode,
					i = this[lt](e.absolute, s);
				if (i) {
					this[J](i, e), t();
					return;
				}
				if (e.mtime && !this.noMtime)
					try {
						N.utimesSync(e.absolute, e.atime || new Date(), e.mtime);
					} catch {}
				if (this[zr](e))
					try {
						N.chownSync(e.absolute, this[Vr](e), this[$r](e));
					} catch {}
				t(), e.resume();
			}
			[lt](e, t) {
				try {
					return Mh.sync(me(e), {
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
				} catch (s) {
					return s;
				}
			}
			[yi](e, t, s, i) {
				try {
					N[s + 'Sync'](t, e.absolute), i(), e.resume();
				} catch (n) {
					return this[J](n, e);
				}
			}
		};
	Kr.Sync = Wo;
	qh.exports = Kr;
});
var $h = E((RR, Vh) => {
	'use strict';
	var ey = jt(),
		_i = Ko(),
		Gh = require('fs'),
		zh = ur(),
		Hh = require('path'),
		Xo = er();
	Vh.exports = (r, e, t) => {
		typeof r == 'function'
			? ((t = r), (e = null), (r = {}))
			: Array.isArray(r) && ((e = r), (r = {})),
			typeof e == 'function' && ((t = e), (e = null)),
			e ? (e = Array.from(e)) : (e = []);
		let s = ey(r);
		if (s.sync && typeof t == 'function')
			throw new TypeError('callback not supported for sync tar functions');
		if (!s.file && typeof t == 'function')
			throw new TypeError('callback only supported with file option');
		return (
			e.length && ty(s, e),
			s.file && s.sync ? ry(s) : s.file ? sy(s, t) : s.sync ? iy(s) : ny(s)
		);
	};
	var ty = (r, e) => {
			let t = new Map(e.map((n) => [Xo(n), !0])),
				s = r.filter,
				i = (n, o) => {
					let a = o || Hh.parse(n).root || '.',
						c = n === a ? !1 : t.has(n) ? t.get(n) : i(Hh.dirname(n), a);
					return t.set(n, c), c;
				};
			r.filter = s ? (n, o) => s(n, o) && i(Xo(n)) : (n) => i(Xo(n));
		},
		ry = (r) => {
			let e = new _i.Sync(r),
				t = r.file,
				s = Gh.statSync(t),
				i = r.maxReadSize || 16 * 1024 * 1024;
			new zh.ReadStreamSync(t, { readSize: i, size: s.size }).pipe(e);
		},
		sy = (r, e) => {
			let t = new _i(r),
				s = r.maxReadSize || 16 * 1024 * 1024,
				i = r.file,
				n = new Promise((o, a) => {
					t.on('error', a),
						t.on('close', o),
						Gh.stat(i, (c, u) => {
							if (c) a(c);
							else {
								let l = new zh.ReadStream(i, { readSize: s, size: u.size });
								l.on('error', a), l.pipe(t);
							}
						});
				});
			return e ? n.then(e, e) : n;
		},
		iy = (r) => new _i.Sync(r),
		ny = (r) => new _i(r);
});
var jh = E((G) => {
	'use strict';
	G.c = G.create = xl();
	G.r = G.replace = No();
	G.t = G.list = oi();
	G.u = G.update = Bl();
	G.x = G.extract = $h();
	G.Pack = $s();
	G.Unpack = Ko();
	G.Parse = ni();
	G.ReadEntry = bs();
	G.WriteEntry = so();
	G.Header = Qt();
	G.Pax = Ns();
	G.types = kn();
});
var Yh = {};
Pe(Yh, { FileStorage: () => Yo });
var Kh,
	Q,
	Lt,
	Xh,
	Wh,
	Ri,
	Xr,
	Yo,
	Zh = ee(() => {
		'use strict';
		(Kh = require('crypto')),
			(Q = require('fs')),
			(Lt = Rf(require('path'))),
			(Xh = require('path'));
		Ar();
		dt();
		Rs();
		Ai();
		(Wh = ln()),
			(Ri = jh()),
			({ output: Xr } = qe()),
			(Yo = class {
				constructor(e, t, s, i) {
					this.encryption = e;
					this.errorReporter = t;
					this.context = i;
					this.storedHashes = [];
					this.axiosConfigBuilder = (e) => e;
					if (s.customProxyConfigPath) {
						let { fileServerProxyConfig: n } = require((0, Xh.join)(
							process.cwd(),
							s.customProxyConfigPath,
						));
						this.axiosConfigBuilder = n ?? this.axiosConfigBuilder;
					}
				}
				async retrieve(e, t, s) {
					M &&
						Xr.note({
							title: `Nx Cloud: Downloading ${e}`,
							bodyLines: [`RETRIEVAL URL: ${t}`],
						});
					let i = this.createFileName(e, s),
						n = this.createCommitFilePath(e, s);
					try {
						await this.downloadFile(t, i, n),
							this.createCommitFile(n),
							M && Xr.note({ title: `Nx Cloud: Downloaded ${e}` });
					} catch (o) {
						let a = o.message || o.toString(),
							c = `Failed to download or untar the cached artifacts for ${e}. Context: ${this.context}. Url: ${t}. Error: ${a}.`;
						throw (
							((this.context === 'dte-agent' || this.context === 'dte-main') &&
								Xr.note({
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
				async store(e, t, s) {
					M &&
						Xr.note({
							title: `Nx Cloud: Storing ${e}`,
							bodyLines: [`STORAGE URL: ${t}`],
						});
					let i;
					if (process.env.NRWL_INTERNAL_TAR_DEBUG) {
						let o = 1,
							a = !1,
							c = [];
						for (; o <= 3 && !a; ) {
							i = await this.createFile(e, s);
							let u = `/tmp/${e}/attempt${o}`;
							(0, Q.mkdirSync)(u, { recursive: !0 });
							try {
								let l = (0, Q.createReadStream)(i).pipe(Ri.x({ cwd: u }));
								await this.convertStreamIntoPromise(l), (a = !0);
							} catch (l) {
								console.error(l), await kt(5e3);
							}
							c.push({ attempt: o, success: a }), o++;
						}
						if (c.some((u) => !u.success)) {
							console.error(JSON.stringify(c, null, 2));
							let u = c
								.filter((l) => !l.success)
								.map((l) => l.attempt)
								.join(', ');
							throw new Error(
								`Untar failed for hash ${e} in attempts ${u} out of ${c.length}`,
							);
						}
					} else i = await this.createFile(e, s);
					await this.uploadFile(t, i),
						this.storedHashes.push(e),
						M && Xr.note({ title: `Nx Cloud: Stored ${e}` });
				}
				createFileName(e, t) {
					return Lt.join(t, `${e}.tar.gz`);
				}
				async downloadFile(e, t, s) {
					var o;
					let i = _t('retrieveFile'),
						n;
					try {
						let a = new URL(e),
							c = a.origin + a.pathname,
							u = {};
						for (let [l, h] of a.searchParams.entries()) u[l] = h;
						(n = await He(() =>
							Wh(
								c,
								this.axiosConfigBuilder({
									method: 'GET',
									responseType: 'stream',
									maxContentLength: Se ? Mt : Pt,
									maxBodyLength: Se ? Mt : Pt,
									timeout: Se ? Bt : 6e4,
									params: u,
								}),
							),
						)),
							i.recordMetric({
								...Oe(n),
								payloadSize: n.data.headers['content-length'],
							});
					} catch (a) {
						throw (
							(i.recordMetric(
								(o = a == null ? void 0 : a.axiosException) != null &&
									o.response
									? Oe(a.axiosException.response)
									: Rt,
							),
							a)
						);
					}
					if ((0, Q.existsSync)(t)) {
						let a = 0;
						for (; a++ < 50; ) {
							if ((0, Q.existsSync)(s)) return;
							await kt(500);
						}
					}
					if (this.encryption.hasEncryption()) {
						await new Promise((c) => {
							n.data
								.pipe((0, Q.createWriteStream)(t))
								.on('close', () => c(null));
						}),
							this.encryption.decryptFile(t);
						let a = (0, Q.createReadStream)(t).pipe(
							Ri.x({ cwd: Lt.dirname(t) }),
						);
						return this.convertStreamIntoPromise(a);
					} else {
						let a = n.data.pipe(Ri.x({ cwd: Lt.dirname(t) }));
						return this.convertStreamIntoPromise(a);
					}
				}
				convertStreamIntoPromise(e) {
					return new Promise((t, s) => {
						e.on('error', (i) => {
							i.tarCode === 'TAR_ABORT' &&
							i.message.indexOf('incorrect header check') > -1
								? (console.warn(
										'FileStorage: Decompression OK, Trailing garbage ignored.',
								  ),
								  t(null))
								: s(i);
						}),
							e.on('close', () => t(null));
					});
				}
				createCommitFile(e) {
					(0, Q.writeFileSync)(e, 'true');
				}
				createCommitFilePath(e, t) {
					return Lt.join(t, `${e}.commit`);
				}
				async createFile(e, t) {
					let s = this.createFileName(e, t);
					try {
						(0, Q.unlinkSync)(Lt.join(t, e, 'source'));
					} catch {}
					return (
						await Ri.c({ gzip: !0, file: s, cwd: t }, [e]),
						this.encryption.hasEncryption() && this.encryption.encryptFile(s),
						s
					);
				}
				async uploadFile(e, t) {
					var a;
					let s = _t('storeFile'),
						i = (0, Q.readFileSync)(t),
						n = this.generateMD5(i),
						o = this.getFileUploadHeaders(e, n);
					try {
						let c = await He(() =>
							Wh(
								e,
								this.axiosConfigBuilder({
									method: 'PUT',
									data: i,
									headers: o,
									maxContentLength: Se ? Mt : Pt,
									maxBodyLength: Se ? Mt : Pt,
									timeout: Se ? Bt : 12e4,
								}),
							),
						);
						s.recordMetric({
							...Oe(c),
							payloadSize: c.config.headers['Content-Length'],
						});
					} catch (c) {
						throw (
							(s.recordMetric(
								(a = c == null ? void 0 : c.axiosException) != null &&
									a.response
									? Oe(c.axiosException.response)
									: Rt,
							),
							c)
						);
					}
				}
				generateMD5(e) {
					let t = (0, Kh.createHash)('md5');
					return t.update(e), t.digest('base64');
				}
				getFileUploadHeaders(e, t) {
					let s = e.includes('/file/'),
						i = {
							'Content-Type': 'application/octet-stream',
							'x-ms-blob-type': 'BlockBlob',
						};
					return s && (i['Content-MD5'] = t), i;
				}
			});
	});
function Jo() {
	for (let r of Object.values(oy))
		if (r.detectorFn(process.env)) {
			let e = r.contextRetrieverFn(process.env);
			return (
				M && console.log(JSON.stringify(e, null, 2)),
				{ ...e, inferredFromTaskRunner: !0 }
			);
		}
	return M && console.log('[Nx Cloud] Did not identify a VCS platform.'), null;
}
function ay(r) {
	return r.CIRCLECI === 'true';
}
function cy(r) {
	M && console.log('[Nx Cloud] Detected Env: CircleCI');
	let e = (s) => {
			if (s.CIRCLE_PR_NUMBER !== void 0) return s.CIRCLE_PR_NUMBER;
			if (s.CIRCLE_PULL_REQUEST !== void 0) {
				let i = s.CIRCLE_PULL_REQUEST.split('/');
				return i[i.length - 1];
			}
			return s.CIRCLE_BRANCH !== void 0 ? s.CIRCLE_BRANCH : 'unknown';
		},
		t = (s) =>
			s.CIRCLE_USERNAME !== void 0
				? s.CIRCLE_USERNAME
				: s.CIRCLE_PR_USERNAME
				? s.CIRCLE_PR_USERNAME
				: null;
	return {
		branch: e(r),
		ref: r.CIRCLE_BRANCH ?? null,
		title: Qo(),
		headSha: r.CIRCLE_SHA1 ?? 'unknown',
		baseSha: null,
		commitLink: r.CIRCLE_PULL_REQUEST ?? null,
		author: t(r),
		authorUrl: null,
		authorAvatarUrl: null,
	};
}
function uy(r) {
	return r.TRAVIS === 'true';
}
function ly(r) {
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
			author: Jh(),
			authorUrl: null,
			authorAvatarUrl: null,
		}
	);
}
function hy(r) {
	return r.GITHUB_ACTIONS === 'true';
}
function fy(r) {
	M && console.log('[Nx Cloud] Detected Env: GitHub Actions');
	let e = (i) => {
			if (i.GITHUB_REF) {
				let n = i.GITHUB_REF.match(/refs\/pull\/(\d+)\/merge/);
				if (n) return n[1];
			}
			return i.GITHUB_HEAD_REF
				? i.GITHUB_HEAD_REF
				: i.GITHUB_REF_NAME
				? i.GITHUB_REF_NAME
				: 'unknown';
		},
		t = (i) => {
			let n = `${i.GITHUB_SERVER_URL}/${i.GITHUB_REPOSITORY}`;
			return i.GITHUB_EVENT_NAME === 'pull_request'
				? `${n}/pull/${e(i)}`
				: `${n}/commit/${i.GITHUB_SHA}`;
		},
		s = (i) =>
			i.GITHUB_HEAD_REF
				? i.GITHUB_HEAD_REF
				: i.GITHUB_REF
				? i.GITHUB_REF
				: null;
	return {
		branch: e(r),
		ref: s(r),
		title: Qo(),
		headSha: r.GITHUB_SHA ?? 'unknown',
		baseSha: null,
		commitLink: t(r),
		author: r.GITHUB_ACTOR ?? null,
		authorUrl: `https://github.com/${r.GITHUB_ACTOR}`,
		authorAvatarUrl: `https://avatars.githubusercontent.com/u/${r.GITHUB_ACTOR_ID}`,
	};
}
function dy(r) {
	return r.BITBUCKET_BUILD_NUMBER != null;
}
function py(r) {
	return (
		M && console.log('[Nx Cloud] Detected Env: BitBucket Pipelines'),
		{
			branch: r.BITBUCKET_PR_ID ?? r.BITBUCKET_BRANCH ?? 'unknown',
			ref: null,
			title: Qo(),
			headSha: r.BITBUCKET_COMMIT ?? 'unknown',
			baseSha: null,
			commitLink: null,
			author: Jh(),
			authorUrl: null,
			authorAvatarUrl: null,
		}
	);
}
function my(r) {
	return r.BUILD_BUILDID !== void 0 && r.AGENT_NAME !== void 0;
}
function Ey(r) {
	return (
		M && console.log('[Nx Cloud] Detected Env: Azure DevOps'),
		{
			branch:
				r.SYSTEM_PULLREQUEST_PULLREQUESTNUMBER ??
				r.BUILD_SOURCEBRANCHNAME ??
				'unknown',
			ref: null,
			title: r.BUILD_SOURCEVERSIONMESSAGE ?? null,
			headSha: Sr() ?? 'unknown',
			baseSha: null,
			commitLink: null,
			author: r.BUILD_REQUESTEDFOR ?? null,
			authorUrl: null,
			authorAvatarUrl: null,
		}
	);
}
function yy(r) {
	return r.GITLAB_CI === 'true';
}
function _y(r) {
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
			headSha: Sr() ?? 'unknown',
			baseSha: null,
			commitLink: null,
			author: r.GITLAB_USER_NAME ?? null,
			authorUrl: null,
			authorAvatarUrl: null,
		}
	);
}
function Qo() {
	try {
		return (0, Zo.execSync)('git log -1 --pretty=%B', {
			encoding: 'utf-8',
		}).trim();
	} catch {
		return null;
	}
}
function Jh() {
	try {
		return (0, Zo.execSync)('git log -1 --pretty=%aN', {
			encoding: 'utf-8',
		}).trim();
	} catch {
		return null;
	}
}
var Zo,
	oy,
	Qh = ee(() => {
		'use strict';
		Zo = require('child_process');
		dt();
		oy = {
			CIRCLE_CI: { detectorFn: ay, contextRetrieverFn: cy },
			TRAVIS_CI: { detectorFn: uy, contextRetrieverFn: ly },
			GITHUB_ACTIONS: { detectorFn: hy, contextRetrieverFn: fy },
			BITBUCKET_PIPELINES: { detectorFn: dy, contextRetrieverFn: py },
			AZURE_DEVOPS: { detectorFn: my, contextRetrieverFn: Ey },
			GITLAB_PIPELINES: { detectorFn: yy, contextRetrieverFn: _y },
		};
	});
var sf = {};
Pe(sf, { CloudRunApi: () => ea });
var ef,
	tf,
	rf,
	gi,
	ea,
	nf = ee(() => {
		'use strict';
		(ef = require('fs')), (tf = require('util')), (rf = require('zlib'));
		Ar();
		dt();
		Qh();
		Si();
		Rs();
		({ output: gi } = qe()),
			(ea = class {
				constructor(e, t, s, i) {
					this.messages = e;
					this.runContext = t;
					this.machineInfo = i;
					this.apiAxiosInstance = $t(s);
				}
				async startRun(e, t) {
					var i;
					if (this.messages.apiError) return {};
					let s = _t('startRun');
					try {
						let n = {
							meta: { nxCloudVersion: this.nxCloudVersion() },
							branch: Tr(),
							runGroup: Ni(),
							ciExecutionId: Ii(),
							ciExecutionEnv: vr(),
							distributedExecutionId: e,
							hashes: t,
							machineInfo: this.machineInfo,
							vcsContext: Jo(),
						};
						M &&
							gi.note({
								title: 'RunStart',
								bodyLines: [
									`
` + JSON.stringify(n, null, 2),
								],
							});
						let o = await fn('RunStart duration', () =>
							He(() => this.apiAxiosInstance.post('/nx-cloud/runs/start', n)),
						);
						return (
							s.recordMetric(Oe(o)),
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
					} catch (n) {
						return (
							s.recordMetric(
								(i = n == null ? void 0 : n.axiosException) != null &&
									i.response
									? Oe(n.axiosException.response)
									: Rt,
							),
							(this.messages.apiError = this.messages.extractErrorMessage(
								n,
								'api',
							)),
							{}
						);
					}
				}
				createReqBody(e, t, s, i) {
					if (Ut()) for (let o of t) delete o.uploadedToStorage;
					let n = {
						meta: { nxCloudVersion: this.nxCloudVersion() },
						tasks: t,
						run: e,
						linkId: i,
						...(Ut() ? {} : s),
						machineInfo: this.machineInfo,
						vcsContext: Jo(),
					};
					return JSON.stringify(n);
				}
				async endRun(e, t, s, i) {
					var u;
					if (this.messages.apiError) return !1;
					let n = this.createReqBody(e, t, s, i);
					n.length > 20 * 1e3 * 1e3 &&
						(n = this.createReqBody(
							e,
							t.map((l) => ({ ...l, hashDetails: void 0 })),
							s,
							i,
						));
					let o = Buffer.from(n),
						a = await (0, tf.promisify)(rf.gzip)(o),
						c = _t('endRun');
					try {
						if (M) {
							let h = t.map((f) => ({
								...f,
								terminalOutput: f.terminalOutput
									? `${f.terminalOutput.slice(0, 20)}...`
									: void 0,
							}));
							gi.note({
								title: 'RunEnd. Completed tasks',
								bodyLines: [
									`
` + JSON.stringify(h, null, 2),
								],
							});
						}
						let l = await fn('RunEnd duration', () =>
							He(() =>
								this.apiAxiosInstance.post('/nx-cloud/runs/end', a, {
									headers: {
										...this.apiAxiosInstance.defaults.headers,
										'Content-Encoding': 'gzip',
										'Content-Type': 'application/octet-stream',
									},
								}),
							),
						);
						if (l) {
							if (
								(c.recordMetric(Oe(l)),
								l.data && l.data.runUrl && l.data.status === 'success')
							)
								return (this.runContext.runUrl = l.data.runUrl), !0;
							l.data && l.data.status
								? (this.messages.apiError = `Invalid end run response: ${JSON.stringify(
										l.data.message,
								  )}`)
								: l.data && typeof l.data == 'string'
								? l.data !== 'success' &&
								  (this.messages.apiError = `Invalid end run response: ${JSON.stringify(
										l.data,
								  )}`)
								: (this.messages.apiError = `Invalid end run response: ${JSON.stringify(
										l.data,
								  )}`),
								M &&
									gi.note({
										title: 'Invalid end run response',
										bodyLines: [JSON.stringify(l.data, null, 2)],
									});
						} else
							gi.error({
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
					} catch (l) {
						c.recordMetric(
							(u = l == null ? void 0 : l.axiosException) != null && u.response
								? Oe(l.axiosException.response)
								: Rt,
						);
						let h = l.axiosException ?? l;
						return (
							(this.messages.apiError = this.messages.extractErrorMessage(
								h,
								'api',
							)),
							!1
						);
					}
				}
				nxCloudVersion() {
					try {
						let e = JSON.parse((0, ef.readFileSync)('package.json').toString());
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
var of = {};
Pe(of, { ErrorReporterApi: () => ta });
var Ry,
	ta,
	af = ee(() => {
		'use strict';
		Ar();
		({ output: Ry } = qe()),
			(ta = class {
				constructor(e) {
					this.apiAxiosInstance = $t(e);
				}
				async reportError(e) {
					try {
						await He(() =>
							this.apiAxiosInstance.post('/nx-cloud/report-client-error', {
								message: e,
							}),
						);
					} catch (t) {
						Ry.warn({
							title: `Unable to record the following error: '${e}'`,
							bodyLines: [t.message],
						});
					}
				}
			});
	});
var cf = {};
Pe(cf, { E2EEncryption: () => ra });
var Er,
	mr,
	ra,
	uf = ee(() => {
		'use strict';
		(Er = require('crypto')),
			(mr = require('fs')),
			(ra = class {
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
					let t = (0, Er.randomBytes)(16),
						s = (0, Er.createCipheriv)('aes-256-cbc', this.encryptionKey, t),
						i = (0, mr.readFileSync)(e),
						n = s.update(i),
						o = Buffer.concat([t, n, s.final()]);
					(0, mr.writeFileSync)(e, o);
				}
				decryptFile(e) {
					let t = (0, mr.readFileSync)(e);
					try {
						let s = (0, Er.createDecipheriv)(
								'aes-256-cbc',
								this.encryptionKey,
								t.slice(0, 16),
							),
							i = t.slice(16),
							n = s.update(i),
							o = Buffer.concat([n, s.final()]);
						(0, mr.writeFileSync)(e, o);
					} catch {
						throw new Error(
							'Could not decrypt the artifact. Please check your encryption key.',
						);
					}
				}
			});
	});
var lf = {};
Pe(lf, { MessageReporter: () => sa });
var gy,
	sa,
	hf = ee(() => {
		'use strict';
		pn();
		({ output: gy } = qe()),
			(sa = class {
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
							gy.warn({ title: 'Nx Cloud Problems', bodyLines: e });
					}
					this.message && _s(this.message);
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
						let s = '';
						e.response && e.response.data && e.response.data.message
							? (s = `. ${e.response.data.message}`)
							: e.response && e.response.data && (s = `. ${e.response.data}`);
						let i = e.code ? ` (code: ${e.code})` : '';
						return `${e.message}${s}${i}`;
					}
				}
			});
	});
var vy = {};
Pe(vy, { default: () => ff });
module.exports = ke(vy);
async function ff(r, e) {
	if (r.lightRunnerResolutionPaths) {
		let { configureLightClientRequire: g } = (Rr(), ke(na));
		g(r.lightRunnerResolutionPaths);
	}
	let { cacheDirectory: t } = oa(),
		{ FileStorage: s } = (Zh(), ke(Yh)),
		{ CloudRunApi: i } = (nf(), ke(sf)),
		{ ErrorReporterApi: n } = (af(), ke(of)),
		{ E2EEncryption: o } = (uf(), ke(cf)),
		{ getMachineInfo: a } = (dt(), ke(Sa)),
		{ MessageReporter: c } = (hf(), ke(lf)),
		{ submitRunMetrics: u } = (Rs(), ke(nu)),
		l = new o(r.encryptionKey),
		h = new n(r.runnerOptions),
		f = new s(l, h, r.runnerOptions, 'daemon'),
		d = new c(r.runnerOptions),
		p = {},
		y = a(),
		_ = new i(d, p, r.runnerOptions, y);
	return (
		setTimeout(async () => {
			e.log('Uploading file artifacts');
			try {
				await Promise.all(
					r.delayedStoreRequests.map((g) => f.store(g.hash, g.url, t)),
				),
					e.log('Done uploading file artifacts');
			} catch (g) {
				e.log('Error when uploading file artifacts'), console.log(g);
				return;
			}
			for (let g of f.storedHashes) {
				let T = r.runEnd.taskExecutions.find((S) => S.hash === g);
				if (!T) throw new Error(`Task with hash ${g} isn't recorded`);
				T.uploadedToStorage = !0;
			}
			e.log('Sending EndRun request');
			try {
				if (
					!(await _.endRun(
						r.runEnd.runData,
						r.runEnd.taskExecutions,
						r.ciExecutionContext,
						r.runEnd.linkId,
					))
				)
					throw new Error(d.apiError);
				e.log('Done sending EndRun request');
			} catch (g) {
				e.log('Error when sending EndRun'), console.log(g);
			}
			await u(r.runOptions);
		}, 0),
		'{}'
	);
}
