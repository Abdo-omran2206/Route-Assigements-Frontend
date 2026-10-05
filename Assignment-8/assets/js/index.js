const toggleDarkMode = document.querySelector("html");
const themeToggleBtn = document.getElementById("theme-toggle-button");
const settingsToggleBtn = document.getElementById("settings-toggle");
const settingsSidebar = document.getElementById("settings-sidebar");
const closeSettingsBtn = document.getElementById("close-settings");
const fontOption = Array.from(document.querySelectorAll(".font-option"));
const testimonialsCarousel = document.getElementById("testimonials-carousel");
const carouselIndicators = document.querySelectorAll(".carousel-indicator");
const nextTestimonial = document.getElementById("next-testimonial");
const prevTestimonial = document.getElementById("prev-testimonial");
const scrollToTopBtn = document.getElementById("scroll-to-top");
const portfolioFilterBtns = document.querySelectorAll(".portfolio-filter");
const portfolioItem = document.querySelectorAll(".portfolio-item");
const themeColorsGridSection = document.getElementById("theme-colors-grid");
const chooseColorBtn = document.querySelectorAll(".color-btn");
const resetSettingsBtn = document.getElementById("reset-settings");

let currentCarouselIndex = 0;

let pageData;

if (localStorage.getItem("pageData")) {
  pageData = JSON.parse(localStorage.getItem("pageData"));
} else {
  pageData = {
    pageFontName: "font-tajawal",
    pageTheme: "dark",
    pageThemeColor: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#a855f7",
    },
  };
}

function memory() {
  localStorage.setItem("pageData", JSON.stringify(pageData));
}

///////////////////////////////////////////////

window.addEventListener("scroll", () => {
  if (!scrollToTopBtn) return;

  if (window.scrollY > 300) {
    scrollToTopBtn.classList.remove("invisible");
    scrollToTopBtn.classList.replace("opacity-0", "opacity-100");
  } else {
    scrollToTopBtn.classList.add("invisible");
    scrollToTopBtn.classList.replace("opacity-100", "opacity-0");
  }
});

window.addEventListener("scroll", () => {
  let current = "";

  document.querySelectorAll("section[id]").forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-links a[href^='#']").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

////////////////////////////////////

function carouselUpdate(index) {
  if (!testimonialsCarousel || carouselIndicators.length === 0) return;
  const visibleCount =
    window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const maxIndex = Math.max(
    0,
    document.querySelectorAll(".testimonial-card").length - visibleCount,
  );
  index = Math.min(index, maxIndex);
  testimonialsCarousel.style.transform =
    `translateX(${index * (100 / visibleCount)}%)`;

  carouselIndicators.forEach((indicator, indicatorIndex) => {
    indicator.classList.toggle("hidden", indicatorIndex > maxIndex);
    indicator.classList.remove("bg-accent", "active");
    indicator.classList.add("bg-slate-400", "dark:bg-slate-600");
    indicator.setAttribute("aria-selected", "false");
    indicator.setAttribute(
      "tabindex",
      indicatorIndex === index ? "0" : "-1",
    );
  });

  const current = carouselIndicators[index];
  if (current) {
    current.classList.remove("bg-slate-400", "dark:bg-slate-600");
    current.classList.add("bg-accent", "active");
    current.setAttribute("aria-selected", "true");
  }
}

function renderPortfolioItems(value) {
  portfolioItem.forEach((item) => {
    let itemValue = item.getAttribute("data-category");
    if (value == "all") {
      item.classList.remove("opacity-0", "hidden");
      return;
    }
    if (itemValue != value) {
      item.classList.add("opacity-0", "hidden");
    } else {
      item.classList.remove("opacity-0", "hidden");
    }
  });
}

function toggleSettingsBar() {
  settingsSidebar.classList.toggle("translate-x-full");
  settingsToggleBtn.setAttribute(
    "aria-expanded",
    settingsToggleBtn.getAttribute("aria-expanded") == "false"
      ? "true"
      : "false",
  );
  settingsSidebar.setAttribute(
    "aria-hidden",
    settingsSidebar.getAttribute("aria-hidden") == "false" ? "true" : "false",
  );
  settingsToggleBtn.classList.toggle("hidden");
}

function applyColorTheme(primaryColor, secondaryColor, accentColor) {
  document.documentElement.style.setProperty("--color-primary", primaryColor);
  document.documentElement.style.setProperty(
    "--color-secondary",
    secondaryColor,
  );
  document.documentElement.style.setProperty("--color-accent", accentColor);
}

function mainProsses() {
  toggleDarkMode.classList.replace("dark", pageData.pageTheme);

  themeToggleBtn.setAttribute(
    "aria-pressed",
    String(pageData.pageTheme === "dark"),
  );

  applyColorTheme(
    pageData.pageThemeColor.primary,
    pageData.pageThemeColor.secondary,
    pageData.pageThemeColor.accent,
  );

  fontOption.forEach((el) => {
    if ("font-" + el.dataset.font === pageData.pageFontName) {
      el.classList.add("active", "border-primary");
      el.classList.remove("border-slate-200", "dark:border-slate-700");
      el.setAttribute("aria-checked", "true");
    } else {
      el.classList.remove("active", "border-primary");
      el.classList.add("border-slate-200", "dark:border-slate-700");
      el.setAttribute("aria-checked", "false");
    }
  });

  document.body.classList.remove(
    "font-alexandria",
    "font-tajawal",
    "font-cairo",
  );
  document.body.classList.add(pageData.pageFontName);

  chooseColorBtn.forEach((el) => {
    if (el.getAttribute("data-primary") == pageData.pageThemeColor.primary) {
      el.classList.add(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900",
      );
    } else {
      el.classList.remove(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900",
      );
    }
  });
}

(function () {
  mainProsses();
  carouselUpdate(currentCarouselIndex);
})();
