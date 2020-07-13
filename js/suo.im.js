function dwz() {
  'use strict';
  const suo_now = true; /*打开时直接压缩window.location.href*/
  const suo_api = 'https://suo.im/api.htm';
  const suo_key = '5f0729c5b1b63c45d0cb8173@ae63a2ad212f6e56088ab7814732c4c0';
  const dq = css => document.querySelector(css);

  let suoIm = {
    show: function() {
      let content = '也可以输入长网址：';
      let css = `<style>
        .dialog-container {
          position: fixed;
          top: 25px;
          width: 40%;
          min-width:300px;
          margin: 0 auto;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: #fff;
          z-index: 99999;
        }
        .ctrlV-content {padding: 10px;}
        .btns {
          float: right;
          margin-right: 20px;
          margin-bottom: 10px;
        }
        .long-url {
          display: block;
          width: 98%;
          margin-top: 10px;
          padding-left: 0.3em;
          border: 1px solid #ddd;
          border-radius: 4px;
          line-height: 28px;
        }
        .mybtn {
          width: 80px;
          margin-right: 6px;
          padding: 0 !important;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: #981a1a;
          color: #fff;
          line-height: 28px;
        }
        .mybtn:hover {background-color: #0371df !important;}
        #cancel {background: #2d2d2d;}
      </style>`;
      let html = `
        <div class='dialog-container'>
            <div class='ctrlV-content'>${content}
                <input class='long-url' value='' placeholder='为空则默认为当前网址'>
            </div>
            <div class='btns'>
                <button id='generate' class='mybtn'>生成</button>
                <button id='copy' class='mybtn'>复制</button>
                <button id='cancel' class='mybtn'>取消</button>
            </div>
        </div>
      `;
      dq('head').insertAdjacentHTML('beforeend', css);
      dq('body').insertAdjacentHTML('beforeend', html);
      setTimeout(() => {
          dq('.long-url').focus();
      }, 50);
      let screenWidth = window.screen.width;
      let _left = (screenWidth - (dq('.dialog-container').offsetWidth)) / 2;
      dq('.dialog-container').style.marginLeft = _left + 'px';
      suo_now && this.shortUrl(window.location.href);
      dq('.btns').addEventListener('click', this.handle);
    },

    handle: function() {
      if (!event.target.id) return;
      let url = dq('.long-url').value || window.location.href;
      let button = event.target.id;
      if (button == 'generate'){
          suoIm.shortUrl(url);
      } else {
        if (button == 'copy' && !dq('.long-url').value){
          dq('.long-url').setAttribute('placeholder','请先点 [生成] 后再复制');
          return;
        }
        dq('.dialog-container').remove();
        dq('style:last-child').remove();
      }
    },
    
    shortUrl: function(long_url) {
      /*
      let long_url = 'https://www.bilibili.com/video/BV1EW411u7th?p=1';
      */
      this.jsonp({
        format:'jsonp',
        key: suo_key,
        expireDate:'2030-03-31',
        url: encodeURIComponent(long_url)
      },'jsoncallback');
    },

    jsonp: function(data, callback) {
        let queryString = '?';
        for(let k in data){
          queryString += k + '=' + data[k] + '&';
        }
        /*回调函数*/
        let _url = suo_api + queryString + 'callback=' + callback;  
        let head = document.getElementsByTagName('head')[0];
        let script = document.createElement('script');
        head.appendChild(script);
        /*创建jsonp回调函数*/
        window[callback] = json => {
          dq('.long-url').value = json.url;
          dq('.long-url').select();
          dq('#copy').addEventListener('click', this.copyText);
          head.removeChild(script);
          window[callback] = null;
        };
        /*发送请求*/
        script.src = _url;
    },

    copyText: function() {
      let ele = dq('.long-url');
      if (navigator.userAgent.match(/ipad|iphone/i)) {
        let range = document.createRange();
        range.selectNode(ele);
        window.getSelection().addRange(range);
        document.execCommand('copy');

        /*Remove the selections - NOTE: Should use*/
        window.getSelection().removeAllRanges();
      } else {
        ele.focus();
        ele.select();
        document.execCommand('copy');
      }
    }
  };

  suoIm.show();

};