export default async function fetchLaunches() {
  try {
    const res = await fetch('https://api.spacexdata.com/v3/launches')
    const data = await res.json()
    return data
  } catch (error) {
    return error.message
  }
}
