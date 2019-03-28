<template>
    <div id="outLine"></div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['date'],
  data() {
    return {
      lineChart: null,
      options: {
        title: {
          text: '实时出馆人数',
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
          left: '40%',
          top: 10
        },
        grid: {
          left: '15%'
        },
        tooltip: {
          show: true
        },
        legend: {
          data: [{ name: '出馆人数', icon: 'rect' }],
          itemWidth: 14,
          textStyle: {
            color: '#fff'
          },
          right: '10%',
          top: '20%'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            show: false
          },
          axisTick: { show: false },
          splitLine: {
            show: false
          },
          data: []
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            show: false
          },
          axisTick: { show: false },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(179,227,255,0.1)']
            }
          }
        },
        color: ['rgb(222,44,44)'],
        series: [
          {
            data: [],
            name: '出馆人数',
            type: 'line',
            smooth: true,
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(222,44,44,0.4)' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(222,44,44,0.05)' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.chartInit();
    setInterval(() => {
      this.updateData();
    }, 600000);
  },
  methods: {
    chartInit() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/Report/outLine',
        data: {
          DateLine: that.date,
          ST: that.$route.query.st
        }
      }).then(res => {
        if (res.data && res.data.names) {
          that.options.xAxis.data = res.data.names;
          that.options.series[0].data = res.data.datas[0];
        } else {
          that.options.xAxis.data = [
            '9:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00'
          ];
          that.options.series[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }

        that.lineChart = that.$echarts.init(document.getElementById('outLine'));
        that.lineChart.setOption(that.options);
      });
    },
    updateData() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/Report/outLine',
        data: {
          DateLine: that.date,
          ST: that.$route.query.st
        }
      }).then(res => {
        if (res.data && res.data.names.length > 0) {
          that.options.xAxis.data = res.data.names;
          that.options.series[0].data = res.data.datas[0];
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
#outLine {
  width: 100%;
  height: 100%;
}
</style>
