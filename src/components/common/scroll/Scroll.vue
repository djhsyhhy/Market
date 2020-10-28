<template>
<div class="warpper" ref="warpper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
BScroll.use(Pullup);
export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      deault: false,
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.warpper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    this.scroll.on("scroll", (option) => {
      this.$emit("scroll", option);
    });
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    isScoollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
};
</script>

<style scoped>

</style>
