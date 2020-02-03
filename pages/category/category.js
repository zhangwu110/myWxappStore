// pages/category/category.js
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧 的菜单数据
    leftMenuList: [],
    //右侧的商品数据
    rightContent: [],
    //被点击的左侧菜单
    currentIndex: 0,
    scrolltop:0

  },
  //接口的返回数据
  cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 先判断本地存储中有没有旧的数据 如果没有就发送新请求
    // 如果有旧的数据 而且旧数据还没有获取 那么就用旧的数据
    //1.先获取本地存储中的数据
    const Cates = wx.getStorageSync("cates");
    console.log(Cates)
    //2判断
    if(!Cates){
      this.getCates()
    }else{
      //有就的数据 定义过期时间 10s改成5分钟
      if(Date.now() - Cates.time>1000*10){
        //重新发送请求
        this.getCates()
        this.cates = Cates.data;
      }else{
        // 可以使用就的数据
        this.cates = Cates.data;
        let leftMenuList = this.cates.map(v => v.cat_name)
        let rightContent = this.cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
    

   
  },

  getCates() {
    request({
      url: '/categories'
    }).then(result => {
      this.cates = result;
      //3把接口的数据存储到本地
      wx.setStorageSync("cates", {time:Date.now(),data:this.cates});
      let leftMenuList = this.cates.map(v => v.cat_name)
      let rightContent = this.cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  //左侧菜单的点击事件
  handleItemTap(e) {
    console.log(e)
    let currentIndex = e.currentTarget.dataset.index
    let rightContent = this.cates[currentIndex].children
    let scrolltop = 0;
    this.setData({
      currentIndex,
      rightContent,
      scrolltop
    })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})