function initializeCustomSelects() {
  const selects = document.querySelectorAll(".custom-select");

  selects.forEach((select) => {
    const optionsList = select.nextElementSibling;
    const options = optionsList.querySelectorAll(".custom-option");
    const selectedText = select.querySelector(".selected-text");
    const icon = select.querySelector(".fa-chevron-down");

    optionsList.id = select.dataset.name + "-options";
    select.setAttribute("aria-controls", optionsList.id);

    function closeSelect() {
      optionsList.classList.add("hidden");
      select.setAttribute("aria-expanded", "false");
      if (icon) icon.style.transform = "rotate(0deg)";
    }

    function closeOtherSelects() {
      selects.forEach((otherSelect) => {
        if (otherSelect !== select) {
          otherSelect.nextElementSibling.classList.add("hidden");
          otherSelect.setAttribute("aria-expanded", "false");
          const otherIcon = otherSelect.querySelector(".fa-chevron-down");
          if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
        }
      });
    }

    function chooseOption(option) {
      select.dataset.value = option.dataset.value;
      selectedText.textContent = option.dataset.value;
      selectedText.classList.remove(
        "text-slate-400",
        "text-slate-500",
        "dark:text-slate-400",
      );
      selectedText.classList.add("text-slate-800", "dark:text-white");
      select.classList.remove("border-red-500");
      select.setAttribute("aria-invalid", "false");

      options.forEach((selectOption) => {
        const isSelected = selectOption === option;
        selectOption.setAttribute("aria-selected", String(isSelected));
        selectOption.classList.toggle("bg-primary/10", isSelected);
      });

      const error = select
        .closest(".custom-select-wrapper")
        .querySelector(".error-message");
      if (error) error.remove();

      closeSelect();
      select.focus();
    }

    select.addEventListener("click", () => {
      if (select.getAttribute("aria-expanded") === "true") {
        closeSelect();
      } else {
        closeOtherSelects();
        optionsList.classList.remove("hidden");
        select.setAttribute("aria-expanded", "true");
        if (icon) icon.style.transform = "rotate(180deg)";
      }
    });

    select.addEventListener("keydown", (event) => {
      if (
        event.key === "ArrowDown" ||
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        closeOtherSelects();
        optionsList.classList.remove("hidden");
        select.setAttribute("aria-expanded", "true");
        if (icon) icon.style.transform = "rotate(180deg)";
        if (options.length > 0) options[0].focus();
      } else if (event.key === "Escape") {
        closeSelect();
      }
    });

    options.forEach((option, index) => {
      option.setAttribute("tabindex", "-1");
      option.setAttribute("aria-selected", "false");

      option.addEventListener("click", () => {
        chooseOption(option);
      });

      option.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          chooseOption(option);
        } else if (event.key === "Escape") {
          closeSelect();
          select.focus();
        } else if (
          event.key === "ArrowDown" ||
          event.key === "ArrowUp"
        ) {
          event.preventDefault();
          const direction = event.key === "ArrowDown" ? 1 : -1;
          const nextIndex = (index + direction + options.length) % options.length;
          options[nextIndex].focus();
        } else if (event.key === "Home") {
          event.preventDefault();
          options[0].focus();
        } else if (event.key === "End") {
          event.preventDefault();
          options[options.length - 1].focus();
        }
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".custom-select-wrapper")) {
      selects.forEach((select) => {
        select.nextElementSibling.classList.add("hidden");
        select.setAttribute("aria-expanded", "false");
        const icon = select.querySelector(".fa-chevron-down");
        if (icon) icon.style.transform = "rotate(0deg)";
      });
    }
  });
}

function initializeContactForm() {
  const form = document.querySelector("#contact form");
  if (!form) return;

  const nameInput = form.querySelector("#full-name");
  const emailInput = form.querySelector("#email");
  const phoneInput = form.querySelector("#phone");
  const detailsInput = form.querySelector("#project-details");
  const projectType = form.querySelector(
    '.custom-select[data-name="project-type"]',
  );

  function clearError(control) {
    control.classList.remove("border-red-500");
    control.setAttribute("aria-invalid", "false");

    let container = control.parentElement;
    if (control.classList.contains("custom-select")) {
      container = control.closest(".custom-select-wrapper");
    }

    const error = container.querySelector(".error-message");
    if (error) error.remove();
  }

  function showError(control, message) {
    control.classList.add("border-red-500");
    control.setAttribute("aria-invalid", "true");

    let container = control.parentElement;
    if (control.classList.contains("custom-select")) {
      container = control.closest(".custom-select-wrapper");
    }

    const error = document.createElement("p");
    error.className = "error-message text-red-400 text-sm mt-1";
    error.setAttribute("role", "alert");
    error.textContent = message;
    container.appendChild(error);
  }

  [nameInput, emailInput, phoneInput, detailsInput].forEach((input) => {
    input.setAttribute("aria-invalid", "false");
    input.addEventListener("input", () => clearError(input));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    form.querySelectorAll(".error-message").forEach((error) => {
      error.remove();
    });

    [nameInput, emailInput, phoneInput, detailsInput, projectType].forEach(
      (control) => {
        control.classList.remove("border-red-500");
        control.setAttribute("aria-invalid", "false");
      },
    );

    let isValid = true;
    let firstInvalidControl = null;

    function validate(control, valid, message) {
      if (valid) return;

      showError(control, message);
      isValid = false;
      if (!firstInvalidControl) firstInvalidControl = control;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const phoneDigits = phone.replace(/\D/g, "");
    const details = detailsInput.value.trim();

    validate(nameInput, name.length > 0, "يرجى إدخال الاسم الكامل");
    validate(
      emailInput,
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      email.length > 0
        ? "يرجى إدخال بريد إلكتروني صحيح"
        : "يرجى إدخال البريد الإلكتروني",
    );
    validate(
      phoneInput,
      phone.length === 0 ||
        (/^[+()\d.\s-]+$/.test(phone) &&
          phoneDigits.length >= 7 &&
          phoneDigits.length <= 15),
      "يرجى إدخال رقم هاتف صحيح",
    );
    validate(
      projectType,
      Boolean(projectType.dataset.value),
      "يرجى اختيار نوع المشروع",
    );
    validate(
      detailsInput,
      details.length >= 10,
      details.length > 0
        ? "يرجى إدخال المزيد من التفاصيل (10 أحرف على الأقل)"
        : "يرجى إدخال تفاصيل المشروع",
    );

    if (!isValid) {
      firstInvalidControl.focus();
      return;
    }

    showContactSuccess();
    form.reset();
    resetCustomSelects(form);
  });
}

function resetCustomSelects(form) {
  form.querySelectorAll(".custom-select").forEach((select) => {
    select.dataset.value = "";
    select.setAttribute("aria-expanded", "false");
    select.setAttribute("aria-invalid", "false");
    select.classList.remove("border-red-500");

    const selectedText = select.querySelector(".selected-text");
    selectedText.textContent =
      select.dataset.name === "project-type"
        ? "اختر نوع المشروع"
        : "اختر الميزانية";
    selectedText.classList.add("text-slate-500", "dark:text-slate-400");
    selectedText.classList.remove("text-slate-800", "dark:text-white");

    select.nextElementSibling.classList.add("hidden");
    select.nextElementSibling
      .querySelectorAll(".custom-option")
      .forEach((option) => {
        option.setAttribute("aria-selected", "false");
        option.classList.remove("bg-primary/10");
      });

    const icon = select.querySelector(".fa-chevron-down");
    if (icon) icon.style.transform = "rotate(0deg)";
  });
}

function showContactSuccess() {
  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 flex items-center justify-center z-[70] bg-slate-950/80 backdrop-blur-sm";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "contact-success-title");
  overlay.innerHTML = `
    <div class="bg-slate-800 rounded-2xl p-8 max-w-md mx-4 text-center border border-slate-700 shadow-2xl">
      <div class="w-20 h-20 bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="fa-solid fa-check text-4xl text-white" aria-hidden="true"></i>
      </div>
      <h3 id="contact-success-title" class="text-2xl font-bold mb-3">تم إرسال رسالتك بنجاح!</h3>
      <p class="text-slate-400 mb-6">شكراً لتواصلك. سأرد عليك في أقرب وقت ممكن.</p>
      <button type="button" class="success-popup-close bg-linear-to-r from-primary to-secondary px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300">حسناً</button>
    </div>`;

  const closeButton = overlay.querySelector(".success-popup-close");
  let timeoutId;

  function closePopup() {
    document.removeEventListener("keydown", handleEscape);
    window.clearTimeout(timeoutId);
    overlay.remove();
  }

  function handleEscape(event) {
    if (event.key === "Escape") closePopup();
  }

  document.body.appendChild(overlay);
  closeButton.addEventListener("click", closePopup);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closePopup();
  });
  document.addEventListener("keydown", handleEscape);
  closeButton.focus();
  timeoutId = window.setTimeout(closePopup, 5000);
}

initializeCustomSelects();
initializeContactForm();
