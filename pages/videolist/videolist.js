// pages/videolist/videolist.js
import { getTopMV } from "../../services/video"
Page({
  data: {
    videoList: [],
    offset: 0,
    hasMore: true,
    bgHeight: 0,
    list: ["男声","女声","男声","女声","男声","女声","男声","女声"],
    list2: ["类型1","类型2","类型3","类型4"],
    list3: ["语言1","语言2","语言3","语言4"]
  },

  onLoad(options) {
    this.fetchTopMV()
  },

  async fetchTopMV() {
    const res = await getTopMV(this.data.offset)
    const newVideoList = [...this.data.videoList, ...res.data]
    this.setData({ videoList: newVideoList})
    this.data.offset = this.data.videoList.length
    this.data.hasMore = res.hasMore
    
    const height = newVideoList.length / 2 * 154.33
    this.setData({ bgHeight: height})
    console.log(this.data.bgHeight);
  },
  onReachBottom() {
    console.log("页面滚动到底部");
    if(!this.data.hasMore) return 
    this.fetchTopMV()
  },
  async onPullDownRefresh() {
    console.log("下拉刷新");
    //1.清空数据
    this.setData({videoList: []})
    this.data.offset = 0
    this.data.hasMore = true
    //2.请求新的数据
    await this.fetchTopMV()
      //停止刷新
    wx.stopPullDownRefresh()
  },
  onVideoItemTap(event) {
    const item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail-video/detail-video?id=${item.id}`
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})