<template>
  <div class="ratingselect">
    <div class="select-type border-1px">
      <span @click="select(2,$event)" class="block all" :class="{'active':selectType===2}">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>
    </div>
    <div class="only-content" :class="{'on':onlyContent}" @click="toggle">
      <span class="icon-check_circle"></span><span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return;
        }
        // this.selectType = type;
        this.$emit('select', type);
      },
      toggle (event) {
        if (!event._constructed) {
          return;
        }
        // this.onlyContent = !this.onlyContent;
        this.$emit('toggleContent');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheeet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    .select-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        border-radius: 1px
        line-height: 16px
        font-size: 12px
        color: rgb(77, 85, 93)
        .count
          margin-left: 2px
          font-size: 8px
        &.active
          color: #fff
        &.positive, &.all
          background-color: rgba(0, 160, 220, 0.2)
          &.active
            background-color: rgb(0, 160, 220)
        &.negative
          background-color: rgba(77, 85, 93, 0.2)
          &.active
            background-color: rgb(77, 85, 93)
    .only-content
      padding: 12px 18px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      font-size: 0
      color: rgb(147, 153, 159)
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 2px
        line-height: 48px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
        line-height: 48px
</style>
