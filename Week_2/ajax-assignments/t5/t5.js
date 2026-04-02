const table = document.querySelector("table");
const dialog = document.querySelector("dialog");

async function fetchData(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Error: " + res.status);
    }

    return await res.json();
  }catch (error) {
    console.error(error);
    alert("Failed to load data");
  }
}

async function loadRestaurants() {
  const restaurants = await fetchData("https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants");

  restaurants.forEach(function(item) {
    const tr = document.createElement("tr");
    const name = document.createElement("td");
    const address = document.createElement("td");

    name.textContent = item.name;
    address.textContent = item.address;

    tr.append(name, address);
    table.appendChild(tr);

    tr.addEventListener("click", function () {
      handleRestaurantClick(tr, item);
    });
  });
}

loadRestaurants();

async function handleRestaurantClick(tr, item) {

  table.querySelectorAll("tr").forEach(row => row.classList.remove("highlight"));
  tr.classList.add("highlight");

  dialog.innerHTML = "";

  const r = document.createElement("p");
  r.textContent = "Restaurant name: " + item.name;

  const a = document.createElement("p");
  a.textContent = "Address: " + item.address;

  const pc = document.createElement("p");
  pc.textContent = "Postal code: " + item.postalCode;

  const city = document.createElement("p");
  city.textContent = "City: " + item.city;

  const phone = document.createElement("p");
  phone.textContent = "Phone: " + item.phone;

  const company = document.createElement("p");
  company.textContent = "Company: " + item.company;

  dialog.append(r, a, pc, city, phone, company);

  try {
    const menuData = await fetchData(
      `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${item._id}/fi`
    );

    const menuTitle = document.createElement("h3");
    menuTitle.textContent = "Today's Menu";

    dialog.append(menuTitle);

    if (menuData.courses.length === 0) {
      const noMenu = document.createElement("p");
      noMenu.textContent = "No menu available today.";
      dialog.append(noMenu);
    } else {
      menuData.courses.forEach(course => {
        const dish = document.createElement("p");
        dish.textContent = course.name + " - " + course.price;
        dialog.append(dish);
      });
    }

  } catch (error) {
    const err = document.createElement("p");
    err.textContent = "Failed to load menu.";
    dialog.append(err);
  }

  dialog.showModal();
}