<template>
<swiper class="detail-swiper">
  <swiper-item v-for="item in topImages" :key="item">
    <img :src="item" />
  </swiper-item>

</swiper>
</template>

<script>
import {
  Swiper,
  SwiperItem
} from 'components/common/swiper/index'
export default {
  props: {
    topImages: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },

}
</script>

<style scoped>
.detail-swiper {
  overflow: hidden;
  height: 300px;
}
</style>
