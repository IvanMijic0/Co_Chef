import {
    checkUpdateDisplay,
    getChatTextByUsername,
    updateChatTextByUserName,
    updateDisplay
} from "../Services/chat-service.js";
import {getGameOpponentByUserName} from "../Services/user-service.js";


const chatField = document.querySelector(".chat-field");
const chatLog = document.querySelector(".chat-log");
const inputField = document.querySelector(".chat-input");
const MAX_CHAT_LOG_HEIGHT = 1000; // Adjust the maximum height as desired

// let chatMessages = [];

chatField.addEventListener("click", () => {
    console.log("In interval")
    displayChatIntervalId = setInterval(() => {
        checkUpdateDisplay(USER_NAME, (isUpdateDisplay) => {
            if (isUpdateDisplay) {
                displayChatMessages();
                getGameOpponentByUserName(USER_NAME, (gameOpponent) => {
                   if (gameOpponent) {
                       updateDisplay(USER_NAME, 0);
                       updateDisplay(gameOpponent, 0);
                   }
                });
            }
        });

    }, 1000);
    document.getElementById("ic_options").style.display = "none";
    document.getElementById("ic_recipe").style.display = "none";
    CAN_MOVE = false;
    inputField.disabled = false;
});

chatField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        CAN_MOVE = true;
        document.getElementById("ic_options").style.display = "flex";
        document.getElementById("ic_recipe").style.display = "flex";
        inputField.disabled = !inputField.disabled;
        const input = e.target;
        const message = input.value.trim();
        updateChatTextByUserName(USER_NAME, message);
        getGameOpponentByUserName(USER_NAME, (gameOpponent) => {
            if (gameOpponent) {
                updateDisplay(USER_NAME, 1);
                updateDisplay(gameOpponent, 1);
            }
        });

        input.value = "";
    }
});

chatField.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        CAN_MOVE = true;
        inputField.disabled = true;
        document.getElementById("ic_options").style.display = "flex";
        document.getElementById("ic_recipe").style.display = "flex";
    }
});

const displayChatMessages = () => {
    // chatLog.innerHTML = '';

    getChatTextByUsername(USER_NAME, (chatText) => {
        if (chatText) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message');

            // const userPrefix = document.createElement('span');
            // userPrefix.textContent = "User0: ";
            // userPrefix.style.color = "#F7931E";

            const messageText = document.createElement('span');
            messageText.textContent = chatText;
            messageText.style.color = "white";
            // messageElement.appendChild(userPrefix);
            messageElement.appendChild(messageText);

            messageElement.style.fontSize = "1vw";
            messageElement.style.paddingTop = ".5vw";
            messageElement.style.paddingLeft = "1vw";
            messageElement.style.fontFamily = "Handlee";

            chatLog.style.fontFamily = "Handlee"
            chatLog.style.borderLeft = ".2vw solid black";
            chatLog.style.borderTop = ".2vw solid black";
            chatLog.style.borderRight = ".2vw solid black";

            chatLog.appendChild(messageElement); // Append new message elements
        }
    });

    if (chatLog.scrollHeight > MAX_CHAT_LOG_HEIGHT) {
        chatLog.style.height = MAX_CHAT_LOG_HEIGHT + 'px';
        chatLog.style.overflowY = 'scroll';
        chatLog.scrollTop = chatLog.scrollHeight; // Scroll to the bottom of the chat log
    } else {
        chatLog.style.height = 'auto';
        chatLog.style.overflowY = 'visible';
    }
}




