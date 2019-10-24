<template>
    <div class="card" @click="click()">
        <div class="card__image-holder">
            <slot></slot>
        </div>
        <div class="card__title">
            {{ title }}
        </div>
        <div class="card__desc">
            {{ desc }}
        </div>
        <div v-if="actiontext" class="card__action-text">
            {{ actiontext }}
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'desc', 'actiontext'],
    methods: {
        click() {
            this.$emit('click')
        }
    }
}
</script>

<style lang="sass">
.card
    background: #FFFFFF;
    padding: 40px;
    text-align: center
    cursor: pointer
    border: 1px solid rgba(210,211,211,.5);
    border-radius: 6px;
    transition: all .25s;

    &+.card
        margin-left: 15px
        
    &:hover
        box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.12)
        border: 1px solid rgba(210,211,211,.25)
        
    

.card__image-holder
    width: 142px
    height: 142px
    border-radius: 100px
    overflow: hidden
    margin: 0 auto 39px

.card__title
    font-weight: 600;
    font-size: 15px;
    line-height: 15px;
    text-align: center;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 16px

.card__desc
    font-size: 15px;
    line-height: 20px;
    color: #666

.card__action-text
    color: #24BBF6;
    text-transform: uppercase
    margin-top: 32px;
</style>