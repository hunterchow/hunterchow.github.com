<template>
  <div class="ratings" ref="content">
    <div class="content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore" class="star"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">食品质量</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">送达时间</span>
            <span class="score">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc"
                    :ratings="ratings" @select="ratingtypeChange"
                    @toggleContent="onlyContentChange"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px">
            <div class="avatar">
              <img :src="rating.avatar" alt="" width="28" height="28">
            </div>
            <div class="time">
              {{rating.rateTime | formatDate}}
            </div>
            <div class="rating-content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score" class="star"></star>
                <span class="deliveryTime"
                      v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend">
                <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
                <span v-for="item in rating.recommend" class="recommend-item">{{item}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import split from '../../components/split/split.vue';
  import star from '../../components/star/star.vue';
  import ratingselect from '../../components/ratingselect/ratingselect.vue';
  import { formatDate } from '../../common/js/date.js';
  const ALL = 2;
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        showFood: false,
        selectType: ALL,
        onlyContent: true,
        ratings: [],
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      };
    },
    filters: {
      formatDate (time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.content, {
              click: true
            });
          });
        }
      });
    },
    components: {
      split,
      star,
      ratingselect
    },
    methods: {
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
  .ratings
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .content
      .overview
        display: flex
        margin-top: 18px
        .overview-left
          flex: 0 0 137px
          width: 137px
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          @media only screen and (max-width: 320px)
            flex: 0 0 120px
            width: 120px
          .score
            font-size: 24px
            color: rgb(255, 153, 0)
            line-height: 28px
          .title
            margin-top: 6px
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 12px
          .rankRate
            margin: 8px 0 6px 0
            font-size: 10px
            color: rgba(7, 17, 27, 0.5)
        .overview-right
          flex: 1
          padding: 0 24px
          @media only screen and (max-width: 320px)
            padding: 0 4px
          .score-wrapper
            margin-bottom: 8px
            line-height: 18px
            font-size: 0
            &:last-child
              margin-bottom: 0
            .title
              display: inline-block
              margin-right: 12px
              vertical-align: top
              font-size: 12px
              color: rgb(7, 17, 27)
            .star
              display: inline-block
              margin-right: 12px
              height: 18px
              vertical-align: top
            .score
              display: inline-block
              font-size: 12px
              color: rgb(255, 153, 0)
              &:last-child
                color: rgb(147, 153, 159)
      .rating-wrapper
        margin: 0 18px
        .rating-item
          position: relative
          display: flex
          padding: 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .avatar
            flex: 0 0 28px
            margin-right: 12px
            width: 28px
            img
              border-radius: 50%
          .time
            position: absolute
            top: 18px
            right: 0
            font-size: 10px
            font-weight: 200
            color: rgb(147, 153, 159)
            line-height: 12px
          .rating-content
            flex: 1
            .name
              font-size: 10px
              color: rgb(7, 17, 27)
              line-height: 12px
            .star-wrapper
              padding: 4px 0 6px 0
              .star
                display: inline-block
                margin-right: 6px
                vertical-align: top
              .deliveryTime
                display: inline-block
                vertical-align: top
                font-size: 10px
                font-weight: 200
                color: rgb(147, 153, 159)
                line-height: 12px
            .text
              margin-bottom: 8px
              font-size: 12px
              color: rgb(7, 17, 27)
              line-height: 18px
            .recommend
              line-height: 16px
              font-size: 0
              .icon-thumb_up, .icon-thumb_down
                font-size: 12px
                color: rgb(0, 160, 220)
              .icon-thumb_down
                color: rgb(183, 187, 191)
              .recommend-item
                display: inline-block
                margin-right: 8px
                padding: 0 6px
                border-radius: 1px
                border: 1px solid rgba(7, 17, 27, 0.1)
                background-color: rgb(255, 255, 255)
                font-size: 9px
                color: rgb(147, 153, 159)
                line-height: 16px
</style>
