const $ = css => document.querySelector(css);

var testCode = `
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
`;

var base64 = new Base64();

var codeEle = $('.textbox');

var fromUrl = new URLSearchParams(location.search).get('u');
if (fromUrl) {
    fetch(fromUrl)
      .then(response => response.text())
      .then(text => codeEle.textContent = text);
} else {
    codeEle.textContent = testCode.trimStart();
}

class Button {
  constructor(elem) {
    this._elem = elem;
    elem.onclick = this.onClick.bind(this); // (*)
  }

  reload() {
    location.reload();
  }

  install() {
    // alert('install');
    var script = scriptInfo();
    var jsonStr = JSON.stringify(script);
    var base64Str = base64.encode(jsonStr);
    console.log(script);
    console.log(jsonStr);
    console.log(base64Str);
    // var base64Str = 'eyJpZCI6MSwibmFtZSI6ImFsb29rVXJsXHU2ZDRiXHU4YmQ1IiwiYXV0aG9yIjoicWlueHMiLCJ1cmwiOiIqIiwiY29kZSI6Ikx5b0tJQ29nUUc1aGJXVTZJR0ZzYjI5clZYSnNYSFUyWkRSaVhIVTRZbVExQ2lBcUlFQkJkWFJvYjNJNklIRnBibmh6Q2lBcUlFQjJaWEp6YVc5dU9pQXhMakF1TUFvZ0tpQkFaR1Z6WTNKcGNIUnBiMjQ2SUZ4MU9HWmtPVngxTmpZeVpseDFOamMyTlZ4MU9ERm1NM1Z5YkZ4MU56WTRORngxT0RFeFlWeDFOamN5WXdvZ0tpQkFhVzVqYkhWa1pUb2dLZ29nS2k4S0tHWjFibU4wYVc5dUtDa2dld29nSUdGc1pYSjBLQ2QxY213bktUc0tJQ0JqYjI1emIyeGxMbXh2Wnlnek16TXBPd3A5S1NncE93PT0ifQ==';
    if (window.via && typeof window.via.addon === "function") {
        window.via.addon(base64Str);
    } else {
        // alert('您的浏览器不支持安装此插件')
    }
  }

  paste() {
    alert('paste');
  }

  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action]();
    }
  };
}

new Button($('.btns'));

function scriptInfo() {
    var codeStr = codeEle.textContent;
    var metaStr = codeStr.match(/\/\*([\s\S]*)\*\//g)[0];

    var get = key => {
        var reg = new RegExp(`${key}:(.*)`, 'i');
        return metaStr.match(reg)[1].trim();
    }
    console.log('name:', base64.utf8_encode(get('name')));
    var json_data = {
            "id": 1,
            "name": base64.utf8_encode(get('name')),
            "author": base64.utf8_encode(get('author')),
            "url": get('include'),
            "code": base64.encode(codeStr),
        }
    // @TODO \\u 变为 \u
    // debugger
    return json_data;
}

function Base64() {
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this.utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }
    this.utf8_encode = function(_string) {
        return _string.replace(/([\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF])/g, str => {
            return '\\u' + str.charCodeAt(0).toString(16)
        })
    }
}