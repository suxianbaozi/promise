# promise
由于小程序在ios 8.x 支持的promise有问题，所以重新定义了一个

#### 用法
```javascript
var versionInfo = /iOS (\d+)/.exec(wx.getSystemInfoSync().system);
if (versionInfo && parseInt(versionInfo[1]) <= 8) {
    Promise = require('promise.js');
}
```
