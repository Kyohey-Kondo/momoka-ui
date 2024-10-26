console.log("index.js loaded");

const fetchMenus = async () => {
  // fetch the menus with headers
  const headers = {
    "X-MICROCMS-API-KEY": "xT2mWfudutj5HeTb5RETSoZNDLJg6nh7qwME",
  }
  const option = {
    headers: headers,
  }
  const res = await fetch("https://momoka.microcms.io/api/v1/menu", option);
  const data = await res.json();
  return data.contents
}


const render = async () => {
  const menus = await fetchMenus();
  const pickupMenus = menus.filter(menu => menu.pickup);
  const pickupMenusContainer = document.getElementById("pickup-menus");
  pickupMenus.forEach(menu => {
    const div = document.createElement("div");
    // add style to div
    div.innerHTML = `
      <img height=300px src="${menu.image.url}" alt="${menu.title}">
      <p>${menu.title}</p>
      <p>${menu.description || ""}</p>
    `;
    pickupMenusContainer.appendChild(div);
  });
}



render();


// const renderPickupMenus = (menus) => {
//   const pickupMenus = menus.filter(menu => menu.pickup);
//   console.log(pickupMenus);
// }


// const menu = await fetchMenus();

