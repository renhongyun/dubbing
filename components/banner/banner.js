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
      const { videourl } = e.currentTarget.dataset;
      wx.navigateTo({
        url: `/pages/detail-video/detail-video?videoUrl=${encodeURIComponent(videourl)}`
      });
    }
  },

  lifetimes: {
    attached() {
      this.fetchBanners();
    }
  }
});
