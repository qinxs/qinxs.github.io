const $=e=>document.querySelector(e);var testCode=`
/*
 * @name: alookTest测试
 * @Author: qinxs
 * @version: 1.0.0
 * @description: 测试脚本
 * @include: *
 */
(function() {
  alert(111);
  console.log(222);
})();
`,base64=new Base64,codeEle=$(".textbox"),fromUrl=new URLSearchParams(location.search).get("u");fromUrl?fetch(fromUrl).then(e=>e.text()).then(e=>codeEle.textContent=e):codeEle.textContent=testCode.trimStart();class Button{constructor(e){(this._elem=e).onclick=this.onClick.bind(this)}reload(){location.reload()}install(){var e=scriptInfo(),t=JSON.stringify(e),o=base64.encode(t);console.log(e),console.log(t),console.log(o),window.via&&"function"==typeof window.via.addon&&window.via.addon(o)}paste(){alert("paste")}onClick(e){e=e.target.dataset.action;e&&this[e]()}}function scriptInfo(){var e=codeEle.textContent,t=e.match(/\/\*([\s\S]*)\*\//g)[0],o=e=>{e=new RegExp(`${e}:(.*)`,"i");return t.match(e)[1].trim()};return console.log("name:",base64.utf8_encode(o("name"))),{id:1,name:base64.utf8_encode(o("name")),author:base64.utf8_encode(o("author")),url:o("include"),code:base64.encode(e)}}function Base64(){_keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",this.encode=function(e){var t,o,n,r,a,c,u="",i=0;for(e=this.utf8_encode(e);i<e.length;)n=(c=e.charCodeAt(i++))>>2,r=(3&c)<<4|(t=e.charCodeAt(i++))>>4,a=(15&t)<<2|(o=e.charCodeAt(i++))>>6,c=63&o,isNaN(t)?a=c=64:isNaN(o)&&(c=64),u=u+_keyStr.charAt(n)+_keyStr.charAt(r)+_keyStr.charAt(a)+_keyStr.charAt(c);return u},this.utf8_encode=function(e){return e.replace(/([\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF])/g,e=>"\\u"+e.charCodeAt(0).toString(16))}}new Button($(".btns"));