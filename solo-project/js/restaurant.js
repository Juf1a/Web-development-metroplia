const API_BASE = "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants";

const params = new URLSearchParams(window.location.search);
const restaurantId = params.get("id");
// remember which tab the user had open last time
let currentView = localStorage.getItem("menuView") || "today";

function updateFavBtn(btn, isFaved) {
  if (isFaved) {
    btn.classList.add("faved");
    btn.innerHTML = "&#9733; Remove from Favorites";
  } else {
    btn.classList.remove("faved");
    btn.innerHTML = "&#9734; Add to Favorites";
  }
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

function renderCourses(courses) {
  if (!courses || courses.length === 0) {
    return '<p class="empty-msg">No courses listed for this day.</p>';
  }
  return courses.map(c => {
    const name = c.name || c.fi || c.en || "Unknown dish";
    const price = c.price ? `<span class="menu-item-price">${c.price}</span>` : "";
    const diets = c.diets ? `<span class="menu-item-diets">${c.diets}</span>` : "";
    return `
      <div class="menu-item">
        <span class="menu-item-name">${name}</span>
        ${price}
        ${diets}
      </div>
    `;
  }).join("");
}

async function loadDailyMenu() {
  const content = document.getElementById("menuContent");
  content.innerHTML = '<p class="empty-msg">Loading...</p>';

  try {
    // /fi gives current week's data, /en returns next week for some reason
    const res = await fetch(`${API_BASE}/daily/${restaurantId}/fi`);
    if (!res.ok) throw new Error();
    const data = await res.json();

    const courses = Array.isArray(data) ? data : (data.courses || []);
    content.innerHTML = `<div class="menu-day">${renderCourses(courses)}</div>`;
  } catch {
    content.innerHTML = '<p class="empty-msg">No menu available for today.</p>';
  }
}

async function loadWeeklyMenu() {
  const content = document.getElementById("menuContent");
  content.innerHTML = '<p class="empty-msg">Loading...</p>';

  try {
    const res = await fetch(`${API_BASE}/weekly/${restaurantId}/fi`);
    if (!res.ok) throw new Error();
    const data = await res.json();

    const days = data.days || (Array.isArray(data) ? data : []);
    if (days.length === 0) {
      content.innerHTML = '<p class="empty-msg">No weekly menu available.</p>';
      return;
    }

    content.innerHTML = days.map(day => `
      <div class="menu-day">
        <h4 class="menu-day-title">${formatDate(day.date || "")}</h4>
        ${renderCourses(day.courses || [])}
      </div>
    `).join("");
  } catch {
    content.innerHTML = '<p class="empty-msg">No weekly menu available.</p>';
  }
}

function setView(view) {
  currentView = view;
  localStorage.setItem("menuView", view);

  document.querySelectorAll(".menu-toggle button").forEach(btn => {
    const isToday = btn.textContent.trim() === "Today";
    btn.classList.toggle("active", view === "today" ? isToday : !isToday);
  });

  if (view === "today") {
    loadDailyMenu();
  } else {
    loadWeeklyMenu();
  }
}

async function loadRestaurant() {
  const response = await fetch(`${API_BASE}/${restaurantId}`);
  const r = await response.json();

  document.title = r.name;
  document.getElementById("detailName").textContent = r.name;
  document.getElementById("detailAddress").textContent = r.address;
  document.getElementById("detailCity").textContent = r.city;
  document.getElementById("detailCompany").textContent = r.company;

  const favBtn = document.getElementById("favBtn");

  if (getCurrentUser()) {
    favBtn.style.display = "";
    updateFavBtn(favBtn, getFavorites().includes(r._id));
    favBtn.addEventListener("click", () => {
      toggleFavorite(r._id);
      updateFavBtn(favBtn, getFavorites().includes(r._id));
    });
  }

  // API returns GeoJSON coords as [lng, lat], leaflet wants [lat, lng]
  const coords = r.location && r.location.coordinates;
  if (coords && coords.length === 2) {
    const lat = coords[1];
    const lng = coords[0];
    const detailMap = L.map("map", { zoomControl: true, scrollWheelZoom: false }).setView([lat, lng], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(detailMap);
    L.marker([lat, lng]).addTo(detailMap).bindPopup(r.name).openPopup();
  }

  document.querySelectorAll(".menu-toggle button").forEach(btn => {
    btn.addEventListener("click", () => {
      setView(btn.textContent.trim() === "Today" ? "today" : "week");
    });
  });

  setView(currentView);
}

loadRestaurant();
