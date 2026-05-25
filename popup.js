document.getElementById("dashboardBtn")
.addEventListener("click", () => {
  chrome.tabs.create({
    url: "dashboard.html"
  });
});

chrome.storage.local.get(["usage"], (result) => {
  const usage = result.usage || {};
  const stats = document.getElementById("todayStats");

  for (let site in usage) {
    let minutes = Math.floor(usage[site] / 60);

    stats.innerHTML += `
      <p>${site} - ${minutes} mins</p>
    `;
  }
});