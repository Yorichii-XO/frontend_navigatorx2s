chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        // Log the URL visited
        console.log('Visited URL:', tab.url);

        // Take a screenshot
        chrome.tabs.captureVisibleTab(tab.windowId, {}, (screenshotUrl) => {
            // Save screenshot URL or send it to your server
            console.log('Screenshot URL:', screenshotUrl);
            chrome.storage.local.get({ screenshots: [] }, (data) => {
                const screenshots = data.screenshots;
                screenshots.push({ url: tab.url, screenshot: screenshotUrl });
                chrome.storage.local.set({ screenshots });
            });
        });
    }
});
