export default async ({ params, store }) => {
  await store.dispatch('day/createDay', { day: { date: params.date } })
  await Promise.all([
    store.dispatch('body/createBody', params.date),
    store.dispatch('ateFood/getAteFoods', params.date),
    store.dispatch('category/getCategories'),
    store.dispatch('food/getFoods'),
    store.dispatch('dish/getDishes', params.date)
  ])
}
