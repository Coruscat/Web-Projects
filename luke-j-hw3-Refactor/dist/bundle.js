/*! For license information please see bundle.js.LICENSE.txt */
(()=>{function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){"use strict";e=function(){return n};var r,n={},o=Object.prototype,i=o.hasOwnProperty,c=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},u=a.iterator||"@@iterator",s=a.asyncIterator||"@@asyncIterator",l=a.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(r){f=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var o=e&&e.prototype instanceof w?e:w,i=Object.create(o.prototype),a=new T(n||[]);return c(i,"_invoke",{value:_(t,r,a)}),i}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}n.wrap=h;var y="suspendedStart",d="suspendedYield",g="executing",v="completed",m={};function w(){}function b(){}function S(){}var x={};f(x,u,(function(){return this}));var L=Object.getPrototypeOf,E=L&&L(L(N([])));E&&E!==o&&i.call(E,u)&&(x=E);var k=S.prototype=w.prototype=Object.create(x);function q(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function j(e,r){function n(o,c,a,u){var s=p(e[o],e,c);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==t(f)&&i.call(f,"__await")?r.resolve(f.__await).then((function(t){n("next",t,a,u)}),(function(t){n("throw",t,a,u)})):r.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,u)}))}u(s.arg)}var o;c(this,"_invoke",{value:function(t,e){function i(){return new r((function(r,o){n(t,e,r,o)}))}return o=o?o.then(i,i):i()}})}function _(t,e,n){var o=y;return function(i,c){if(o===g)throw Error("Generator is already running");if(o===v){if("throw"===i)throw c;return{value:r,done:!0}}for(n.method=i,n.arg=c;;){var a=n.delegate;if(a){var u=O(a,n);if(u){if(u===m)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===y)throw o=v,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=g;var s=p(t,e,n);if("normal"===s.type){if(o=n.done?v:d,s.arg===m)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(o=v,n.method="throw",n.arg=s.arg)}}}function O(t,e){var n=e.method,o=t.iterator[n];if(o===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=r,O(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var i=p(o,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,m;var c=i.arg;return c?c.done?(e[t.resultName]=c.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,m):c:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,m)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function I(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function N(e){if(e||""===e){var n=e[u];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,c=function t(){for(;++o<e.length;)if(i.call(e,o))return t.value=e[o],t.done=!1,t;return t.value=r,t.done=!0,t};return c.next=c}}throw new TypeError(t(e)+" is not iterable")}return b.prototype=S,c(k,"constructor",{value:S,configurable:!0}),c(S,"constructor",{value:b,configurable:!0}),b.displayName=f(S,l,"GeneratorFunction"),n.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,S):(t.__proto__=S,f(t,l,"GeneratorFunction")),t.prototype=Object.create(k),t},n.awrap=function(t){return{__await:t}},q(j.prototype),f(j.prototype,s,(function(){return this})),n.AsyncIterator=j,n.async=function(t,e,r,o,i){void 0===i&&(i=Promise);var c=new j(h(t,e,r,o),i);return n.isGeneratorFunction(e)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},q(k),f(k,l,"Generator"),f(k,u,(function(){return this})),f(k,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},n.values=N,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(I),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,o){return a.type="throw",a.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var c=this.tryEntries[o],a=c.completion;if("root"===c.tryLoc)return n("end");if(c.tryLoc<=this.prev){var u=i.call(c,"catchLoc"),s=i.call(c,"finallyLoc");if(u&&s){if(this.prev<c.catchLoc)return n(c.catchLoc,!0);if(this.prev<c.finallyLoc)return n(c.finallyLoc)}else if(u){if(this.prev<c.catchLoc)return n(c.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<c.finallyLoc)return n(c.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=t,c.arg=e,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),I(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;I(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:N(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),m}},n}function r(t,e,r,n,o,i,c){try{var a=t[i](c),u=a.value}catch(t){return void r(t)}a.done?e(u):Promise.resolve(u).then(n,o)}function n(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var c=t.apply(e,n);function a(t){r(c,o,i,a,u,"next",t)}function u(t){r(c,o,i,a,u,"throw",t)}a(void 0)}))}}var o="jml6049",i=o+"lastsearch",c=o+"airingPref",a=o+"sortPref",u=o+"resultsPref",s=localStorage.getItem(i),l=localStorage.getItem(c),f=localStorage.getItem(a),h=localStorage.getItem(u),p=[];function y(){return d.apply(this,arguments)}function d(){return(d=n(e().mark((function t(){var r,n;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return document.querySelector("#searchbox").classList.add("is-loading"),console.log(document.querySelector("#searchbox").classList),localStorage.setItem(i,document.querySelector("#searchbox").value),document.querySelector("#results").innerHTML="",p=[],r="https://api.jikan.moe/v4/anime?q=",n=document.querySelector("#searchbox").value,n=encodeURIComponent(n),console.log(n),r+=n,t.next=13,fetch(r).then((function(t){return t.json()}));case 13:g(t.sent);case 15:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function g(t){return v.apply(this,arguments)}function v(){return(v=n(e().mark((function t(r){var n,o,i;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=r.data,console.log(o),n=o[0].mal_id,i="https://api.jikan.moe/v4/anime/".concat(n,"/recommendations"),console.log(n),t.next=7,fetch(i).then((function(t){return t.json()})).then(m);case 7:t.sent;case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function m(t){return w.apply(this,arguments)}function w(){return(w=n(e().mark((function t(r){var n,o,i,c,a,u;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=r.data,o="",console.log(n),i=document.querySelector("#resultsLength").value,console.log(i),0==n.length&&(o="<p>There are no recommendations for this title</p><br>",document.querySelector("#results").innerHTML+=o),n.length<i&&(i=n.length),c=0;case 9:if(!(c<i)){t.next=22;break}return t.next=12,b(400);case 12:return a="https://api.jikan.moe/v4/anime/".concat(n[c].entry.mal_id),t.next=15,fetch(a).then((function(t){return t.json()}));case 15:u=(u=t.sent).data,console.log(u),p.push(u);case 19:c++,t.next=9;break;case 22:p=p.filter((function(t){return null!=t&&t.airing==document.querySelector("#airing").checked})).sort((function(t,e){return"highest"==document.querySelector("#score").value?e.score-t.score:t.score-e.score})),0==p.length&&(o="<p>No results fit your criteria</p><br>",document.querySelector("#results").innerHTML+=o),p.forEach((function(t){o='<div class="hero is-large is-info p-2 has-background-link mb-6"> <a href='.concat(t.url,'>\n        <img src="').concat(t.images.jpg.image_url,'"></a>\n        <a href=').concat(t.url,'>\n        <p class="title is-size-3 mb-1">').concat(t.title,"</p></a><p>Airing:&nbsp; ").concat(t.status,"</p><p>Score:&nbsp;").concat(t.score,"</p><p>Episodes:&nbsp; ").concat(t.episodes,"</p><br></div>"),document.querySelector("#results").innerHTML+=o}));case 25:case"end":return t.stop()}}),t)})))).apply(this,arguments)}window.onload=function(t){document.querySelector("#searchbutton").onclick=y,s&&(document.querySelector("#searchbox").value=s),l&&(document.querySelector("#airing").value=l),f&&(document.querySelector("#score").value=f),f&&(document.querySelector("#resultsLength").value=h);var e=document.querySelector("#burger"),r=document.querySelector("#nav-links");e.addEventListener("click",(function(){r.classList.toggle("is-active")})),document.querySelector("#airing").onchange=function(t){localStorage.setItem(c,t.target.checked)},document.querySelector("#score").onchange=function(t){localStorage.setItem(a,t.target.value)},document.querySelector("#resultsLength").onchange=function(t){localStorage.setItem(u,t.target.value)}};var b=function(t){return new Promise((function(e){return setTimeout(e,t)}))}})();