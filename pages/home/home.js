import {getCategories,getCategoriesAll} from "../../services/home"
Page({

  data: {
    categoryList:[],
    categoryTags:[]
  },

  onLoad(options) {
    this.fetchCategories(),
    this.fetchCategoriesAll()
  },
  async fetchCategories() {
    const res = await getCategories() 
    this.setData({categoryList:res.data})
  },
  async fetchCategoriesAll() {
    const res = await getCategoriesAll() 
    this.setData({categoryTags:res.data})
    console.log("xxx",this.data.categoryTags);
  },
  onReady() {

  },

  
  onShow() {

  },

  
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