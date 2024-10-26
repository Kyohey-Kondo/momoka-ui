const loadHeader = async () => {
  const res = await fetch("components/header.html");
  const data = await res.text();
  document.getElementById("header").innerHTML = data;
};
document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
});
