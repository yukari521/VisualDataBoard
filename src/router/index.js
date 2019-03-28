import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home';
import Home2 from '@/pages/home2';
import Simple from '@/pages/simple';
import HumanTraffic from '@/pages/humanTraffic';
import HumanTraffic2 from '@/pages/humanTraffic2';
import NewDataBoard from '@/pages/NewData';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/exact',
      name: 'Home2',
      component: Home2
    },
    {
      path: '/humanTraffic',
      name: 'HumanTraffic',
      component: HumanTraffic
    },
    {
      path: '/humanTraffic2',
      name: 'HumanTraffic2',
      component: HumanTraffic2
    },
    {
      path: '/simple',
      name: 'Simple',
      component: Simple
    },
    {
      path: '/new/:st',
      name: 'NewDataBoard',
      component: NewDataBoard
    }
  ]
});
