import {getBanners} from "../../services/banner"
Component({
  properties: {
    banners: {
    }
  },

  data: {},

  methods: {
    async fetchBanners() {
      const res = await getBanners();
      this.setData({
        banners: res
      });
      // console.log(this.data.banners);
    }
  },

  lifetimes: {
    attached() {
      this.fetchBanners();
    }
  }
});