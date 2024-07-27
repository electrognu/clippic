let clipCount = 0;
let clipboardContent = '';
let clipArray = [];
let HTML_OUTPUT = false;
let CLIP_LINK = false;
class Clip {
  constructor(id, text, url) {
    this.id = id;
    this.text = text;
    this.url = url;
  }
  // borrar en version final 
  mostrarInfo() {
    console.log('ID: ${this.id}, Text: ${this.text}, URL: ${this.url}');
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addToClippic",
    title: "Add to Clippic",
    contexts: ["selection"]
  });
});

// Adding a listener to the context menu, and when the trigger is clicked, send a message to the content.js script. The content.js has a listener on internal chrome mesages : chrome.runtime.onMessage...
// 
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addToClippic") {
    console.log(info.pageUrl);
    chrome.tabs.sendMessage(tab.id, { action: "getSelectedHTML" }, (response) => {
      if (response && response.html) {
        addToClipboard(response.html, info.url);
      }
    });
  }
});

function addToClipboard(html, url) {
  clipCount++;
  let infoClip = new Clip(clipCount, html, url);
  clipArray.push(infoClip);
  // fins aqui ...
  // chrome.storage.local.set({ clipboardContent: clipboardContent, copyCount: copyCount });

}

// ... rest of the background.js code remains the same
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setHtmlOutput") {
    HTML_OUTPUT = request.htmlOutput;
    console.log(HTML_OUTPUT); ///*******************DEBUG */
    sendResponse({ success: true });
  }

  if (request.action === "setClipLink") {
    CLIP_LINK = request.clipLink;
    console.log(CLIP_LINK); ///*******************DEBUG */
    sendResponse({ success: true });
  }

  // if (request.action === "getClipboardContent") {
  //   sendResponse({ content: clipboardContent, count: copyCount });
  // } else if (request.action === "clearClipboard") {
  //   clipboardContent = '';
  //   copyCount = 0;
  //   chrome.storage.local.set({ clipboardContent: clipboardContent, copyCount: copyCount });
  //   chrome.contextMenus.update("addToClippic", { title: `Add to Clippic (${copyCount})` });
  //   sendResponse({ success: true });
  // }
});