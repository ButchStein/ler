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
                            <komplect :key="komplect.id"
                            v-for="komplect in $store.getters.packages"
                            :title="komplect.name"
                            :desc="komplect.description"
                            :rating="komplect.rating"
                            :items="calcKomplect(komplect.products)"/>
                        </div>
                                
                        <product-group 
                        :group="group" 
                        :items="filterByGroup(products, group.id)" 
                        v-for="group in groups" 
                        :key="group.id"/>
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
    <modal v-model="popup" @close="$store.commit('hide')">
        <product-card :product="$store.getters.product"/>
    </modal>
</div>
</template>

<script>
import Step from '../template/Step'
import Komplect from '../template/Komplect'
import ProductGroup from '../template/product/ProductGroup'
import ProductCard from '../template/product/ProductCard'
import CartSummary from '../template/CartSummary'
import ConsultForm from '../template/ConsultForm'
import SupportPhone from '../template/SupportPhone'
import Modal from '../template/Modal'

export default {
    components: {
        Step,
        Komplect,
        ProductGroup,
        CartSummary,
        ConsultForm,
        SupportPhone,
        Modal,
        ProductCard
    },
    computed: {
        groups() {
            return this.$store.getters.groups
        },
        products() {
            return this.$store.getters.products
        },
        popup() {
            return this.$store.getters.product !== null
        }
    },
    methods: {
        filterByGroup(array, id) {
            let result = array.filter( function(item) {
                return item.group_id == id
            } )

            if (!result.length) {
                this.$store.commit('feedback')
            }

            return result
        },
        calcKomplect(items) {
            let komplectItems = []
            for(let key in this.products) {
                if(items.indexOf(this.products[key].id) >= 0) {
                    komplectItems.push(this.products[key])
                }
            }
            return komplectItems;
        }
    }
}
</script>

<style lang="scss">
.cards-komlects {
    margin-bottom: 36px;
    flex-wrap: nowrap;
}

@media (max-width: 767px) {
    .cards-komlects {
        overflow-x: auto;
    }
}

</style>
