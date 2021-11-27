import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.axios = axios

Vue.filter('setWH', (url, age) => {
  return url.replace(/w\.h/, age)
})

import Scriller from '@/components/Scroller'
Vue.component('Svriller', Scriller)

import Loading from '@/components/Loading'
Vue.component('Loading', Loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
