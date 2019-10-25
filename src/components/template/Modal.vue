<template>
    <div class="modal__overlay" @click.self="$emit('close')" v-if="value">
        <div class="container"  @click.self="$emit('close')">
            <div class="modal">
                <div class="modal__close" @click="$emit('close')"><img src="../../assets/x.svg"/></div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="sass">
.modal__overlay
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5)
    z-index: 9999
    overflow: scroll
    .container
        display: flex
        justify-content: center

.modal 
    background-color: #fff;
    margin: 64px auto;
    padding: 60px
    display: inline-block
    position: relative

.modal__close 
    cursor: pointer
    position: absolute
    right: 30px
    top: 30px
    
</style>