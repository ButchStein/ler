<template>
<div class="container">
    <step title="Подбор индивидуального комплексного решения для вас">
        <template v-slot:body>
            <div class="row">
                <div class="col-lg-4  col-md-8  offset-md-2  offset-lg-0">
                    <card @click="choosePath('flat')" title="В квартиру" 
                    desc="Решения для квартир в домах с несколькими этажами." actiontext="Начать">
                        <img src="../../assets/flat.png"/>
                    </card>
                </div>

                <div class="col-lg-4  col-md-8  offset-md-2  offset-lg-0">
                    <card @click="choosePath('house')" title="В частный дом"
                    desc="Решения для частных домов с постоянным отоплением." actiontext="Начать">
                        <img src="../../assets/house.png"/>
                    </card>
                </div>

                <div class="col-lg-4  col-md-8  offset-md-2  offset-lg-0">
                    <card @click="choosePath('dacha')" title="На дачу" 
                    desc="Решения для загородного дома с сезонным отоплением." actiontext="Начать">
                        <img src="../../assets/dacha.png"/>
                    </card>
                </div>
            </div>
        </template>
    </step>
</div>
</template>

<script>
import Step from '../template/Step'
import Card from '../template/Card'

export default {
    components: {
        Step,
        Card
    },
    methods: {
        choosePath(type) {
            switch(type) {
                case 'flat':
                    this.$store.commit('setPath', 'flat')
                    this.$store.commit('setFilter', {categories: 3})
                    break;
                case 'house':
                    this.$store.commit('setPath', 'house')
                    this.$store.commit('setFilter', {categories: 1})
                    break;
                case 'dacha':
                    this.$store.commit('setPath', 'house')
                    this.$store.commit('setFilter', {categories: 2})
                    break;
            }
            this.$store.commit('nextStep')
        }
    }
}
</script>

<style lang="sass">
.cards
    display: flex
    flex-wrap: wrap
.cards-center
    justify-content: center
.cards-left
    justify-content: flex-start
</style>
