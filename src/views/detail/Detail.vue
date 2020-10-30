<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @itemClick="itemTabClick" ref="nav"></detail-nav-bar>

  <scroll class="content" :probe-type="3" :pull-up-load="true" ref="scroll" @scroll="contentScroll">
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
    <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
    <goods-list :goods="recommends" ref="recommed"></goods-list>
  </scroll>
  <detail-bottom-bar @addToCart='addToCart'></detail-bottom-bar>
  <back-top @click.native="backClick" v-show="isShow"></back-top>
</div>
</template>

<script>
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommenda
} from 'network/detail'
import {
  itemListenerMixin,
  backTopMixin
} from 'common/mixin'
import {
  debounce
} from 'common/utils'
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from '../../components/content/goods/GoodsList'
import DetailBottomBar from './childComps/DetailBottomBar'

//vuex
// import {mapActions} from "vuex"

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      curryIndex: 0
    }
  },
  created() {
    // 保留iid
    this.iid = this.$route.params.iid

    // 获取数据
    getDetail(this.iid).then((res) => {
      const data = res.result
      console.log(data)
      // 轮播图数据
      this.topImages = data.itemInfo.topImages
      // 商品数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )
      // 商家信息
      this.shop = new Shop(data.shopInfo)
      // 商品信息
      this.detailInfo = data.detailInfo
      // 商品详情
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 推荐
    getRecommenda().then((res) => {
      this.recommends = res.data.list
    })

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommed.$el.offsetTop - 44)
    })
  },
  methods: {
    // ...mapActions(['addCart']),
    imageLoad() {
      // //这个地方加完滚动之后在起作用 等到完成之后最后再加上
      this.newRefresh()
      this.getThemeTopY()
    },
    itemTabClick(index) {
      console.log(this.themeTopYs)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
    },
    contentScroll(postion) {
      // const y = -postion.y
      // console.log(this.themeTopYs)
      // for (let i = 1; i < this.themeTopYs.length; i++) {
      //   if (y < this.themeTopYs[i]) {
      //     this.curryIndex = i - 1
      //     console.log(y)
      //   } else if (y < this.themeTopYs[i]) {
      //     this.curryIndex = i - 1
      //     // console.log(y)
      //   } else if (y < this.themeTopYs[i]) {
      //     this.curryIndex = i - 1
      //     // console.log(y)
      //   }
      // }
      // this.$refs.nav.currentIndex = this.curryIndex
      const positionY = -postion.y

      const length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
        //
        // }
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      if (positionY >= this.themeTopYs[this.themeTopYs.length - 1]) {
        this.currentIndex = 3
        this.$refs.nav.currentIndex = this.currentIndex
      }

      // 回到顶部的代码
      this.demo(postion)
    },

    addToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      this.$store.dispatch('addCarLish', product)
    }

  },

  mixins: [itemListenerMixin,
    backTopMixin
  ],
  mounted() {},
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 58px);
}
</style>
