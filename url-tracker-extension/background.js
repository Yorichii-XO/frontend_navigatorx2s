// Example URL visit data
const urlVisitData = {
    user_id: '1', // Adjust according to your authentication logic
    category_id: '1', // Adjust according to your categories
    url: 'https://www.jenuel.dev/blog/Create-Chrome-Extension-Using-Vue-The-Easiest-Way',
    visit_time: new Date().toISOString(),
    duration: 120 // Example duration in seconds
};

fetch('http://localhost:8000/api/url-visits', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'your-sanctum-token' // Ensure your token is valid
    },
    body: JSON.stringify(urlVisitData)
})
.then(response => {
    if (!response.ok) {
        // If the response is not OK, throw an error
        return response.text().then(text => {
            throw new Error(`HTTP error! status: ${response.status}, response: ${text}`);
        });
    }
    return response.json(); // Parse JSON if response is OK
})
.then(data => {
    console.log('URL visit saved:', data);
})
.catch(error => {
    console.error('Error saving URL visit:', error);
});
