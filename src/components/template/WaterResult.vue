<template>
  <div class="water-table__wrap">
    <div class="water-table__header">
      <div class="water-table__title">В пределах нормы</div>
    </div>
    <ul class="water-table__list">
      <li class="water-table__item">
        ВОДОРОДНЫЙ ПОКАЗАТЕЛЬ
        <div>
          {{analyses.ph}}
          <span>ед.ph</span>
        </div>
      </li>
      <li class="water-table__item">
        Общая жёсткость
        <div>
          {{analyses.hardness}}
          <span>мг-экв/л</span>
        </div>
      </li>
      <li class="water-table__item">
        Общее железо
        <div>
          {{analyses.fe}}
          <span>мг/л</span>
        </div>
      </li>
      <li class="water-table__item">
        Нитраты
        <div>
          {{analyses.nitrati}}
          <span>мг/л</span>
        </div>
      </li>
      <li class="water-table__item">
        Общее солесодержание
        <div>
          {{analyses.tds}}
          <span>мг/л</span>
        </div>
      </li>
      <li class="water-table__item">
        Перманганатная окисляемость
        <div>
          {{analyses.oxidizability}}
          <span>мг О2/л</span>
        </div>
      </li>
      <li class="water-table__item">
        Мутность
        <div>
          {{analyses.turbidity}}
          <span>ЕМФ</span>
        </div>
      </li>
      <li class="water-table__item">
        Цветность
        <div>
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
<style lang="scss" scoped>
.water-table__wrap {
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: rgba(102, 192, 93, 0.25);
  width: 50vw;
}
.water-table__title {
  text-align: left;
  color: #ffffff;
  font-size: 25px;
}
.water-table__list {
  margin-top: 20px;
}
.water-table__item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  text-transform: uppercase;
  margin-bottom: 10px;
  background: url(../../assets/complete.svg) 0 50% no-repeat;
  padding-left: 20px;
}
@media (max-width: 992px){
  .water-table__wrap{
    width: 100vw;
  }
}
  

</style>