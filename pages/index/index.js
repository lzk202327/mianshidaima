// index.js

Page({
  /*身体数据提交*/
  status(){
    wx.navigateTo({
      url:'/pages/status/status'
    })
  },
  /*药物服用事项*/
  notice(){
    wx.navigateTo({
      url:'/pages/notice/notice'
    })
  },
  /*药物服用管理*/
  control(){
    wx.navigateTo({
      url:'/pages/control/control'
    })
  }
  })
