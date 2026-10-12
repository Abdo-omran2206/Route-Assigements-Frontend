const featuredLaunch = document.getElementById("featured-launch");
const launchesList = document.getElementById("launches-grid");

function renderLaunches(data) {
  if (data.length > 0) {
    renderFeaturedLaunch(data[0]);
    launchesList.innerHTML = "";
    data.slice(1).forEach((launch) => {
      renderLaunchesList(launch);
    });
  }
}

function renderFeaturedLaunch(launch) {
  const launchDateTime = new Date(launch.net);
  const hasLaunchDate = !Number.isNaN(launchDateTime.getTime());
  const launchDate = hasLaunchDate
    ? launchDateTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "TBD";
  const launchTime = hasLaunchDate
    ? `${launchDateTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "UTC",
      })} UTC`
    : "TBD";
  const launchTimestamp = launchDateTime.getTime();
  const daysUntilLaunch = Math.max(
    0,
    Math.ceil((launchTimestamp - Date.now()) / (1000 * 60 * 60 * 24)),
  );

  featuredLaunch.innerHTML = `
    <div
  class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
>
  <div
    class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
  ></div>
  <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
    <div class="flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <span
            class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
          >
            <i class="fas fa-star"></i>
            Featured Launch
          </span>
          <span
            class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
          >
            ${launch.status.abbrev}
          </span>
        </div>
        <h3 class="text-3xl font-bold mb-3 leading-tight">${launch.name}</h3>
        <div
          class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
        >
          <div class="flex items-center gap-2">
            <i class="fas fa-building"></i>
            <span>${launch.launch_service_provider.name}</span>
          </div>
          <div class="flex items-center gap-2">
            <i class="fas fa-rocket"></i>
            <span>${launch.rocket.configuration.name}</span>
          </div>
        </div>
        <div
          class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
        >
          <i class="fas fa-clock text-2xl text-blue-400"></i>
          <div>
            <p class="text-2xl font-bold text-blue-400">${daysUntilLaunch}</p>
            <p class="text-xs text-slate-400">Days Until Launch</p>
          </div>
        </div>
        <div class="grid xl:grid-cols-2 gap-4 mb-6">
          <div class="bg-slate-900/50 rounded-xl p-4">
            <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
              <i class="fas fa-calendar"></i>
              Launch Date
            </p>
            <p class="font-semibold">${launchDate}</p>
          </div>
          <div class="bg-slate-900/50 rounded-xl p-4">
            <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
              <i class="fas fa-clock"></i>
              Launch Time
            </p>
            <p class="font-semibold">${launchTime}</p>
          </div>
          <div class="bg-slate-900/50 rounded-xl p-4">
            <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
              <i class="fas fa-map-marker-alt"></i>
              Location
            </p>
            <p class="font-semibold text-sm">
              ${launch.pad?.location?.name || "TBD"}
            </p>
          </div>
          <div class="bg-slate-900/50 rounded-xl p-4">
            <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
              <i class="fas fa-globe"></i>
              Country
            </p>
            <p class="font-semibold">
              ${launch.pad?.country?.name || "TBD"}
            </p>
          </div>
        </div>
        <p class="text-slate-300 leading-relaxed mb-6">
          ${
            launch.mission.description ||
            "No description available for this mission."
          }
        </p>
      </div>
      <div class="flex flex-col md:flex-row gap-3">
        <button
          class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
        >
          <i class="fas fa-info-circle"></i>
          View Full Details
        </button>
        <div class="icons self-end md:self-center">
          <button
            class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
          >
            <i class="far fa-heart"></i>
          </button>
          <button
            type="button"
            class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
          >
            <i class="fas fa-bell"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="relative">
      <div
        class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
      >
        <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
        ${
          launch.image
            ? `<img loading="lazy" src="${launch.image.image_url}" alt="${launch.name}" class="w-full h-full object-cover" />`
            : `<div
          class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
        >
          <i class="fas fa-rocket text-9xl text-slate-700/50"></i>
        </div>
        <div
          class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
        ></div>`
        }
        
      </div>
    </div>
  </div>
</div>
`;
}

function renderLaunchesList(data) {
  const launchDateTime = new Date(data.net);
  const hasLaunchDate = !Number.isNaN(launchDateTime.getTime());
  const launchDate = hasLaunchDate
    ? launchDateTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "TBD";
  const launchTime = hasLaunchDate
    ? `${launchDateTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "UTC",
      })} UTC`
    : "TBD";
  launchesList.innerHTML += `
   <div
  class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
>
  <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">
  <img
    loading="lazy"
    src="${data.image?.image_url || "assets/images/launch-placeholder.png"}"
    onerror="this.onerror=null; this.src='assets/images/launch-placeholder.png'"
    alt="${data.name}"
    class="w-full h-full object-cover"
  />
     
    <div class="absolute top-3 right-3">
      <span
        class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
      >
        ${data.status.abbrev}
      </span>
    </div>
  </div>
  <div class="p-5">
    <div class="mb-3">
      <h4
        class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
      >
       ${data.name}
      </h4>
      <p class="text-sm text-slate-400 flex items-center gap-2">
        <i class="fas fa-building text-xs"></i>
        ${data.launch_service_provider.name}
      </p>
    </div>
    <div class="space-y-2 mb-4">
      <div class="flex items-center gap-2 text-sm">
        <i class="fas fa-calendar text-slate-500 w-4"></i>
        <span class="text-slate-300">${launchDate}</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <i class="fas fa-clock text-slate-500 w-4"></i>
        <span class="text-slate-300">${launchTime}</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <i class="fas fa-rocket text-slate-500 w-4"></i>
        <span class="text-slate-300">${data.rocket.configuration.name}</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
        <span class="text-slate-300 line-clamp-1">
          ${data.pad?.location?.name || "TBD"}
        </span>
      </div>
    </div>
    <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
      <button
        class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
      >
        Details
      </button>
      <button
        class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
      >
        <i class="far fa-heart"></i>
      </button>
    </div>
  </div>
</div>

   `;
}
