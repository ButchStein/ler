<template>
<div class="container">
    <step title="Беспокоят ли вас посторонние запахи в воде?" alignleft="true" showback="true">
        <template v-slot:body>
            <div class="row">
                <div class="col-lg-4 col-md-8 offset-md-2 offset-lg-0">
                    <card title="Нет" desc="Вода ничем не пахнет" @click="$store.commit('nextStep')">
                        <img src="../../assets/smell-no.jpg" srcset="../../assets/smell-no.jpg 1x, ../../assets/smell-no@2x.jpg 2x"/>
                    </card>
                </div>

                <div class="col-lg-4 col-md-8 offset-md-2 offset-lg-0">
                    <card title="Да" desc="Есть неприятный или тухлый запах (наличие сероводорода)" @click="$store.commit('feedback')">
                        <img src="../../assets/smell-yes.jpg" srcset="../../assets/smell-yes.jpg 1x, ../../assets/smell-no@2x.jpg 2x"/>
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
