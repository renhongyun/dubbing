// pages/detail-author/detail-author.js
import { getAudioList } from "../../services/audio";
import { getAllTags } from "../../services/tags";
import { getAuthorList } from "../../services/author";

Page({
  data: {
    audioList: [],
    shareData: null,
    tag1: [],
    tag2: [],
    authorList: [],
    dubbingActorId: null,
    filters: {}
  },

  onLoad(options) {
    const { dubbingActorId } = options;
    this.setData({ dubbingActorId });
    this.fetchAudios(dubbingActorId);
    this.fetchAudiosByTag();
    this.fetchAuthor();
  },

  async fetchAuthor() {
    const res = await getAuthorList();
    this.setData({
      authorList: res.data
    });
    this.updateGlobalTitle();
  },

  async fetchAudios(dubbingActorId) {
    const res = await getAudioList({ dubbingActorId });
    this.setData({
      audioList: res.data
    });
  },

  async fetchAudiosByTag() {
    const response1 = await getAllTags(0);
    this.setData({
      tag1: response1.data
    });
    const response2 = await getAllTags(1);
    this.setData({
      tag2: response2.data
    });
  },

  handleShareAudio(e) {
    const shareData = e.detail;
    this.setData({ shareData });
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    });
    this.onShareAppMessage();
  },

  onShareAppMessage() {
    if (this.data.shareData) {
      const { name, dubbingActorId, url } = this.data.shareData;
      return {
        title: `${dubbingActorId} - ${name}`,
        path: `/pages/audiolist/audiolist?audioUrl=${url}`
      };
    }
    return {
      title: "分享标题",
      path: "/pages/audiolist/audiolist"
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
  },

  updateGlobalTitle() {
    const author = this.data.authorList.find(author => author.id === parseInt(this.data.dubbingActorId));
    if (author) {
      wx.setNavigationBarTitle({
        title: author.name
      });
    } else {
      wx.setNavigationBarTitle({
        title: '默认标题'
      });
    }
  },

  async onTagClick(e) {
    const { id, sort, selected } = e.detail;
    let filters = { ...this.data.filters };

    if (sort === '情绪') {
      filters.emotionTagId = selected ? id : null;
    } else if (sort === '类型') {
      filters.categoryTagId = selected ? id : null;
    }

    
    filters.dubbingActorId = this.data.dubbingActorId;

    this.setData({ filters });

    const res = await getAudioList(filters);
    this.setData({
      audioList: res.data
    });
  }
});
