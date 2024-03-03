//URL COPY

document.getElementById('copyButton').addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const url = tab.url;
      await navigator.clipboard.writeText(url);
      console.log("URL copied to clipboard!");
    } catch (err) {
      console.error("Error copying URL:", err);
    }
  });
//NOTIFICATION
  const copyButton = document.getElementById('copyButton');

copyButton.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tab.url;
    await navigator.clipboard.writeText(url);
    chrome.notifications.create({
      type: "basic",
      
      title: "URL Copied",
      message: `Copied ${url} to clipboard!`
    });
  } catch (err) {
    console.error("Error copying URL:", err);
  }
});

//collectlinks

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "linksCollected") {
      const linkList = document.getElementById("linkList");
      request.links.forEach(link => {
        const listItem = document.createElement("li");
        listItem.textContent = link;
        listItem.addEventListener("click", () => {
          navigator.clipboard.writeText(link).then(() => {
            console.log("Link copied to clipboard!");
          }, (err) => {
            console.error("Error copying link:", err);
          });
        });
        linkList.appendChild(listItem);
      });
    }
  });
  
  chrome.runtime.sendMessage({ message: "collectLinks" }); // Collect links on popup open