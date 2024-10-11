const { Autoplay } = require("swiper/modules");

document.addEventListener("DOMContentLoaded", function () {
  const dropdownButton = document.getElementById("dropdown-button");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const menuToggle = document.querySelector(
    '[data-collapse-toggle="mobile-menu-2"]',
  );
  const mobileMenu = document.getElementById("mobile-menu-2");
  const header = document.getElementById("header");
  let isDropdownOpen = false;

  // dropdown function
  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
    if (isDropdownOpen) {
      dropdownMenu.classList.remove("hidden");
    } else {
      dropdownMenu.classList.add("hidden");
    }
  }
  dropdownButton.addEventListener("click", toggleDropdown);
  window.addEventListener("click", (event) => {
    if (
      !dropdownButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.add("hidden");
      isDropdownOpen = false;
    }
  });

  // menu function
  menuToggle.addEventListener("click", function () {
    // Toggle the 'show' class on the mobile menu
    mobileMenu.classList.toggle("hidden");

    // Toggle the SVG icons
    const openIcon = menuToggle.querySelector("svg:first-of-type"); // Open icon
    const closeIcon = menuToggle.querySelector("svg:last-of-type"); // Close icon
    openIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");

    if (window.getComputedStyle(mobileMenu).display === "block") {
      header.classList.add("bg-slate-950");
    } else {
      header.classList.remove("bg-slate-950");
    }
  });

  // header background on scroll
  window.addEventListener("scroll", function () {
    const body = document.body;
    const header = document.querySelector("header");
    const nav = document.querySelector("nav");
    const navUl = document.querySelector("nav ul");

    // header background change
    if (window.scrollY > 50) {
      header.classList.add("bg-slate-950");
    }
    if (window.scrollY < 50) {
      header.classList.remove("bg-slate-950");
    }
  });

  // swiper config
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
    },
  });

  var heroSwiper = new Swiper(".heroSwiper", {
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
    },
  });

  // tilt.js init
  VanillaTilt.init(document.querySelectorAll(".animated"), {
		max: 10,
		speed: 100
	});
});
