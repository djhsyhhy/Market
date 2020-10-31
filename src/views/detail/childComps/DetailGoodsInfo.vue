<template>
<div v-if="Object.keys(detailInfo).length !==0" class="goods-info">
  <div class="goods-desc clear-fix">
    <div class="start"></div>
    <div class="desc">{{detailInfo.desc}}</div>
    <div class="end"></div>
  </div>
  <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
  <div class="info-list">
    <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" v-lazy="item" @load="imgLoad" alt="">
  </div>
</div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad () {
      // 判断，所有图片都加载完了，进行一次回调
      // this.counter += 1
      // if (this.counter === this.imagesLength){
      //   this.$emit('imageLoad');
      // }
      if (++this.counter === this.imagesLength) {
        this.$emit('imageLoad')
      }
    }
  },
  watch: {
    detailInfo () {
      // 获取图片个数 这个地方是为了防止datilinfo为空的情况

      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
.goods-info {
  background-color: #f6f6f6
}

.info-list img {
  width: 98%;
}

.desc {
  padding: 10px;
}

.info-key {
  text-align: center;
  color: aquamarine;
}
</style>
