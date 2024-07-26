let copyCount = 0;
let clipboardContent = '';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addToClippic",
    title: "Add to Clippic (0)",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addToClippic") {
    chrome.tabs.sendMessage(tab.id, { action: "getSelectedHTML" }, (response) => {
      if (response && response.html) {
        addToClipboard(response.html);
      }
    });
  }
});

function addToClipboard(html) {
  copyCount++;
  clipboardContent += html + '\n<hr>\n'; // Add a horizontal line between selections
  chrome.storage.local.set({ clipboardContent: clipboardContent, copyCount: copyCount });
  chrome.contextMenus.update("addToClippic", { title: `Add to Clippic (${copyCount})` });
}

// ... rest of the background.js code remains the same
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getClipboardContent") {
    sendResponse({ content: clipboardContent, count: copyCount });
  } else if (request.action === "clearClipboard") {
    clipboardContent = '';
    copyCount = 0;
    chrome.storage.local.set({ clipboardContent: clipboardContent, copyCount: copyCount });
    chrome.contextMenus.update("addToClippic", { title: `Add to Clippic (${copyCount})` });
    sendResponse({ success: true });
  }
});