// pages/audiolist/audiolist.js
import { getAudioList } from "../../services/audio";
import { getAllTags } from "../../services/tags";

Page({
  data: {
    banners: [],
    audioList: [],
    shareData: null,
    tag1: [],
    tag2: [],
    tag3: [],
    authorList: [],
    filters: { categoryId: 1 }, // 默认的分类
    sex: [
      { id: 1, name: "男声", selected: false },
      { id: 0, name: "女声", selected: false }
    ]
  },

  onLoad(options) {
    const { type, tagId } = options;
    if (type !== undefined && tagId !== undefined) {
      this.fetchAudiosByTag(type, tagId);
    } else {
      const { id } = options;
      this.setData({ filters: { categoryId: id } });
      this.fetchAudios(id);
      this.fetchTagsByCategoryId(id);
    }
  },

 

  async fetchAudios(id) {
    console.log(id);
    const res = await getAudioList({ categoryId: id });
    this.setData({
      audioList: res.data,
    });
  },

  // async fetchAudiosByTag(type, tagId) {
  //   let res;
  //   let filters = { ...this.data.filters };
  //   if (type == 0) {
  //     res = await getAudioList({ ...filters, emotionTagId: tagId });
  //     const response1 = await getAllTags(0);
  //     const filteredTag1 = response1.data.map(tag => ({
  //       ...tag,
  //       selected: tag.id === tagId
  //     }));
  //     this.setData({
  //       tag1: filteredTag1,
  //     });

  //     const response2 = await getAllTags(1);
  //     this.setData({
  //       tag2: response2.data,
  //     });

  //   } else if (type == 2) {
  //     res = await getAudioList({ ...filters, languageTagId: tagId });
  //     const response3 = await getAllTags(2);
  //     const filteredTag3 = response3.data.map(tag => ({
  //       ...tag,
  //       selected: tag.id === tagId
  //     }));
  //     this.setData({
  //       tag3: filteredTag3,
  //     });
  //   }
  //   this.setData({
  //     audioList: res.data,
  //   });
  // },

  async fetchTagsByCategoryId(id) {
    if (id == 1) {
      const response1 = await getAllTags(0);
      this.setData({
        tag1: response1.data,
      });
      const response2 = await getAllTags(1);
      this.setData({
        tag2: response2.data,
      });
      wx.setNavigationBarTitle({
        title: "中文配音"
      });
    } else {
      const response3 = await getAllTags(2);
      this.setData({
        tag3: response3.data,
      });
      wx.setNavigationBarTitle({
        title: "外语配音"
      });
    }
  },

  async onTagClick(e) {
    const { id, sort, selected } = e.detail;
    let filters = { ...this.data.filters };

    if (selected) {
      if (sort === '情绪') {
        filters.emotionTagId = id;
      } else if (sort === '类型') {
        filters.categoryTagId = id;
      } else if (sort === '语言') {
        filters.languageTagId = id;
      } else if (sort === '性别') {
        filters.sex = id;
      }
    } else {
      if (sort === '情绪') {
        delete filters.emotionTagId;
      } else if (sort === '类型') {
        delete filters.categoryTagId;
      } else if (sort === '语言') {
        delete filters.languageTagId;
      } else if (sort === '性别') {
        delete filters.sex;
      }
    }

    this.setData({ filters });

    const res = await getAudioList(filters);
    this.setData({
      audioList: res.data,
    });
  },

  handleShareAudio(e) {
    console.log(e);
    const shareData = e.detail;
    this.setData({ shareData });
    console.log("done");
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
    this.onShareAppMessage();
  },

  onShareAppMessage() {
    console.log("fenxiang");
    if (this.data.shareData) {
      const { name, dubbingActorId, url } = this.data.shareData;
      return {
        title: `${dubbingActorId} - ${name}`,
        path: `/pages/audiolist/audiolist?audioUrl=${url}`,
      };
    }
    return {
      title: "分享标题",
      path: "/pages/audiolist/audiolist",
    };
  },

  onShareTimeline() {
    if (this.data.shareData) {
      const { name, dubbingActorId, url } = this.data.shareData;
      return {
        title: `${dubbingActorId} - ${name}`,
        query: {
          audioUrl: url,
        },
      };
    }
    return {
      title: "分享标题",
      query: {},
    };
  },
});
