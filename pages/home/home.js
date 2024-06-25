import { getCategories, getCategoriesAll } from "../../services/home";

Page({
  data: {
    categoryList: [],
    categoryTags: []
  },

  onLoad(options) {
    this.fetchCategories();
    this.fetchCategoriesAll();
  },
  async fetchCategories() {
    const res = await getCategories();
    this.setData({ categoryList: res.data });
    // console.log("分类", this.data.categoryList);
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
  navigateToAudioListWithTag(e) {
    const { type, tagid } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/audiolist/audiolist?type=${type}&tagId=${tagid}`,
    });
  }
});
