<template>
    <div id="cityBar"></div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['date'],
  data() {
    return {
      cityChart: null,
      options: {
        title: {
          text: '城市分布',
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
          left: '30%',
          top: 10
        },
        grid: {
          left: '20%'
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: '#fff',
            align: 'right'
          },
          data: []
        },
        color: ['#fb106e'],
        series: [
          {
            type: 'bar',
            label: {
              normal: {
                show: true,
                color: '#fff',
                position: ['101%', '-5']
              }
            },
            barWidth: 5,
            data: []
          }
        ]
      }
    };
  },
  mounted() {
    this.chartInit();
    setInterval(() => {
      this.updateData();
    }, 300000);
  },
  methods: {
    chartInit() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/Report/CityBar',
        data: {
          DateLine: that.date,
          ST: that.$route.query.st
        }
      }).then(res => {
        var yAxisData = [];
        res.data.forEach(item => {
          yAxisData.push(item.name);
        });
        that.options.series[0].data = res.data;
        that.options.yAxis.data = yAxisData;
        that.cityChart = that.$echarts.init(document.getElementById('cityBar'));
        that.cityChart.setOption(that.options);
      });
    },
    updateData() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/Report/CityBar',
        data: {
          DateLine: that.date,
          ST: that.$route.query.st
        }
      }).then(res => {
        var yAxisData = [];
        res.data.forEach(item => {
          yAxisData.push(item.name);
        });
        that.options.series[0].data = res.data;
        that.options.yAxis.data = yAxisData;
      });
    }
  },
  watch: {
    date: function(val, oldVal) {
      this.chartInit();
    }
  }
};
</script>

<style>
#cityBar {
  width: 100%;
  height: 100%;
}
</style>
