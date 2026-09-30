scrollToTopBtn.addEventListener("click", () => {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

themeToggleBtn.addEventListener("click", (e) => {
  const isDark = toggleDarkMode.classList.toggle("dark");
  e.target.setAttribute(
    "aria-pressed",
    e.target.getAttribute("aria-pressed") === "true" ? "false" : "true",
  );
  pageData.pageTheme = isDark ? "dark" : "light";
  memory();
});

settingsToggleBtn.addEventListener("click", () => {
  toggleSettingsBar();
});

closeSettingsBtn.addEventListener("click", () => {
  toggleSettingsBar();
});

nextTestimonial.addEventListener("click", () => {
  if (currentCarouselIndex < carouselIndicators.length - 1) {
    currentCarouselIndex++;
    carouselUpdate(currentCarouselIndex);
  }
});

prevTestimonial.addEventListener("click", () => {
  if (currentCarouselIndex > 0) {
    currentCarouselIndex--;
    carouselUpdate(currentCarouselIndex);
  }
});

chooseColorBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    chooseColorBtn.forEach((btn) => {
      btn.classList.remove(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900",
      );
    });
    let target = e.currentTarget;
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
    portfolioFilterBtns.forEach((btn) => {
      btn.classList.remove("active");
      btn.classList.remove(
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
      );
    });
    e.currentTarget.classList.add("active");
    e.currentTarget.classList.add(
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
    );
  });
});

carouselIndicators.forEach((indicator) => {
  indicator.addEventListener("click", (e) => {
    let index = Number(e.currentTarget.getAttribute("data-index"));
    currentCarouselIndex = index;
    carouselUpdate(index);
  });
});

fontOption.forEach((item) => {
  item.addEventListener("click", () => {
    fontOption.forEach((el) => {
      el.classList.remove("active");
      el.classList.remove("border-primary");
      el.classList.add("border-slate-200", "dark:border-slate-700");
      el.setAttribute("aria-checked", "false");
    });
    item.classList.add("active");
    item.classList.add("border-primary");
    item.classList.remove("border-slate-200", "dark:border-slate-700");
    item.setAttribute("aria-checked", "true");

    const newFont = "font-" + item.dataset.font;
    document.body.classList.replace(pageData.pageFontName, newFont);
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
