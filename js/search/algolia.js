var AlgoliaSearch,SearchService="";!function(e){SearchService=function(a){var n=this;n.config=e.extend({per_page:10,selectors:{body:"body",form:".u-search-form",input:".u-search-input",container:"#u-search",modal:"#u-search .modal",modal_body:"#u-search .modal-body",modal_footer:"#u-search .modal-footer",modal_overlay:"#u-search .modal-overlay",modal_results:"#u-search .modal-results",modal_metadata:"#u-search .modal-metadata",modal_error:"#u-search .modal-error",modal_loading_bar:"#u-search .modal-loading-bar",modal_ajax_content:"#u-search .modal-ajax-content",modal_logo:"#u-search .modal-footer .logo",btn_close:"#u-search .btn-close",btn_next:"#u-search .btn-next",btn_prev:"#u-search .btn-prev"},brands:{hexo:{logo:"",url:""},google:{logo:"google.svg",url:"https://cse.google.com"},algolia:{logo:"algolia.svg",url:"https://www.algolia.com"},baidu:{logo:"baidu.svg",url:"http://zn.baidu.com/cse/home/index"},azure:{logo:"azure.svg",url:"https://azure.microsoft.com/en-us/services/search/"}},imagePath:"https://cdn.jsdelivr.net/gh/volantis-x/cdn-volantis@master/img/logo/"},a),n.dom={},n.percentLoaded=0,n.open=!1,n.queryText="",n.nav={next:-1,prev:-1,total:0,current:1},n.parseSelectors=function(){for(var a in n.config.selectors)n.dom[a]=e(n.config.selectors[a])},n.beforeQuery=function(){n.open||n.dom.container.fadeIn(),n.dom.input.each(function(a,o){e(o).val(n.queryText)}),document.activeElement.blur(),n.dom.modal_error.hide(),n.dom.modal_ajax_content.removeClass("loaded"),n.startLoading()},n.afterQuery=function(){n.dom.modal_body.scrollTop(0),n.dom.modal_ajax_content.addClass("loaded"),n.stopLoading()},n.search=function(a,o){n.beforeQuery(),n.search instanceof Function?n.query(n.queryText,a,function(){n.afterQuery()}):(console.log("query() does not exist."),n.onQueryError(n.queryText,""),n.afterQuery())},n.onQueryError=function(a,o){var e="",e="success"===o?'No result found for "'+a+'".':"timeout"===o?"Unfortunate timeout.":"Mysterious failure.";n.dom.modal_results.html(""),n.dom.modal_error.html(e),n.dom.modal_error.show()},n.nextPage=function(){-1!==n.nav.next&&n.search(n.nav.next)},n.prevPage=function(){-1!==n.nav.prev&&n.search(n.nav.prev)},n.getUrlRelativePath=function(a){var o=a.split("//"),a=o[1].indexOf("/"),a=o[1].substring(a);return a=-1!=a.indexOf("?")?a.split("?")[0]:a},n.buildResult=function(a,o,e){var t="",t="<li>";return t+="<a class='result' href='"+n.getUrlRelativePath(a)+"'>",t+="<span class='title'>"+o+"</span>",""!==e&&(t+="<span class='digest'>"+e+"</span>"),t+="</a>",t+="</li>"},n.close=function(){n.open=!1,n.dom.container.fadeOut(),n.dom.body.removeClass("modal-active")},n.onSubmit=function(a){a.preventDefault(),n.queryText=e(this).find(".u-search-input").val(),n.queryText&&n.search(1)},n.startLoading=function(){n.dom.modal_loading_bar.show(),n.loadingTimer=setInterval(function(){n.percentLoaded=Math.min(n.percentLoaded+5,95),n.dom.modal_loading_bar.css("width",n.percentLoaded+"%")},100)},n.stopLoading=function(){clearInterval(n.loadingTimer),n.dom.modal_loading_bar.css("width","100%"),n.dom.modal_loading_bar.fadeOut(),setTimeout(function(){n.percentLoaded=0,n.dom.modal_loading_bar.css("width","0%")},300)},n.addLogo=function(a){var o="";n.config.brands[a]&&n.config.brands[a].logo&&(o+="<a href='"+n.config.brands[a].url+"' class='"+a+"'>",o+='<img src="'+n.config.imagePath+n.config.brands[a].logo+'" />',n.dom.modal_logo.html(o+="</a>"))},n.destroy=function(){n.dom.form.each(function(a,o){e(o).off("submit")}),n.dom.modal_overlay.off("click"),n.dom.btn_close.off("click"),n.dom.btn_next.off("click"),n.dom.btn_prev.off("click"),n.dom.container.remove()},n.init=function(){e("body").append(o),n.parseSelectors(),n.dom.modal_footer.show(),n.dom.form.each(function(a,o){e(o).on("submit",n.onSubmit)}),n.dom.modal_overlay.on("click",n.close),n.dom.btn_close.on("click",n.close),n.dom.btn_next.on("click",n.nextPage),n.dom.btn_prev.on("click",n.prevPage)},n.init()};var o='<div id="u-search"><div class="modal"> <header class="modal-header" class="clearfix"><form id="u-search-modal-form" class="u-search-form" name="uSearchModalForm"> <input type="text" id="u-search-modal-input" class="u-search-input" /> <button type="submit" id="u-search-modal-btn-submit" class="u-search-btn-submit"> <span class="fas fa-search"></span> </button></form> <a class="btn-close"> <span class="fas fa-times"></span> </a><div class="modal-loading"><div class="modal-loading-bar"></div></div> </header> <main class="modal-body"><ul class="modal-results modal-ajax-content"></ul> </main> <footer class="modal-footer clearfix"><div class="modal-metadata modal-ajax-content"> <strong class="range"></strong> of <strong class="total"></strong></div><div class="modal-error"></div> <div class="logo"></div> <a class="nav btn-next modal-ajax-content"> <span class="text">NEXT</span> <span class="fal fa-chevron-right"></span> </a> <a class="nav btn-prev modal-ajax-content"> <span class="fal fa-chevron-left"></span> <span class="text">PREV</span> </a> </footer></div><div class="modal-overlay"></div></div>'}(jQuery),function(e){"use strict";AlgoliaSearch=function(a){SearchService.apply(this,arguments);var r=this,o="https://"+r.config.appId+"-dsn.algolia.net/1/indexes/"+r.config.indexName;return r.addLogo("algolia"),r.buildResultList=function(a){var t="";return e.each(a,function(a,o){var e=o.permalink||o.path||"";!o.permalink&&o.path&&(e=ROOT+e);o=o.title;t+=r.buildResult(e,o,"",a+1)}),t+="<script>try{pjax.refresh(document.querySelector('#u-search'));document.addEventListener('pjax:send',function(){$('#u-search').fadeOut(500);$('body').removeClass('modal-active')});}catch(e){$('#u-search').fadeOut(500);}<\/script>"},r.buildMetadata=function(a){r.nav.current=a.page*a.hitsPerPage+1,r.nav.currentCount=a.hits.length,r.nav.total=parseInt(a.nbHits),r.dom.modal_metadata.children(".total").html(r.nav.total),r.dom.modal_metadata.children(".range").html(r.nav.current+"-"+(r.nav.current+r.nav.currentCount-1)),0<r.nav.total?r.dom.modal_metadata.show():r.dom.modal_metadata.hide(),a.page<a.nbPages-1?(r.nav.next=a.page+1+1,r.dom.btn_next.show()):(r.nav.next=-1,r.dom.btn_next.hide()),0<a.page?(r.nav.prev=a.page+1-1,r.dom.btn_prev.show()):(r.nav.prev=-1,r.dom.btn_prev.hide())},r.query=function(t,a,n){e.get(o,{query:t,page:a-1,hitsPerPage:r.config.per_page,"x-algolia-application-id":r.config.appId,"x-algolia-api-key":r.config.apiKey},function(a,o){var e;"success"===o&&a.hits&&0<a.hits.length?(e=r.buildResultList(a.hits),r.dom.modal_results.html(e)):r.onQueryError(t,o),r.buildMetadata(a),n&&n(a)})},r}}(jQuery);