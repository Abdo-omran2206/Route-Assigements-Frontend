// ================= Alert Helpers ================= //
function alertMessages(title, message) {
  Swal.fire({
    icon: "error",
    title: title,
    text: message,
  });
}

// ================= Validation Regex ================= //
const regex = {
  name: /^[A-Z][a-z]+ [A-Z][a-z]+$/,
  number: /^01[0125][0-9]{8}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
};

// ================= Live Field Validator ================= //
function validator(type, value) {
  const isValid = regex[type].test(value);

  const messages = {
    name: emsgName,
    number: emsgNumber,
    email: emsgEmail,
  };

  messages[type].classList.toggle("d-none", isValid);
}

// ================= Form Submission Validator ================= //
function validateِAddContactValues() {
  if (!regex.name.test(name.value)) {
    alertMessages("Missing Name", "Please enter a valid name for the contact!");
    return 0;
  }
  if (number.value.length == 0) {
    alertMessages("Missing Phone", "Please enter a phone number!");
    return 0;
  }
  if (!regex.number.test(number.value)) {
    alertMessages(
      "Invalid Phone",
      "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
    );
    return 0;
  }
  const existingContact = contactsList.find(
    (data) => data.number == number.value,
  );

  if (existingContact) {
    alertMessages(
      "Duplicate Phone Number",
      `A contact with this phone number already exists: ${existingContact.name}`,
    );
    return 0;
  }
}

// ================= Empty List UI Validator ================= //
function validateIsContactList() {
  if (contactsList.length > 0) {
    emptyContact.classList.add("d-none");
  } else {
    emptyContact.classList.remove("d-none");
  }
}
