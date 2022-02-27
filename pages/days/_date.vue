<template>
  <v-container>
    <v-row justify="center">
      <v-card flat color="transparent" width="80%" max-width="800">
        <ui-title :title="title" />

        <div class="d-flex">
          <!-- <v-card flat tile min-width="200" class="mr-5">
            <ui-title :title="$t('model.attributes.body.weight')" />

            <v-card-title v-show="!bodyUpdate.editingWeight" class="pt-0 greyText--text text-h4 font-weight-bold">
              {{ body.weight }} {{ $t('unit.weight') }}

              <v-btn icon large class="ml-3" @click="bodyUpdate.editingWeight = true">
                <v-icon size="30">
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-card-title>

            <div v-show="bodyUpdate.editingWeight" class="px-4">
              <ui-validation />
            </div>

            <v-card-title v-show="bodyUpdate.editingWeight" class="pt-0">
              <v-form v-model="bodyUpdate.isValidWeight" class="d-flex" @submit.prevent>
                <v-text-field
                  v-model="bodyUpdate.params.body.weight"
                  dense
                  outlined
                  autofocus
                  @keyup.enter="_updateWeight"
                  @keyup.esc="cancelUpdateWeight"
                />
                <span class="greyText--text text-h4 font-weight-bold ml-2">{{ $t('unit.weight') }}</span>
              </v-form>
            </v-card-title>
          </v-card>

          <v-card flat tile min-width="200">
            <ui-title :title="$t('model.attributes.body.percentage')" />

            <v-card-title v-show="!bodyUpdate.editingPercentage" class="pt-0 greyText--text text-h4 font-weight-bold">
              {{ body.percentage }} {{ $t('unit.percentage') }}

              <v-btn icon large class="ml-3">
                <v-icon size="30" @click="bodyUpdate.editingPercentage = true">
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-card-title>

            <div v-show="bodyUpdate.editingWeight" class="px-4">
              <ui-validation />
            </div>

            <v-card-title v-show="bodyUpdate.editingPercentage" class="pt-0">
              <v-form v-model="bodyUpdate.isValidPercentage" class="d-flex" @submit.prevent>
                <v-text-field
                  v-model="bodyUpdate.params.body.percentage"
                  dense
                  outlined
                  autofocus
                  @keyup.enter="_updatePercentage"
                  @keyup.esc="cancelUpdatePercentage"
                />
                <span class="greyText--text text-h4 font-weight-bold ml-2">{{ $t('unit.percentage') }}</span>
              </v-form>
            </v-card-title>
          </v-card> -->

          <body-card attr-name="weight" />
          <body-card attr-name="percentage" />
        </div>
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
      weightUpdate: {
        isValid: false,
        isEditing: false,
        params: {
          body: { ...this.$store.getters['body/body'] }
        }
      },
      percentageUpdate: {
        isValid: false,
        isEditing: false,
        params: {
          body: { ...this.$store.getters['body/body'] }
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
    ...mapGetters('body', ['body'])
  },
  methods: {
    ...mapActions('body', ['updateWeight', 'updatePercentage']),
    ...mapActions('validation', ['resetValidation']),
    cancelUpdateWeight () {
      this.bodyUpdate.editingWeight = false
      this.bodyUpdate.params.body.weight = this.body.weight
      this.resetValidation()
    },
    async _updateWeight () {
      if (this.bodyUpdate.isValidWeight) {
        try {
          await this.updateWeight(this.bodyUpdate.params)
          this.bodyUpdate.editingWeight = false
          this.resetValidation()
        } catch (error) {
          this.$utils.formErrorWithValidation(error)
        }
      }
    },
    cancelUpdatePercentage () {
      this.bodyUpdate.editingPercentage = false
      this.bodyUpdate.params.body.percentage = this.body.percentage
      this.resetValidation()
    },
    async _updatePercentage () {
      if (this.bodyUpdate.isValidPercentage) {
        await this.updatePercentage(this.bodyUpdate.params)
      }
    }
  }
}
</script>
