// pages/audiolist/audiolist.js
import { getAudioList } from "../../services/audio";
import { getAllTags } from "../../services/tags";

Page({
  data: {
    audioList: [],
    shareData: null,
    tag1: [],
    tag2: [],
    tag3: [],
    filters: { categoryId: 1 }, // 默认的分类
    sex: [
      { id: 1, name: "男声", selected: false },
      { id: 0, name: "女声", selected: false }
    ],
    currentPlayingId: null,
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
    // console.log(this.data.filters);
  },

  async fetchAudios(id) {
    const res = await getAudioList({ categoryId: id });
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
      const pageTitle = "中文配音";
      wx.setNavigationBarTitle({
        title: pageTitle
      });
      wx.setStorageSync('currentPageTitle', pageTitle);
    } else {
      const response3 = await getAllTags(2);
      this.setData({
        tag3: response3.data,
      });
      const pageTitle = "外语配音";
      wx.setNavigationBarTitle({
        title: pageTitle
      });
      wx.setStorageSync('currentPageTitle', pageTitle);
    }
  },

  async onTagClick(e) {
    console.log(e);
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
    console.log("筛选条件", this.data.filters);
    const res = await getAudioList(filters);
    this.setData({
      audioList: res.data,
    });
    console.log("传递音频列表", this.data.audioList);
  },

  handleShareAudio(e) {
    const shareData = e.detail;
    this.setData({ shareData });
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
    this.onShareAppMessage();
  },

  onShareAppMessage() {
    const shareData = wx.getStorageSync('shareData');
    const pageTitle = wx.getStorageSync('currentPageTitle') || "分享标题";
    console.log(shareData);
    if (shareData) {
      const { name, url } = shareData;
      return {
        title: `${pageTitle} - ${name}`,
        path: `/pages/audiolist/audiolist?audioUrl=${url}`,
      };
    }
    return {
      title: pageTitle,
      path: "/pages/audiolist/audiolist",
    };
  },

  onShareTimeline() {
    const shareData = wx.getStorageSync('shareData');
    const pageTitle = wx.getStorageSync('currentPageTitle') || "分享标题";
    if (shareData) {
      const { title, url } = shareData;
      return {
        title: `${pageTitle} - ${title}`,
        query: {
          audioUrl: url,
        },
      };
    }
    return {
      title: pageTitle,
      query: {},
    };
  },
  handlePlayAudio(e) {
    const playingAudio = e.detail;
    const { id } = playingAudio;
    
    if (this.data.currentPlayingId === id) {
      this.setData({ 
        audioList: this.data.audioList.map(audio => {
          if (audio.id === id) {
            audio.isPlayingGlobal = true;
          }
          return audio;
        }),
        currentPlayingId: id
      });
    } else {
      this.setData({
        audioList: this.data.audioList.map(audio => {
          if (audio.id === this.data.currentPlayingId) {
            audio.isPlayingGlobal = false;
          }
          return audio;
        }),
        currentPlayingId: id
      });

      this.setData({
        audioList: this.data.audioList.map(audio => {
          if (audio.id === id) {
            audio.isPlayingGlobal = true;
          }
          return audio;
        })
      });
    }
  },

  onUnload() {
    const audioList = this.data.audioList.map(audio => {
      audio.isPlayingGlobal = false;
      return audio;
    });
    this.setData({ audioList });
  }

});
