<template>
    <div class="product row">
        <div class="product__variants" v-if="product.subtitutes.length">
            <div style="margin-bottom:26px">Все варианты</div>
            <div class="product__variants__item" 
            v-for="item in subtitutes" 
            :key="item.id" 
            :class="{active: item.id == product.id }"
            @click="$store.commit('show', item)"
            >
                <div>
                    <div class="product__variants__item-name">{{ item.name }}</div>
                    <div class="product__variants__item-warning">{{ item.additional_short_desc }}</div>
                </div>
                <img :src="item.photo" class="product__variants__item-img"/>
            </div>
        </div>
        <div class="product__info">
            <div class="product__preview">
                <div class="product__preview-pic" :style="{borderColor: product.color}">
                    <img :src="product.photo"/>
                </div>
                <div class="product__brief">
                    <div class="product__brief-title">{{product.name}}</div>
                    <div class="product__brief-desc">{{product.short_desc}}</div>
                    <div class="product__brief-warning" v-if="product.additional_short_desc">{{product.additional_short_desc}}</div>
                    <div class="product__brief-price price">{{product.price}}</div>
                </div>
            </div>
            <div class="product__detailed">
                <div class="product__tabs">
                    <div class="product__tabs-tab" 
                    @click="activeTab = true" 
                    :class="{active: activeTab}">Описание</div>
                    <div class="product__tabs-tab" 
                    @click="activeTab = false" 
                    :class="{active: !activeTab}">Характеристики</div>
                </div>
                <div class="product__tabs-content">
                    <div v-if="activeTab" v-html="product.description">
                    </div>
                    <div v-else>
                        <div class="cart-summary__total-items">
                            <div class="cart-summary__total-item" v-for="(item, index) in product.characteristic" :key="index">
                                <div class="cart-summary__total-item-name">
                                    {{ item.name }}
                                </div>
                                <div class="cart-summary__total-item-price">
                                    {{ item.value }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['product'],
    data() {
        return {
            activeTab: true
        }
    },
    computed: {
        subtitutes() {
            let result = [ this.product ]
            for(let i = 0; i < this.product.subtitutes.length; i++) {
                result.push( this.$store.getters.productById(this.product.subtitutes[i]) )
            }
            result.sort(function(a, b) {
                return a.id - b.id
            });
            return result;
        }
    }
}
</script>

<style lang="sass">
.product__preview
    display: flex
    margin-bottom: 50px

.product__variants
        width: 310px
        padding-right: 50px

.product__variants__item
    display: flex
    align-items: center
    cursor: pointer
    overflow: hidden;
    padding: 12px 0
    border-top: 1px solid rgba(210,211,211,.5)

    &>div
        flex-grow: 1
        margin: 0 12px

    &:last-child
        border-bottom: 1px solid rgba(210,211,211,.5)

    &-img
        max-width: 39px
        max-height: 39px
        float: right
    
    &:before
        content: ' '
        border: 2px solid #D2D3D3;
        box-sizing: border-box;
        border-radius: 100px;
        width: 28px
        height: 28px
        display: block
        float: left

    &.active
        &:before
           background: url('../../../assets/active.svg') 0 0 no-repeat;
           border: 0

    &-warning
        color: #000

.product__info
        width: 660px

.product__brief
    padding-left: 32px;
    display: flex
    flex-direction: column

    &-title
        font-weight: 600;
        font-size: 20px;
        line-height: 22px;
        color: #000;
        margin-bottom: 24px;
    
    &-desc 
        line-height: 18px
        margin-bottom: 25px
    
    &-warning
        color: #000

        &:before
            width: 17px;
            height: 17px;
            background: url('../../../assets/warning.svg') 50% 50% no-repeat
            background-size: 100% 100%
            content: ' '
            display: inline-block

    &-price
        font-weight: 600;
        font-size: 30px;
        line-height: 32px;
        margin-top: auto
        color: #000

.product__preview-pic
    width: 274px
    height: 274px
    border: 12px solid transparent;
    flex-shrink: 0

    img
        max-width: 100%
        max-height: 100%

.product__tabs
    border-bottom: 1px solid rgba(210,211,211,.5)
    margin-bottom: 32px

    &-tab
        display: inline-block;
        border-bottom: 4px solid transparent
        margin-bottom: -1px
        font-weight: 600;
        letter-spacing: 0.01em;
        padding: 16px 0
        margin-right: 32px
        cursor: pointer

        &.active
            border-bottom: 4px solid #24BBF6;
            color: #000

    &-content  
        font-size: 15px;
        line-height: 25px;
        color: #000000;

        p
            margin: .5em 0;

</style>