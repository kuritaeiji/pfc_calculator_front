<template>
  <v-container fluid class="mb-5">
    <v-row justify="center">
      <v-card flat color="transparent" width="80%" max-width="500" class="mt-5">
        <ui-title :title="title" />

        <v-tabs v-model="tab" background-color="transparent" class="mb-3">
          <v-tab
            v-for="category in categories"
            :key="`category-tab-${category.id}`"
            :href="`#${category.id}`"
          >
            {{ category.title }}
          </v-tab>
        </v-tabs>

        <v-card
          v-for="food in foodsByCategory(tabId)"
          :key="`food-card-${food.id}`"
          flat
          tile
          class="mb-3 d-flex justify-space-between"
        >
          <v-card-title>
            {{ food.title }}
          </v-card-title>

          <v-card-actions class="d-flex">
            <logged-in-form-update-dialog-btn @open="openUpdateDialog(food)" />
            <logged-in-form-destroy-dialog-btn @open="openDestroyDialog(food)" />
          </v-card-actions>
        </v-card>

        <logged-in-form-create-dialog
          :dialog.sync="create.dialog"
          model-name="food"
          :is-valid="create.isValid"
          :is-loading="create.isLoading"
          @click-form-btn="_createFood"
        >
          <template #form>
            <v-form ref="createForm" v-model="create.isValid">
              <food-form v-bind.sync="create.params.food" />
            </v-form>
          </template>
        </logged-in-form-create-dialog>
      </v-card>
    </v-row>

    <logged-in-form-update-dialog
      model-name="food"
      :dialog.sync="update.dialog"
      :is-valid="update.isValid"
      :is-loading="update.isLoading"
      @click-form-btn="_updateFood"
    >
      <template #form>
        <v-form ref="updateForm" v-model="update.isValid">
          <food-form v-bind.sync="update.params.food" />
        </v-form>
      </template>
    </logged-in-form-update-dialog>
    <ui-confirm-dialog :dialog.sync="destroy.dialog" @yes="_destroyFood" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import pageTitle from '~/mixins/pageTitle'

const defaultCreateFood = {
  title: '',
  per: '',
  unit: '',
  calory: '',
  protein: '',
  fat: '',
  carbonhydrate: '',
  category_id: ''
}

export default {
  mixins: [pageTitle],
  middleware: ['auth', 'getCategories', 'getFoods'],
  data () {
    return {
      tab: null,
      create: {
        dialog: false,
        isValid: false,
        isLoading: false,
        params: {
          food: { ...defaultCreateFood }
        }
      },
      update: {
        dialog: false,
        isValid: false,
        isLoading: false,
        params: {
          food: {}
        }
      },
      destroy: {
        dialog: false,
        food: null
      }
    }
  },
  computed: {
    ...mapGetters('category', ['categories']),
    ...mapGetters('food', ['foodsByCategory']),
    tabId () {
      return Number(this.tab)
    }
  },
  methods: {
    ...mapActions('food', ['createFood', 'updateFood', 'destroyFood']),
    ...mapActions('validation', ['resetValidation']),
    async _createFood () {
      if (this.create.isValid) {
        this.create.isLoading = true
        try {
          await this.createFood(this.create.params)
          this.createFoodResolve()
        } catch (error) {
          this.$utils.formErrorWithValidation(error)
        } finally {
          this.create.isLoading = false
        }
      }
    },
    createFoodResolve () {
      this.create.params.food = { ...defaultCreateFood }
      this.$refs.createForm.resetValidation()
      this.resetValidation()
      this.create.dialog = false
    },
    openUpdateDialog (food) {
      this.update.dialog = true
      this.update.params.food = { ...food, category_id: food.category.id }
      this.resetValidation()
    },
    async _updateFood () {
      if (this.update.isValid) {
        this.update.isLoading = true
        try {
          await this.updateFood(this.update.params)
          this.updateFoodReslove()
        } catch (error) {
          this.$utils.formErrorWithValidation(error)
        } finally {
          this.update.isLoading = false
        }
      }
    },
    updateFoodReslove () {
      this.$refs.updateForm.resetValidation()
      this.resetValidation()
      this.update.dialog = false
    },
    openDestroyDialog (food) {
      this.destroy.dialog = true
      this.destroy.food = food
    },
    async _destroyFood () {
      await this.destroyFood(this.destroy.food)
      this.destroy.dialog = false
      this.destroy.food = null
    }
  }
}
</script>
