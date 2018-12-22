const app = getApp();

Page({
  data: {
    arrData: [],
    cardMask: false,
    cardStatus: false,
    type: '',
    cardType: 0,
    start: false,
    isJudge: false
  },
  onLoad(options) {
    let that = this;
    let total = options.total;
    let god = options.god;
    let people = options.people;
    let wolf = options.wolf;
    let array = [];
    if(god){
      array = god.split(',');
    }
    for(let i=0; i<people; i++){
      array.push('村民');
    }
    for(let i=0; i<wolf; i++){
      array.push('狼人');
    }
    console.log(array);
    for(let i=0; i<total; i++){
      let id = 'arrData['+i+'].id';
      let status = 'arrData['+i+'].status';
      that.setData({
        [id]: i+1,
        [status]: true
      })
    }
    for(let i=0; i<total; i++){
      let itemIndex = Math.floor(Math.random()*array.length);
      let item = array[itemIndex];
      let name = 'arrData['+i+'].name';
      if(!that.data.arrData[i].name){
        that.setData({
          [name]: item
        })
        array.splice(itemIndex, 1);
      }
      
    }
    console.log(that.data.arrData);
  },
  //坐下
  sitDown(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    that.setData({
      type: name
    })
    let status = 'arrData['+ index +'].status';
    if(that.data.arrData[index].status){
      that.setData({
        [status]: false,
        cardMask: true
      })
    }else {
      wx.showToast({
        title: '该身份已被抢',
        icon: 'none',
        duration: 2000
      })
    }
  },
  card() {
    let that = this;
    let type = that.data.type;
    let cardType = 0;
    let status = false;
    switch(type){
      case '预言家':
        cardType = 1;
        break;
      case '女巫':
        cardType = 2;
        break;
      case '猎人':
        cardType = 3;
        break;
      case '村民':
        cardType = 4;
        break;
      case '狼人':
        cardType = 5;
        break;
    }
    if(that.data.cardType==0){
      that.setData({
        cardType: cardType
      })
    }else {
      that.setData({
        cardMask: false,
        cardType: 0
      })
      that.data.arrData.forEach((item,index)=> {
        if(item.status) {
          status = true;
        }
      })
      if(status == false){
        that.setData({
          start: true
        })
      }
    }
  },
  openJudge() {
    let that = this;
    that.setData({
      isJudge: true
    })
  },
  closeJudge() {
    let that = this;
    that.setData({
      isJudge: false
    })
  }
})
