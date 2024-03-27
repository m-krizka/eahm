!function(e,r){for(var t in r)e[t]=r[t]}(exports,function(e){function r(e){var r=require("./"+e+"."+i+".hot-update.js");!function(e,r){if(!w[e]||!v[e])return;for(var t in v[e]=!1,r)Object.prototype.hasOwnProperty.call(r,t)&&(y[t]=r[t]);0==--h&&0===g&&N()}(r.id,r.modules)}var t,n=!0,i="02de43f0706d2bd7fb03",a={},u=[],o=[];function l(e){var r=O[e];if(!r)return S;var n=function(n){return r.hot.active?(O[n]?-1===O[n].parents.indexOf(e)&&O[n].parents.push(e):(u=[e],t=n),-1===r.children.indexOf(n)&&r.children.push(n)):(console.warn("[HMR] unexpected require("+n+") from disposed module "+e),u=[]),S(n)},i=function(e){return{configurable:!0,enumerable:!0,get:function(){return S[e]},set:function(r){S[e]=r}}};for(var a in S)Object.prototype.hasOwnProperty.call(S,a)&&"e"!==a&&"t"!==a&&Object.defineProperty(n,a,i(a));return n.e=function(e){return"ready"===c&&f("prepare"),g++,S.e(e).then(r,function(e){throw r(),e});function r(){g--,"prepare"===c&&(b[e]||q(e),0===g&&0===h&&N())}},n.t=function(e,r){return 1&r&&(e=n(e)),S.t(e,-2&r)},n}function d(e){var r={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:t!==e,active:!0,accept:function(e,t){if(void 0===e)r._selfAccepted=!0;else if("function"==typeof e)r._selfAccepted=e;else if("object"==typeof e)for(var n=0;n<e.length;n++)r._acceptedDependencies[e[n]]=t||function(){};else r._acceptedDependencies[e]=t||function(){}},decline:function(e){if(void 0===e)r._selfDeclined=!0;else if("object"==typeof e)for(var t=0;t<e.length;t++)r._declinedDependencies[e[t]]=!0;else r._declinedDependencies[e]=!0},dispose:function(e){r._disposeHandlers.push(e)},addDisposeHandler:function(e){r._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=r._disposeHandlers.indexOf(e);t>=0&&r._disposeHandlers.splice(t,1)},check:x,apply:j,status:function(e){if(!e)return c;s.push(e)},addStatusHandler:function(e){s.push(e)},removeStatusHandler:function(e){var r=s.indexOf(e);r>=0&&s.splice(r,1)},data:a[e]};return t=void 0,r}var s=[],c="idle";function f(e){c=e;for(var r=0;r<s.length;r++)s[r].call(null,e)}var p,y,m,h=0,g=0,b={},v={},w={};function T(e){return+e+""===e?+e:e}function x(e){if("idle"!==c)throw new Error("check() is only allowed in idle status");return n=e,f("check"),function(){try{var e=require("./"+i+".hot-update.json")}catch(e){return Promise.resolve()}return Promise.resolve(e)}().then(function(e){if(!e)return f("idle"),null;v={},b={},w=e.c,m=e.h,f("prepare");var r=new Promise(function(e,r){p={resolve:e,reject:r}});y={};return q(0),"prepare"===c&&0===g&&0===h&&N(),r})}function q(e){w[e]?(v[e]=!0,h++,r(e)):b[e]=!0}function N(){f("ready");var e=p;if(p=null,e)if(n)Promise.resolve().then(function(){return j(n)}).then(function(r){e.resolve(r)},function(r){e.reject(r)});else{var r=[];for(var t in y)Object.prototype.hasOwnProperty.call(y,t)&&r.push(T(t));e.resolve(r)}}function j(r){if("ready"!==c)throw new Error("apply() is only allowed in ready status");var t,n,o,l,d;function s(e){for(var r=[e],t={},n=r.slice().map(function(e){return{chain:[e],id:e}});n.length>0;){var i=n.pop(),a=i.id,u=i.chain;if((l=O[a])&&!l.hot._selfAccepted){if(l.hot._selfDeclined)return{type:"self-declined",chain:u,moduleId:a};if(l.hot._main)return{type:"unaccepted",chain:u,moduleId:a};for(var o=0;o<l.parents.length;o++){var d=l.parents[o],s=O[d];if(s){if(s.hot._declinedDependencies[a])return{type:"declined",chain:u.concat([d]),moduleId:a,parentId:d};-1===r.indexOf(d)&&(s.hot._acceptedDependencies[a]?(t[d]||(t[d]=[]),p(t[d],[a])):(delete t[d],r.push(d),n.push({chain:u.concat([d]),id:d})))}}}}return{type:"accepted",moduleId:e,outdatedModules:r,outdatedDependencies:t}}function p(e,r){for(var t=0;t<r.length;t++){var n=r[t];-1===e.indexOf(n)&&e.push(n)}}r=r||{};var h={},g=[],b={},v=function(){console.warn("[HMR] unexpected require("+q.moduleId+") to disposed module")};for(var x in y)if(Object.prototype.hasOwnProperty.call(y,x)){var q;d=T(x);var N=!1,j=!1,K=!1,V="";switch((q=y[x]?s(d):{type:"disposed",moduleId:x}).chain&&(V="\nUpdate propagation: "+q.chain.join(" -> ")),q.type){case"self-declined":r.onDeclined&&r.onDeclined(q),r.ignoreDeclined||(N=new Error("Aborted because of self decline: "+q.moduleId+V));break;case"declined":r.onDeclined&&r.onDeclined(q),r.ignoreDeclined||(N=new Error("Aborted because of declined dependency: "+q.moduleId+" in "+q.parentId+V));break;case"unaccepted":r.onUnaccepted&&r.onUnaccepted(q),r.ignoreUnaccepted||(N=new Error("Aborted because "+d+" is not accepted"+V));break;case"accepted":r.onAccepted&&r.onAccepted(q),j=!0;break;case"disposed":r.onDisposed&&r.onDisposed(q),K=!0;break;default:throw new Error("Unexception type "+q.type)}if(N)return f("abort"),Promise.reject(N);if(j)for(d in b[d]=y[d],p(g,q.outdatedModules),q.outdatedDependencies)Object.prototype.hasOwnProperty.call(q.outdatedDependencies,d)&&(h[d]||(h[d]=[]),p(h[d],q.outdatedDependencies[d]));K&&(p(g,[q.moduleId]),b[d]=v)}var k,R=[];for(n=0;n<g.length;n++)d=g[n],O[d]&&O[d].hot._selfAccepted&&R.push({module:d,errorHandler:O[d].hot._selfAccepted});f("dispose"),Object.keys(w).forEach(function(e){!1===w[e]&&function(e){delete installedChunks[e]}(e)});for(var A,P,D=g.slice();D.length>0;)if(d=D.pop(),l=O[d]){var M={},E=l.hot._disposeHandlers;for(o=0;o<E.length;o++)(t=E[o])(M);for(a[d]=M,l.hot.active=!1,delete O[d],delete h[d],o=0;o<l.children.length;o++){var I=O[l.children[o]];I&&((k=I.parents.indexOf(d))>=0&&I.parents.splice(k,1))}}for(d in h)if(Object.prototype.hasOwnProperty.call(h,d)&&(l=O[d]))for(P=h[d],o=0;o<P.length;o++)A=P[o],(k=l.children.indexOf(A))>=0&&l.children.splice(k,1);for(d in f("apply"),i=m,b)Object.prototype.hasOwnProperty.call(b,d)&&(e[d]=b[d]);var C=null;for(d in h)if(Object.prototype.hasOwnProperty.call(h,d)&&(l=O[d])){P=h[d];var _=[];for(n=0;n<P.length;n++)if(A=P[n],t=l.hot._acceptedDependencies[A]){if(-1!==_.indexOf(t))continue;_.push(t)}for(n=0;n<_.length;n++){t=_[n];try{t(P)}catch(e){r.onErrored&&r.onErrored({type:"accept-errored",moduleId:d,dependencyId:P[n],error:e}),r.ignoreErrored||C||(C=e)}}}for(n=0;n<R.length;n++){var F=R[n];d=F.module,u=[d];try{S(d)}catch(e){if("function"==typeof F.errorHandler)try{F.errorHandler(e)}catch(t){r.onErrored&&r.onErrored({type:"self-accept-error-handler-errored",moduleId:d,error:t,originalError:e}),r.ignoreErrored||C||(C=t),C||(C=e)}else r.onErrored&&r.onErrored({type:"self-accept-errored",moduleId:d,error:e}),r.ignoreErrored||C||(C=e)}}return C?(f("fail"),Promise.reject(C)):(f("idle"),new Promise(function(e){e(g)}))}var O={};function S(r){if(O[r])return O[r].exports;var t=O[r]={i:r,l:!1,exports:{},hot:d(r),parents:(o=u,u=[],o),children:[]};return e[r].call(t.exports,t,t.exports,l(r)),t.l=!0,t.exports}return S.m=e,S.c=O,S.d=function(e,r,t){S.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},S.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},S.t=function(e,r){if(1&r&&(e=S(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(S.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)S.d(t,n,function(r){return e[r]}.bind(null,n));return t},S.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return S.d(r,"a",r),r},S.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},S.p="",S.h=function(){return i},l(11)(S.s=11)}([function(e,r,t){function n(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.forEach(function(r){i(e,r,t[r])})}return e}function i(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){if(null==e)return{};var t,n,i=function(e,r){if(null==e)return{};var t,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(i[t]=e[t]);return i}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}function u(e,r,t,n,i,a,u){try{var o=e[a](u),l=o.value}catch(e){return void t(e)}o.done?r(l):Promise.resolve(l).then(n,i)}function o(e){return function(){var r=this,t=arguments;return new Promise(function(n,i){var a=e.apply(r,t);function o(e){u(a,n,i,o,l,"next",e)}function l(e){u(a,n,i,o,l,"throw",e)}o(void 0)})}}var l=t(25),d=t(26),s=t(9),c=t(1),f=c.User,p=c.RegToken;function y(){return(y=o(regeneratorRuntime.mark(function e(r){var t,i,u,o,c,p;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.email,i=r.password,e.next=3,f.findOne({email:t});case 3:if(!(u=e.sent)||!d.compareSync(i,u.hash)){e.next=8;break}return o=u.toObject(),o.hash,c=a(o,["hash"]),p=l.sign({sub:u.id},s.secret),e.abrupt("return",n({},c,{token:p}));case 8:return e.abrupt("return",!0);case 9:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function m(){return(m=o(regeneratorRuntime.mark(function e(){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.find().select("-hash");case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function h(){return(h=o(regeneratorRuntime.mark(function e(r){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.findById(r).select("-hash");case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function g(){return(g=o(regeneratorRuntime.mark(function e(r){var t,n,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.findOne({email:r.email});case 2:if(!e.sent){e.next=4;break}throw new Error("Username ".concat(r.email," is already taken"));case 4:return e.next=6,p.findOne({email:r.email});case 6:if(t=e.sent,n=t.token,d.compareSync(r.regToken,n)){e.next=11;break}throw new Error("Invalid token");case 11:return i=new f(r),r.password1&&(i.hash=d.hashSync(r.password1,10)),e.next=15,i.save();case 15:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function b(){return(b=o(regeneratorRuntime.mark(function e(r,t){var n,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.findById(r);case 2:if(n=e.sent){e.next=5;break}throw new Error("User not found");case 5:return e.next=7,f.findOne({username:t.username});case 7:if(i=e.sent,n.username===t.username||!i){e.next=10;break}throw new Error("Username ".concat(t.username," is already taken"));case 10:return t.password&&(t.hash=d.hashSync(t.password,10)),Object.assign(n,t),e.next=14,n.save();case 14:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function v(){return(v=o(regeneratorRuntime.mark(function e(r){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.findByIdAndRemove(r);case 2:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}e.exports={authenticate:function(e){return y.apply(this,arguments)},getAll:function(){return m.apply(this,arguments)},getById:function(e){return h.apply(this,arguments)},create:function(e){return g.apply(this,arguments)},update:function(e,r){return b.apply(this,arguments)},delete:function(e){return v.apply(this,arguments)}}},function(e,r,t){function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var i=t(5);t(27).config();var a=t(28),u=t(29),o=t(30);i.connect("mongodb+srv://airlinedata:KyrMxr12Vi7UQTro@cluster0.8fh1d.mongodb.net/airlinedata?retryWrites=true&w=majority",{useNewUrlParser:!0,useUnifiedTopology:!0}).then(function(){return console.log("DB connected")}).catch(function(e){return console.error(e)}),i.Promise=global.Promise;var l=function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},i=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.forEach(function(r){n(e,r,t[r])})}return e}({User:a,RegToken:u},o);e.exports=l},function(e,r){e.exports=require("express")},function(e,r,t){function n(e,r,t,n,i,a,u){try{var o=e[a](u),l=o.value}catch(e){return void t(e)}o.done?r(l):Promise.resolve(l).then(n,i)}var i=t(24),a=t(9),u=t(0);function o(e,r,t){return l.apply(this,arguments)}function l(){var e;return e=regeneratorRuntime.mark(function e(r,t,n){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.getById(t.sub);case 2:if(e.sent){e.next=5;break}return e.abrupt("return",n(null,!0));case 5:return n(),e.abrupt("return",!0);case 7:case"end":return e.stop()}},e,this)}),(l=function(){var r=this,t=arguments;return new Promise(function(i,a){var u=e.apply(r,t);function o(e){n(u,i,a,o,l,"next",e)}function l(e){n(u,i,a,o,l,"throw",e)}o(void 0)})}).apply(this,arguments)}e.exports=function(){var e=a.secret;return i({secret:e,isRevoked:o}).unless({path:["/api/users/authenticate","/api/users/register","/login"]})}},function(e,r,t){function n(e,r,t,n,i,a,u){try{var o=e[a](u),l=o.value}catch(e){return void t(e)}o.done?r(l):Promise.resolve(l).then(n,i)}function i(e){return function(){var r=this,t=arguments;return new Promise(function(i,a){var u=e.apply(r,t);function o(e){n(u,i,a,o,l,"next",e)}function l(e){n(u,i,a,o,l,"throw",e)}o(void 0)})}}var a=t(1),u=t(33).validateRecord,o=t(34).cleanupRecord;function l(){return(l=i(regeneratorRuntime.mark(function e(r,t){var n,i,u,o,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={},Object.keys(r.query).forEach(function(e){n[e.slice(1)]=r.query[e]}),delete n.offset,delete n.limit,i=r.query._offset?parseInt(r.query._offset,10):0,(u=r.query._limit?parseInt(r.query._limit,10):20)>50&&(u=50),e.next=9,a[t].find().count();case 9:return o=e.sent,e.next=12,a[t].find(n).sort({_id:1}).skip(i).limit(u);case 12:return l=e.sent,e.abrupt("return",{metadata:{totalCount:o},records:l});case 14:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function d(){return(d=i(regeneratorRuntime.mark(function e(r,t){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a[t].findById(r).select("-hash");case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function s(){return(s=i(regeneratorRuntime.mark(function e(r,t){var n,i,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=Object.assign({},r),0===(i=u(n,t)).length){e.next=4;break}throw{message:i};case 4:return n.status="draft",n=o(n,t),l=new a[t](n),e.next=9,l.save();case 9:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function c(){return(c=i(regeneratorRuntime.mark(function e(r,t,n){var i,l,d,s,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(i=Object.assign({},t)).toSetStatus){e.next=4;break}return p(r,i,n),e.abrupt("return");case 4:if(0===(l=u(i)).length){e.next=7;break}throw{message:l};case 7:return d=o(i,n),s=a[n],e.next=11,s.findById(r);case 11:if(c=e.sent){e.next=14;break}throw new Error("Record not found");case 14:return d=Object.assign(c,d),e.next=17,d.save();case 17:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function f(){return(f=i(regeneratorRuntime.mark(function e(r,t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a[t].findByIdAndRemove(r);case 2:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function p(e,r,t){return y.apply(this,arguments)}function y(){return(y=i(regeneratorRuntime.mark(function e(r,t,n){var i,u,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i={active:"dateActivated",inactive:"dateDeactivated"}[t.status],e.next=4,a[n].findById(r);case 4:if(u=e.sent){e.next=7;break}throw new Error("Record not found");case 7:return(o=Object.assign(u,t))[i]=new Date,delete o.toSetStatus,e.next=12,o.save();case 12:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}e.exports={getAll:function(e,r){return l.apply(this,arguments)},getById:function(e,r){return d.apply(this,arguments)},create:function(e,r){return s.apply(this,arguments)},update:function(e,r,t){return c.apply(this,arguments)},delete:function(e,r){return f.apply(this,arguments)}}},function(e,r){e.exports=require("mongoose")},function(e,r,t){"use strict";t.r(r),t.d(r,"tables",function(){return n});var n=[{id:1,type:"defaultTable",header:"Fleet Identifiers",url:"fleet-identifiers",collection:"fleetidentifiers",fields:[{fieldName:"Aircraft Type",fieldKey:"aircraftType",fieldType:"aircraftSelect",required:!0,defaultValue:""},{fieldName:"Registration",fieldKey:"registration",fieldType:"string",required:!0,defaultValue:""},{fieldName:"MSN",fieldKey:"msn",fieldType:"string",required:!0,defaultValue:""},{fieldName:"Aircraft Name",fieldKey:"aircraftName",fieldType:"string",required:!0,defaultValue:""},{fieldName:"Remarks",fieldKey:"remarks",fieldType:"string",required:!0,defaultValue:""}]},{id:2,type:"defaultTable",header:"Aircraft Constants",url:"aircraft-constants",collection:"aircraftconstants",fields:[{fieldName:"Aircraft Type",fieldKey:"aircraftType",fieldType:"aircraftSelect",required:!0,defaultValue:""},{fieldName:"Reference Station",fieldKey:"referenceStation",fieldType:"number",required:!1,defaultValue:""},{fieldName:"K Constant",fieldKey:"kConstant",fieldType:"number",required:!0,defaultValue:""},{fieldName:"C Constant",fieldKey:"cConstant",fieldType:"number",required:!0,defaultValue:""},{fieldName:"Length of MAC",fieldKey:"lengthOfMAC",fieldType:"number",required:!0,defaultValue:""},{fieldName:"LEMAC",fieldKey:"lemac",fieldType:"number",required:!0,defaultValue:""}]},{id:3,type:"defaultTable",header:"BW/BI",url:"basic-weights",collection:"basicweights",fields:[{fieldName:"Registration",fieldKey:"registration",fieldType:"registrationSelect",required:!0,defaultValue:""},{fieldName:"BW",fieldKey:"weight",fieldType:"number",required:!0,defaultValue:""},{fieldName:"BI",fieldKey:"basicIndex",fieldType:"number",required:!0,defaultValue:""},{fieldName:"Balance Arm",fieldKey:"basicBalanceArm",fieldType:"number",required:!0,defaultValue:""},{fieldName:"Effective From",fieldKey:"effFrom",fieldType:"date",required:!1,defaultValue:null},{fieldName:"Effective To",fieldKey:"effTo",fieldType:"date",required:!1,defaultValue:null}]},{id:4,type:"crewSeatsTable",withMapping:!0,header:"Crew Seats",url:"crew-seats",collection:"crewseats",navGroup:"Cabin Fittings",fields:[{fieldName:"Aircraft Type",fieldKey:"aircraftType",fieldType:"aircraftConstantsSelect",required:!0,defaultValue:""},{fieldName:"Configuration Name",fieldKey:"configurationName",fieldType:"string",required:!0,defaultValue:""},{fieldName:"Grid",fieldKey:"grid",fieldType:"grid",required:"true",defaultValue:""}]},{id:5,type:"cabinTable",withMapping:!0,header:"Passenger Seats",url:"passenger-seats",collection:"passengerseats",navGroup:"Cabin Fittings",fields:[{fieldName:"Aircraft Type",fieldKey:"aircraftType",fieldType:"aircraftConstantsSelect",required:!0,defaultValue:""},{fieldName:"Configuration Name",fieldKey:"configurationName",fieldType:"string",required:!0,defaultValue:""},{fieldName:"Grid",fieldKey:"grid",fieldType:"grid",required:"true",defaultValue:""}]},{id:6,type:"potableWaterTable",withMapping:!0,header:"Potable Water Loc.",url:"potable-water-locations",collection:"potablewaterlocations",navGroup:"Cabin Fittings",fields:[{fieldName:"Aircraft Type",fieldKey:"aircraftType",fieldType:"aircraftConstantsSelect",required:!0,defaultValue:""},{fieldName:"Configuration Name",fieldKey:"configurationName",fieldType:"string",required:!0,defaultValue:""},{fieldName:"Grid",fieldKey:"grid",fieldType:"grid",required:"true",defaultValue:""}]},{id:7,type:"galleysTable",withMapping:!0,header:"Galleys & Other Loc.",url:"galleys-and-other-locations",collection:"galleysandotherlocations",navGroup:"Cabin Fittings",fields:[{fieldName:"Aircraft Type",fieldKey:"aircraftType",fieldType:"aircraftConstantsSelect",required:!0,defaultValue:""},{fieldName:"Configuration Name",fieldKey:"configurationName",fieldType:"string",required:!0,defaultValue:""},{fieldName:"Grid",fieldKey:"grid",fieldType:"grid",required:"true",defaultValue:""}]},{id:8,type:"collapsibleTable",withMapping:!0,header:"Maximum Weights",url:"maximum-weights",collection:"maximumweights",fields:[{fieldName:"Set Name",fieldKey:"setName",fieldType:"string",required:!0,defaultValue:""},{fieldName:"Aircraft Type",fieldKey:"aircraftType",fieldType:"aircraftConstantsSelect",required:!0,defaultValue:""},{fieldName:"MFW",fieldKey:"mfw",fieldType:"number",required:!1,defaultValue:""},{fieldName:"MZFW",fieldKey:"mzfw",fieldType:"number",required:!0,defaultValue:""},{fieldName:"MTOW",fieldKey:"mtow",fieldType:"number",required:!0,defaultValue:""},{fieldName:"MTW",fieldKey:"mtw",fieldType:"number",required:!0,defaultValue:""},{fieldName:"MLW",fieldKey:"mlw",fieldType:"number",required:!0,defaultValue:""},{fieldName:"Status",fieldKey:"status",fieldType:"string",required:!0,defaultValue:null}]},{id:9,type:"fuelTanksTable",withMapping:!0,header:"Fuel Data",url:"fuel-data",collection:"fueldata",fields:[{fieldName:"Aircraft Type",fieldKey:"aircraftType",fieldType:"aircraftConstantsSelect",required:!0,defaultValue:""},{fieldName:"Fuel Tanks Configuration Name",fieldKey:"tankName",fieldType:"string",required:!0,defaultValue:"",placeholder:'e.g. "ALL TANKS"'},{fieldName:"Fuel Density Range (kg/l) from",fieldKey:"FDRFrom",fieldType:"number",required:!0,defaultValue:"",range:{name:"fdr",type:"start"},maxLength:5,placeholder:.75},{fieldName:"Fuel Density Range to (kg/l)",fieldKey:"FDRTo",fieldType:"number",required:!0,defaultValue:"",range:{name:"fdr",type:"end"},maxLength:5,placeholder:.85},{fieldName:"Values Calculated at (kg/l)",fieldKey:"FDCalcAt",fieldType:"number",required:!0,defaultValue:"",maxLength:5,placeholder:.8},{fieldName:"Grid",fieldKey:"grid",fieldType:"grid",required:"true",defaultValue:""}]},{id:10,type:"collapsibleTable",withMapping:!0,header:"Pantry Weights",url:"pantry-weights",collection:"pantryweights",fields:[{fieldName:"Set Name",fieldKey:"setName",fieldType:"string",required:!0,defaultValue:""},{fieldName:"Aircraft Type",fieldKey:"aircraftType",fieldType:"aircraftConstantsSelect",required:!0,defaultValue:""},{fieldName:"Weight",fieldKey:"weight",fieldType:"number",required:!0,defaultValue:""},{fieldName:"Index",fieldKey:"index",fieldType:"number",required:!0,defaultValue:""},{fieldName:"Balance Arm",fieldKey:"balanceArm",fieldType:"number",required:!0,defaultValue:""}]},{id:11,type:"cargoHoldsTable",withMapping:!0,header:"Cargo Holds",url:"cargo-holds",collection:"cargoholds",fields:[{fieldName:"Aircraft Type",fieldKey:"aircraftType",fieldType:"aircraftConstantsSelect",required:!0,defaultValue:""},{fieldName:"Configuration Name",fieldKey:"configurationName",fieldType:"string",required:!0,defaultValue:""},{fieldName:"Grid",fieldKey:"grid",fieldType:"grid",required:"true",defaultValue:""}]},{id:12,type:"cgLimitsTable",withMapping:!0,header:"CG Limits",url:"cg-limits",collection:"cglimits",fields:[{fieldName:"Aircraft Type",fieldKey:"aircraftType",fieldType:"aircraftConstantsSelect",required:!0,defaultValue:""},{fieldName:"Limits Name",fieldKey:"limitsName",fieldType:"string",required:!0,defaultValue:""},{fieldName:"Grid Front",fieldKey:"gridFwd",fieldType:"grid",required:"true",defaultValue:""},{fieldName:"Grid Front",fieldKey:"gridAft",fieldType:"grid",required:"true",defaultValue:""}]},{id:13,type:"stabiliserTrimTable",withMapping:!0,header:"Stabiliser Trim",url:"stabiliser-trim",collection:"stabilisertrim",fields:[{fieldName:"Aircraft Type",fieldKey:"aircraftType",fieldType:"aircraftConstantsSelect",required:!0,defaultValue:""},{fieldName:"Flap Setting",fieldKey:"flapSetting",fieldType:"string",required:!0,defaultValue:""},{fieldName:"Thrust Rating",fieldKey:"thrustRating",fieldType:"string",required:!0,defaultValue:""},{fieldName:"Grid",fieldKey:"grid",fieldType:"grid",required:"true",defaultValue:""}]},{id:14,type:"defaultTable",header:"SWA",url:"swa",collection:"swa",fields:[{fieldName:"SWA Name",fieldKey:"swaName",fieldType:"string",required:!0,defaultValue:""},{fieldName:"Description",fieldKey:"description",fieldType:"string",required:!0,defaultValue:""},{fieldName:"Effective From",fieldKey:"effFrom",fieldType:"date",required:!1,defaultValue:null},{fieldName:"Effective To",fieldKey:"effTo",fieldType:"date",required:!1,defaultValue:null},{fieldName:"Weight",fieldKey:"weight",fieldType:"number",required:!0,defaultValue:""},{fieldName:"Index",fieldKey:"index",fieldType:"number",required:!0,defaultValue:""},{fieldName:"Balance Arm",fieldKey:"balanceArm",fieldType:"number",required:!0,defaultValue:""}]}]},function(e,r){e.exports=require("path")},function(e,r){e.exports=require("body-parser")},function(e){e.exports={connectionString:"mongodb://@ds131753.mlab.com:31753/airlinedata",secret:"secretstring",apiUrl:""}},function(e,r){e.exports=require("cors")},function(e,r,t){e.exports=t(35)},function(e,r,t){"use strict";t(13),t(14),t(15),t(16),t(17),t(18),t(19),t(20),t(21),t(22),t(23),global._babelPolyfill&&"undefined"!=typeof console&&console.warn&&console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended and may have consequences if different versions of the polyfills are applied sequentially. If you do need to load the polyfill more than once, use @babel/polyfill/noConflict instead to bypass the warning."),global._babelPolyfill=!0},function(e,r){e.exports=require("core-js/es6")},function(e,r){e.exports=require("core-js/fn/array/includes")},function(e,r){e.exports=require("core-js/fn/string/pad-start")},function(e,r){e.exports=require("core-js/fn/string/pad-end")},function(e,r){e.exports=require("core-js/fn/symbol/async-iterator")},function(e,r){e.exports=require("core-js/fn/object/get-own-property-descriptors")},function(e,r){e.exports=require("core-js/fn/object/values")},function(e,r){e.exports=require("core-js/fn/object/entries")},function(e,r){e.exports=require("core-js/fn/promise/finally")},function(e,r){e.exports=require("core-js/web")},function(e,r){e.exports=require("regenerator-runtime/runtime")},function(e,r){e.exports=require("express-jwt")},function(e,r){e.exports=require("jsonwebtoken")},function(e,r){e.exports=require("bcryptjs")},function(e,r){e.exports=require("dotenv")},function(e,r,t){var n=t(5),i=new(0,n.Schema)({email:{type:String,unique:!0,required:!0},hash:{type:String,required:!0},createdDate:{type:Date,default:Date.now}});i.set("toJSON",{virtuals:!0}),e.exports=n.model("User",i)},function(e,r,t){var n=t(5),i=new(0,n.Schema)({email:{type:String,unique:!0,required:!0},token:{type:String,required:!0}});i.set("toJSON",{virtuals:!0}),e.exports=n.model("RegToken",i)},function(e,r,t){var n=t(5),i=n.Schema,a=t(6).tables,u=t(31).mappingTable,o=t(32).fieldTypes,l={};a.forEach(function(e){var r={status:{type:String,reguired:!0},dateActivated:{type:Date,required:!1},dateDeactivated:{type:Date,required:!1}};e.fields.forEach(function(e){r[e.fieldKey]={type:o[e.fieldType],required:e.required}});var t=new i(r,{collection:e.collection});if(t.set("toJSON",{virtuals:!0}),l["/api/".concat(e.url)]=n.model(e.collection,t),!0===e.withMapping){var a={setId:{type:String,required:!0},status:{type:String,reguired:!0},dateActivated:{type:Date,required:!1},dateDeactivated:{type:Date,required:!1}};u.fields.forEach(function(e){a[e.fieldKey]={type:o[e.fieldType],required:e.required}});var d=new i(a,{collection:"".concat(e.collection,"mapping")});d.set("toJSON",{virtuals:!0}),l["/api/".concat(e.url,"-mapping")]=n.model("".concat(e.collection,"mapping"),d)}});var d={type:{type:String,reguired:!0},group:{type:String,reguired:!0},suffix:{type:String,reguired:!0}},s=new i(d,{collection:"aircrafttypes"});s.set("toJSON",{virtuals:!0}),l["/api/aircraft-types"]=n.model("aircrafttypes",s),e.exports=l},function(e,r,t){"use strict";t.r(r),t.d(r,"mappingTable",function(){return n});var n={type:"mappingTable",fields:[{fieldName:"Registration",fieldKey:"registration",fieldType:"select",required:!0,defaultValue:""},{fieldName:"Effective From",fieldKey:"effFrom",fieldType:"date",required:!0,defaultValue:null},{fieldName:"Effective To",fieldKey:"effTo",fieldType:"date",required:!1,defaultValue:null},{fieldName:"Status",fieldKey:"status",fieldType:"string",required:!0,defaultValue:null}]}},function(e,r,t){"use strict";t.r(r),t.d(r,"fieldTypes",function(){return n});var n={string:String,number:Number,radioDouble:Boolean,date:Date,select:String,aircraftSelect:String,aircraftConstantsSelect:String,registrationSelect:String,grid:Array}},function(e,r){e.exports={validateRecord:function(e,r){var t={"/api/maximum-weights":{registration:{required:!0,regex:/^[a-zA-Z0-9]{1,3}(-)?(–)?[a-zA-Z0-9]{1,9}$/,errorMessage:"Registration field must contain 3 to 12 characters, including a dash (optional)"},setName:{required:!0,regex:/^[a-zA-Z0-9]{1,3}(-)?(–)?[a-zA-Z0-9]{1,27}$/,errorMessage:"Set Name field must include 1 to 30 characters"},mfw:{required:!1,regex:/^\d{4,7}$/,errorMessage:"MFW from must be a valid number between 4 and 7 digits"},mzfw:{required:!0,regex:/^\d{4,7}$/,errorMessage:"MZFW from must be a valid number between 4 and 7 digits"},mtow:{required:!0,regex:/^\d{4,7}$/,errorMessage:"MTOW from must be a valid number between 4 and 7 digits"},mtw:{required:!0,regex:/^\d{4,7}$/,errorMessage:"MTW from must be a valid number between 4 and 7 digits"},mlw:{required:!0,regex:/^\d{4,7}$/,errorMessage:"MLW from must be a valid number between 4 and 7 digits"}}};if(!t.hasOwnProperty(r))return[];var n=[];return Object.keys(t[r]).forEach(function(i){var a=e[i],u=t[r][i];u.required?""!==a&&null!==a&&u.regex.test(a)||n.push(u.errorMessage):""!==a&&null!==a&&(u.regex.test(a)||n.push(u.errorMessage))}),n}}},function(e,r){e.exports={cleanupRecord:function(e,r){var t={"/api/maximum-weights":{setName:function(e){n.setName=e.toUpperCase()}}};if(!t.hasOwnProperty(r))return e;var n=Object.assign({},e);return Object.keys(t[r]).forEach(function(n){var i=e[n];(0,t[r][n])(i)}),n}}},function(e,r,t){"use strict";t.r(r);t(12);var n=t(7),i=t.n(n),a=t(2),u=t.n(a),o=t(10),l=t.n(o),d=t(8),s=t.n(d),c=t(3),f=t.n(c);var p=t(6),y=t(4),m=t.n(y);function h(){var e=u.a.Router();return e.post("/",g),e.get("/",b),e.get("/:id",v),e.put("/:id",w),e.delete("/:id",T),e}function g(e,r,t){var n=e.body,i=e.baseUrl;m.a.create(n,i).then(function(){return r.json({})}).catch(function(e){return t(e)})}function b(e,r,t){var n=e.baseUrl;m.a.getAll(e,n).then(function(e){return r.json(e)}).catch(function(e){return t(e)})}function v(e,r,t){var n=e.baseUrl,i=e.params.id;m.a.getById(i,n).then(function(e){return e?r.json(e):r.sendStatus(404)}).catch(function(e){return t(e)})}function w(e,r,t){var n=e.body,i=e.baseUrl,a=e.params.id;m.a.update(a,n,i).then(function(){return r.json({})}).catch(function(e){return t(e)})}function T(e,r,t){var n=e.baseUrl,i=e.params.id;m.a.delete(i,n).then(function(){return r.json({})}).catch(function(e){return t(e)})}var x=t(0),q=t.n(x);function N(e,r,t){q.a.authenticate(e.body).then(function(e){return e?r.json(e):r.status(400).json({message:"Username or password is incorrect"})}).catch(function(e){return t(e)})}function j(e,r,t){q.a.create(e.body).then(function(){return r.json({})}).catch(function(e){return t(e)})}function O(e,r,t){q.a.getAll().then(function(e){return r.json(e)}).catch(function(e){return t(e)})}function S(e,r,t){q.a.getById(e.user.sub).then(function(e){return e?r.json(e):r.sendStatus(404)}).catch(function(e){return t(e)})}function K(e,r,t){q.a.getById(e.params.id).then(function(e){return e?r.json(e):r.sendStatus(404)}).catch(function(e){return t(e)})}function V(e,r,t){q.a.update(e.params.id,e.body).then(function(){return r.json({})}).catch(function(e){return t(e)})}function k(e,r,t){q.a.delete(e.params.id).then(function(){return r.json({})}).catch(function(e){return t(e)})}var R=t(1),A=t.n(R);function P(e,r,t,n,i,a,u){try{var o=e[a](u),l=o.value}catch(e){return void t(e)}o.done?r(l):Promise.resolve(l).then(n,i)}function D(){var e;return e=regeneratorRuntime.mark(function e(r,t){var n,i,a,u;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.params.registration,e.next=3,A.a["/api/fleet-identifiers"].findOne({registration:n});case 3:return i=e.sent,a=i.aircraftType,e.next=7,A.a["/api/aircraft-constants"].findOne({aircraftType:a});case 7:u=e.sent,t.json(u);case 9:case"end":return e.stop()}},e,this)}),(D=function(){var r=this,t=arguments;return new Promise(function(n,i){var a=e.apply(r,t);function u(e){P(a,n,i,u,o,"next",e)}function o(e){P(a,n,i,u,o,"throw",e)}u(void 0)})}).apply(this,arguments)}function M(e,r,t,n,i,a,u){try{var o=e[a](u),l=o.value}catch(e){return void t(e)}o.done?r(l):Promise.resolve(l).then(n,i)}function E(){var e;return e=regeneratorRuntime.mark(function e(r,t){var n,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.params.aircraftType,e.next=3,A.a["/api/aircraft-constants"].findOne({aircraftType:n});case 3:i=e.sent,t.json(i);case 5:case"end":return e.stop()}},e,this)}),(E=function(){var r=this,t=arguments;return new Promise(function(n,i){var a=e.apply(r,t);function u(e){M(a,n,i,u,o,"next",e)}function o(e){M(a,n,i,u,o,"throw",e)}u(void 0)})}).apply(this,arguments)}var I,C,_=u()();_.use(l()()),_.use(s.a.urlencoded({extended:!1})),_.use(s.a.json()),_.use(u.a.static(i.a.join(process.env.PWD,"static"))),_.use("/api/users",f()()),_.use("/api/users",((I=u.a.Router()).post("/authenticate",N),I.post("/register",j),I.get("/",O),I.get("/current",S),I.get("/:id",K),I.put("/:id",V),I.delete("/:id",k),I)),_.use("/api/aircraft-types",f()()),_.use("/api/aircraft-types",h()),_.use("/api/fleet-identifiers/:registration/aircraft-constants",f()()),_.get("/api/fleet-identifiers/:registration/aircraft-constants",function(e,r){return D.apply(this,arguments)}),_.use("/api/aircraft-types/:aircraftType/aircraft-constants",f()()),_.get("/api/aircraft-types/:aircraftType/aircraft-constants",function(e,r){return E.apply(this,arguments)}),C=_,(_=p.tables.reduce(function(e,r){return e.use("/api/".concat(r.url),f()()),e.use("/api/".concat(r.url),h()),!0===r.withMapping&&e.use("/api/".concat(r.url,"-mapping"),h()),e},C)).get("/*",function(e,r){r.sendFile(i.a.resolve("./static/index.html"),function(e){e&&r.status(500).send(e)})}),_.use(function(e,r,t,n){return"string"==typeof e?t.status(400).json({message:e}):"ValidationError"===e.name?t.status(400).json({message:e.message}):"UnauthorizedError"===e.name?t.status(401).json({message:"Invalid Token"}):t.status(500).json({message:e.message})});var F=process.env.PORT||4e3;_.listen(F,function(){return console.log("Server listening on port ".concat(F))})}]));
//# sourceMappingURL=server.bundle.js.map