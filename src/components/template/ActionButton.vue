<template>
    <button @click="click()" :class="[ primary ? 'button button-primary' : 'button button-secondary']" :style="restyle">{{ title }}</button>
</template>

<script>
export default {
    props: [ 'primary', 'title', 'restyle' ],
    methods: {
        click() {
            this.$emit('click')
        }
    }
}
</script>

<style lang="sass">
.button
    border-radius: 2px
    font-weight: 600
    font-size: 20px
    line-height: 20px
    padding: 19px 17px
    text-transform: uppercase
    cursor: pointer
    border: 2px solid #24BBF6;
    letter-spacing: 0.5px;

    & + .button
        margin-left: 8px

.button-primary 
    background: #24BBF6
    color: #fff
    &:hover
        border-color: #12AAED
        background: #12AAED

.button-secondary
    color: #24BBF6
    background: #fff
    &:hover
        background: rgba(36, 187, 246, 0.1);

</style>