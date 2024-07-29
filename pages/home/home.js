// pages/home/home.js
import { getCategories, getCategoriesAll } from "../../services/home";

Page({
  data: {
    categoryList: [],
    categoryTags: [],
    wxNumber: '111111'  // 设置默认的微信号
  },

  onLoad(options) {
    this.fetchCategories();
    this.fetchCategoriesAll();
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
