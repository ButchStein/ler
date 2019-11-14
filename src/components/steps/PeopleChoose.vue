<template>
<div class="container">
    <step title="Сколько человек живет в вашем доме?" alignleft="true" showback="true">
        <template v-slot:body>
            <div class="row">
                <div class="col-lg-4 col-md-8 offset-md-2 offset-lg-0">
                    <card title="1-3 человека" desc="Потребление до 1,5 куб. м/ч" @click="setPeople('3')">
                        <img src="../../assets/3p.jpg" srcset="../../assets/3p.jpg 1x, ../../assets/3p@2x.jpg 2x"/>
                    </card>
                </div>


                <div class="col-lg-4 col-md-8 offset-md-2 offset-lg-0">
                    <card title="Более 3 человек" desc="Потребление от 1,5 куб. м/ч" @click="setPeople('3+')">
                        <img src="../../assets/3pp.jpg"  srcset="../../assets/3pp.jpg 1x, ../../assets/3pp@2x.jpg 2x"/>
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
        setPeople(value) {
            this.$store.commit('setFilter', {is_home_count_p: value})
            this.$store.commit('nextStep')
        }
    }
}
</script>
