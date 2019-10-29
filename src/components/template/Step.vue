<template>
    <div class="step">
        <header class="step__header">
            <a class="step__back" href="#" @click.prevent="goback()" v-if="showback">← Назад</a>
            <h1 class="step__header-title" :class="{ 'step__header-title-left': alignleft }">{{ title }}</h1>
            <div class="step__header-description" :class="{ 'step__header-description-left': alignleft }">
                <slot name="desc"></slot>
            </div>
        </header>
        <main class="step__body">
            <slot name="body"></slot>
        </main>
        <footer class="step__actions">
            <slot name="actions"></slot>
        </footer>
    </div>
</template>

<script>
export default {
    name: "Step",
    props: ['title', 'showback', 'alignleft'],
    methods: {
        goback() {
            this.$store.commit('prevStep');
        }
    }
}
</script>

<style lang="scss">

.step {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 164px;
  padding-bottom: 32px;

  &__actions {
    margin-top: auto;
  }

  &__header {
    margin-bottom: 60px;
  }

  &__header-title {
    font-size: 35px;
    line-height: 40px;
    text-align: center;
    color: #004990;
    margin-bottom: 0.5em;
  }

  &__header-title-left {
    text-align: left;
  }

  &__header-description {
    font-size: 20px;
    line-height: 1.3;
    color: #666;
    text-align:center;

    &-left {
        text-align: left;
    }
  }

  &__back {
    display: inline-block;
    text-decoration: none;
    text-transform: uppercase;
    color: #666;
    opacity: 0.5;
    margin-bottom: 17px;
  }
}

@media (max-width: 991px) {
    .step {
        padding-top: 115px;

        &__header {
          margin-bottom: 38px;
        }

        &__header-title {
            max-width: 440px;
            margin: 0 auto;
            font-size: 30px;
            line-height: 35px;

            &.step__header-title-left {
                margin: 0;
                margin-bottom: 12px;
            }
        }

        &__actions {
            display: flex;
            margin-top: 20px;

            .button {
                flex-grow: 1;
            }

            .button + .button {
                margin-left: 16px;
            }
        }
    }
}

@media (max-width: 767px) {
    .step {
        padding-top: 80px;

        &__header {
            margin-bottom: 24px;

            &-title {
                font-size: 20px;
                line-height: 24px;
            }

            &-description {
                font-size: 15px;
                line-height: 22px;
            }
        }

        &__actions {
            flex-wrap: wrap;
        }
    }
}

@media (max-width: 575px) {
    .step {
        &__actions {
            .button {
                display: block;
                width: 100%;
            }

            .button + .button {
                margin: 0;
                margin-top: 10px;
            }
        }
    }
}
</style>
