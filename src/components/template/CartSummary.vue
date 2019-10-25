<template>
    <div class="cart-summary" :class="{fixed: sticky}" id="summary">
        <div class="container">
            <div class="row">
                <div class="cart-summary__total col-sm-4">
                    <div class="cart-summary__total-discount">Скидка за комплект 5%</div>
                    <div class="cart-summary__total-amount">
                        <div class="cart-summary__total-amount-items">Всего ({{cartTotal}} шт.)</div>
                        <div class="cart-summary__total-amount-price">
                            <span class="price-old price">{{cartPrice}}</span>
                            <span class="price">{{cartPrice}}</span>
                        </div>
                    </div>
                    <div class="cart-summary__total-items">
                        <div class="cart-summary__total-item" v-for="item in cart" :key="item.id">
                            <div class="cart-summary__total-item-name">
                                {{ item.name }}
                            </div>
                            <div class="cart-summary__total-item-price price">
                                {{ item.price }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart-summary__products col-sm-5">
                    <div class="cart-summary__product" v-for="item in cart" :key="item.id" :style="{'border-color': item.color}">
                        <img :src="item.photo"/>
                    </div>
                </div>
                <div class="cart-summary__actions col-sm-3">
                    <action-button @click="$store.commit('nextStep')" title="Отправить" primary="true" :restyle="{display: 'block', width: '100%', marginBottom: (!sticky)?'64px':'0px'}"/>
                    <start-again-btn v-if="!sticky"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ActionButton from './ActionButton'
import StartAgainBtn from './StatAgainBtn'

export default {
    data() {
        return {
            sticky: true
        }
    },
    components: {
        ActionButton,
        StartAgainBtn
    },
    computed: {
        cart() {
            return this.$store.getters.cart
        },
        cartPrice() {
            return this.$store.getters.cartPrice
        },
        cartTotal() {
            return this.$store.getters.cartTotal
        }
    },
    methods: {
        makeSticky() {
            this.sticky = document.getElementById('breakpoint').getBoundingClientRect().top > document.documentElement.clientHeight - 100
        }
    },
    created() {
        window.addEventListener('scroll', this.makeSticky)
    },
    destroyed() {
         window.removeEventListener('scroll', this.makeSticky)
    }
}
</script>

<style lang="scss">
.fixed .cart-summary__total-items {
  display: none;
}
.fixed .start-again {
  display: none;
}
.fixed .cart-summary__total-amount {
  margin-bottom: 0;
}

.cart-summary {
  background-color: #fff;
  box-shadow: 0px 20px 100px rgba(0, 0, 0, 0.1);
  padding-top: 40px;
  padding-bottom: 40px;
  transition: padding 0.5s;
  margin-bottom: 70px;
}
.cart-summary.fixed {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 20px;
  margin-bottom: 0;
  z-index: 100;
}

.cart-summary__total {
  color: #666;
}
.cart-summary__total-discount {
  opacity: 0.5;
  margin-bottom: 17px;
  text-align: right;
}
.cart-summary__total-amount, .cart-summary__total-item {
  position: relative;
  overflow: hidden;
}
.cart-summary__total-amount:after, .cart-summary__total-item:after {
  content: " ";
  position: absolute;
  border: 1px dotted #666;
  opacity: 0.25;
  width: 100%;
  bottom: 3px;
  left: 0;
  z-index: 1;
}
.cart-summary__total-amount {
  margin-bottom: 36px;
}
.cart-summary__total-item {
  margin-bottom: 17px;
}
.cart-summary__total-amount-price, .cart-summary__total-item-price {
  float: right;
}
.cart-summary__total-amount-items, .cart-summary__total-item-name {
  display: inline-block;
  padding-bottom: 2px;
  vertical-align: bottom;
}
.cart-summary__total-amount-items, .cart-summary__total-item-name, .cart-summary__total-amount-price, .cart-summary__total-item-price {
  background-color: #fff;
  z-index: 2;
  position: relative;
}
.cart-summary__total-item-name, .cart-summary__total-amount-items {
  padding-right: 10px;
}
.cart-summary__total-item-price, .cart-summary__total-amount-price {
  padding-left: 10px;
}

.cart-summary__products {
  text-align: right;
}

.cart-summary__product {
  display: inline-block;
  width: 64px;
  height: 64px;
  border-radius: 100%;
  overflow: hidden;
  border: 4px solid transparent;
  margin-right: 6px;
}
.cart-summary__product img {
  max-width: 100%;
  max-height: 100%;
}

.cart-summary__total-amount-price .price {
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
}
.cart-summary__total-amount-price .price-old {
  font-size: 15px;
  color: #666;
  text-decoration: line-through;
  opacity: 0.5;
  margin-right: 10px;
}

.cart-summary__actions {
  text-align: right;
}

@media (max-width: 991px) {
    .cart-summary {

        &__total-discount {
            text-align: left;
        }
    }
}

</style>
