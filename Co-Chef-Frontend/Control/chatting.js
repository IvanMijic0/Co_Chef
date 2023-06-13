const chatField = document.querySelector(".chat-field");
const chatLog = document.querySelector(".chat-log");
const inputField = document.querySelector(".chat-input");
const MAX_CHAT_LOG_HEIGHT = 1300; // Adjust the maximum height as desired
let canMove = true; // Global variable, I will think of something more clever if I have time

let chatMessages = [];

chatField.addEventListener("click", () => {
    document.getElementById("ic_options").style.display = "none";
    document.getElementById("ic_recipe").style.display = "none";
    canMove = false;
    inputField.disabled = false;
});

chatField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        canMove = true;
        inputField.disabled = !inputField.disabled;
        const input = e.target;
        const message = input.value.trim();

        if (message !== "") {
            chatMessages.unshift(message); // Add new messages to the beginning of the array
            displayChatMessages();
            input.value = "";
        }
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
    chatLog.innerHTML = '';

    for (let i = chatMessages.length - 1; i >= 0; i--) {
        const message = chatMessages[i];
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');

        const userPrefix = document.createElement('span');
        userPrefix.textContent = "User0: ";
        userPrefix.style.color = "#F7931E";

        const messageText = document.createElement('span');
        messageText.textContent = message;
        messageText.style.color = "white";

        messageElement.appendChild(userPrefix);
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

    if (chatLog.scrollHeight > MAX_CHAT_LOG_HEIGHT) {
        chatLog.style.height = MAX_CHAT_LOG_HEIGHT + 'px';
        chatLog.style.overflowY = 'scroll';
        chatLog.scrollTop = chatLog.scrollHeight; // Scroll to the bottom of the chat log
    } else {
        chatLog.style.height = 'auto';
        chatLog.style.overflowY = 'visible';
    }
}
