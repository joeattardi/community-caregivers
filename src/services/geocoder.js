const API_URL = `https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_API_KEY}`;

export async function geocode(address, city, state, zip) {
  const location = `${address} ${city} ${state} ${zip}`;

  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      location
    })
  });

  const data = await response.json();

  if (data.results && data.results.length) {
    const [result] = data.results;
    if (result.locations && result.locations.length) {
      return result.locations[0].latLng;
    }
  }
}
