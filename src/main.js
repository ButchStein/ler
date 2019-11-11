import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueAnalytics from 'vue-analytics'
import VueYandexMetrika from 'vue-yandex-metrika'                               
 
Vue.use(VueYandexMetrika, {
    id: 51236371,
    env: process.env.NODE_ENV 
})

Vue.use(VueAnalytics, {
  id: 'UA-20002277-27',
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})

const VueScrollTo = require('vue-scrollto');
const VueInputMask = require('vue-inputmask').default

Vue.use(VueScrollTo)
Vue.use(VueInputMask)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
