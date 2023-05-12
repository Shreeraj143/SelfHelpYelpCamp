let title = document.getElementById("title");
let hill1 = document.getElementById("hill1");
let hill4 = document.getElementById("hill4");
let hill2 = document.getElementById("hill2");
let hill5 = document.getElementById("hill5");
let leaf = document.getElementById("leaf");
let navLinks = document.querySelectorAll(".nav-links");
let navToggle = document.querySelector("#nav-toggle");
let linksContainer = document.querySelector("#links-container");

window.addEventListener("scroll", (e) => {
  let value = window.scrollY;

  title.style.marginTop = value * 2.5 + "px";
  leaf.style.bottom = value * 1.5 + "px";
  leaf.style.left = value * 1.5 + "px";
  hill1.style.top = value * 1.1 + "px";
  hill5.style.left = value * 1.5 + "px";
  hill4.style.left = value * -1.5 + "px";
});

// Remove active class
const changeActiveClass = () => {
  navLinks.forEach((item) => {
    item.classList.remove("active");
  });
};

navLinks.forEach((item) => {
  item.addEventListener("click", () => {
    changeActiveClass();
    item.classList.add("active");
  });
});

// Navbar Toggle
navToggle.addEventListener("click", () => {
  linksContainer.classList.toggle("active");
});
