export const ChatService = {
    updateChatTextByUserName:  (userName, chatText) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateChatTextByUserName/" + userName + "/" + chatText,
            type: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            success: function () {
            },
            error: function () {
                console.log("Failed to update chatText");
            }
        });
    },

    getChatTextByUsername: (userName, callback) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/getChatTextByUsername/" + userName,
            method: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            success: (response) => {
                const chatText = response.chatText;
                callback(chatText);
            },
            error: (xhr, status, error) => {
                console.error(error);
                callback(null);
            }
        });
    },

    checkUpdateDisplay: (userName, callback) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/checkUpdateDisplay/" + userName,
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            success: (response) => {
                callback(response.isUpdateDisplay);
            },
            error: () => {
                callback(null);
            }
        });
    },

    updateDisplay: (userName, isUpdateDisplay) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateDisplay/" + userName + "/" + isUpdateDisplay,
            type: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            success: () => {
                console.log("Update display updated");
            },
            error: (xhr, status, error) => {
                console.error("Failed to update display: " + error);
            }
        });
    },

    clearChatText : (userName) => {
        $.ajax({
            method: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/clearChatText/" + userName,
            success: (response) => {
                console.log(response.message);
            },
            error: (xhr, status, error) => {
                console.error(error);
            }
        });
    },
}



