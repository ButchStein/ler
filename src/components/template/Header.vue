<template>
    <header class="header container">
        <img class="header__logo" src="../../assets/logo.png"/>
        <div class="header__descriptor">Подбор комплексного решения для вашего дома</div>
        <div class="header__phone">8 800 100-100-7</div>
    </header>
</template>

<style lang="sass">
.header
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 32px;
    display: flex
    align-items: center

.header__logo
    margin-right: 20px

.header__descriptor
    font-size: 12px;
    line-height: 12px;
    color: #666;
    opacity: .5;

.header__phone
    margin-left: auto
    font-weight: 600;
    line-height: 18px;
    color: #666;
</style>