import { restaurantRow, restaurantModal } from "./components.js";
import { baseUrl } from "./variables.js";
import { fetchData } from "./utils.js";

const table = document.querySelector("table");
const dialog = document.querySelector("dialog");
const filterButtons = document.querySelectorAll(".filter-btn");

let allRestaurants = [];

const filterRestaurants = (filter) => {
  if (filter === "all") {
    return allRestaurants;
  }
  return allRestaurants.filter(restaurant => 
    restaurant.company.toLowerCase() === filter.toLowerCase()
  );
};

const displayRestaurants = (restaurants) => {
  const rows = table.querySelectorAll("tr:not(:first-child)");
  rows.forEach(row => row.remove());

  if (restaurants.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="2" class="message">No data found</td>`;
    table.appendChild(tr);
    return;
  }

  restaurants.forEach(restaurant => {
    const tr = restaurantRow(restaurant);
    
    tr.addEventListener("click", () => {
      table.querySelectorAll("tr").forEach(row => row.classList.remove("highlight"));
      tr.classList.add("highlight");
      handleRestaurantClick(restaurant);
    });
    
    table.appendChild(tr);
  });
};

const handleRestaurantClick = async (restaurant) => {
  dialog.innerHTML = "";

  try {
    const menuData = await fetchData(
      `${baseUrl}/restaurants/daily/${restaurant._id}/fi`
    );

    dialog.innerHTML = restaurantModal(restaurant, menuData);
  } catch (error) {
    dialog.innerHTML = `<p class="message">Failed to load menu. Please try again.</p>`;
  }

  dialog.showModal();
};

const loadRestaurants = async () => {
  try {
    allRestaurants = await fetchData(`${baseUrl}/restaurants`);
    displayRestaurants(allRestaurants);

    filterButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");

        const filter = e.target.dataset.filter;
        const filtered = filterRestaurants(filter);
        displayRestaurants(filtered);
      });
    });

    filterButtons[0].classList.add("active");
  } catch (error) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="2" class="message">Failed to load restaurants</td>`;
    table.appendChild(tr);
  }
};

loadRestaurants();