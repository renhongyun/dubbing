import { getAudioList } from "../../services/audio";
import { getAllTags } from "../../services/tags";

Page({
  data: {
    audioList: [],
    tag1: [],
    tag2: [],
    tag3: [],
    sex: [
      { id: 1, name: "男声", selected: false },
      { id: 0, name: "女声", selected: false }
    ],
    filters: {},
    type: null,
    tagId: null,
  },

  onLoad(options) {
    const { type, tagId } = options;
    let categoryId;
    if (type == 0) {
      categoryId = 1;
    } else {
      categoryId = 2;
    }
    let filters = { categoryId };

    if (type == 0) {
      filters.emotionTagId = tagId;
    } else if (type == 2) {
      filters.languageTagId = tagId;
    }

    this.setData({ filters, type, tagId });
    this.fetchAudios();
    this.fetchTags();
  },

  async fetchAudios() {
    const res = await getAudioList(this.data.filters);
    this.setData({
      audioList: res.data
    });
    console.log("筛选", this.data.filters);
    console.log("初始列表", this.data.audioList);
  },

  async fetchTags() {
    const response1 = await getAllTags(0);
    const response2 = await getAllTags(1);
    const response3 = await getAllTags(2);

    this.setData({
      tag1: response1.data,
      tag2: response2.data,
      tag3: response3.data,
    }, () => {
      this.setPageTitle();
    });
  },

  setPageTitle() {
    const { type, tagId, tag1, tag3 } = this.data;

    if (type == 0) {
      const tag = tag1.find(item => item.id == tagId);
      if (tag) {
        wx.setNavigationBarTitle({
          title: tag.name
        });
      }
    } else if (type == 2) {
      const tag = tag3.find(item => item.id == tagId);
      if (tag) {
        wx.setNavigationBarTitle({
          title: tag.name
        });
      }
    }
  },

  async onTagClick(e) {
    const { id, sort, selected } = e.detail;
    let filters = { ...this.data.filters };

    if (selected) {
      if (sort === '类型') {
        filters.categoryTagId = id;
      } else if (sort === '性别') {
        filters.sex = id;
      }
    } else {
      if (sort === '类型') {
        delete filters.categoryTagId;
      } else if (sort === '性别') {
        delete filters.sex;
      }
    }

    this.setData({ filters });

    const res = await getAudioList(filters);
    this.setData({
      audioList: res.data
    });
  },

  handleShareAudio(e) {
    console.log(e);
    const shareData = e.detail;
    this.setData({ shareData });
    console.log("done");
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    });
    this.onShareAppMessage();
  },

  onShareAppMessage() {
    console.log("fenxiang");
    if (this.data.shareData) {
      const { name, dubbingActorId, url } = this.data.shareData;
      return {
        title: `${dubbingActorId} - ${name}`,
        path: `/pages/detail-tag/detail-tag?audioUrl=${url}`
      };
    }
    return {
      title: "分享标题",
      path: "/pages/detail-tag/detail-tag"
    };
  },

  onShareTimeline() {
    if (this.data.shareData) {
      const { name, dubbingActorId, url } = this.data.shareData;
      return {
        title: `${dubbingActorId} - ${name}`,
        query: {
          audioUrl: url
        }
      };
    }
    return {
      title: "分享标题",
      query: {}
    };
  }
});
