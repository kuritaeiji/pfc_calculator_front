<template>
  <v-container>
    <v-row justify="center">
      <v-card flat color="transparent" width="80%" max-width="400">
        <v-card-title class="justify-center font-weight-bold text-h5 greyText--text my-5">
          {{ title }}
        </v-card-title>

        <ui-validation />

        <v-form ref="form" v-model="isValid">
          <v-text-field
            v-model="setEmail"
            outlined
            validate-on-blur
            label="メールアドレス"
            type="email"
            :placeholder="form.email.placeholder"
            :rules="form.email.rules"
            @keypress.enter="submit"
          />
          <v-text-field
            v-model="setPassword"
            outlined
            validate-on-blur
            label="パスワード"
            type="password"
            :placeholder="form.password.placeholder"
            :rules="form.password.rules"
            @keypress.enter="submit"
          />

          <v-card-text v-if="isSignup" class="text-caption greyText--text pt-0">
            大文字英字、小文字英字、数字の3種類を含めて下さい。<br>
            半角英数字、ハイフン、アンダーバーが使えます。
          </v-card-text>

          <ui-form-btn text="ログインする" :is-loading="isLoading" @click="submit" />

          <v-card
            v-if="$route.name === 'login'"
            flat
            color="white"
            class="mt-5"
          >
            <v-card-title class="py-1">
              テストユーザー
            </v-card-title>

            <v-card-text>
              メールアドレス: {{ $config.testUser.email }}<br>
              パスワード: {{ $config.testUser.password }}
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
      return this.$route.name === 'signup'
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
      if (this.$refs.form.validate()) {
        this.$emit('submit')
      }
    }
  }
}
</script>
