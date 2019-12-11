<template>
  <div class="water-table">
    <div class="water-table__title">В пределах нормы</div>
    <ul class="water-table__list">
      <li class="water-table__item">
        <div class="water-table__item-name">Водородный показатель</div>
        <span class="water-table__item-separator"></span>
        <div class="water-table__item-value">
          {{analyses.ph}}
          <span>ед.ph</span>
        </div>
      </li>
      <li class="water-table__item">
        <div class="water-table__item-name">Общая жёсткость</div>
        <span class="water-table__item-separator"></span>
        <div class="water-table__item-value">
          {{analyses.hardness}}
          <span>мг-экв/л</span>
        </div>
      </li>
      <li class="water-table__item">
        <div class="water-table__item-name">Общее железо</div>
        <span class="water-table__item-separator"></span>
        <div class="water-table__item-value">
          {{analyses.fe}}
          <span>мг/л</span>
        </div>
      </li>
      <li class="water-table__item">
        <div class="water-table__item-name">Нитраты</div>
        <span class="water-table__item-separator"></span>
        <div class="water-table__item-value">
          {{analyses.nitrati}}
          <span>мг/л</span>
        </div>
      </li>
      <li class="water-table__item">
        <div class="water-table__item-name">Общее солесодержание</div>
        <span class="water-table__item-separator"></span>
        <div class="water-table__item-value">
          {{analyses.tds}}
          <span>мг/л</span>
        </div>
      </li>
      <li class="water-table__item">
        <div class="water-table__item-name">Перманганатная окисляемость</div>
        <span class="water-table__item-separator"></span>
        <div class="water-table__item-value">
          {{analyses.oxidizability}}
          <span>мг О2/л</span>
        </div>
      </li>
      <li class="water-table__item">
        <div class="water-table__item-name">Мутность</div>
        <span class="water-table__item-separator"></span>
        <div class="water-table__item-value">
          {{analyses.turbidity}}
          <span>ЕМФ</span>
        </div>
      </li>
      <li class="water-table__item">
        <div class="water-table__item-name">Цветность</div>
        <span class="water-table__item-separator"></span>
        <div class="water-table__item-value">
          {{analyses.coloration}}
          <span>град.</span>
        </div>
      </li>
    </ul>

    <div :class="{preloader:preloader}">
      <button
        type="submit"
        class="button button-primary analyses-submit"
        @click="setPath('flat')"
      >Подобрать решение</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    setPath() {
      this.$store.commit("setPath", "flat");
      this.$store.commit("setFilter", { categories: 3 });
      let self = this;
      this.preloader = true;
      setTimeout(function() {
        self.$store.commit("finish");
      }, 100);
    }
  },
  data() {
    return {
      analyses: this.$store.getters.analyses,
      preloader: false
    };
  }
};
</script>
<style lang="scss">
.water-table {
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: #ffffff;
  width: 50vw;
  box-shadow: 0px 0px 25px 3px rgba(0, 0, 0, 0.35);
  &__title {
    text-align: left;
    color: #64bf62;
    font-size: 25px;
  }
  &__list {
    margin-top: 40px;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 600;
    color: #64bf62;
    text-transform: uppercase;
    margin-bottom: 10px;
    background: url(../../assets/complete.svg) 0 50% no-repeat;
    padding-left: 30px;
    position: relative;
    &-name {
      z-index: 4;
      background: #ffffff;
      padding-right: 10px;
      text-align: left;
    }
    &-separator {
      display: block;
      position: absolute;
      right: 0;
      bottom: 2px;
      height: 2px;
      width: 90%;
      overflow: hidden;
      background: url(../../assets/bullet.png) 0 50% repeat-x;
      z-index: 2;
    }
    &-value {
      position: absolute;
      z-index: 4;
      right: 0;
      background: #ffffff;
      padding-left: 10px;
    }
  }
}

@media (max-width: 992px) {
  .water-table {
    width: 95vw;
    margin: 0 auto;
    padding: 30px;

    &__item {
      font-size: 10px;
      padding-left: 20px;
    }
  }
}
</style>