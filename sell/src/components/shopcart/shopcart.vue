<template>
  <div class="box">
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleList">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':foodCount>0}">
              <span class="icon-shopping_cart" :class="{'highlight':foodCount>0}"></span>
            </div>
            <div class="foodCount" v-show="foodCount>0">{{foodCount}}</div>
          </div>
          <div class="total" :class="{'highlight':foodCount>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay" :class="{'gopay':minPrice<=totalPrice}">
          <span class="min-pay" :class="{'gopay':minPrice<=totalPrice}">{{payDesc}}</span>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" v-on:before-enter="beforeEnter" v-on:enter="dropping" v-on:after-enter="afterEnter">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="listHeader">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="listContent" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="listRight">
                  <span class="price"><span class="yuan">￥</span>{{food.price * food.count}}</span>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
  export default {
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    components: {
      cartcontrol
    },
    data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true
      };
    },
    computed: {
      totalPrice () {
        var total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      foodCount () {
        var count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}起送`;
        } else if (this.totalPrice < this.minPrice) {
          var diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      listShow () {
        if (!this.foodCount) {
          this.fold = true;
          return false;
        }
        var show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      drop (el) {
        for (var i = 0; i < this.balls.length; i++) {
          var ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter (el) {
        var count = this.balls.length;
        while (count--) {
          var ball = this.balls[count];
          if (ball.show) {
            var rect = ball.el.getBoundingClientRect();
            var x = rect.left - 32;
            var y = -(window.innerHeight - rect.top - 22);
            el.style.display = ' ';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            var inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping (el, done) {
        /* eslint-disabled no-unused-vars */
        var rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          var inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterEnter (el) {
        var ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleList () {
        if (!this.foodCount) {
          return;
        } else {
          this.fold = !this.fold;
        }
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideList () {
        this.fold = true;
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return;
        } else {
          alert(`支付${this.totalPrice}元`);
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheeet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 50
    .content
      display: flex
      background: #141d27
      .content-left
        flex: 1
        font-size: 0
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          vertical-align: top
          width: 56px
          height: 56px
          margin: 0 12px
          padding: 6px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background-color: rgba(255, 255, 255, 0.2)
            text-align: center
            &.highlight
              background-color: rgb(0, 160, 220)
            .icon-shopping_cart
              font-size: 24px
              height: 24px
              line-height: 44px
              color: rgba(255, 255, 255, 0.4)
              &.highlight
                color: #fff
          .foodCount
            position: absolute
            left: 32px
            top: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            -webkit-border-radius: 16px
            -moz-border-radius: 16px
            border-radius: 16px
            background-color: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
            font-size: 9px
            font-weight: 700
            color: #fff
        .total
          display: inline-block
          margin: 12px 0
          padding-right: 12px
          font-size: 16px
          font-weight: 700
          color: rgba(255, 255, 255, 0.4)
          line-height: 24px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          &.highlight
            color: #fff
        .desc
          display: inline-block
          margin: 12px
          font-size: 14px
          font-weight: 200
          line-height: 24px
          color: rgba(255, 255, 255, 0.4)
      .content-right
        flex: 0 0 105px
        width: 105px
        .min-pay
          display: inline-block
          width: 100%
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          color: rgba(255, 255, 255, 0.4)
          background-color: rgba(255, 255, 255, 0.2)
          &.gopay
            background-color: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.21)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background-color: rgb(0, 160, 220)
          transition: all .4s linear
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      &.fold-enter, &.fold-leave-active
        transition: all .4s linear
        transform: translate3d(0, 0, 0)
      &.fold-enter-active, &.fold-leave
        transition: all .4s linear
      transform: translate3d(0, -100%, 0)
      .listHeader
        width: 100%
        height: 40px
        border-1px(rgba(7, 17, 27, 0.1))
        background-color: #f3f5f7
        .title
          display: inline-block
          height: 100%
          margin-left: 18px
          line-height: 40px
          font-size: 14px
          font-weight: 200
          color: rgb(7, 17, 27)
        .empty
          display: inline-block
          float: right
          height: 100%
          margin-right: 18px
          line-height: 40px
          font-size: 12px
          color: rgb(0, 160, 220)
      .listContent
        width: 100%
        overflow: hidden
        padding-bottom: 24px
        background-color: #fff
        max-height: 217px
        .food
          position: relative
          margin: 0 18px
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
            .yuan
              font-size: 10px
              font-weight: normal
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    background: rgba(7, 17, 27, 0.6)
    backdrop-filter: blur(10px)
    -webkit-filter: blur(10px)
    filter: blur(10px)
    &.fade-enter, &.fade-leave-active
      opacity: 0
      transition: all .4s
    &.fade-enter-active, &.fade-leave
      opacity: 1
      transition: all .4s
</style>
