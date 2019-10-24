<template>
<div class="container">
    <step title="Какая вода в вашем доме?" alignleft="true" showback="true">
        <template v-slot:desc>
            <p>Выберите варианты ответов или введите данные из анализа воды</p>
        </template>
        <template v-slot:body>
            <switcher title="Жёсткость" v-model="hardness" @change="setFilter()">
                Беспокоят ли вас белые известковые отложения на водонагревательных элементах, сантехнике, кафеле, душевых кабинах?
            </switcher>
            <switcher title="Железо" v-model="fe" @change="setFilter()">
                Беспокоит ли вас бурый цвет воды или ржавые подтёки на сантехнике?
            </switcher>
        </template>
        <template v-slot:actions>
            <action-button title="У меня есть анализы воды" @click="$store.commit('nextStep')"/>
            <action-button title="Подобрать решение" primary="true" @click="$store.commit('finish')"/>
        </template>
    </step>
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
            hardness: false
        } 
    },
    methods: {
        setFilter() {
            this.$store.commit('setFilter', {
                fe: this.fe,
                hardness: this.hardness
            })
        }
    }
}
</script>