export default async ({ $axios, query, store, app, redirect }) => {
  try {
    await $axios.$put('/api/v1/activate', { token: query.token })
  } catch (error) {
    const status = error.response.status
    if (status === 401) {
      store.dispatch('snackbar/setSnackbar', app.i18n.t('snackbar.expiredActivate'))
    }
    if (status === 409) {
      store.dispatch('snackbar/setSnackbar', app.i18n.t('snackbar.dublicateActivate'))
    }
    redirect('/')
  }
  // ログインさせる
}
