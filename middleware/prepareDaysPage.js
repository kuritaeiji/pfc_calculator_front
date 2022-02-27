export default async ({ $axios, params, store }) => {
  await $axios.$post('/api/v1/days', { day: { date: params.date } })
  await store.dispatch('body/createBody', params.date)
}
