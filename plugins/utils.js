class Utils {
  constructor ({ app }) {
    this.app = app
  }

  translateTitle (routeName) {
    const path = routeName.replace(/-/g, '.')
    return this.app.i18n.t(`title.${path}`)
  }

  formatDate (date) {
    return this.app.$moment(date).format('YYYY-MM-DD')
  }
}

export default ({ app }, inject) => {
  inject('utils', new Utils({ app }))
}
