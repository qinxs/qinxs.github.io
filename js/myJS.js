"use strict";!function(){var t=/mobile/i.test(window.navigator.userAgent);fetch("https://v1.hitokoto.cn/?max_length="+(t?10:20)).then(function(t){return t.json()}).then(function(t){window.hitokoto=t.hitokoto;try{document.getElementById("hitokoto").innerText=window.hitokoto}catch(t){}}).catch(function(t){console.error(t)})}();const sitetime=document.getElementById("sitetime");function createtime(){var t=new Date("06/26/2020 00:00:00"),e=new Date,n=e.getFullYear(),o=n-t.getFullYear(),n=(t.setFullYear(n)>e.getTime()?(o--,t.setFullYear(n-1)):t.setFullYear(n),Math.floor((e-t)/864e5)),a=r(e.getHours()-t.getHours(),"h"),i=r(e.getMinutes()-t.getMinutes()),e=r(e.getSeconds()-t.getSeconds());function r(t,e){return(t=t<0?"h"==e?t+24:t+60:t)<10?"0"+t:t}t=0<o?o+" 年":"";sitetime.innerHTML=t+` ${n} 天 ${a} 小时 ${i} 分 ${e} 秒`}function loadJs(t,e){var n=document.createElement("script");n.defer=!0,n.src=t,"function"==typeof e&&(n.onload=n.onreadystatechange=function(){this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(e(),n.onload=n.onreadystatechange=null)}),document.head.appendChild(n)}setInterval("createtime()",1e3),/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&(window.onload=function(){document.addEventListener("touchstart",function(t){1<t.touches.length&&t.preventDefault()});var n=0;document.addEventListener("touchend",function(t){var e=(new Date).getTime();e-n<=300&&t.preventDefault(),n=e},!1)}),/mobile/i.test(window.navigator.userAgent)||loadJs("https://cdn.jsdelivr.net/gh/qinxs/cdn-assets/js/clicklove-piao.js");