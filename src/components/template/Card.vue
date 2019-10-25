<template>
    <div class="card" @click="click()">
        <div class="card__image-holder">
            <slot></slot>
        </div>
        <div class="card__content">
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

<style lang="scss">
.card {
  position: relative;
  z-index: 2;
  background: #FFFFFF;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  border: 1px solid rgba(210, 211, 211, 0.5);
  border-radius: 6px;
  transition: box-shadow 0.25s;

  + .card {
    margin-left: 15px;
  }

  &:hover {
    box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.12);
    border: 1px solid rgba(210, 211, 211, 0.25);
    z-index: 1;
  }
}

.card__image-holder {
  width: 142px;
  height: 142px;
  border-radius: 100px;
  overflow: hidden;
  margin: 0 auto 39px;
}

.card__title {
  font-weight: 600;
  font-size: 15px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 16px;
}

.card__desc {
  font-size: 15px;
  line-height: 20px;
  color: #666;
}

.card__action-text {
  color: #24BBF6;
  text-transform: uppercase;
  margin-top: 32px;
}

@media (max-width: 991px) {
.card {
    display: flex;
    margin-bottom: 12px;

    &__image-holder {
        flex-shrink: 0;
        margin: 0;
        margin-right: 35px;
    }

    &__content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        text-align: left;
    }

    &__action-text {
        display: none;
    }
}
}

@media (max-width: 767px) {
    .card {
        padding: 16px 25px;

        &__title {
            margin-bottom: 8px;
        }

        &__image-holder {
            margin-right: 15px;
            max-width: 64px;
            width: 100%;
            height: auto;

            img {
                max-width: 100%;
                display: block;
                height: auto;
            }
        }
    }
}
</style>
