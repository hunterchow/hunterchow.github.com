// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Router from 'vue-router';
import Resource from 'vue-resource';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';
import './common/stylus/index.styl';

Vue.use(Router);
Vue.use(Resource);

Vue.config.productionTip = false;
const routes = [
   {path: '/', redirect: '/goods'},
  {path: '/goods', component: goods},
  {path: '/seller', component: seller},
  {path: '/ratings', component: ratings}
];
const router = new Router({
  linkActiveClass: 'active',
  routes
});
const app = new Vue({
  router,
  render: h => h(App)
});
app.$mount('#app');

