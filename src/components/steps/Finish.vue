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
                        <div id="komplects"></div>
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
            <product-card :product="$store.getters.product" @close="$store.commit('hide')"/>
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
    data() {
        return { stickyKomplects: false }
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
        },
        originalProducts() {
            return this.$store.getters.originalProducts
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

            return result.sort(function(a, b) { return a.price - b.price })
        },
        calcKomplect(items) {
            let komplectItems = []
            for(let key in this.originalProducts) {
                if(items.indexOf(this.originalProducts[key].id) >= 0) {
                    komplectItems.push(this.originalProducts[key])
                }
            }
            return komplectItems;
        },
        makeSticky() {
            this.stickyKomplects = document.getElementById('komplects').getBoundingClientRect().top < 20
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
.fade-leave-active {
  transition: opacity .25s ease;
}
.fade-leave {
    opacity: 1;
}
.fade-leave-to {
    opacity: 0;
}
.fade-enter-active {
  transition: opacity .25s ease-out;
}
.fade-enter {
    opacity: 0;
}
.fade-enter-to {
    opacity: 1;
}
.cards-komlects {
    margin-bottom: 36px;
    flex-wrap: nowrap;
    align-items: stretch;
    position: sticky;
    position: -webkit-sticky;
    top: 0px;
    z-index: 10;
    padding: 10px 0 0;
    background-color: #fff;
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
        margin-bottom: 24px;
        padding-bottom: 12px;
    }
}

</style>
