<template>
<div id="home">
  <nav-bar>
    <div slot="center" class="home-nav">购物街</div>
  </nav-bar>
  <tab-control :title="['主流', '时尚', '买卖']" @tabClick="tabClick" v-show="isFixed" :class="{ fixed: isFixed }" ref="tabControl1"></tab-control>
  <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
    <home-swiper :banners="banners" @homeImageLoad="homeImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view />
    <tab-control :title="['主流', '时尚', '买卖']" @tabClick="tabClick" ref="tabControl2"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </scroll>
  <back-top @click.native="backClick" v-show="isShow"></back-top>
</div>
</template>

<script>
import {
  getHomeMultidata,
  getHomeGoods
} from "network/home";
import {
  itemListenerMixin,
  backTopMixin
} from "common/mixin";
import {
  debounce
} from "common/utils";
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";

export default {
  name: "home",
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
      offsetTop: 0,
      isFixed: false,
      isScoollY: null,
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  computed: {
    showGoods() {
      // 计算显示某个商品
      return this.goods[this.currentType].list;
    },
  },

  activated() {
    // 跳转位置
    console.log("ok");

    this.$refs.scroll.scrollTo(0, this.isScoollY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 记录位置
    this.isScoollY = this.$refs.scroll.isScoollY();

    // this.$bus.$off('itemImgLoad', this.itemImgListener)
  },

  created() {
    // 获得网络数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  methods: {
    // 网络请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // 轮播图
        this.banners = res.data.banner.list;
        // 轮播图下的
        this.recommends = res.data.recommend.list;
      });
    },
    // 商品信息
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 调用 的时候解决刷新的问题
        this.$refs.scroll.finishPullUp();
      });
    },

    // 选择方法

    // 这个是选择位置
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

    // 返回顶部的按钮 这个使用了混入
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    //   // console.log("aa"); 
    // },
    // 滚动位置的监听
    contentScroll(optinon) {
      this.demo(optinon)
      this.isFixed = -optinon.y > this.offsetTop;
    },
    // 下拉加载更多的信息
    loadMore() {
      // console.log("123");
      this.getHomeGoods(this.currentType);
    },
    // 这个是吸顶的效果，这个地方是两个，一个上去了，另一个到位置的时候展示
    homeImageLoad() {
      this.offsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.$refs.tabControl2.$el);
    }, // 吸顶效果
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
