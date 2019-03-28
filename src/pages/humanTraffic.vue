<template>
    <div class="ht-container">
        <div class="ht-header">
            <span class="ht-fs-20">数据概况</span>
            <span class="ht-fs-12">数据更新至{{today}}</span>
        </div>
        <div class="ht-nav">
            <div class="ht-nav-column" v-for="i in enterData">
                <span class="ht-fs-14 ht-c-sE">{{i.name}}</span>
                <span class="ht-fs-18">{{i.value}}</span>
            </div>
            <div class="ht-nav-column" v-for="j in outData">
                <span class="ht-fs-14 ht-c-sE">{{j.name}}</span>
                <span class="ht-fs-18">{{j.value}}</span>
            </div>            
        </div>
        <div class="ht-main">
            <div class="ht-main-subtitle">
                <span class="ht-fs-20">趋势分析</span>
                <span class="ht-fs-12">数据由智慧展务提供</span>
            </div>
            <div class="ht-main-row">
                <line-get-in></line-get-in>
            </div>
            <div class="ht-main-row">
                <line-get-out></line-get-out>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import GetInLine from '../components/getInLine.vue';
import GetOutLine from '../components/getOutLine.vue';
// import { setInterval } from 'timers';

export default {
  name: 'HumanTraffic',
  components: {
    'line-get-in': GetInLine,
    'line-get-out': GetOutLine
  },
  data() {
    return {
      today: this.getNowFormatDate(),
      enterData: [],
      outData: []
    };
  },
  created() {
    this.updateDataIn();
    this.updateDataOut();
  },
  mounted() {
    // setInterval(() => {
    //   this.updateDataIn();
    //   this.updateDataOut();
    // }, 60000);
  },
  methods: {
    updateDataIn() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/Report/GetTimeIn',
        data: {
          DateLine: that.getNowFormatDate(),
          ST: that.$route.query.st
        }
      }).then(res => {
        that.enterData = res.data;
      });
    },
    updateDataOut() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/Report/GetTimeOut',
        data: {
          DateLine: that.getNowFormatDate(),
          ST: that.$route.query.st
        }
      }).then(res => {
        that.outData = res.data;
      });
    }
  }
};
</script>

<style>
@import "../assets/css/humanTraffic.css";
</style>
