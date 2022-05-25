<template>
  <div>
    <v-text-field
      ref="amount"
      v-model="setAmount"
      outlined
      validate-on-blur
      :label="label"
      :rules="rules"
      @keypress.enter="submit"
    />

    <v-card-text class="pa-0">
      {{ $t('model.attributes.ateFood.foodId') }}を選択
    </v-card-text>
    <category-tabs />
    <v-card
      v-for="food in foodsByCategory(tab)"
      :key="`create-radio-food-${food.id}`"
      flat
      tile
      color="grey lighten-4"
      class="d-flex mb-3"
      @click="selectFood(food)"
    >
      <v-card-actions>
        <v-icon v-show="food_id !== food.id">
          mdi-radiobox-blank
        </v-icon>
        <v-icon v-show="food_id === food.id" color="primary">
          mdi-radiobox-marked
        </v-icon>
      </v-card-actions>
      <v-card-title>
        {{ food.title }}
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import numberInput from '~/mixins/numberInput'
import { decimal, presence } from '~/validators'

export default {
  mixins: [numberInput],
  props: {
    amount: {
      type: [Number, String],
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    food_id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      rules: [presence, decimal]
    }
  },
  computed: {
    ...mapGetters('category', ['tab']),
    ...mapGetters('food', ['foodsByCategory', 'foodById']),
    setAmount: {
      get () {
        return this.amount
      },
      set (newVal) {
        this.setOnlyNumber('amount', newVal)
      }
    },
    label () {
      if (!this.food_id) {
        return this.$t('model.attributes.ateFood.amount')
      }

      const unit = this.foodById(this.food_id).unit
      return `${this.$t('model.attributes.ateFood.amount')}(${unit})`
    }
  },
  methods: {
    selectFood (food) {
      this.$emit('update:food_id', food.id)
    },
    submit () {
      this.$emit('submit')
    }
  }
}
</script>
