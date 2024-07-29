// components/video-item/video-item.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },
  data: {},
  methods: {
    onTap() {
      const { itemData } = this.properties;
      // wx.navigateTo({
      //   url: `/pages/detail-video/detail-video?videoUrl=${encodeURIComponent(itemData.url)}`
      // });
    }
  }
});
