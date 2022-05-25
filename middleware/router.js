export default ({ store, $auth, route }) => {
  if ($auth.loggedIn && route.name === 'index') {
    // loginしている時のindexページはリダイレクトさせるだけなのでpageCountを増やさない
    return
  }

  store.dispatch('snackbar/plusPageCount')
  const snackbar = store.getters['snackbar/snackbar']
  if (snackbar.pageCount >= 2) {
    store.dispatch('snackbar/resetSnackbar')
  }
}
