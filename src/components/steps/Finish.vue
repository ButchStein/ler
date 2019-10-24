<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col-xl-8  col-lg-9  col-md-12">
                <step title="Введите данные анализа воды" showback="true" alignleft="true">
                    <template v-slot:desc>
                        <p>Воспользуйтесь рекомендуемыми комплектациями либо выберите решения из списка.</p>
                    </template>
                    <template v-slot:body>
                        <div class="cards cards-komlects">
                            <komplect title="Бюджетный" desc="Для бичей" rating="3.5" price="3500"/>
                            <komplect title="Бюджетный" desc="Для бичей" rating="4" price="6000"/>
                            <komplect title="Бюджетный" desc="Для бичей" rating="5" price="9000"/>
                        </div>


                        <product-group
                        :title="group.name"
                        :items="filterByGroup(products, group.id)"
                        v-for="group in groups"
                        :key="group.id">Очистка питьевой воды</product-group>
                    </template>
                </step>
            </div>
            <div class="col-4">

            </div>
        </div>
    </div>
    <div id="breakpoint"></div>
    <cart-summary/>
    <div class="container">
        <div class="row">
            <div class="col-lg-7">
                <div class="product-group  product-group--center">
                <div class="product-group__title">Не уверены, какое решение подойдет вам?</div>
                <div class="product-group__desc">Оставьте заявку, мы перезвоним вам.</div>
                    <consult-form/>
                </div>
                <support-phone/>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Step from '../template/Step'
import Komplect from '../template/Komplect'
import ProductGroup from '../template/product/ProductGroup'
import CartSummary from '../template/CartSummary'
import ConsultForm from '../template/ConsultForm'
import SupportPhone from '../template/SupportPhone'

export default {
    components: {
        Step,
        Komplect,
        ProductGroup,
        CartSummary,
        ConsultForm,
        SupportPhone
    },
    computed: {
        groups() {
            return this.$store.getters.groups
        },
        products() {
            return this.$store.getters.products
        }
    },
    methods: {
        filterByGroup(array, id) {
            return array.filter( function(item) {
                return item.group_id == id
            } )
        }
    }
}
</script>

<style lang="scss">
.cards-komlects {
    margin-bottom: 36px
}

@media (max-width: 767px) {
    .cards-komlects {
        flex-wrap: nowrap;
        overflow-x: auto;
    }
}

</style>
