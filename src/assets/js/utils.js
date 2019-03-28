export default{
  install (Vue) {
    Vue.prototype.baseUrl = 'http://hdapi.11cm.com.cn/';
    Vue.prototype.esUrl = 'https://es.11cm.com.cn/';
    Vue.prototype.getNowFormatDate=function() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  }
};
