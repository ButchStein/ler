<template>
<div class="container">
    <step title="Беспокоят ли вас посторонние запахи в воде?" alignleft="true" showback="true">
        <template v-slot:body>
            <div class="row">
                <div class="col-lg-4 col-md-8 offset-md-2 offset-lg-0">
                    <card title="Есть" desc="Решения для многоквартирных домов" @click="$store.commit('feedback')">
                        <img src="../../assets/smell-yes.png"/>
                    </card>
                </div>

                <div class="col-lg-4 col-md-8 offset-md-2 offset-lg-0">
                    <card title="Нет" desc="Решения для многоквартирных домов" @click="$store.commit('nextStep')">
                        <img src="../../assets/smell-no.png"/>
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
    }
}
</script>
