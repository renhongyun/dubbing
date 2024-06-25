// components/banner/banner.js
import { getBanners } from "../../services/banner";

Component({
  properties: {
    banners: Array
  },

  data: {},

  methods: {
    async fetchBanners() {
      const res = await getBanners();
      this.setData({
        banners: res
      });
      console.log(this.data.banners);
    },

    onBannerTap(e) {
      const videoUrl = e.currentTarget.dataset.videoUrl;
      wx.navigateTo({
        url: `/pages/detail-video/detail-video?videoUrl=${encodeURIComponent(videoUrl)}`,
      });
    }
  },

  lifetimes: {
    attached() {
      this.fetchBanners();
    }
  }
});
