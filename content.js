// do nothing for the moment
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSelectedHTML") {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const clonedSelection = range.cloneContents();
            const div = document.createElement('div');
            div.appendChild(clonedSelection);
            sendResponse({ html: div.innerHTML });
        } else {
            sendResponse({ html: '' });
        }
    }
    return true; // Indicates that we will send a response asynchronously
});