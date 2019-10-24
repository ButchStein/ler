<template>
<div class="container">
    <step title="Беспокоят ли вас посторонние запахи в воде?" alignleft="true" showback="true">
        <template v-slot:body>
            <div class="cards cards-left">
                <card title="Есть" desc="Решения для многоквартирных домов" @click="$store.commit('feedback')">
                    <img src="../../assets/smell-yes.png"/>
                </card>
                <card title="Нет" desc="Решения для многоквартирных домов" @click="$store.commit('nextStep')">
                    <img src="../../assets/smell-no.png"/>
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
    }
}
</script>