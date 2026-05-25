const productiveSites = [
  "github.com",
  "leetcode.com",
  "stackoverflow.com",
  "w3schools.com"
];

chrome.storage.local.get(["usage"], (result) => {

  const usage = result.usage || {};

  let productive = 0;
  let unproductive = 0;

  const websiteList = document.getElementById("websiteList");

  for (let site in usage) {

    const minutes = Math.floor(usage[site] / 60);

    if (productiveSites.includes(site)) {
      productive += minutes;
    } else {
      unproductive += minutes;
    }

    websiteList.innerHTML += `
      <div class="site">
        <h3>${site}</h3>
        <p>Time Spent: ${minutes} mins</p>
      </div>
    `;
  }

  document.getElementById("productiveTime")
    .innerText = productive;

  document.getElementById("unproductiveTime")
    .innerText = unproductive;
});