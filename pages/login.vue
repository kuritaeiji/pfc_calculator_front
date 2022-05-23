<template>
  <before-logged-in-form v-bind.sync="params.auth" :is-loading="isLoading" @submit="login" />
</template>

<script>
import { mapActions } from 'vuex'
import pageTitle from '~/mixins/pageTitle'

export default {
  mixins: [pageTitle],
  layout: 'beforeLoggedIn',
  middleware: 'auth',
  auth: 'guest',
  data ({ $config: { testUser } }) {
    return {
      isLoading: false,
      params: {
        auth: {
          email: testUser.email,
          password: testUser.password
        }
      }
    }
  },
  methods: {
    ...mapActions('validation', ['setValidation']),
    async login () {
      this.isLoading = true
      try {
        await this.$auth.loginWith('local', { data: this.params })
      } catch (error) {
        this.reject(error)
      }
    },
    reject ({ response: { status } }) {
      if (status === 401) {
        this.setValidation([this.$t('validation.login.invalidEmailPassword')])
      }
      if (status === 403) {
        this.setValidation([this.$t('validation.login.notActivated')])
      }
      this.isLoading = false
    }
  }
}
</script>
