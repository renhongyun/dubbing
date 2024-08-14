// pages/home/home.js
import { getCategories, getCategoriesAll } from "../../services/home";

Page({
  data: {
    categoryList: [],
    categoryTags: [],
    wxNumber: ''  // 设置默认的微信号
  },

  onLoad(options) {
    this.fetchCategories();
    this.fetchCategoriesAll();
    this.getWxNumber();
  },

  async getWxNumber() {
    const that = this;
    wx.request({
      url: 'https://www.huayunpy.com/public/config.txt', // 文件链接
      method: 'GET',
      responseType: 'text',
      success(res) {
        console.log('res: ', res.data);
        that.setData({ wxNumber: res.data });  // 将文件内容设置为 wxNumber
      },
      fail(err) {
        console.error('获取 config.txt 内容失败:', err);
      }
    });
  },

  async fetchCategories() {
    const res = await getCategories();
    this.setData({ categoryList: res.data });
  },

  async fetchCategoriesAll() {
    const res = await getCategoriesAll();
    this.setData({ categoryTags: res.data });
    console.log("分类列表", this.data.categoryTags);
  },

  navigateToAudioList(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/audiolist/audiolist?id=${id}`,
    });
  },

  navigateToDetailTag(e) {
    const { categoryid, type, tagid } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail-tag/detail-tag?type=${type}&tagId=${tagid}`,
    });
  },
});
