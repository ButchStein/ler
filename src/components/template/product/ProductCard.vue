<template>
    <div class="product" :class="(product.subtitutes.length) && 'product--variants'">
        <div class="product__variants" v-if="product.subtitutes.length" :class="{showOnMobile: showSubstitudes}">
            <div style="margin-bottom:26px">Все варианты:<div class="product__variants-close" @click="showSubstitudes = false"></div></div>
            <div class="product__variants__item"
            v-for="item in subtitutes"
            :key="item.id"
            :class="{active: item.id === product.id }"
            @click="change(item)"
            >
                <div>
                    <div class="product__variants__item-name">{{ item.name }}</div>
                    <div class="product__variants__item-warning">{{ item.additional_short_desc }}</div>
                </div>
                <img :src="item.photo_250_250" class="product__variants__item-img"/>
            </div>
        </div>
        <div class="product__info">
            <div class="product__preview">
                <div class="product__preview-pic" :style="{borderColor: product.color}">
                    <img :src="product.photo" :srcset="`${product.photo_250_250} 1x, ${product.photo_500_500} 2x`"/>
                </div>
                <div class="product__brief">
                    <div class="product__brief-title">{{product.name}}</div>
                    <div class="product__brief-desc">{{product.short_desc}}</div>
                    <div class="product__brief-warning" v-if="product.additional_short_desc">{{product.additional_short_desc}}</div>
                    
                    <div class="product__brief-price-and-button">
                      <div class="product__brief-price price">{{product.price}}</div>
                      <button class="product-list__item-button product-list__item-button--detailed active" v-if="showButton"  @click="replace()">
                          Заменить
                      </button>
                      <button class="product-list__item-button product-list__item-button--detailed active" v-else-if="!showButton && !inCart" @click="select()">
                          Выбрать
                      </button>
                      <button class="product-list__item-button product-list__item-button--detailed" v-else @click="remove()">Убрать</button>
                    </div>
                    <div class="product__variants-mobile" v-if="product.subtitutes.length">
                        <button class="button  button-secondary" @click="showSubstitudes = true" v-if="!showSubstitudes">Все варианты</button>
                    </div>
                </div>
            </div>
            <div class="product__detailed">
                <div class="product__tabs">
                    <div class="product__tabs-tab"
                    @click="activeTab = true"
                    :class="{active: activeTab}">Описание</div>
                    <div class="product__tabs-tab"
                    @click="activeTab = false"
                    :class="{active: !activeTab}">Характеристики</div>
                </div>
                <div class="product__tabs-content">
                    <div v-if="activeTab" v-html="product.description">
                    </div>
                    <div v-else>
                        <div class="cart-summary__total-items">
                            <div class="cart-summary__total-item" v-for="(item, index) in product.characteristic" :key="index">
                                <div class="cart-summary__total-item-name">
                                    {{ item.name }}
                                </div>
                                <div class="cart-summary__total-item-price">
                                    {{ item.value }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['product'],
    data() {
        return {
            activeTab: true,
            showSubstitudes: false
        }
    },
    computed: {
        subtitutes() {
            let result = [ this.product ]
            for(let i = 0; i < this.product.subtitutes.length; i++) {
                result.push( this.$store.getters.productById(this.product.subtitutes[i]) )
            }
            result.sort(function(a, b) {
                return a.id - b.id
            });
            return result;
        },
        showButton() {
          return (this.replacerInCart !== null)
        },
        replacerInCart() {
          let subtitutes = this.subtitutes

          for(let i in subtitutes) {
            // показываем кнопку,если один из заменителей корзине
            if(this.$store.getters.isInCart(subtitutes[i].id) && subtitutes[i].id !== this.product.id) {
              return subtitutes[i].id
            }
          }

          return null
        },
        replacerInFiltered() {
          let subtitutes = this.subtitutes

          for(let i in subtitutes) {
            // показываем кнопку,если один из заменителей корзине
            if(this.$store.getters.isInFiltered(subtitutes[i].id) && subtitutes[i].id !== this.product.id) {
              return subtitutes[i].id
            }
          }

          return null
        },
        inCart() {
          return this.$store.getters.isInCart(this.product.id)
        }
    },
    methods: {
      replace() {
          let replacer = this.replacerInCart
          this.$store.commit('replaceInCart', {replace: replacer, item: this.product});
          this.$store.commit('replaceInFiltered', {replace: replacer, item: this.product});
          this.$store.commit('resetKomplect')
          this.$emit('close');
      },
      select() {
          let replacer = this.replacerInFiltered
          this.$store.commit('replaceInFiltered', {replace: replacer, item: this.product});
          this.$store.commit('cartAddItem', this.product)
          this.$store.commit('resetKomplect')
          this.$emit('close');
      },
      remove() {
          this.$store.commit('cartRemoveItem', this.product)
          this.$emit('close')
      },
      change(item) {
          this.$store.commit('show', item)
          this.showSubstitudes = false
      }
    }
}
</script>

<style lang="scss">
.product__preview {
  display: flex;
  margin-bottom: 50px;
}

.product__variants {
  width: 310px;
  padding-right: 50px;
}

.product__variants__item {
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  padding: 12px 0;
  border-top: 1px solid rgba(210, 211, 211, 0.5);
}
.product__variants__item > div {
  flex-grow: 1;
  margin: 0 12px;
}
.product__variants__item:last-child {
  border-bottom: 1px solid rgba(210, 211, 211, 0.5);
}
.product__variants__item-img {
  max-width: 39px;
  max-height: 39px;
  float: right;
}
.product__variants__item:before {
  content: " ";
  border: 2px solid #D2D3D3;
  box-sizing: border-box;
  border-radius: 100px;
  width: 28px;
  height: 28px;
  display: block;
  float: left;
  flex-shrink: 0;
}
.product__variants__item.active:before {
  background: url("../../../assets/active.svg") 0 0 no-repeat;
  border: 0;
}
.product__variants__item-warning {
  color: #000;
}

.product__info {
  width: 660px;
}

.product__brief {
  padding-left: 32px;
  display: flex;
  flex-direction: column;
}
.product__brief-title {
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  color: #000;
  margin-bottom: 24px;
}
.product__brief-desc {
  line-height: 18px;
  margin-bottom: 25px;
}
.product__brief-warning {
  color: #000;
  line-height: 1.5;
  margin-bottom: 12px;
}
.product__brief-warning:before {
  width: 17px;
  height: 17px;
  background: url("../../../assets/warning.svg") 50% 50% no-repeat;
  background-size: 100% 100%;
  content: " ";
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
}
.product__brief-price {
  font-weight: 600;
  font-size: 30px;
  line-height: 1;
  color: #000;
}
.product__brief-price-and-button {
  display: flex;
  align-items: center;
  margin-top: auto;
  width: 100%;
  .product-list__item-button {
    margin-left: auto;
  }
}

.product__preview-pic {
  overflow: hidden;
  width: 274px;
  height: 274px;
  border: 12px solid transparent;
  flex-shrink: 0;
  border-radius: 100%;
}
.product__preview-pic img {
  max-width: 100%;
  max-height: 100%;
}

.product__tabs {
  border-bottom: 1px solid rgba(210, 211, 211, 0.5);
  margin-bottom: 32px;
}
.product__tabs-tab {
  display: inline-block;
  border-bottom: 4px solid transparent;
  margin-bottom: -1px;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding: 16px 0;
  margin-right: 32px;
  cursor: pointer;
}
.product__tabs-tab.active {
  border-bottom: 4px solid #24BBF6;
  color: #000;
}
.product__tabs-content {
  font-size: 15px;
  line-height: 25px;
  color: #000000;
}
.product__tabs-content p, ul, li, ol {
  margin: 0.5em 0;
}
.product__tabs-content ul {
  list-style-type: disc;
  margin-left: 20px;
}
.product__tabs-content ol {
  list-style-type: decimal;
  margin-left: 20px;
}
.product__tabs-content {
  .cart-summary__total-amount-price, .cart-summary__total-item-price {
    font-weight: 600;
  }
}
.product {
    text-align: left;
    max-width: 800px;
    margin: 0 auto;
    padding: 60px;
    background-color: #fff;

    &__info {
        flex-basis: 0;
        flex-grow: 1;
        max-width: 100%;
    }

    &__variants {
        flex-shrink: 0;

        &-mobile {
            display: none;
        }
    }

    &--variants {
        max-width: 1140px;
        display: flex;
        align-items: flex-start;
    }
}

@media (max-width: 991px) {
    .product {
        flex-grow: 1;
        max-width: 100%;
    }
    .product-list__item-desc {
      margin-bottom: 0;
    }
    .product-list__item-info a {
          padding: 10px 0;
          display: inline-block;
    }
    .product--variants {

        .product__variants {
            display: none;

            &.showOnMobile {
              display: block;
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              z-index: 200;
              background-color: #fff;
              width: 100%;
              padding: 26px 15px 15px;
              box-shadow: 0px 20px 100px rgba(0, 0, 0, 0.25);
              }

              .product__variants-close {
                  background: url(../../../assets/ic_cancel.svg) 50% 50% no-repeat;
                  background-size: 10px 10px;
                  width: 32px;
                  height: 32px;
                  float: right;
                  margin-top: -10px;
                }
            }

            &-mobile {
                display: block;
                margin-top: 35px;

                .button {
                    min-width: 270px;
                    font-size: 15px;
                    text-transform: none;
                }
            }
        }
    }

@media (max-width: 767px) {
    .product {
        flex-grow: 1;
        padding: 15px;
        width: 100%;

        &__variants {
            display: none;

            &-mobile {
                display: block;
                margin-top: 35px;

                .button {
                    display: block;
                    width: 100%;
                }
            }
        }
        &__preview {
            flex-direction: column;
            margin-bottom: 30px;

            &-pic {
                margin: 16px auto;
            }
        }

        &__brief {
            padding: 0;
            text-align: center;
        }
    }
    
}
</style>
