<template>
<div id="detail">
  <detail-nav-bar class="detail-nav"></detail-nav-bar>
  <scroll class="content" :probe-type="3" :pull-up-load="true" ref="scroll">
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
  </scroll>
</div>
</template>

<script>
import {
  getDetail,
  Goods,
  Shop
} from "network/detail";
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
    };
  },
  created() {
    //保留iid
    this.iid = this.$route.params.iid;

    //获取数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      //轮播图数据
      this.topImages = data.itemInfo.topImages;
      //商品数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //商家信息
      this.shop = new Shop(data.shopInfo);
    });
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
  },
};
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
