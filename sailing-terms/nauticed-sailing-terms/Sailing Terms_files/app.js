(function(e){function t(t){for(var n,r,l=t[0],s=t[1],d=t[2],c=0,u=[];c<l.length;c++)r=l[c],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&u.push(i[r][0]),i[r]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);g&&g(t);while(u.length)u.shift()();return a.push.apply(a,d||[]),o()}function o(){for(var e,t=0;t<a.length;t++){for(var o=a[t],n=!0,r=1;r<o.length;r++){var s=o[r];0!==i[s]&&(n=!1)}n&&(a.splice(t--,1),e=l(l.s=o[0]))}return e}var n={},i={app:0},a=[];function r(e){return l.p+"js/"+({goalExperienceDetails:"goalExperienceDetails",login:"login",nedNavigator:"nedNavigator",nedNavigatorToggle:"nedNavigatorToggle"}[e]||e)+".js"}function l(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,l),o.l=!0,o.exports}l.e=function(e){var t=[],o=i[e];if(0!==o)if(o)t.push(o[2]);else{var n=new Promise((function(t,n){o=i[e]=[t,n]}));t.push(o[2]=n);var a,s=document.createElement("script");s.charset="utf-8",s.timeout=120,l.nc&&s.setAttribute("nonce",l.nc),s.src=r(e);var d=new Error;a=function(t){s.onerror=s.onload=null,clearTimeout(c);var o=i[e];if(0!==o){if(o){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+n+": "+a+")",d.name="ChunkLoadError",d.type=n,d.request=a,o[1](d)}i[e]=void 0}};var c=setTimeout((function(){a({type:"timeout",target:s})}),12e4);s.onerror=s.onload=a,document.head.appendChild(s)}return Promise.all(t)},l.m=e,l.c=n,l.d=function(e,t,o){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(l.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(o,n,function(t){return e[t]}.bind(null,n));return o},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/",l.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var g=d;a.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("cd49")},"52dc":function(e,t,o){"use strict";o.d(t,"a",(function(){return n}));class n{getHeightContentBeforeBundles(){let e=0;if(document){const t=document.getElementsByClassName("l-presentation-box");if(t&&t.length&&t[0]instanceof HTMLElement){const o=t[0].offsetHeight;e+=o;const n=document.getElementsByClassName("main-section-block products");if(n&&n.length&&n[0]instanceof HTMLElement){const t=n[0].offsetHeight;e+=t}}}return e}getScrollbarWidth(){const e=document.createElement("div");e.style.visibility="hidden",e.style.width="100px",document.body.appendChild(e);const t=e.offsetWidth;e.style.overflow="scroll";const o=document.createElement("div");o.style.width="100%",e.appendChild(o);const n=o.offsetWidth;return e.parentNode&&e.parentNode.removeChild(e),t-n}addPaddingForScroll(){const e=this.getScrollbarWidth();document.body.style.paddingRight=e+"px"}removePaddingForScroll(){document.body.style.paddingRight="0"}showGoalWindow(){document.body.classList.remove("goal-window-collapsed"),document.body.classList.remove("goal-window-collapsing"),document.body.classList.add("goal-window-expanding"),document.body.classList.add("goal-window-expanded"),setTimeout((function(){document.body.classList.remove("goal-window-expanding")}),100)}hideGoalWindow(){document.body.classList.remove("goal-window-expanded"),document.body.classList.remove("goal-window-expanding"),document.body.classList.add("goal-window-collapsing"),document.body.classList.add("goal-window-collapsed"),setTimeout((function(){document.body.classList.remove("goal-window-collapsing")}),1e3),this.setGoalWindowStateAsClosed()}setGoalWindowStateAsClosed(){localStorage.setItem("isGoalWindowClosed","true")}getBodyPaddingRight(){return parseInt(window.getComputedStyle(document.body,null).getPropertyValue("padding-right"))}getBodyPaddingRightPx(){return this.getBodyPaddingRight()+"px"}calcPositionForGoalButton(){let e=0;if(document){const t=document.getElementsByClassName("l-header");if(t&&t.length&&t[0]instanceof HTMLElement){const o=t[0].offsetHeight,n=document.documentElement.scrollHeight,i=o/n,a=document.documentElement.scrollTop/n;e=a<=i?this.getPositionRight():20}}return e+this.getBodyPaddingRight()+"px"}getPositionRight(){let e=0;if(document){const t=document.documentElement.scrollWidth,o=document.getElementById("user-info"),n=o?o.offsetLeft:0,i=o?parseFloat(window.getComputedStyle(o).getPropertyValue("margin-left")):0,a=o?o.getBoundingClientRect().width:0,r=document.getElementById("col-site-info"),l=r?parseFloat(window.getComputedStyle(r,null).getPropertyValue("padding-right")):0,s=this.getBodyPaddingRight(),d=(t-(n-i+a+70+l)-s)/2;e=a+d+100}return e}}},cd49:function(e,t,o){"use strict";o.r(t);var n=o("2b0e"),i=o("6018"),a=function(){var e=this,t=e._self._c;e._self._setupProxy;return t(e.componentName,e._b({tag:"component"},"component",e.componentParams,!1))},r=[],l=o("9ab4"),s=o("1b40");let d=class extends s["d"]{};Object(l["a"])([Object(s["b"])()],d.prototype,"componentName",void 0),Object(l["a"])([Object(s["b"])()],d.prototype,"componentParams",void 0),d=Object(l["a"])([s["a"]],d);var c=d,g=c,u=o("0c7c"),p=Object(u["a"])(g,a,r,!1,null,null,null),m=p.exports,h=(o("88a7"),o("271a"),o("5494"),o("bc3a")),f=o.n(h);class w{constructor(){this.baseUrl=window.location.origin}getGoal(){return f.a.get(this.baseUrl+"/goals/get_goal")}setGoal(e){const t={headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}},o=new URLSearchParams;return o.append("goal",e.toString()),f.a.post(this.baseUrl+"/goals/update_goal",o,t)}setExperience(e){const t={headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}},o=new URLSearchParams;return o.append("exp",e.toString()),f.a.post(this.baseUrl+"/goals/update_exp",o,t)}getGoalsInfo(){return f.a.get(this.baseUrl+"/goals/get_json")}}var b=o("52dc"),y=o("2f62");n["a"].use(y["a"]);var v=new y["a"].Store({state:{hideNedButton:!1,initializedGoal:!1,initializedExperience:!1,initializedGoalsInfo:!1,goal:0,experience:0,goalsInfo:null,nedWizardStep:-1,nedWizardBack:!1,nedWindowIsOpen:!1,nedWindowButtonPositionRight:"",scrollWidth:""},mutations:{setHideNedButton(e,t){e.hideNedButton=t},setInitializedGoal(e){e.initializedGoal=!0},setInitializedExperience(e){e.initializedExperience=!0},setInitializedGoalsInfo(e){e.initializedGoalsInfo=!0},setGoal(e,t){e.goal=t},setExperience(e,t){e.experience=t},setGoalsInfo(e,t){e.goalsInfo=t},setNedWizardStep(e,t){e.nedWizardStep=t},setNedWizardBack(e,t){e.nedWizardBack=t},setNedWindowIsOpen(e,t){e.nedWindowIsOpen=t;const o=new b["a"];t?(o.showGoalWindow(),o.addPaddingForScroll()):(o.hideGoalWindow(),o.removePaddingForScroll()),e.nedWindowButtonPositionRight=o.calcPositionForGoalButton(),e.scrollWidth=o.getBodyPaddingRightPx()},setNedWindowButtonPositionRight(e,t){e.nedWindowButtonPositionRight=t},setScrollWidth(e,t){e.scrollWidth=t}},actions:{init(){this.dispatch("loadGoal"),this.dispatch("loadGoalsInfo")},loadGoal(){const e=new w;e.getGoal().then(e=>{let t=0,o="",n=0;var i,a;e&&e.data&&e.data.goal?(t=Number(e.data.goal),n=Number(e.data.exp),this.commit("setGoal",t),this.commit("setExperience",n),o=this.getters.convertGoalToString(t),localStorage.setItem("goalName",o),localStorage.setItem("experience",n.toString()),localStorage.setItem("isGoalWindowClosed","true")):(o=null!==(i=localStorage.getItem("goalName"))&&void 0!==i?i:"",n=Number(null!==(a=localStorage.getItem("experience"))&&void 0!==a?a:"0"),t=this.getters.convertGoalStringToNumber(o),this.commit("setGoal",t),this.commit("setExperience",n));let r=-1;t&&(r+=2,n&&r++),this.commit("setNedWizardStep",r),this.commit("setInitializedGoal"),this.commit("setInitializedExperience"),window.goalCoreInstance&&window.goalCoreInstance.refreshLayoutByGoal(o)}).catch(e=>{var t;console.error(e);const o=null!==(t=localStorage.getItem("goalName"))&&void 0!==t?t:"",n=this.getters.convertGoalStringToNumber(o);this.commit("setGoal",n),this.commit("setInitializedGoal"),window.goalCoreInstance&&window.goalCoreInstance.refreshLayoutByGoal(o)})},saveGoal(e,t){this.commit("setGoal",t);const o=this.getters.convertGoalToString(t);localStorage.setItem("goalName",o),this.commit("setExperience",0),localStorage.setItem("experience","0");const n=new w;n.setGoal(t).then(e=>{}).catch(e=>{console.error(e)})},saveExperience(e,t){this.commit("setExperience",t),localStorage.setItem("experience",t.toString());const o=new w;o.setExperience(t).then(e=>{}).catch(e=>{console.error(e)})},loadGoalsInfo(){const e=new w;e.getGoalsInfo().then(e=>{e&&e.data?this.commit("setGoalsInfo",e.data):console.error("Can't load goals info"),this.commit("setInitializedGoalsInfo")}).catch(e=>{console.error(e),this.commit("setInitializedGoalsInfo")})}},modules:{},getters:{getHideNedButton:e=>e.hideNedButton,getInitializedGoal:e=>e.initializedGoal,getInitializedExperience:e=>e.initializedExperience,getInitializedGoalsInfo:e=>e.initializedGoalsInfo,getGoal:e=>e.goal,getExperience:e=>e.experience,getGoalsInfo:e=>e.goalsInfo,getNedWizardStep:e=>e.nedWizardStep,getNedWizardBack:e=>e.nedWizardBack,getNedWindowIsOpen:e=>e.nedWindowIsOpen,getNedWindowButtonPositionRight:e=>e.nedWindowButtonPositionRight,getScrollWidth:e=>e.scrollWidth,convertGoalToString:(e,t)=>e=>{let t="";switch(e){case 10:t="goal-show-ropes";break;case 20:t="goal-better-sailor";break;case 30:t="goal-skipper";break;case 40:t="goal-beep-blue";break}return t},convertGoalStringToNumber:(e,t)=>e=>{let t=0;switch(e){case"goal-show-ropes":t=10;break;case"goal-better-sailor":t=20;break;case"goal-skipper":t=30;break;case"goal-beep-blue":t=40;break}return t}}}),x=o("7707"),G=o.n(x);G.a.polyfill(),n["a"].config.productionTip=!1,n["a"].use(i["b"]),n["a"].component("Login",()=>o.e("login").then(o.bind(null,"578a"))),n["a"].component("GoalExperienceDetails",()=>o.e("goalExperienceDetails").then(o.bind(null,"ddeb"))),n["a"].component("NedNavigator",()=>o.e("nedNavigator").then(o.bind(null,"ab97"))),n["a"].component("NedNavigatorToggle",()=>o.e("nedNavigatorToggle").then(o.bind(null,"43ac"))),n["a"].component("tippy",i["a"]),window.vuexStore=v;const S=()=>{const e=document.documentElement;e.style.setProperty("--app-height",window.innerHeight+"px")};function I(){return["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"ontouchend"in document}window.addEventListener("resize",S),S();const P=n["a"].extend(m);document.addEventListener("DOMContentLoaded",()=>{I()&&document.body.classList.add("ios"),document.querySelectorAll("[data-vue-component]").forEach(e=>{const t=new P({store:v,propsData:{componentName:e.getAttribute("data-vue-component"),componentParams:{params:e.getAttribute("data-vue-params")}}});t.$mount(),e.replaceWith(t.$el)}),v.dispatch("init")})}});
//# sourceMappingURL=app.js.map