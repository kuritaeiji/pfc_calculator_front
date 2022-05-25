<template>
  <v-app>
    <v-main class="main-background-color">
      <ui-snackbar />
      <v-container fluid fill-height>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="10" lg="8">
            <v-card-title class="justify-center font-weight-bold text-h2 mb-5 greenText--text">
              {{ appName }}
            </v-card-title>

            <v-card-text class="greyText--text text-center text-subtitle-1 mb-5" :style="{ lineHeight: 2 }">
              PFC計算機は、登録した食材や料理から1日で摂取したカロリー、タンパク質、脂質、炭水化物の合計を計算することができます。<br>
              また、円グラフでPFCバランスを確認でき、カロリーやPFCの摂取推移を線グラフで確認できます。<br>
              他にも体重や体脂肪率の記録を付け、その推移を可視化します。
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
              <v-btn
                large
                dark
                depressed
                min-width="125"
                color="btnPrimary"
                class="mx-5 font-weight-bold"
                to="/login"
              >
                ログイン
              </v-btn>

              <v-btn
                large
                outlined
                min-width="125"
                color="btnPrimary"
                class="mx-5 font-weight-bold"
                to="/signup"
              >
                会員登録
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data ({ $config: { appName } }) {
    return {
      appName
    }
  },
  head () {
    return {
      title: this.appName
    }
  }
}
</script>
