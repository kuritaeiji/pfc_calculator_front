export default async ({ $axios, params, store }) => {
  await $axios.$post('/api/v1/days', { day: { date: params.date } })
  await store.dispatch('body/createBody', params.date)
  await store.dispatch('ateFood/getAteFoods', params.date)
  await store.dispatch('category/getCategories')
  await store.dispatch('food/getFoods')
  await store.dispatch('dish/getDishes', params.date)
}
