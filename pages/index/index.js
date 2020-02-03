//Page Object
import { request } from '../../request/index.js'
Page({
  data: {
    //轮播数组
    swiperList: [],
    //导航数组
    catesList: [],
    floorList: [] 
  },
  //options(Object) 
  onLoad: function (options) {
    //1.发送异步请求 获取轮播组件
    // wx.request({
    //     url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //     responseType: 'text',
    //     success: (result)=>{
    //       console.log(result)
    //       this.setData({
    //         swiperList:result.data.message
    //       })
    //     }
    //   });
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  // 获取轮播数据
  getSwiperList() {
    request({ url: "/swiperdata" })
      .then(result => {
        console.log(result)
        this.setData({
          swiperList: result
        })
      })
  },
  getCateList() {
    request({ url: "/home/catitems" })
      .then(result => {
        console.log(result)
        this.setData({
          catesList: result
        })
      })
  },
  getFloorList() {
    request({ url: "/home/floordata" })
      .then(result => {
        this.setData({
          floorList: result
        })
      })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});