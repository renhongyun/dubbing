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
    shouldLoadTag2: true,
    type: null,
    tagId: null,
    shareData: null,
    currentAudioId: null,
    currentAudioContext: null,
    currentPlayingId: null,
  },

  onLoad(options) {
    const { type, tagId } = options;
    let categoryId;
    if (type == 0) {
      categoryId = 1;
    } else {
      categoryId = 2;
      this.setData({
        shouldLoadTag2: false
      });
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
    let pageTitle = "title";
    if (type == 0) {
      const tag = tag1.find(item => item.id == tagId);
      if (tag) {
        pageTitle = tag.name;
        wx.setNavigationBarTitle({
          title: tag.name
        });
      }
    } else if (type == 2) {
      const tag = tag3.find(item => item.id == tagId);
      if (tag) {
        pageTitle = tag.name;
        wx.setNavigationBarTitle({
          title: tag.name
        });
      }
    }
    wx.setStorageSync('currentPageTitle', pageTitle);
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
    wx.setStorageSync('shareData', shareData);
  },

  onShareAppMessage() {
    console.log("分享");
    const shareData = wx.getStorageSync('shareData');
    const pageTitle = wx.getStorageSync('currentPageTitle') || "title";
    if (shareData) {
      const { name, url } = shareData;
      return {
        title: `${pageTitle} - ${name}`,
        path: `/pages/detail-tag/detail-tag?audioUrl=${url}`
      };
    }
    return {
      title: `${pageTitle}`,
      path: "/pages/detail-tag/detail-tag"
    };
  },

  onShareTimeline() {
    const shareData = wx.getStorageSync('shareData');
    const pageTitle = wx.getStorageSync('currentPageTitle') || "title";
    if (shareData) {
      const { name, url } = shareData;
      return {
        title: `${pageTitle} - ${name}`,
        query: {
          audioUrl: url
        }
      };
    }
    return {
      title: `${pageTitle}`,
      query: {}
    };
  },

  togglePlay(e) {
    const { id, url } = e.detail;

    if (this.data.currentAudioId === id) {
      if (this.data.currentAudioContext) {
        this.data.currentAudioContext.pause();
        this.setData({
          currentAudioId: null,
          currentAudioContext: null,
        });
      }
    } else {
      if (this.data.currentAudioContext) {
        this.data.currentAudioContext.pause();
      }
      const innerAudioContext = wx.createInnerAudioContext();
      innerAudioContext.src = url;
      innerAudioContext.play();

      innerAudioContext.onEnded(() => {
        this.setData({
          currentAudioId: null,
          currentAudioContext: null,
        });
      });

      this.setData({
        currentAudioId: id,
        currentAudioContext: innerAudioContext,
      });
    }
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
