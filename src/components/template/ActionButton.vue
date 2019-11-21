<template>
  <button
    @click="click()"
    :class="[ primary ? 'button button-primary' : 'button button-secondary']"
    :style="restyle"
  >{{ title }}</button>
</template>

<script>
export default {
  props: ["primary", "title", "restyle"],
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss">
.button {
  height: 62px;
  line-height: 62px;
  border-radius: 2px;
  font-weight: 600;
  font-size: 20px;
  padding: 0 17px;
  text-transform: uppercase;
  cursor: pointer;
  border: 2px solid #69bf62;
  letter-spacing: 0.5px;

  & + & {
    margin-left: 8px;
  }

  &-primary {
    background: #69bf62;
    color: #fff;
  }

  &-primary:hover {
    background: darken(#69bf62, 10%);
  }

  &-secondary {
    color: #69bf62;
    background: #fff;
  }

  &-secondary:hover {
    background: rgba(36, 187, 246, 0.1);
  }
}

@media (max-width: 767px) {
  .button {
    text-transform: none;
    font-size: 15px;
    letter-spacing: 0;
    padding: 0 20px;
    height: 55px;
    line-height: 51px;
  }
}
</style>
