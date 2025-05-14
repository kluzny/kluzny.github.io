<script setup>
let url = 'https://ipinfo.io/json'

let ipInfo = {
  city: 'Houston',
  region: 'Texas',
  country: "US",
  loc: "29.8324,-95.4720",
}

let lat = computed(() => {
  return ipInfo.loc.split(',')[0]
})

let lon = computed(() => {
  return ipInfo.loc.split(',')[1]
})

let landsatImage = computed(() => {
  return `https://api.nasa.gov/planetary/earth/imagery?lon=${lon.value}&lat=${lat.value}&dim=0.15&api_key=DEMO_KEY`
})

try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  ipInfo = await response.json();
} catch (error) {
  console.error(error.message);
}
</script>

<template>
  <Post content="/landsat" />

  <section class='space-y-2'>
    <h2 class='text-2xl font-bold'>Client Info</h2>
    <table>
      <tbody>
        <tr>
          <td>City</td>
          <td>{{ipInfo.city}}</td>
        </tr>
        <tr>
          <td>Region</td>
          <td>{{ipInfo.region}}</td>
        </tr>
        <tr>
          <td>Country</td>
          <td>{{ipInfo.country}}</td>
        </tr>
        <tr>
          <td>Latitude</td>
          <td>{{lat}}</td>
        </tr>
        <tr>
          <td>Longitude</td>
          <td>{{lon}}</td>
        </tr>
      </tbody>
    </table>
    <h2 class='text-2xl font-bold'>Most Recent Landsat 8 Photo (patiently loading from NASA)</h2>
    <p>This endpoint retrieves the closest available satellite imagery for the supplied location as of today.</p>
    <p>The satellite passes over each point on earth roughly once every sixteen days.</p>
    <p>
      You can find out more information about the process here:
      <ExtLink href="https://earthobservatory.nasa.gov/Features/LandsatBigData/">
        NASA Earth Observatory
      </ExtLink>
    </p>
    <img :src="landsatImage" alt="Landsat 8 Image" class='w-full h-auto' />
  </section>
</template>

<style scoped>
table td:first-child {
  font-weight: bold;
  padding-right: 1rem;
}
</style>