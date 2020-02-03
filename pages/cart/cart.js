// pages/cart/cart.js
//将获取地理为止的方法封装在这里 utils
import { getSetting, chooseLocation, openSetting,showModel} from '../../utils/asyncWx.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: '',//地址
    cart: [],//商品信息
    allChecked: false,//全选
    totalPrice: 0,//总价格
    totalNum: 0//总数量
  },
  //获取用户地理位置 
  handleChoseAddress() {
    //获取权限状态
    try {
      getSetting().then(val => {
        let address;
        const scopeAddress = val.authSetting["scope.userLocation"]
        if (scopeAddress === true || scopeAddress === undefined) {
          chooseLocation().then(val1 => {
            address = val1
            wx.setStorageSync("address", address);
          })
        } else {
          openSetting().then(val3 => {
            chooseLocation().then(val1 => {
              address = val1
              wx.setStorageSync("address", address);
            })
          })
        }

      })
    } catch (error) {
      console.log(err)
    }
    //  wx.getSetting({
    //    success: (result)=>{
    //      console.log(result)
    //      const scopeAddress = result.authSetting["scope.userLocation"]
    //      if(scopeAddress === true || scopeAddress ===undefined){
    //        wx.chooseLocation({
    //          success: (result1)=>{
    //            console.log(result1)
    //          },
    //        });
    //      }else{
    //        //3.用户拒绝过授予权限 应该遇到用户先打开授权页面
    //        wx.openSetting({
    //          success: (result)=>{
    //           wx.chooseLocation({
    //             success: (result1)=>{
    //               console.log(result1)
    //             },
    //           });
    //          },
    //          fail: ()=>{},
    //          complete: ()=>{}
    //        });
    //      }
    //    },
    //  });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getSetting)
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
    //1.获取缓存中的收货地址
    const address = wx.getStorageSync('address');
    //获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || []
    //every 是一个数组方法 他会遍历返回一个回调函数 只有每一个回调函数都返回true 那么every方法的返回值为true
    // 只要有一个返回false 那么代码将不会往下执行 直接返回false
    // const allChecked = cart.every(v=>v.checked)
    // let totalNum = 0;
    // let totalPrice = 0;
    // let allChecked = true;
    // cart.forEach(v => {
    //   if (v.checked) {
    //     totalPrice += v.num * v.goods_price;
    //     totalNum += v.num
    //   } else {
    //     allChecked = false
    //   }
    // });
    this.setCart(cart)
    this.setData({
      address
    })
  },
  //上面的商品列表复选框事件
  handleItemChange(e) {
    //选中要修改的商品goods_id
    const goods_id = e.currentTarget.dataset.id
    console.log(goods_id)
    ////2.获取购物车数组
    let { cart } = this.data
    console.log(cart)
    //3.找到要修改的商品对象
    let index = cart.findIndex(v => {
      return v.goods_id == goods_id
    })
    //选中状态取反
    cart[index].checked = !cart[index].checked
    //  
    //5. 6 把购物车个数据重新设置回data中和缓存中
    console.log(index)
    this.setCart(cart)
  },
  setCart(cart) {
    let totalNum = 0;
    let totalPrice = 0;
    let allChecked = true;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      } else {
        allChecked = false
      }
    });
    wx.setStorageSync("cart", cart)
    this.setData({
      allChecked,
      totalPrice,
      totalNum,
      cart
    })
  },
  handleItemAllCheck() {
    //1.获取data中的数据
    let { cart, allChecked } = this.data
    //2.修改值
    allChecked = !allChecked
    //3.循环修改cart数组 中的商品选中状态
    cart.forEach(v => {
      v.checked = allChecked
    })
    //4.把修改后的值都填充回data或者缓存中
    this.setCart(cart)
  },
  handleItemNumEdit(e) {
   
    const { operation, id } = e.currentTarget.dataset
    let { cart } = this.data
    //找到需要修改的商品索引
    const index = cart.findIndex(v => {
      return v.goods_id === id
    })
    if(cart[index].num ===1&&operation===-1){
      // wx.showModal({
      //   title: '提示',
      //   content: '是否移除该商品',
      //   success:(res)=>{
      //     if (res.confirm) {
      //       cart.splice(index,1)
      //       this.setCart(cart)
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
      showModel({content: '是否移除该商品'}).then(res=>{
        if (res.confirm) {
          cart.splice(index,1)
            this.setCart(cart)
        }
      })
    }else{
  //进行修改数量
  cart[index].num += operation;
  this.setCart(cart)
    }
  
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