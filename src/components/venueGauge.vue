<template>
    <div id="gaugePictorialBar"></div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'gaugePictorialBar',
  props: ['date'],
  data() {
    return {
      gaugeChart: null,
      options: {
        title: {
          show: false
        },
        legend: {
          show: false
        },
        grid: {
          left: 5,
          right: 70
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
          data: ['容积率'],
          inverse: true,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            show: false
          }
        },
        series: [{
            type: 'pictorialBar',
            itemStyle: {
              normal: {
                color: '#28f000'
              }
            },
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  return params.value + '%';
                },
                position: 'right',
                offset: [10, 0],
                textStyle: {
                  color: '#28f000',
                  fontSize: 16
                }
              }
            },
            symbol: 'rect',
            symbolBoundingData: 100,
            symbolClip: true,
            symbolRepeat: 'fixed',
            symbolSize: [10, 20],
            symbolMargin: 4,
            barCategoryGap: '0%',
            data: [{value: ''}],
            z: 10
          },
          {
            type: 'pictorialBar',
            itemStyle: {
              normal: {
                color: '#0a1e49'
              }
            },
            symbol: 'rect',
            symbolRepeat: 'fixed',
            symbolSize: [10, 20],
            symbolMargin: 4,
            barCategoryGap: '0%',
            data: [{value: ''}],
            z: 5
          }
        ]
      }
    };
  },
  mounted() {
    this.chartInit();
    setInterval(() => {
      this.updateData();
    }, 50000);
  },
  methods: {
    chartInit() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/Report/GetVenueData',
        data: {
          DateLine: that.date,
          ST: that.$route.query.st
        }
      }).then(res => {
        var num;
        if (res.data.PopGauge > res.data.MaxNumber) {
          num = res.data.MaxNumber;
        } else if (res.data.PopGauge < 0) {
          num = 0;
        } else {
          num = res.data.PopGauge;
        }
        var precent = (
          (num * 100) /
          res.data.MaxNumber
        ).toFixed(1);
        that.options.series[0].data[0].value = precent;
        that.options.series[1].data[0].value = 100 - precent;
        if (precent > 70 && precent < 82) {
          that.options.series[0].itemStyle.normal.color = '#fff43e';
          that.options.series[0].label.normal.textStyle.color = '#fff43e';
        }
        if (precent > 82) {
          that.options.series[0].itemStyle.normal.color = '#de2c2c';
          that.options.series[0].label.normal.textStyle.color = '#de2c2c';
        }
        that.gaugeChart = that.$echarts.init(
          document.getElementById('gaugePictorialBar')
        );
        that.gaugeChart.setOption(that.options);
      });
    },
    updateData() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/Report/GetVenueData',
        data: {
          DateLine: that.date,
          ST: that.$route.query.st
        }
      }).then(res => {
        var num;
        if (res.data.PopGauge > res.data.MaxNumber) {
          num = res.data.MaxNumber;
        } else if (res.data.PopGauge < 0) {
          num = 0;
        } else {
          num = res.data.PopGauge;
        }
        var precent = (
          (num * 100) /
          res.data.MaxNumber
        ).toFixed(1);
        that.options.series[0].data[0].value = precent;
        that.options.series[1].data[0].value = 100 - precent;
        if (precent > 70 && precent < 82) {
          that.options.series[0].itemStyle.normal.color = '#fff43e';
          that.options.series[0].label.normal.textStyle.color = '#fff43e';
        }
        if (precent > 82) {
          that.options.series[0].itemStyle.normal.color = '#de2c2c';
          that.options.series[0].label.normal.textStyle.color = '#de2c2c';
        }
      });
    }
  }
};
</script>

<style>
#gaugePictorialBar {
  width: 100%;
  height: 100%;
}
</style>
