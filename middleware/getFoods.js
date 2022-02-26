export default async ({ store }) => {
  await store.dispatch('food/getFoods')
}
