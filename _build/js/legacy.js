!function(e){var t={};function r(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(i,n,function(t){return e[t]}.bind(null,n));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/js/",r(r.s=337)}({337:function(e,t,r){e.exports=r(338)},338:function(e,t,r){var i=r(339).EventSource;e.exports=i,window&&!window.EventSource&&(window.EventSource=i,console&&console.log("polyfill-eventsource added missing EventSource to window"))},339:function(e,t){!function(e){if(!e.EventSource||e._eventSourceImportPrefix){var t=(e._eventSourceImportPrefix||"")+"EventSource",r=function(e,t){if(!e||"string"!=typeof e)throw new SyntaxError("Not enough arguments");this.URL=e,this.setOptions(t);var r=this;setTimeout(function(){r.poll()},0)};if(r.prototype={CONNECTING:0,OPEN:1,CLOSED:2,defaultOptions:{loggingEnabled:!1,loggingPrefix:"eventsource",interval:500,bufferSizeLimit:262144,silentTimeout:3e5,getArgs:{evs_buffer_size_limit:262144},xhrHeaders:{Accept:"text/event-stream","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"}},setOptions:function(e){var t,r=this.defaultOptions;for(t in r)r.hasOwnProperty(t)&&(this[t]=r[t]);for(t in e)t in r&&e.hasOwnProperty(t)&&(this[t]=e[t]);this.getArgs&&this.bufferSizeLimit&&(this.getArgs.evs_buffer_size_limit=this.bufferSizeLimit),"undefined"!=typeof console&&void 0!==console.log||(this.loggingEnabled=!1)},log:function(e){this.loggingEnabled&&console.log("["+this.loggingPrefix+"]:"+e)},poll:function(){try{if(this.readyState==this.CLOSED)return;this.cleanup(),this.readyState=this.CONNECTING,this.cursor=0,this.cache="",this._xhr=new this.XHR(this),this.resetNoActivityTimer()}catch(e){this.log("There were errors inside the pool try-catch"),this.dispatchEvent("error",{type:"error",data:e.message})}},pollAgain:function(e){var t=this;t.readyState=t.CONNECTING,t.dispatchEvent("error",{type:"error",data:"Reconnecting "}),this._pollTimer=setTimeout(function(){t.poll()},e||0)},cleanup:function(){this.log("evs cleaning up"),this._pollTimer&&(clearInterval(this._pollTimer),this._pollTimer=null),this._noActivityTimer&&(clearInterval(this._noActivityTimer),this._noActivityTimer=null),this._xhr&&(this._xhr.abort(),this._xhr=null)},resetNoActivityTimer:function(){if(this.silentTimeout){this._noActivityTimer&&clearInterval(this._noActivityTimer);var e=this;this._noActivityTimer=setTimeout(function(){e.log("Timeout! silentTImeout:"+e.silentTimeout),e.pollAgain()},this.silentTimeout)}},close:function(){this.readyState=this.CLOSED,this.log("Closing connection. readyState: "+this.readyState),this.cleanup()},ondata:function(){var e=this._xhr;if(e.isReady()&&!e.hasError()){this.resetNoActivityTimer(),this.readyState==this.CONNECTING&&(this.readyState=this.OPEN,this.dispatchEvent("open",{type:"open"}));var t=e.getBuffer();t.length>this.bufferSizeLimit&&(this.log("buffer.length > this.bufferSizeLimit"),this.pollAgain()),0==this.cursor&&t.length>0&&"\ufeff"==t.substring(0,1)&&(this.cursor=1);var r=this.lastMessageIndex(t);if(r[0]>=this.cursor){var i=r[1],n=t.substring(this.cursor,i);this.parseStream(n),this.cursor=i}e.isDone()&&(this.log("request.isDone(). reopening the connection"),this.pollAgain(this.interval))}else this.readyState!==this.CLOSED&&(this.log("this.readyState !== this.CLOSED"),this.pollAgain(this.interval))},parseStream:function(e){var t,r,i,s,o,a,u=(e=this.cache+this.normalizeToLF(e)).split("\n\n");for(t=0;t<u.length-1;t++){for(i="message",s=[],parts=u[t].split("\n"),r=0;r<parts.length;r++)0==(o=this.trimWhiteSpace(parts[r])).indexOf("event")?i=o.replace(/event:?\s*/,""):0==o.indexOf("retry")?(a=parseInt(o.replace(/retry:?\s*/,"")),isNaN(a)||(this.interval=a)):0==o.indexOf("data")?s.push(o.replace(/data:?\s*/,"")):0==o.indexOf("id:")?this.lastEventId=o.replace(/id:?\s*/,""):0==o.indexOf("id")&&(this.lastEventId=null);if(s.length){var l=new n(i,s.join("\n"),window.location.origin,this.lastEventId);this.dispatchEvent(i,l)}}this.cache=u[u.length-1]},dispatchEvent:function(e,t){var r=this["_"+e+"Handlers"];if(r)for(var i=0;i<r.length;i++)r[i].call(this,t);this["on"+e]&&this["on"+e].call(this,t)},addEventListener:function(e,t){this["_"+e+"Handlers"]||(this["_"+e+"Handlers"]=[]),this["_"+e+"Handlers"].push(t)},removeEventListener:function(e,t){var r=this["_"+e+"Handlers"];if(r)for(var i=r.length-1;i>=0;--i)if(r[i]===t){r.splice(i,1);break}},_pollTimer:null,_noactivityTimer:null,_xhr:null,lastEventId:null,cache:"",cursor:0,onerror:null,onmessage:null,onopen:null,readyState:0,urlWithParams:function(e,t){var r=[];if(t){var i,n,s=encodeURIComponent;for(i in t)t.hasOwnProperty(i)&&(n=s(i)+"="+s(t[i]),r.push(n))}return r.length>0?-1==e.indexOf("?")?e+"?"+r.join("&"):e+"&"+r.join("&"):e},lastMessageIndex:function(e){var t=e.lastIndexOf("\n\n"),r=e.lastIndexOf("\r\r"),i=e.lastIndexOf("\r\n\r\n");return i>Math.max(t,r)?[i,i+4]:[Math.max(t,r),Math.max(t,r)+2]},trimWhiteSpace:function(e){return e.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,"")},normalizeToLF:function(e){return e.replace(/\r\n|\r/g,"\n")}},window.XDomainRequest&&window.XMLHttpRequest&&void 0===(new XMLHttpRequest).responseType){r.isPolyfill="IE_8-9";var i=r.prototype.defaultOptions;i.xhrHeaders=null,i.getArgs.evs_preamble=2056,r.prototype.XHR=function(e){request=new XDomainRequest,this._request=request,request.onprogress=function(){request._ready=!0,e.ondata()},request.onload=function(){this._loaded=!0,e.ondata()},request.onerror=function(){this._failed=!0,e.readyState=e.CLOSED,e.dispatchEvent("error",{type:"error",data:"XDomainRequest error"})},request.ontimeout=function(){this._failed=!0,e.readyState=e.CLOSED,e.dispatchEvent("error",{type:"error",data:"XDomainRequest timed out"})};var t={};if(e.getArgs){var r=e.getArgs;for(var i in r)r.hasOwnProperty(i)&&(t[i]=r[i]);e.lastEventId&&(t.evs_last_event_id=e.lastEventId)}request.open("GET",e.urlWithParams(e.URL,t)),request.send()},r.prototype.XHR.prototype={useXDomainRequest:!0,_request:null,_ready:!1,_loaded:!1,_failed:!1,isReady:function(){return this._request._ready},isDone:function(){return this._request._loaded},hasError:function(){return this._request._failed},getBuffer:function(){var e="";try{e=this._request.responseText||""}catch(e){}return e},abort:function(){this._request&&this._request.abort()}}}else r.isPolyfill="XHR",r.prototype.XHR=function(e){request=new XMLHttpRequest,this._request=request,e._xhr=this,request.onreadystatechange=function(){request.readyState>1&&e.readyState!=e.CLOSED&&(200==request.status||request.status>=300&&request.status<400?e.ondata():(request._failed=!0,e.readyState=e.CLOSED,e.dispatchEvent("error",{type:"error",data:"The server responded with "+request.status}),e.close()))},request.onprogress=function(){},request.open("GET",e.urlWithParams(e.URL,e.getArgs),!0);var t=e.xhrHeaders;for(var r in t)t.hasOwnProperty(r)&&request.setRequestHeader(r,t[r]);e.lastEventId&&request.setRequestHeader("Last-Event-Id",e.lastEventId),request.send()},r.prototype.XHR.prototype={useXDomainRequest:!1,_request:null,_failed:!1,isReady:function(){return this._request.readyState>=2},isDone:function(){return 4==this._request.readyState},hasError:function(){return this._failed||this._request.status>=400},getBuffer:function(){var e="";try{e=this._request.responseText||""}catch(e){}return e},abort:function(){this._request&&this._request.abort()}};e[t]=r}function n(e,t,r,i){this.bubbles=!1,this.cancelBubble=!1,this.cancelable=!1,this.data=t||null,this.origin=r||"",this.lastEventId=i||"",this.type=e||"message"}}(this)}});
//# sourceMappingURL=legacy.js.map