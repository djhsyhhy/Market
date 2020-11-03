<template>
  <div id="center" :probeType='3' :pullUpLoad='true'>
    <div class="menu-list">
      <div
        class="menu-list-item"
        :class="{ active: index === currentIndex }"
        v-for="(item, index) in categories"
        :key="index"
        @click="itemClick(index)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  components: {
    Scroll
  },
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("selectClick", index);
    },
  },
};
</script>

<style scoped>
#center {
 overflow: auto;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  width: 100px;
  height: 100%;
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.menu-list-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>