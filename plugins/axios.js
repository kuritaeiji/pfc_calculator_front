export default ({ $axios, isDev, store }) => {
  $axios.onRequest((config) => {
    if (isDev) {
      console.log('onRequest', config)
    }
  })

  $axios.onResponse((response) => {
    if (isDev) {
      console.log('onResponse', response)
    }
  })

  $axios.onError((error) => {
    if (error.response.status === 400) {
      store.dispatch('validation/setValidation', error.response.data)
    }

    if (isDev) {
      console.log('onError', error)
    }
  })
}
