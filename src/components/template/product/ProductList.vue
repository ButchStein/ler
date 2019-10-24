<template>
    <div class="product-list__item">
        <!-- <input type="checkbox" :value="item.id" :id="id" v-model="checked" @change="change()"/> -->
        <div class="product-list__item-label" @click="change()" :class="{checked: checked}">
            <div class="product-list__item-img" :style="{'border-color': item.color}">
                <img :src="item.photo"/>
            </div>
            <div class="product-list__item-info">
                <div class="product-list__item-title">{{item.name}}</div>
                <div class="product-list__item-desc">{{item.short_desc}}</div>
                <a href="#" @click.prevent.self="$store.commit('show', item)">Подробнее</a>
            </div>
            <div class="product-list__item-price">
                <div class="price price-old">{{ item.price }}</div>
                <div class="price">{{ item.price }}</div>
            </div>
            <div class="product-list__item-button" v-if="checked">Убрать</div>
            <div class="product-list__item-button" v-else>Добавить</div>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'item' ],
    computed: {
        id() {
            return this._uid
        },
        checked() {
            return this.$store.getters.cart.indexOf(this.item) >= 0
        }
    },
    methods: {
        change() {
            let action = (!this.checked) ? 'cartAddItem': 'cartRemoveItem'
            this.$store.commit(action, this.item)
        }
    }
}
</script>

<style lang="sass">
.product-list__item
    margin-bottom: 12px

    input[type=checkbox]
        display: none;

.product-list__item-img
    border: 6px solid transparent;
    width: 96px;
    height: 96px;
    border-radius: 100%;
    overflow: hidden
    flex-shrink: 0

    img
        max-width: 100%
        max-height: 100%

.product-list__item-label
    display: block;
    border: 1px solid rgba(210,211,211,.5);
    background-color: #fff
    padding: 20px 24px;
    display: flex
    align-items: center
    justify-content: space-between;

.product-list__item
    &-info
        flex-grow: 1
        margin: 0 20px;
    &-title
        font-size: 20px;
        line-height: 24px;
        color: #000;
    &-desc 
        font-size: 15px;
        line-height: 18px;
        color: #666;
        margin: 8px 0;
    &-price
        font-size: 20px;
        line-height: 1;
        color: #000;
        width: 60px;
        flex-shrink: 0;

        .price-old
            font-size: 15px;
            line-height: 15px;
            text-decoration-line: line-through;
            color: #666;
            opacity: 0.5;

.product-list__item-button
    display: inline-block;
    border: 0
    line-height: 1
    font-size: 15px
    font-weight: 600
    padding: 18px 38px 15px 16px;
    background: #24BBF6;
    border-radius: 2px;
    position: relative;
    color: #fff;
    cursor: pointer;
    width: 120px;
    margin-left: 24px;
    flex-shrink: 0

    &:after
        content: " "
        top: 0;
        right: 0;
        width: 38px;
        height: 100%;
        position: absolute;
        background: url(../../../assets/ic_plus.svg) 50% 50% no-repeat;
        background-size: 10px 10px;

//input[type=checkbox]:checked + .product-list__item-label
.product-list__item-label.checked
    border: 4px solid #24BBF6;

    .product-list__item-button
        background: rgba(36, 187, 246, 0.15);
        color: #24BBF6;

        &:after
            background: url(../../../assets/ic_cancel.svg) 50% 50% no-repeat;

</style>