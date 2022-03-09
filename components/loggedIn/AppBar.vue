<template>
  <div>
    <v-app-bar app absolute clipped-left flat color="white">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <ui-app-bar-title />

      <v-spacer />

      <v-menu offset-y>
        <template #activator="{ attrs, on }">
          <v-btn text v-bind="attrs" class="d-none d-sm-inline greyText--text" v-on="on">
            <v-icon>mdi-calendar</v-icon>
            <span class="ml-1 font-weight-bold">日付選択</span>
          </v-btn>

          <v-btn icon v-bind="attrs" class="d-inline d-sm-none greyText--text" v-on="on">
            <v-icon>mdi-calendar</v-icon>
          </v-btn>
        </template>

        <v-date-picker
          :value="date"
          locale="ja-jp"
          first-day-of-week="1"
          :day-format="date => new Date(date).getDate()"
          :max="today"
          @change="selectDate"
        />
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="white">
      <v-list nav dense>
        <v-list-item v-for="(menu, i) of menus" :key="`menu-${i}`" :to="{ name: menu.name }">
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              {{ $utils.translateTitle(menu.name) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list nav dense>
        <v-list-item v-for="(menu, i) of userMenus" :key="`user-menu-${i}`" @click="menu.method">
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              {{ $utils.translateTitle(menu.name) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <ui-confirm-dialog :dialog.sync="dialog" :text="dialogText" @yes="withdraw" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      today: this.$utils.formatDate(new Date()),
      drawer: false,
      dialog: false,
      dialogText: '本当に退会しますか？',
      menus: [
        { name: 'categories' },
        { name: 'foods' },
        { name: 'charts-body' },
        { name: 'charts-calory-and-pfc' }
      ],
      userMenus: [
        { name: 'logout', method: this.logout },
        { name: 'withdraw', method: this.confirmWithdraw }
      ]
    }
  },
  computed: {
    date () {
      if (this.$route.name === 'days-date') {
        return this.$route.params.date
      }
      return this.today
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      if (this.$route.name === 'index') {
        location.reload()
      }
    },
    confirmWithdraw () {
      this.dialog = true
    },
    async withdraw () {
      await this.$axios.$delete('/api/v1/withdraw')
      await this.logout()
      this.dialog = false
    },
    selectDate (date) {
      this.$router.push(`/days/${date}`)
    }
  }
}
</script>
