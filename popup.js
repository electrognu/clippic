document.addEventListener('DOMContentLoaded', function () {
  // In popup.js, add event listeners to the checkboxes:
  const htmlOutputCheckbox = document.getElementById('htmlOutput');
  console.log(htmlOutputCheckbox); //*******************DEBUG */
  const clipLinkCheckbox = document.getElementById('clipLink');


  // Update the HTML_OUTPUT variable in background.js when the checkbox is toggled
  htmlOutputCheckbox.addEventListener('change', function () {
    if (htmlOutputCheckbox.checked) {
      chrome.runtime.sendMessage({ action: "setHtmlOutput", htmlOutput: true });
    } else {
      chrome.runtime.sendMessage({ action: "setHtmlOutput", htmlOutput: false });
    }
  });

  //update the CLIP_LINK variable in background.js when the checkbox is toggled
  clipLinkCheckbox.addEventListener('change', function () {
    if (clipLinkCheckbox.checked) {
      chrome.runtime.sendMessage({ action: "setClipLink", clipLink: true });
    } else {
      chrome.runtime.sendMessage({ action: "setClipLink", clipLink: false });
    }
  });


  const saveButton = document.getElementById('saveButton');
  const clearButton = document.getElementById('clearButton');
  const autoDeleteCheckbox = document.getElementById('autoDeleteCheckbox');

  // In popup.js, update the saveButton event listener:
  saveButton.addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: "getClipboardContent" }, function (response) {
      const blob = new Blob([response.content], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "gabclip_content.html";
      a.click();
      URL.revokeObjectURL(url);

      if (autoDeleteCheckbox.checked) {
        chrome.runtime.sendMessage({ action: "clearClipboard" });
      }
    });
  });

  clearButton.addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: "clearClipboard" });
  });

  chrome.storage.local.get('autoDelete', function (data) {
    autoDeleteCheckbox.checked = data.autoDelete || false;
  });

  autoDeleteCheckbox.addEventListener('change', function () {
    chrome.storage.local.set({ autoDelete: this.checked });
  });
});