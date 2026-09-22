// ================= HTML Elements ================= //
const totalNum = document.getElementById("totalNum");
const totalContactsNum = document.getElementById("totalContactsNum");
const favoritesNum = document.getElementById("favoritesNum");
const emergencyNum = document.getElementById("emergencyNum");
const contactContainer = document.getElementById("contactContainer");
const emptyContact = document.getElementById("emptyContact");
const emergencyContact = document.getElementById("emergencyContact");
const favoritesContact = document.getElementById("favoritesContact");

// ================= Stats Rendering ================= //
function updateStatsNums() {
  totalNum.innerText = contactsList.length;
  totalContactsNum.innerText = contactsList.length;
  var favorites = 0;
  var emergency = 0;

  contactsList.map((value) => {
    if (value.isFavorite) {
      favorites++;
    }
    if (value.isEmergency) {
      emergency++;
    }
  });

  favoritesNum.innerText = favorites;
  emergencyNum.innerText = emergency;
}

// ================= Card Render Templates ================= //
function renderContactCard(value, index) {
  contactContainer.innerHTML += `
    <div class="col-md-6">
      <div class="card rounded-4 text-start">
        <div class="card-body">
          <div class="d-flex gap-3 align-items-center mb-3">
            <div class="card-icon position-relative text-white bg-info rounded-4 fw-bolder fs-3 d-flex justify-content-center align-items-center">
              <div class="${!value.isFavorite ? "d-none" : ""} position-absolute top-0 end-0 rounded-circle text-warning fs-9 mini-badge mini-badge-1 border border-1 border-white text-white bg-warning">
                <i class="fa-solid fa-star"></i>
              </div>
              ${value.name[0].toUpperCase()}
              <div class="${!value.isEmergency ? "d-none" : ""} position-absolute bottom-0 end-0 rounded-circle text-warning fs-9 mini-badge mini-badge-2 border border-1 border-white text-white">
                <i class="fa-solid fa-heart-pulse"></i>
              </div>
            </div>
            <div>
              <h4 class="card-title fs-6 fw-semibold">${value.name}</h4>
              <p class="card-text text-secondary fs-7 d-flex align-items-center gap-1">
                <span class='card-body-icon card-body-icon-3'>
                <i class="fa-solid fa-phone"></i>
                </span>
                ${value.number}
              </p>
            </div>
          </div>
          <div class="fs-7 d-flex align-items-center gap-1 mb-2">
            <span class='card-body-icon card-body-icon-2'><i class="fa-solid fa-envelope"></i></span>
            <span class='text-secondary'>${value.email}</span>
          </div>
          <div class="fs-7 d-flex align-items-center gap-1 mb-2">
            <span class='card-body-icon card-body-icon-1'><i class="fa-solid fa-location-dot"></i></span>
            <span class='text-secondary'>${value.address}</span>
          </div>
          <span class="badge bg-primary bg-opacity-75 fs-8">${value.group}</span>
          <span class="badge ms-1 isEmergency ${!value.isEmergency ? "d-none" : ""} fs-8">
            <i class="fa-solid fa-heart-pulse"></i> Emergency
          </span>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
          <div class="d-flex gap-2">
            <a href="tel:${value.number}">
              <i class="fa-solid fa-phone"></i>
            </a>
            <a href="mailto:${value.email}">
              <i class="fa-solid fa-envelope"></i>
            </a>
          </div>
          <div class="d-flex gap-2">
            <button onclick="addToFavoriteContact(${index})" class="btn ${value.isFavorite ? "isFavorite text-warning" : ""}">
              <i class="${value.isFavorite ? "fa-solid" : "fa-regular"} fa-star"></i>
            </button>
            <button onclick="addToEmergencyContact(${index})" class="btn ${value.isEmergency ? "isEmergency" : ""}">
              <i class="${value.isEmergency ? "fa-solid fa-heart-pulse" : "fa-regular fa-heart"}"></i>
            </button>
            <button onclick="setUpdate(${index})" class="btn">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button onclick="deleteContact(${index})" class="btn">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderFavoriteMiniCard(value) {
  favoritesContact.innerHTML += `
    <div class="mini-card mini-card-favorite w-100 p-2 rounded-3 d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center gap-2">
        <div class="card-icon-mini text-white bg-info rounded-3 fw-bolder fs-3 d-flex justify-content-center align-items-center">
          ${value.name[0].toUpperCase()}
        </div>
        <div>
          <h4 class="m-0 fs-8 fs-md-7">${value.name}</h4>
          <p class="m-0 fw-light text-secondary fs-8">${value.number}</p>
        </div>
      </div>
      <a href="tel:${value.number}">
        <i class="fa-solid fa-phone fs-9 fs-md-8"></i>
      </a>
    </div>
  `;
}

function renderEmergencyMiniCard(value) {
  emergencyContact.innerHTML += `
    <div class="mini-card mini-card-emergency w-100 p-2 rounded-3 d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center gap-2">
        <div class="card-icon-mini text-white bg-info rounded-3 fw-bolder fs-3 d-flex justify-content-center align-items-center">
          ${value.name[0].toUpperCase()}
        </div>
        <div>
          <h4 class="m-0 fs-8 fs-md-7">${value.name}</h4>
          <p class="m-0 fw-light text-secondary fs-8">${value.number}</p>
        </div>
      </div>
      <a href="tel:${value.number}">
        <i class="fa-solid fa-phone fs-9 fs-md-8"></i>
      </a>
    </div>
  `;
}

// ================= Section Render Functions ================= //
function renderContactsList() {
  contactContainer.innerHTML = "";
  contactsList.map((value, idx) => {
    renderContactCard(value, idx);
  });
}

function renderFavoritesList() {
  const favorites = contactsList.filter((contact) => contact.isFavorite);
  const emptyEl = document.getElementById("empty-favorites");
  favoritesContact.innerHTML = "";

  if (!favorites.length) {
    emptyEl.classList.remove("d-none");
    return;
  }
  emptyEl.classList.add("d-none");

  contactsList.map((value) => {
    if (value.isFavorite) {
      renderFavoriteMiniCard(value);
    }
  });
}

function renderEmergencysList() {
  const emergency = contactsList.filter((contact) => contact.isEmergency);
  const emptyEl = document.getElementById("empty-emergency");
  emergencyContact.innerHTML = "";

  if (!emergency.length) {
    emptyEl.classList.remove("d-none");
    return;
  }
  emptyEl.classList.add("d-none");

  contactsList.map((value) => {
    if (value.isEmergency) {
      renderEmergencyMiniCard(value);
    }
  });
}

// ================= Master Render Function ================= //
function mainRender() {
  renderContactsList();
  renderFavoritesList();
  renderEmergencysList();
}
