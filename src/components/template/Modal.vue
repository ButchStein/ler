<template>
    <div class="modal__overlay" @click.self="$emit('close')" v-if="value">
        <div class="modal">
            <div class="modal__content">
                <div class="modal__close" @click="$emit('close')"><img src="../../assets/x.svg"/></div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
@import '../../styles/grid.sass';

.modal {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    margin: 0;
    text-align: center;

    &__overlay {
        background: rgba(0,0,0,.5);
        position: fixed;
        z-index: 100;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        -webkit-overflow-scrolling: touch;
        overflow-x: hidden;
        overflow-y: auto;
    }

    &__content {
        position: relative;
        max-width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    &__close {
        cursor: pointer;
        position: absolute;
        right: 30px;
        top: 30px;
    }
}

@media (min-width: 992px) {
    .modal {
        width: auto;
        margin: 64px auto;

        &__content {
            display: inline-block;
            padding: 0 15px;
            min-height: 100%;
        }

        &__close {
            right: 45px;
        }
    }
}
</style>
