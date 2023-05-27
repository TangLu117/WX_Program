// 定义城市、天气、温度、风级、图片,日期参数
var defaultcity, getweather, gettemp, getwind, getpic, getdate
var vurl = 'http://wthrcdn.etouch.cn/weather_mini?city='
Page({
  data: {},
  // 初始化加载
  onLoad: function (e) {
    // 默认城市名称
    defaultcity = '长沙'
    this.weather()
  },
  // 动态获取input输入值 城市名称
  bindKeyInput: function (e) {
    defaultcity = e.detail.value
  },
  // 搜索城市
  search: function (e) {
    this.weather()
  },
  weather: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: vurl + defaultcity,
      success: res => {
        console.log(res.data)
        if (!res.data) {
          console.log('获取天气接口失败')
          return
        }
        getweather = res.data.data.forecast[0].high + '\n' + res.data.data.forecast[0].low
        gettemp = res.data.data.forecast[0].high
        getwind = res.data.data.forecast[0].fengxiang + '，' + res.data.data.forecast[0].fengli.replace(/<\!\[CDATA\[(.*)\]\]>/, '$1')
        getpic = ''
        getdate = res.data.data.forecast[0].date
        this.setData({
          city: defaultcity,
          weather: getweather,
          temp: gettemp,
          wind: getwind,
          pic: getpic,
          date: getdate
        })
        wx.hideLoading()
      }
    })
  }
})