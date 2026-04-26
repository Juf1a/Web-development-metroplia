const API_URL = "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants";

// start centered on Finland, zoom in later if we get the user's location
const map = L.map("map").setView([64.5, 26.0], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
}).addTo(map);

function plotRestaurants(restaurants, userLat, userLng) {
  let nearest = null;
  let nearestDist = Infinity;

  restaurants.forEach(r => {
    const coords = r.location && r.location.coordinates;
    if (!coords || coords.length < 2) return;

    // GeoJSON is [lng, lat] but leaflet expects [lat, lng]
    const lat = coords[1];
    const lng = coords[0];

    if (userLat !== null) {
      const dist = Math.hypot(lat - userLat, lng - userLng);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = { r, lat, lng };
      }
    }

    L.marker([lat, lng]).addTo(map).bindPopup(`
      <strong>${r.name}</strong><br>
      ${r.address}, ${r.city}<br>
      ${r.company}<br>
      <a href="restaurant.html?id=${r._id}">View menu →</a>
    `);
  });

  // draw a circle on top of the nearest restaurant so it stands out from the regular markers
  if (nearest) {
    L.circleMarker([nearest.lat, nearest.lng], {
      radius: 14,
      color: "#4f46e5",
      fillColor: "#06b6d4",
      fillOpacity: 0.5,
      weight: 3,
    }).addTo(map).bindPopup(`
      <strong>📍 Nearest: ${nearest.r.name}</strong><br>
      ${nearest.r.address}, ${nearest.r.city}<br>
      <a href="restaurant.html?id=${nearest.r._id}">View menu →</a>
    `).openPopup();

    map.setView([nearest.lat, nearest.lng], 13);
  }
}

async function loadMapRestaurants() {
  const response = await fetch(API_URL);
  const restaurants = await response.json();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        L.circleMarker([userLat, userLng], {
          radius: 10,
          color: "#16a34a",
          fillColor: "#4ade80",
          fillOpacity: 0.8,
          weight: 2,
        }).addTo(map).bindPopup("You are here").openPopup();

        plotRestaurants(restaurants, userLat, userLng);
      },
      () => plotRestaurants(restaurants, null, null)
    );
  } else {
    plotRestaurants(restaurants, null, null);
  }
}

loadMapRestaurants();
