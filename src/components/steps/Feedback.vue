<template>
    <div class="container">
        <step title="Оставьте свои контактные данные" alignleft="true">
                <template v-slot:desc>
                <div class="row">
                    <p class="col-xl-7">Неприятный запах воды может возникнуть из-за многих 
                    проблем системы водоснабжения, мы перезвоним вам для уточнения деталей.</p>
                </div>
                </template>
                <template v-slot:body>
                    <consult-form/>

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