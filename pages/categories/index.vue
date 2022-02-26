<template>
  <v-container class="mb-5">
    <v-row justify="center">
      <v-card flat color="transparent" width="80%" max-width="500" class="mt-5">
        <v-card-title class="greyText--text font-weight-bold">
          {{ title }}
        </v-card-title>

        <template v-for="category of categories">
          <v-card :key="`category-card-${category.id}`" flat class="d-flex justify-space-between mb-3">
            <v-card-title class="greyText--text font-weight-bold text-subtitle-1">
              {{ category.title }}
            </v-card-title>

            <v-card-actions class="d-flex">
              <logged-in-form-update-dialog-btn @open="openUpdateDialog(category)" />
              <logged-in-form-destroy-dialog-btn @open="openDestroyDialog(category)"/>
            </v-card-actions>
          </v-card>
        </template>

        <logged-in-form-create-dialog
          model-name="category"
          :is-valid="create.isValid"
          :is-loading="create.isLoading"
          :dialog.sync="create.dialog"
          @click-form-btn="_createCategory"
        >
          <template #form>
            <v-form ref="createForm" v-model="create.isValid">
              <category-form v-bind.sync="create.params.category" />
            </v-form>
          </template>
        </logged-in-form-create-dialog>

        <logged-in-form-update-dialog
          model-name="category"
          :dialog.sync="update.dialog"
          :is-valid="update.isValid"
          :is-loading="update.isLoading"
          @click-form-btn="_updateCategory"
        >
          <template #form>
            <v-form ref="updateForm" v-model="update.isValid">
              <category-form v-bind.sync="update.params.category" />
            </v-form>
          </template>
        </logged-in-form-update-dialog>

        <ui-confirm-dialog :dialog.sync="destroy.dialog" @yes="_destroyCategory" />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import pageTitle from '~/mixins/pageTitle'

const defaultNewCategory = { title: '' }
const defaultUpdateCategory = { id: 0, title: 'default' }

export default {
  mixins: [pageTitle],
  middleware: ['auth', 'getCategories'],
  data () {
    return {
      create: {
        dialog: false,
        isValid: false,
        isLoading: false,
        params: {
          category: { ...defaultNewCategory }
        }
      },
      update: {
        dialog: false,
        isValid: false,
        isLoading: false,
        params: {
          category: defaultUpdateCategory
        }
      },
      destroy: {
        dialog: false,
        category: null
      }
    }
  },
  computed: mapGetters('category', ['categories']),
  methods: {
    ...mapActions('category', ['createCategory', 'updateCategory', 'destroyCategory']),
    ...mapActions('validation', ['resetValidation']),
    async _createCategory () {
      if (this.create.isValid) {
        this.create.isLoading = true
        try {
          await this.createCategory(this.create.params)
          this.createCategoryResolove()
        } catch (error) {
          this.$utils.formErrorWithValidation(error)
        } finally {
          this.create.isLoading = false
        }
      }
    },
    createCategoryResolove () {
      this.$refs.createForm.resetValidation()
      this.resetValidation()
      this.create.params.category = { ...defaultNewCategory }
      this.create.dialog = false
    },
    openDestroyDialog (category) {
      this.destroy = {
        dialog: true,
        category
      }
    },
    async _destroyCategory () {
      await this.destroyCategory(this.destroy.category)
      this.destroy.dialog = false
      this.destroy.category = null
    },
    openUpdateDialog (category) {
      this.update.params.category = { ...category }
      this.update.dialog = true
    },
    async _updateCategory () {
      if (this.update.isValid) {
        this.update.isLoading = true
        try {
          await this.updateCategory(this.update.params)
          this.updateCategoryResolve()
        } catch (error) {
          this.$utils.formErrorWithValidation(error)
        } finally {
          this.update.isLoading = false
        }
      }
    },
    updateCategoryResolve () {
      this.$refs.updateForm.resetValidation()
      this.resetValidation()
      this.update.dialog = false
    }
  }
}
</script>
