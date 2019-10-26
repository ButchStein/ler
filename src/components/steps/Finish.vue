<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col-xl-8  col-lg-7  col-md-12">
                <step title="Ваше индивидуальное решение" showback="true" alignleft="true">
                    <template v-slot:desc>
                        <p>Воспользуйтесь рекомендуемыми комплектациями либо выберите решения из списка.</p>
                    </template>
                    <template v-slot:body>
                        <div class="cards cards-komlects">
                            <komplect :key="komplect.id"
                            v-for="komplect in $store.getters.packages"
                            :komplect="komplect"
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
            <div class="rightcol col-xl-4 col-lg-5">
                <map-of-flat/>
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
    <transition name="fade">
        <modal v-model="popup" @close="$store.commit('hide')">
            <product-card :product="$store.getters.product"/>
        </modal>
    </transition>
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
import MapOfFlat from '../template/Map'

export default {
    components: {
        Step,
        Komplect,
        ProductGroup,
        CartSummary,
        ConsultForm,
        SupportPhone,
        Modal,
        ProductCard,
        MapOfFlat
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

            // if (!result.length) {
            //     this.$store.commit('feedback')
            // }

            return result.sort(function(a, b) { return a.price - b.price })
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.cards-komlects {
    margin-bottom: 36px;
    flex-wrap: nowrap;
    align-items: stretch;
}

@media (max-width: 992px) {
    .rightcol {
        display: none;
    }
}

@media (min-width: 992px) {
    .rightcol {
        padding-top: 200px; padding-bottom: 130px;
    } 
}
@media (max-width: 767px) {
    .cards-komlects {
        overflow-x: auto;
    }
}

</style>
