<template>
    <div class="analyses">
        <div class="container-left analyses__step">
            <step title="Введите данные анализа воды" showback="true" alignleft="true">
                <template v-slot:body>
                    <form @submit.prevent="submitAnalyses()">
                        <input-field title="Общая жёсткость" metric="мг-экв/л" v-model.number="analyses.hardness" required/>
                        <input-field title="Общее железо" metric="мг/л" v-model.number="analyses.fe" required/>
                        <button type="button" class="collapse__title" :class="{active: showAll}" @click="showAll = !showAll">
                            <div>Дополнительные показатели</div>
                            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.5" d="M1.20711 0C0.761654 0 0.53857 0.53857 0.853552 0.853552L7.64645 7.64645C7.84171 7.84171 8.15829 7.84171 8.35355 7.64645L15.1464 0.853553C15.4614 0.538571 15.2383 0 14.7929 0H1.20711Z" fill="#656565"/>
                            </svg>    
                        </button>
                        <div class="collapse__body" v-if="showAll">
                            <input-field title="Нитраты" metric="мг/л" v-model.number="analyses.nitrati"/>
                            <input-field title="Нитриты" metric="мг/л" v-model.number="analyses.nitrite"/>
                            <input-field title="Водородный показатель (pH)" metric="ед. pH" v-model.number="analyses.ph"/>
                            <input-field title="Общее солесодержание (TDS)" metric="мг/л" v-model.number="analyses.tds"/>
                            <input-field title="Перманганатная окисляемость" metric="мг О2/л" v-model.number="analyses.oxidizability"/>
                            <input-field title="Цветность" metric="град." v-model.number="analyses.coloration"/>
                            <input-field title="Мутность" metric="ЕМФ" v-model.number="analyses.turbidity"/>
                        </div>
                        <button type="submit" class='button button-primary analyses-submit'>Подобрать решение</button>
                    </form>
                </template>
            </step>
        </div>
        <div class="analyses__example">
            <div class="container-right">
                <img src="../../assets/doc.png" />
            </div>
        </div>
    </div>
</template>

<script>
import Step from '../template/Step'
import InputField from '../template/InputField'

export default {
    components: {
        Step,
        InputField
    },
    methods: {
        submitAnalyses() {
            this.$store.commit('setFilter', { has_anlyses: true })
            this.$store.commit('setFilter', { analyses: this.analyses })
            this.$store.commit('finish')
        }
    },
    data() {
        return {
            showAll: false,
            analyses: {...this.$store.getters.analyses}
        }
    }
}
</script>

<style lang="scss">
@import "../../styles/grid.sass";


@media(min-width: 992px) {
    .analyses__step {
        padding-right: 50px !important;
    }
    .analyses__example {
        padding-left: 50px !important;
    }
}

@media(min-width: 1140px) {
    .analyses__step {
        padding-right: 100px !important;
    }
    .analyses__example {
        padding-left: 100px !important;
    }
}

.analyses {
    display: flex;
    align-items: stretch;
    min-height: 100vh;

    &-submit {
        margin-top: 50px;
    }

    &__left {
        padding-left: 15px;
        max-width: 360px;
    }

    &__example {
        background: #EFF1F1;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: top;
        padding-top: 164px;
        text-align: center;

        img {
            max-width: 100%;
            height: auto;
        }
    }
}


.collapse__title {
  padding: 20px 0;
  font-size: 15px;
  color: #000;
  text-transform: uppercase;
  font-weight: bold;
  background: transparent;
  border: 0;
  border-top: 1px solid rgba(210, 211, 211, 0.5);
  border-bottom: 1px solid rgba(210, 211, 211, 0.5);
  display: block;
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  line-height: 1;
  cursor: pointer;
}
.collapse__title svg {
  margin-left: auto;
}
.collapse__title.active {
  border-bottom: 0;
}

.container-left {
    @include make-container-left();
    @include make-container-half-widths();
}

@media (max-width: 991px) {
    .analyses {
        &__example {
            display: none;
        }

        &__step {
            @include make-container();
            @include make-container-max-widths();
            max-width: 100%;
            padding: 0 24px;
        }
    }
}
</style>
