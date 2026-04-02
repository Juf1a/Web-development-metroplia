export const restaurantRow = (restaurant) => {
  const { name, address } = restaurant;
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${name}</td>
    <td>${address}</td>`;
  return tr;
};

export const restaurantModal = (restaurant, menu) => {
  const { name, address, postalCode, city, phone, company } = restaurant;
  const { courses } = menu;

  const menuHtml = "<ul>" + courses.map(({ name: dishName, price, diets }) => 
    `<li>${dishName}, ${price || "?€"}. ${diets || "No dietary info"}</li>`
  ).join("") + "</ul>";

  return `
    <h1>${name}</h1>
    <p>Address: ${address}</p>
    <p>Postal Code & City: ${postalCode}, ${city}</p>
    <p>Phone: ${phone}</p>
    <p>Company: ${company}</p>
    <h3>Today's Menu</h3>
    ${menuHtml}`;
};
