<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-card flat color="transparent" width="80%" max-width="400">
        <v-card-title class="justify-center font-weight-bold text-h5 greyText--text my-5">
          {{ title }}
        </v-card-title>

        <ui-validation />

        <v-form ref="form" v-model="isValid">
          <v-text-field
            v-model="params.user.email"
            outlined
            label="メールアドレス"
            placeholder="user@example.com"
            type="email"
            :rules="emailRules"
          />
          <v-text-field
            v-model="params.user.password"
            outlined
            label="パスワード"
            placeholder="8文字以上"
            type="password"
            :rules="passwordRules"
          />

          <v-card-text class="text-caption greyText--text pt-0">
            大文字英字、小文字英字、数字の3種類を含めて下さい。<br>
            半角英数字、ハイフン、アンダーバーが使えます。
          </v-card-text>

          <v-btn
            large
            block
            depressed
            color="btnPrimary"
            class="white--text font-weight-bold"
            :disabled="!isValid || isLoading"
            :loading="isLoading"
            @click="signup"
          >
            送信する
          </v-btn>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { presence, longer, shorter, email, password } from '@/validators'

export default {
  layout: 'beforeLoggedIn',
  data () {
    return {
      title: this.$utils.translateTitle(this.$route.name),
      isValid: false,
      isLoading: false,
      emailRules: [presence, email],
      passwordRules: [presence, longer(8), shorter(72), password],
      params: {
        user: {
          email: '',
          password: ''
        }
      }
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  methods: {
    ...mapActions('snackbar', ['setSnackbar']),
    async signup () {
      if (this.isValid) {
        this.isLoading = true
        try {
          await this.$axios.$post('/api/v1/signup', this.params)
          this.setSnackbar(this.$t('snackbar.signup'))
          this.$router.push('/')
        } catch (error) {
          this.isLoading = false
        }
      }
    }
  }
}
</script>
