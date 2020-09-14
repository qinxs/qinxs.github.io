var customSearch;const isMobile=/mobile/i.test(window.navigator.userAgent);if(function(e){"use strict";var t=80,a=e(".l_header");function o(a,o=t){const n=a.href?e(decodeURI(a.getAttribute("href"))):e(a);e("html, body").animate({scrollTop:n.offset().top-o},500)}function n(){const t=e(".menu .active"),n=e(".s-top"),i=e("h1.title","#header-meta"),l=e(".safearea");t.length&&l&&t.click(e=>{e.preventDefault(),e.stopPropagation(),"/"!=t.attr("href")&&o(l),e.stopImmediatePropagation(),t.unbind("click")}),i.length&&l&&i.click(e=>{e.preventDefault(),e.stopPropagation(),o(l),e.stopImmediatePropagation(),i.unbind("click")}),n.length&&l&&n.click(e=>{e.preventDefault(),e.stopPropagation(),o(l),e.stopImmediatePropagation()});const c=e(".cover-wrapper");var r=e("#pjax-enable-cover").text(),s=0;c[0]&&"true"==r&&"none"!==e(".cover-wrapper#half").css("display")&&(s=c[0].clientHeight-240);var d=document.body.scrollTop;"true"==r&&"none"===e(".cover-wrapper#half").css("display")&&(d+=240),e(document,window).scroll(()=>{let t=e(window).scrollTop();"true"==r&&"none"===e(".cover-wrapper#half").css("display")&&(t+=240);const o=t-d;d=t,t>240?(n.addClass("show"),o>0?n.removeClass("hl"):n.addClass("hl")):n.removeClass("show").removeClass("hl"),t-s>-1?a.addClass("show"):a.removeClass("show")})}function i(){if("true"==e.trim(e("#pjax-ispage").text())&&(window.subData={title:e.trim(e("#pjax-pageTitle").text()),tools:!0}),!window.subData)return;const t=e("header .wrapper"),a=e(".s-comment",t),n=e(".s-toc",t);t.find(".nav-sub .title").text(window.subData.title);let i=document.body.scrollTop;e(document,window).scroll(()=>{const a=e(window).scrollTop(),o=a-i;o>=50&&a>100?(i=a,t.addClass("sub")):o<=-50&&(i=a,t.removeClass("sub"))}),e(".l_body article#comments").length?a.click(t=>{t.preventDefault(),t.stopPropagation(),o(e(".l_body article#comments")),t.stopImmediatePropagation()}):a.remove();const l=e(".l_body .toc-wrapper");l.length&&l.children().length?(n.click(e=>{e.stopPropagation(),l.toggleClass("active"),n.toggleClass("active")}),e(document).click(function(e){e.stopPropagation(),l.removeClass("active"),n.removeClass("active")}),e(document,window).scroll(()=>{l.removeClass("active"),n.removeClass("active")})):n.remove()}function l(){var t=e("body .navigation");t.find("li a.active").removeClass("active"),t.find("div a.active").removeClass("active");var a=null,o=location.pathname.replace(/\/|%|\./g,"");0==o.length&&(o="home");var n=o.match(/page\d{0,}$/g);n&&(n=n[0],o=o.split(n)[0]);var i,l=o.match(/index.html/);l&&(l=l[0],o=o.split(l)[0]),o&&t&&(a=e("#"+o,t),(i=a)&&i.length&&i.addClass("active").siblings().removeClass("active"))}function c(){isMobile&&(e(document).click(function(t){e(".m-phone .list-v").hide()}),e(window).scroll(()=>{e(".m-phone .list-v").hide()}))}function r(){const a=e(".toc-wrapper");if(0===a.length)return;a.click(e=>{e.stopPropagation(),a.addClass("active")}),e(document).click(()=>a.removeClass("active")),a.on("click","a",t=>{t.preventDefault(),t.stopPropagation(),"A"===t.target.tagName?o(t.target,0):"SPAN"===t.target.tagName&&o(t.target.parentElement,0),a.removeClass("active");const n=e(".s-toc");n.length>0&&n.removeClass("active")});let n=Array.from(a.find("li a")),i=()=>n.map(a=>Math.floor(e(decodeURI(a.getAttribute("href"))).offset().top-t)),l=i(),c=e(document).height(),r=()=>{let t=e("html").scrollTop()||e("body").scrollTop();if(e(document).height()!=c&&(t=e("html").scrollTop()||e("body").scrollTop(),c=e(document).height(),l=i()),!l)return;let a,o=0,r=l.length-1;for(;o<r;)l[a=o+r+1>>1]===t?o=r=a:l[a]<t?o=a:r=a-1;e(n).removeClass("active").eq(o).addClass("active")};e(window).scroll(()=>{r()});let s=null;e(window).bind("resize",function(){s&&clearTimeout(s),s=setTimeout(function(){l=i(),r()},100)}),r()}function s(){const t=e(".tabs");if(0===t.length)return;let a=t.find(".nav-tabs .tab");for(var o=0;o<a.length;o++){let e=t.find(a[o].children[0]);e.addClass(e.attr("href")),e.removeAttr("href")}e(".tabs .nav-tabs").on("click","a",t=>{t.preventDefault(),t.stopPropagation();let a=e(t.target.parentElement.parentElement.parentElement);return a.find(".nav-tabs .active").removeClass("active"),a.find(t.target.parentElement).addClass("active"),a.find(".tab-content .active").removeClass("active"),a.find(e(t.target).attr("class")).addClass("active"),!1})}a[0]&&(t=a[0].clientHeight+16),e(function(){var d,p,h;i(),l(),isMobile?e(".m-phone li").click(function(t){t.stopPropagation(),e(e(t.currentTarget).children("ul")).show()}):e(".m-pc li > a[href]").parent().click(function(t){t.stopPropagation(),t.target.origin==t.target.baseURI&&e(".m-pc .list-v").hide()}),c(),d=e(".l_header .switcher .s-search"),p=e(".l_header"),h=e(".l_header .m_search"),0!==d.length&&(d.click(function(e){e.stopPropagation(),p.toggleClass("z_search-open"),d.toggleClass("active"),h.find("input").focus()}),e(document).click(function(e){p.removeClass("z_search-open"),d.removeClass("active")}),h.click(function(e){e.stopPropagation()}),p.ready(function(){p.bind("keydown",function(e){if(9==e.keyCode)return!1;var t,a,o=!!document.all;o?(t=window.event.keyCode,a=window.event):(t=e.which,a=e),9==t&&(o?(a.keyCode=0,a.returnValue=!1):(a.which=0,a.preventDefault()))})})),r(),n(),s(),e(".scroll-down").on("click",function(){o(".safearea")});try{document.addEventListener("pjax:complete",function(){e(function(){t=80,(a=e(".l_header"))[0]&&(t=a[0].clientHeight+16),i(),l(),c(),r(),n(),s();var o=e(".l_header .switcher .s-search"),d=e(".l_header");0!==o.length&&e(document).click(function(e){d.removeClass("z_search-open"),o.removeClass("active")})})})}catch(e){}})}(jQuery),window.location.hash)var checkExist=setInterval(function(){"undefined"!=typeof jQuery&&$("#"+decodeURI(window.location.hash.split("#")[1]).replace(/\ /g,"-")).length&&($("html, body").animate({scrollTop:$("#"+decodeURI(window.location.hash.split("#")[1]).replace(/\ /g,"-")).offset().top-40},500),clearInterval(checkExist))},100);