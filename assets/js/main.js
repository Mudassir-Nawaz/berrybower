document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(
    '[data-collapse-toggle="mobile-menu-2"]'
  );
  const mobileMenu = document.getElementById("mobile-menu-2");
  const header = document.getElementById("header");
  const sidebarContainer = document.querySelector(".sidebar-container");
  const sidebarToggle = document.querySelector(".open-sidebar");
  const overlay = document.querySelector(".mobile-menu-overlay");
  const dialogue = document.getElementById("dialogue");
  const dialogueOpener = document.getElementById("openDialogue");
  const dialogueCloser = document.getElementById("closeDialogue");
  const scrollSection = document.getElementById("codeSection");
  let scrollInterval;

  // Menu function
  menuToggle.addEventListener("click", function () {
    // Toggle the 'show' class on the mobile menu
    mobileMenu.classList.toggle("hidden");
    // When the menu is open, we want to prevent the body from scrolling
    document.body.classList.toggle("overflow-hidden");
    document.body.classList.toggle("md:overflow-auto");

    // Toggle the SVG icons
    const openIcon = menuToggle.querySelector("svg:first-of-type"); // Open icon
    const closeIcon = menuToggle.querySelector("svg:last-of-type"); // Close icon
    openIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");

    // Check the display of the mobile menu and update header style
    if (window.getComputedStyle(mobileMenu).display === "block") {
      header.classList.add('backdrop-blur-lg');
    } else {
      // Only remove the backdrop filter if the scroll position is not greater than 50
      if (window.scrollY <= 50) {
        header.classList.remove('backdrop-blur-lg');
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
      header.classList.add('backdrop-blur-lg');
    } else {
      header.classList.remove('backdrop-blur-lg');
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

  var blogSwiper = new Swiper(".blogSwiper", {
    pagination: {
      el: ".swiper-pagination",
    },
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });

  // tilt.js init
  VanillaTilt.init(document.querySelectorAll(".animated"), {
    max: 5,
    speed: 50,
    reset: true,
  });

  // aos.js init
  AOS.init();

  
  if (sidebarContainer) {
    // docs page functions
    scrollToActiveItem();
    enableCollapsibles();

    function enableCollapsibles() {
      const buttons = document.querySelectorAll(
        ".hextra-sidebar-collapsible-button"
      );
      buttons.forEach(function (button) {
        button.addEventListener("click", function (e) {
          e.preventDefault();
          const list = button.parentElement.parentElement;
          if (list) {
            list.classList.toggle("open");
          }
        });
      });
    }

    function scrollToActiveItem() {
      const sidebarScrollbar = document.querySelector(
        "aside.sidebar-container > .hextra-scrollbar"
      );
      const activeItems = document.querySelectorAll(".sidebar-active-item");
      const visibleActiveItem = Array.from(activeItems).find(
        function (activeItem) {
          return activeItem.getBoundingClientRect().height > 0;
        }
      );

      if (!visibleActiveItem) {
        return;
      }

      const yOffset = visibleActiveItem.clientHeight;
      const yDistance =
        visibleActiveItem.getBoundingClientRect().top -
        sidebarScrollbar.getBoundingClientRect().top;
      sidebarScrollbar.scrollTo({
        behavior: "instant",
        top: yDistance - yOffset,
      });
    }

    const overlayClasses = [
      "fixed",
      "inset-0",
      "z-10",
      "bg-slate-50",
      "dark:bg-main",
      "opacity-50",
    ];
    overlay.classList.add("bg-transparent");
    overlay.classList.remove("hidden", ...overlayClasses);

    function toggleSidebar() {
      sidebarContainer.classList.toggle(
        "max-md:[transform:translate3d(-100%,0,0)]"
      );
      sidebarContainer.classList.toggle(
        "max-md:[transform:translate3d(0,0,0)]"
      );

      // When the menu is open, we want to prevent the body from scrolling
      document.body.classList.toggle("overflow-hidden");
      document.body.classList.toggle("md:overflow-auto");
    }

    sidebarToggle.addEventListener("click", (e) => {
      e.preventDefault();
      toggleSidebar();

      if (overlay.classList.contains("bg-transparent")) {
        // Show the overlay
        overlay.classList.add(...overlayClasses);
        overlay.classList.remove("bg-transparent");
      } else {
        // Hide the overlay
        overlay.classList.remove(...overlayClasses);
        overlay.classList.add("bg-transparent");
      }
    });

    overlay.addEventListener("click", (e) => {
      e.preventDefault();
      toggleSidebar();

      // Hide the overlay
      overlay.classList.remove(...overlayClasses);
      overlay.classList.add("bg-transparent");
    });
  }

  // Cookies dialogue
  if (dialogue) {
    dialogueOpener.addEventListener("click", () => {
      dialogue.classList.remove("hidden");
      dialogue.classList.add("flex");
      dialogue.classList.remove("opacity-0");
      dialogue.firstElementChild.classList.remove("scale-50");
      dialogue.firstElementChild.classList.add("scale-100");
    });
  
    dialogueCloser.addEventListener("click", () => {
      dialogue.classList.remove("flex");
      dialogue.classList.add("hidden");
    });
  }

  // Code section function
  if (scrollSection) {
    function startAutoScroll() {
      scrollInterval = setInterval(() => {
        scrollSection.scrollTop += 1;
        if (
          scrollSection.scrollTop >=
          scrollSection.scrollHeight - scrollSection.clientHeight
        ) {
          scrollSection.scrollTop = 0;
        }
      }, 70);
    }
    function stopAutoScroll() {
      clearInterval(scrollInterval);
    }
    startAutoScroll();
    scrollSection.addEventListener("mouseenter", stopAutoScroll);
    scrollSection.addEventListener("mouseleave", startAutoScroll);
  }
});
