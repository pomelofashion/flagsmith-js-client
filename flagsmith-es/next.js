var t=function(){return t=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var a in e=arguments[n])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t},t.apply(this,arguments)};function e(t,e,n){if(n||2===arguments.length)for(var i,a=0,r=e.length;a<r;a++)!i&&a in e||(i||(i=Array.prototype.slice.call(e,0,a)),i[a]=e[a]);return t.concat(i||Array.prototype.slice.call(e))}var n,i,a,r=function t(e,n){if(e===n)return!0;if(e&&n&&"object"==typeof e&&"object"==typeof n){if(e.constructor!==n.constructor)return!1;var i,a,r;if(Array.isArray(e)){if((i=e.length)!=n.length)return!1;for(a=i;0!=a--;)if(!t(e[a],n[a]))return!1;return!0}if(e.constructor===RegExp)return e.source===n.source&&e.flags===n.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===n.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===n.toString();if((i=(r=Object.keys(e)).length)!==Object.keys(n).length)return!1;for(a=i;0!=a--;)if(!Object.prototype.hasOwnProperty.call(n,r[a]))return!1;for(a=i;0!=a--;){var s=r[a];if(!t(e[s],n[s]))return!1}return!0}return e!=e&&n!=n},s=void 0!==s?s:"undefined"!=typeof window?window:{},o="https://edge.api.flagsmith.com/api/v1/",l=function(t){return"Attempted to "+t+" a user before calling flagsmith.init. Call flagsmith.init first, if you wish to prevent it sending a request for flags, call init with preventFetch:true."},c=function(){function c(e){var o=this;this.eventSource=null,this.getJSON=function(t,e,i){var a=o,r=a.environmentID,s=a.headers,l={method:e||"GET",body:i,headers:{"x-environment-key":r}};return e&&"GET"!==e&&(l.headers["Content-Type"]="application/json; charset=utf-8"),s&&Object.assign(l.headers,s),n||console.error("Flagsmith: fetch is undefined, please specify a fetch implementation into flagsmith.init to support SSR."),n(t,l).then((function(n){return o.log("Fetch response: "+n.status+" "+(e||"GET")+0+t),n.text().then((function(t){var e=t;try{e=JSON.parse(t)}catch(t){}return n.ok?e:Promise.reject(e)}))})).catch((function(t){console.error("Flagsmith: Fetch error: "+t)}))},this.getFlags=function(e,n){var i=o,a=i.onChange,s=i.onError,l=i.identity,c=i.api,g=!1;o.log("Get Flags");var h=function(e){var n=e.flags,i=e.traits;l&&(o.withTraits=!1);var s={},c={};i=i||[],(n=n||[]).forEach((function(t){s[t.feature.name.toLowerCase().replace(/ /g,"_")]={id:t.feature.id,enabled:t.enabled,value:t.feature_state_value}})),i.forEach((function(t){c[t.trait_key.toLowerCase().replace(/ /g,"_")]=t.trait_value})),o.oldFlags=t({},o.flags);var g=r(o.flags,s),h=r(o.traits,c);if(o.flags=s,o.traits=c,o.updateStorage(),o.dtrum){var f={javaDouble:{},date:{},shortString:{},javaLongOrObject:{}};Object.keys(o.flags).map((function(t){u(f,"flagsmith_value_"+t,o.getValue(t)),u(f,"flagsmith_enabled_"+t,o.hasFeature(t))})),Object.keys(o.traits).map((function(t){u(f,"flagsmith_trait_"+t,o.getTrait(t))})),o.log("Sending javaLongOrObject traits to dynatrace",f.javaLongOrObject),o.log("Sending date traits to dynatrace",f.date),o.log("Sending shortString traits to dynatrace",f.shortString),o.log("Sending javaDouble to dynatrace",f.javaDouble),o.dtrum.sendSessionProperties(f.javaLongOrObject,f.date,f.shortString,f.javaDouble)}o.trigger&&o.trigger(),a&&a(o.oldFlags,{isFromServer:!0,flagsChanged:!g,traitsChanged:!h})};return l?Promise.all([o.withTraits?o.getJSON(c+"identities/","POST",JSON.stringify({identifier:l,traits:Object.keys(o.withTraits).map((function(t){return{trait_key:t,trait_value:o.withTraits[t]}}))})):o.getJSON(c+"identities/?identifier="+encodeURIComponent(l))]).then((function(t){o.withTraits=!1,h(t[0]),e&&!g&&(g=!0,e())})).catch((function(t){var e=t.message;s&&s({message:e})})):Promise.all([o.getJSON(c+"flags/")]).then((function(t){h({flags:t[0],traits:null}),e&&!g&&(g=!0,e())})).catch((function(t){n&&!g&&(g=!0,n(t)),s&&s(t)}))},this.analyticsFlags=function(){var e=o.api;if(0!==Object.getOwnPropertyNames(o.evaluationEvent).length)return o.getJSON(e+"analytics/flags/","POST",JSON.stringify(o.evaluationEvent)).then((function(e){var n=o.getState();o.setState(t(t({},n),{evaluationEvent:{}})),o.updateEventStorage()})).catch((function(t){o.log("Exception fetching evaluationEvent",t)}))},this.analyticsInterval=null,this.api=null,this.cacheFlags=null,this.ts=null,this.enableAnalytics=null,this.enableLogs=null,this.environmentID=null,this.evaluationEvent=null,this.flags=null,this.getFlagInterval=null,this.headers=null,this.initialised=null,this.oldFlags=null,this.onChange=null,this.onError=null,this.trigger=null,this.identity=null,this.ticks=null,this.timer=null,this.traits=null,this.dtrum=null,this.withTraits=null,this.cacheOptions={ttl:0,skipAPI:!1},this.evaluateFlag=function(t){if(o.enableAnalytics){if(!o.evaluationEvent)return;void 0===o.evaluationEvent[t]&&(o.evaluationEvent[t]=0),o.evaluationEvent[t]+=1}o.updateEventStorage()},this.getValue=function(t){var e=o.flags&&o.flags[t.toLowerCase().replace(/ /g,"_")],n=null;return e&&(n=e.value),o.evaluateFlag(t),n},this.getTrait=function(t){return o.traits&&o.traits[t.toLowerCase().replace(/ /g,"_")]},this.setTrait=function(e,n){var i=o,a=i.getJSON,r=i.identity,s=i.api;if(s){var c={};if(c[e]=n,!o.identity)return o.withTraits=t(t({},o.withTraits||{}),c),void o.log("Set trait prior to identifying",o.withTraits);var g={identity:{identifier:r},trait_key:e,trait_value:n};return a("".concat(s,"traits/"),"POST",JSON.stringify(g)).then((function(){o.initialised&&o.getFlags()}))}console.error(l("setTrait"))},this.setTraits=function(e){var n=o;n.getJSON;var i=n.identity,a=n.api;if(a)return e&&"object"==typeof e||console.error("Expected object for flagsmith.setTraits"),o.identity?o.getJSON(a+"identities/","POST",JSON.stringify({identifier:i,traits:Object.keys(e).map((function(t){return{trait_key:t,trait_value:e[t]}}))})).then((function(){o.initialised&&o.getFlags()})):(o.withTraits=t(t({},o.withTraits||{}),e),void o.log("Set traits prior to identifying",o.withTraits));console.error(l("setTraits"))},this.hasFeature=function(t){var e=o.flags&&o.flags[t.toLowerCase().replace(/ /g,"_")],n=!1;return e&&e.enabled&&(n=!0),o.evaluateFlag(t),n},n=e.fetch?e.fetch:"undefined"!=typeof fetch?fetch:s.fetch,this.log("Constructing flagsmith instance "+e),e.eventSource&&(a=e.eventSource),i=e.AsyncStorage}return c.prototype.init=function(e){var r=this,s=e.environmentID,l=e.api,c=void 0===l?o:l,g=e.headers,u=e.onChange,h=e.cacheFlags,f=e.onError,v=e.defaultFlags,p=e.fetch,d=e.preventFetch,y=e.enableLogs,m=e.enableDynatrace,S=e.enableAnalytics,O=e.realtime,b=e.eventSourceUrl,I=void 0===b?"http://sse-lb-eu-west-2-7ba834a-1075512661.eu-west-2.elb.amazonaws.com.global.prod.fastly.net/sse/environments/$ENVIRONMENT/stream":b,E=e.AsyncStorage,w=e.identity,F=e.traits,T=e._trigger,A=e.state,_=e.cacheOptions,j=e.angularHttpClient;return new Promise((function(e,o){if(r.environmentID=s,r.api=c,r.headers=g,r.getFlagInterval=null,r.analyticsInterval=null,r.onChange=u,r.trigger=T,r.onError=f,r.identity=w,r.withTraits=F,r.enableLogs=y,r.cacheOptions=_?{skipAPI:!!_.skipAPI,ttl:_.ttl||0}:r.cacheOptions,!r.cacheOptions.ttl&&r.cacheOptions.skipAPI&&console.warn("Flagsmith: you have set a cache ttl of 0 and are skipping API calls, this means the API will not be hit unless you clear local storage."),p&&(n=p),r.enableAnalytics=S||!1,r.flags=Object.assign({},v)||{},r.initialised=!0,r.ticks=1e4,O){var l=I.replace("$ENVIRONMENT",s);a?r.eventSource||(r.log("Creating event source with url "+l),r.eventSource=new a(l),r.eventSource.addEventListener("environment_updated",(function(t){r.log("Received eventsource message"),r.getFlags()}))):r.log("Error, EventSource is undefined")}if(r.log("Initialising with properties",{environmentID:s,api:c,headers:g,onChange:u,cacheFlags:h,onError:f,defaultFlags:v,preventFetch:d,enableLogs:y,enableAnalytics:S,AsyncStorage:i,identity:w,traits:F,_trigger:T,state:A,angularHttpClient:j},r),r.timer=r.enableLogs?(new Date).valueOf():null,E&&(i=E),r.cacheFlags=void 0!==i&&h,r.setState(A),!s)throw o("Please specify a environment id"),"Please specify a environment id";m&&("undefined"==typeof dtrum?console.error("You have attempted to enable dynatrace but dtrum is undefined, please check you have the Dynatrace RUM JavaScript API installed."):r.dtrum=dtrum),j&&(n=function(t,e){var n=e.headers,i=e.method,a=e.body;return new Promise((function(e){switch(i){case"GET":return j.get(t,{headers:n}).subscribe((function(t){e({ok:1,text:function(){return Promise.resolve(t)}})}));case"POST":case"PUT":return j.post(t,a,{headers:n}).subscribe((function(t){e({ok:1,text:function(){return Promise.resolve(t)}})}))}}))}),i&&"undefined"!=typeof window&&i.getItem("BULLET_TRAIN_EVENT").then((function(t){if(t)try{r.evaluationEvent=JSON.parse(t)}catch(t){r.evaluationEvent={}}else r.evaluationEvent={};return r.analyticsInterval=setInterval(r.analyticsFlags,r.ticks),!0})),r.enableAnalytics&&(r.analyticsInterval&&clearInterval(r.analyticsInterval),i&&"undefined"!=typeof window&&i.getItem("BULLET_TRAIN_EVENT",(function(e,n){if(n){var i=JSON.parse(n);i&&(A=r.getState(),r.log("Retrieved events from cache",n),r.setState(t(t({},A),{evaluationEvent:i})))}return!0}))),h?i&&"undefined"!=typeof window&&i.getItem("BULLET_TRAIN_DB",(function(t,n){if(n)try{var i=JSON.parse(n),a=!1;if(i&&i.api===r.api&&i.environmentID===r.environmentID){var s=!0;r.cacheOptions.ttl&&(!i.ts||(new Date).valueOf()-i.ts>r.cacheOptions.ttl)&&i.ts&&(r.log("Ignoring cache, timestamp is too old ts:"+i.ts+" ttl: "+r.cacheOptions.ttl+" time elapsed since cache: "+((new Date).valueOf()-i.ts)+"ms"),s=!1),s&&(a=!0,r.setState(i),r.log("Retrieved flags from cache",i))}r.flags?(r.trigger&&r.trigger(),r.onChange&&r.onChange(null,{isFromServer:!1}),r.oldFlags=r.flags,e(!0),r.cacheOptions.skipAPI&&a&&r.log("Skipping API, using cache"),d||r.cacheOptions.skipAPI&&a||r.getFlags()):d?e(!0):r.getFlags(e,o)}catch(t){r.log("Exception fetching cached logs",t)}else d?(v&&(r.trigger&&r.trigger(),r.onChange&&r.onChange(null,{isFromServer:!1})),e(!0)):r.getFlags(e,o);return!0})):d?(v&&(r.trigger&&r.trigger(),r.onChange&&r.onChange(null,{isFromServer:!1})),e(!0)):r.getFlags(e,o)})).catch((function(t){return f&&f(t)}))},c.prototype.getAllFlags=function(){return this.flags},c.prototype.identify=function(e,n){return this.identity=e,this.log("Identify: "+this.identity),n&&(this.withTraits=t(t({},this.withTraits||{}),n)),this.initialised?this.getFlags():Promise.resolve()},c.prototype.getState=function(){return{api:this.api,environmentID:this.environmentID,flags:this.flags,identity:this.identity,ts:this.ts,traits:this.traits,evaluationEvent:this.evaluationEvent}},c.prototype.setState=function(t){t&&(this.initialised=!0,this.api=t.api||this.api||o,this.environmentID=t.environmentID||this.environmentID,this.flags=t.flags||this.flags,this.identity=t.identity||this.identity,this.traits=t.traits||this.traits,this.evaluationEvent=t.evaluationEvent||this.evaluationEvent)},c.prototype.log=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];this.enableLogs&&console.log.apply(this,e(["FLAGSMITH:",(new Date).valueOf()-this.timer,"ms"],t,!0))},c.prototype.updateStorage=function(){if(this.cacheFlags){this.ts=(new Date).valueOf();var t=JSON.stringify(this.getState());this.log("Setting storage",t),i.setItem("BULLET_TRAIN_DB",t)}},c.prototype.updateEventStorage=function(){if(this.enableAnalytics){var t=JSON.stringify(this.getState().evaluationEvent);this.log("Setting event storage",t),i.setItem("BULLET_TRAIN_EVENT",t)}},c.prototype.logout=function(){return this.identity=null,this.traits=null,this.initialised?this.getFlags():Promise.resolve()},c.prototype.startListening=function(t){void 0===t&&(t=1e3),this.getFlagInterval&&clearInterval(this.getFlagInterval),this.getFlagInterval=setInterval(this.getFlags,t)},c.prototype.stopListening=function(){clearInterval(this.getFlagInterval),this.getFlagInterval=null},c.prototype.getSegments=function(){},c}();function g(t){var e=t.fetch,n=t.AsyncStorage,i=t.eventSource;return new c({fetch:e,AsyncStorage:n,eventSource:i})}var u=function(t,e,n){var i="shortString",a=!0;"number"==typeof n&&(i="javaDouble",a=!1),t[i]=t[i]||{},t[i][e]=a?n+"":n},h=g({}),f=function(){return g({})};export{f as createFlagsmithInstance,h as default};
//# sourceMappingURL=next.js.map
