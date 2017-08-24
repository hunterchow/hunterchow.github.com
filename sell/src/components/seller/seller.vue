<template>
  <div class="seller" ref="sellerContent">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score" class="star"></star>
          <span class="ratingCount">({{seller.ratingCount}})</span>
          <span class="sellCount">月售{{seller.sellCount}}单</span>
        </div>
        <div class="like" @click="toggleLike">
          <span class="icon-favorite" :class="{'active':like}"></span>
          <div class="text">{{likeText}}</div>
        </div>
        <ul class="remark">
          <li class="item">
            <h1 class="title">起送价</h1>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="item">
            <h1 class="title">商家配送</h1>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="item">
            <h1 class="title">平均配送时间</h1>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="bulletin border-1px">
        <h1 class="title">公告与活动</h1>
        <p class="text">{{seller.bulletin}}</p>
      </div>
      <ul class="supports">
        <li v-for="support in seller.supports" class="supports-item border-1px">
          <span class="icon" :class="classMap[support.type]"></span>
          <span class="text">{{support.description}}</span>
        </li>
      </ul>
      <split></split>
      <div class="sellerPic">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrapper" ref="pics">
          <ul class="pics-list" ref="picsList">
            <li class="list-item" v-for="pic in seller.pics">
              <img :src="pic" alt="" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="infos">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="infos-item border-1px" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import star from '../../components/star/star.vue';
  import split from '../../components/split/split.vue';
  import { saveToLocal, loadFromLocal } from '../../common/js/webStorage.js';
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        like: (() => {
          return loadFromLocal(this.seller.id, 'like', false);
        })()
      };
    },
    computed: {
      likeText () {
        return this.like ? '已收藏' : '收藏';
      }
    },
    components: {
      star,
      split
    },
    ready () {
      this._initScroll();
      this._initPics();
    },
    watch: {
      'seller' () {
        this._initScroll();
        this._initPics();
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      _initScroll () {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.sellerContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      _initPics () {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picsList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.pics, {
                click: true,
                scrollX: true,
                eventPassThrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      toggleLike (event) {
        if (!event._constructed) {
          return;
        }
        this.like = !this.like;
        saveToLocal(this.seller.id, 'like', this.like);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheeet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .overview
      position: relative
      padding: 18px 18px 0
      .title
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
      .desc
        height: 18px
        padding: 8px 8px 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .star
          display: inline-block
          vertical-align: top
        span
          margin-right: 12px
          font-size: 10px
          color: rgb(77, 85, 93)
          line-height: 18px
      .like
        position: absolute
        top: 18px
        right: 18px
        width: 36px
        text-align: center
        .icon-favorite
          font-size: 24px
          color: #d4d6d9
          line-height: 24px
          &.active
            color: rgb(240, 20, 20)
        .text
          margin-top: 4px
          font-size: 10px
          color: rgb(77, 85, 93)
          line-height: 10px
      .remark
        display: flex
        padding-top: 18px
        .item
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          .title
            margin-bottom: 4px
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
          .content
            font-size: 10px
            font-weight: 200
            color: rgb(7, 17, 27)
            line-height: 24px
            .stress
              font-size: 24px

    .bulletin
      margin: 0 12px
      border-1px(rgba(7, 17, 27, 0.1))
      .title
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
      .text
        padding: 8px 0 16px 12px
        font-size: 12px
        font-weight: 200
        color: rgb(240, 20, 20)
        line-height: 24px
    .supports
      margin-bottom: 2px
      padding: 0 12px
      font-size: 0
      .supports-item
        padding: 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .icon
          display: inline-block
          width: 16px
          height: 16px
          margin-right: 6px
          vertical-align: top
          background-size: 16px 16px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.special
            bg-image('special_4')
          &.invoice
            bg-image('invoice_4')
          &.guarantee
            bg-image('guarantee_4')
        .text
          vertical-align: top
          font-size: 12px
          font-weight: 200
          line-height: 16px
    .sellerPic
      padding-left: 18px
      .title
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
      .pics-wrapper
        margin-top: 12px
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pics-list
          font-size: 0
          .list-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin-right: 0
    .infos
      padding: 0 18px
      color: rgb(7, 17, 27)
      .title
        padding-bottom: 12px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 14px
        line-height: 14px
      .infos-item
        padding: 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
        font-weight: 200
        line-height: 16px
        &:last-child
          border: none
</style>
