<template>
  <div id="home">
    <nav-bar>
      <div slot="center" class="home-nav">购物街</div>
    </nav-bar>
    <tab-control
      :title="['主流', '时尚', '买卖']"
      @tabClick="tabClick"
      v-show="isFixed"
      :class="{ fixed: isFixed }"
      ref="tabControl1"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @homeImageLoad="homeImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control
        :title="['主流', '时尚', '买卖']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

export default {
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
      },
      currentType: "pop",
      isShow: false,
      offsetTop: 0,
      isFixed: false,
      isScoollY: 0,
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  destroyed() {
    console.log("111");
  },
  activated() {
    console.log("1");
    this.$refs.scroll.scrollTo(0, this.isScoollY, 0);
  },
  deactivated() {
    console.log("11");
    this.isScoollY = this.$refs.scroll.isScoollY();
  },

  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("imageOnload", () => {
      refresh();
    });
  },
  methods: {
    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },

    //选择方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.itemIndex = index;
      this.$refs.tabControl2.itemIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
      // console.log("aa");
    }, //回到顶部
    contentScroll(optinon) {
      this.isShow = -optinon.y > 1000;
      this.isFixed = -optinon.y > this.offsetTop;
    }, //滚动位置的监听
    loadMore() {
      // console.log("123");
      this.getHomeGoods(this.currentType);
    }, //加载更多
    homeImageLoad() {
      this.offsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.$refs.tabControl2.$el);
    }, //吸顶效果
  },
};
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
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

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.fixed {
  position: relative;
  z-index: 9;
}
</style>
