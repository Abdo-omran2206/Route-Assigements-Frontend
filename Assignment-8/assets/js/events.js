scrollToTopBtn.addEventListener("click", () => {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

themeToggleBtn.addEventListener("click", (e) => {
  const isDark = toggleDarkMode.classList.toggle("dark");
  e.currentTarget.setAttribute("aria-pressed", isDark ? "false" : "true");
  pageData.pageTheme = isDark ? "dark" : "light";
  memory();
});

settingsToggleBtn.addEventListener("click", () => {
  toggleSettingsBar();
});

closeSettingsBtn.addEventListener("click", () => {
  toggleSettingsBar();
});

function getMaximumCarouselIndex() {
  const cards = document.querySelectorAll(".testimonial-card");
  let visibleCount = 3;

  if (window.innerWidth < 640) {
    visibleCount = 1;
  } else if (window.innerWidth < 1024) {
    visibleCount = 2;
  }

  return Math.max(0, cards.length - visibleCount);
}

nextTestimonial.addEventListener("click", () => {
  if (currentCarouselIndex < getMaximumCarouselIndex()) {
    currentCarouselIndex++;
  } else {
    currentCarouselIndex = 0;
  }

  carouselUpdate(currentCarouselIndex);
});

prevTestimonial.addEventListener("click", () => {
  if (currentCarouselIndex > 0) {
    currentCarouselIndex--;
  } else {
    currentCarouselIndex = getMaximumCarouselIndex();
  }

  carouselUpdate(currentCarouselIndex);
});

chooseColorBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    chooseColorBtn.forEach((colorBtn) => {
      colorBtn.classList.remove(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900",
      );
    });

    const target = e.currentTarget;
    target.classList.add(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
    );

    applyColorTheme(
      target.getAttribute("data-primary"),
      target.getAttribute("data-secondary"),
      target.getAttribute("data-accent"),
    );

    pageData.pageThemeColor = {
      primary: target.getAttribute("data-primary"),
      secondary: target.getAttribute("data-secondary"),
      accent: target.getAttribute("data-accent"),
    };

    memory();
  });
});

portfolioFilterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.currentTarget.getAttribute("data-filter");
    renderPortfolioItems(value);

    portfolioFilterBtns.forEach((filterBtn) => {
      filterBtn.classList.remove(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
      );
    });

    e.currentTarget.classList.add(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
    );
  });
});

carouselIndicators.forEach((indicator) => {
  indicator.addEventListener("click", (e) => {
    const index = Number(e.currentTarget.getAttribute("data-index"));

    if (index <= getMaximumCarouselIndex()) {
      currentCarouselIndex = index;
      carouselUpdate(index);
    }
  });
});

let carouselResizeTimer;
window.addEventListener("resize", () => {
  window.clearTimeout(carouselResizeTimer);
  carouselResizeTimer = window.setTimeout(() => {
    currentCarouselIndex = Math.min(
      currentCarouselIndex,
      getMaximumCarouselIndex(),
    );
    carouselUpdate(currentCarouselIndex);
  }, 150);
});

fontOption.forEach((item) => {
  item.addEventListener("click", () => {
    fontOption.forEach((font) => {
      font.classList.remove("active", "border-primary");
      font.classList.add("border-slate-200", "dark:border-slate-700");
      font.setAttribute("aria-checked", "false");
    });

    item.classList.add("active", "border-primary");
    item.classList.remove("border-slate-200", "dark:border-slate-700");
    item.setAttribute("aria-checked", "true");

    const newFont = "font-" + item.dataset.font;
    document.body.classList.remove(
      "font-alexandria",
      "font-tajawal",
      "font-cairo",
    );
    document.body.classList.add(newFont);
    pageData.pageFontName = newFont;
    memory();
  });
});

resetSettingsBtn.addEventListener("click", () => {
  pageData = {
    pageFontName: "font-tajawal",
    pageTheme: pageData.pageTheme,
    pageThemeColor: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#a855f7",
    },
  };

  memory();
  toggleSettingsBar();
  mainProsses();
});

function initializeMobileNavigation() {
  const header = document.getElementById("header");
  const container = header && header.querySelector(".container");
  const navLinks = header && header.querySelector(".nav-links");

  if (!container || !navLinks) return;

  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.id = "mobile-menu-button";
  menuButton.className =
    "mobile-menu-btn lg:hidden text-slate-900 dark:text-white text-2xl focus:outline-none";
  menuButton.setAttribute("aria-label", "فتح القائمة");
  menuButton.setAttribute("aria-controls", "nav-links");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML =
    '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  container.appendChild(menuButton);

  function closeMenu() {
    navLinks.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "فتح القائمة");
    menuButton.querySelector("i").className = "fa-solid fa-bars";
  }

  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "إغلاق القائمة" : "فتح القائمة",
    );
    menuButton.querySelector("i").className = isOpen
      ? "fa-solid fa-times"
      : "fa-solid fa-bars";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("active")) {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) closeMenu();
  });
}

initializeMobileNavigation();
