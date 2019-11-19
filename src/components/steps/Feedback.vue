<template>
    <div class="container">
        <step title="Оставьте свои контактные данные" alignleft="true">
                <template v-slot:desc>
                <div class="row">
                    <p class="col-xl-7">Наши специалисты свяжутся с Вами и проконсультируют по подбору системы очистки воды.</p>
                </div>
                </template>
                <template v-slot:body>
                    <div class="row">
                        <div class="col-xl-7  col-lg-8">
                            <consult-form/>
                        </div>
                    </div>

                    <div style="margin-top: 20px;">
                        <start-again-btn/>
                    </div>
                </template>
                <template v-slot:actions>
                    <support-phone/>
                </template>
        </step>
    </div>
</template>

<script>
import Step from '../template/Step'
import ConsultForm from '../template/ConsultForm'
import SupportPhone from '../template/SupportPhone'
import StartAgainBtn from '../template/StatAgainBtn'

export default {
    components: {
        ConsultForm,
        SupportPhone,
        Step,
        StartAgainBtn
    }
}
</script>
