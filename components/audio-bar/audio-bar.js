// // // components/audio-bar/audio-bar.js
// // import { searchAuthor } from "../../services/author"

// // Component({
// //   properties: {
// //     itemData: {
// //       type: Object,
// //       value: {}
// //     },
// //     showAuthorInfo: {
// //       type: Boolean,
// //       value: true
// //     }
// //   },
// //   data: {
// //     isPlaying: false,
// //     dubbingActorName: ''
// //   },
// //   lifetimes: {
// //     attached() {
// //       this.getAuthorInfo();
// //     }
// //   },
// //   methods: {
// //     async getAuthorInfo() {
// //       const { dubbingActorId } = this.properties.itemData;
// //       if (dubbingActorId) {
// //         try {
// //           const res = await searchAuthor(dubbingActorId);
// //           if (res.code === 0) {
// //             this.setData({
// //               dubbingActorName: res.data.name
// //             });
// //             console.log(this.data.dubbingActorName);
// //           }
// //         } catch (error) {
// //           console.error("Error fetching author info:", error);
// //         }
// //       }
// //     },
// //     togglePlay() {
// //       const { url } = this.properties.itemData;
// //       if (!this.innerAudioContext) {
// //         this.innerAudioContext = wx.createInnerAudioContext();
// //         this.innerAudioContext.src = url;
// //       }

// //       if (this.data.isPlaying) {
// //         this.innerAudioContext.pause();
// //       } else {
// //         this.innerAudioContext.play();
// //       }

// //       this.setData({
// //         isPlaying: !this.data.isPlaying
// //       });

// //       this.innerAudioContext.onEnded(() => {
// //         this.setData({
// //           isPlaying: false
// //         });
// //       });
// //     },
// //     onShare() {
// //       const { name, url } = this.properties.itemData;
// //       wx.showShareMenu({
// //         withShareTicket: true,
// //         menus: ['shareAppMessage', 'shareTimeline']
// //       });
// //       wx.updateShareMenu({
// //         withShareTicket: true,
// //         success: () => {
// //           wx.showToast({
// //             title: '点击右上角进行分享',
// //             icon: 'none'
// //           });
// //         }
// //       });
// //       wx.setStorageSync('shareData', { name, url });
// //     },
// //     viewOtherSamples() {
// //       const { dubbingActorId } = this.properties.itemData;
// //       wx.navigateTo({
// //         url: `/pages/detail-author/detail-author?dubbingActorId=${dubbingActorId}`
// //       });
// //     }
// //   }
// // });
// // // components/audio-bar/audio-bar.js
// // // Component({
// // //   properties: {
// // //     itemData: {
// // //       type: Object,
// // //       value: {}
// // //     },
// // //     showAuthorInfo: {
// // //       type: Boolean,
// // //       value: true
// // //     }
// // //   },
// // //   data: {
// // //     isPlaying: false,
// // //     dubbingActorName: ''
// // //   },
// // //   lifetimes: {
// // //     attached() {
// // //       this.getAuthorInfo();
// // //     }
// // //   },
// // //   methods: {
// // //     async getAuthorInfo() {
// // //       const { dubbingActorId } = this.properties.itemData;
// // //       if (dubbingActorId) {
// // //         try {
// // //           const name = await this.fetchAuthorInfo(dubbingActorId);
// // //           this.setData({
// // //             dubbingActorName: name
// // //           });
// // //         } catch (error) {
// // //           console.error("Error fetching author info:", error);
// // //         }
// // //       }
// // //     },
// // //     async fetchAuthorInfo(dubbingActorId) {
// // //       // 这里是获取作者信息的逻辑
// // //       // 示例实现，实际代码可能需要调用 API
// // //       const response = await wx.cloud.callFunction({
// // //         name: 'getAuthorInfo',
// // //         data: { dubbingActorId }
// // //       });
// // //       return response.result.name; // 假设返回的格式是 { name: '作者名字' }
// // //     },
// // //     togglePlay() {
// // //       const { id, url } = this.properties.itemData;
// // //       this.triggerEvent('togglePlay', { id, url });
// // //     },
// // //     onShare() {
// // //       const { name, url } = this.properties.itemData;
// // //       wx.showShareMenu({
// // //         withShareTicket: true,
// // //         menus: ['shareAppMessage', 'shareTimeline']
// // //       });
// // //       wx.updateShareMenu({
// // //         withShareTicket: true,
// // //         success: () => {
// // //           wx.showToast({
// // //             title: '点击右上角进行分享',
// // //             icon: 'none'
// // //           });
// // //         }
// // //       });
// // //       wx.setStorageSync('shareData', { name, url });
// // //     },
// // //     viewOtherSamples() {
// // //       const { dubbingActorId } = this.properties.itemData;
// // //       wx.navigateTo({
// // //         url: `/pages/detail-author/detail-author?dubbingActorId=${dubbingActorId}`
// // //       });
// // //     }
// // //   }
// // // });

// // Component({
// //   properties: {
// //     itemData: {
// //       type: Object,
// //       value: {}
// //     },
// //     showAuthorInfo: {
// //       type: Boolean,
// //       value: true
// //     },
// //     isPlayingGlobal: {
// //       type: Boolean,
// //       value: false
// //     }
// //   },
// //   data: {
// //     isPlaying: false,
// //     dubbingActorName: ''
// //   },
// //   lifetimes: {
// //     attached() {
// //       this.getAuthorInfo();
// //     },
// //     detached() {
// //       this.innerAudioContext && this.innerAudioContext.stop();
// //     }
// //   },
// //   observers: {
// //     'isPlayingGlobal': function(isPlayingGlobal) {
// //       if (!isPlayingGlobal) {
// //         this.setData({ isPlaying: false });
// //         this.innerAudioContext && this.innerAudioContext.pause();
// //       }
// //     }
// //   },
// //   methods: {
// //     async getAuthorInfo() {
// //       const { dubbingActorId } = this.properties.itemData;
// //       if (dubbingActorId) {
// //         try {
// //           const res = await searchAuthor(dubbingActorId);
// //           if (res.code === 0) {
// //             this.setData({
// //               dubbingActorName: res.data.name
// //             });
// //           }
// //         } catch (error) {
// //           console.error("Error fetching author info:", error);
// //         }
// //       }
// //     },
// //     togglePlay() {
// //       const { url } = this.properties.itemData;
// //       const isPlaying = this.data.isPlaying;
      
// //       if (!this.innerAudioContext) {
// //         this.innerAudioContext = wx.createInnerAudioContext();
// //         this.innerAudioContext.src = url;
// //       }

// //       if (isPlaying) {
// //         this.innerAudioContext.pause();
// //       } else {
// //         this.triggerEvent('playAudio', this.properties.itemData);
// //         this.innerAudioContext.play();
// //       }

// //       this.setData({
// //         isPlaying: !isPlaying
// //       });

// //       this.innerAudioContext.onEnded(() => {
// //         this.setData({
// //           isPlaying: false
// //         });
// //       });
// //     }
// //   }
// // });
// Component({
//   properties: {
//     itemData: {
//       type: Object,
//       value: {}
//     },
//     showAuthorInfo: {
//       type: Boolean,
//       value: true
//     },
//     isPlayingGlobal: {
//       type: Boolean,
//       value: false
//     }
//   },
//   data: {
//     isPlaying: false,
//     dubbingActorName: ''
//   },
//   lifetimes: {
//     attached() {
//       this.getAuthorInfo();
//     },
//     detached() {
//       this.innerAudioContext && this.innerAudioContext.stop();
//     }
//   },
//   observers: {
//     'isPlayingGlobal': function(isPlayingGlobal) {
//       if (!isPlayingGlobal) {
//         this.setData({ isPlaying: false });
//         this.innerAudioContext && this.innerAudioContext.pause();
//       }
//     }
//   },
//   methods: {
//     async getAuthorInfo() {
//       const { dubbingActorId } = this.properties.itemData;
//       if (dubbingActorId) {
//         try {
//           const res = await searchAuthor(dubbingActorId);
//           if (res.code === 0) {
//             this.setData({
//               dubbingActorName: res.data.name
//             });
//           }
//         } catch (error) {
//           console.error("Error fetching author info:", error);
//         }
//       }
//     },
//     togglePlay() {
//       const { url, id } = this.properties.itemData;
//       const isPlaying = this.data.isPlaying;

//       if (!this.innerAudioContext) {
//         this.innerAudioContext = wx.createInnerAudioContext();
//         this.innerAudioContext.src = url;
//         this.innerAudioContext.onTimeUpdate(() => {
//           this.updateAudioPosition();
//         });
//       }

//       if (isPlaying) {
//         this.innerAudioContext.pause();
//       } else {
//         // Check if the clicked audio is the currently playing one
//         if (this.data.isPlaying && this.properties.itemData.id === this.data.currentPlayingId) {
//           this.innerAudioContext.play();
//         } else {
//           this.triggerEvent('playAudio', this.properties.itemData);
//           this.innerAudioContext.play();
//         }
//       }

//       this.setData({
//         isPlaying: !isPlaying
//       });

//       this.innerAudioContext.onEnded(() => {
//         this.setData({
//           isPlaying: false
//         });
//       });
//     },
//     updateAudioPosition() {
//       if (this.innerAudioContext && this.data.isPlaying) {
//         this.setData({
//           currentTime: this.innerAudioContext.currentTime,
//           duration: this.innerAudioContext.duration
//         });
//       }
//     }
//   }
// });
// Component({
//   properties: {
//     itemData: {
//       type: Object,
//       value: {}
//     },
//     showAuthorInfo: {
//       type: Boolean,
//       value: true
//     },
//     isPlayingGlobal: {
//       type: Boolean,
//       value: false
//     }
//   },
//   data: {
//     isPlaying: false,
//     dubbingActorName: '',
  
//   },
//   lifetimes: {
//     attached() {
//       this.getAuthorInfo();
//     },
//     detached() {
//       this.innerAudioContext && this.innerAudioContext.stop();
//     }
//   },
//   observers: {
//     'isPlayingGlobal': function(isPlayingGlobal) {
//       if (!isPlayingGlobal) {
//         this.setData({ isPlaying: false });
//         this.innerAudioContext && this.innerAudioContext.pause();
//       }
//     }
//   },
//   methods: {
//     async getAuthorInfo() {
//       const { dubbingActorId } = this.properties.itemData;
//       if (dubbingActorId) {
//         try {
//           const res = await searchAuthor(dubbingActorId);
//           if (res.code === 0) {
//             this.setData({
//               dubbingActorName: res.data.name
//             });
//           }
//         } catch (error) {
//           console.error("Error fetching author info:", error);
//         }
//       }
//     },
//     togglePlay() {
//       const { url ,id} = this.properties.itemData;
//       const isPlaying = this.data.isPlaying;

//       if (!this.innerAudioContext) {
//         this.innerAudioContext = wx.createInnerAudioContext();
//         this.innerAudioContext.src = url;
//         this.innerAudioContext.onTimeUpdate(() => {
//           this.updateAudioPosition();
//         });
//       }

//       if (isPlaying) {
//         this.innerAudioContext.pause();
//       } else {
//         console.log("pro",this.properties.itemData.id);
//         console.log(this.data.currentPlayingId);
//         if (this.data.isPlaying && this.properties.itemData.id === this.data.currentPlayingId) {
//           this.innerAudioContext.play();
//         } else {
//           this.triggerEvent('playAudio', this.properties.itemData);
//           this.innerAudioContext.play();
//         }
//       }

//       this.setData({
//         isPlaying: !isPlaying
//       });

//       this.innerAudioContext.onEnded(() => {
//         this.setData({
//           isPlaying: false
//         });
//       });
//     },
//     updateAudioPosition() {
//       if (this.innerAudioContext && this.data.isPlaying) {
//         this.setData({
//           currentTime: this.innerAudioContext.currentTime,
//           duration: this.innerAudioContext.duration
//         });
//       }
//     }
//   }
// });
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
          console.error("Error fetching author info:", error);
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
        // Check if the clicked audio is the currently playing one
        console.log("pro",this.properties.itemData.id);
console.log("cur",this.data.currentPlayingId);//这里是undefined
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

