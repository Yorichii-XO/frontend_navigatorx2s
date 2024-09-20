// This script runs in the context of the web page.

// Listen for click events on links and log the URLs
document.addEventListener('click', (event) => {
    const target = event.target;

    // Check if the clicked element is a link
    if (target.tagName === 'A' && target.href) {
        console.log('Link clicked:', target.href);
        
        // You can send this URL to your background script if needed
        chrome.runtime.sendMessage({ url: target.href });
    }
});
