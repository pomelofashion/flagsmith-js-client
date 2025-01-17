import t,{createContext as e,useRef as n,useContext as r,useState as i,useCallback as o,useEffect as a,useMemo as u}from"react";var c=function(){return c=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},c.apply(this,arguments)},l={exports:{}};function s(){}s.prototype={on:function(t,e,n){var r=this.e||(this.e={});return(r[t]||(r[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var r=this;function i(){r.off(t,i),e.apply(n,arguments)}return i._=e,this.on(t,i,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),r=0,i=n.length;r<i;r++)n[r].fn.apply(n[r].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),r=n[t],i=[];if(r&&e)for(var o=0,a=r.length;o<a;o++)r[o].fn!==e&&r[o].fn._!==e&&i.push(r[o]);return i.length?n[t]=i:delete n[t],this}},l.exports=s,l.exports.TinyEmitter=s;var f=new l.exports.TinyEmitter,g=e(null),h=function(e){var r=e.flagsmith,i=e.options,o=e.serverState,a=e.children,u=n(!0);return r&&!(null==r?void 0:r.trigger)&&(r.trigger=function(){r.log("React - trigger event received"),f.emit("event")}),o&&!r.initialised&&r.setState(o),u.current&&(u.current=!1,i&&r.init(c(c({},i),{state:i.state||o,onChange:function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];i.onChange&&i.onChange.apply(i,t),f.emit("event")}}))),t.createElement(g.Provider,{value:r},a)},v=function(t){var e=n(t);return e.current||(e.current=t),e.current},p=function(t){if("string"==typeof t)return[t];if("object"==typeof t&&t.hasOwnProperty("length"))return t;throw new Error("Flagsmith: please supply an array of strings or a single string of flag keys to useFlags")},m=function(t,e,n){return void 0===n&&(n=[]),e.map((function(e){return"".concat(t.getValue(e)).concat(t.hasFeature(e))})).concat(n.map((function(e){return"".concat(t.getTrait(e))}))).join(",")};function y(t,e){void 0===e&&(e=[]);var c=n(!0),l=v(p(t)),s=v(p(e)),h=r(g),y=i(m(h,l)),d=y[0],w=y[1],x=n(d),R=o((function(){null==h||h.log("React - Event listener triggered");var t=m(h,l,s);t!==x.current&&(x.current=t,w(t))}),[]);return c.current&&(c.current=!1,null==h||h.log("React - Initialising event listeners"),f.on("event",R)),a((function(){return function(){null==h||h.log("React - Removing event listeners"),f.off("event",R)}}),[]),u((function(){null==h||h.log("React - Render key has changed");var t={};return l.map((function(e){t[e]={enabled:h.hasFeature(e),value:h.getValue(e)}})).concat(null==s?void 0:s.map((function(e){t[e]=h.getTrait(e)}))),t}),[d])}function d(){var t=r(g);if(!t)throw new Error("useFlagsmith must be used with in a FlagsmithProvider");return t}export{g as FlagsmithContext,h as FlagsmithProvider,y as useFlags,d as useFlagsmith};
//# sourceMappingURL=react.js.map
