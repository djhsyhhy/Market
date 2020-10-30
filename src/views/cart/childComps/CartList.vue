<template>
<div class="cart-list">
  <cart-list-item v-for="(item, index) in cartList" :key="index" :itemInfo='item'></cart-list-item>
</div>
</template>

<script>
import CartListItem from "./CartListItem";
export default {
  components: {
    CartListItem,
  },
  props: {
    cartList: {
      type: Array,
      default () {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
</style>
