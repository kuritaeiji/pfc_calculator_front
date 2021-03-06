class Utils {
  constructor ({ app, error, store }) {
    this.app = app
    this.error = error
    this.store = store
  }

  translateTitle (routeName) {
    const path = routeName.replace(/-/g, '.')
    return this.app.i18n.t(`title.${path}`)
  }

  get today () {
    return this.formatDate(new Date())
  }

  get thisMonth () {
    return this.formatMonth(new Date())
  }

  formatDate (date) {
    return this.app.$moment(date).format('YYYY-MM-DD')
  }

  formatDateJp (date) {
    return this.app.$moment(date).format('M月D日')
  }

  formatMonth (date) {
    return this.app.$moment(date).format('YYYY-MM')
  }

  formErrorWithValidation (error) {
    if (error.response.status === 400) {
      this.store.dispatch('validation/setValidation', error.response.data)
    }

    if (error.response.status !== 400) {
      this.error({ statusCode: error.response.status, message: error.response.statusText })
    }
  }
}

export default ({ app, error, store }, inject) => {
  inject('utils', new Utils({ app, error, store }))
}
