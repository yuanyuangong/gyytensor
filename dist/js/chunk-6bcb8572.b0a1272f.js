(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6bcb8572"],{2878:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"row"},[n("div",{staticClass:"col-2"},[n("div",{staticClass:"gy-card"},[n("button",{staticClass:"btn btn-block btn-lg ",class:e.loop?"btn-inverse":"btn-success",on:{click:e.start}},[e._v(e._s(e.loop?"暂停":"开始"))]),n("button",{staticClass:"btn btn-block btn-lg btn-danger",on:{click:function(t){return e.pause()}}},[e._v("结束")]),n("button",{staticClass:"btn btn-block btn-lg btn-danger",on:{click:function(t){return e.test()}}},[e._v("测试")])])]),e._m(0),e._m(1)])])},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"col-5"},[n("div",{staticClass:"palette palette-wet-asphalt"},[e._v("\n                迷宫环境\n            ")]),n("div",{staticClass:"gy-card"},[n("div",{staticStyle:{width:"350px",margin:"0 auto"}},[n("canvas",{staticStyle:{"background-color":"#333"},attrs:{id:"tutorial",width:"350",height:"350"}})])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"col-5"},[n("div",{staticClass:"palette palette-wet-asphalt"},[e._v("\n               q_table表\n            ")]),n("div",{staticClass:"gy-card"},[n("div",{staticStyle:{width:"350px",margin:"0 auto"}},[n("canvas",{staticStyle:{"background-color":"#f8f8f8"},attrs:{id:"q_table",width:"350",height:"350"}})])])])}],i=(n("ac6a"),n("96cf"),n("3b8d")),o=(n("0b53"),n("5118"));function l(e){return new Promise(function(t){return Object(o["setTimeout"])(t,e)})}var c={name:"labyrinth",data:function(){return{i:0,type:0,loop:!1,q_table:{},location:0,action:[0,50],arealen:50,adventurer:{fillStyle:"#1184ee",orign:[0,0]},newlocation:"",trap:[{fillStyle:"#fd2a56",orign:[150,250]},{fillStyle:"#fd2a56",orign:[200,150]}],reward:{fillStyle:"#26f52b",orign:[150,200]}}},created:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}(),mounted:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=this,t.init();case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),methods:{test:function(){var e=this;e.q_table[e.adventurer.orign]&&Math.max.apply(null,e.q_table[e.adventurer.orign])},init:function(){this.step_table={},this.adventurer={fillStyle:"#1184ee",orign:[0,0]},this.draw()},start:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=this,t.loop=!t.loop;case 2:if(!t.loop){e.next=13;break}return t.i++,n=t.q_action(t.adventurer.orign),a=t.predict(n),a._action=t.q_action(t.adventurer.orign),t.step(a),t.q_learn(a),e.next=11,l(100);case 11:e.next=2;break;case 13:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),pause:function(){this.loop=!1,console.log("结束")},main:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this;case 1:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),savelocation:function(e){if(this.q_table[e]);else{this.i;this.q_table[e]=[0,0,0,0],this.step_table[e]=[0,0,0,0];var t=document.getElementById("q_table"),n=t.getContext("2d");n.strokeStyle="#1184ee",n.strokeRect(e[0],e[1],this.arealen,this.arealen)}},q_action:function(e){var t=this;t.savelocation(e);for(var n=t.q_table,a=n[e],r=a.length,i=Math.max.apply(null,a),o=[],l=0;l<r;l++)a[l]==i&&o.push(l);var c=o[Math.floor(Math.random()*o.length)];switch(c){case 0:t.newlocation=t.adventurer.orign[1]-t.adventurer.orign[1]>=50?t.arealen:0;break;case 1:t.newlocation=t.adventurer.orign[0]+t.adventurer.orign[0]<300?t.arealen:0;break;case 2:t.newlocation=t.adventurer.orign[1]+t.adventurer.orign[1]<300?t.arealen:0;break;case 3:t.newlocation=t.adventurer.orign[0]-t.adventurer.orign[0]>=50?t.arealen:0;break}return c},predict:function(e){var t=this,n={};switch(n.action=e,n.location=JSON.parse(JSON.stringify(t.adventurer.orign)),e){case 0:t.adventurer.orign[1]-=t.adventurer.orign[1]>=50?t.arealen:0;break;case 1:t.adventurer.orign[0]+=t.adventurer.orign[0]<300?t.arealen:0;break;case 2:t.adventurer.orign[1]+=t.adventurer.orign[1]<300?t.arealen:0;break;case 3:t.adventurer.orign[0]-=t.adventurer.orign[0]>=50?t.arealen:0;break}return n},step:function(e){var t=this,n=document.getElementById("tutorial"),a=n.getContext("2d");a.fillStyle="#333",a.fillRect(e.location[0],e.location[1],t.arealen,t.arealen),a.fillStyle=t.adventurer.fillStyle;var r=t.adventurer.orign;a.fillRect(r[0],r[1],t.arealen,t.arealen)},sarsa_learn:function(){},q_learn:function(e){var t=this;e.value=t.q_table[t.adventurer.orign]?.8*Math.max.apply(null,t.q_table[t.adventurer.orign]):0,console.log(e.value),t.adventurer.orign[0]==t.trap[0].orign[0]&&t.adventurer.orign[1]==t.trap[0].orign[1]&&(e.value=-1,t.init()),0<t.adventurer.orign[0]<350&&0<t.adventurer.orign[1]<350||(e.value=-1,t.init()),t.adventurer.orign[0]==t.trap[1].orign[0]&&t.adventurer.orign[1]==t.trap[1].orign[1]&&(e.value=-1,t.init()),t.adventurer.orign[0]==t.reward.orign[0]&&t.adventurer.orign[1]==t.reward.orign[1]&&(e.value=1,t.init()),e._location=JSON.parse(JSON.stringify(t.adventurer.orign));var n=e.location,a=e.action,r=(e._action,e.value.toFixed(1)),i=document.getElementById("q_table"),o=i.getContext("2d");o.font="12px serif";var l=12;function c(e,t){o.fillStyle="#f8f8f8",o.fillRect(n[0]+e,n[1]+t-12,o.measureText(r).width,l),o.fillStyle="#333",o.fillText(r,n[0]+e,n[1]+t)}switch(t.q_table[n][a]+=.8*(e.value-t.q_table[n][a]),a){case 0:c(22,15);break;case 1:c(35,26);break;case 2:c(22,35);break;case 3:c(10,25);break}},draw:function(){var e=this,t=e.arealen,n=document.getElementById("tutorial");if(n.getContext){var a=n.getContext("2d");a.fillStyle=e.adventurer.fillStyle;var r=e.adventurer.orign;a.fillRect(r[0],r[1],t,t),e.trap.forEach(function(e){a.fillStyle=e.fillStyle;var n=e.orign;a.fillRect(n[0],n[1],t,t)}),a.fillStyle=e.reward.fillStyle;var i=e.reward.orign;a.fillRect(i[0],i[1],t,t)}else alert("浏览器版本太低了")}}},s=c,u=n("2877"),f=Object(u["a"])(s,a,r,!1,null,null,null);t["default"]=f.exports},5118:function(e,t,n){(function(e){var a="undefined"!==typeof e&&e||"undefined"!==typeof self&&self||window,r=Function.prototype.apply;function i(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new i(r.call(setTimeout,a,arguments),clearTimeout)},t.setInterval=function(){return new i(r.call(setInterval,a,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(a,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n("6017"),t.setImmediate="undefined"!==typeof self&&self.setImmediate||"undefined"!==typeof e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!==typeof self&&self.clearImmediate||"undefined"!==typeof e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n("c8ba"))},6017:function(e,t,n){(function(e,t){(function(e,n){"use strict";if(!e.setImmediate){var a,r=1,i={},o=!1,l=e.document,c=Object.getPrototypeOf&&Object.getPrototypeOf(e);c=c&&c.setTimeout?c:e,"[object process]"==={}.toString.call(e.process)?v():g()?p():e.MessageChannel?m():l&&"onreadystatechange"in l.createElement("script")?h():b(),c.setImmediate=s,c.clearImmediate=u}function s(e){"function"!==typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var o={callback:e,args:t};return i[r]=o,a(r),r++}function u(e){delete i[e]}function f(e){var t=e.callback,a=e.args;switch(a.length){case 0:t();break;case 1:t(a[0]);break;case 2:t(a[0],a[1]);break;case 3:t(a[0],a[1],a[2]);break;default:t.apply(n,a);break}}function d(e){if(o)setTimeout(d,0,e);else{var t=i[e];if(t){o=!0;try{f(t)}finally{u(e),o=!1}}}}function v(){a=function(e){t.nextTick(function(){d(e)})}}function g(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}function p(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"===typeof n.data&&0===n.data.indexOf(t)&&d(+n.data.slice(t.length))};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n),a=function(n){e.postMessage(t+n,"*")}}function m(){var e=new MessageChannel;e.port1.onmessage=function(e){var t=e.data;d(t)},a=function(t){e.port2.postMessage(t)}}function h(){var e=l.documentElement;a=function(t){var n=l.createElement("script");n.onreadystatechange=function(){d(t),n.onreadystatechange=null,e.removeChild(n),n=null},e.appendChild(n)}}function b(){a=function(e){setTimeout(d,0,e)}}})("undefined"===typeof self?"undefined"===typeof e?this:e:self)}).call(this,n("c8ba"),n("f28c"))},ac6a:function(e,t,n){for(var a=n("cadf"),r=n("0d58"),i=n("2aba"),o=n("7726"),l=n("32e9"),c=n("84f2"),s=n("2b4c"),u=s("iterator"),f=s("toStringTag"),d=c.Array,v={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},g=r(v),p=0;p<g.length;p++){var m,h=g[p],b=v[h],y=o[h],_=y&&y.prototype;if(_&&(_[u]||l(_,u,d),_[f]||l(_,f,h),c[h]=d,b))for(m in a)_[m]||i(_,m,a[m],!0)}}}]);