// Handle button click event
document.querySelector('.btns button').addEventListener('click', function() {
  // TODO: Implement phishing attack domain detection logic here
  detectPhishingDomain();
});

function detectPhishingDomain() {
  // Get the current tab's URL
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var currentUrl = tabs[0].url;
      
      // Define a regular expression pattern for a simple phishing domain check
      var phishingPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

      // Check if the current URL matches the phishing pattern
      if (phishingPattern.test(currentUrl)) {
          console.log('Phishing attack domain detected!');
          // Perform actions to handle the phishing attack
          // For example, alert the user or block the content
      } else {
          console.log('No phishing attack domain detected.');
      }
  });
}


//contextmenu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuTitle === "Copy URL") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;
      navigator.clipboard.writeText(url).then(() => {
        chrome.notifications.create({
          type: "basic",
          
          title: "URL Copied",
          message: `Copied ${url} to clipboard!`
        });
      }, (err) => {
        console.error("Error copying URL:", err);
      });
    });
  }
});

//collectlinks


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "collectLinks") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;
      const anchorTags = document.querySelectorAll(tabs[0].url + " a"); // More secure approach (explained later)

      const links = Array.from(anchorTags).map(link => link.href);

      sendResponse({ url, links });
    });
  }
});

chrome.browserAction.onClicked.addListener(() => {
  chrome.runtime.sendMessage({ message: "collectLinks" });
});

