const API_KEY = "dqAgOxPfb50I1PW3VylM2GUu3uway0qOLF25xdvA";

const placeHolderData = {
  date: new Date().toISOString().split("T")[0],
  explanation:
    "Scientists are melting holes in the bottom of the world. In fact, almost 100 holes melted near the South Pole are now being used as an astronomical observatory. Astronomers with the IceCube Neutrino Observatory lowered a long string knotted with basketball-sized light detectors into each vertical lake. The water in each hole soon refreezes. The detectors attached to the strings are sensitive to blue light emitted in the surrounding clear ice. Such light results from fast-moving secondary particles liberated when high-energy neutrinos emitted by powerful processes out in the universe collide with ice molecules. IceCube has now detected many illuminating neutrinos. Pictured in 2010, one of the last of IceCube's detector strings is lowered into the freezing abyss, making IceCube the largest neutrino detector ever created. In recognition of unprecedented discoveries, it was announced earlier this week that a founding leader of the IceCube Collaboration will be awarded the Nobel Prize in Physics.Tomorrow's picture: Moons Planet\t\t\t\t\t\t",
  hdurl:
    "https://science.nasa.gov/wp-content/themes/nasa-child/assets/images/nasa-logo@2x.png",
  media_type: "image",
  service_version: "v1",
  title: "NASA Science",
  url: "https://science.nasa.gov/wp-content/themes/nasa-child/assets/images/nasa-logo@2x.png",
};

const tabList = Array.from(document.querySelectorAll("nav a"));
const sections = Array.from(document.querySelectorAll("section"));
const apodLoading = document.getElementById("apod-loading");
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-mobile");
});

let activeTab = tabList[0].getAttribute("data-section");

tabList.forEach((tab) => {
  tab.addEventListener("click", ({ currentTarget }) => {
    const targetId = currentTarget.getAttribute("data-section");
    if (sidebarToggle.classList.contains("hidden")) {
      sidebar.classList.add("sidebar-mobile");
    } else {
      sidebar.classList.toggle("sidebar-mobile");
    }
    sections.forEach((section) => {
      section.classList.add("hidden");
    });
    tabList.forEach((navTab) => {
      navTab.classList.remove("text-blue-400", "bg-blue-500/10");
      navTab.classList.add("text-slate-300", "hover:bg-slate-800");
    });
    currentTarget.classList.add("text-blue-400", "bg-blue-500/10");
    currentTarget.classList.remove("text-slate-300", "hover:bg-slate-800");
    document.getElementById(targetId).classList.remove("hidden");
    activeTab = targetId;
    getCurruntScreenData();
  });
});

async function fetchData(url, forceCache = true) {
  const response = forceCache
    ? await fetch(url, { cache: "force-cache" })
    : await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

async function todayInSpaceCallData(selectedDate) {
  let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
  if (selectedDate) {
    apiUrl += `&date=${selectedDate}`;
  }
  apodLoading.classList.remove("hidden");
  apodImage.classList.add("hidden");
  try {
    const data = await fetchData(apiUrl, false);
    renderTodayInSpace(data);
  } catch (error) {
    console.error("Error fetching APOD data:", error);
    renderTodayInSpace(placeHolderData);
  } finally {
    apodLoading.classList.add("hidden");
    apodImage.classList.remove("hidden");
  }
}

async function getCurruntScreenData() {
  switch (activeTab) {
    case "today-in-space":
      await todayInSpaceCallData();
      break;
    case "launches":
      try {
        const launchesData = await fetchData(
          "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10",
        );
        renderLaunches(launchesData.results);
      } catch (error) {
        console.error("Error fetching launches data:", error);
      }
      break;
    case "planets":
      try {
        const planetsData = await fetchData(
          "https://solar-system-opendata-proxy.vercel.app/api/planets",
        );
        renderPlanets(planetsData.bodies);
      } catch (error) {
        console.error("Error fetching planets data:", error);
      }
      break;
    default:
      break;
  }
}

(function () {
  getCurruntScreenData();
})();
