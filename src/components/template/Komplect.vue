<template>
<div class="komplect">
    <input type="radio" name="komplect" style="display:none;" :id="id"/>
    <label class="komplect__label" :for="id" @click="change()">
        <header class="komplect__title">{{ title }}</header>
        <div class="komplect__desc">{{ desc }}</div>
        <footer class="komplect__footer">
            <div class="komplect__price price">{{ price }}</div>
            <div class="komplect__stars">
                <img src="../../assets/star.svg" v-for="(star, index) in stars" :key="index"/>
                <img src="../../assets/halfstar.svg" v-if="half"/>
            </div>
        </footer>
    </label>
</div>
</template>

<script>
export default {
    props: [ 'rating', 'title', 'desc', 'items' ],
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        stars() {
            let stars = [];
            let total = Math.floor(this.rating)
            for(let i = 0; i < total; i++) {
                stars.push('*')
            }
            return stars
        },
        half() {
            return (this.rating % Math.ceil(this.rating) > 0)
        },
        id() {
            return this._uid
        },
        price() {
            let price = 0
            for(let i=0; i<this.items.length; i++) {
                price += this.items[i].price
            }
            return price;
        }
    },
    methods: {
        change() {
            this.$store.commit('cartKomplect', this.items)
        }
    }
}
</script>

<style lang="sass">

.komplect
    flex-grow: 1

    & + .komplect 
        margin-left: 8px

.komplect input[type='radio']:checked + label
    border: 3px solid #24BBF6;

.komplect__label
    cursor: pointer
    display: block
    background: #fff
    border: 1px solid #D2D3D3;
    border-radius: 2px;
    padding: 20px

    &:hover 
        box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.12);
        border-color: #fff

    

    label
        display: block

.komplect__title
    font-size: 20px
    margin-bottom: 16px
    color: #000

.komplect__desc
    font-size: 13px;
    line-height: 18px;
    color: #666;
    margin-bottom: 46px;

.komplect__price
    color: #666;

.komplect__footer
    display: flex
    justify-content: space-between
    aling-item: center
</style>