<template>
  <v-card
    flat
    tile
  >
    <v-row no-gutters class="pa-3">
      <v-col>
        <div class="greyText--text text-caption">
          {{ $t('model.attributes.food.title') }}
        </div>
        <div class="greyText--text font-weight-bold">
          {{ title }}
        </div>
      </v-col>

      <v-col>
        <div class="greyText--text text-caption">
          {{ $t('model.attributes.food.calory') }}
        </div>
        <div class="greyText--text font-weight-bold">
          {{ calory }} {{ $t('unit.calory') }}
        </div>
      </v-col>

      <v-col class="d-none d-sm-block">
        <div class="greyText--text text-caption">
          {{ $t('model.attributes.food.protein') }}
        </div>
        <div class="greyText--text font-weight-bold">
          {{ protein }} {{ $t('unit.protein') }}
        </div>
      </v-col>

      <v-col class="d-none d-sm-block">
        <div class="greyText--text text-caption">
          {{ $t('model.attributes.food.fat') }}
        </div>
        <div class="greyText--text font-weight-bold">
          {{ fat }} {{ $t('unit.fat') }}
        </div>
      </v-col>

      <v-col class="d-none d-sm-block">
        <div class="greyText--text text-caption">
          {{ $t('model.attributes.food.carbonhydrate') }}
        </div>
        <div class="greyText--text font-weight-bold">
          {{ carbonhydrate }} {{ $t('unit.carbonhydrate') }}
        </div>
      </v-col>

      <v-col class="d-flex justify-end">
        <logged-in-form-update-dialog-btn @open="openUpdateDialog" />
        <logged-in-form-destroy-dialog-btn @open="openDestroyDialog" />
      </v-col>
    </v-row>

    <v-divider />
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    calory: {
      type: Number,
      required: true
    },
    protein: {
      type: Number,
      required: true
    },
    fat: {
      type: Number,
      required: true
    },
    carbonhydrate: {
      type: Number,
      required: true
    }
  },
  methods: {
    openUpdateDialog () {
      this.$emit('open-update-dialog')
    },
    openDestroyDialog () {
      this.$emit('open-destroy-dialog')
    }
  }
}
</script>
