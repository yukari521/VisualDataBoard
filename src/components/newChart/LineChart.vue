<template>
  <div class="chart">
    <div :id="ChartId"></div>
  </div>
</template>

<script>
export default {
  props: {
    ChartId: {
      type: String,
      default: null,
      required: true
    },
    date: {
      type: String,
      default: null,
      required: true
    },
    setChart: {
      type: Function,
      default: null,
      required: true
    }
  },
  mounted() {
    this.setChart();
    // this.$nextTick(function() {
      setInterval(() => { this.setChart(); }, 300000);
    // });
  },
  watch: {
    date: function(val, oldVal) {
      if(val){
        this.setChart();
      } 
    }
  }
};
</script>

<style>
@media screen and (min-width: 768px) {
  .chart {
    width: 100%;
    height: 23.802vw;
    position: relative;
    margin: 0 auto;
    /* background: url("../../assets/img/bg_2.png") no-repeat;
    background-size: 100% 100%; */
  }
  .chart > div {
    width: 100%;
    height: 23.802vw;
  }
}
@media screen and (max-width: 768px) {
  .chart {
    width: 100%;
    height: 60vw;
    position: relative;
    margin: 0 auto;
   /* background: url("../../assets/img/bg_2.png") no-repeat;
    background-size: 100% 100%; */
  }
  .chart > div {
    width: 100%;
    height: 60vw;
  }
  
}
/* @keyframes clipMb {
  0%,
  100% {
    clip: rect(0, 92vw, 64vw, 88vw);
  }
  25% {
    clip: rect(0, 92vw, 4vw, 0);
  }
  50% {
    clip: rect(0, 4vw, 64vw, 0);
  }
  75% {
    clip: rect(60vw, 92vw, 92vw, 0);
  }
}
@keyframes clipPc {
  0%,
  100% {
    clip: rect(0, 82vw, 42vw, 78vw);
  }
  25% {
    clip: rect(0, 82vw, 4vw, 0);
  }
  50% {
    clip: rect(0, 4vw, 42vw, 0);
  }
  75% {
    clip: rect(38vw, 82vw, 82vw, 0);
  }
} */
</style>
