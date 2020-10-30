<template>
<div class="goods">
  <goods-list-item v-for="item in goods" :key="item.id" :goodsItem='item'></goods-list-item>
</div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: rgb(245, 234, 234);
  padding: 2px;
}
</style>
