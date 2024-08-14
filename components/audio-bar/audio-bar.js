import { searchAuthor } from "../../services/author.js";

Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    showAuthorInfo: {
      type: Boolean,
      value: true
    },
    isPlayingGlobal: {
      type: Boolean,
      value: false
    },
    currentPlayingId: {
      type: Number,
      value: null
    }
  },
  data: {
    isPlaying: false,
    dubbingActorName: ''
  },
  lifetimes: {
    attached() {
      this.getAuthorInfo();
    },
    detached() {
      this.innerAudioContext && this.innerAudioContext.stop();
    }
  },
  observers: {
    'isPlayingGlobal': function(isPlayingGlobal) {
      if (!isPlayingGlobal) {
        this.setData({ isPlaying: false });
        this.innerAudioContext && this.innerAudioContext.pause();
      }
    }
  },
  methods: {
    async getAuthorInfo() {
      const { dubbingActorId } = this.properties.itemData;
      if (dubbingActorId) {
        try {
          const res = await searchAuthor(dubbingActorId);
          if (res.code === 0) {
            this.setData({
              dubbingActorName: res.data.name
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    togglePlay() {
      const { url, id } = this.properties.itemData;
      const isPlaying = this.data.isPlaying;

      if (!this.innerAudioContext) {
        this.innerAudioContext = wx.createInnerAudioContext();
        this.innerAudioContext.src = url;
        this.innerAudioContext.onTimeUpdate(() => {
          this.updateAudioPosition();
        });
      }

      if (isPlaying) {
        this.innerAudioContext.pause();
      } else {

        // console.log("pro",this.properties.itemData.id);
        // console.log("cur",this.data.currentPlayingId);//undefined
        if (this.data.isPlaying && this.properties.itemData.id === this.data.currentPlayingId) {
          this.innerAudioContext.play();
        } else {
          this.triggerEvent('playAudio', this.properties.itemData);
          this.innerAudioContext.play();
        }
      }

      this.setData({
        isPlaying: !isPlaying
      });

      this.innerAudioContext.onEnded(() => {
        this.setData({
          isPlaying: false
        });
      });
    },
    updateAudioPosition() {
      if (this.innerAudioContext && this.data.isPlaying) {
        this.setData({
          currentTime: this.innerAudioContext.currentTime,
          duration: this.innerAudioContext.duration
        });
      }
    }
  }
});

