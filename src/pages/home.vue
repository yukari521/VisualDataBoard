<template>
    <div class="board-container">
        <div class="date-list" v-show="topShow">
          <div class="date-item" v-for="item in dateList" @click="checkItemDate(item)">
            {{item}}
          </div>
        </div>
        <div class="header-content">
            <div class="header-left">
                <div class="logo"><img src="../assets/img/logo.png" alt=""></div>
                <div class="header-left-content">
                    <div class="title">{{Theme}}</div>
                    <div class="time" @click="checkDate">{{dateTime}}</div>
                    <div class="company">技术支持：壹亿互动(厦门)科技有限公司</div>
                </div>  
            </div>
            <div class="header-middle">
                <div class="title">今日总人数</div>
                <div class="number">{{totalNum}}</div>
            </div>
            <div class="header-middle">
                <div class="title">今日总人次</div>
                <div class="number">{{enterNum}}</div>
            </div>
            <div class="header-middle">
                <div class="title">今日报名人数</div>
                <div class="number">{{signNum}}</div>
            </div>
            <div class="header-middle">
                <div class="title">场内人数</div>
                <div class="number">{{popGauge}}</div>
            </div>
            <div class="header-right">
                <div class="plot-ratio">
                    <div class="title">场内容积率</div>
                    <div class="number">场内可容纳人数{{maxNum}}人</div>
                </div>
                <div class="right-chart">
                    <!-- <Progress :percent="(popGauge*100/maxNum).toFixed(1)-0" status="active" /> -->
                    <guage-bar :date="dateTime" />
                </div>
            </div>
        </div>
        <div class="chart-content">
            <div class="left-box">
                <div class="pie-chart">
                    <div class="age-pie">
                      <age-pie :date="dateTime"/>
                    </div>
                   <div class="sex-pictorialbar">
                     <sex-pictorialBar :date="dateTime"/>
                   </div>  
                </div>
                <div class="map-chart">
                    <div class="area-map">
                      <area-map :date="dateTime"/>
                    </div>
                    <div class="city-bar">
                      <city-bar :date="dateTime"/>
                    </div>                    
                </div>
            </div>
            <div class="right-box">
                <div class="top-chart">
                    <enter-line :date="dateTime"/>
                </div>
                <div class="bottom-chart">
                    <out-line :date="dateTime"/>
                </div>
            </div>
        </div>
        <div class="footer-content"></div>
    </div>
</template>

<script>
import GuageBar from '../components/guagePictorialBar';
import AgePie from '../components/agePie.vue';
// import SexPie from '../components/sexPie.vue'
import AreaMap from '../components/areaMap.vue';
import SexPictorialBar from '../components/sexPictorialBar.vue';
import CityBar from '../components/cityBar.vue';
import EnterLine from '../components/enterLine.vue';
import OutLine from '../components/outLine.vue';
import axios from 'axios';
import { setInterval } from 'timers';
export default {
  name: 'Home',
  components: {
    'age-pie': AgePie,
    // 'sex-pie':SexPie,
    'area-map': AreaMap,
    'sex-pictorialBar': SexPictorialBar,
    'city-bar': CityBar,
    'enter-line': EnterLine,
    'out-line': OutLine,
    'guage-bar': GuageBar
  },
  data() {
    return {
      dateTime: '',
      title: '',
      totalNum: '',
      signNum: '',
      enterNum: '',
      popGauge: '',
      maxNum: '',
      dateList: [],
      topShow: false,
      Theme: ''
    };
  },
  created() {
    this.dateTime = this.$route.query.date ? this.$route.query.date : this.getNowFormatDate();
    // var that = this;
    // axios({
    //   method: 'GET',
    //   url: that.esUrl + '/api/exhibition/getCredit/' + that.$route.query.st
    // }).then(res => {
    //   console.log(res);
    // });
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
        that.Theme = res.data.Theme;
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
@import "../assets/css/style.css";
</style>
