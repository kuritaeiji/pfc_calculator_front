export default ({ store }) => {
  store.dispatch('snackbar/plusPageCount')
  const snackbar = store.getters['snackbar/snackbar']
  if (snackbar.pageCount >= 2) {
    store.dispatch('snackbar/resetSnackbar')
  }
}
