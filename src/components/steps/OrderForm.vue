<template>
    <div class="container order-form">
        <step title="Оформление заказа" alignleft="true" showback="true">
            <template v-slot:desc>
                <p>Мы перезвоним вам для уточнения условий заказа.</p>
            </template>
            <template v-slot:body>
                <order-form/>
            </template>
        </step>
    </div>
</template>

<script>
import Step from '../template/Step'
import OrderForm from '../template/OrderForm'

export default {
    components: {
        OrderForm,
        Step
    }    
}
</script>

<style lang="sass" scopped>
    .order-form .step__header
        margin-bottom: 0
</style>