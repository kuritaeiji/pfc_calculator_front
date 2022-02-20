<template>
  <before-logged-in-form v-bind.sync="params.auth" :is-loading="isLoading" @submit="login" />
</template>

<script>
import pageTitle from '~/mixins/pageTitle'

export default {
  mixins: [pageTitle],
  layout: 'beforeLoggedIn',
  data () {
    return {
      isLoading: false,
      params: {
        auth: {
          email: '',
          password: ''
        }
      }
    }
  },
  methods: {
    login () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>
