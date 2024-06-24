// pages/detail-video/detail-video.js
import {getMVUrl, getMVInfo, getMVRelated} from "../../services/video"
Page({
  data: {
    id: 0,
    mvUrl:"",
    mvInfo:"",
    danmuList: [
      {text: "哈哈", color: "#ff0000", time: 3}
    ],
    mvRelated:[]
  },
  onLoad(options) {
    const id = options.id
    this.setData({id})

    this.fetchMVUrl()
    this.fetchMVInfo()
    this.fetchMVRelated()
  },
  async fetchMVUrl() {
    const res = await getMVUrl(this.data.id)
    this.setData({mvUrl: res.data.url})
  },
  async fetchMVInfo() {
    const res = await getMVInfo(this.data.id)
    // console.log(res);
    this.setData({mvInfo: res.data})  
  },
  async fetchMVRelated() {
    const res = await getMVRelated(this.data.id)
    // console.log(res);
    this.setData({mvRelated: res.data})
  },
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})