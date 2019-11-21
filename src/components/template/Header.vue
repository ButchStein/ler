<template>
    <header class="header">
        <div class="container">
            <div class="header__inner">
                <picture>
                    <source media="(min-width: 768px)" srcset="../../assets/barrier.svg">
                    <source media="(max-width: 767px)" srcset="../../assets/barrier-mobile.svg">
                    <img class="header__logo" src="../../assets/barrier.svg"/>
                </picture>
                <picture>
                    <source media="(min-width: 768px)" srcset="../../assets/leroy_logo.svg">
                    <source media="(max-width: 767px)" srcset="../../assets/leroy_logo.svg">
                    <img class="header__logo-leroy" src="../../assets/leroy_logo.svg"/>
                </picture>
                <div class="header__descriptor">Подбор комплексного решения для вашего дома</div>
                <a href="tel:88001001007" class="header__phone">8 800 100-100-7</a>
                <a href="tel:88001001007" class="header__tel">
                    <img src="../../assets/phone-ler.svg" alt="">
                </a>
            </div>
        </div>
    </header>
</template>

<style lang="scss">
.header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 32px;
    z-index: 1;

    &__inner {
        display: flex;
        align-items: center;
    }

    &__logo {
        margin-right: 20px;
        width: 152px;
        height: 32px;
    }
    &__logo-leroy{
        margin-right: 30.35px;
        width: 52.65px;
        height: 31.65px;
    }

    &__descriptor {
        font-size: 12px;
        line-height: 12px;
        color: #666;
        opacity: 0.5;
    }

    &__phone {
        margin-left: auto;
        font-weight: 600;
        line-height: 18px;
        color: #666;
    }

    &__tel {
        display: none;
    }
}

@media (max-width: 991px) {
    .header {
        padding: 20px 0;
        border-bottom: 1px solid #ECECED;

        &__descriptor {
            display: none;
        }
    }
}

@media (max-width: 767px) {
    .header {
        padding: 12px 0;
        border: none;

        &__logo {
            margin: 0;
            width: auto;
            height: 36px;
        }

        &__inner {
            justify-content: space-between;
        }

        &__phone {
            margin: 0;
            color: #69BF62;
            opacity: 0.6;
        }


        &__tel {
            display: block;
        }
    }
}
</style>
