<template>
<div class="container thankyou">
    <step title="Спасибо за заказ!">
        <template v-slot:desc><p style="margin: 28px 0;">Ваша заявка отправлена, менеджер свяжется с вами
для уточнения деталей оплаты и доставки.</p>
         <action-button title="Вернуться на главную" primary="true" @click="$store.commit('reset')"/>
        </template>
    </step>
</div>
</template>

<script>
import Step from '../template/Step'
import ActionButton from '../template/ActionButton'

export default {
    components: {
        Step,
        ActionButton
    }
}
</script>

<style lang="sass">
.thankyou .step
    justify-content: center
</style>