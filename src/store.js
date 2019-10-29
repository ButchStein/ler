import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const api_url = 'http://guru.madex.pro/';

export default new Vuex.Store({
  state: {
    komplect: 2,
    product: null,
    productHover: '',
    mapPoint: null,
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
      feedback: ["Feedback"],
      thankyou: ["Thankyou"]
    },
    path: ["HouseChoose"],
    cart: [],
    chooseOneGroup: 3,
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
        nitrite: '',
        tds: '',
        oxidizability: '',
        ph: '',
        turbidity: '',
        coloration: ''
      }
    },
    filteredProducts: []
  },
  mutations: {
    setPath(state, path) {
      state.path = state.paths[path]
    },
    nextStep(state) {
      state.step++
    },
    prevStep(state) {
      //ВНИМАНИЕ, ТУТ КОСТЫЛЬ

      if(state.path[state.step-1] === "Analyses" && state.filter.has_analyses === false) {
        state.step = state.step - 2
      } else {
        state.step--
      }

      
    },
    cartAddItem(state, item) {
      let chooseOne = state.chooseOneGroup;
      
      if(item.group_id == chooseOne ) {
        for(let i in state.cart) {
          if(state.cart[i].group_id == chooseOne) {
            state.cart.splice(i, 1)
            break;
          }
        }
      }
      state.cart.push(item)
    },
    cartRemoveItem(state, item) {
      state.cart.splice( state.cart.indexOf(item), 1 )
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
    thankyou(state) {
      state.path = state.paths.thankyou
      state.step = 0
    },
    cartKomplect(state, komplect) {
      state.cart = []
      state.komplect = komplect.id

      for(let key in komplect.items) {
        state.cart.push(komplect.items[key])
      }
    },
    show(state, item) {
      state.product = item
    },
    hide(state) {
      state.product = null
    },
    resetKomplect(state) {
      state.komplect = null
    },
    productHover(state, product) {
      state.productHover = product
    },
    mapPoint(state, point) {
      state.mapPoint = point
    },
    finish(state) {
      let result = []
      let { products, filter, path } = state
      
      for(let i = 0; i < products.length; i++) {
        let match = false
        // квартира, дача, дома
        if(products[i].categories.indexOf(filter.categories) < 0) continue;

        // количествео человек
        if(filter.categories < 3) { // для дома и дачи
          if(
              (products[i].is_home_count_p === "both") 
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
            // если стоят обе галки
            if(filter.fe && filter.hardness === true) {
              match = filter.fe && filter.hardness == products[i].filter_iron_stiffness
            // иначе, если стоит 1 из галок
            } else {
              // у продукта все 3 галки, алгоритм ИЛИ
              if(products[i].filter_iron && products[i].filter_stiffness && products[i].filter_iron_stiffness) {
                match = (filter.fe == products[i].filter_iron ) || (filter.hardness == products[i].filter_stiffness)
                // одна из галок не стоит - алгоритм И
              } else {
                match = (filter.fe == products[i].filter_iron ) && (filter.hardness == products[i].filter_stiffness)
              }
              
            }

          }
        }

        if(match) {
          result.push(products[i])
        } else {
          continue;
        }

      }

      state.filteredProducts = result
      state.step = path.length-2
    },
    replaceInFiltered(state, data) {
      for(let i in state.filteredProducts) {
        if(state.filteredProducts[i].id === data.replace) {
          state.filteredProducts.splice(i,1)
          state.filteredProducts.push(data.item)
          break;
        }
      }
    },
    replaceInCart(state, data) {
      for(let i in state.cart) {
        if(state.cart[i].id === data.replace) {
          state.cart.splice(i,1)
          state.cart.push(data.item)
          break;
        }
      }
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
    }
  },
  getters: {
    komplectId({komplect}) {
      return komplect
    },
    chooseOneGroup(state) {
      return state.chooseOneGroup
    },
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
    cartForOrder({cart}) {
      let result = []
      for(let i in cart) {
        result.push({
          "id": cart[i].id,
          "count": 1
        })
      }
      return {"items": result}
    },
    categories({categories}) {
      return categories
    },
    packages({packages}) {
      return packages.sort(function(a,b) { return a.rating - b.rating })
    },
    products({filteredProducts}) {
      return filteredProducts
    },
    groups({groups, filter}) {
      if(filter.categories < 3) {
        return groups.sort(function(a, b) { return b.order - a.order})
      } else {
        return groups.sort(function(a, b) { return a.order - b.order})
      }
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
    },
    analyses({filter}) {
      return filter.analyses
    },
    filter({filter}) {
      return function(value) {
        return filter[value];
      }
    },
    productHover({productHover}) {
      return productHover;
    },
    mapPoint(state) {
      return state.mapPoint
    },
    isInCart({cart}) {
      return function(productId) {
        for(let i in cart) {
          if (cart[i].id == productId) return true
        }
        return false;
      }
    }
  }
})
