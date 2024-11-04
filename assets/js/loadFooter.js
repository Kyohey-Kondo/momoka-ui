const loadFooter = async () => {
  const res = await fetch("components/footer.html");
  const data = await res.text();
  document.getElementById("footer").innerHTML = data;
};
document.addEventListener("DOMContentLoaded", () => {
  loadFooter();
});
