<template>
  <div id="areaMap"></div>
</template>

<script>
import axios from 'axios';
import '../../node_modules/echarts/map/js/china.js';
export default {
  props: ['date'],
  data() {
    return {
      mapChart: null,
      options: {
        title: {
          text: '区域分布',
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
          left: '30%',
          top: 10
        },
        legend: {
          show: false
        },
        geo: {
          show: false
        },
        tooltip: {
          show: false
        },
        series: [
          {
            type: 'map',
            map: 'china',
            itemStyle: {
              normal: {
                areaColor: '#1699e5'
              },
              emphasis: {
                areaColor: '#fb106e'
              }
            },
            showLegendSymbol: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              show: false
            },
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
        url: that.baseUrl + 'api/Report/AreaMap',
        data: {
          DateLine: that.date,
          ST: that.$route.query.st
        }
      }).then(res => {
        res.data.forEach(item => {
          item.selected = true;
        });
        that.options.series[0].data = res.data;
        that.mapChart = that.$echarts.init(document.getElementById('areaMap'));
        that.mapChart.setOption(that.options);
      });
    },
    updateData() {
      var that = this;
      axios({
        method: 'POST',
        url: that.baseUrl + 'api/Report/AreaMap',
        data: {
          DateLine: that.date,
          ST: that.$route.query.st
        }
      }).then(res => {
        res.data.forEach(item => {
          item.selected = true;
        });
        that.options.series[0].data = res.data;
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
#areaMap {
  width: 100%;
  height: 100%;
}
</style>
