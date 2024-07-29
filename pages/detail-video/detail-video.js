// pages/detail-video/detail-video.js
import { getVideoList } from "../../services/video";

Page({
  data: {
    videoUrl: '',
    videoName: '',
    languageId: '',
    sex: '',
    videoList: []
  },

  async onLoad(options) {
    const videoUrl = decodeURIComponent(options.videoUrl);
    const res = await getVideoList();
    const videoList = res.data;
    
    const videoDetails = videoList.find(video => video.url === videoUrl);

    if (videoDetails) {
      this.setData({
        videoUrl: videoDetails.url,
        videoName: videoDetails.name,
        languageId: videoDetails.languageId,
        sex: videoDetails.sex,
        videoList: videoList
      });
    }
  },

  onVideoItemTap(e) {
    const { item } = e.currentTarget.dataset;
    console.log("跳转");
    wx.navigateTo({
      url: `/pages/detail-video/detail-video?videoUrl=${encodeURIComponent(item.url)}`
    });
  }
});
