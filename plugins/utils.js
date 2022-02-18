class Utils {
  constructor ({ app }) {
    this.app = app
  }

  translateTitle (routeName) {
    const path = routeName.replace(/-/g, '.')
    return this.app.i18n.t(`title.${path}`)
  }
}

export default ({ app }, inject) => {
  inject('utils', new Utils({ app }))
}
