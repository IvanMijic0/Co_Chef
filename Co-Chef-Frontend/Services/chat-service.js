export const updateChatTextByUserName = (userName, chatText) => {
    $.ajax({
        url: "../Co-Chef-Backend/rest/updateChatTextByUserName/" + userName + "/" + chatText,
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
        url: "../Co-Chef-Backend/rest/getChatTextByUsername/" + userName,
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
        url: "../Co-Chef-Backend/rest/checkUsersHaveSameChatGameId/" + userName1 + "/" + userName2,
        success: (response) => {
            const haveSameGameId = response["Same id"];
            callback(haveSameGameId);
        },
        error: () => {
            callback(false);
        }
    });
};
