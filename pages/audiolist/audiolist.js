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
  },

  onLoad(options) {
    const { type, tagId } = options;
    if (type !== undefined && tagId !== undefined) {
      this.fetchAudiosByTag(type, tagId);
    } else {
      const { id } = options;
      this.fetchAudios(id);
      this.fetchTagsByCategoryId(id);
    }
  },

  async fetchAudios(id) {
    console.log(id);
    if (id == 1) {
      const res = await getAudioList({ categoryId: 1 });
      this.setData({
        audioList: res.data,
      });
    } else {
      const res = await getAudioList({ categoryId: 2 });
      this.setData({
        audioList: res.data,
      });
    }
  },

  async fetchAudiosByTag(type, tagId) {
    let res;
    if (type == 0) {
      res = await getAudioList({ emotionTagId: tagId });

      // 获取与当前选定情感标签相关的其他标签
      const response1 = await getAllTags(0);
      const filteredTag1 = response1.data.filter(tag => tag.id == tagId);
      this.setData({
        tag1: filteredTag1,
      });

      const response2 = await getAllTags(1);
      this.setData({
        tag2: response2.data,
      });

    } else if (type == 2) {
      res = await getAudioList({ languageTagId: tagId });

      // 获取与当前选定语言标签相关的其他标签
      const response3 = await getAllTags(2);
      const filteredTag3 = response3.data.filter(tag => tag.id == tagId);
      this.setData({
        tag3: filteredTag3,
      });
    }
    this.setData({
      audioList: res.data,
    });
  },

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
    } else {
      const response3 = await getAllTags(2);
      this.setData({
        tag3: response3.data,
      });
    }
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
