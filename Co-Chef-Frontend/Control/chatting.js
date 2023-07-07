import {
    checkUpdateDisplay,
    getChatTextByUsername,
    updateChatTextByUserName,
    updateDisplay
} from "../Services/chat-service.js";
import {activeScene} from "./controller.js";
import {sceneData} from "../data-utils/scene-data.js";

const chatField = document.querySelector(".chat-field");
const chatLog = document.querySelector(".chat-log");
const inputField = document.querySelector(".chat-input");
const MAX_CHAT_LOG_HEIGHT = 1300; // Adjust the maximum height as desired
export let canMove = true; // Global variable, I will think of something more clever if I have time

// let chatMessages = [];
if (activeScene === sceneData.Gameplay.sceneId) {
    displayChatIntervalId = setInterval(() => {
        checkUpdateDisplay(USER_NAME, (isUpdateDisplay) => {
            if (isUpdateDisplay) {
                displayChatMessages();
                updateDisplay(USER_NAME, 0);
            }
        });

    }, 1000);
}

chatField.addEventListener("click", () => {
    document.getElementById("ic_options").style.display = "none";
    document.getElementById("ic_recipe").style.display = "none";
    canMove = false;
    inputField.disabled = false;
});

chatField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        canMove = true;
        document.getElementById("ic_options").style.display = "flex";
        document.getElementById("ic_recipe").style.display = "flex";
        inputField.disabled = !inputField.disabled;
        const input = e.target;
        const message = input.value.trim();
        updateChatTextByUserName(USER_NAME, message);
        updateDisplay(USER_NAME, 1);
    }
});

chatField.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        canMove = true;
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




