export const updateChatTextByUserName = (userName, chatText) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateChatTextByUserName/" + userName + "/" + chatText,
        type: "PUT",
        success: function () {
            // Handle success response
        },
        error: function () {
            console.log("Failed to update chatText");
            // Handle error response
        }
    });
};

export const getChatTextByUsername = (userName, callback) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/getChatTextByUsername/" + userName,
        method: "GET",
        success: (response) => {
            const chatText = response.chatText;
            callback(chatText);
        },
        error: (xhr, status, error) => {
            console.error(error);
            callback(null);
        }
    });
};

export const checkUsersHaveSameChatGameId = (userName1, userName2, callback) => {
    $.ajax({
        method: "GET",
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/checkUsersHaveSameChatGameId/" + userName1 + "/" + userName2,
        success: (response) => {
            const haveSameGameId = response["Same id"];
            callback(haveSameGameId);
        },
        error: () => {
            callback(false);
        }
    });
};

export const checkUpdateDisplay = (userName, callback) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/checkUpdateDisplay/" + userName,
        type: "GET",
        success: (response) => {
            callback(response.isUpdateDisplay);
        },
        error: () => {
            callback(null);
        }
    });
}

export const updateDisplay = (userName, isUpdateDisplay) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateDisplay/" + userName + "/" + isUpdateDisplay,
        type: "PUT",
        success: () => {
            console.log("Update display updated");
        },
        error: (xhr, status, error) => {
            console.error("Failed to update display: " + error);
        }
    });
}
