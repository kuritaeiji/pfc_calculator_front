export default async ({ $axios, query, store, app, redirect }) => {
  try {
    await $axios.$put('/api/v1/activate', { token: query.token })
    store.dispatch('snackbar/setSnackbar', { message: app.i18n.t('snackbar.activatedAccount') })
    redirect('/login')
  } catch (error) {
    const status = error.response.status
    if (status === 401) {
      store.dispatch('snackbar/setSnackbar', { message: app.i18n.t('snackbar.expiredActivate'), color: 'error' })
    }
    if (status === 409) {
      store.dispatch('snackbar/setSnackbar', { message: app.i18n.t('snackbar.dublicateActivate'), color: 'error' })
    }
    redirect('/')
  }
}
