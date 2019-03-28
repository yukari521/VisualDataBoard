<template>
    <div id="getInLine"></div>
</template>

<script>
import axios from "axios";
import { setInterval } from "timers";
export default {
  data() {
    return {
      lineChart: null,
      options: {
        title: {
          text: "进馆人数统计",
          textStyle: {
            color: "#fff",
            fontWeight: "normal",
            fontSize: "18"
          },
          left: "4%",
          top: "2%"
        },
        legend: {
          data: [
            // { name: "", icon: "circle" },
            // { name: "", icon: "circle" },
            // { name: "", icon: "circle" }
          ],
          itemWidth: 10,
          itemGap: 14,
          textStyle: {
            color: "#fff"
          },
          right: "4%",
          top: "14%"
        },
        grid: {
          left: "4%",
          right: "4%",
          bottom: "6%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#fff"
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
          type: "value",
          axisLabel: {
            color: "#fff"
          },
          axisLine: {
            show: false
          },
          axisTick: { show: false },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["rgba(179,227,255,0.1)"]
            }
          }
        },
        // color: ["#fb106e", "#1699e5", "#f5f364"],
        series: [
          // {
          //   data: [],
          //   name: "",
          //   type: "line",
          //   smooth: true
          // },
          // {
          //   data: [],
          //   name: "",
          //   type: "line",
          //   smooth: true
          // },
          // {
          //   data: [],
          //   name: "",
          //   type: "line",
          //   smooth: true
          // }
        ]
      }
    };
  },
  mounted() {
    var that = this;
    axios({
      method: "POST",
      url: that.baseUrl + "api/Report/In",
      data: {
        DateLine: that.getNowFormatDate(),
        ST: that.$route.query.st
      }
    }).then(res => {
      that.options.xAxis.data = res.data.names;
      res.data.devices.forEach((i, n) => {
        that.options.legend.data.push({ name: i, icon: "circle" });
        that.options.series.push({
          data: res.data.datas[n],
          name: i,
          type: "line",
          smooth: true
        });
      });
      // that.options.legend.data[0].name = res.data.devices[0];
      // that.options.legend.data[1].name = res.data.devices[1];
      // that.options.legend.data[2].name = res.data.devices[2];
      // that.options.series[0].name = res.data.devices[0];
      // that.options.series[1].name = res.data.devices[1];
      // that.options.series[2].name = res.data.devices[2];
      // that.options.series[0].data = res.data.datas[0];
      // that.options.series[1].data = res.data.datas[1];
      // that.options.series[2].data = res.data.datas[2];
      that.lineChart = that.$echarts.init(document.getElementById("getInLine"));
      that.lineChart.setOption(that.options);
    });
    setInterval(() => {
      this.updateData();
    }, 3600000);
  },
  methods: {
    updateData() {
      var that = this;
      axios({
        method: "POST",
        url: that.baseUrl + "api/Report/In",
        data: {
          DateLine: that.getNowFormatDate(),
          ST: that.$route.query.st
        }
      }).then(res => {
        that.options.xAxis.data = res.data.names;
        res.data.devices.forEach((i, n) => {
          that.options.legend.data.push({ name: i, icon: "circle" });
          that.options.series.push({
            data: res.data.datas[n],
            name: i,
            type: "line",
            smooth: true
          });
        });
        // that.options.legend.data[0].name = res.data.devices[0];
        // that.options.legend.data[1].name = res.data.devices[1];
        // that.options.legend.data[2].name = res.data.devices[2];
        // that.options.series[0].name = res.data.devices[0];
        // that.options.series[1].name = res.data.devices[1];
        // that.options.series[2].name = res.data.devices[2];
        // that.options.series[0].data = res.data.datas[0];
        // that.options.series[1].data = res.data.datas[1];
        // that.options.series[2].data = res.data.datas[2];
      });
    }
  }
};
</script>

<style>
#getInLine {
  width: 95.2vw;
  height: 47.083vw;
}
</style>
