let activeTab = "";
let startTime = Date.now();

const productiveSites = [
  "github.com",
  "leetcode.com",
  "stackoverflow.com",
  "w3schools.com"
];

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  trackTime();

  const tab = await chrome.tabs.get(activeInfo.tabId);
  activeTab = new URL(tab.url).hostname;
  startTime = Date.now();
});

chrome.windows.onFocusChanged.addListener(trackTime);

function trackTime() {
  if (!activeTab) return;

  const timeSpent = Math.floor((Date.now() - startTime) / 1000);

  chrome.storage.local.get(["usage"], (result) => {
    let usage = result.usage || {};

    if (!usage[activeTab]) {
      usage[activeTab] = 0;
    }

    usage[activeTab] += timeSpent;

    chrome.storage.local.set({ usage });
  });
}