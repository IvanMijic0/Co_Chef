import {activeScene, scenes, switchToScene} from "../Control/controller.js";
import {sceneData} from "../data-utils/scene-data.js";
import {willPlayIntervalId} from "../Control/buttonListeners.js";
import {
    characterContainer,
    characterName, connectBackButton, connectRefreshButton,
    SelectBackButton,
    speechText, userBackground,
    userHeader,
    userListContainer
} from "../Control/buttonListeners.js";

export const updateAvailability = (isAvailable, userEmail, password) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateUserAvailability/" + userEmail + "/" + password + "/" + isAvailable,
        method: "PUT",
        success: (response) => {
            // Handle success response if needed
            console.log(response.message);
        },
        error: (xhr, status, error) => {
            // Handle error if the request fails
            console.log("An error occurred: " + error);
        }
    });
};

export const resetGameOpponent = (userEmail) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/resetGameOpponent/" + userEmail,
        method: 'PUT',
        success: () => {
            console.log("Game opponent reset successfully");
            // Handle success response
        },
        error: () => {
            console.log("Failed to reset game opponent");
            // Handle error response
        }
    });
};

export const updateWillPlay = (isWillPlay, userEmail, userPassword) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateUserWillPlay/" + userEmail + "/" + userPassword + "/" + isWillPlay,
        method: "PUT",
        success: (response) => {
            // Handle success response if needed
            console.log(response.message);
        },
        error: (xhr, status, error) => {
            // Handle error if the request fails
            console.log("An error occurred: " + error);
        }
    });
};
export const updateIsRejected = (isRejected, userName) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateUserIsRejected/" + userName + "/" + isRejected,
        method: "PUT",
        success: (response) => {
            // Handle success response if needed
            console.log(response.message);
        },
        error: (xhr, status, error) => {
            // Handle error if the request fails
            console.log("An error occurred: " + error);
        }
    });
};

export const isUserAvailable = (userEmail, userPassword, callback) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/checkUserAvailability/" + userEmail + "/" + userPassword,
        method: "GET",
        success: (response) => {
            if (response.isAvailable) {
                // User is available
                console.log(userEmail + " is available");
                callback(true);
            } else {
                // User is not available
                console.log("User is not available");
                callback(false);
            }
        },
        error: (xhr, status, error) => {
            // Handle error if the request fails
            console.log("Availability: " + error);
            callback(false);
        },
    });
};

export const isUserWillPlay = (userEmail, userPassword, callback) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/checkUserWillPlay/" + userEmail + "/" + userPassword,
        method: "GET",
        success: (response) => {
            if (response.willPlay) {
                // User is available
                console.log(userEmail + " will play");
                callback(true);
            } else {
                // User is not available
                console.log("No opponent selected");
                callback(false);
            }
        },
        error: (xhr, status, error) => {
            // Handle error if the request fails
            console.log("WillPlay: " + error);
            callback(false);
        },
    });
};

export const isUserRejected = (userName, callback) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/isRejected/" + userName,
        method: "GET",
        success: (response) => {
            if (response.isRejected) {
                // User is available
                console.log(userName + " is rejected");
                callback(true);
            } else {
                // User is not available
                console.log(userName + " is not rejected");
                callback(false);
            }
        },
        error: (xhr, status, error) => {
            // Handle error if the request fails
            console.log("WillPlay: " + error);
            callback(false);
        },
    });
};

export const ListUsers = () => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/users",
        method: "GET",
        success: (response) => {
            if (response.users) {
                const users = response.users;
                const userContainer = $("#userContainer");

                users.forEach((user) => {
                    const username = user.userName;
                    const userEmail = user.userEmail;
                    const userPassword = user.userPassword;
                    const gameId = user.gameId;

                    // Check if the user being iterated over is the current user
                    if (userEmail === USER_EMAIL || userPassword === USER_PASSWORD) {
                        return; // Skip the current user
                    }

                    const div = $("<div></div>").css("display", "block");
                    const availabilitySpan = $("<span></span>").addClass("availability-text");

                    isUserAvailable(userEmail, userPassword, (isAvailable) => {
                        if (gameId === 0 && isAvailable) {
                            availabilitySpan.addClass("green-text").text(" is available");

                            const usernameSpan = $("<span></span>")
                                .text(username)
                                .addClass("white-text")
                                .addClass("clickable")
                                .on("click", () => {
                                    // console.log("Clicked user email: " + userEmail)
                                    // console.log("Clicked user password: " + userPassword)
                                    // console.log("Current user email: " + USER_EMAIL)
                                    // console.log("Current user password: " + USER_PASSWORD)
                                    saveGameOpponent(username);
                                    updateWillPlay(1, userEmail, userPassword);

                                });
                            div.append(usernameSpan, availabilitySpan);
                        } else {
                            // User is not available
                            availabilitySpan.addClass("grey-text").text(" is not available");
                            const usernameSpan = $("<span></span>").text(username).addClass("white-text");
                            div.append(usernameSpan, availabilitySpan);
                        }
                        userContainer.append(div);
                    });
                });
            }
        },
        error: () => {
            toastr.error();
        },
    });
};

export const getUserNameByEmailAndPassword = (email, password, callback) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/getUserNameByEmailAndPassword/" + email + "/" + password,
        method: "GET",
        success: (response) => {
            // Handle success response
            const userName = response.userName;
            console.log("Username: " + userName);
            callback(userName);
        },
        error: (xhr, status, error) => {
            // Handle error response
            console.log("Error: " + error);
            callback(null);
        }
    });
};

export const saveGameOpponent = (opponentUsername) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/saveGameOpponent/" + USER_EMAIL + "/" + USER_PASSWORD + "/" + opponentUsername,
        method: "PUT",
        success: () => {
            // Handle success response if needed
            console.log("Game opponent saved successfully");
        },
        error: (xhr, status, error) => {
            // Handle error if the request fails
            console.log("An error occurred: " + error);
        }
    });
};

export const getUserNameByGameOpponent = (gameOpponent, callback) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/getUserByGameOpponent/" + gameOpponent,
        method: "GET",
        success: (response) => {
            // Handle success response
            const userName = response.userName;
            callback(userName);
        },
        error: (xhr, status, error) => {
            // Handle error response
            console.log("Error: " + error);
            callback(null);
        }
    });
};

export const updateGameOpponent = (userEmail, gameOpponent) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateGameOpponent/" + userEmail + "/" + gameOpponent,
        method: "PUT",
        success: () => {
            console.log("Game opponent updated successfully");
            // Handle success response
        },
        error: () => {
            console.log("Failed to update game opponent");
            // Handle error response
        }
    });
};

export const checkUsersHaveSameGameId = (userName1, userName2, callback) => {
    $.ajax({
        method: "GET",
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/checkUsersHaveSameGameId/" + userName1 + "/" + userName2,
        success: (response) => {
            const haveSameGameId = response["Same id"];
            callback(haveSameGameId);
        },
        error: () => {
            callback(false);
        }
    });
};

export const checkUsersHaveWaitingToPlay = (userName1, userName2, callback) => {
    $.ajax({
        method: "GET",
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/checkUsersHaveWaitingToPlay/" + userName1 + "/" + userName2,
        success: (response) => {
            const sameWaitingToPlay = response["waitingToPlay"];
            callback(sameWaitingToPlay);
        },
        error: (xhr, status, error) => {
            console.error(error);
            callback(false);
        }
    });
};

export const updateWaitingToPlay = (userName, isWaitingToPlay) => {
    $.ajax({
        method: "PUT",
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateWaitingToPlay/" + userName + "/" + isWaitingToPlay,
        success: () => {
            console.log("User isWaitingToPlay updated");
        },
        error: (xhr, status, error) => {
            console.error(error);
        }
    });
};

export const updateUserGameId = (userName, gameId) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateGameId/" + userName + "/" + gameId,
        type: "PUT",
        success: function () {
            console.log("Game ID updated successfully");
            // Handle success response
        },
        error: function () {
            console.log("Failed to update game ID");
            // Handle error response
        }
    });
};

export const updateRecipe = (userName, recipe) => {
    $.ajax({
        method: "PUT",
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateRecipe/" + userName + "/" + recipe,
        success: (response) => {
            console.log("User recipe updated:", response.message);
        },
        error: (xhr, status, error) => {
            console.error(error);
        }
    });
};

export const resetRecipe = (userEmail) => {
    $.ajax({
        method: "PUT",
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/resetRecipe/" + userEmail,
        success: (response) => {
            console.log("Recipe reset:", response.message);
        },
        error: (xhr, status, error) => {
            console.error(error);
        }
    });
};

export const showDialogue = () => {
    let randomGameId = Math.floor(Math.random() * 1000) + 1;
    let confirmDialog = null;
    getUserNameByGameOpponent(USER_NAME, (userName) => {
        if (userName) {
            confirmDialog = confirm("Do you want to play a game with " + userName + "?");
            if (confirmDialog) {
                updateUserGameId(USER_NAME, randomGameId);
                setOpponentsGameOpponent(USER_NAME, randomGameId);
                initializeChats(randomGameId, USER_NAME);
                SelectBackButton.style.display = "flex";
                characterName.style.display = "flex";
                speechText.style.display = "flex";
                characterContainer.style.display = "flex";
                userHeader.style.display = "none";
                userListContainer.style.display = "none";
                userBackground.style.display = "none";
                connectRefreshButton.style.display = "none";
                connectBackButton.style.display = "none";
                if (willPlayIntervalId) {
                    clearInterval(willPlayIntervalId);
                }
                switchToScene(sceneData.CHARACTER_SELECT.sceneId);
                scenes[activeScene].restartClick();
                scenes[activeScene].changeText();
            } else {
                console.log(userName)
                updateIsRejected(1, userName)
                alert("Rejected an invitation from " + userName);
            }
        }
    });
};

// Function to periodically check if a user is willing to play
export const checkUserWillPlayPeriodically = () => {
    willPlayIntervalId = setInterval(() => {
        isUserWillPlay(USER_EMAIL, USER_PASSWORD, (willPlay) => {
            if (willPlay) {
                showDialogue();
                updateWillPlay(0, USER_EMAIL, USER_PASSWORD);
            }
        });
        isUserRejected(USER_NAME, (isRejected) => {
            if (isRejected) {
                getGameOpponentByUserName(USER_NAME, (gameOpponent) => {
                    if (gameOpponent) {
                        alert("You have been rejected by " + gameOpponent);
                        resetGameOpponent(USER_EMAIL);
                        updateIsRejected(0, USER_NAME);
                    }
                });
            }
        });
        getGameOpponentByUserName(USER_NAME, (gameOpponent) => {
            if (gameOpponent) {
                checkUsersHaveSameGameId(USER_NAME, gameOpponent, (haveSameGameId) => {
                    if (haveSameGameId) {
                        alert("Your game has been accepted");
                        getGameIdByUsername(USER_NAME, (gameId) => {
                            if (gameId) {
                                console.log("In game Id: " + USER_NAME)
                                console.log(gameId)
                                initializeChats(gameId, USER_NAME);
                            }
                        })
                        SelectBackButton.style.display = "flex";
                        characterName.style.display = "flex";
                        speechText.style.display = "flex";
                        characterContainer.style.display = "flex";
                        userHeader.style.display = "none";
                        userListContainer.style.display = "none";
                        userBackground.style.display = "none";
                        connectRefreshButton.style.display = "none";
                        connectBackButton.style.display = "none";
                        if (willPlayIntervalId) {
                            clearInterval(willPlayIntervalId);
                        }
                        switchToScene(sceneData.CHARACTER_SELECT.sceneId);
                        scenes[activeScene].restartClick();
                        scenes[activeScene].changeText();
                    }
                });
            }
        })
    }, 5000);
};

export const setOpponentsGameOpponent = (userName, randomGameId) => {
    getUserNameByGameOpponent(userName, (userName) => {
        if (userName) {
            console.log("UserName in getUserNameByOpponent: " + userName)
            updateUserGameId(userName, randomGameId);
            updateGameOpponent(USER_EMAIL, userName);
        } else {
            console.log("No username found");
        }
    });
}

export const initializeChats = (gameId, userName) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/initializeChats",
        method: "POST",
        data: {
            gameId: gameId,
            userName: userName,
            chatText: ""
        },
        success: () => {
            console.log("Chats initialized");
        },
        error: () => {
            console.log("Initialization failed")
        }
    });
}

export const getGameIdByUsername = (userName, callback) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/getGameIdByUsername/" + userName,
        method: "GET",
        success: (response) => {
            const gameId = response.gameId;
            callback(gameId);
            console.log(gameId);
        },
        error: (xhr, status, error) => {
            console.error(error);
            callback(null);
        }
    });
};

export const deleteUsersWithSameNonZeroGameId = (userName) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/deleteUsersWithSameNonZeroGameId/" + userName,
        type: "DELETE",
        success: () => {
            console.log('Users chat deleted successfully');
            // Handle success response here
        },
        error: (xhr, status, error) => {
            console.error(error);
            // Handle error response here
        }
    });
};

export const updateUserTaskCompleted = (userName, taskCompleted) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateTasksCompleted/" + userName + "/" + taskCompleted,
        type: "PUT",
        success: function () {
            // Handle success response
        },
        error: function () {
            console.log("Failed to update taskCompleted");
            // Handle error response
        }
    });
};

export const checkUsersHaveSameTaskCompleted = (userName1, userName2, callback) => {
    $.ajax({
        method: "GET",
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/checkUsersHaveSameTaskCompleted/" + userName1 + "/" + userName2,
        success: (response) => {
            const haveSameTasksCompleted = response["Same tasksCompleted"];
            callback(haveSameTasksCompleted);
        },
        error: () => {
            callback(false);
        }
    });
};

export const getGameOpponentByUserName = (username, callback) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/getGameOpponentByUser/" + username,
        method: "GET",
        success: (response) => {
            if (response.gameOpponent) {
                const gameOpponent = response.gameOpponent;
                // Pass the game opponent to the callback function
                callback(gameOpponent);
            } else {
                // No game opponent found
                callback(null);
            }
        },
        error: (xhr, status, error) => {
            // Handle error if the request fails
            console.log("Error: " + error);
            callback(null);
        },
    });
};

export const getRecipeByUserName = (username, callback) => {
    $.ajax({
        url: "https://shark-app-7dvmx.ondigitalocean.app/rest/getRecipeByUserName/" + username,
        method: "GET",
        success: (response) => {
            // Handle success response
            const recipe = response.recipe;
            callback(recipe);
        },
        error: () => {
            // Handle error response
            callback(null);
        }
    });
};

