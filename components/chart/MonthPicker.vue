<template>
  <v-menu>
    <template #activator="{ attrs, on }">
      <v-btn
        large
        depressed
        color="btnPrimary"
        class="white--text font-weight-bold mr-5"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="mr-1">
          mdi-calendar
        </v-icon>
        月を選択する
      </v-btn>
    </template>
    <v-date-picker
      type="month"
      :value="month"
      locale="ja-jp"
      @change="selectMonth"
    />
  </v-menu>
</template>

<script>
export default {
  props: {
    month: {
      type: String,
      required: true
    }
  },
  methods: {
    selectMonth (month) {
      this.$emit('change', month)
    }
  }
}
</script>
