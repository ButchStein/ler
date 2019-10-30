import Vue from 'vue'
import App from './App.vue'
import store from './store'
const VueScrollTo = require('vue-scrollto');
const VueInputMask = require('vue-inputmask').default

Vue.use(VueScrollTo)
Vue.use(VueInputMask)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
