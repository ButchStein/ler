<template>
  <a href="#" class="start-again" @click.prevent="$store.commit('reset')">Начать заново</a>
</template>

<script>
export default {};
</script>

<style lang="sass">
    .start-again
        text-transform: uppercase
        padding-left: 31px
        background: url(../../assets/ic_startagain.svg) 0 50% no-repeat
        background-size: 21px 21px
        font-size: 16px
        line-height: 21px
        letter-spacing: 0.01em
        display: inline-block
        color: #24BBF6
        :hover
            color: darken(#24BBF6, 10%) !important
</style>
