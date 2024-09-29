chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        console.log('Visited URL:', tab.url);
        
        // Ensure captureVisibleTab is called with the active tab
        chrome.tabs.captureVisibleTab(tab.windowId, { format: 'png' }, (screenshotUrl) => {
            if (chrome.runtime.lastError) {
                console.error('Error capturing tab:', chrome.runtime.lastError.message);
                return;
            }

            console.log('Screenshot URL:', screenshotUrl);
            
            // Prepare the data to send to your API
            const urlVisitData = {
                url: tab.url,
                screenshot: screenshotUrl,
            };

            // Send a POST request to your API
            fetch('http://localhost:8000/api/url-visits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(urlVisitData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
});
