(function (){ var b="\n//# sourceURL=",k='<script type="text/javascript" src="',l="Done loading all packages, so call the callback in ",p="annotatedtimeline",q="array",r="browserchart",t="callback after loading ",v="complete",w="corechart",x="dygraph",y="function",z="imagechart",A="object",B="text/javascript",C="ui",D="ui_base",E="webfontloader",F="{css_prefix}/{cssFile}",G="{prefix}",H="{prefix}/{version}/third_party/{package}",I="{version}";function J(){return function(){}}var K=K||{};K.global=this;
K.R=function(a){return void 0!==a};K.aa=function(a,c,d){a=a.split(".");d=d||K.global;a[0]in d||!d.execScript||d.execScript("var "+a[0]);for(var e;a.length&&(e=a.shift());)!a.length&&K.R(c)?d[e]=c:d=d[e]?d[e]:d[e]={}};K.rd=function(a,c){K.aa(a,c)};K.C=!0;K.Pc="en";K.Da=!0;K.Eb=!1;K.lb=!K.C;K.Aa=!1;K.le=function(a){if(K.ma())throw Error("goog.provide can not be used within a goog.module.");K.Ga(a)};K.Ga=function(a,c){K.aa(a,c)};K.Ib=/^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
K.qa=function(a){if(!K.w(a)||!a||-1==a.search(K.Ib))throw Error("Invalid module identifier");if(!K.ma())throw Error("Module "+a+" has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
if(K.h.ra)throw Error("goog.module may only be called once per module.");K.h.ra=a};K.qa.get=J();K.qa.zd=J();K.h=null;K.ma=function(){return null!=K.h};K.qa.Z=function(){K.h.Z=!0};K.ve=function(a){if(K.lb)throw a=a||"",Error("Importing test-only code into non-debug environment"+(a?": "+a:"."));};K.vd=J();K.Cd=function(a){a=a.split(".");for(var c=K.global,d;d=a.shift();)if(K.cc(c[d]))c=c[d];else return null;return c};K.Ed=function(a,c){c=c||K.global;for(var d in a)c[d]=a[d]};
K.Uc=function(a,c,d,e){if(K.ya){var f;a=a.replace(/\\/g,"/");var g=K.g;e&&"boolean"!==typeof e||(e=e?{module:"goog"}:{});for(var h=0;f=c[h];h++)g.J[f]=a,g.oa[a]=e;for(e=0;c=d[e];e++)a in g.B||(g.B[a]={}),g.B[a][c]=!0}};K.Je=!1;K.Mc=!0;K.qc=function(a){K.global.console&&K.global.console.error(a)};K.qe=J();K.v="";K.ee=J();K.Tc=function(){throw Error("unimplemented abstract method");};K.Vc=function(a){a.yd=function(){if(a.Pa)return a.Pa;K.C&&(K.Qa[K.Qa.length]=a);return a.Pa=new a}};K.Qa=[];K.tb=!0;
K.Cb=K.C;K.oc={};K.ya=!1;K.Ca="detect";K.Fb="transpile.js";
K.ya&&(K.g={oa:{},J:{},B:{},cb:{},xa:{},N:{}},K.Oa=function(){var a=K.global.document;return null!=a&&"write"in a},K.Wb=function(){if(K.R(K.global.hb))K.v=K.global.hb;else if(K.Oa())for(var a=K.global.document.getElementsByTagName("SCRIPT"),c=a.length-1;0<=c;--c){var d=a[c].src,e=d.lastIndexOf("?"),e=-1==e?d.length:e;if("base.js"==d.substr(e-7,7)){K.v=d.substr(0,e-7);break}}},K.ha=function(a,c){(K.global.Hc||K.Ec)(a,c)&&(K.g.xa[a]=!0)},K.sb=!(K.global.atob||!K.global.document||!K.global.document.all),
K.ac=function(a,c,d){K.ha("",'goog.retrieveAndExec_("'+a+'", '+c+", "+d+");")},K.sa=[],K.Le=function(a,c){return K.tb&&K.R(K.global.JSON)?"goog.loadModule("+K.global.JSON.stringify(c+b+a+"\n")+");":'goog.loadModule(function(exports) {"use strict";'+c+"\n;return exports});\n//# sourceURL="+a+"\n"},K.nc=function(){var a=K.sa.length;if(0<a){var c=K.sa;K.sa=[];for(var d=0;d<a;d++)K.Ua(c[d])}},K.Zd=function(a){K.Ra(a)&&K.Jb(a)&&K.Ua(K.v+K.ga(a))},K.Ra=function(a){var c=(a=K.ga(a))&&K.g.oa[a]||{};return a&&
("goog"==c.module||K.Va(c.lang))?K.v+a in K.g.N:!1},K.Jb=function(a){if((a=K.ga(a))&&a in K.g.B)for(var c in K.g.B[a])if(!K.fc(c)&&!K.Ra(c))return!1;return!0},K.Ua=function(a){if(a in K.g.N){var c=K.g.N[a];delete K.g.N[a];K.$b(c)}},K.Yd=J(),K.Dc=function(a){K.global.document.write(k+a+'">\x3c/script>')},K.Kb=function(a){var c=K.global.document,d=c.createElement("script");d.type=B;d.src=a;d.defer=!1;d.async=!1;c.head.appendChild(d)},K.Ec=function(a,c){if(K.Oa()){var d=K.global.document;if(!K.Aa&&d.readyState==
v){if(/\bdeps.js$/.test(a))return!1;throw Error('Cannot write "'+a+'" after document load');}void 0===c?K.sb?(c=" onreadystatechange='goog.onScriptLoad_(this, "+ ++K.Ta+")' ",d.write(k+a+'"'+c+">\x3c/script>")):K.Aa?K.Kb(a):K.Dc(a):d.write('<script type="text/javascript">'+c+"\x3c/script>");return!0}return!1},K.Va=function(a){if("always"==K.Ca)return!0;if("never"==K.Ca)return!1;if(!K.H){K.H={es5:!0,es6:!0,"es6-impl":!0};try{K.H.es5=eval("[1,].length!=1"),eval('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()')&&
(K.H.es6=!1,K.H["es6-impl"]=!1)}catch(c){}}return!!K.H[a]},K.H=null,K.Ta=0,K.ge=function(a,c){a.readyState==v&&K.Ta==c&&K.nc();return!0},K.Me=function(a){function c(a){if(!(a in f.xa||a in f.cb)){f.cb[a]=!0;if(a in f.B)for(var g in f.B[a])if(!K.fc(g))if(g in f.J)c(f.J[g]);else throw Error("Undefined nameToPath for "+g);a in e||(e[a]=!0,d.push(a))}}var d=[],e={},f=K.g;c(a);for(a=0;a<d.length;a++){var g=d[a];K.g.xa[g]=!0}var h=K.h;K.h=null;for(a=0;a<d.length;a++)if(g=d[a]){var n=f.oa[g]||{},u=K.Va(n.lang);
"goog"==n.module||u?K.ac(K.v+g,"goog"==n.module,u):K.ha(K.v+g)}else throw K.h=h,Error("Undefined script input");K.h=h},K.ga=function(a){return a in K.g.J?K.g.J[a]:null},K.Wb(),K.global.Ic||K.ha(K.v+"deps.js"));
K.Xd=function(a){var c=K.h;try{K.h={ra:void 0,Z:!1};var d;if(K.Sa(a))d=a.call(void 0,{});else if(K.w(a))d=K.jc.call(void 0,a);else throw Error("Invalid module definition");var e=K.h.ra;if(!K.w(e)||!e)throw Error('Invalid module name "'+e+'"');K.h.Z?K.Ga(e,d):K.Cb&&Object.seal&&K.S(d)&&Object.seal(d);K.oc[e]=d}finally{K.h=c}};K.jc=function(a){eval(a);return{}};K.ae=function(a){a=a.split("/");for(var c=0;c<a.length;)"."==a[c]?a.splice(c,1):c&&".."==a[c]&&a[c-1]&&".."!=a[c-1]?a.splice(--c,2):c++;return a.join("/")};
K.ic=function(a){if(K.global.jb)return K.global.jb(a);try{var c=new K.global.XMLHttpRequest;c.open("get",a,!1);c.send();return 0==c.status||200==c.status?c.responseText:null}catch(d){return null}};K.re=J();
K.Ee=function(a,c){var d=K.global.$jscomp;d||(K.global.$jscomp=d={});var e=d.$a;if(!e){var f=K.v+K.Fb,g=K.ic(f);g&&(eval(g+b+f),d=K.global.$jscomp,e=d.$a)}if(!e)var h=" requires transpilation but no transpiler was found.",h=h+' Please add "//javascript/closure:transpiler" as a data dependency to ensure it is included.',e=d.$a=function(a,c){K.qc(c+h);return a};return e(a,c)};
K.m=function(a){var c=typeof a;if(c==A)if(a){if(a instanceof Array)return q;if(a instanceof Object)return c;var d=Object.prototype.toString.call(a);if("[object Window]"==d)return A;if("[object Array]"==d||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return q;if("[object Function]"==d||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return y}else return"null";
else if(c==y&&"undefined"==typeof a.call)return A;return c};K.Rd=function(a){return null===a};K.cc=function(a){return null!=a};K.isArray=function(a){return K.m(a)==q};K.Kd=function(a){var c=K.m(a);return c==q||c==A&&"number"==typeof a.length};K.Md=function(a){return K.S(a)&&typeof a.getFullYear==y};K.w=function(a){return"string"==typeof a};K.bc=function(a){return"boolean"==typeof a};K.ec=function(a){return"number"==typeof a};K.Sa=function(a){return K.m(a)==y};
K.S=function(a){var c=typeof a;return c==A&&null!=a||c==y};K.Zb=function(a){return a[K.A]||(a[K.A]=++K.Ac)};K.Fd=function(a){return!!a[K.A]};K.vc=function(a){null!==a&&"removeAttribute"in a&&a.removeAttribute(K.A);try{delete a[K.A]}catch(c){}};K.A="closure_uid_"+(1E9*Math.random()>>>0);K.Ac=0;K.xd=K.Zb;K.pe=K.vc;K.Pb=function(a){var c=K.m(a);if(c==A||c==q){if(a.clone)return a.clone();var c=c==q?[]:{},d;for(d in a)c[d]=K.Pb(a[d]);return c}return a};K.Nb=function(a,c,d){return a.call.apply(a.bind,arguments)};
K.Mb=function(a,c,d){if(!a)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var d=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(d,e);return a.apply(c,d)}}return function(){return a.apply(c,arguments)}};K.bind=function(a,c,d){K.bind=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?K.Nb:K.Mb;return K.bind.apply(null,arguments)};
K.je=function(a,c){var d=Array.prototype.slice.call(arguments,1);return function(){var c=d.slice();c.push.apply(c,arguments);return a.apply(this,c)}};K.$d=function(a,c){for(var d in c)a[d]=c[d]};K.now=K.Da&&Date.now||function(){return+new Date};
K.$b=function(a){if(K.global.execScript)K.global.execScript(a,"JavaScript");else if(K.global.eval){if(null==K.O)if(K.global.eval("var _evalTest_ = 1;"),"undefined"!=typeof K.global._evalTest_){try{delete K.global._evalTest_}catch(e){}K.O=!0}else K.O=!1;if(K.O)K.global.eval(a);else{var c=K.global.document,d=c.createElement("SCRIPT");d.type=B;d.defer=!1;d.appendChild(c.createTextNode(a));c.body.appendChild(d);c.body.removeChild(d)}}else throw Error("goog.globalEval not available");};K.O=null;
K.wd=function(a,c){function d(a){a=a.split("-");for(var c=[],d=0;d<a.length;d++)c.push(e(a[d]));return c.join("-")}function e(a){return K.Ha[a]||a}if("."==String(a).charAt(0))throw Error('className passed in goog.getCssName must not start with ".". You passed: '+a);var f;f=K.Ha?"BY_WHOLE"==K.Tb?e:d:function(a){return a};a=c?a+"-"+f(c):f(a);return K.global.ib?K.global.ib(a):a};K.se=function(a,c){K.Ha=a;K.Tb=c};
K.Ad=function(a,c){c&&(a=a.replace(/\{\$([^}]+)}/g,function(a,e){return null!=c&&e in c?c[e]:a}));return a};K.Bd=function(a){return a};K.s=function(a,c){K.aa(a,c,void 0)};K.ud=function(a,c,d){a[c]=d};K.ia=function(a,c){function d(){}d.prototype=c.prototype;a.V=c.prototype;a.prototype=new d;a.prototype.constructor=a;a.Lb=function(a,d,g){for(var e=Array(arguments.length-2),f=2;f<arguments.length;f++)e[f-2]=arguments[f];return c.prototype[d].apply(a,e)}};
K.Lb=function(a,c,d){var e=arguments.callee.caller;if(K.Eb||K.C&&!e)throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");if(e.V){for(var f=Array(arguments.length-1),g=1;g<arguments.length;g++)f[g-1]=arguments[g];return e.V.constructor.apply(a,f)}f=Array(arguments.length-2);for(g=2;g<arguments.length;g++)f[g-2]=arguments[g];for(var g=!1,h=a.constructor;h;h=h.V&&h.V.constructor)if(h.prototype[c]===e)g=
!0;else if(g)return h.prototype[c].apply(a,f);if(a[c]===e)return a.constructor.prototype[c].apply(a,f);throw Error("goog.base called from a method of one name to a method of a different name");};K.scope=function(a){if(K.ma())throw Error("goog.scope is not supported within a goog.module.");a.call(K.global)};
K.j=function(a,c){var d=c.constructor,e=c.yc;d&&d!=Object.prototype.constructor||(d=function(){throw Error("cannot instantiate an interface (no constructor defined).");});d=K.j.Qb(d,a);a&&K.ia(d,a);delete c.constructor;delete c.yc;K.j.Ea(d.prototype,c);null!=e&&(e instanceof Function?e(d):K.j.Ea(d,e));return d};K.j.Bb=K.C;
K.j.Qb=function(a,c){function d(){var c=a.apply(this,arguments)||this;c[K.A]=c[K.A];this.constructor===d&&e&&Object.seal instanceof Function&&Object.seal(c);return c}if(!K.j.Bb)return a;var e=!K.j.gc(c);return d};K.j.gc=function(a){return a&&a.prototype&&a.prototype[K.Gb]};K.j.Ba="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
K.j.Ea=function(a,c){for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);for(var e=0;e<K.j.Ba.length;e++)d=K.j.Ba[e],Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])};K.ze=J();K.Gb="goog_defineClass_legacy_unsealable";var google={a:{}};google.a.b={};
google.a.b.o={va:{gstatic:{prefix:"/static/charts",debug:"{prefix}/debug/{version}/js/jsapi_debug_{package}_module.js",debug_i18n:"{prefix}/debug/{version}/i18n/jsapi_debug_i18n_{package}_module__{language}.js",compiled:"{prefix}/{version}/js/jsapi_compiled_{package}_module.js",compiled_i18n:"{prefix}/{version}/i18n/jsapi_compiled_i18n_{package}_module__{language}.js",css_prefix:"{prefix}/{version}/css",css:F,css_debug:F,third_party:H,third_party_gen:H}},Ub:["default"],Vb:{format:[],
"default":["format"],ui:["default"],ui_base:["default"],flashui:[C],fw:[C],annotatedtimeline:["annotationchart"],annotationchart:[C,"controls",w,"table"],areachart:[C,r],bar:["fw",x,E],barchart:[C,r],browserchart:[C],calendar:["fw"],charteditor:[C,w,z,p,"gauge","motionchart","orgchart","table"],charteditor_base:[D,w,z,p,"gauge","motionchart","orgchart","table_base"],columnchart:[C,r],controls:[C],controls_base:[D],corechart:[C],gantt:["fw",x],gauge:[C],geochart:[C],geomap:["flashui"],geomap_base:[D],
helloworld:["fw"],imageareachart:[C,z],imagebarchart:[C,z],imagelinechart:[C,z],imagechart:[C],imagepiechart:[C,z],imagesparkline:[C,z],intensitymap:[C],line:["fw",x,E],linechart:[C,r],map:[C],motionchart:["flashui"],orgchart:[C],overtimecharts:[C,w],piechart:[C,r],sankey:["fw","d3","d3.sankey"],scatter:["fw",x,E],scatterchart:[C,r],table:[C],table_base:[D],timeline:["fw",C,x],treemap:[C],wordtree:[C]},Za:{d3:"d3/v3/d3.js","d3.sankey":"d3_sankey/d3.sankey.js",webfontloader:"webfontloader/webfont.js"},
Ya:{dygraph:"dygraphs/dygraph-tickers-combined.js"},Rb:{annotatedtimeline:"annotatedtimeline/annotatedtimeline.css",annotationchart:"annotationchart/annotationchart.css",charteditor:"charteditor/charteditor.css",charteditor_base:"charteditor/charteditor_base.css",controls:"controls/controls.css",imagesparkline:"imagechart/imagesparkline.css",intensitymap:"intensitymap/intensitymap.css",orgchart:"orgchart/orgchart.css",table:["util/format.css","table/table.css"],table_base:"table/table_base.css",ui:["util/util.css",
"core/tooltip.css"],ui_base:"util/util_base.css"}};google.a.b.vb={af:!0,am:!0,az:!0,ar:!0,arb:"ar",bg:!0,bn:!0,ca:!0,cs:!0,cmn:"zh",da:!0,de:!0,el:!0,en:!0,en_gb:!0,es:!0,es_419:!0,et:!0,eu:!0,fa:!0,fi:!0,fil:!0,fr:!0,fr_ca:!0,gl:!0,ka:!0,gu:!0,he:"iw",hi:!0,hr:!0,hu:!0,hy:!0,id:!0,"in":"id",is:!0,it:!0,iw:!0,ja:!0,ji:"yi",jv:!1,jw:"jv",km:!0,kn:!0,ko:!0,lo:!0,lt:!0,lv:!0,ml:!0,mn:!0,mo:"ro",mr:!0,ms:!0,nb:"no",ne:!0,nl:!0,no:!0,pl:!0,pt:"pt_br",pt_br:!0,pt_pt:!0,ro:!0,ru:!0,si:!0,sk:!0,sl:!0,sr:!0,sv:!0,sw:!0,swh:"sw",ta:!0,te:!0,th:!0,tl:"fil",
tr:!0,uk:!0,ur:!0,vi:!0,yi:!1,zh:"zh_cn",zh_cn:!0,zh_hk:!0,zh_tw:!0,zsm:"ms",zu:!0};google.a.b.D={};google.a.b.D.count=0;
google.a.b.D.Sb=function(a){function c(){g=!0;for(var a=e.length,c=0;c<a;c++)e[c]()}function d(){h=!0;for(var a=f.length,c=0;c<a;c++)f[c]()}var e=[],f=[],g=!1,h=!1,n="load-css-"+google.a.b.D.count++,u={done:function(a){e.push(a);g&&a();return u},ba:function(a){f.push(a);h&&a();return u}},m=document.createElement("link");m.setAttribute("id",n);m.setAttribute("rel","stylesheet");m.setAttribute("type","text/css");"undefined"!==typeof m.addEventListener?(m.addEventListener("load",c,!1),m.addEventListener("error",
d,!1)):"undefined"!==typeof m.attachEvent&&m.attachEvent("onload",function(){var a,e=document.styleSheets.length;try{for(;e--;)if(a=document.styleSheets[e],a.id===n){c();return}}catch(M){}g||d()});try{document.getElementsByTagName("head")[0].appendChild(m),m.setAttribute("href",a)}catch(L){c()}return u};google.a.b.D.load=function(a,c){c=c||J();google.a.b.D.Sb(a).done(c).ba(J())};google.a.b.M={};google.a.b.M.wc=function(a,c){if(c)if("undefined"===typeof a.onload){var d=!1;a.onreadystatechange=function(){if(!d)if(a.readyState&&a.readyState!==v)a.onreadystatechange();else d=!0,delete a.onreadystatechange,c()}}else a.onload=c};
google.a.b.M.load=function(a,c,d){if(null==a)throw Error("no url to load");var e=c.createElement("script");e.type=B;e.language="javascript";e.async=!1;e.defer=!1;c=c.body||c.head||c.getElementsByTagName("HEAD").item(0)||c.documentElement;c.insertBefore(e,c.lastChild);d&&google.a.b.M.wc(e,d);e.src=a};google.a.b.wb="/static/charts/loader.js";google.a.b.F={};google.a.b.G="unknown";google.a.b.log=J();google.a.b.error=J();google.a.b.P=!1;google.a.b.na=!1;google.a.b.window=window;google.a.b.Ia=window.document;google.a.b.i=google.a.b.o.va.gstatic;google.a.b.Y=function(a,c){c=c||{};for(var d=[],e=0;e<a.length;e++){var f=a[e];if(!c[f]){c[f]=!0;var g=google.a.b.o.Vb[f]||[];0<g.length&&(d=d.concat(google.a.b.Y(g,c)));d.push(f)}}return d};
google.a.b.Yb=function(a){for(var c={},d=[],e=0;e<a.length;e++){var f=google.a.b.o.Rb[a[e]];K.isArray(f)||(f=[f]);for(var g=0;g<f.length;g++){var h=f[g];h&&!c[h]&&(c[h]=!0,d.push(h))}}return d};google.a.b.La=function(a){for(var c=[],d=0;d<a.length;d++){var e=a[d];google.a.b.F[e]||c.push(e)}return c};google.a.b.lc=function(a,c){a=google.a.b.La(google.a.b.Y(a));google.a.b.log("Load packages + dependencies - previous: "+a);google.a.b.mc(a,c)};
google.a.b.mc=function(a,c){function d(f){var g=a[f++];g&&(google.a.b.kc(g,function(a){return function(){google.a.b.log(t+a);google.a.b.F[a]=!0;e--;0>=e&&(google.a.b.log(l+document.location.href),google.a.b.window.setTimeout(c,0))}}(g)),d(f))}0===a.length&&c();var e=a.length;d(0)};
google.a.b.kc=function(a,c){var d=google.a.b.Ia;google.a.b.o.Za[a]&&a===E&&(d=window.document);var e=google.a.b.tc(a);google.a.b.log("Loading "+e);google.a.b.M.load(e,d,function(){google.a.b.log(t+a);c&&c()});google.a.b.log("End Loading "+e)};
google.a.b.tc=function(a){var c=a,d=google.a.b.o.Za[a];d?(c=d,a=google.a.b.i.third_party):google.a.b.o.Ya[a]?(c=google.a.b.o.Ya[a],a=google.a.b.i.third_party_gen):a=google.a.b.i[(google.a.b.P?"debug":google.a.b.na?"pseudo":"compiled")+(google.a.b.U?"_i18n":"")];return a.replace(G,google.a.b.i.prefix).replace(I,google.a.b.G).replace("{language}",google.a.b.U).replace("{package}",c)};
google.a.b.hc=function(a,c){a=google.a.b.Y(a);var d=google.a.b.Yb(a),d=google.a.b.La(d);if(null===d||0===d.length)c();else{google.a.b.log("Loading css files: "+d);var e=d.length,f=function(a){google.a.b.log(t+a);google.a.b.F[a]=!0;e--;0>=e&&(google.a.b.log(l+document.location.href),google.a.b.window.setTimeout(c,0))},g=google.a.b.i.css;google.a.b.P&&(google.a.b.log("Use debug css template"),g=google.a.b.i.css_debug||g);var h=function(a){var c=d[a++];if(c)if(google.a.b.log("continueLoading css "+c),
google.a.b.F[c])google.a.b.log("Already loaded "+c),f(c);else{google.a.b.F[c]=!0;var e=g.replace("{css_prefix}",google.a.b.i.css_prefix).replace(G,google.a.b.i.prefix).replace(I,google.a.b.G).replace("{cssFile}",c);google.a.b.log("Begin load css "+c);google.a.b.D.load(e,function(a){return function(){f(a)}}(c));google.a.b.log("End load css "+c);h(a)}};h(0)}};
google.a.b.Wa=function(a){for(var c=a.replace(/-/g,"_").toLowerCase();K.w(c);)a=c,c=google.a.b.vb[c],c===a&&(c=!1);c||(a.match(/_[^_]+$/)?(a=a.replace(/_[^_]+$/,""),a=google.a.b.Wa(a)):a="en");return a};
google.a.b.uc=function(a,c,d){c.log&&(google.a.b.log=c.log);c.error&&(google.a.b.error=c.error);var e=c.debug||!1,f=c.pseudo||!1,g=c.language||"",g=google.a.b.Wa(g);a||(a=c.version||"unknown");if(google.a.b.G&&google.a.b.G!==a||google.a.b.U&&google.a.b.U!==g||google.a.b.P!==e||google.a.b.na!==f)google.a.b.F={};"en"===g&&(g="");google.a.b.G=a;google.a.b.U=g;google.a.b.P=e;google.a.b.na=f;google.a.b.i=d||google.a.b.pc||google.a.b.o.va[a]||google.a.b.o.va.gstatic;google.a.b.pc=google.a.b.i;K.s("google.visualization.ModulePath",
google.a.b.i.prefix);K.s("google.visualization.CssPath",google.a.b.i.css_prefix.replace(G,google.a.b.i.prefix).replace(I,google.a.b.G));K.s("google.visualization.LoaderPath",google.a.b.wb);K.s("google.visualization.Version",a);K.s("google.visualization.Locale",g);K.s("google.visualization.isDebug",e);K.s("google.visualization.isPseudo",f);K.s("google.visualization.mapsApiKey",c.mapsApiKey)};google.a.b.I=!1;
google.a.b.load=function(a,c,d){if(google.a.b.I)google.a.b.K(function(){google.a.b.load(a,c,d)});else{google.a.b.I=!0;var e=function(){google.a.b.I=!1;google.a.b.log("afterLoading "+c.packages+" for "+document.location.href);google.a.b.pa()};google.a.b.log("google.charts.load version "+a);google.a.b.uc(a,c,d);google.a.b.window=window;google.a.b.Ia=document;var f=c.packages;f&&0!==f.length||(f=google.a.b.o.Ub);google.a.b.K(c.callback);google.a.b.log("Now begin loading css and js for "+document.location.href);
google.a.b.hc(f,function(){google.a.b.lc(f,e)})}};google.a.b.xc=function(a){if(window.addEventListener)window.addEventListener("load",a,!1);else if(window.attachEvent)window.attachEvent("onload",a);else{var c=window.onload;window.onload=function(d){c&&c(d);a()}}};google.a.b.eb=document&&document.readyState===v;google.a.b.xc(function(){google.a.b.eb=!0;google.a.b.log("window loaded");google.a.b.pa()});google.a.b.pa=function(){!google.a.b.I&&google.a.b.eb&&google.a.b.Ob()};google.a.b.ea=[];
google.a.b.K=function(a){a&&google.a.b.ea.push(a);google.a.b.I||(google.a.b.log("onload and not loading"),google.a.b.pa())};google.a.b.Ob=function(){var a=google.a.b.ea;google.a.b.ea=[];for(google.a.b.log("Now call all callbacks for "+document.location.href);0<a.length;)a.shift()()};K.debug={};K.debug.Error=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,K.debug.Error);else{var c=Error().stack;c&&(this.stack=c)}a&&(this.message=String(a))};K.ia(K.debug.Error,Error);K.debug.Error.prototype.name="CustomError";K.Ja={};K.Ja.zb={mb:1,Fc:2,Sc:3,Gc:4,Oc:5,Nc:6,Rc:7,Jc:8,DOCUMENT:9,Lc:10,Kc:11,Qc:12};K.c={};K.c.za=!1;K.c.pb=!1;K.c.Hb={xb:"\u00a0"};K.c.startsWith=function(a,c){return 0==a.lastIndexOf(c,0)};K.c.endsWith=function(a,c){var d=a.length-c.length;return 0<=d&&a.indexOf(c,d)==d};K.c.ld=function(a,c){return 0==K.c.Fa(c,a.substr(0,c.length))};K.c.jd=function(a,c){return 0==K.c.Fa(c,a.substr(a.length-c.length,c.length))};K.c.kd=function(a,c){return a.toLowerCase()==c.toLowerCase()};
K.c.zc=function(a,c){for(var d=a.split("%s"),e="",f=Array.prototype.slice.call(arguments,1);f.length&&1<d.length;)e+=d.shift()+f.shift();return e+d.join("%s")};K.c.nd=function(a){return a.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")};K.c.la=function(a){return/^[\s\xa0]*$/.test(a)};K.c.Pd=function(a){return 0==a.length};K.c.Nd=K.c.la;K.c.dc=function(a){return K.c.la(K.c.rc(a))};K.c.Od=K.c.dc;K.c.Ld=function(a){return!/[^\t\n\r ]/.test(a)};K.c.Id=function(a){return!/[^a-zA-Z]/.test(a)};
K.c.Sd=function(a){return!/[^0-9]/.test(a)};K.c.Jd=function(a){return!/[^a-zA-Z0-9]/.test(a)};K.c.Td=function(a){return" "==a};K.c.Ud=function(a){return 1==a.length&&" "<=a&&"~">=a||"\u0080"<=a&&"\ufffd">=a};K.c.xe=function(a){return a.replace(/(\r\n|\r|\n)+/g," ")};K.c.fd=function(a){return a.replace(/(\r\n|\r|\n)/g,"\n")};K.c.ce=function(a){return a.replace(/\xa0|\s/g," ")};K.c.be=function(a){return a.replace(/\xa0|[ \t]+/g," ")};
K.c.md=function(a){return a.replace(/[\t\r\n ]+/g," ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g,"")};K.c.trim=K.Da&&String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};K.c.trimLeft=function(a){return a.replace(/^[\s\xa0]+/,"")};K.c.trimRight=function(a){return a.replace(/[\s\xa0]+$/,"")};K.c.Fa=function(a,c){a=String(a).toLowerCase();c=String(c).toLowerCase();return a<c?-1:a==c?0:1};
K.c.Xa=function(a,c,d){if(a==c)return 0;if(!a)return-1;if(!c)return 1;for(var e=a.toLowerCase().match(d),f=c.toLowerCase().match(d),g=Math.min(e.length,f.length),h=0;h<g;h++){d=e[h];var n=f[h];if(d!=n)return a=parseInt(d,10),!isNaN(a)&&(c=parseInt(n,10),!isNaN(c)&&a-c)?a-c:d<n?-1:1}return e.length!=f.length?e.length-f.length:a<c?-1:1};K.c.Hd=function(a,c){return K.c.Xa(a,c,/\d+|\D+/g)};K.c.Xb=function(a,c){return K.c.Xa(a,c,/\d+|\.\d+|\D+/g)};K.c.fe=K.c.Xb;K.c.Ie=function(a){return encodeURIComponent(String(a))};
K.c.He=function(a){return decodeURIComponent(a.replace(/\+/g," "))};K.c.sc=function(a,c){return a.replace(/(\r\n|\r|\n)/g,c?"<br />":"<br>")};
K.c.Na=function(a){if(!K.c.fb.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(K.c.gb,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(K.c.ub,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(K.c.qb,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(K.c.Ab,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(K.c.Db,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(K.c.yb,"&#0;"));K.c.za&&-1!=a.indexOf("e")&&(a=a.replace(K.c.ob,"&#101;"));return a};K.c.gb=/&/g;K.c.ub=/</g;K.c.qb=/>/g;K.c.Ab=/"/g;K.c.Db=/'/g;K.c.yb=/\x00/g;K.c.ob=/e/g;
K.c.fb=K.c.za?/[\x00&<>"'e]/:/[\x00&<>"']/;K.c.ab=function(a){return K.c.contains(a,"&")?!K.c.pb&&"document"in K.global?K.c.bb(a):K.c.Bc(a):a};K.c.Ge=function(a,c){return K.c.contains(a,"&")?K.c.bb(a,c):a};
K.c.bb=function(a,c){var d={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"'},e;e=c?c.createElement("div"):K.global.document.createElement("div");return a.replace(K.c.rb,function(a,c){var f=d[a];if(f)return f;"#"==c.charAt(0)&&(c=Number("0"+c.substr(1)),isNaN(c)||(f=String.fromCharCode(c)));f||(e.innerHTML=a+" ",f=e.firstChild.nodeValue.slice(0,-1));return d[a]=f})};
K.c.Bc=function(a){return a.replace(/&([^;]+);/g,function(a,d){switch(d){case "amp":return"&";case "lt":return"<";case "gt":return">";case "quot":return'"';default:return"#"!=d.charAt(0)||(d=Number("0"+d.substr(1)),isNaN(d))?a:String.fromCharCode(d)}})};K.c.rb=/&([^;\s<&]+);?/g;K.c.Ke=function(a,c){return K.c.sc(a.replace(/  /g," &#160;"),c)};K.c.ke=function(a){return a.replace(/(^|[\n ]) /g,"$1"+K.c.Hb.xb)};
K.c.ye=function(a,c){for(var d=c.length,e=0;e<d;e++){var f=1==d?c:c.charAt(e);if(a.charAt(0)==f&&a.charAt(a.length-1)==f)return a.substring(1,a.length-1)}return a};K.c.truncate=function(a,c,d){d&&(a=K.c.ab(a));a.length>c&&(a=a.substring(0,c-3)+"...");d&&(a=K.c.Na(a));return a};K.c.Fe=function(a,c,d,e){d&&(a=K.c.ab(a));e&&a.length>c?(e>c&&(e=c),a=a.substring(0,c-e)+"..."+a.substring(a.length-e)):a.length>c&&(e=Math.floor(c/2),a=a.substring(0,e+c%2)+"..."+a.substring(a.length-e));d&&(a=K.c.Na(a));return a};
K.c.wa={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\","<":"<"};K.c.T={"'":"\\'"};K.c.quote=function(a){a=String(a);for(var c=['"'],d=0;d<a.length;d++){var e=a.charAt(d),f=e.charCodeAt(0);c[d+1]=K.c.wa[e]||(31<f&&127>f?e:K.c.Ka(e))}c.push('"');return c.join("")};K.c.td=function(a){for(var c=[],d=0;d<a.length;d++)c[d]=K.c.Ka(a.charAt(d));return c.join("")};
K.c.Ka=function(a){if(a in K.c.T)return K.c.T[a];if(a in K.c.wa)return K.c.T[a]=K.c.wa[a];var c,d=a.charCodeAt(0);if(31<d&&127>d)c=a;else{if(256>d){if(c="\\x",16>d||256<d)c+="0"}else c="\\u",4096>d&&(c+="0");c+=d.toString(16).toUpperCase()}return K.c.T[a]=c};K.c.contains=function(a,c){return-1!=a.indexOf(c)};K.c.hd=function(a,c){return K.c.contains(a.toLowerCase(),c.toLowerCase())};K.c.pd=function(a,c){return a&&c?a.split(c).length-1:0};
K.c.oe=function(a,c,d){var e=a;0<=c&&c<a.length&&0<d&&(e=a.substr(0,c)+a.substr(c+d,a.length-c-d));return e};K.c.remove=function(a,c){c=new RegExp(K.c.ua(c),"");return a.replace(c,"")};K.c.me=function(a,c){c=new RegExp(K.c.ua(c),"g");return a.replace(c,"")};K.c.ua=function(a){return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")};K.c.repeat=String.prototype.repeat?function(a,c){return a.repeat(c)}:function(a,c){return Array(c+1).join(a)};
K.c.ie=function(a,c,d){a=K.R(d)?a.toFixed(d):String(a);d=a.indexOf(".");-1==d&&(d=a.length);return K.c.repeat("0",Math.max(0,c-d))+a};K.c.rc=function(a){return null==a?"":String(a)};K.c.ed=function(a){return Array.prototype.join.call(arguments,"")};K.c.Dd=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^K.now()).toString(36)};
K.c.od=function(a,c){var d=0;a=K.c.trim(String(a)).split(".");c=K.c.trim(String(c)).split(".");for(var e=Math.max(a.length,c.length),f=0;0==d&&f<e;f++){var g=a[f]||"",h=c[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==g[0].length&&0==h[0].length)break;d=K.c.X(0==g[1].length?0:parseInt(g[1],10),0==h[1].length?0:parseInt(h[1],10))||K.c.X(0==g[2].length,0==h[2].length)||K.c.X(g[2],h[2]);g=g[3];h=h[3]}while(0==d)}return d};
K.c.X=function(a,c){return a<c?-1:a>c?1:0};K.c.Gd=function(a){for(var c=0,d=0;d<a.length;++d)c=31*c+a.charCodeAt(d)>>>0;return c};K.c.Cc=2147483648*Math.random()|0;K.c.qd=function(){return"goog_"+K.c.Cc++};K.c.Be=function(a){var c=Number(a);return 0==c&&K.c.la(a)?NaN:c};K.c.Qd=function(a){return/^[a-z]+([A-Z][a-z]*)*$/.test(a)};K.c.Vd=function(a){return/^([A-Z][a-z]*)+$/.test(a)};K.c.Ae=function(a){return String(a).replace(/\-([a-z])/g,function(a,d){return d.toUpperCase()})};
K.c.Ce=function(a){return String(a).replace(/([A-Z])/g,"-$1").toLowerCase()};K.c.De=function(a,c){c=K.w(c)?K.c.ua(c):"\\s";return a.replace(new RegExp("(^"+(c?"|["+c+"]+":"")+")([a-z])","g"),function(a,c,f){return c+f.toUpperCase()})};K.c.gd=function(a){return String(a.charAt(0)).toUpperCase()+String(a.substr(1)).toLowerCase()};K.c.parseInt=function(a){isFinite(a)&&(a=String(a));return K.w(a)?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN};
K.c.we=function(a,c,d){a=a.split(c);for(var e=[];0<d&&a.length;)e.push(a.shift()),d--;a.length&&e.push(a.join(c));return e};K.c.Wd=function(a,c){if(c)"string"==typeof c&&(c=[c]);else return a;for(var d=-1,e=0;e<c.length;e++)if(""!=c[e]){var f=a.lastIndexOf(c[e]);f>d&&(d=f)}return-1==d?a:a.slice(d+1)};
K.c.sd=function(a,c){var d=[],e=[];if(a==c)return 0;if(!a.length||!c.length)return Math.max(a.length,c.length);for(var f=0;f<c.length+1;f++)d[f]=f;for(f=0;f<a.length;f++){e[0]=f+1;for(var g=0;g<c.length;g++)e[g+1]=Math.min(e[g]+1,d[g+1]+1,d[g]+Number(a[f]!=c[g]));for(g=0;g<d.length;g++)d[g]=e[g]}return e[c.length]};K.f={};K.f.l=K.C;K.f.L=function(a,c){c.unshift(a);K.debug.Error.call(this,K.c.zc.apply(null,c));c.shift()};K.ia(K.f.L,K.debug.Error);K.f.L.prototype.name="AssertionError";K.f.kb=function(a){throw a;};K.f.$=K.f.kb;K.f.u=function(a,c,d,e){var f="Assertion failed";if(d)var f=f+(": "+d),g=e;else a&&(f+=": "+a,g=c);a=new K.f.L(""+f,g||[]);K.f.$(a)};K.f.ue=function(a){K.f.l&&(K.f.$=a)};K.f.assert=function(a,c,d){K.f.l&&!a&&K.f.u("",null,c,Array.prototype.slice.call(arguments,2));return a};
K.f.ba=function(a,c){K.f.l&&K.f.$(new K.f.L("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1)))};K.f.ad=function(a,c,d){K.f.l&&!K.ec(a)&&K.f.u("Expected number but got %s: %s.",[K.m(a),a],c,Array.prototype.slice.call(arguments,2));return a};K.f.dd=function(a,c,d){K.f.l&&!K.w(a)&&K.f.u("Expected string but got %s: %s.",[K.m(a),a],c,Array.prototype.slice.call(arguments,2));return a};
K.f.Zc=function(a,c,d){K.f.l&&!K.Sa(a)&&K.f.u("Expected function but got %s: %s.",[K.m(a),a],c,Array.prototype.slice.call(arguments,2));return a};K.f.bd=function(a,c,d){K.f.l&&!K.S(a)&&K.f.u("Expected object but got %s: %s.",[K.m(a),a],c,Array.prototype.slice.call(arguments,2));return a};K.f.Wc=function(a,c,d){K.f.l&&!K.isArray(a)&&K.f.u("Expected array but got %s: %s.",[K.m(a),a],c,Array.prototype.slice.call(arguments,2));return a};
K.f.Xc=function(a,c,d){K.f.l&&!K.bc(a)&&K.f.u("Expected boolean but got %s: %s.",[K.m(a),a],c,Array.prototype.slice.call(arguments,2));return a};K.f.Yc=function(a,c,d){!K.f.l||K.S(a)&&a.nodeType==K.Ja.zb.mb||K.f.u("Expected Element but got %s: %s.",[K.m(a),a],c,Array.prototype.slice.call(arguments,2));return a};K.f.$c=function(a,c,d,e){!K.f.l||a instanceof c||K.f.u("Expected instanceof %s but got %s.",[K.f.Ma(c),K.f.Ma(a)],d,Array.prototype.slice.call(arguments,3));return a};
K.f.cd=function(){for(var a in Object.prototype)K.f.ba(a+" should not be enumerable in Object.prototype.")};K.f.Ma=function(a){return a instanceof Function?a.displayName||a.name||"unknown type name":a instanceof Object?a.constructor.displayName||a.constructor.name||Object.prototype.toString.call(a):null===a?"null":typeof a};google.a.W={};google.a.W.load=function(){var a=0;"visualization"===arguments[a]&&a++;var c="local";K.w(arguments[a])&&(c=arguments[a],a++);var d={};arguments.length>a&&(d=arguments[a],a++);var e=void 0;arguments.length>a&&(e=arguments[a]);google.a.b.load(c,d,e)};google.a.W.K=function(a){google.a.b.K(a)};K.s("google.charts.versionSpecific.load",google.a.W.load);K.s("google.charts.versionSpecific.setOnLoadCallback",google.a.W.K); })();
