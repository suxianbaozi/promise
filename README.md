# promise
由于小程序在ios 8.x 支持的promise有问题，所以重新定义了一个，暂只支持promise的最基本用法

#### 用法
```javascript
var versionInfo = /iOS (\d+)/.exec(wx.getSystemInfoSync().system);
if (versionInfo && parseInt(versionInfo[1]) <= 8) {
    Promise = require('promise.js');
}


function error(){};

new Promise(function(res,rej){
    //.....
}).then(function(data){
    return new Promise(function(res,rej){
        //.....
    });
},error).then(function(data){
    //.....
},error);

```
