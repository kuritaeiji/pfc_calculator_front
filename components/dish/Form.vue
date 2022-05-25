<template>
  <div>
    <v-text-field
      v-model="setTitle"
      outlined
      validate-on-blur
      :label="form.title.label"
      :rules="form.title.rules"
      @keypress.enter="submit"
    />
    <v-text-field
      ref="calory"
      v-model="setCalory"
      outlined
      validate-on-blur
      :label="form.calory.label"
      :rules="form.calory.rules"
      @keypress.enter="submit"
    />
    <v-text-field
      ref="protein"
      v-model="setProtein"
      outlined
      validate-on-blur
      :label="form.protein.label"
      :rules="form.protein.rules"
      @keypress.enter="submit"
    />
    <v-text-field
      ref="fat"
      v-model="setFat"
      outlined
      validate-on-blur
      :label="form.fat.label"
      :rules="form.fat.rules"
      @keypress.enter="submit"
    />
    <v-text-field
      ref="carbonhydrate"
      v-model="setCarbonhydrate"
      outlined
      validate-on-blur
      :label="form.carbonhydrate.label"
      :rules="form.carbonhydrate.rules"
      @keypress.enter="submit"
    />
  </div>
</template>

<script>
import numberInput from '~/mixins/numberInput'
import { decimal, presence, shorter } from '~/validators'

export default {
  mixins: [numberInput],
  props: {
    title: {
      type: String,
      required: true
    },
    calory: {
      type: [Number, String],
      required: true
    },
    protein: {
      type: [Number, String],
      required: true
    },
    fat: {
      type: [Number, String],
      required: true
    },
    carbonhydrate: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      form: {
        title: {
          rules: [presence, shorter(20)],
          label: this.$t('model.attributes.dish.title')
        },
        calory: {
          rules: [presence, decimal],
          label: `${this.$t('model.attributes.dish.calory')}(${this.$t('unit.calory')})`
        },
        protein: {
          rules: [presence, decimal],
          label: `${this.$t('model.attributes.dish.protein')}(${this.$t('unit.protein')})`
        },
        fat: {
          rules: [presence, decimal],
          label: `${this.$t('model.attributes.dish.fat')}(${this.$t('unit.fat')})`
        },
        carbonhydrate: {
          rules: [presence, decimal],
          label: `${this.$t('model.attributes.dish.carbonhydrate')}(${this.$t('unit.carbonhydrate')})`
        }
      }
    }
  },
  computed: {
    setTitle: {
      get () {
        return this.title
      },
      set (newVal) {
        this.$emit('update:title', newVal)
      }
    },
    setCalory: {
      get () {
        return this.calory
      },
      set (newVal) {
        this.setOnlyNumber('calory', newVal)
      }
    },
    setProtein: {
      get () {
        return this.protein
      },
      set (newVal) {
        this.setOnlyNumber('protein', newVal)
      }
    },
    setFat: {
      get () {
        return this.fat
      },
      set (newVal) {
        this.setOnlyNumber('fat', newVal)
      }
    },
    setCarbonhydrate: {
      get () {
        return this.carbonhydrate
      },
      set (newVal) {
        this.setOnlyNumber('carbonhydrate', newVal)
      }
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    }
  }
}
</script>
