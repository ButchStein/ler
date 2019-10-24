<template>
    <form @submit.prevent="submit()" class="form-inline">
        <div class="form-subtitle">Данные покупателя</div>
        <input v-model="params.name" name="name" type="text" class="form-input" placeholder="Имя" required/>
        <input v-model="params.email" name="email" type="text" class="form-input" placeholder="Email" required/>
        <input v-model="params.phone" name="phone" type="text" class="form-input" placeholder="Телефон" required/>
        <div class="form-subtitle">Адрес доставки</div>
        <input v-model="params.name" name="city" type="text" class="form-input" placeholder="Город" required/>
        <input v-model="params.email" name="street" type="text" class="form-input" placeholder="Улица" required/>
        <input v-model="params.phone" name="house" type="text" class="form-input sm" placeholder="Дом" required/>
        <input v-model="params.phone" name="flat" type="text" class="form-input sm" placeholder="Квартира" />
        <div class="form-disclaimer">
            <input type="checkbox" :id="id" v-model="checked"/>
            <label :for="id">
                Отправляя сообщение, я даю согласие на обработку персональных данных и получение уведомлений от АО «БВТ БАРЬЕР РУС».
            </label>
        </div>
        <button type="submit" class="form-button" :disabled="!checked">Оформить заказ</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            params: {
                name: '',
                phone: '',
                email: '',
                city: '',
                house: '',
                flat: '',
                street: ''
            },
            checked: false
        }
    },
    methods: {
        submit() {

        }
    },
    computed: {
        id() {
            return this._uid
        }
    }
}
</script>

<style lang="sass">
.form-subtitle
    color: #000;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 16px;
    margin-top: 32px;
</style>