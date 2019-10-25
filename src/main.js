import Vue from 'vue'
import App from './App.vue'
import store from './store'
const VueInputMask = require('vue-inputmask').default

Vue.use(VueInputMask)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
