<template>
<div>
    <form class="form-inline" @submit.prevent="submit()" v-if="!sent">
        <ul class="errors" v-if="errors.length > 0">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>

        <div class="row">
            <div class="col-lg-4  col-md-6">
                <input v-model="params.name" name="name" type="text" class="form-input" placeholder="Имя" required/>
            </div>
            <div class="col-lg-4  col-md-6">
                <input v-mask="'+7 (999) 999-99-99'" v-model="params.phone" name="phone" type="text" class="form-input" placeholder="Телефон" required/>
            </div>
            <div class="col-lg-4">
                <button type="submit" class="form-button">Отправить</button>
            </div>
        </div>
        <div class="form-disclaimer">
            <p>Факт отправки формы подтверждает ваше согласие на <a href="https://www.barrier.ru/policy/" target="_blank">передачу и обработку персональных данных</a>, а также получение информационных рассылок</p>
        </div>
    </form>

    <p v-if="sent">Ваша заявка отправлена. Мы скоро свяжемся с вами!</p>
    <p v-if="error">Во время отправки произошла ошибка. Попробуйте ещё раз позже</p>
</div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            params: {
                name: '',
                phone: ''
            },
            sent: false,
            error: false,
            errors: []
        }
    },
    methods: {
        submit() {
            let self = this

            if(!/\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}/.test(self.params.phone)) {
                    self.errors.push("Введите номер телефона в формате +7 (999) 999-99-99")
            } else { 
                axios.post(this.$store.getters.apiUrl+'form/callback', this.params).then(
                    function() {
                        self.sent = true
                        self.$ga.event('form', 'consult')
                        self.$metrika.reachGoal('consult')
                    }
                ).catch(
                    function() {
                        self.err = true
                    }
                )
            }

            
        }
    }
}
</script>
