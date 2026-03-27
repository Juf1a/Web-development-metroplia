const url = "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants";

async function loadRestaurants() {
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
  renderRestaurants(data);
}

loadRestaurants();

function renderRestaurants(restaurants) {
  const container = document.getElementById("restaurantList");
  container.innerHTML = "";

  restaurants.forEach(r => {
    const card = document.createElement("div");
    card.className = "restaurant-card";

    card.innerHTML = `
      <h3>${r.name}</h3>
      <p>Address: ${r.address}</p>
      <p>City: ${r.city}</p>
      <p>Company: ${r.company}</p>
    `;

    container.appendChild(card);
  });
}