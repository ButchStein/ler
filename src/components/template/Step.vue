<template>
    <div class="step">
        <header class="step__header">
            <a class="step__back" href="#" @click.prevent="goback()" v-if="showback">← Назад</a>
            <h1 class="step__header-title" :class="{ 'step__header-title-left': alignleft }">{{ title }}</h1>
            <div class="step__header-description">
                <slot name="desc"></slot>
            </div>
        </header>
        <main class="step__body">
            <slot name="body"></slot>
        </main>
        <footer class="step__actions">
            <slot name="actions"></slot>
        </footer>
    </div>
</template>

<script>
export default {
    name: "Step",
    props: ['title', 'showback', 'alignleft'],
    methods: {
        goback() {
            this.$store.commit('prevStep');
        }
    }
}
</script>

<style lang="sass">

.step
    display: flex
    flex-direction: column
    min-height: 100vh
    padding-top: 164px
    padding-bottom: 32px

.step__actions
    margin-top: auto

.step__header
    margin-bottom: 60px
    
.step__header-title
    font-size: 35px;
    line-height: 40px;
    text-align: center;
    color: #004990;
    margin-bottom: .5em


    &-left 
        text-align: left

.step__header-description
    font-size: 20px;
    line-height: 22px;
    color: #666;

.step__back 
    display: inline-block
    text-decoration: none
    text-transform: uppercase
    color: #666
    opacity: .5
    margin-bottom: 17px
</style>