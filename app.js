// app.js
App({
  onLaunch() {
    console.log('App启动，开始定时检查');
    this.startCheck();
  },

  startCheck() {
    setInterval(() => {
      this.checkMedReminder();
    }, 60000);
    this.checkMedReminder();
  },

  checkMedReminder() {
    const list = wx.getStorageSync('medList') || [];
    if (list.length === 0) {
      console.log('medList为空，无提醒');
      return;
    }

    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const current = `${hh}:${mm}`;
    console.log('当前时间:', current);

    const dateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    let reminded = wx.getStorageSync('remindedList') || [];

    list.forEach(item => {
      if (!item.time) return;

      // 统一时间格式：把 "8:5" 或 "8:05" 都转成 "08:05"
      const parts = item.time.split(':');
      const itemTime = `${String(parts[0]).padStart(2, '0')}:${String(parts[1]).padStart(2, '0')}`;
      console.log('药品时间:', item.name, itemTime, '当前:', current, '匹配:', itemTime === current);

      if (itemTime === current) {
        const key = `${dateStr} ${itemTime} ${item.name}`;
        if (!reminded.includes(key)) {
          reminded.push(key);
          wx.setStorageSync('remindedList', reminded);

          // 连续震动5秒
          let count = 0;
          const vibrateTimer = setInterval(() => {
            wx.vibrateShort({ type: 'heavy' });
            count++;
            if (count >= 10) {
              clearInterval(vibrateTimer);
            }
          }, 500);

          // 弹窗
          wx.showModal({
            title: '💊 服药提醒',
            content: `现在 ${current}，该服用：${item.name}`,
            showCancel: false,
            confirmText: '知道了'
          });

          // 语音尝试
          const audioCtx = wx.createInnerAudioContext();
          audioCtx.obeyMuteSwitch = false;
          audioCtx.volume = 1.0;
          audioCtx.src = '/audio/default.mp3';
          audioCtx.play();
          audioCtx.onEnded(() => audioCtx.destroy());
        }
      }
    });
  }
});