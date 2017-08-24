<template>
  <transition name="move">
    <div class="food" v-show="showFood" ref="foodContent">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="extra">
            <span class="sellCount">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <i>￥</i><span class="newPrice">{{food.price}}</span><span class="oldPrice"
                                                                      v-show="food.oldPrice"><i>￥</i>{{food.oldPrice}}</span>
          </div>
          <div class="join-cart" @click="addFood" v-show="!food.count || food.count === 0">加入购物车</div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" v-show="food.count>0"></cartcontrol>
          </div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <p class="foodInfo">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc"
                        :ratings="food.ratings" @select="ratingtypeChange"
                        @toggleContent="onlyContentChange"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-for="rating in food.ratings" class="rating-item border-1px"
                  v-show="needShow(rating.rateType,rating.text)">
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <div class="user">
                  <span class="username">{{rating.username}}</span><img :src="rating.avatar" alt="" width="12px"
                                                                        height="12px">
                </div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-ratings" v-show="!food.ratings || !food.ratings.length">暂无评论</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue';
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
  import ratingselect from '../../components/ratingselect/ratingselect.vue';
  import split from '../../components/split/split.vue';
  import BScroll from 'better-scroll';
  import {formatDate} from '../../common/js/date.js';
  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFood: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    filters: {
      formatDate (time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    computed: {},
    methods: {
      show () {
        this.showFood = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide () {
        this.showFood = false;
      },
      addFood (event) {
        this.$nextTick(() => {
          if (!event._constructed) {
            return;
          }
          Vue.set(this.food, 'count', 1);
        });
        this.$emit('add', event.target);
      },
      ratingtypeChange (type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      onlyContentChange () {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheeet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    z-index: 30
    background: #fff
    transition: all .2s linear
    &.move-enter, &.move-leave-to
      transform: translate3d(100%, 0, 0)
    &.move-enter-to, &.move-leave
      transform: translate3d(0, 0, 0)
    .food-content
      .image-header
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position: absolute
          top: 10px
          left: 0
          .icon-arrow_lift
            display: block
            padding: 10px
            font-size: 20px
            color: #fff
      .content
        position: relative
        padding: 18px 18px 0 18px
        .title
          height: 14px
          line-height: 14px
          font-size: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
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
          margin: 18px 0
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
        .join-cart
          position: absolute
          right: 18px
          bottom: 0
          width: 74px
          height: 24px
          line-height: 24px
          border-radius: 12px
          background-color: rgb(0, 160, 220)
          text-align: center
          font-size: 10px
          color: #fff
        .cartcontrol-wrapper
          position: absolute
          right: 18px
          bottom: 0
      .info
        margin: 0 18px
        .title
          height: 14px
          line-height: 14px
          font-size: 14px
          font-weight: 200
          color: rgb(7, 17, 27)
        .foodInfo
          padding: 6px 8px 0 8px
          font-size: 12px
          font-weight: 200
          line-height: 24px
          color: rgb(77, 85, 93)
      .rating
        .title
          margin-left: 18px
          height: 14px
          line-height: 14px
          font-size: 14px
          font-weight: 200
          color: rgb(7, 17, 27)
        .rating-wrapper
          position: relative
          padding: 0 18px
          .rating-item
            margin: 16px 0
            border-1px(rgba(7, 17, 27, 0.1))
            .time
              height: 12px
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
            .user
              position: absolute
              top: 0
              right: 0
              .username
                margin-right: 6px
                vertical-align: top
                height: 12px
                line-height: 12px
                font-size: 10px
                color: rgb(147, 153, 159)
              img
                vertical-align: top
                border-radius: 50%
            .text
              padding: 6px 0 16px 0
              font-size: 12px
              color: rgb(7, 17, 27)
              line-height: 16px
              span
                margin-right: 4px
                vertical-align: top
                font-size: 12px
                color: rgb(147, 153, 159)
                line-height: 16px
                &.icon-thumb_up
                  color: rgb(0, 160, 220)
          .no-ratings
            padding-bottom: 18px
            line-height: 16px
            font-size: 12px
            color: rgba(7, 17, 27, 0.5)
</style>
