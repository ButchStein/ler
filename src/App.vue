<template>
  <main id="app">
    <app-header/>
    <component :is="current"/>
  </main>
</template>

<script>
import 'reset-css'
import './styles/grid.sass'
import './styles/forms.sass'
import './fonts/fonts.css'
import AppHeader from './components/template/Header'
import HouseChoose from './components/steps/HouseChoose'
import SmellChoose from './components/steps/SmellChoose'
import PeopleChoose from './components/steps/PeopleChoose'
import WaterChoose from './components/steps/WaterChoose'
import Analyses from './components/steps/Analyses'
import Finish from './components/steps/Finish'
import Feedback from './components/steps/Feedback'
import OrderForm from './components/steps/OrderForm'

export default {
  name: 'app',
  components: {
    AppHeader,
    SmellChoose,
    HouseChoose,
    PeopleChoose,
    WaterChoose,
    Analyses,
    Finish,
    Feedback,
    OrderForm
  },
  data() {
    return {
    }
  },
  computed: {
    current() {
      return this.$store.getters.currentStep;
    }
  },
  mounted() {
    this.$store.dispatch('loadGroups');
    this.$store.dispatch('loadProducts');
    this.$store.dispatch('loadPackages');
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: 'Myriad Pro', Arial, sans-serif;
}
body {
  font-family: 'Myriad Pro', Arial, sans-serif;
  font-size: 15px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666;
}
#app {
  min-height: 100vh;
}
.price {
  white-space: nowrap;
  &:after {
    content: ' \20BD';
    font-size: .89em;
    vertical-align: baseline;
    display: inline;
  }
  &-old {
    &:after {
      font-size: 1em;
    }
  }
}
a {
  color: #24BBF6;
  text-decoration: none;
  &:hover {
    color: darken(#24BBF6, 10%);
  }
}
.display-block {
  display: block;
}
.align-center {
  text-align: center;
}
</style>
