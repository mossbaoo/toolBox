/**
 * Page: 幸运大转盘
 * Author: Moss
 */

const app = getApp();

Page({
  data: {
    animationData: {},
    prizeArr: ["50积分", "50金币", "10元话费", "100积分", "100金币", "谢谢参与", "20金币", "IphoneX"],
    prizeName: ''
  },

  onShow() {
    // let num = 93;
    // console.log(num%45)
    // console.log((num-(num%45))/45)
  },

  start(e) {
    let that = this;
    let randomNum = parseInt(Math.random()*360); // 随机得出旋转的角度
    let randomAngle = randomNum;
    let prizeIndex = (randomNum-(randomNum%45))/45; // 算出奖品的下标值
    console.log(randomAngle)
    console.log(prizeIndex)

    that.reset();
    
    // 开始
    console.log("开始")
    let animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1500,
      timingFunction: "ease-out"
    });
    animation.rotate(randomAngle + 3600).step();
    this.setData({
      animationData: animation.export()
    })
    setTimeout(()=> {
      // wx.showModal({
      //   title: '提示',
      //   content: that.data.prizeArr[prizeIndex],
      //   success (res) {
      //     if (res.confirm) {
      //       that.reset();
      //     }
      //   }
      // })
      that.setData({
        prizeName: that.data.prizeArr[prizeIndex]
      })
    }, 1500)
    
  },

  // 重置
  reset(e) {
    let that = this;
    console.log("重置")
    let animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 0,
      timingFunction: "ease-out"
    });
    animation.rotate(0).step();
    this.setData({
      animationData: animation.export()
    })
  }


})