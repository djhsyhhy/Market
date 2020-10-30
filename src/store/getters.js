export default {

  cartLength(state) {
    console.log('1')
   return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  }
}