// pages/detail-author/detail-author.js
import { getAudioList } from "../../services/audio";
import { getAllTags } from "../../services/tags";
import { getAuthorList } from "../../services/author"

Page({
  data: {
    audioList: [],
    shareData: null,
    tag1: [],
    tag2: [],
    authorList: [],
    dubbingActorId: null
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
    console.log("tag1",this.data.tag1);
    const response2 = await getAllTags(1);
    this.setData({
      tag2: response2.data
    });
    console.log("tag2",this.data.tag2);
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
  }
});
