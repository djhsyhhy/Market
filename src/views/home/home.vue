<template>
<div id="home" class="">
  <nav-bar>
    <div slot="center" class="home-nav">购物街</div>
  </nav-bar>
  <home-swiper :banners='banners'></home-swiper>
  <recommend-view :recommends='recommends'></recommend-view>
  <feature-view />
  <tab-control :title="['主流','时尚','买卖']"></tab-control>
  <goods-list :goods='goods.pop.list'></goods-list>

</div>
</template>

<script>
import {
  getHomeMultidata,
  getHomeGoods
} from "network/home";
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
export default {
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {
          page: 0,
          list: []
        },
        'new': {
          page: 0,
          list: []
        },
        'sell': {
          page: 0,
          list: []
        }
      }
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList
  },
  computed: {},
  created() {
    console.log("qwe");
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    }
  },
};
</script>

<style>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

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
