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
