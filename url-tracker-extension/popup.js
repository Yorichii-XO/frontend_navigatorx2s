document.addEventListener('DOMContentLoaded', () => {
    const urlList = document.getElementById('urlList');

    chrome.storage.local.get('screenshots', (data) => {
        const screenshots = data.screenshots || [];
        screenshots.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${item.url}" target="_blank">${item.url}</a> <img src="${item.screenshot}" width="100" />`;
            urlList.appendChild(li);
        });
    });
});
