<template>
    <label class="input-component">
        <div class="input-component__title">{{ title }}</div>
        <div class="input-component__field">
            <input type="text" :value="value" @input="$emit('input', $event.target.value)" placeholder="0" :required="required"/>
            <div class="input-component__field-metric">{{ metric }}</div>
        </div>
    </label>
</template>

<script>
export default {
    props: ['value', 'title', 'metric', 'required']
}
</script>

<style lang="sass">
.input-component
    display: flex
    padding: 18px 0
    align-items: center
    border-top: 1px solid rgba(210,211,211,.5)
   

.input-component__title
    flex-grow: 1
    font-weight: 600;
    font-size: 15px;
    line-height: 15px;
    letter-spacing: 0.01em;
    text-transform: uppercase;

.input-component__field
    background: #EFF1F1;
    border-radius: 2px;
    white-space: nowrap
    width: 130px

    input
        color: #4A4A4A
        font-size: 15px
        line-height: 1
        padding: 17px;
        border: 0
        background: transparent
        width: 55px
        text-align: center

.input-component__field-metric
    padding: 17px 17px 17px 0;
    display: inline-block
    color: rgba(101,101,101,.5)


</style>