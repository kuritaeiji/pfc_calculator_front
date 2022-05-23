<template>
  <v-container>
    <v-row justify="center">
      <v-card flat color="transparent" width="80%" max-width="400">
        <v-card-title class="justify-center font-weight-bold text-h5 greyText--text my-5">
          {{ title }}
        </v-card-title>

        <ui-validation />

        <v-form v-model="isValid">
          <v-text-field
            v-model="setEmail"
            outlined
            label="メールアドレス"
            type="email"
            :placeholder="form.email.placeholder"
            :rules="form.email.rules"
          />
          <v-text-field
            v-model="setPassword"
            outlined
            label="パスワード"
            type="password"
            :placeholder="form.password.placeholder"
            :rules="form.password.rules"
          />

          <v-card-text v-if="isSignup" class="text-caption greyText--text pt-0">
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
            @click="submit"
          >
            送信する
          </v-btn>

          <v-card
            flat
            color="white"
            class="mt-5"
          >
            <v-card-title class="py-1">
              テストユーザー
            </v-card-title>

            <v-card-text>
              メールアドレス: user@example.com<br>
              パスワード: Password1010
            </v-card-text>
          </v-card>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import pageTitle from '~/mixins/pageTitle'
import { presence, longer, shorter, email, password } from '~/validators'

export default {
  mixins: [pageTitle],
  props: {
    email: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isValid: false
    }
  },
  computed: {
    isSignup () {
      return this.title === this.$t('title.signup')
    },
    form () {
      if (this.isSignup) {
        return {
          email: {
            placeholder: 'user@example.com',
            rules: [presence, email]
          },
          password: {
            placeholder: '8文字以上',
            rules: [presence, longer(8), shorter(72), password]
          }
        }
      }
      return {
        email: {
          placeholder: undefined,
          rules: [presence]
        },
        password: {
          placeholder: undefined,
          rules: [presence]
        }
      }
    },
    setEmail: {
      get () {
        return this.email
      },
      set (newValue) {
        this.$emit('update:email', newValue)
      }
    },
    setPassword: {
      get () {
        return this.password
      },
      set (newValue) {
        this.$emit('update:password', newValue)
      }
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    }
  }
}
</script>
