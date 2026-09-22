// I didn’t include the image because it’s not important, so I skipped it.
// and it doesn’t work anyway :) .

// ================= HTML Elements ================= //
const name = document.getElementById("name");
const emsgName = document.getElementById("emsgName");
const number = document.getElementById("number");
const emsgNumber = document.getElementById("emsgNumber");
const email = document.getElementById("email");
const emsgEmail = document.getElementById("emsgEmail");
const address = document.getElementById("address");
const group = document.getElementById("group");
const notes = document.getElementById("notes");
const isFavorite = document.getElementById("isFavorite");
const isEmergency = document.getElementById("isEmergency");
const model = document.getElementById("model");
const addContactBtn = document.getElementById("addContactBtn");
const updateContactBtn = document.getElementById("updateContactBtn");

// ================= Global Variables ================= //
let contactsList = [];
let editContactIndex;

if (localStorage.contactsList) {
  contactsList = JSON.parse(localStorage.contactsList);
}

// ================= LocalStorage Helpers ================= //
function memory(data) {
  localStorage.contactsList = JSON.stringify(data);
}

// ================= Form Input Helpers ================= //
function setInputsValus(values = {}) {
  name.value = values.name ?? "";
  number.value = values.number ?? "";
  email.value = values.email ?? "";
  address.value = values.address ?? "";
  group.value = values.group ?? "";
  notes.value = values.notes ?? "";

  isFavorite.checked = !!values.isFavorite;
  isEmergency.checked = !!values.isEmergency;
}

// ================= Modal Functions ================= //
function toggleModel(value) {
  if (value == "open") {
    model.classList.remove("d-none");
  } else {
    model.classList.add("d-none");
  }
}

// ================= Contact Operations ================= //
function addContact() {
  if (validateِAddContactValues() === 0) return;
  let contact = {
    name: name.value.trim(),
    number: number.value,
    email: email.value.trim(),
    address: address.value.trim(),
    group: group.value.trim(),
    notes: notes.value.trim(),
    isFavorite: isFavorite.checked,
    isEmergency: isEmergency.checked,
  };
  contactsList.push(contact);
  mainProsess("Added", "Contact has been added successfully");
}

function setUpdate(idx) {
  setInputsValus(contactsList[idx]);
  toggleModel("open");
  editContactIndex = idx;
  addContactBtn.classList.add("d-none");
  updateContactBtn.classList.remove("d-none");
}

function updateContact() {
  if (validateِAddContactValues() === 0) return;
  let contact = {
    name: name.value.trim(),
    number: number.value,
    email: email.value.trim(),
    address: address.value.trim(),
    group: group.value.trim(),
    notes: notes.value.trim(),
    isFavorite: isFavorite.checked,
    isEmergency: isEmergency.checked,
  };
  contactsList.splice(editContactIndex, 1, contact);
  mainProsess("Updated!", "Contact has been updated successfully.");
  addContactBtn.classList.remove("d-none");
  updateContactBtn.classList.add("d-none");
}

function deleteContact(index) {
  Swal.fire({
    icon: "warning",
    title: "Delete Contact?",
    text: "Are you sure you want to delete Gray Sanford? This action cannot be undone.",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    confirmButtonColor: "red",
  }).then((result) => {
    if (result.isConfirmed) {
      contactsList.splice(index, 1);
      mainProsess();
      Swal.fire("Deleted!", "Contact has been deleted.", "success");
    } else return;
  });
}

function addToFavoriteContact(idx) {
  contactsList[idx].isFavorite = !contactsList[idx].isFavorite;
  mainProsess();
}

function addToEmergencyContact(idx) {
  contactsList[idx].isEmergency = !contactsList[idx].isEmergency;
  mainProsess();
}

// ================= Search Function ================= //
function search(value) {
  contactContainer.innerHTML = "";
  contactsList.map((item, idx) => {
    if (
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.number.includes(value.toLowerCase()) ||
      item.email.toLowerCase().includes(value.toLowerCase())
    ) {
      renderContactCard(item, idx);
    }
  });
}

// ================= Alert & Main Process ================= //
function successAlert(title, message) {
  Swal.fire({
    icon: "success",
    title: title,
    text: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

function mainProsess(title, message) {
  memory(contactsList);
  updateStatsNums();
  validateIsContactList();
  mainRender();
  setInputsValus();
  toggleModel("close");
  if (title && message) {
    successAlert(title, message);
  }
}

// ================= App Initialization ================= //
(function () {
  updateStatsNums();
  validateIsContactList();
  mainRender();
})();
