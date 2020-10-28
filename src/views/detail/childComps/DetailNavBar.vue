<template>
<div>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" />
    </div>

    <div slot="center" class="title">
      <div v-for="(item, index) in titles" :key="index" class="title-item" :class="{active: index == currentIndex}" @click="titleClick(index)">
        {{ item }}
      </div>
    </div>
  </nav-bar>
</div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  data() {
    return {
      titles: ["商品", "详情", "价格", "评价"],
      currentIndex: 0
    };
  },
  methods: {
    backClick() {
      this.$router.go(-1);
    },
    titleClick(index) {
      this.currentIndex = index
    }
  },
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 12px;
}

.title-item {
  flex: 1;
}

.active {
  color: red;
}

.back {
  margin-top: 7px;
}
</style>
