function promise(toWait) {
  this.t = new Date();
  this.isPromiseObject = 1;
  this.toWait = toWait;
  this.thenList = [];
  this.thenIndex = 0;

  this.res = function (data) {
    var thenInfo = this.thenList[this.thenIndex];
    if(!thenInfo) {
      return;
    }
    var r = thenInfo.successCallback(data);
    if (r && r.isPromiseObject) {
      this.toWait = r.toWait;
      this.toWait(this.res.bind(this), this.rej.bind(this));
    }
    this.thenIndex++;
  }

  this.rej = function (error) {
    var thenInfo = this.thenList[this.thenIndex];
    if(typeof thenInfo.failedCallback!='undefined'){
      thenInfo.failedCallback(error);
    } else {
      throw '未捕获的promise错误,请这then方法里，传递reject参数';
    }
  }
  this.fired = false;
  this.then = function (sc, fc) {
    var then = {
      'successCallback': sc,
      'failedCallback': fc
    }
    this.thenList.push(then);
    if (!this.fired) {
      this.fired = true;
      this.toWait(this.res.bind(this), this.rej.bind(this));
    }
    return this;
  }
}
module.exports = promise;
