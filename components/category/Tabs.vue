<template>
  <v-tabs background-color="transparent">
    <v-tab
      v-for="category in categories"
      :key="`category-tab-${category.id}`"
      @click="setTab(category.id)"
    >
      {{ category.title }}
    </v-tab>
  </v-tabs>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters('category', ['categories']),
  methods: mapActions('category', ['setTab'])
}
</script>
