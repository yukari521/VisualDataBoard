<template>
  <div class="board-container">
    <div class="chart-box">
      <div class="chart-info">
        <div class="info-box">
          <div class="theme-title">{{Theme}}</div>
          <div class="company">
            <div class="logo"><img src="../assets/img/logo.png" alt=""></div>
            <div class="name">技术支持：壹亿互动(厦门)科技有限公司</div>
          </div>
        </div>
        <!-- <div class="data-box">
          <div class="box-title">日期</div>
          <div class="box-value">{{dateLine}}</div>
        </div> -->
        <div class="data-box">
          <div class="box-title">活动时间</div>
          <div class="box-value">
            <el-date-picker
              :readonly="isPickerDate"
              v-model="dateLine"
              align="right"
              type="date"
              placeholder="选择日期"
              :editable="false"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>       
        <div class="data-box">
          <div class="box-title">实时进场人次</div>
          <div class="box-value">{{RealTimeEnterNum}}</div>
        </div>
        <div class="data-box">
          <div class="box-title">实时进场总人次</div>
          <div class="box-value">{{TotalEnterNum}}</div>
        </div>
        <div class="data-box">
          <div class="box-title">实时滞留人次</div>
          <div class="box-value">{{RetentionNum}}</div>
        </div>
        <div class="data-box">
          <div class="box-title">实时退场人次</div>
          <div class="box-value">{{RealTimeOutNum}}</div>
        </div>
        <div class="data-box">
          <div class="box-title">实时退场总人次</div>
          <div class="box-value">{{TotalOutNum}}</div>
        </div>
        <div class="data-box">
          <div class="box-title">数据更新时间</div>
          <div class="box-value">{{timpstamp|formatTime}}</div>
        </div>
      </div>
      <div class="chart-item">
        <line-chart ChartId="retention" :date="dateLine" :setChart="getRetention"/>
      </div>
      <div class="chart-item">
        <line-chart ChartId="enterRealTime" :date="dateLine" :setChart="getRealTimeEnter"/>
      </div>
      <div class="chart-item">
        <line-chart ChartId="enterTotal" :date="dateLine" :setChart="getTotalEnter"/>
      </div>
      <div class="chart-item">
        <line-chart ChartId="outRealTime" :date="dateLine" :setChart="getRealTimeOut"/>
      </div>
      <div class="chart-item">
        <line-chart ChartId="outTotal" :date="dateLine" :setChart="getTotalOut"/>
      </div>
    </div>
  </div>
</template>

<script>
import {DatePicker} from 'element-ui';
import moment from 'moment';
import LineChart from '../components/newChart/LineChart';
import getOptions from '../assets/js/options.js';
import axios from 'axios';
export default {
  name: 'NewDataBoard',
  data() {
    return {
      pickerOptions: {
        disabledDate: (time) => {
          let max = new Date(this.maxDate)-0
          let min = new Date(this.minDate)-86400000
          return time.getTime() > max || time.getTime() < min;
        }
      },
      RealTimeEnterData: {},
      TotalEnterData: {},
      RealTimeOutData: {},
      TotalOutData: {},
      RetentionData: {},
      dateLine: this.$route.query.date || this.getNowFormatDate(),
      isPickerDate: this.$route.query.date,
      Theme: '',
      maxDate: '',
      minDate: '',
      timpstamp: Date.now(),
      RealTimeEnterNum:0,
      TotalEnterNum: 0,
      RealTimeOutNum: 0,
      TotalOutNum: 0,
      RetentionNum: 0,
    };
  },
  components: {
    LineChart,
    'el-date-picker': DatePicker
  },
  filters: {
    formatTime(value) {
      return moment(value).format('YYYY-MM-DD  HH:mm:ss');
    }
  },
  created() {
    var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/Report/GetData',
        data: {
          DateLine: that.dateLine,
          ST: that.$route.params.st
        }
      }).then(res => {
        that.Theme = res.data.Theme;
        document.title = res.data.Theme;
      });
      axios({
        method: 'GET',
        url:
          that.baseUrl + 'api/report/getCreditCheckDate/' + that.$route.params.st
      }).then(res => {
        that.maxDate = res.data.Data[res.data.Data.length - 1];
        that.minDate = res.data.Data[0];
        if (new Date(that.$route.query.date) > new Date(that.minDate) && new Date(that.$route.query.date) < new Date(that.maxDate)) {
          that.dateLine = that.$route.query.date;
        } else if (Date.now() > new Date(that.minDate) && Date.now() < new Date(that.maxDate)) {
          that.dateLine = that.getNowFormatDate();
        } else {
          that.dateLine = that.minDate;
        }
      });
  },
  methods: {
    getRetention() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/NewReport/GetNumber',
        data: {
          DateLine: new Date(that.dateLine),
          ST: that.$route.params.st
        }
      }).then(res => {
        if (res.data.State) {
          this.RetentionData = getOptions();
          this.RetentionData.legend.data[0].name = '实时滞留人次';
          this.RetentionData.series[0].name = '实时滞留人次';
          this.RetentionData.title.text = '实时滞留人次';
          this.RetentionData.xAxis.data = res.data.Data.XData;
          this.RetentionData.series[0].data = res.data.Data.YData;
          this.RetentionNum = res.data.Data.YData[res.data.Data.YData.length-1]
          let lineChart = this.$echarts.init(
            document.getElementById('retention')
          );
          lineChart.setOption(this.RetentionData);
          this.timpstamp = Date.now();
        }
      });
    },
    getRealTimeEnter() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/NewReport/GetEnterNumber',
        data: {
          DateLine: new Date(that.dateLine),
          ST: that.$route.params.st
        }
      }).then(res => {
        if (res.data.State) {
          this.RealTimeEnterData = getOptions();
          this.RealTimeEnterData.legend.data[0].name = '实时进场人次';
          this.RealTimeEnterData.series[0].name = '实时进场人次';
          this.RealTimeEnterData.title.text = '实时进场人次';
          this.RealTimeEnterData.xAxis.data = res.data.Data.XData;
          this.RealTimeEnterData.series[0].data = res.data.Data.YData;
          this.RealTimeEnterNum = res.data.Data.YData[res.data.Data.YData.length-1]
          let lineChart = this.$echarts.init(
            document.getElementById('enterRealTime')
          );
          lineChart.setOption(this.RealTimeEnterData);
          this.timpstamp = Date.now();
        }
      });
    },
    getTotalEnter() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/NewReport/GetEnterSumNumber',
        data: {
          DateLine: new Date(that.dateLine),
          ST: that.$route.params.st
        }
      }).then(res => {
        if (res.data.State) {
          this.TotalEnterData = getOptions();
          this.TotalEnterData.legend.data[0].name = '实时进场总人次';
          this.TotalEnterData.series[0].name = '实时进场总人次';
          this.TotalEnterData.title.text = '实时进场总人次';
          this.TotalEnterData.xAxis.data = res.data.Data.XData;
          this.TotalEnterData.series[0].data = res.data.Data.YData;
          this.TotalEnterNum = res.data.Data.YData[res.data.Data.YData.length-1]
          let lineChart = this.$echarts.init(
            document.getElementById('enterTotal')
          );
          lineChart.setOption(this.TotalEnterData);
          this.timpstamp = Date.now();
        }
      });
    },
    getRealTimeOut() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/NewReport/GetOutNumber',
        data: {
          DateLine: new Date(that.dateLine),
          ST: that.$route.params.st
        }
      }).then(res => {
        if (res.data.State) {
          this.RealTimeOutData = getOptions();
          this.RealTimeOutData.legend.data[0].name = '实时退场人次';
          this.RealTimeOutData.series[0].name = '实时退场人次';
          this.RealTimeOutData.color = ['#1699e5'];
          this.RealTimeOutData.title.text = '实时退场人次';
          this.RealTimeOutData.xAxis.data = res.data.Data.XData;
          this.RealTimeOutData.series[0].data = res.data.Data.YData;
          this.RealTimeOutNum = res.data.Data.YData[res.data.Data.YData.length-1]
          let lineChart = this.$echarts.init(
            document.getElementById('outRealTime')
          );
          lineChart.setOption(this.RealTimeOutData);
          this.timpstamp = Date.now();
        }
      });
    },
    getTotalOut() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/NewReport/GetOutSumNumber',
        data: {
          DateLine: new Date(that.dateLine),
          ST: that.$route.params.st
        }
      }).then(res => {
        if (res.data.State) {
          this.TotalOutData = getOptions();
          this.TotalOutData.legend.data[0].name = '实时退场总人次';
          this.TotalOutData.series[0].name = '实时退场总人次';
          this.TotalOutData.color = ['#1699e5'];
          this.TotalOutData.title.text = '实时退场总人次';
          this.TotalOutData.xAxis.data = res.data.Data.XData;
          this.TotalOutData.series[0].data = res.data.Data.YData;
          this.TotalOutNum = res.data.Data.YData[res.data.Data.YData.length-1]
          let lineChart = this.$echarts.init(
            document.getElementById('outTotal')
          );
          lineChart.setOption(this.TotalOutData);
          this.timpstamp = Date.now();
        }
      });
    }
  }
};
</script>

<style>
@import "../../node_modules/element-ui/lib/theme-chalk/date-picker";
@import "../assets/css/style.css";
</style>
