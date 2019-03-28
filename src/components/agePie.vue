<template>
    <div id="agePie"></div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'agePie',
  props: ['date'],
  data() {
    return {
      pieChart: null,
      options: {
        title: {
          text: '年龄段分布',
          textStyle: {
            color: '#fff'
          },
          left: '30%',
          top: 10
        },
        legend: {
          orient: 'vertical',
          top: '10%',
          right: '5%',
          textStyle: {
            color: '#fff'
          },
          data: []
        },
        color: [
          '#30aefb',
          '#1699e5',
          '#41b7fb',
          '#77cdff',
          '#afe0fc',
          '#005281'
        ],
        series: [
          {
            type: 'pie',
            radius: [0, '60%'],
            center: ['40%', '60%'],
            data: [],
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: '{d}%'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.chartInit();
    // 定时更新
    setInterval(() => {
      this.updataData();
    }, 300000);
  },
  methods: {
    chartInit() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/Report/AgePie',
        data: {
          DateLine: that.date,
          ST: that.$route.query.st
        }
      }).then(res => {
        var legendData = [];
        res.data.forEach(item => {
          legendData.push(item.name);
        });
        that.options.series[0].data = res.data;
        that.options.legend.data = legendData;
        that.pieChart = that.$echarts.init(document.getElementById('agePie'));
        that.pieChart.setOption(that.options);
      });
    },
    updataData() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/Report/AgePie',
        data: {
          DateLine: that.date,
          ST: that.$route.query.st
        }
      }).then(res => {
        var legendData = [];
        res.data.forEach(item => {
          legendData.push(item.name);
        });
        that.options.series[0].data = res.data;
        that.options.legend.data = legendData;
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
#agePie {
  width: 100%;
  height: 100%;
}
</style>
