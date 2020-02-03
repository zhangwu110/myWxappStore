// pages/goods_list/goods_list.js
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        active: true
      },
      {
        id: 1,
        value: "销量",
        active: false
      },
      {
        id: 2,
        value: "价格",
        active: false
      }
    ],
    goodsList:[]
  },
  //接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10,
  },
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.QueryParams.cid = options.cid
    this.getGoodsList()

  },

//获取商品列表数据
getGoodsList(){
  request({url:"/goods/search",data:this.QueryParams}).then(val=>{
    console.log(val)
    const total = val.total;
this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
    this.setData({
      goodsList:[...this.data.goodsList,...val.goods]
    })
    wx.stopPullDownRefresh()
  })

  
},

  //标题点击事件 从子组件传递过来的
  tabsItemChange(e) {
    console.log(e)
    //1获取被点击的标题索引
    const { index } = e.detail;

    let { tabs } = this.data
    tabs.forEach((v, i) => {
      i === index ? v.active = true : v.active = false

    });
    this.setData({
      tabs
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
  this.setData({
    goodsList:[]
  })
  this.QueryParams.pagenum = 1.
  this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //判断还有没有下一页数据
    if(this.QueryParams.pagenum >= this.totalPages){
      //没有下一页数据了
      wx.showToast({
        title: '没有下一页数据了',
      });
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})