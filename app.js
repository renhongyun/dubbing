// app.js
App({
  onLaunch() {
    this.eventBus = {
      events: {},
      on(event, listener) {
        if (!this.events[event]) {
          this.events[event] = [];
        }
        this.events[event].push(listener);
      },
      off(event, listenerToRemove) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
      },
      emit(event, args) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(args));
      }
    };




    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
