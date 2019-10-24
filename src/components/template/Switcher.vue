<template>
    <div class="switcher">
        <div class="switcher__text">
            <div class="switcher__text-title">{{ title }}</div>
            <div class="switcher__text-desc"><slot></slot></div>
        </div>
        <div class="switcher__buttons">
            <button class="switcher__button" :class="{ active: isActive }" @click="setActive">Да</button>
            <button class="switcher__button" :class="{ active: !isActive }" @click="setInactive">Нет</button>
        </div>
    </div> 
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        isActive: {
            type: Boolean,
            default: false
        }
    },
    model: {
        event: 'change',
        prop: 'isActive'
    },
    methods: {
        setActive() {
            this.value = true
            this.$emit('change', this.value)
        },
        setInactive() {
            this.value = false
            this.$emit('change', this.value)
        }
    }
}
</script>

<style lang="sass">
.switcher
    display: flex
    align-items: center
    padding: 32px 0
    & + .switcher
        border-top: 1px solid rgba(210,211,211,.5)

.switcher__text
    flex-grow: 1
    font-size: 15px;
    line-height: 15px;
    letter-spacing: 0.01em;
    color: #000000;

    &-title
        text-transform: uppercase;
        margin-bottom: 16px
        font-weight: bold
    
    &-desc 
        line-height: 20px
        
.switcher__button
    border: 1px solid #24BBF6;
    box-sizing: border-box;
    border-radius: 100px;
    font-size: 15px;
    font-weight: 600;
    color: #24BBF6;
    background: #fff;
    padding: 17px 35px
    cursor: pointer
    & + .switcher__button
        margin-left: 6px

    &.active
        background: rgba(36, 187, 246, 0.15);
</style>