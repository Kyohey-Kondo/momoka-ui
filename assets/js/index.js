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


const renderContents = async () => {
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


let isAutoScroll = true;
let scrollInterval;
const pickupMenusContainer = document.getElementById("pickup-menus");
const startAutoScroll = () => {
  const scrollSpeed = 2;
  // auto scroll peroiodically
  scrollInterval = setInterval(() => {
    if (isAutoScroll) {
      pickupMenusContainer.scrollLeft += scrollSpeed;
      if (pickupMenusContainer.scrollLeft + pickupMenusContainer.clientWidth >= pickupMenusContainer.scrollWidth) {
        pickupMenusContainer.scrollLeft = 0;
      }
    }
  }, 50);
}

const stopAutoScroll = () => {
  isAutoScroll = false;
  clearInterval(scrollInterval);
}

pickupMenusContainer.addEventListener("mouseover", stopAutoScroll);
pickupMenusContainer.addEventListener("mouseout", startAutoScroll);

const render = async () => {
  await renderContents();
  startAutoScroll();
}

render();


