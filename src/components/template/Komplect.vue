<template>
<div class="komplect">
    <input type="radio" name="komplect" style="display:none;" :id="id" :checked="checked"/>
    <label class="komplect__label" :for="id" @click="change()">
        <header class="komplect__title">{{ komplect.name }}</header>
        <div class="komplect__desc">{{ komplect.desc }}</div>
        <footer class="komplect__footer">
            <div class="komplect__price price">{{ price }}</div>
            <div class="komplect__stars">
                <img src="../../assets/star.svg" v-for="(star, index) in stars" :key="index"/>
                <img src="../../assets/halfstar.svg" v-if="half"/>
            </div>
        </footer>
    </label>
</div>
</template>

<script>
export default {
    props: [ 'komplect', 'items' ],
    computed: {
        checked() {
            return this.$store.getters.komplectId == this.komplect.id
        },
        rating() {
            return this.komplect.rating
        },
        stars() {
            let stars = [];
            let total = Math.floor(this.rating)
            for(let i = 0; i < total; i++) {
                stars.push('*')
            }
            return stars
        },
        half() {
            return (this.rating % Math.ceil(this.rating) > 0)
        },
        id() {
            return this._uid
        },
        price() {
            let price = 0
            for(let i=0; i<this.items.length; i++) {
                price += this.items[i].price
            }
            return price;
        }
    },
    methods: {
        change() {
            this.$store.commit('cartKomplect', {id: this.komplect.id, items: this.items})
        }
    },
    mounted() {
        if(this.checked) {
            this.$store.commit('cartKomplect', {id: this.komplect.id, items: this.items})
        } 
    }
}
</script>

<style lang="scss">
.komplect {
    flex-grow: 1;
    flex-basis: 100%;

    & + & {
        margin-left: 8px;
    }

    & input[type='radio']:checked + label {
        border: 3px solid #24BBF6;

        &::before {
            opacity: 0;
            visibility: hidden;
        }
    }

    &__label {
        cursor: pointer;
        display: block;
        background: #fff;
        border: 3px solid transparent;
        border-radius: 2px;
        padding: 14px 17px;
        position: relative;
        z-index: 2;
        transition: box-shadow .25s, border .25s;

        &::before {
            content: '';
            position: absolute;
            top: -3px;
            bottom: -3px;
            left: -3px;
            right: -3px;
            border: 1px solid #D2D3D3;
            transition: all .25s, border .25s;
        }
    }

    &__label:hover {
        box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.12);
        border-color: #fff;
        z-index: 1;
    }

    &__label label {
        display: block;
    }

    &__title {
        font-size: 20px;
        margin-bottom: 16px;
        color: #000;
    }

    &__desc {
        font-size: 13px;
        line-height: 18px;
        color: #666;
        margin-bottom: 46px;
    }

    &__price {
        color: #666;
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__stars {
        white-space: nowrap;
    }
}

@media (max-width: 991px) {
    .komplect {
        display: flex;
        flex-direction: column;
        flex-basis: 100%;

        &__label {
            flex: 1;
            padding: 5px 16px;
        }
    }
}

@media (max-width: 767px) {
    .komplect {
        min-width: 200px;

        &__label {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        &__title {
            margin-bottom: 0;
            padding-right: 10px;
            flex-grow: 1;
            font-size: 15px;
            line-height: 1;
        }

        &__desc {
            display: none;
        }

        &__footer {
            align-items: flex-start;
        }

        &__stars {
            display: none;
        }
    }
}
</style>

