<template>
    <form @submit.prevent="submit()" class="form-inline">
        <ul class="errors" v-if="errors.length > 0">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>

        <div class="form-subtitle">Данные покупателя</div>
        <div class="row">
            <div class="col-md-4">
                <input v-model="params.customer_name" name="customer_name" type="text" class="form-input" placeholder="Имя" required/>
            </div>
            <div class="col-md-4">
                <input v-model="params.customer_email" name="customer_email" type="email" class="form-input" placeholder="Email" required/>
            </div>
            <div class="col-md-4">
                <input v-mask="'+7 (999) 999-99-99'" v-model="params.customer_phone" name="customer_phone" type="text" class="form-input" placeholder="Телефон" required/>
            </div>
        </div>



        <div class="form-subtitle">Адрес доставки</div>
        <div class="row">
            <div class="col-md-4">
                <input v-model="params.customer_address_city" name="customer_address_city" type="text" class="form-input" placeholder="Город" required/>
            </div>
            <div class="col-md-4">
                <input v-model="params.customer_address_street" name="customer_address_street" type="text" class="form-input" placeholder="Улица" required/>
            </div>
            <div class="col-md-4">
                <div class="row">
                    <div class="col-6">
                        <input v-model="params.customer_address_house" name="customer_address_house" type="text" class="form-input sm" placeholder="Дом" required/>
                    </div>
                    <div class="col-6">
                        <input v-model="params.customer_address_flat" name="customer_address_flat" type="text" class="form-input sm" placeholder="Квартира" />
                    </div>
                </div>

            </div>
        </div>
        <div class="form-disclaimer">
            <p>Факт отправки формы подтверждает ваше согласие на <a href="https://www.barrier.ru/policy/" target="_blank">передачу и обработку персональных данных</a>, а также получение информационных рассылок</p>
        </div>
        <button type="submit" class="form-button">Оформить заказ</button>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            params: {
                customer_name: '',
                customer_phone: '',
                customer_email: '',
                customer_address_city: '',
                customer_address_house: '',
                customer_address_flat: '',
                customer_address_street: ''
            },
            required: [
                'customer_name',
                'customer_phone',
                'customer_email',
                'customer_address_city',
                'customer_address_house',
                'customer_address_street'
            ],
            checked: false,
            errors: []
        }
    },
    methods: {
        submit() {
            let self = this
            this.errors = []

            this.required.forEach(function(key) {
                if(key === 'customer_email' && !/[a-zA-Z0-9-._]+@[a-zA-Z0-9-._]+\.[a-z]+/i.test(self.params[key])) {
                     self.errors.push("Введите корректный email")
                } else if(key === 'customer_phone' && !/\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}/.test(self.params[key])) {
                    self.errors.push("Введите номер телефона в формате +7 (999) 999-99-99")
                } else {
                    if(self.params[key] == '') {
                        let elements = document.getElementsByName(key)
                        self.errors.push(`Заполните поле "${elements[0].placeholder}"`)
                    }
                }
            })

            if(this.errors.length === 0) {
                axios.post(this.$store.getters.apiUrl+'order/create', Object.assign({}, this.params, this.$store.getters.cartForOrder))
                .then(function(){
                    self.$store.commit('thankyou')
                    self.$ga.event('form', 'order', 'order-guru', self.$store.getters.cartPrice)
                    self.$metrika.reachGoal('order')
                })
                .catch(function(err){
                    alert(err)
                })
            }
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
.errors
    color: red;
    font-size: 0.9em;
    list-style-type: disc;
    margin: 1em 20px;
.field-error
    border: 1px solid red;
</style>
