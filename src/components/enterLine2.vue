<template>
    <div id="enterLine"></div>
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
          text: '实时进馆人数',
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
          left: '40%',
          top: 10
        },
        tooltip: {
          show: true
        },
        grid: {
          left: '15%'
        },
        legend: {
          data: [
            { name: '进馆人数', icon: 'rect' }
          ],
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
        color: ['#fb106e', '#1699e5'],
        series: [
          {
            data: [],
            name: '进馆人数',
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
                      color: 'rgba(22,153,229,0.4)' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(22,153,229,0.05)' // 100% 处的颜色
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
    setInterval(() => { this.updateData(); }, 600000);
  },
  methods: {
    chartInit() {
      var that = this;
    axios({
      method: 'POST',
      url: that.baseUrl + 'api/Report/EnterLine',
      data: {
        DateLine: that.date,
        ST: that.$route.query.st
      }
    }).then(res => {
      if (res.data && res.data.names.length > 0) {
        that.options.xAxis.data = res.data.names;
        that.options.series[0].data = res.data.datas[1];
        // that.options.series[1].data = res.data.datas[1];
      } else {
        that.options.xAxis.data = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
        that.options.series[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        // that.options.series[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
        that.lineChart = that.$echarts.init(
          document.getElementById('enterLine')
        );
        that.lineChart.setOption(that.options);
      // }
    });
    },
    updateData() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/Report/EnterLine',
        data: {
          DateLine: that.date,
          ST: that.$route.query.st
        }
      }).then(res => {
        if (res.data && res.data.names) {
          that.options.xAxis.data = res.data.names;
          that.options.series[0].data = res.data.datas[1];
          // that.options.series[1].data = res.data.datas[1];
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
#enterLine {
  width: 100%;
  height: 100%;
}
</style>
