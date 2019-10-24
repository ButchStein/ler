<template>
    <div class="product-list__item">
        <input type="checkbox" :value="item.id" :id="id" v-model="checked" @change="change()"/>
        <label :for="id" class="product-list__item-label">
            <div class="product-list__item-inner">
                <div class="product-list__item-img" :style="{'border-color': item.color}">
                    <img :src="item.photo"/>
                </div>
                <div class="product-list__item-info">
                    <div class="product-list__item-title">{{item.name}}</div>
                    <div class="product-list__item-desc">{{item.short_desc}}</div>
                    <a href="#">Подробнее</a>
                </div>
            </div>
            <div class="product-list__control">
                <div class="product-list__item-price">
                    <div class="price price-old">{{ item.price }}</div>
                    <div class="price">{{ item.price }}</div>
                </div>
                <div class="product-list__item-button" v-if="checked">Убрать</div>
                <div class="product-list__item-button" v-else>Добавить</div>
            </div>
        </label>
    </div>
</template>

<script>
export default {
    props: [ 'item' ],
    data() {
        return {
            checked: false
        }
    },
    computed: {
        id() {
            return this._uid
        }
    },
    methods: {
        change() {
            let action = (this.checked) ? 'cartAddItem': 'cartRemoveItem'
            this.$store.commit(action, this.item)
        }
    }
}
</script>

<style lang="scss">
.product-list__item {
  margin-bottom: 12px;
}
.product-list__item input[type=checkbox] {
  display: none;
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
  display: block;
  border: 1px solid rgba(210, 211, 211, 0.5);
  background-color: #fff;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-list__item-info {
  flex-grow: 1;
  margin: 0 20px;
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
  display: inline-block;
  border: 0;
  line-height: 1;
  font-size: 15px;
  font-weight: 600;
  height: 38px;
  line-height: 38px;
  padding-left: 16px;
  padding-right: 45px;
  background: #24BBF6;
  border-radius: 2px;
  position: relative;
  color: #fff;
  cursor: pointer;
  margin-left: 24px;
  flex-shrink: 0;
}
.product-list__item-button:after {
  content: " ";
  top: 0;
  right: 0;
  width: 38px;
  height: 100%;
  position: absolute;
  background: url(../../../assets/ic_plus.svg) 50% 50% no-repeat;
  background-size: 10px 10px;
}

input[type=checkbox]:checked + .product-list__item-label {
  border: 4px solid #24BBF6;
}
input[type=checkbox]:checked + .product-list__item-label .product-list__item-button {
  background: rgba(36, 187, 246, 0.15);
  color: #24BBF6;
}
input[type=checkbox]:checked + .product-list__item-label .product-list__item-button:after {
  background: url(../../../assets/ic_cancel.svg) 50% 50% no-repeat;
}

.product-list {

    &__control {
        display: flex;
        flex-wrap: nowrap;
    }

    &__item {

        &-inner {
            display: flex;
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
                margin-top: 7px;
                width: 60px;
                height: 60px;
            }

            &-label {
                padding: 16px;
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
