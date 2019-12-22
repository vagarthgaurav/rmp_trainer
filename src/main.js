import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueCookies from 'vue-cookies'


Vue.use(VueCookies)

const ax = axios.create({
  baseURL: 'http://api.formavisioplus.com/v1'
})

Vue.prototype.$http = ax

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
