<template>
  <div>
    <v-text-field
      v-model="setTitle"
      outlined
      validate-on-blur
      :label="$t('model.attributes.food.title')"
      :rules="rules.title"
      @keypress.enter="submit"
    />
    <v-text-field
      ref="per"
      v-model="setPer"
      outlined
      validate-on-blur
      :label="$t('model.attributes.food.per')"
      placeholder="100"
      :rules="rules.per"
      @keypress.enter="submit"
    />
    <v-text-field
      ref="unit"
      v-model="setUnit"
      outlined
      validate-on-blur
      :label="$t('model.attributes.food.unit')"
      placeholder="g"
      :rules="rules.unit"
      @keypress.enter="submit"
    />
    <v-text-field
      ref="calory"
      v-model="setCalory"
      outlined
      validate-on-blur
      :label="$t('model.attributes.food.calory')"
      :rules="rules.calory"
      @keypress.enter="submit"
    />
    <v-text-field
      ref="protein"
      v-model="setProtein"
      outlined
      validate-on-blur
      :label="$t('model.attributes.food.protein')"
      :rules="rules.protein"
      @keypress.enter="submit"
    />
    <v-text-field
      ref="fat"
      v-model="setFat"
      outlined
      validate-on-blur
      :label="$t('model.attributes.food.fat')"
      :rules="rules.fat"
      @keypress.enter="submit"
    />
    <v-text-field
      ref="carbonhydrate"
      v-model="setCarbonhydrate"
      outlined
      validate-on-blur
      :label="$t('model.attributes.food.carbonhydrate')"
      :rules="rules.carbonhydrate"
      @keypress.enter="submit"
    />
    <v-select
      ref="categoryId"
      v-model="setCategoryId"
      outlined
      validate-on-blur
      :label="$t('model.category')"
      :items="selectCategoryItems"
      item-text="text"
      item-value="value"
      :rules="rules.category_id"
      @keypress.enter="submit"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import numberInput from '~/mixins/numberInput'
import { decimal, presence, shorter } from '~/validators'

export default {
  mixins: [numberInput],
  props: {
    title: {
      type: String,
      required: true
    },
    per: {
      type: [Number, String],
      required: true
    },
    unit: {
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
    },
    // eslint-disable-next-line vue/prop-name-casing
    category_id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      rules: {
        title: [presence, shorter(20)],
        per: [presence, decimal],
        unit: [presence, shorter(10)],
        calory: [presence, decimal],
        protein: [presence, decimal],
        fat: [presence, decimal],
        carbonhydrate: [presence, decimal],
        category_id: [presence]
      }
    }
  },
  computed: {
    ...mapGetters('category', ['categories']),
    setTitle: {
      get () {
        return this.title
      },
      set (newVal) {
        this.$emit('update:title', newVal)
      }
    },
    setPer: {
      get () {
        return this.per
      },
      set (newVal) {
        this.setOnlyNumber('per', newVal)
      }
    },
    setUnit: {
      get () {
        return this.unit
      },
      set (newVal) {
        this.$emit('update:unit', newVal)
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
    },
    setCategoryId: {
      get () {
        return this.category_id
      },
      set (newVal) {
        this.$emit('update:category_id', newVal)
      }
    },
    selectCategoryItems () {
      return this.categories.map(c => ({ text: c.title, value: c.id }))
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    }
  }
}
</script>
