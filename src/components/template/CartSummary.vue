<template>
    <div class="cart-summary" :class="{fixed: sticky}" id="summary">
        <div class="container">
            <div class="row">
                <div class="cart-summary__total col-4">
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
                <div class="cart-summary__products col-5">
                    <div class="cart-summary__product" v-for="item in cart" :key="item.id" :style="{'border-color': item.color}">
                        <img :src="item.photo"/>
                    </div>
                </div>
                <div class="cart-summary__actions col-3">
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
            this.sticky = document.getElementById('breakpoint').getBoundingClientRect().top > document.documentElement.clientHeight - 100;
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

<style lang="sass">

.fixed 
    .cart-summary__total-items
        display: none
    .start-again
        display: none
    .cart-summary__total-amount
        margin-bottom: 0
    

.cart-summary
    background-color: #fff
    box-shadow: 0px 20px 100px rgba(0, 0, 0, 0.1);
    padding-top: 40px
    padding-bottom: 40px
    transition: padding .5s;
    margin-bottom: 70px

    &.fixed
        position: fixed
        bottom: 0;
        right: 0;
        left: 0;
        padding: 20px;
        margin-bottom: 0

.cart-summary__total
    color: #666

    &-discount
        opacity: 0.5;
        margin-bottom: 17px;
        text-align: right

    &-amount,
    &-item
        position: relative
        overflow: hidden
        &:after
            content: ' '
            position: absolute
            border: 1px dotted #666
            opacity: .25
            width: 100%
            bottom: 3px
            left: 0
            z-index: 1

    &-amount
        margin-bottom: 36px
    &-item
        margin-bottom: 17px

    &-amount-price,
    &-item-price
        float: right;

    &-amount-items,
    &-item-name
        display: inline-block;
        padding-bottom: 2px;
        vertical-align: bottom;

    &-amount-items,
    &-item-name,
    &-amount-price,
    &-item-price
        background-color: #fff
        z-index: 2
        position: relative

    &-item-name,
    &-amount-items
        padding-right: 10px

    &-item-price,
    &-amount-price
        padding-left: 10px

.cart-summary__products
     text-align: right

.cart-summary__product
    display: inline-block
    width: 64px
    height: 64px
    border-radius: 100%
    overflow: hidden
    border: 4px solid transparent
    margin-right: 6px

    img
        max-width: 100%
        max-height: 100%

.cart-summary__total-amount-price
    .price
        font-size: 20px
        font-weight: 600
        line-height: 1

    .price-old
        font-size: 15px
        color: #666
        text-decoration: line-through
        opacity: .5
        margin-right: 10px

.cart-summary__actions
    text-align: right
    
</style>