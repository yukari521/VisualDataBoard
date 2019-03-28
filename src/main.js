// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Common from './assets/js/utils';
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
import echarts from 'echarts';
// import VCharts from 'v-charts'
Vue.prototype.$echarts = echarts;
// Vue.use(iView);
Vue.use(Common);
// Vue.use(VCharts)

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
