Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
  },
  data: {
    isPlaying: false,
    audioContext: null,
    currentTime: 0,
    duration: 0
  },
  methods: {
    onLoad() {
      this.setData({
        audioContext: wx.createInnerAudioContext()
      });
      this.data.audioContext.src = this.properties.itemData.url;
      this.data.audioContext.onPlay(() => {
        console.log('开始播放');
      });
      this.data.audioContext.onPause(() => {
        console.log('暂停播放');
      });
      this.data.audioContext.onEnded(() => {
        console.log('播放结束');
        this.setData({
          isPlaying: false,
          currentTime: 0
        });
      });
      this.data.audioContext.onTimeUpdate(() => {
        this.setData({
          currentTime: this.data.audioContext.currentTime,
          duration: this.data.audioContext.duration
        });
      });
    },
    togglePlay() {
      if (this.data.isPlaying) {
        this.data.audioContext.pause();
      } else {
        this.data.audioContext.play();
      }
      this.setData({
        isPlaying: !this.data.isPlaying
      });
    },
    onShare() {
      this.triggerEvent('shareAudio', {
        id: this.properties.itemData.id,
        name: this.properties.itemData.name,
        dubbingActorId: this.properties.itemData.dubbingActorId,
        url: this.properties.itemData.url
      });
    },
    onUnload() {
      this.data.audioContext.stop();
      this.setData({
        isPlaying: false
      });
    },
    onSliderChange(e) {
      const value = e.detail.value;
      this.data.audioContext.seek(value);
      this.setData({
        currentTime: value
      });
    }
  },
  attached() {
    this.onLoad();
  },
  detached() {
    this.onUnload();
  }
});
