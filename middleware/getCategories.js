export default async ({ store }) => {
  await store.dispatch('category/getCategories')
}
