const IssuesAPI={requestIssuesAPI(a,r,l){let o=10;!function n(){return new Promise((s,e)=>{let t=0,i=setTimeout(()=>{0===t&&(t=2,i=null,e("请求超时"),0==o&&l())},5e3);fetch(a).then(function(e){if(2!==t&&(clearTimeout(i),s(e),i=null,t=1),e.ok)return e.json();throw new Error("Network response was not ok.")}).then(function(e){o=0,r(e)}).catch(function(e){0<o?(--o,setTimeout(()=>{n()},5e3)):l()})})}()},parseIssueStrToJson(e){let s=e.match(/```json[\s|\S]*```/);if(s&&0<s.length&&(s=s[0]),s&&(s=s.split("```json")[1].split("```")[0],s))return JSON.parse(s)},groupIssuesData(s,t){var n=new Object;if(0<t.length)if(null!=s.group){var a=s.group.split(":");if(1<a.length){var r=a[0];let e=a[1];for(r&&e&&(e=e.split(",")),s.group=e,i=0;i<t.length;i++){var l=this.parseIssueStrToJson(t[i].body);if(l&&r in l){let s=l[r];s=s.replace(", ",",").split(",");for(var o=0;o<s.length;o++)if(e.includes(s[o])){let e=n[s[o]];null==e&&(e=new Array),e.push(l),n[s[o]]=e}}}}}else for(s.group=[""],i=0;i<t.length;i++){var p=this.parseIssueStrToJson(t[i].body);if(p){let e=n[""];null==e&&(e=new Array),e.push(p),n[""]=e}}return n},getIssuesAPIForSites(t){let r=$(t.el)[0];$(r).append('<div class="loading"><i class="fa fa-cog fa-2x fa-spin"></i><p>正在加载</p></div>'),this.requestIssuesAPI(t.api,function(e){$(r).find(".loading").remove();let s=IssuesAPI.groupIssuesData(t,e),a=Object.keys(s);t.group.forEach((e,t)=>{var i=s[e];if(i&&0<i.length)for(0<e.length?$(r).append("<h2>"+e+"</h2>"):""==name&&1<a.length&&$(r).append("<h2>未分组</h2>"),$(r).append('<div class="site-card-group '+t+'"></div>'),j=0;j<i.length;j++){var n=i[j];let e="";e=n.screenshot&&0<n.screenshot.length?'<div class="img"><img src="'+n.screenshot+'" onerror="javascript:this.src=\'https://image.thum.io/get/width/1024/crop/768/'+n.url+"';\"/></div>":'<div class="img"></div>';let s='<div class="info">';n.avatar&&0<n.avatar.length&&(s+='<img src="'+n.avatar+'" onerror="javascript:this.src=\'https://image.thum.io/get/width/1024/crop/768/'+n.url+"';\"/>"),s+='<span class="title">'+n.title+'</span><span class="desc">'+n.description+"</span></div>";n="<a class='site-card' target='_blank' href='"+n.url+"'>"+e+s+"</a>";$(r).find(".site-card-group."+t).append(n)}})},function(){$(r).find(".loading i").remove(),$(r).find(".loading p").text("加载失败，请稍后重试。")})},getIssuesAPIForTimeline(e){let t=$(e.el)[0];$(t).append('<div class="loading"><i class="fa fa-cog fa-2x fa-spin"></i><p>正在加载</p></div>'),this.requestIssuesAPI(e.api,function(e){if($(t).find(".loading").remove(),0<e.length)for(i=0;i<e.length;i++){var s='&nbsp;&nbsp;<a class="comments" target="_blank" href="'+e[i].html_url+'"><i class="fa fa-comment-dots fa-fw"></i>'+e[i].comments+"</a>",s='<div class="timenode">'+('<div class="meta"><p></p><p>'+e[i].title+s+"</p><p></p></div>")+('<div class="body"><p>'+e[i].body+"</p></div>")+"</div>";$(t).append(s)}},function(){$(t).find(".loading i").remove(),$(t).find(".loading p").text("加载失败，请稍后重试。")})},request(){for(var s=document.getElementsByClassName("issues-api"),t=0;t<s.length;t++){let e=s[t];var i=e.getAttribute("api"),n=e.getAttribute("group"),a=new Object;a.class=e.getAttribute("class"),a.el=e,a.api=i,a.group=n,a.class.split(" ").includes("sites")?this.getIssuesAPIForSites(a):a.class.split(" ").includes("timeline")&&this.getIssuesAPIForTimeline(a)}}};IssuesAPI.request(),document.addEventListener("pjax:complete",function(){IssuesAPI.request()});