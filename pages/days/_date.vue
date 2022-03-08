<template>
  <v-container class="mb-5">
    <v-row justify="center">
      <v-card flat color="transparent" width="80%" max-width="800">
        <ui-title :title="title" class="px-0" />

        <div class="d-sm-flex">
          <body-card attr-name="weight" class="mb-3" />
          <body-card attr-name="percentage" class="mb-3" />
        </div>

        <day-card />

        <ui-title :title="$t('chart.pie.pfc')" class="px-0" />
        <v-card flat max-width="400" tile class="d-flex justify-center pa-3">
          <chart-pfc-pie />
        </v-card>

        <ui-title title="食べた料理一覧" class="px-0 mb-2" />

        <meal-card
          v-for="f in ateFoods"
          :key="`ate-food-card-${f.id}`"
          v-bind="f"
          @open-update-dialog="openUpdateAteFoodDialog(f)"
          @open-destroy-dialog="openDestroyAteFoodDialog(f)"
        />

        <meal-card
          v-for="d in dishes"
          :key="`d-card-${d.id}`"
          v-bind="d"
          :carbonhydrate="d.carbonhydrate"
          @open-update-dialog="openUpdateDishDialog(d)"
          @open-destroy-dialog="openDestroyDishDialog(d)"
        />

        <div class="d-sm-flex">
          <logged-in-form-create-dialog
            :btn-text="`${$t('model.food')}一覧から作成する`"
            :title-text="`${$t('model.meal')}の作成`"
            :dialog.sync="ateFood.create.dialog"
            :is-valid="ateFood.create.isValid"
            :is-loading="ateFood.create.isLoading"
            class="mr-5"
            @click-form-btn="_createAteFood"
          >
            <template #form>
              <v-form ref="createAteFoodForm" v-model="ateFood.create.isValid">
                <ate-food-form v-bind.sync="ateFood.create.params.ate_food" />
              </v-form>
            </template>
          </logged-in-form-create-dialog>

          <logged-in-form-create-dialog
            :btn-text="`${$t('model.dish')}を作成する`"
            :title-text="`${$t('model.dish')}の作成`"
            :dialog.sync="dish.create.dialog"
            :is-valid="dish.create.isValid"
            :is-loading="dish.create.isLoading"
            @click-form-btn="_createDish"
          >
            <template #form>
              <v-form ref="createDishForm" v-model="dish.create.isValid">
                <dish-form v-bind.sync="dish.create.params.dish" />
              </v-form>
            </template>
          </logged-in-form-create-dialog>
        </div>

        <logged-in-form-update-dialog
          model-name="ateFood"
          :dialog.sync="ateFood.update.dialog"
          :is-valid="ateFood.update.isValid"
          :is-loading="ateFood.update.isLoading"
          @click-form-btn="_updateAteFood"
        >
          <template #form>
            <v-form ref="updateAteFood" v-model="ateFood.update.isValid">
              <ate-food-form v-bind.sync="ateFood.update.params.ate_food" />
            </v-form>
          </template>
        </logged-in-form-update-dialog>

        <logged-in-form-update-dialog
          model-name="dish"
          :dialog.sync="dish.update.dialog"
          :is-valid="dish.update.isValid"
          :is-loading="dish.update.isLoading"
          @click-form-btn="_updateDish"
        >
          <template #form>
            <v-form ref="updateDishForm" v-model="dish.update.isValid">
              <dish-form v-bind.sync="dish.update.params.dish" />
            </v-form>
          </template>
        </logged-in-form-update-dialog>

        <ui-confirm-dialog :dialog.sync="ateFood.destroy.dialog" @yes="_destroyAteFood" />
        <ui-confirm-dialog :dialog.sync="dish.destroy.dialog" @yes="_destroyDish" />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  middleware: ['auth', 'prepareDaysPage'],
  data () {
    const date = this.$route.params.date
    return {
      title: this.$utils.formatDateJp(new Date(this.$route.params.date)),
      date,
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
                date
              }
            }
          }
        },
        update: {
          dialog: false,
          isValid: false,
          isLoading: false,
          params: {
            ate_food: {}
          }
        },
        destroy: {
          dialog: false,
          ate_food: {}
        }
      },
      dish: {
        create: {
          dialog: false,
          isValid: false,
          isLoading: false,
          params: {
            dish: {
              title: '',
              calory: '',
              protein: '',
              fat: '',
              carbonhydrate: '',
              day: {
                date
              }
            }
          }
        },
        update: {
          dialog: false,
          isValid: false,
          isLoading: false,
          params: {
            dish: {}
          }
        },
        destroy: {
          dialog: false,
          dish: {}
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
    ...mapGetters('food', ['foodsByCategory']),
    ...mapGetters('dish', ['dishes'])
  },
  methods: {
    ...mapActions('ateFood', ['createAteFood', 'updateAteFood', 'destroyAteFood']),
    ...mapActions('dish', ['createDish', 'updateDish', 'destroyDish']),
    ...mapActions('validation', ['setValidation', 'resetValidation']),
    ...mapActions('day', ['getDay']),
    async _createAteFood () {
      if (!this.ateFood.create.params.ate_food.food_id) {
        return this.setValidation([this.$t('validation.ateFood.foodId')])
      }

      if (this.ateFood.create.isValid) {
        this.ateFood.create.isLoading = true
        try {
          await this.createAteFood(this.ateFood.create.params)
          this.createAteFoodResolve()
        } catch (error) {
          this.$utils.formErrorWithValidation(error)
        } finally {
          this.ateFood.create.isLoading = false
        }
      }
    },
    createAteFoodResolve () {
      this.getDay(this.date)
      this.ateFood.create.dialog = false
      this.ateFood.create.params.ate_food = { amount: '', food_id: '', day: { date: this.date } }
      this.$refs.createAteFoodForm.resetValidation()
      this.resetValidation()
    },
    openUpdateAteFoodDialog (ateFood) {
      this.ateFood.update.dialog = true
      this.ateFood.update.params.ate_food = { ...ateFood, food_id: ateFood.food.id }
    },
    async _updateAteFood () {
      if (!this.ateFood.update.params.ate_food.food_id) {
        return this.setValidation([this.$t('validation.ateFood.foodId')])
      }

      if (this.ateFood.update.isValid) {
        this.ateFood.update.isLoading = true
        try {
          await this.updateAteFood(this.ateFood.update.params)
          this.updateAteFoodResolve()
        } catch (error) {
          this.$utils.formErrorWithValidation(error)
        } finally {
          this.ateFood.update.isLoading = false
        }
      }
    },
    updateAteFoodResolve () {
      this.getDay(this.date)
      this.$refs.updateAteFood.resetValidation()
      this.resetValidation()
      this.ateFood.update.dialog = false
    },
    openDestroyAteFoodDialog (ateFood) {
      this.ateFood.destroy.dialog = true
      this.ateFood.destroy.ate_food = ateFood
    },
    async _destroyAteFood () {
      await this.destroyAteFood(this.ateFood.destroy.ate_food)
      this.getDay(this.date)
      this.ateFood.destroy.dialog = false
    },
    async _createDish () {
      if (this.dish.create.isValid) {
        this.dish.create.isLoading = true
        try {
          await this.createDish(this.dish.create.params)
          this.createDishResolve()
        } catch (error) {
          this.$utils.formErrorWithValidation(error)
        } finally {
          this.dish.create.isLoading = false
        }
      }
    },
    createDishResolve () {
      this.getDay(this.date)
      this.dish.create.dialog = false
      this.dish.create.params.dish = { title: '', calory: '', protein: '', fat: '', carbonhydrate: '', day: { date: this.date } }
      this.resetValidation()
      this.$refs.createDishForm.resetValidation()
    },
    openUpdateDishDialog (dish) {
      this.dish.update.dialog = true
      this.dish.update.params.dish = { ...dish }
    },
    async _updateDish () {
      if (this.dish.update.isValid) {
        try {
          await this.updateDish(this.dish.update.params)
          this.updateDishResolve()
        } catch (error) {
          this.$utils.formErrorWithValidation(error)
        } finally {
          this.dish.update.isLoading = false
        }
      }
    },
    updateDishResolve () {
      this.getDay(this.date)
      this.dish.update.params.dish = {}
      this.resetValidation()
      this.$refs.updateDishForm.resetValidation()
      this.dish.update.dialog = false
    },
    openDestroyDishDialog (dish) {
      this.dish.destroy.dialog = true
      this.dish.destroy.dish = dish
    },
    async _destroyDish () {
      await this.destroyDish(this.dish.destroy.dish)
      this.getDay(this.date)
      this.dish.destroy.dialog = false
    }
  }
}
</script>
