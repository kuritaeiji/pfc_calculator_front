<template>
  <v-menu offset-y close-on-content-click>
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
        日付を選択する
      </v-btn>
    </template>
    <v-date-picker
      :value="date"
      :max="today"
      locale="ja-jp"
      first-day-of-week="1"
      :day-format="date => new Date(date).getDate()"
      @change="selectDate"
    />
  </v-menu>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      today: this.$utils.formatDate(new Date())
    }
  },
  methods: {
    selectDate (date) {
      this.$emit('change', date)
    }
  }
}
</script>
