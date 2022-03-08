<template>
  <v-container>
    <ui-title :title="title" class="justify-center" />

    <div class="d-flex align-center flex-column flex-md-row justify-md-center">
      <v-card flat tile max-width="500" class="pa-3 mb-5 mb-md-0 mr-md-5">
        <chart-date-weight-line v-if="chartType === 'date'" :end-date="date" />
        <chart-month-weight-line v-if="chartType === 'month'" :end-month="month" />
      </v-card>

      <v-card flat tile max-width="500" class="pa-3">
        <chart-date-percentage-line v-if="chartType === 'date'" :end-date="date" />
        <chart-month-percentage-line v-if="chartType === 'month'" :end-month="month" />
      </v-card>
    </div>

    <v-card-actions class="justify-center">
      <v-menu v-if="chartType === 'date'" offset-y close-on-content-click>
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

      <v-menu v-if="chartType === 'month'">
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
          :value="thisMonth"
          locale="ja-jp"
          @change="selectMonth"
        />
      </v-menu>

      <v-radio-group v-model="chartType" class="ml-5">
        <v-radio
          v-for="radio in radios"
          :key="`radio-${radio.label}`"
          :label="radio.label"
          :value="radio.value"
        />
      </v-radio-group>
    </v-card-actions>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import pageTitle from '~/mixins/pageTitle'

export default {
  mixins: [pageTitle],
  data () {
    const today = this.$utils.formatDate(new Date())
    const thisMonth = this.$utils.formatMonth(new Date())
    return {
      date: today,
      month: thisMonth,
      chartType: 'date',
      radios: [
        { label: '1日毎のグラフ', value: 'date' },
        { label: '1月毎のグラフ', value: 'month' }
      ],
      today
    }
  },
  methods: {
    ...mapActions('chart', ['getDateWeightData', 'getDatePercentageData', 'getMonthWeightData', 'getMonthPercentageData']),
    async selectDate (date) {
      this.date = date
      await Promise.all([this.getDateWeightData(date), this.getDatePercentageData(date)])
    },
    async selectMonth (month) {
      this.month = month
      await Promise.all([this.getMonthWeightData(month), this.getMonthPercentageData(month)])
    }
  }
}
</script>
