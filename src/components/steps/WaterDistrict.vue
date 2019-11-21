<template>
  <div class="container">
    <step>
      <template v-slot:body>
        <div class="content">
          <div class="row">
            <div class="content__desc col col-xl-4">
              <div class="content__title">Не нашли свой район?</div>
              <div
                class="content__text"
              >С помощью двух простых вопросов поможем определить тип воды и посоветуем фильтры.</div>
              <action-button
                class="content__button"
                title="Подобрать решение"
                primary="true"
                @click="setPath('flat')"
              />
            </div>
            <div class="content__map col col-xl-8">
              <img src="../../assets/district_map.jpg" alt="Карта района" />
            </div>
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
.content {
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: space-between;

  &__title {
    width: 100%;
    max-width: 229px;
    font-size: 35px;
    color: #000000;
    padding-right: 10px;
    margin-bottom: 16px;
  }
  &__text {
    width: 100%;
    max-width: 300px;
    margin-bottom: 32px;
    line-height: 1.35;
  }
  &__button {
    width: 100%;
    max-width: 300px;
    height: 65px;
  }
}
</style>