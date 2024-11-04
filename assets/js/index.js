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
    div.classList.add("pickup-menu");
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
const startAutoScroll = async () => {
  const scrollSpeed = 2;
  scrollInterval = setInterval(() => {
    if (isAutoScroll) {
      pickupMenusContainer.scrollLeft += scrollSpeed;
      if (pickupMenusContainer.scrollLeft == pickupMenusContainer.clientWidth) {
        isAutoScroll = false;
        pickupMenusContainer.scrollLeft = 0;
      }
    }
  }, 50);
}

const stopAutoScroll = () => {
  isAutoScroll = false;
  clearInterval(scrollInterval);
}

// For mouse devices
pickupMenusContainer.addEventListener("mouseover", stopAutoScroll);
pickupMenusContainer.addEventListener("mouseout", startAutoScroll);

// For touch devices
pickupMenusContainer.addEventListener("touchstart", stopAutoScroll);
pickupMenusContainer.addEventListener("touchend", startAutoScroll);


const body = document.getElementsByTagName("body")[0];


const displayContents = async () => {
  window.addEventListener('load', () => {
    const logoOverlay = document.getElementById('logo-overlay');
    const mainContent = document.getElementById('main-content');
    logoOverlay.addEventListener('animationend', () => {
      mainContent.style.display = 'block';
    });
  });
}


const render = async () => {
  await renderContents();
  await displayContents();
  // wait two seconds before starting auto scroll
  await new Promise(resolve => setTimeout(resolve, 1300));
  await startAutoScroll();
}

render();


