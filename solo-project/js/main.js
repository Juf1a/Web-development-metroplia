const API_URL = "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants";

// keep all restaurants in memory so filtering doesn't need extra fetches
let allRestaurants = [];

async function loadRestaurants() {
  const response = await fetch(API_URL);
  allRestaurants = await response.json();
  populateFilters(allRestaurants);
  renderRestaurants(allRestaurants);
}

function populateFilters(restaurants) {
  // filter(Boolean) drops any null/undefined cities before deduplicating
  const cities = [...new Set(restaurants.map(r => r.city).filter(Boolean))].sort();
  const providers = [...new Set(restaurants.map(r => r.company).filter(Boolean))].sort();

  const cityFilter = document.getElementById("cityFilter");
  const providerFilter = document.getElementById("providerFilter");

  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    cityFilter.appendChild(option);
  });

  providers.forEach(company => {
    const option = document.createElement("option");
    option.value = company;
    option.textContent = company;
    providerFilter.appendChild(option);
  });
}

function applyFilters() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const city = document.getElementById("cityFilter").value;
  const provider = document.getElementById("providerFilter").value;

  const filtered = allRestaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search) || r.address.toLowerCase().includes(search);
    const matchesCity = !city || r.city === city;
    const matchesProvider = !provider || r.company === provider;
    return matchesSearch && matchesCity && matchesProvider;
  });

  renderRestaurants(filtered);
}

function renderRestaurants(restaurants) {
  const container = document.getElementById("restaurantList");
  container.innerHTML = "";

  if (restaurants.length === 0) {
    container.innerHTML = '<p class="empty-msg">No restaurants match your search.</p>';
    return;
  }

  const favorites = getFavorites();

  restaurants.forEach(r => {
    const isFav = favorites.includes(r._id);
    const card = document.createElement("div");
    card.className = "restaurant-card";

    card.innerHTML = `
      <div class="card-header">
        <h3>${r.name}</h3>
        <button class="card-fav-btn ${isFav ? "faved" : ""} ${getCurrentUser() ? "" : "fav-hidden"}" data-id="${r._id}" title="Add to favorites">
          ${isFav ? "&#9733;" : "&#9734;"}
        </button>
      </div>
      <p>${r.address}</p>
      <p>${r.city}</p>
      <p class="card-company">${r.company}</p>
    `;

    card.querySelector(".card-fav-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      if (!getCurrentUser()) {
        showToast("Please log in to save favorites.");
        return;
      }
      const btn = e.currentTarget;
      const id = btn.dataset.id;
      toggleFavorite(id);
      const nowFaved = getFavorites().includes(id);
      btn.classList.toggle("faved", nowFaved);
      btn.innerHTML = nowFaved ? "&#9733;" : "&#9734;";
    });

    card.addEventListener("click", () => {
      window.location.href = `restaurant.html?id=${r._id}`;
    });

    container.appendChild(card);
  });
}


document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("cityFilter").addEventListener("change", applyFilters);
document.getElementById("providerFilter").addEventListener("change", applyFilters);

loadRestaurants();
