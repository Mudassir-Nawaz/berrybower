const { Autoplay } = require("swiper/modules");

document.addEventListener("DOMContentLoaded", function () {
  const dropdownButton = document.getElementById("dropdown-button");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const menuToggle = document.querySelector(
    '[data-collapse-toggle="mobile-menu-2"]'
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

  // Menu function
  menuToggle.addEventListener("click", function () {
    // Toggle the 'show' class on the mobile menu
    mobileMenu.classList.toggle("hidden");

    // Toggle the SVG icons
    const openIcon = menuToggle.querySelector("svg:first-of-type"); // Open icon
    const closeIcon = menuToggle.querySelector("svg:last-of-type"); // Close icon
    openIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");

    // Check the display of the mobile menu and update header style
    if (window.getComputedStyle(mobileMenu).display === "block") {
      header.style.backdropFilter = "blur(16px)";
    } else {
      // Only remove the backdrop filter if the scroll position is not greater than 50
      if (window.scrollY <= 50) {
        header.style.backdropFilter = "none";
      } else {
        // Keep the blur if scrolled more than 50
        updateHeaderStyle();
      }
    }
  });

  // Function to update the header style based on scroll position
  function updateHeaderStyle() {
    const header = document.querySelector("header");

    // Apply blur if scrolled more than 50 pixels
    if (window.scrollY > 50) {
      header.style.backdropFilter = "blur(16px)";
    } else {
      header.style.backdropFilter = "none";
    }
  }

  // Event listener for scroll
  window.addEventListener("scroll", updateHeaderStyle);

  // Check scroll position on page load
  window.addEventListener("load", updateHeaderStyle);

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
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
    },
  });

  var heroSwiper = new Swiper(".heroSwiper", {
    loop: true,
    autoplay: {
      delay: 5000,
    },
  });

  // tilt.js init
  VanillaTilt.init(document.querySelectorAll(".animated"), {
    max: 5,
    speed: 50,
    glare: true,
    "max-glare": 0.2,
    reset: true,
  });

  // aos.js init
  AOS.init();
});
