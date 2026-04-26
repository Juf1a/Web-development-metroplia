const API_URL = "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants";

if (!getCurrentUser()) {
  window.location.href = 'auth.html';
}

function renderCard(r, container) {
  const card = document.createElement("div");
  card.className = "restaurant-card";
  card.dataset.id = r._id;

  card.innerHTML = `
    <div class="card-header">
      <h3>${r.name}</h3>
      <button class="card-fav-btn faved" data-id="${r._id}" title="Remove from favorites">
        &#9733;
      </button>
    </div>
    <p>${r.address}</p>
    <p>${r.city}</p>
    <p class="card-company">${r.company}</p>
  `;

  card.querySelector(".card-fav-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFavorite(r._id);
    card.remove();

    if (container.querySelectorAll(".restaurant-card").length === 0) {
      container.innerHTML = '<p class="empty-msg">No favorites yet. Browse restaurants and click the star to add one.</p>';
    }
  });

  card.addEventListener("click", () => {
    window.location.href = `restaurant.html?id=${r._id}`;
  });

  container.appendChild(card);
}

async function loadFavorites() {
  const container = document.getElementById("favoritesList");
  const favoriteIds = getFavorites();

  if (favoriteIds.length === 0) {
    container.innerHTML = '<p class="empty-msg">No favorites yet. Browse restaurants and click the star to add one.</p>';
    return;
  }

  const response = await fetch(API_URL);
  const allRestaurants = await response.json();

  const favorited = allRestaurants.filter(r => favoriteIds.includes(r._id));

  container.innerHTML = "";
  favorited.forEach(r => renderCard(r, container));
}

loadFavorites();
