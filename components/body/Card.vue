<template>
  <v-card flat tile min-width="200" class="mr-5">
    <ui-title :title="$t(`model.attributes.body.${attrName}`)" />

    <v-card-title v-show="!isEditing" class="pt-0 greyText--text text-h4 font-weight-bold">
      {{ body[attrName] }} {{ $t(`unit.${attrName}`) }}
      <v-btn icon large class="ml-3" @click="clickEditBtn">
        <v-icon size="30">
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-card-title>

    <div v-show="isEditing" class="px-4">
      <ui-validation />
    </div>

    <v-card-title v-show="isEditing" class="pt-0">
      <v-form v-model="isValid" class="d-flex" @submit.prevent>
        <v-text-field
          ref="input"
          v-model="setAttr"
          dense
          outlined
          autofocus
          :rules="rules"
          @keyup.enter="update"
          @keyup.esc="cancelUpdate"
        />
        <span class="greyText--text text-h4 font-weight-bold ml-2">{{ $t(`unit.${attrName}`) }}</span>
      </v-form>
    </v-card-title>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { decimal, presence, smaller } from '~/validators'

export default {
  props: {
    attrName: {
      type: String,
      default: 'weight'
    }
  },
  data () {
    return {
      isValid: false,
      isEditing: false,
      params: {
        body: { ...this.$store.getters['body/body'] }
      }
    }
  },
  computed: {
    ...mapGetters('body', ['body']),
    capitalizedAttrName () {
      return this.attrName.charAt(0).toUpperCase() + this.attrName.slice(1)
    },
    rules () {
      if (this.attrName === 'weight') {
        return [presence, decimal]
      }
      return [presence, decimal, smaller(100)]
    },
    setAttr: {
      get () {
        return this.params.body[this.attrName]
      },
      set (newVal) {
        const number = Number(newVal)
        if (this.lastCharIsCommaAndLastSecondCharIsNumber(newVal)) {
          this.$refs.input.lazyValue = newVal
          this.params.body[this.attrName] = newVal
          return null
        }

        if (typeof number === 'number') {
          this.$refs.input.lazyValue = number
          this.params.body[this.attrName] = number
          return null
        }

        this.$refs.input.lazyValue = this.params.body[this.attrName]
      }
    },
    lastCharIsCommaAndLastSecondCharIsNumber () {
      return (string) => {
        const lastChar = string.slice(-1)
        const lastSecondChar = string.slice(-2)[0]
        return lastChar === '.' && typeof Number(lastSecondChar) === 'number'
      }
    }
  },
  methods: {
    ...mapActions('validation', ['resetValidation']),
    clickEditBtn () {
      this.isEditing = true
    },
    async update () {
      if (this.isValid) {
        try {
          await this.$store.dispatch(`body/update${this.capitalizedAttrName}`, this.params)
          this.isEditing = false
          this.resetValidation()
        } catch (error) {
          this.$utils.formErrorWithValidation(error)
        }
      }
    },
    cancelUpdate () {
      this.isEditing = false
      this.params.body = { ...this.body }
      this.resetValidation()
    }
  }
}
</script>
