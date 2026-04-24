const API_URL = "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants";
const params = new URLSearchParams(window.location.search);
const restaurantId = params.get("id");

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function updateFavBtn(btn, isFaved) {
  if (isFaved) {
    btn.classList.add("faved");
    btn.innerHTML = "&#9733; Remove from Favorites";
  } else {
    btn.classList.remove("faved");
    btn.innerHTML = "&#9734; Add to Favorites";
  }
}

async function loadRestaurant() {
  const response = await fetch(`${API_URL}/${restaurantId}`);
  const r = await response.json();

  document.title = r.name;
  document.getElementById("detailName").textContent = r.name;
  document.getElementById("detailAddress").textContent = r.address;
  document.getElementById("detailCity").textContent = r.city;
  document.getElementById("detailCompany").textContent = r.company;

  const favBtn = document.getElementById("favBtn");
  updateFavBtn(favBtn, getFavorites().includes(r._id));

  favBtn.addEventListener("click", () => {
    toggleFavorite(r._id);
    updateFavBtn(favBtn, getFavorites().includes(r._id));
  });
}

loadRestaurant();
