<template>
  <div>
    <v-btn
      depressed
      large
      color="btnPrimary"
      class="mt-5 white--text font-weight-bold"
      @click="click"
    >
      {{ btnText }}
    </v-btn>

    <v-dialog v-model="setDialog" max-width="500">
      <v-card class="pa-3">
        <v-card-title class="justify-center font-weight-bold mb-3">
          {{ titleText }}
        </v-card-title>

        <ui-validation />

        <slot name="form" />
        <ui-form-btn :is-loading="isLoading" @click="clickFormBtn" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    btnText: {
      type: String,
      required: true
    },
    titleText: {
      type: String,
      required: true
    },
    dialog: {
      type: Boolean,
      default: false
    },
    isValid: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    setDialog: {
      get () {
        return this.dialog
      },
      set (newValue) {
        this.$emit('update:dialog', newValue)
      }
    }
  },
  methods: {
    click () {
      this.$emit('update:dialog', true)
    },
    clickFormBtn () {
      this.$emit('click-form-btn')
    }
  }
}
</script>
