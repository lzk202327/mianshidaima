Page({
  data: {
    date: '',
    bloodPressure: '',
    bloodSugar: '',
    recordList: []
  },

  // 日期选择
  onDateChange(e) {
    this.setData({ date: e.detail.value });
  },

  // 血压输入
  onBpInput(e) {
    this.setData({ bloodPressure: e.detail.value });
  },

  // 血糖输入
  onBsInput(e) {
    this.setData({ bloodSugar: e.detail.value });
  },

  // 保存记录（核心：追加不是覆盖）
  saveRecord() {
    const { date, bloodPressure, bloodSugar } = this.data;
    
    if (!date || !bloodPressure || !bloodSugar) {
      wx.showToast({ title: '请填写完整', icon: 'none' });
      return;
    }

    let list = wx.getStorageSync('healthList') || [];
    
    list.push({
      date,
      bp: bloodPressure,
      bs: bloodSugar,
      time: new Date().toLocaleString()
    });

    wx.setStorageSync('healthList', list);

    this.setData({
      recordList: list,
      date: '',
      bloodPressure: '',
      bloodSugar: ''
    });

    wx.showToast({ title: '保存成功', icon: 'success' });
  },

  // 删除单条（关键：data-index 传下标）
  delRecord(e) {
    const index = e.currentTarget.dataset.index;  // ← 这里拿下标
    let list = wx.getStorageSync('healthList') || [];
    
    list.splice(index, 1);  // 删掉这一条
    wx.setStorageSync('healthList', list);  // 更新存储
    
    this.setData({ recordList: list });  // 刷新页面
    
    wx.showToast({ title: '已删除', icon: 'none' });
  },

  // 页面显示时加载历史
  onShow() {
    let list = wx.getStorageSync('healthList') || [];
    this.setData({ recordList: list });
  }
});