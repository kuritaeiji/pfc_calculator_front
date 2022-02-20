export default {
  data () {
    return {
      title: this.$utils.translateTitle(this.$route.name)
    }
  },
  head () {
    return {
      title: this.title
    }
  }
}
