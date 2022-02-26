export default async ({ $axios, params }) => {
  await $axios.$post('/api/v1/days', { day: { date: params.date } })
}
