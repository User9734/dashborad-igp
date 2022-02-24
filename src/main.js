import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'
import Default from "./layouts/default.vue";
import Auth from "./layouts/auth.vue";
import Vuex from 'vuex'
import axios from 'axios'
import { DataTable } from 'datatables.net'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'



const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
}
Vue.use(Vuex)
Vue.use(Chartkick.use(Chart))
Vue.use(store)
Vue.component('DataTable', DataTable);

Vue.component('Default',Default);
Vue.component('Auth',Auth);

Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
