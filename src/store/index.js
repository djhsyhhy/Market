import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: { // 这个暂时不用，就不抽了
  },
  getters
})
export default store
