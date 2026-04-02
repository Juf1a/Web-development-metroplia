import { restaurantRow, restaurantModal } from "./components.js";
import { baseUrl } from "./variables.js";
import { fetchData } from "./utils.js";

const table = document.querySelector("table");
const dialog = document.querySelector("dialog");

const loadRestaurants = async () => {
  const restaurants = await fetchData(`${baseUrl}/restaurants`);

  restaurants.forEach(item => {
    const tr = restaurantRow(item);

    tr.addEventListener("click", () => {
      handleRestaurantClick(tr, item);
    });
    
    table.appendChild(tr);
  });
}

loadRestaurants();

const handleRestaurantClick = async (tr, restaurant) => {

  table.querySelectorAll("tr").forEach(row => row.classList.remove("highlight"));
  tr.classList.add("highlight");

  dialog.innerHTML = "";

  try {
    const menuData = await fetchData(
      `${baseUrl}/restaurants/daily/${restaurant._id}/fi`
    );

    dialog.innerHTML = restaurantModal(restaurant, menuData);

  } catch (error) {
    console.error("Failed to load menu:", error);
    const err = document.createElement("p");
    err.textContent = "Failed to load menu.";
    dialog.append(err);
  }

  dialog.showModal();
}