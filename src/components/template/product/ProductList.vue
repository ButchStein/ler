<template>
  <div class="product-list__item" @mouseenter="hover()" @mouseleave="blur()" @click="show()">
    <div class="product-list__item-label" :class="{checked: checked}">
      <div class="product-list__item-inner">
        <div class="product-list__item-img" :style="{'border-color': item.color}">
          <img :src="item.photo_250_250" />
        </div>
        <div class="product-list__item-info">
          <div class="product-list__item-title">{{item.name}}</div>
          <div class="product-list__item-desc">{{item.short_desc}}</div>
          <div
            class="product__brief-warning"
            v-if="item.additional_short_desc"
          >{{ item.additional_short_desc }}</div>
        </div>
      </div>
      <div class="product-list__control">
        <div class="product-list__item-price">
          <div class="price price-old" v-if="item.old_price">{{ item.old_price }}</div>
          <div class="price">{{ item.price }}</div>
        </div>
        <button
          class="product-list__item-button"
          :class="{active: !checked}"
          @click.stop="change()"
        >
          <span v-if="checked">Убрать</span>
          <span v-else>Выбрать</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  computed: {
    id() {
      return this._uid;
    },
    checked() {
      return this.$store.getters.cart.indexOf(this.item) >= 0;
    }
  },
  methods: {
    show() {
      this.$store.commit("show", this.item);
    },
    change() {
      let action = !this.checked ? "cartAddItem" : "cartRemoveItem";
      this.$store.commit(action, this.item);
      this.$store.commit("resetKomplect");
    },
    hover() {
      this.$store.commit("productHover", this.item.name);
      this.$store.commit("mapPoint", this.item.point_on_diagram);
    },
    blur() {
      this.$store.commit("productHover", "");
      this.$store.commit("mapPoint", null);
    }
  }
};
</script>

<style lang="scss">
.product-list__item {
  padding-bottom: 12px;
  cursor: pointer;
}

.product-list__item-img {
  border: 6px solid transparent;
  width: 96px;
  height: 96px;
  border-radius: 100%;
  overflow: hidden;
  flex-shrink: 0;
}
.product-list__item-img img {
  max-width: 100%;
  max-height: 100%;
}

.product-list__item-label {
  transition: box-shadow 0.25s, border 0.25s;
  position: relative;
  z-index: 2;
  display: block;
  border: 4px solid transparent;
  background-color: #fff;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.12);
    z-index: 1;
    border-color: #fff;
  }

  &::before {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 1px solid rgba(210, 211, 211, 0.5);
    transition: all 0.25s ease-out;
  }

  &.checked {
    &::before {
      opacity: 0;
      visibility: hidden;
    }
    &:hover {
      border-color: #69bf62;
    }
  }
}

.product-list__item-info {
  flex-grow: 1;
  margin: 0 20px;
  position: relative;

  .product__brief-warning {
    font-size: 0.9em;
  }
}
.product-list__item-title {
  font-size: 20px;
  line-height: 24px;
  color: #000;
}
.product-list__item-desc {
  font-size: 15px;
  line-height: 18px;
  color: #666;
  margin: 8px 0;
}
.product-list__item-price {
  font-size: 20px;
  line-height: 1;
  color: #000;
  width: 60px;
  flex-shrink: 0;
}
.product-list__item-price .price-old {
  font-size: 15px;
  line-height: 15px;
  text-decoration-line: line-through;
  color: #666;
  opacity: 0.5;
}

.product-list__item-button {
  min-width: 120px;
  max-width: 120px;
  display: block;
  border: 0;
  font-size: 15px;
  font-weight: 600;
  height: 45px;
  line-height: 44px;
  padding-top: 2px;
  padding-left: 16px;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
  margin-left: 24px;
  flex-shrink: 0;
  text-align: left;
  background: rgba(102, 192, 93, 0.15);
  color: #69BF62;

  &:hover {
    background: rgba(102, 192, 93, 0.25);
  }
  &:after {
    content: " ";
    top: 0;
    right: 0;
    width: 38px;
    height: 100%;
    position: absolute;
    background: url(../../../assets/ic_cancel-green.svg) 50% 50% no-repeat;
    background-size: 10px 10px;
  }

  &.active {
    color: #fff;
    background: #69bf62;
    &:hover {
      background: darken(#69bf62, 10%);
    }
  }
}

.product-list__item-button.active:after {
  background: url(../../../assets/ic_plus.svg) 50% 50% no-repeat;
}

.product-list__item-label.checked {
  border: 4px solid #69BF62;
}
// .product-list__item-label.checked .product-list__item-button {
//   background: rgba(36, 187, 246, 0.15);
//   color: #24BBF6;
// }
// .product-list__item-label.checked .product-list__item-button:after {
//   background: url(../../../assets/ic_cancel.svg) 50% 50% no-repeat;
// }

.product-list {
  &__control {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }

  &__item {
    &-inner {
      display: flex;
      flex-grow: 1;
    }
  }
}

@media (max-width: 991px) {
  .product-list {
    &__control {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      padding-top: 10px;
    }

    &__item {
      &-img {
        margin-top: 7px;
      }

      &-label {
        align-items: flex-start;
      }

      &-price {
        margin-bottom: 24px;
        text-align: right;
      }

      &-button {
        height: 40px;
        line-height: 38px;
        padding-top: 2px;
      }
    }
  }
}

@media (max-width: 767px) {
  .product-list {
    &__control {
      width: 100%;
      justify-content: space-between;
      align-items: flex-end;
    }

    &__item {
      &-info {
        margin: 0;
      }

      &-inner {
        position: relative;
      }

      &-img {
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 0;
        width: 60px;
        height: 60px;
      }

      &-label {
        padding: 12px;
        display: flex;
        flex-wrap: wrap;
      }

      &-title {
        padding-left: 72px;
        min-height: 60px;
        display: flex;
        align-items: center;
      }

      &-desc {
        margin-top: 12px;
      }

      &-price {
        margin-bottom: 0;
        text-align: left;
      }
    }
  }
}
</style>
