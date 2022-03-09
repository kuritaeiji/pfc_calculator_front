<script>
export default {
  layout ({ $auth }) {
    return $auth.loggedIn ? 'default' : 'toppage'
  },
  middleware ({ $auth, redirect, app }) {
    if (!$auth.loggedIn) {
      return null
    }

    redirect({ name: 'days-date', params: { date: app.$utils.today } })
  }
}
</script>
