<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">分类首页</div></nav-bar>
    <div class="center">
      <tab-menu :categories="categories" @selectClick="selectClick" ></tab-menu>
      <div id="right" ref="scroll" :probeType='3' :pullUpLoad='true' :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory" />
          <tab-control
            :title="['综合', '新品', '销量']"
            @itemClick="tabClick(index)"
          />
          <goods-list :goods="showCategoryDetail" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabMenu from "./childComps/TabMenu";
import Scroll from "components/common/scroll/Scroll";
import TabContentCategory from "./childComps/TabContentCategory";

import TabControl from "components/content/tabControl/TabControl";

import GoodsList from "components/content/goods/GoodsList";
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
import { POP, SELL, NEW } from "common/const";

import { tabControlMixin } from "common/mixin";
export default {
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
    TabControl,
    GoodsList,
  },
  created() {
    this.getCategory();
    this.$bus.$on('imgLoad', () => {
		    this.$refs.scroll.refresh()
	    })
  },
  mixins: [tabControlMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
    };
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      console.log(this.categoryData[this.currentIndex].subcategories)
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  methods: {
    selectClick(index) {
      this.getSubcategories(index);
    },
    getCategory() {
      getCategory().then((res) => {
        this.categories = res.data.category.list;
        console.log(this.categories);
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': [],
            },
          };
        }
        this.getSubcategories(0);
      });
    },
    getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        console.log(res.data);
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this.getCategoryDetail(POP);
        this.getCategoryDetail(SELL);
        this.getCategoryDetail(NEW);
      });
    },
    getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: red;
  font-size: 15px;
}

.content {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  overflow: hidden
 
}

#right {
  height: 100%;
  width: calc(100% - 100px);
  float: right;
  overflow: auto;
}

</style>
