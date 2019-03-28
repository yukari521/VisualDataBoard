<template>
    <div id="sexPictorialBar"></div>
</template>

<script>
import axios from 'axios';
import sexIcon from '../assets/js/iconbase64.js';
export default {
  name: 'sexPictorialBar',
  props: ['date'],
  data() {
    return {
      pictorialBarChart: null,
      options: {
        title: {
          text: '男女比例',
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
          left: '30%',
          top: 10
        },
        legend: {
          selectedMode: false,
          left: '30%',
          top: 50,
          textStyle: {
            color: '#fff'
          },
          itemWidth: 11.6,
          itemHeight: 22.8,
          data: [
            {
              name: '男性',
              icon: 'image://' + sexIcon.list.male
            },
            { name: '女性', icon: 'image://' + sexIcon.list.female }
          ]
        },
        xAxis: {
          max: 100,
          splitLine: { show: false },
          offset: 10,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          data: ['人数'],
          inverse: true,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            show: false
          }
        },
        grid: {
          containLabel: true,
          top: '40%',
          left: 0,
          right: '20%'
        },
        series: [
          {
            type: 'pictorialBar',
            name: '男性',
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  return params.value + '%';
                },
                position: 'right',
                offset: [10, 0],
                textStyle: {
                  color: '#fff',
                  fontSize: 18
                }
              }
            },
            symbolRepeat: true,
            symbolSize: [22.272, 43.766],
            barCategoryGap: '0%',
            data: [
              {
                value: null,
                symbol: 'image://' + sexIcon.list.male
              }
            ]
          },
          {
            type: 'pictorialBar',
            name: '女性',
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  return params.value + '%';
                },
                position: 'right',
                offset: [10, 0],
                textStyle: {
                  color: '#fff',
                  fontSize: 18
                }
              }
            },
            barWidth: '50%',
            symbolRepeat: true,
            symbolSize: [22.272, 43.766],
            barGap: 20,
            barCategoryGap: '0%',
            data: [
              {
                value: null,
                symbol: 'image://' + sexIcon.list.female
              }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.chartInit();
    setInterval(() => { this.updateData(); }, 300000);
  },
  methods: {
    chartInit() {
      var that = this;
    axios({
      method: 'POST',
      url: that.baseUrl + 'api/Report/SexPictorialBar',
      data: {
        DateLine: that.date,
        ST: that.$route.query.st
      }
    }).then(res => {
      // if (res.data.length == 2) {
        var maleVal, femaleVal;
        if (res.data.length > 0) {
          res.data.forEach(item => {
            if (item.name == '男') {
              maleVal = item.value;
            } else if (item.name == '女') {
              femaleVal = item.value;
            }
          });
          var totalVal = maleVal + femaleVal;
          that.options.series[0].data[0].value = ((maleVal / totalVal) * 100).toFixed(0);
          that.options.series[1].data[0].value = 100 - ((maleVal / totalVal) * 100).toFixed(0);
        }else {
          that.options.series[0].data[0].value = 50;
          that.options.series[1].data[0].value = 50;
        }
        that.pictorialBarChart = that.$echarts.init(
          document.getElementById('sexPictorialBar')
        );
        that.pictorialBarChart.setOption(that.options);
      // }
    });
    },
    updateData() {
      var that = this;
    axios({
      method: 'POST',
      url: that.baseUrl + 'api/Report/SexPictorialBar',
      data: {
        DateLine: that.date,
        ST: that.$route.query.st
      }
    }).then(res => {
      if (res.data.length == 2) {
        var maleVal, femaleVal;
        res.data.forEach(item => {
          if (item.name == '男') {
            maleVal = item.value;
          } else if (item.name == '女') {
            femaleVal = item.value;
          }
        });
        var totalVal = maleVal + femaleVal;
        that.options.series[0].data[0].value = ((maleVal / totalVal) * 100).toFixed(0);
        that.options.series[1].data[0].value = 100 - ((maleVal / totalVal) * 100).toFixed(0);
      }
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
#sexPictorialBar {
  width: 100%;
  height: 100%;
}
</style>
