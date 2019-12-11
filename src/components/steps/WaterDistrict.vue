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
              <img
                class="content__map__img"
                src="../../assets/district_map.jpg"
                alt="Карта района"
                @click="showModal = true"
              />
            </div>
          </div>
          <transition name="fade">
            <modal v-model="showModal" @close="showModal = false">
              <water-result />
            </modal>
          </transition>
        </div>
      </template>
    </step>
  </div>
</template>

<script>
import Step from "../template/Step";
import Modal from "../template/Modal";
import WaterResult from "../template/WaterResult";
export default {
  components: {
    Step,
    Modal,
    WaterResult
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>

<style lang="scss">
.content {
  display: grid;
  align-items: center;
  margin-top: -60px;
  &>.modal__overlay{
    background: transparent;
    &>.modal{
      margin: 181px auto;
    }
  }
  @media (max-width: 991px) {
    margin-top: -40px;
  }
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
    cursor:pointer;
    &__img {
      max-width: 100%;
      height: auto;
    }
  }
  
}
</style>