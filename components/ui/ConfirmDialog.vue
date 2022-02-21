<template>
  <v-dialog v-model="setDialog" max-width="350">
    <v-card>
      <v-card-title>
        {{ text }}
      </v-card-title>
      <v-card-actions class="d-flex">
        <v-btn width="85" depressed color="btnPrimary" class="white--text" @click="yes">
          はい
        </v-btn>
        <v-btn width="85" depressed color="btnPink" class="ml-5 white--text" @click="no">
          いいえ
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      required: true
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
    yes () {
      this.$emit('yes')
    },
    no () {
      this.$emit('update:dialog', false)
    }
  }
}
</script>
