<template>
<div id="home" class="">
  <nav-bar>
    <div slot="center" class="home-nav">购物街</div>
  </nav-bar>
  <home-swiper :banners='banners'></home-swiper>
  <recommend-view :recommends='recommends'></recommend-view>
</div>
</template>

<script>
import {
  getHomeMultidata
} from "network/home";
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView'
export default {
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  methods: {},
  computed: {},
  created() {
    console.log("qwe");
    getHomeMultidata().then((res) => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
</style>
