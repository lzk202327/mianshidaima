Page({
  data: {
    loadMedList() {
      const medList = wx.getStorageSync('medList') || [];
      let cells = [
        { med: null }, { med: null }, { med: null },
        { med: null }, { med: null }, { med: null }, { med: null }
      ];
      medList.forEach((med, index) => {
        if (index < 7) cells[index].med = med;
      });
      const hasMed = medList.length > 0;
      this.setData({ boxCells: cells, hasMed });
    }
  },
  onLoad() {
    this.loadMedList();
  },

  onShow() {
    this.loadMedList(); // 每次进来自动刷新
  },

  loadMedList() {
    const medList = wx.getStorageSync('medList') || [];
    // 固定7格，有药的装进去，没药的显示空
    let cells = [
      { med: null }, { med: null }, { med: null },
      { med: null }, { med: null }, { med: null }, { med: null }
    ];
    medList.forEach((med, index) => {
      if (index < 7) cells[index].med = med;
    });
    this.setData({ boxCells: cells });
  }
});