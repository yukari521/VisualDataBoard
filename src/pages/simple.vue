<template>
    <div class="simple-container">
        <!-- <div class="date-list" v-show="topShow">
          <div class="date-item" v-for="item in dateList" @click="checkItemDate(item)">
            {{item}}
          </div>
        </div> -->
        <div class="simple-content">
            <div class="simple-top">
                <div class="logo"><img src="../assets/img/logo.png" alt=""></div>
                <div class="simple-top-content">
                    <div class="title">{{theme}}</div>
                    <div class="time" @click="checkDate">{{dateTime}}</div>
                    <div class="company">技术支持：壹亿互动(厦门)科技有限公司</div>
                </div>  
            </div>
            <div class="simple-middle">
              <div class="middle-box">
                <div class="title">今日总人次</div>
                <div class="number">{{enterNum}}</div>
              </div>
              <div class="middle-box">
                <div class="title">场内人数</div>
                <div class="number">{{popGauge}}</div>
              </div>    
            </div>
            <div class="simple-bottom">
                <div class="plot-ratio">
                    <div class="title">场内容积率</div>
                    <div class="number">场内可容纳人数{{maxNum}}人</div>
                </div>
                <div class="guage-chart">
                    <!-- <Progress :percent="(popGauge*100/maxNum).toFixed(1)-0" status="active" /> -->
                    <guage-bar :date="dateTime" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GuageBar from '../components/guagePictorialBar';
import axios from 'axios';
import { setInterval } from 'timers';
export default {
  name: 'Simple',
  components: {
    'guage-bar': GuageBar
  },
  data() {
    return {
      dateTime: '',
      title: '',
      theme: '',
      totalNum: '',
      signNum: '',
      enterNum: '',
      popGauge: '',
      maxNum: '',
      dateList: [],
      topShow: false
    };
  },
  created() {
    this.dateTime = this.$route.query.date
      ? this.$route.query.date
      : this.getNowFormatDate();
    this.getCreditCheckDate();
    this.updateData();
    this.updateVenue();
  },
  mounted() {
    setInterval(() => {
      this.updateData();
    }, 60000);
    setInterval(() => {
      this.updateVenue();
    }, 50000);
  },
  methods: {
    checkItemDate(item) {
      this.dateTime = item;
      this.topShow = false;
      this.updateData();
      this.updateVenue();
    },
    checkDate() {
      this.topShow = !this.topShow;
    },
    getCreditCheckDate() {
      var that = this;
      axios({
        method: 'GET',
        headers: { 'X-Custom-Header': 'foobar' },
        url:
          that.baseUrl + 'api/report/getCreditCheckDate/' + that.$route.query.st
      }).then(res => {
        that.dateList = res.data.Data;
      });
    },
    randomNum(max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    updateData() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/Report/GetData',
        data: {
          DateLine: that.dateTime,
          ST: that.$route.query.st
        }
      }).then(res => {
        that.totalNum = res.data.SingUserNum;
        that.signNum = res.data.AttendUserNum;
        that.enterNum = res.data.SignNum;
        that.theme = res.data.Theme;
        document.title = res.data.Theme;
      });
    },
    updateVenue() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/Report/GetVenueData',
        data: {
          DateLine: that.dateTime,
          ST: that.$route.query.st
        }
      }).then(res => {
        if (res.data.PopGauge > res.data.MaxNumber * 0.8) {
          that.popGauge = that.randomNum(
            Math.floor(res.data.MaxNumber * 0.82),
            Math.floor(res.data.MaxNumber * 0.78)
          );
        } else if (res.data.PopGauge < 0) {
          that.popGauge = 0;
        } else {
          that.popGauge = res.data.PopGauge;
        }
        that.maxNum = res.data.MaxNumber;
      });
    }
  }
};
</script>

<style>
.simple-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.simple-content {
  width: 100%;
  max-width: 750px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.simple-top {
  width: 90%;
  height: 100px;
  background: url("../assets/img/top_left.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 30px 0;
}
.simple-top .logo {
  width: 60px;
  height: 60px;
}
.simple-top .logo > img {
  width: 100%;
  height: 100%;
}
.simple-top-content {
  min-width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.simple-top-content .title {
  color: #0ecee7;
  font-size: 1.5em;
}
.simple-top-content .time {
  color: #0ecee7;
  font-size: 1.3em;
}
.simple-top-content .company {
  color: #0ecee7;
  font-size: 1em;
}
.simple-middle {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.middle-box {
  width: 45%;
  height: 90px;
  background: url("../assets/img/top_middle.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 1.3em;
}
.middle-box .number {
  font-size: 2em;
}
.simple-bottom {
  width: 90%;
  height: 120px;
  background: url("../assets/img/top_right.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 30px 0;
}
.plot-ratio {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.plot-ratio .title {
  font-size: 1.5em;
}
.plot-ratio .number {
  font-size: 1em;
  color: #28f000;
}
.guage-chart {
  width: 100%;
  height: 50%;
  padding: 0 5px;
  display: flex;
  align-items: center;
  color: #1699e5;
}
</style>
