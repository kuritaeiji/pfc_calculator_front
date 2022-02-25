export default ({ $axios, isDev }) => {
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
    if (isDev) {
      console.log('onError', error)
    }
  })
}
