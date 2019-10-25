<template>
    <form @submit.prevent="submit()" class="form-inline">
        <div class="form-subtitle">Данные покупателя</div>
        <div class="row">
            <div class="col-md-4">
                <input v-model="params.name" name="name" type="text" class="form-input" placeholder="Имя" required/>
            </div>
            <div class="col-md-4">
                <input v-model="params.email" name="email" type="email" class="form-input" placeholder="Email" required/>
            </div>
            <div class="col-md-4">
                <input v-mask="'+7 (999) 999-99-99'" v-model="params.phone" name="phone" type="text" class="form-input" placeholder="Телефон" required/>
            </div>
        </div>



        <div class="form-subtitle">Адрес доставки</div>
        <div class="row">
            <div class="col-md-4">
                <input v-model="params.name" name="city" type="text" class="form-input" placeholder="Город" required/>
            </div>
            <div class="col-md-4">
                <input v-model="params.email" name="street" type="text" class="form-input" placeholder="Улица" required/>
            </div>
            <div class="col-md-4">
                <div class="row">
                    <div class="col-6">
                        <input v-model="params.phone" name="house" type="text" class="form-input sm" placeholder="Дом" required/>
                    </div>
                    <div class="col-6">
                        <input v-model="params.phone" name="flat" type="text" class="form-input sm" placeholder="Квартира" />
                    </div>
                </div>

            </div>
        </div>


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
