import {activeScene, intro, scenes, switchToScene} from "../Control/controller.js";
import {sceneData} from "../data-utils/scene-data.js";
import {
    characterContainer,
    characterName, connectBackButton, connectRefreshButton,
    SelectBackButton,
    speechText, userBackground,
    userHeader,
    userListContainer
} from "../Control/buttonListeners.js";

export const UserService = {
    init: () => {
        const token = localStorage.getItem("user-token");
        console.log(token);
        if (token) {
            switchToScene(sceneData.INTRO.sceneId);
            intro();
            return;
        }
        $("#login-form").validate({
            submitHandler: (form) => {
                const entity = Object.fromEntries(new FormData(form).entries());
                UserService.login(entity);
            },
        });
    },
    login: (entity) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/login",
            type: "POST",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            data: JSON.stringify(entity),
            contentType: "application/json",
            dataType: "json",
            success: (result) => {
                toastr.success("Successful Login");
                localStorage.setItem("user-token", result.token);
                switchToScene(sceneData.INTRO.sceneId);
                intro();
            },
            error: (error) => {
                toastr.error(error);
            },
        });
    },

    logout: () => {
        localStorage.clear();
        switchToScene(sceneData.SIGNUP.sceneId);
    },

    signUpUser: (userName, userEmail, userPassword) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/user",
            method: "POST",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            data: {
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword
            },
            success: (response, status, xhr) => {
                if (xhr.status === 201) {
                    toastr.success("Successful Sign up");
                    USER_NAME = userName;
                    USER_EMAIL = userEmail;
                    USER_PASSWORD = userPassword;
                    setTimeout(() => {
                        switchToScene(sceneData.LOGIN.sceneId);
                        intro();
                    }, 1000);
                }
            },
            error: (xhr) => {
                if (xhr.status === 409) {
                    toastr.warning("User already exists");
                } else {
                    toastr.error();
                }
            }
        });
    },

    // loginUser: (userEmail, userPassword) => {
    //     $.ajax({
    //         url: "https://shark-app-7dvmx.ondigitalocean.app/rest/checkUserByEmailAndPassword/" + userEmail + "/" + userPassword,
    //         method: "GET",
    //         data: JSON.stringify(),
    //         beforeSend: (xhr) => {
    //             xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
    //         },
    //         contentType: "application/json",
    //         success: (response) => {
    //             if (response) {
    //                 toastr.success("Successful Log in");
    //                 USER_EMAIL = userEmail;
    //                 USER_PASSWORD = userPassword;
    //                 UserService.getUserNameByEmailAndPassword(userEmail, userPassword, (userName) => {
    //                     if (userName) {
    //                         USER_NAME = userName;
    //                     } else {
    //                         // Error occurred or user not found
    //                         console.log("Failed to retrieve user name");
    //                     }
    //                 });
    //                 setTimeout(() => {
    //                     switchToScene(sceneData.INTRO.sceneId);
    //                     intro();
    //                 }, 1500)
    //             } else {
    //                 // User credentials are invalid
    //                 toastr.warning("User does not exist!");
    //             }
    //         },
    //         error: () => {
    //             // Handle error if the request fails
    //             toastr.error();
    //         }
    //     });
    // },

    updateAvailability: (isAvailable, userEmail, password) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateUserAvailability/" + userEmail + "/" + password + "/" + isAvailable,
            method: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            success: (response) => {
                console.log(response.message);
            },
            error: (xhr, status, error) => {
                console.log("An error occurred: " + error);
            }
        });
    },

    resetGameOpponent: (userEmail) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/resetGameOpponent/" + userEmail,
            method: 'PUT',
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            success: () => {
                console.log("Game opponent reset successfully");
                // Handle success response
            },
            error: () => {
                console.log("Failed to reset game opponent");
                // Handle error response
            }
        });
    },

    updateWillPlay: (isWillPlay, userEmail, userPassword) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateUserWillPlay/" + userEmail + "/" + userPassword + "/" + isWillPlay,
            method: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            success: (response) => {
                // Handle success response if needed
                console.log(response.message);
            },
            error: (xhr, status, error) => {
                // Handle error if the request fails
                console.log("An error occurred: " + error);
            }
        });
    },

    updateIsRejected: (isRejected, userName) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateUserIsRejected/" + userName + "/" + isRejected,
            method: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            success: (response) => {
                // Handle success response if needed
                console.log(response.message);
            },
            error: (xhr, status, error) => {
                // Handle error if the request fails
                console.log("An error occurred: " + error);
            }
        });
    },

    isUserAvailable: (userEmail, userPassword, callback) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/checkUserAvailability/" + userEmail + "/" + userPassword,
            method: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
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
    },

    isUserWillPlay: (userEmail, userPassword, callback) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/checkUserWillPlay/" + userEmail + "/" + userPassword,
            method: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
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
    },

    isUserRejected: (userName, callback) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/isRejected/" + userName,
            method: "GET", beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
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
    },

    ListUsers:  () => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/users",
            method: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
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

                        UserService.isUserAvailable(userEmail, userPassword, (isAvailable) => {
                            if (gameId === 0 && isAvailable) {
                                availabilitySpan.addClass("green-text").text(" is available");

                                const usernameSpan = $("<span></span>")
                                    .text(username)
                                    .addClass("white-text")
                                    .addClass("clickable")
                                    .on("click", () => {
                                        UserService.saveGameOpponent(username);
                                        UserService.updateWillPlay(1, userEmail, userPassword);

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
    },

    saveGameOpponent: (opponentUsername) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/saveGameOpponent/" + USER_EMAIL + "/" + USER_PASSWORD + "/" + opponentUsername,
            method: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            success: () => {
                // Handle success response if needed
                console.log("Game opponent saved successfully");
            },
            error: (xhr, status, error) => {
                // Handle error if the request fails
                console.log("An error occurred: " + error);
            }
        });
    },

    getUserNameByGameOpponent: (gameOpponent, callback) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/getUserByGameOpponent/" + gameOpponent,
            method: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
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
    },

    updateGameOpponent: (userEmail, gameOpponent) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateGameOpponent/" + userEmail + "/" + gameOpponent,
            method: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            success: () => {
                console.log("Game opponent updated successfully");
            },
            error: () => {
                console.log("Failed to update game opponent");
            }
        });
    },

    checkUsersHaveSameGameId: (userName1, userName2, callback) => {
        $.ajax({
            method: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/checkUsersHaveSameGameId/" + userName1 + "/" + userName2,
            success: (response) => {
                const haveSameGameId = response["Same id"];
                callback(haveSameGameId);
            },
            error: () => {
                callback(false);
            }
        });
    },

    checkUsersHaveWaitingToPlay: (userName1, userName2, callback) => {
        $.ajax({
            method: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/checkUsersHaveWaitingToPlay/" + userName1 + "/" + userName2,
            success: (response) => {
                const haveSameWaitingToPlay = response["haveSameWaitingToPlay"];
                callback(haveSameWaitingToPlay);
            },
            error: (xhr, status, error) => {
                console.error(error);
                callback(false);
            }
        });
    },

    updateWaitingToPlay: (userName, isWaitingToPlay) => {
        $.ajax({
            method: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateWaitingToPlay/" + userName + "/" + isWaitingToPlay,
            success: () => {
                console.log("User isWaitingToPlay updated");
            },
            error: (xhr, status, error) => {
                console.error(error);
            }
        });
    },

    updateUserGameId: (userName, gameId) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateGameId/" + userName + "/" + gameId,
            type: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            success: function () {
                console.log("Game ID updated successfully");
            },
            error: function () {
                console.log("Failed to update game ID");
            }
        });
    },

    updateRecipe: (userName, recipe) => {
        $.ajax({
            method: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateRecipe/" + userName + "/" + recipe,
            success: (response) => {
                console.log("User recipe updated:", response.message);
            },
            error: (xhr, status, error) => {
                console.error(error);
            }
        });
    },

    resetRecipe: (userEmail) => {
        $.ajax({
            method: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/resetRecipe/" + userEmail,
            success: (response) => {
                console.log("Recipe reset:", response.message);
            },
            error: (xhr, status, error) => {
                console.error(error);
            }
        });
    },

    showDialogue: () => {
        let randomGameId = Math.floor(Math.random() * 1000) + 1;
        let confirmDialog = null;
        UserService.getUserNameByGameOpponent(USER_NAME, (userName) => {
            if (userName) {
                confirmDialog = confirm("Do you want to play a game with " + userName + "?");
                if (confirmDialog) {
                    UserService.updateUserGameId(USER_NAME, randomGameId);
                    UserService.setOpponentsGameOpponent(USER_NAME, randomGameId);
                    UserService.initializeChats(randomGameId, USER_NAME);
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
                    UserService.updateIsRejected(1, userName)
                    alert("Rejected an invitation from " + userName);
                }
            }
        });
    },

    checkUserWillPlayPeriodically: () => {
        willPlayIntervalId = setInterval(() => {
            UserService.isUserWillPlay(USER_EMAIL, USER_PASSWORD, (willPlay) => {
                if (willPlay) {
                    UserService.showDialogue();
                    UserService.updateWillPlay(0, USER_EMAIL, USER_PASSWORD);
                }
            });
            UserService.isUserRejected(USER_NAME, (isRejected) => {
                if (isRejected) {
                    UserService.getGameOpponentByUserName(USER_NAME, (gameOpponent) => {
                        if (gameOpponent) {
                            alert("You have been rejected by " + gameOpponent);
                            UserService.resetGameOpponent(USER_EMAIL);
                            UserService.updateIsRejected(0, USER_NAME);
                        }
                    });
                }
            });
            UserService.getGameOpponentByUserName(USER_NAME, (gameOpponent) => {
                if (gameOpponent) {
                    UserService.checkUsersHaveSameGameId(USER_NAME, gameOpponent, (haveSameGameId) => {
                        if (haveSameGameId) {
                            alert("Your game has been accepted");
                            UserService.getGameIdByUsername(USER_NAME, (gameId) => {
                                if (gameId) {
                                    console.log("In game Id: " + USER_NAME)
                                    console.log(gameId)
                                    UserService.initializeChats(gameId, USER_NAME);
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
        }, 2000);
    },

    setOpponentsGameOpponent: (userName, randomGameId) => {
        UserService.getUserNameByGameOpponent(userName, (userName) => {
            if (userName) {
                console.log("UserName in getUserNameByOpponent: " + userName)
                UserService.updateUserGameId(userName, randomGameId);
                UserService.updateGameOpponent(USER_EMAIL, userName);
            } else {
                console.log("No username found");
            }
        });
    },

    initializeChats: (gameId, userName) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/initializeChats",
            method: "POST",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
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
    },

    getGameIdByUsername: (userName, callback) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/getGameIdByUsername/" + userName,
            method: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
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
    },

    deleteUsersWithSameNonZeroGameId: (userName) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/deleteUsersWithSameNonZeroGameId/" + userName,
            type: "DELETE",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            success: () => {
                console.log('Users chat deleted successfully');
                // Handle success response here
            },
            error: (xhr, status, error) => {
                console.error(error);
                // Handle error response here
            }
        });
    },

    updateUserTaskCompleted: (userName, taskCompleted) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/updateTasksCompleted/" + userName + "/" + taskCompleted,
            type: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            success: function () {
                // Handle success response
            },
            error: function () {
                console.log("Failed to update taskCompleted");
                // Handle error response
            }
        });
    },

    checkUsersHaveSameTaskCompleted: (userName1, userName2, callback) => {
        $.ajax({
            method: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/checkUsersHaveSameTaskCompleted/" + userName1 + "/" + userName2,
            success: (response) => {
                const haveSameTasksCompleted = response["Same tasksCompleted"];
                callback(haveSameTasksCompleted);
            },
            error: () => {
                callback(false);
            }
        });
    },

    getGameOpponentByUserName: (username, callback) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/getGameOpponentByUser/" + username,
            method: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
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
    },

    getRecipeByUserName: (username, callback) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/getRecipeByUserName/" + username,
            method: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
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
    },
};


