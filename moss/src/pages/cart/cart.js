/**
 * Page: 购物车
 * Author: Moss
 */

const app = getApp();

Page({
  data: {
    dataArr: [
      {id: 1, title: '无防腐剂 老家大厨鱼糕 418g湖北荆州农家特产纯鱼饼手工鱼糕', image: '/images/order_img.jpg', num: 2, price: 123,selected: true},
      {id: 2, title: '湖北恩施土特产手工粗粮美食小吃米粉柴火洛现做新鲜绿豆皮丝500G ', image: '/images/order_img.jpg', num: 1, price: 222, selected: true}
    ],
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: true  // 全选状态，默认全选
  },

  onShow() {
    this.getTotalPrice();
  },

  // 计算总价
  getTotalPrice() {
    // 获取购物车列表
    let dataArr = this.data.dataArr;
    let total = 0;
    // 循环列表得到每个数据
    for(let i = 0; i<dataArr.length; i++) {
      // 判断选中才会计算价格
      if(dataArr[i].selected) {
        // 所有价格加起来
        total += dataArr[i].num * dataArr[i].price;
      }
    }
    // 最后赋值到data中渲染到页面
    this.setData({  
      dataArr: dataArr,
      totalPrice: total.toFixed(2)
    });
  },

  // 选择事件
  selectList(e) {
    // 获取data- 传进来的index
    let index = e.currentTarget.dataset.index;
    // 获取购物车列表
    let dataArr = this.data.dataArr;
    // 获取当前商品的选中状态
    let selected = dataArr[index].selected;
    // 改变状态
    dataArr[index].selected = !selected;
    this.setData({
      dataArr: dataArr
    });

    // 改变全选状态
    for (var i=0; i<this.data.dataArr.length; i++){
      // 当状态为全选时，每个元素其中有一个为false，则取消全选
      // 当状态为非全选时，每个元素都为true，则全选
      if(this.data.selectAllStatus){
        if(!this.data.dataArr[i].selected){
          this.setData({
            selectAllStatus: false
          });
          break;
        }
      }else {
        if(this.data.dataArr[i].selected){
          this.setData({
            selectAllStatus: true
          });
        }else {
          this.setData({
            selectAllStatus: false
          });
          break;
        }
      }
    }

    // 重新获取总价
    this.getTotalPrice();
  },

  // 全选事件
  selectAll(e) {
    // 是否全选状态
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let dataArr = this.data.dataArr;
    for (let i = 0; i < dataArr.length; i++) {
      // 改变所有商品状态
      dataArr[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      dataArr: dataArr
    });
    // 重新获取总价
    this.getTotalPrice();
  },

  // 增加数量
  addCount(e) {
    let index = e.currentTarget.dataset.index;
    let dataArr = this.data.dataArr;
    let num = dataArr[index].num;
    num = num + 1;
    dataArr[index].num = num;
    this.setData({
      dataArr: dataArr
    });
    this.getTotalPrice();
  },
  
  // 减少数量
  minusCount(e) {
    let index = e.currentTarget.dataset.index;
    let dataArr = this.data.dataArr;
    let num = dataArr[index].num;
    if(num <= 1){
      wx.showToast({
        title: '宝贝不能再减少啦',
        icon: 'none'
      })
      return false;
    }
    num = num - 1;
    dataArr[index].num = num;
    this.setData({
      dataArr: dataArr
    });
    this.getTotalPrice();
  },

  // 输入数量
  inputCount(e) {
    let index = e.currentTarget.dataset.index;
    let dataArr = this.data.dataArr;
    let num = e.detail.value;
    dataArr[index].num = num;
    this.setData({
      dataArr: dataArr
    });
    this.getTotalPrice();
  },

  // 失去焦点时判断数量是否小于1
  bindblur(e) {
    let index = e.currentTarget.dataset.index;
    let dataArr = this.data.dataArr;
    let num = e.detail.value;
    if(num <= 1){
      wx.showToast({
        title: '数量不能小于1',
        icon: 'none'
      })
      num = 1;
      dataArr[index].num = num;
      this.setData({
        dataArr: dataArr
      });
      this.getTotalPrice();
    }
  },

  // 去结算
  toOrder() {
    // 处理数据
    // *****
    // *****

    // 跳转结算页面
    wx.navigateTo({
      url: '/pages/shop/order/order'
    })
  },

})
