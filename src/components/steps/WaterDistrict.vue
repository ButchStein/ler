<template>
  <div class="container">
    <step>
      <template v-slot:body>
        <div class="content">
          <div class="row">
            <div class="content__desc col-lg-4 col-sm-12">
              <div class="content__title">Не нашли свой район?</div>
              <div
                class="content__text"
              >С помощью двух простых вопросов поможем определить тип воды и посоветуем фильтры.</div>
            </div>
            <div class="content__map col-lg-8 col-sm-12">
              <img class="content__map__img" src="../../assets/district_map.jpg" alt="Карта района" />
            </div>

            <action-button
              class="content__button"
              title="Подобрать решение"
              primary="true"
              @click="setPath('flat')"
            />
          </div>
        </div>
      </template>
    </step>
  </div>
</template>

<script>
import Step from "../template/Step";
import ActionButton from "../template/ActionButton";
export default {
  components: {
    Step,
    ActionButton
  },
  methods: {
    setPath() {
      this.$store.commit("setPath", "flat");
      this.$store.commit("nextStep");
    }
  }
};
</script>

<style lang="scss">
.step__header {
  display: none;
}
.content {
  display: grid;
  align-items: center;

  &__desc {
    align-self: center;
  }
  &__title {
    width: 100%;
    max-width: 229px;
    font-size: 35px;
    color: #000000;
    padding-right: 10px;
    margin-bottom: 16px;

    @media (max-width: 991px) {
      max-width: 100%;
      font-size: 30px;
      line-height: 35px;
      text-align: center;
      padding-right: 0;
    }
    @media (max-width: 767px) {
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 8px;
    }
  }
  &__text {
    width: 100%;
    max-width: 300px;
    margin-bottom: 32px;
    line-height: 20px;
    @media (max-width: 991px) {
      max-width: 100%;
      text-align: center;
      padding-right: 0;
    }
    @media (max-width: 767px) {
      font-size: 15px;
      line-height: 20px;
    }
  }
  &__button {
    width: 100%;
    max-width: 300px;
    height: 65px;
    margin-top: -15%;
    margin-left: 7.5px;
    @media (max-width: 991px) {
      max-width: 100%;
      align-self: center;
      margin: 32px 7.5px 24px;
    }
    @media (max-width: 574px) {
      margin: 24px 15px 16px;
    }
  }
  &__map {
    overflow: hidden;
    min-height: 100%;
    &__img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>