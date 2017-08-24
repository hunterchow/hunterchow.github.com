<template>
  <div class="box">
    <div class="goods">
      <div class="menu-wrapper" ref="left">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current': currentIndex===index}"
              @click="selectMenu(index,$event)">
          <span class="text border-1px"><span class="icon" v-show="item.type>0"
                                              :class="classMap[item.type]"></span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="right">
        <ul>
          <li v-for="(item,index) in goods" class="food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h1 class="name">{{food.name}}</h1>
                  <p class="desc" v-show="food.description">{{food.description}}</p>
                  <div class="extra">
                    <span class="sellCount">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <i>￥</i><span class="newPrice">{{food.price}}</span><span class="oldPrice"
                                                                              v-show="food.oldPrice"><i>￥</i>{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" @add="addFood"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"
                :select-foods="selectFoods" ref="clickPot"></shopcart>
    </div>
    <food :food="selectedFood" ref="food" @add="addFood"></food>
  </div>
</template>

<script>
  import shopcart from '../../components/shopcart/shopcart.vue';
  import BScroll from 'better-scroll';
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
  import food from '../../components/food/food.vue';
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: [],
        selectedFood: {}
      };
    },
    components: {
      shopcart,
      cartcontrol,
      food
    },
    computed: {
      currentIndex () {
        for (var i = 0; i < this.listHeight.length; i++) {
          var height1 = this.listHeight[i];
          var height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods () {
        var foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calcullateHeight();
          });
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      addFood (target) {
        this.$nextTick(() => {
          this.$refs.clickPot.drop(target);
        });
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.left, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.right, {
          probeType: 3,
          click: true
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calcullateHeight () {
        var foodList = this.$refs.right.getElementsByClassName('food-list-hook');
        var height = 0;
        this.listHeight.push(height);
        for (var i = 0; i < foodList.length; i++) {
          var item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu (idx, e) {
        if (!e._constructed) {
          return;
        }
        var foodList = this.$refs.right.getElementsByClassName('food-list-hook');
        var el = foodList[idx];
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFood (food, e) {
        if (!e._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheeet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 180px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      height: 100%
      background: #f3f5f7
      .menu-item
        display: table
        width: 56px
        height: 54px
        padding: 0 12px
        line-height: 14px
        &.current
          width: 54px
          position: relative
          z-index: 10
          background: #fff
          font-weight: 700
          border-left: 2px solid #00a0dc
          .text
            border-bottom: none
            transform :translate(-2px,0)
        .icon
          display: inline-block
          width: 12px
          height: 12px
          margin-right: 2px
          vertical-align: top
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.special
            bg-image('special_3')
          &.invoice
            bg-image('invoice_3')
          &.guarantee
            bg-image('guarantee_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          font-weight: 200
          line-height: 14px
          color: rgb(77, 85, 93)
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex: 1
      font-size: 0
      .title
        width: 100%
        height: 28px
        line-height: 26px
        background-color: #f3f5f7
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border: none
          padding-bottom: 0
        .icon
          flex: 0 0 57px
          width: 57px
          height: 57px
          margin-right: 10px
          vertical-align: top
          img
            width: 100%
            height: 100%
            border-radius: 4px
        .content
          flex: 1
          .name
            margin-top: 2px
            margin-bottom: 8px
            height: 14px
            line-height: 14px
            font-size: 14px
            font-weight: 500
            color: rgb(7, 17, 27)
          .desc
            width: 100%
            height: 10px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
            overflow: hidden
          .extra
            margin-top: 8px
            font-size: 10px
            color: rgb(147, 153, 159)
            .sellCount
              display: inline-block
              height: 10px
              margin-right: 12px
              line-height: 10px
          .price
            height: 24px
            font-size: 10px
            font-weight: 700
            color: rgb(147, 153, 159)
            line-height: 24px
            i
              font-style: normal
            .newPrice
              font-size: 14px
              color: rgb(240, 20, 20)
              margin-right: 8px
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 0
</style>
