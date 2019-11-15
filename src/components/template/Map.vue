<template>
    <div class="map zoom" :class="{pic1: isFlat, pic2: !isFlat, active:active}" :style="{backgroundPosition: backgroundPosition}">
        <img src="../../assets/flatbig.jpg" v-if="isFlat"/>
        <img src="../../assets/home.jpg" v-else/>

        <div class="map__desc">
            <div>{{ mapPoint.name }}</div>
            {{ productName }}
        </div>

        <a href="#" v-scroll-to="'#product-group-'+point.group" v-for="(point, index) in points" 
        class="map__point" 
        :style="{top: point.y, left: point.x}" :key="index" 
        @mouseenter="zoomIn(point)" 
        @mouseleave="zoomOut()"
        :class="{active: mapPoint.id == point.id}"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            backgroundPosition: '0 0',
            active: false 
        }
    },
    computed: {
        mapPoint() {
            let storePoint = this.$store.getters.mapPoint;
            let point = {}
            for(let i = 0; i < this.points.length; i++) {
                if(this.points[i].id == storePoint) {
                    point = this.points[i]
                    break;
                }
            }

            if (storePoint) {
                this.zoomIn(point);
            } else {
                this.zoomOut()
            }

            return point;
        },
        productName() {
            return this.$store.getters.productHover;
        },
        isFlat() {
            return this.$store.getters.filter('categories') == 3;
        },
        points() {
            if (this.isFlat) {
                return [
                    {id: 1, x: '50px',  y: '180px', bgx: '-50px', bgy: "-180px", name: "Фильтр под мойку", group: 3},
                    {id: 2, x: '240px', y: '100px', bgx: '-250px', bgy: "-110px", name: "Магистральные фильтры", group: 1},
                    {id: 3, x: '240px', y: '120px', bgx: '-250px', bgy: "-120px", name: "Магистральные фильтры", group: 1},
                    {id: 4, x: '240px', y: '170px', bgx: '-250px', bgy: "-160px", name: "Фильтр для душа", group: 2},
                    {id: 5, x: '290px', y: '160px', bgx: '-290px', bgy: "-160px", name: "Фильтр для бытовой техники", group: 2}
                ]
            }else{
                return [
                    {id: 1, x: '100px',  y: '230px', bgx: '-240px', bgy: "-460px", name: "Фильтр под мойку", group: 3},
                    {id: 2, x: '175px', y: '265px', bgx: '-380px', bgy: "-560px", name: "Механический фильтр", group: 1},
                    {id: 3, x: '200px', y: '253px', bgx: '-430px', bgy: "-520px", name: "Система для коттеджа", group: 1},
                    //{id: 4, x: '140px', y: '170px', bgx: '-270px', bgy: "-380px", name: "Фильтр для душа", group: 2},
                    //{id: 5, x: '200px', y: '145px', bgx: '-420px', bgy: "-320px", name: "Фильтр для бытовой техники", group: 2},   
                ]
            }
        },
    },
    methods: {
        zoomIn(point) {
            this.$store.commit('mapPoint', point.id);
            this.backgroundPosition = `${point.bgx} ${point.bgy}`;
            this.active = true
        },
        zoomOut() {
            this.$store.commit('mapPoint', null);
            this.backgroundPosition = '0 0'
            this.active = false
        }
    }
}
</script>

<style lang="scss">
.pic1 {
    background: url('../../assets/flatbig.jpg') no-repeat;
    &.active {
        background-size: 200% auto;
    }
}
.pic2 {
    background: url('../../assets/home.jpg') no-repeat;
    &.active {
        background-size: 300% auto;
    }
}
.map {
    position: sticky;
    top: 0;
    text-align: center;
    background-size: 100% auto;
    background-position: 50% 50%;
    transition: all .25s ease-in;
    width: 364px; 

    img {
        max-width: 100%;
        height: auto;
        visibility: hidden;
    }

    // &:hover {
    //     background-size: 200% auto;
    //     img {
    //         opacity: 0;
    //     }
    // }

    &__point {
        display: block;
        position: absolute;
        width: 18px;
        height: 18px;
        background: #24BBF6;
        border: 2px solid #FFFFFF;
        border-radius: 100%;
        z-index: 200;
        cursor: pointer;
        transition: opacity .1s, transform .25s;
    }

    &.active {
        img {
            opacity: 0;
        }
        .map__point {
            opacity: 0;
            
            &:hover, &.active {
                opacity: 1;
                transform: scale(2,2);
            }
        }
    }

    &__desc {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 229px;
        //height: 81px;
        height: auto;
        padding: 16px;
        font-size: 15x;
        line-height: 16px;
        color: #000;
        background-color: #FFFFFF;
        opacity: 0;
        transition: opacity .25s;
        &>div {
            color: #666;
        }
    }

     &.active {
        .map__desc {
            opacity: 1;
        }
     }
}

</style>