<template>
<div class="container">
    <div class="row">
        <div class="col-xl-9">
            <step title="Какая вода в вашем доме?" alignleft="true" showback="true">
                <template v-slot:desc>
                    <p>Выберите варианты ответов или введите данные из анализа воды</p>
                </template>
                <template v-slot:body>
                    <switcher title="Жёсткая" v-model="hardness" @change="setFilter()">
                        Беспокоят ли вас белые известковые отложения на водонагревательных элементах, сантехнике, кафеле, душевых кабинах?
                    </switcher>
                    <switcher title="Железистая" v-model="fe" @change="setFilter()">
                        Беспокоит ли вас бурый цвет воды или ржавые подтёки на сантехнике?
                    </switcher>
                </template>
                <template v-slot:actions>
                    <div :class="{preloader:preloader}">
                        <action-button title="У меня есть анализы воды" @click="$store.commit('nextStep')"/>
                        <action-button title="Подобрать решение" primary="true" @click="finish()"/>
                    </div>
                </template>
            </step>
        </div>
    </div>
</div>
</template>

<script>
import Step from '../template/Step'
import Switcher from '../template/Switcher'
import ActionButton from '../template/ActionButton'

export default {
    components: {
        Step,
        Switcher,
        ActionButton
    },
    data() {
        return {
            fe: false,
            hardness: false,
            preloader: false
        } 
    },
    methods: {
        setFilter() {
            this.$store.commit('setFilter', {
                fe: this.fe,
                hardness: this.hardness
            })
        },
        finish() {
            let self = this
            this.preloader = true
            setTimeout(function(){
                self.$store.commit('finish')
            }, 100)
        }
    },
    mounted() {
        this.fe = this.$store.getters.filter('fe')
        this.hardness = this.$store.getters.filter('hardness')
    }
}
</script>

<style lang="scss">
.preloader .button-primary:after {
    display: inline-block;
    content: ' ';
    background: url('../../assets/loader.gif') 50% 50% no-repeat;
    height: 20px;
    width: 20px;
    margin-left: 10px;
    vertical-align:middle;
}
</style>