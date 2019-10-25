<template>
    <div class="product-group">
        <div class="product-group__title">{{ group.name }}</div>
        <div class="product-group__desc">{{ group.description }}</div>
        <ProductList v-for="(item, index) in items" :key="index" :item="item"/>
    </div>
</template>

<script>
import ProductList from './ProductList'

export default {
    props: ['group', 'items'],
    components: {
        ProductList
    }
}
</script>

<style lang="sass">
.product-group
    margin-bottom: 96px

.product-group__title
    font-size: 30px;
    line-height: 35px;
    letter-spacing: 0.5px;
    color: #000
    font-size: 30px;
    line-height: 35px;
    margin-bottom: 20px;

.product-group__desc
    font-size: 20px
    line-height: 28px;
    color: #666;
    margin-bottom: 36px;

</style>