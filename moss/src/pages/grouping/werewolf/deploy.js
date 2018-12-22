const app = getApp();

Page({
  data: {
    godArr: [{
      'id': 0, 'name': '预言家', 'status': false
    },{
      'id': 1, 'name': '女巫', 'status': false
    },{
      'id': 2, 'name': '猎人', 'status': false
    }],
    peopleNum: 0,
    wolfNum: 0,
  },
  
  onShow() {
    let that = this;
  },

  onLoad() {
    
  },
  //选择
  choose(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let data = 'godArr['+ id +'].status';
    if(that.data.godArr[id].status){
      that.setData({
        [data]: false
      })
    }else {
      that.setData({
        [data]: true
      })
    }
    
  },
  //减
  subtract(e) {
    let that = this;
    let type = e.currentTarget.dataset.type;
    let peopleNum = that.data.peopleNum;
    let wolfNum = that.data.wolfNum;
    if(type == 1){
      if(peopleNum > 0){
        peopleNum = peopleNum - 1;
        that.setData({
          peopleNum: peopleNum
        })
      }
    }else if(type == 2){
      if(wolfNum > 0){
        wolfNum = wolfNum - 1;
        that.setData({
          wolfNum: wolfNum
        })
      }
    }
  },
  //加
  add(e) {
    let that = this;
    let type = e.currentTarget.dataset.type;
    let peopleNum = that.data.peopleNum;
    let wolfNum = that.data.wolfNum;
    if(type == 1){
      peopleNum = peopleNum + 1;
      that.setData({
        peopleNum: peopleNum
      })
    }else if(type == 2){
      wolfNum = wolfNum + 1;
      that.setData({
        wolfNum: wolfNum
      })
    }
  },
  //提交
  submit() {
    let that = this;
    let god = [];
    let str = '';
    let total = 0;
    for(let i = 0 ; i < that.data.godArr.length ; i++){
      if(that.data.godArr[i].status){
        god.push(that.data.godArr[i].name);
        str = str + that.data.godArr[i].name + '、';
      }
    }
    if(that.data.peopleNum == 0){
      wx.showToast({
        title: '请增加村民数量',
        icon: 'none',
        duration: 2000
      })
    }else if(that.data.wolfNum == 0){
      wx.showToast({
        title: '请增加狼人数量',
        icon: 'none',
        duration: 2000
      })
    }else{
      total = god.length + that.data.peopleNum + that.data.wolfNum;
      wx.showModal({
        title: total+'人配置',
        content: '您已选择'+str+'村民×'+that.data.peopleNum+'、狼人×'+that.data.wolfNum,
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/grouping/werewolf/result?total='+total+'&god='+god+'&people='+that.data.peopleNum+'&wolf='+that.data.wolfNum
            })
          }
        }
      })
    }
  }
})
