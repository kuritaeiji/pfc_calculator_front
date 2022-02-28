<template>
  <v-container class="mb-5">
    <v-row justify="center">
      <v-card flat color="transparent" width="80%" max-width="800">
        <ui-title :title="title" class="px-0" />

        <div class="d-sm-flex">
          <body-card attr-name="weight" class="mb-3" />
          <body-card attr-name="percentage" class="mb-3" />
        </div>

        <ui-title title="食べた料理一覧" class="px-0 mb-2" />

        <template v-for="ateFood in ateFoods">
          <v-card
            :key="`ate-food-card-${ateFood.id}`"
            flat
            tile
          >
            <v-row no-gutters class="pa-3">
              <v-col>
                <div class="greyText--text text-caption">
                  {{ $t('model.attributes.food.title') }}
                </div>
                <div class="greyText--text font-weight-bold">
                  {{ ateFood.food.title }}
                </div>
              </v-col>

              <v-col>
                <div class="greyText--text text-caption">
                  {{ $t('model.attributes.food.calory') }}
                </div>
                <div class="greyText--text font-weight-bold">
                  {{ ateFood.calory }} {{ $t('unit.calory') }}
                </div>
              </v-col>

              <v-col class="d-none d-sm-block">
                <div class="greyText--text text-caption">
                  {{ $t('model.attributes.food.protein') }}
                </div>
                <div class="greyText--text font-weight-bold">
                  {{ ateFood.protein }} {{ $t('unit.protein') }}
                </div>
              </v-col>

              <v-col class="d-none d-sm-block">
                <div class="greyText--text text-caption">
                  {{ $t('model.attributes.food.fat') }}
                </div>
                <div class="greyText--text font-weight-bold">
                  {{ ateFood.fat }} {{ $t('unit.fat') }}
                </div>
              </v-col>

              <v-col class="d-none d-sm-block">
                <div class="greyText--text text-caption">
                  {{ $t('model.attributes.food.carbonhydrate') }}
                </div>
                <div class="greyText--text font-weight-bold">
                  {{ ateFood.carbonhydrate }} {{ $t('unit.carbonhydrate') }}
                </div>
              </v-col>

              <v-col class="d-flex justify-end">
                <logged-in-form-update-dialog-btn />
                <logged-in-form-destroy-dialog-btn />
              </v-col>
            </v-row>
          </v-card>

          <v-divider :key="`ate-food-divider-${ateFood.id}`" />
        </template>

        <logged-in-form-create-dialog
          :btn-text="`${$t('model.food')}一覧から作成する`"
          :title-text="`${$t('model.meal')}の作成`"
          :dialog.sync="ateFood.create.dialog"
          :is-valid="ateFood.create.isValid"
          :is-loading="ateFood.create.isLoading"
          @click-form-btn="_createAteFood"
        >
          <template #form>
            <v-form ref="createAteFoodForm" v-model="ateFood.create.isValid">
              <ate-food-form v-bind.sync="ateFood.create.params.ate_food" />
            </v-form>
          </template>
        </logged-in-form-create-dialog>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  middleware: ['auth', 'prepareDaysPage'],
  data () {
    return {
      title: this.$utils.formatDateJp(new Date(this.$route.params.date)),
      ateFood: {
        create: {
          dialog: false,
          isValid: false,
          isLoading: false,
          params: {
            ate_food: {
              amount: '',
              food_id: '',
              day: {
                date: this.$route.params.date
              }
            }
          }
        }
      }
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  computed: {
    ...mapGetters('ateFood', ['ateFoods']),
    ...mapGetters('category', ['tab']),
    ...mapGetters('food', ['foodsByCategory'])
  },
  methods: {
    ...mapActions('ateFood', ['createAteFood', 'updateAteFood', 'destroyAteFood']),
    ...mapActions('validation', ['setValidation', 'resetValidation']),
    async _createAteFood () {
      if (!this.ateFood.create.params.ate_food.food_id) {
        return this.setValidation(['食材・料理を選択して下さい'])
      }

      if (this.ateFood.create.isValid) {
        try {
          await this.createAteFood(this.ateFood.create.params)
          this.createAteFoodResolve()
        } catch (error) {
          this.$utils.formErrorWithValidation(error)
        }
      }
    },
    createAteFoodResolve () {
      this.ateFood.create.dialog = false
      this.ateFood.create.params.ate_food = { amount: '', food_id: '', day: { date: this.$route.params.date } }
      this.$refs.createAteFoodForm.resetValidation()
      this.resetValidation()
    }
  }
}
</script>
