import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const api_url = 'http://guru.madex.pro/';

export default new Vuex.Store({
  state: {
    product: null,
    categories: [],
    groups: [],
    products: [],
    packages: [],
    step: 0,
    paths: {
      initial: ["HouseChoose"],
      flat: ["HouseChoose", "WaterChoose", "Analyses", "Finish", "OrderForm"],
      house: ["HouseChoose", "SmellChoose", "PeopleChoose", "WaterChoose", "Analyses", "Finish", "OrderForm"],
      dacha: ["HouseChoose", "SmellChoose", "PeopleChoose", "WaterChoose", "Analyses", "Finish", "OrderForm"],
      feedback: ["Feedback"]
    },
    path: ["HouseChoose"],
    cart: [],
    filter: {
      categories: null,
      is_home_count_p: null,
      hardness: false,
      fe: false,
      has_analyses: false,
      analyses: {
        hardness: '',
        fe: '',
        nitrati: '',
        mg: '',
        cd: '',
        cl: '',
        ni: '',
        f: ''
      }
    }
  },
  mutations: {
    setPath(state, path) {
      state.path = state.paths[path]
    },
    nextStep(state) {
      state.step++
    },
    prevStep(state) {
      state.step--
    },
    finish(state) {
      state.step = state.path.length-2
    },
    cartAddItem(state, id) {
      state.cart.push(id)
    },
    cartRemoveItem(state, id) {
      state.cart.splice( state.cart.indexOf(id), 1 )
    },
    setCategories(state, data) {
      state.categories = data
    },
    setGroups(state, data) {
      state.groups = data
    },
    setProducts(state, data) {
      state.products = data
    },
    setPackages(state, data) {
      state.packages = data
    },
    reset(state) {
      state.path = state.paths.initial
      state.step = 0
      state.cart = []
    },
    setFilter({filter}, data) {
      for(let key in data) {
        filter[key] = data[key]
      }
    },
    feedback(state) {
      state.path = state.paths.feedback
      state.step = 0
    },
    cartKomplect(state, komplect) {
      state.cart = []
      for(let key in komplect) {
        state.cart.push(komplect[key])
      }
    },
    show(state, item) {
      state.product = item
    },
    hide(state) {
      state.product = null
    }
  },
  actions: {
    loadCategories({commit}) {
      return new Promise(function(resolve, reject) {
        axios.get(api_url + 'categories').then( function(resp) {
          commit('setCategories', resp.data)
          resolve(resp)
        }).catch(function(err) {
          reject(err)
        })
      })
    },
    loadGroups({commit}) {
      return new Promise(function(resolve, reject) {
        axios.get(api_url + 'groups').then( function(resp) {
          commit('setGroups', resp.data)
          resolve(resp)
        }).catch(function(err) {
          reject(err)
        })
      })
    },
    loadProducts({commit}) {
      return new Promise(function(resolve, reject) {
        axios.get(api_url + 'products').then( function(resp) {
          commit('setProducts', resp.data)
          resolve(resp)
        }).catch(function(err) {
          reject(err)
        })
      })
    },
    loadPackages({commit}) {
      return new Promise(function(resolve, reject) {
        axios.get(api_url + 'packages').then( function(resp) {
          commit('setPackages', resp.data)
          resolve(resp)
        }).catch(function(err) {
          reject(err)
        })
      })
    },
  },
  getters: {
    path(state) {
      return state.path
    },
    currentStep(state) {
      return state.path[state.step]
    },
    step(state) {
      return state.step
    },
    cart(state) {
      return state.cart
    },
    categories({categories}) {
      return categories
    },
    packages({packages}) {
      return packages
    },
    products({products, filter}) {
      let result = [];
      for(let i = 0; i < products.length; i++) {
        let match = false
        // квартира, дача, дома
        if(products[i].categories.indexOf(filter.categories) < 0) continue;

        // количествео человек
        if(filter.categories < 3) { // для дома и дачи
          if(
              (products[i].is_home_count_p === "Оба ваианта") 
              || 
              (products[i].is_home_count_p === filter.is_home_count_p)
            ) {
              match = true
            } else {
              continue;
            }
        } 

        // характеристики
        if(products[i].is_depend_ch) { // не зависит
          match = true
        } else {
          let j = 0;
          for(let key in filter.analyses) {
            if(filter.analyses[key] !== '') { // если поле заполнено - матчим
              if(filter.analyses[key] <= products[i].analyses[key].max && 
                 filter.analyses[key] >= products[i].analyses[key].min) {
                   match = true
                 } else {
                   match = false
                 }
              j++;
            }
          }

          // если пользователь не заполнял анализы
          // проверяем чекбоксы
          if(j == 0) {
            match = ( filter.fe == products[i].filter_iron ) && (filter.hardness == products[i].filter_stiffness)
          }
        }

        

        if(match) {
          result.push(products[i])
        } else {
          continue;
        }

      }
      return result;
    },
    groups({groups}) {
      return groups.sort(function(a, b) { return a.order - b.order})
    },
    cartPrice({cart}) {
      let price = 0;
      for(let i = 0; i < cart.length; i++) {
        price += cart[i].price
      }
      return price;
    },
    cartTotal({cart}) {
      return cart.length
    },
    product({product}) {
      return product
    },
    productById({products}) {
      return function(id) {
        for(let i = 0; i < products.length; i++) {
          if(products[i].id === id) return products[i]
        }
      }
    }
  }
})
