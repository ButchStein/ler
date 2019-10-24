<template>
<div class="container">
    <step title="Сколько человек живет в вашем доме?" alignleft="true" showback="true">
        <template v-slot:body>
            <div class="cards cards-left">
                <card title="1-3 человека" desc="Решения для многоквартирных домов" @click="setPeople('3')">
                    <img src="../../assets/3p.png"/>
                </card>
                <card title="Более 3 человек" desc="Решения для многоквартирных домов" @click="setPeople('3+')">
                    <img src="../../assets/3pp.png"/>
                </card>
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
        setPeople(value) {
            this.$store.commit('setFilter', {is_home_count_p: value})
            this.$store.commit('nextStep')
        }
    }
}
</script>