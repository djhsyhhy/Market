import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default  {
  addCarLish(context,payload) {
   return new Promise((res, rej) => {
     console.log('as', context.state.cartLish)
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //判断oldProduct
      if (oldProduct) {
        //oldProduct.count += 1
        context.commit(ADD_COUNTER,oldProduct)
        res('添加成功+1')
      }else {
        payload.count = 1
        //context.state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
          res('添加成功了')
      
      }
   })
      //查询之前数组中是否有该商品
      
   
    //payload新添加的商品
    //1.
    // let oldProduct = null;
    // for(let item of state.cartList){
    //   if (item.iid === payload.iid){
    //     oldProduct = item
    //   }
    // }
  }
}
