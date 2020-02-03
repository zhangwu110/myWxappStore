// pages/goods_detail/goods_detail.js
import { request } from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    this.getGoodsDetail(goods_id)
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
  // 点击 加入购物车
  handleCartAdd() {
    let goodsObj = this.data.goodsObj
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => {
      console.log(v)
      return v.goods_id === goodsObj.goods_id
    })
    console.log(index)
    console.log(cart)
    if (index === -1) {
      goodsObj.num = 1;
      goodsObj.checked = true;
      cart.push(goodsObj)
    } else {
      cart[index].num++
    }
    // console.log(cart)
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 1500,
      mask: true,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  //请求商品详情数据
  getGoodsDetail(goods_id) {
    request({ url: "/goods/detail", data: { goods_id } }).then(result => {
      console.log(result)
      this.setData({
        goodsObj: result
      })
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  //点击轮播图放大预览图片
  handlePreviewImage(e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    // console.log('dayin')
    const urls = this.data.goodsObj.pics.map(v => v.pics_mid)
    wx.previewImage({
      current: urls[id], // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
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