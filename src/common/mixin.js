import { debounce } from './utils'
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted () {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('imageOnload', this.itemImgListener)
  }
}

export const backTopMixin = {

  components: {
    BackTop
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    backClick () {
      this.$refs.scroll.scrollTo(0, 0, 500)
      // console.log("aa");
    },
    demo (optinon) {
      this.isShow = -optinon.y > 1000
      // z这个1000可以进行传递
    }
  }

}
