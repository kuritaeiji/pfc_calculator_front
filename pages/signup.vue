<template>
  <before-logged-in-form v-bind.sync="params.user" :is-loading="isLoading" @submit="signup" />
</template>

<script>
import { mapActions } from 'vuex'
import pageTitle from '~/mixins/pageTitle'

export default {
  mixins: [pageTitle],
  layout: 'beforeLoggedIn',
  middleware: 'auth',
  auth: 'guest',
  data () {
    return {
      isLoading: false,
      params: {
        user: {
          email: '',
          password: ''
        }
      }
    }
  },
  methods: {
    ...mapActions('snackbar', ['setSnackbar']),
    async signup () {
      this.isLoading = true
      try {
        await this.$axios.$post('/api/v1/signup', this.params)
        this.setSnackbar({ message: this.$t('snackbar.signup') })
        this.$router.push('/')
      } catch (error) {
        this.$utils.formErrorWithValidation(error)
        this.isLoading = false
      }
    }
  }
}
</script>
