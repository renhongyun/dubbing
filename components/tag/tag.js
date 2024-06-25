// components/tag/tag.js
Component({
  properties: {
    tagList: {
      type: Array,
      value: []
    },
    sort: {
      type: String,
      value: ""
    }
  },
  methods: {
    onTagClick(e) {
      const { id, sort } = e.currentTarget.dataset;
      const tagList = this.data.tagList.map(tag => {
        if (tag.id === id) {
          tag.selected = !tag.selected;
        } else if (tag.selected) {
          tag.selected = false; // 同一类的不能同时选中
        }
        return tag;
      });
      this.setData({ tagList });
      this.triggerEvent('tagClick', { id, sort, selected: tagList.find(tag => tag.id === id).selected });
    }
  }
});
