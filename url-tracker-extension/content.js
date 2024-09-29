// content.js

chrome.runtime.onMessage.addListener(async (request, sender, response) => {
    // console.log(request);

    if (request.action == "CHANGE_BACKGROUND") {
      updatePageBackground()
    }
    if (request.action == "SAY_HELLO") {
              sayHello()
    }
  })
