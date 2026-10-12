const planetsContainer = document.querySelectorAll(
  "#planets-grid .planet-card",
);

const planetDetailImage = document.getElementById("planet-detail-image");
const planetDetailName = document.getElementById("planet-detail-name");
const planetDetailDescription = document.getElementById(
  "planet-detail-description",
);
const planetDistance = document.getElementById("planet-distance");
const planetRadius = document.getElementById("planet-radius");
const planetMass = document.getElementById("planet-mass");
const planetDensity = document.getElementById("planet-density");
const planetOrbitalPeriod = document.getElementById("planet-orbital-period");
const planetRotation = document.getElementById("planet-rotation");
const planetMoons = document.getElementById("planet-moons");
const planetGravity = document.getElementById("planet-gravity");

const planetDiscoverer = document.getElementById("planet-discoverer");
const planetDiscoveryDate = document.getElementById("planet-discovery-date");
const planetBodyType = document.getElementById("planet-body-type");
const planetVolume = document.getElementById("planet-volume");

const planetPerihelion = document.getElementById("planet-perihelion");
const planetAphelion = document.getElementById("planet-aphelion");
const planetEccentricity = document.getElementById("planet-eccentricity");
const planetInclination = document.getElementById("planet-inclination");
const planetAxialTilt = document.getElementById("planet-axial-tilt");
const planetTemp = document.getElementById("planet-temp");
const planetEscape = document.getElementById("planet-escape");
const planetComparisonBody = document.getElementById(
  "planet-comparison-tbody",
);

let currentPlanetId = "earth";
let planetsData = [];

const planetDisplayInfo = [
  {
    id: "mercury",
    name: "Mercury",
    color: "#eab308",
  },
  {
    id: "venus",
    name: "Venus",
    color: "#f97316",
  },
  {
    id: "earth",
    name: "Earth",
    color: "#3b82f6",
  },
  {
    id: "mars",
    name: "Mars",
    color: "#ef4444",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    color: "#fb923c",
  },
  {
    id: "saturn",
    name: "Saturn",
    color: "#facc15",
  },
  {
    id: "uranus",
    name: "Uranus",
    color: "#06b6d4",
  },
  {
    id: "neptune",
    name: "Neptune",
    color: "#2563eb",
  },
];

const planetTypeStyles = {
  Terrestrial: {
    backgroundColor: "rgba(249, 115, 22, 0.5)",
    color: "#fed7aa",
  },
  "Gas Giant": {
    backgroundColor: "rgba(168, 85, 247, 0.5)",
    color: "#e9d5ff",
  },
  "Ice Giant": {
    backgroundColor: "rgba(6, 182, 212, 0.5)",
    color: "#a5f3fc",
  },
};

const planetImages = {
  mercury: "assets/images/mercury.png",
  venus: "assets/images/venus.png",
  earth: "assets/images/earth.png",
  mars: "assets/images/mars.png",
  jupiter: "assets/images/jupiter.png",
  saturn: "assets/images/saturn.png",
  uranus: "assets/images/uranus.png",
  neptune: "assets/images/neptune.png",
};

planetsContainer.forEach((planetCard) => {
  planetCard.addEventListener("click", ({ currentTarget }) => {
    currentPlanetId = currentTarget.getAttribute("data-planet-id");
    renderPlanetDetails(
      planetsData.find(
        (planet) => planet.englishName.toLowerCase() === currentPlanetId,
      ),
    );
  });
});

function renderPlanets(data) {
  planetsData = data;
  renderPlanetComparison();
  renderPlanetDetails(
    planetsData.find(
      (planet) => planet.englishName.toLowerCase() === currentPlanetId,
    ),
  );
}

function formatMillionKilometers(value) {
  if (value == null || Number.isNaN(Number(value))) return "N/A";

  const millionKilometers = Number(value) / 1000000;
  return `${millionKilometers.toFixed(1)}M km`;
}

function renderPlanetDetails(planetData) {
  planetDetailImage.src = planetImages[currentPlanetId];
  planetDetailName.textContent = planetData.englishName;
  planetDetailDescription.textContent = planetData.description;
  planetDistance.textContent = `${planetData.semimajorAxis} km`;
  planetRadius.textContent = `${planetData.meanRadius} km`;
  planetMass.textContent = `${planetData.mass.massValue} x 10^${planetData.mass.massExponent} kg`;
  planetDensity.textContent = `${planetData.density} g/cm³`;
  planetOrbitalPeriod.textContent = `${planetData.sideralOrbit.toFixed(2)} days`;
  planetRotation.textContent = `${planetData.sideralRotation} hours`;
  planetMoons.textContent = planetData.moons ? planetData.moons.length : 0;
  planetGravity.textContent = `${planetData.gravity} m/s²`;
  planetDiscoverer.textContent =
    planetData.discoveredBy || "Known since antiquity";
  planetDiscoveryDate.textContent = planetData.discoveryDate || "Ancient";
  planetBodyType.textContent = planetData.bodyType || "Planet";
  planetVolume.textContent = planetData.vol
    ? `${planetData.vol.volValue} × 10^${planetData.vol.volExponent} km³`
    : "N/A";
  planetPerihelion.textContent = formatMillionKilometers(planetData.perihelion);
  planetAphelion.textContent = formatMillionKilometers(planetData.aphelion);
  planetEccentricity.textContent = planetData.eccentricity.toFixed(4);
  planetInclination.textContent = `${planetData.inclination}°`;
  planetAxialTilt.textContent = `${planetData.axialTilt}°`;
  planetTemp.textContent = `${planetData.avgTemp} K`;
  planetEscape.textContent = `${(
    Number(planetData.escape) / 1000
  ).toFixed(2)} km/s`;
}

function renderPlanetComparison() {
  const planetsById = new Map(
    planetsData.map((planet) => [planet.englishName.toLowerCase(), planet]),
  );
  const earthMass = 5.9722e24;
  const kilometersPerAu = 149597870.7;

  planetComparisonBody.innerHTML = planetDisplayInfo
    .map((displayInfo) => {
      const planet = planetsById.get(displayInfo.id);
      if (!planet) return "";

      const distanceAu = Number(planet.semimajorAxis) / kilometersPerAu;
      const diameter = Number(planet.meanRadius) * 2;
      const mass =
        (Number(planet.mass.massValue) *
          10 ** Number(planet.mass.massExponent)) /
        earthMass;
      const orbitalPeriod = Number(planet.sideralOrbit);
      const formattedOrbitalPeriod =
        orbitalPeriod > 365.256
          ? `${(orbitalPeriod / 365.25).toFixed(1)} years`
          : `${orbitalPeriod.toFixed(1)} days`;
      const typeStyle = planetTypeStyles[planet.type] || {
        backgroundColor: "rgba(100, 116, 139, 0.5)",
        color: "#e2e8f0",
      };
      const diameterText = diameter.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      });

      return `
        <tr class="hover:bg-slate-800/30 transition-colors${displayInfo.id === "earth" ? " bg-blue-500/5" : ""}">
          <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
            <div class="flex items-center space-x-2 md:space-x-3">
              <div class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0" style="background-color: ${displayInfo.color}"></div>
              <span class="font-semibold text-sm md:text-base whitespace-nowrap">${displayInfo.name}</span>
            </div>
          </td>
          <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${distanceAu.toFixed(2)}</td>
          <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${diameterText}</td>
          <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${mass.toFixed(3)}</td>
          <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${formattedOrbitalPeriod}</td>
          <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${planet.moons?.length || 0}</td>
          <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
            <span class="px-2 py-1 rounded text-xs" style="background-color: ${typeStyle.backgroundColor}; color: ${typeStyle.color}">${planet.type}</span>
          </td>
        </tr>`;
    })
    .join("");
}
