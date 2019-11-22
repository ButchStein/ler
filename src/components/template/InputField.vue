<template>
    <label class="input-component">
        <div class="input-component__title">{{ title }}</div>
        <div class="input-component__field">
            <input type="number" step="0.01" :value="value" @input="$emit('input', $event.target.value)" placeholder="0" :required="required"/>
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
    color: #000000

.input-component__field
    background: #EFF1F1;
    border-radius: 2px;
    white-space: nowrap
    width: 130px

    input
        color: #4A4A4A
        font-size: 15px
        padding-left: 10px;
        padding-right: 10px;
        border: 0
        background: transparent
        width: 55px
        text-align: center
        height: 52px;
        line-height: 52px;

.input-component__field-metric
    padding: 17px 17px 17px 0;
    display: inline-block
    color: rgba(101,101,101,.5)


</style>