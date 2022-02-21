<script>
export default {
  layout ({ $auth }) {
    return $auth.loggedIn ? 'default' : 'toppage'
  }
}
</script>
