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

<style lang="scss">
.product-group {
    margin-bottom: 96px;

    &__title {
        font-size: 30px;
        line-height: 35px;
        letter-spacing: 0.5px;
        color: #000;
        font-size: 30px;
        line-height: 35px;
        margin-bottom: 20px;
    }

    &__desc {
        font-size: 20px;
        line-height: 28px;
        color: #666;
        margin-bottom: 36px;
    }
}

@media (max-width: 991px) {
    .product-group--center {

        &__title {
            text-align: center;
            max-width: 440px;
            margin: 0 auto;
            margin-bottom: 16px;
        }

        &__desc {
            text-align: center;
        }
    }
}

@media (max-width: 991px) {
    .product-group {

        &__title {
            font-size: 20px;
            line-height: 24px;
            margin-bottom: 12px;
        }

        &__desc {
            font-size: 15px;
            line-height: 1;
            margin-bottom: 12px;
        }
    }
}

@media (max-width: 767px) {
    .product-group {
        margin-bottom: 40px;
    }
}
</style>
