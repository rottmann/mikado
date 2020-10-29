const proto=Array.prototype,proxy=window.Proxy;let size=0;export default function Observer(a){if(!(this instanceof Observer))return new Observer(a);if(a instanceof Observer)return a;this.mikado=null;const b=a?a.length:0;if(proxy){if(b)for(let c=0;c<b;c++)this[c]=a[c];return this.length=b,this.proto={splice:proto.splice.bind(this),pop:proto.pop.bind(this),shift:proto.shift.bind(this),unshift:proto.unshift.bind(this),push:proto.push.bind(this)},new Proxy(this,handler)}this.proto=a||[];for(let c=0;c<=b;c++)define(this,c);size=b,define(this,"length")}function define(a,b){const c=b;Object.defineProperty(a,c,{get:function(){return this.proto[c]},set:function(a){"number"==typeof c&&(c===size&&define(this,++size),handler.set(this,c,a))}})}let skip=!1;const handler={set:function(a,b,c){let d;if("number"==typeof b)d=!0;else{const a=parseInt(b,10);b===""+a&&(b=a,d=!0)}if(!skip){skip=!0;const e=a.mikado;if(e&&!e.skip){const f=a.length;if(d){const d=e.length;if(f!==d&&(a.length=d),e.stealth&&a[b]===c)return skip=!1,!0;const g=e.view;if(b>=d)e.add(c,g),a.length++;else if(b<d){const a=e.key,d=e.dom[b];e.reuse||a&&d._key===c[a]?e.update(d,c,g,b):e.replace(d,c,g,b)}if(e.proxy)return skip=!1,!0}else"length"===b&&c<f&&e.remove(c,f-c)}skip=!1}return(proxy?a:a.proto)[b]=c,!0}};Observer.prototype.set=function(a){return this.splice(),this.concat(a)},Observer.prototype.splice=function(a,b,c){skip=!0,a||(a=0),"undefined"==typeof b&&(b=this.length-a,0>b&&(b=0)),b&&this.mikado.remove(a,b);const d=c?this.proto.splice(a,b,c):this.proto.splice(a,b);return c&&this.mikado.add(c,a,this.mikado.view),skip=!1,d},Observer.prototype.push=function(a){skip=!0,this.mikado.add(a,this.mikado.view),this.mikado.proxy||(this[this.length]=a),proxy&&this.length++,skip=!1},Observer.prototype.unshift=function(a){skip=!0,this.mikado.add(a,0,this.mikado.view),this.proto.unshift(a),skip=!1},Observer.prototype.pop=function(){skip=!0,this.mikado.remove(this.length-1);const a=this.proto.pop();return skip=!1,a},Observer.prototype.shift=function(){skip=!0,this.mikado.remove(0);const a=this.proto.shift();return skip=!1,a},Observer.prototype.concat=function(a){const b=a.length;for(let c=0;c<b;c++)this.push(a[c]);return this},Observer.prototype.sort=proto.sort,Observer.prototype.reverse=proto.reverse,Observer.prototype.slice=proto.slice,Observer.prototype.map=function(a,b){b&&(a=a.bind(this));for(let c=0,d=this.length;c<d;c++)this[c]=a(this[c]);return this},Observer.prototype.filter=function(a,b){b&&(a=a.bind(this));let c,d;for(let e=0,f=this.length;e<f;e++)a(this[e])?d&&(this.splice(c,d),f-=d,e-=d,d=0):d?d++:(c=e,d=1);return d&&this.splice(c,d),this},Observer.prototype.indexOf=function(a){for(let b=0,c=this.length;b<c;b++)if(this[b]===a)return b;return-1},Observer.prototype.lastIndexOf=function(a){for(let b=this.length-1;0<=b;b--)if(this[b]===a)return b;return-1},Observer.prototype.forEach=function(a){for(let b=0,c=this.length;b<c;b++)a(this[b])};