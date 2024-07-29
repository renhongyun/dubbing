// components/tag/tag.js
Component({
  properties: {
    tagList: {
      type: Array,
      value: [],
      observer(newVal) {
        this.setData({
          localTagList: [...newVal]
        });
      }
    },
    sort: {
      type: String,
      value: ""
    }
  },
  data: {
    localTagList: []
  },
  methods: {
    onTagClick(e) {
      const { id, sort } = e.currentTarget.dataset;
      const localTagList = this.data.localTagList.map(tag => {
        if (tag.id === id) {
          tag.selected = !tag.selected;
        } else if (tag.selected) {
          tag.selected = false; // 同一类的不能同时选中
        }
        return tag;
      });
      this.setData({ localTagList });
      this.triggerEvent('tagClick', { id, sort, selected: localTagList.find(tag => tag.id === id).selected });
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        localTagList: [...this.data.tagList]
      });
    }
  }
});
