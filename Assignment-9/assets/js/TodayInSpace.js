const apodTitle = document.getElementById("apod-title");
const apodImage = document.getElementById("apod-image");
const apodExplanation = document.getElementById("apod-explanation");
const apodDate = document.getElementById("apod-date");
const apodDateDetail = document.getElementById("apod-date-detail");
const apodMediaType = document.getElementById("apod-media-type");
const apodDateInfo = document.getElementById("apod-date-info");
const viewFullResolutionBtn = document.getElementById(
  "view-full-resolution-btn",
);

const apodDateInput = document.getElementById("apod-date-input");
const loadDateBtn = document.getElementById("load-date-btn");
const todayApodBtn = document.getElementById("today-apod-btn");

const today = new Date().toISOString().split("T")[0];
apodDateInput.value = today;
apodDateInput.nextElementSibling.textContent = formatDisplayDate(today);

function renderTodayInSpace(data) {
  apodTitle.textContent = data.title;
  apodExplanation.textContent = data.explanation;

  apodImage.src = data.url;
  apodImage.alt = data.title;
  apodMediaType.textContent = data.media_type;

  apodDate.textContent = `Astronomy Picture of the Day - ${data.date}`;
  apodDateDetail.textContent = data.date;
  apodDateInfo.textContent = data.date;

  viewFullResolutionBtn.addEventListener("click", () => {
    window.open(data.hdurl, "_blank");
  });
}

function formatDisplayDate(dateString) {
  if (!dateString) return "";

  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

apodDateInput.addEventListener("input", () => {
  const selectedDate = apodDateInput.value;
  apodDateInput.nextElementSibling.textContent =
    formatDisplayDate(selectedDate);
});

loadDateBtn.addEventListener("click", () => {
  const selectedDate = apodDateInput.value;
  todayInSpaceCallData(selectedDate);
});

todayApodBtn.addEventListener("click", () => {
  const todayDate = new Date().toISOString().split("T")[0];
  apodDateInput.value = todayDate;
  apodDateInput.nextElementSibling.textContent = formatDisplayDate(todayDate);
  todayInSpaceCallData();
});
