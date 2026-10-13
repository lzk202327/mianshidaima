Page({
  data: {
    medList: [],
    name: '',
    time: ''
  },

  onShow() {
    this.setData({
      medList: wx.getStorageSync('medList') || []
    });
  },

  // 药名输入
  onNameInput(e) {
    this.setData({ name: e.detail.value });
  },

  // 滚轮时间
  onTimeChange(e) {
    this.setData({ time: e.detail.value });
  },

  // 添加药品
  addMed() {
    const { name, time } = this.data;
    if (!name || !time) {
      wx.showToast({ title: '请填药名并选择时间', icon: 'none' });
      return;
    }
    const list = wx.getStorageSync('medList') || [];
    list.push({ name, time });
    wx.setStorageSync('medList', list);
    this.setData({
      medList: list,
      name: '',
      time: ''
    });
    wx.showToast({ title: '保存成功' });
  },

  // 删除药品
  delMed(e) {
    const idx = e.currentTarget.dataset.idx;
    const list = wx.getStorageSync('medList') || [];
    list.splice(idx, 1);
    wx.setStorageSync('medList', list);
    this.setData({ medList: list });
    wx.showToast({ title: '已删除', icon: 'none' });
  },

  // 最大震动
  strongVibrate() {
    let count = 0;
    const t = setInterval(() => {
      if (count % 2 === 0) {
        wx.vibrateLong();
      } else {
        wx.vibrateShort({ type: 'heavy' });
      }
      count++;
      if (count >= 16) clearInterval(t);
    }, 300);
  },

  testRemind() {
    this.strongVibrate();
    wx.showModal({
      title: '💊 服药提醒',
      content: '强力震动 + 弹窗',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  goHome() {
    wx.navigateBack();
  }
});