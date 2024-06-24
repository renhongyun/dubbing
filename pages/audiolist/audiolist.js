
import {getAudioList} from "../../services/audio"

Page({
  data: {
    banners: [],
    audioList: [],
    list: ["情绪1", "情绪2", "情绪3", "情绪4"],
    list2: ["类型1", "类型2", "类型3", "类型4"],
    list3: ["语言1", "语言2", "语言3", "语言4"],
    shareData: null
  },

  onLoad(options) {
    this.fetchAudios();
  },

  async fetchAudios() {
    const res = await getAudioList({});
    this.setData({
      audioList: res.data
    });
    console.log("音频列表", this.data.audioList);
  },

  onShareAppMessage() {
    if (this.data.shareData) {
      const { name, dubbingActorId, url } = this.data.shareData;
      return {
        title: `${dubbingActorId} - ${name}`,
        path: `/pages/index/index?audioUrl=${url}`
      };
    }
    return {
      title: '分享标题',
      path: '/pages/index/index'
    };
  },

  handleShareAudio(e) {
    const shareData = e.detail;
    this.setData({ shareData });
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  }
});
