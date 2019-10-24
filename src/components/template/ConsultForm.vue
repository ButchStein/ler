<template>
<div>
    <form class="form-inline" @submit.prevent="submit()" v-if="!sent">
        <div class="row">
            <div class="col-lg-4  col-md-6">
                <input v-model="params.name" name="name" type="text" class="form-input" placeholder="Имя" required/>
            </div>
            <div class="col-lg-4  col-md-6">
                <input v-model="params.phone" name="phone" type="text" class="form-input" placeholder="Телефон" required/>
            </div>
            <div class="col-lg-4">
                <button type="submit" class="form-button">Отправить</button>
            </div>
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
            error: false
        }
    },
    methods: {
        submit() {
            let self = this
            axios.post('/feedback', this.params).then(
                function() {
                    self.sent = true
                }
            ).catch(
                function() {
                    self.err = true
                }
            )
        }
    }
}
</script>

<style lang="scss">
.form-inline {

}


</style>
