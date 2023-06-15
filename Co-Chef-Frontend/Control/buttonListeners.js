import {sceneData} from "../data-utils/scene-data.js";
import {switchToScene, volumeBar, audio, intro, activeScene, scenes} from "./controller.js";
import {extractFileNameWithExtension} from "../utils/string-manipulation.js";

let willPlayIntervalId;

document.addEventListener("DOMContentLoaded", () => {
    // Caching everything
    const tutorialButton = document.getElementById("tutorialButton-container");
    const connectButton = document.getElementById("connectButton-container");
    const optionsButton = document.getElementById("optionsButton-container");
    const restartButton = document.getElementById("restartButton-container");
    const tutorialBackButton = document.getElementById("tutorial-backButton-container");
    const optionsBackButton = document.getElementById("options-backButton-container");
    const loginButton = document.getElementById("loginButton");
    const loginButton0 = document.getElementById("loginButton0");
    const signupButton = document.getElementById("signUpButton");
    const signupButton0 = document.getElementById("signUpButton0");
    const volumeIcon = document.getElementById("volumeIcon");
    const volumeContainer = document.getElementById("volumeContainer");
    const speechText = document.getElementById("speechText");
    const SelectBackButton = document.getElementById("CharSelect-backButton-container");
    const SelectConfirmButton = document.getElementById("CharSelect-confirmButton-container");
    const SelectRightArrowButton = document.getElementById("rightArrow");
    const SelectLeftArrowButton = document.getElementById("leftArrow");
    const characterName = document.getElementById("character-name");
    const dishName = document.getElementById("dish-name");
    const characterContainer = document.getElementById("character-container");
    const ic_options = document.getElementById("ic_options");
    const ic_recipes = document.getElementById("ic_recipe");
    const ic_slot = document.getElementById("ic_slot");
    const ic_com = document.getElementById("ic_com");
    const ic_timer = document.getElementById("ic_timer");
    const timer = document.getElementById("timer");
    const chat_container = document.getElementById("chat-container");
    const gameplayBackButton = document.getElementById("Gameplay-backButton-container")
    const gameplayMenuButton = document.getElementById("Gameplay-Menu-container");
    const recipeText = document.getElementById("recipeContainer");
    const leftArrow = document.getElementById("left");
    const upArrow = document.getElementById("up");
    const rightArrow = document.getElementById("right");
    const downArrow = document.getElementById("down");
    const slotItem = document.getElementById("item");
    const fishTile = document.getElementById("fish-tile");
    const avocadoTile = document.getElementById("avocado-tile");
    const cabbageTile = document.getElementById("cabbage-tile");
    const carrotTile = document.getElementById("carrot-tile");
    const garlicTile = document.getElementById("garlic-tile");
    const noodlesTile = document.getElementById("noodles-tile");
    const onionTile = document.getElementById("onion-tile");
    const potatoTile = document.getElementById("potato-tile");
    const tomatoTile = document.getElementById("tomato-tile");
    const redPepperTile = document.getElementById("red-pepper-tile");
    const greenPepperTile = document.getElementById("green-pepper-tile");
    const mushroom1Tile = document.getElementById("mushroom1-tile");
    const greenOnionTile = document.getElementById("green-onion-tile");
    const redMeatTile = document.getElementById("red-meat-tile");
    const tortillaTile = document.getElementById("tortilla-tile");
    const plateItem = document.getElementById("plate-item");
    const recipeListItems = document.getElementsByClassName("recipe-item");
    const endMenuButton = document.getElementById("End-Menu-container")
    const userHeader = document.getElementById("userHeader");
    const userContainer = document.getElementById("userContainer");
    const userBackground = document.getElementById("user-background");
    const connectBackButton = document.getElementById("connect-backButton-container");
    const connectRefreshButton = document.getElementById("connect-refreshButton-container");

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        const userEmail = $("#username").val();
        const userPassword = $("#password").val();
        $.ajax({
            url: "../Co-Chef-Backend/rest/checkUserByEmailAndPassword/" + userEmail + "/" + userPassword,
            method: "GET",
            success: (response) => {
                if (response) {
                    toastr.success();
                    USER_EMAIL = userEmail;
                    USER_PASSWORD = userPassword;
                    getUserNameByEmailAndPassword(userEmail, userPassword, (userName) => {
                        if (userName) {
                            USER_NAME = userName;
                        } else {
                            // Error occurred or user not found
                            console.log("Failed to retrieve user name");
                        }
                    });
                    setTimeout(() => {
                        switchToScene(sceneData.INTRO.sceneId);
                        intro();
                    }, 1500)
                } else {
                    // User credentials are invalid
                    toastr.warning("User does not exist!");
                }
            },
            error: () => {
                // Handle error if the request fails
                toastr.error();
            }
        });
    });

    signupButton0.addEventListener("click", (e) => {
        e.preventDefault();
        const userName = $("#name").val();
        const userEmail = $("#username0").val();
        const userPassword = $("#password0").val();
        $.ajax({
            url: "../Co-Chef-Backend/rest/user",
            method: "POST",
            data: {
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword
            },
            success: (response, status, xhr) => {
                if (xhr.status === 201) {
                    toastr.success();
                    USER_NAME = userName;
                    USER_EMAIL = userEmail;
                    USER_PASSWORD = userPassword;
                    setTimeout(() => {
                        switchToScene(sceneData.INTRO.sceneId);
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
    });

    loginButton0.addEventListener("click", () => {
        switchToScene(sceneData.LOGIN.sceneId);
    });

    signupButton.addEventListener("click", () => {
        switchToScene(sceneData.SIGNUP.sceneId);
    });

    tutorialButton.addEventListener("click", () => {
        switchToScene(sceneData.TUTORIAL.sceneId);
        audio.switchAudio("tutorialAudio", audio.audio.volume);
    });

    connectButton.addEventListener("click", () => {
        switchToScene(sceneData.CONNECT.sceneId);
        userBackground.style.display = "flex";
        userHeader.style.display = "block";
        userContainer.style.display = "block";
        connectBackButton.style.display = "flex";
        connectRefreshButton.style.display = "flex";
        updateAvailability(true, USER_EMAIL, USER_PASSWORD);
        ListUsers();
        if (activeScene === sceneData.CONNECT.sceneId) {
            checkUserWillPlayPeriodically();
        }

        // scenes[activeScene].restartClick();
        // scenes[activeScene].changeText();
        // SelectBackButton.style.display = "flex";
        // characterName.style.display = "flex";
        // speechText.style.display = "flex";
        // characterContainer.style.display = "flex";
    });

    connectBackButton.addEventListener("click", () => {
        userBackground.style.display = "none";
        userHeader.style.display = "none";
        userContainer.style.display = "none";
        connectBackButton.style.display = "none";
        connectRefreshButton.style.display = "none";
        userContainer.innerHTML = "";
        switchToScene(sceneData.START_MENU.sceneId);
    });

    connectRefreshButton.addEventListener("click", () => {
        userContainer.innerHTML = "";
        ListUsers();
    });

    optionsButton.addEventListener("click", () => {
        switchToScene(sceneData.OPTIONS.sceneId);
        document.getElementById("optionsHeader").style.display = "flex";
        document.getElementById("options-backButton-container").style.display = "flex";
        document.getElementById("volumeIcon").style.display = "flex";
        volumeBar.show();
        volumeBar.setup();
    });

    restartButton.addEventListener("click", () => {
        location.reload(); // Reload the page
    });

    tutorialBackButton.addEventListener("click", () => {
        switchToScene(sceneData.START_MENU.sceneId);
        audio.switchAudio("startMenuAudio", audio.audio.volume);
        tutorialBackButton.style.display = "none";
    });

    optionsBackButton.addEventListener("click", () => {
        switchToScene(sceneData.START_MENU.sceneId);
        volumeBar.hide();
        optionsBackButton.style.display = "none";
    });

    volumeIcon.addEventListener("click", () => {
        if (volumeIcon.src.includes("muteVolumeIcon.png") || volumeBar.volume <= 0) {
            volumeIcon.src = "Assets/Sprites/Icons/volumeIcon.png";
            volumeIcon.style.width = "6vw";
            volumeIcon.style.transform = "translate(-180%, -50%)"
            volumeBar.unmuteVolume();
        } else if (!volumeIcon.src.includes("muteVolumeIcon.png") || volumeBar.volume > 0) {
            volumeIcon.src = "Assets/Sprites/Icons/muteVolumeIcon.png";
            volumeIcon.style.width = "5vw";
            volumeIcon.style.transform = "translate(-214%, -50%)"
            volumeBar.setVolume(0);
        }
    });

    volumeBar.volumeContainer.addEventListener("click", () => {
        console.log(volumeBar.volume)
        if (volumeBar.volume > 0) {
            volumeIcon.src = "Assets/Sprites/Icons/volumeIcon.png";
            volumeIcon.style.width = "6vw";
            volumeIcon.style.transform = "translate(-180%, -50%)"
        } else if (volumeBar.volume <= 0) {
            volumeIcon.src = "Assets/Sprites/Icons/muteVolumeIcon.png";
            volumeIcon.style.width = "5vw";
            volumeIcon.style.transform = "translate(-214%, -50%)"
        }
    });

    SelectBackButton.addEventListener("click", () => {
        if (SelectConfirmButton.style.display === "flex") {
            SelectConfirmButton.style.display = "none";
            scenes[activeScene].restartClick();
            scenes[activeScene].changeText();
        } else if (activeScene === sceneData.DISH_SELECT.sceneId) {
            switchToScene(sceneData.CHARACTER_SELECT.sceneId);
            dishName.style.display = "none";
            characterName.style.display = "flex";
            scenes[activeScene].restartClick();
            scenes[activeScene].changeText();
        } else {
            switchToScene(sceneData.START_MENU.sceneId);
            speechText.style.display = "none";
            SelectBackButton.style.display = "none";
            SelectConfirmButton.style.display = "none";
            characterName.style.display = "none";
            characterContainer.style.display = "none";
            dishName.style.display = "none";
        }
    })

    SelectConfirmButton.addEventListener("click", () => {
        if (activeScene === sceneData.CHARACTER_SELECT.sceneId) {
            scenes[activeScene].rememberPick();
            switchToScene(sceneData.DISH_SELECT.sceneId);
            scenes[activeScene].restartClick();
            scenes[activeScene].changeText();
            SelectConfirmButton.style.display = "none";
            characterName.style.display = "none";
            dishName.style.display = "flex";
            scenes[activeScene].changeText();
        } else {
            dishName.style.display = "none";
            SelectBackButton.style.display = "none";
            SelectConfirmButton.style.display = "none";
            characterContainer.style.display = "none";
            speechText.style.display = "none";
            scenes[activeScene].rememberPick();
            switchToScene(sceneData.Gameplay.sceneId);
            // Handle Recipe Text
            if (REMEMBER_DISH === sceneData.DISH_SELECT.noodlesName) {
                for (let i = 0; i < recipeListItems.length; i++) {
                    let recipeItem = recipeItems[i].getElementsByTagName("span")[0];
                    recipeItem.innerHTML = NOODLE_RECIPE.recipeArr[i];
                }
                scenes[activeScene].resetRecipe(NOODLE_RECIPE);
                scenes[activeScene].resetWinLose();
            } else if (REMEMBER_DISH === sceneData.DISH_SELECT.curryName) {
                for (let i = 0; i < recipeListItems.length; i++) {
                    let recipeItem = recipeItems[i].getElementsByTagName("span")[0];
                    recipeItem.innerHTML = CURRY_RECIPE.recipeArr[i];
                }
                scenes[activeScene].resetRecipe(CURRY_RECIPE);
                scenes[activeScene].resetWinLose();
            } else if (REMEMBER_DISH === sceneData.DISH_SELECT.fishTacoName) {
                for (let i = 0; i < recipeListItems.length; i++) {
                    let recipeItem = recipeItems[i].getElementsByTagName("span")[0];
                    recipeItem.innerHTML = FISH_TACO_RECIPE.recipeArr[i];
                }
                scenes[activeScene].resetRecipe(FISH_TACO_RECIPE);
                scenes[activeScene].resetWinLose();
            }
            // ...
            audio.switchAudio("gameplayAudio", audio.audio.volume);
            scenes[activeScene].setPlayerImage();
            scenes[activeScene].resetTimer();
            scenes[activeScene].allowInteract(true);
            ic_options.style.display = "flex";
            ic_recipes.style.display = "flex";
            ic_slot.style.display = "flex";
            ic_com.style.display = "flex";
            ic_timer.style.display = "flex";
            timer.style.display = "flex";
            chat_container.style.display = "block";
        }
    })

    SelectRightArrowButton.addEventListener("click", () => {
        scenes[activeScene].changeRight();
        SelectConfirmButton.style.display = "none";
        scenes[activeScene].restartClick();
        scenes[activeScene].changeText();
    })

    SelectLeftArrowButton.addEventListener("click", () => {
        scenes[activeScene].changeLeft();
        SelectConfirmButton.style.display = "none";
        scenes[activeScene].restartClick();
        scenes[activeScene].changeText();
    })

    ic_options.addEventListener("click", () => {
        scenes[activeScene].toggleOptions()
        volumeContainer.classList.toggle("newVolumeContainer");
        volumeBar.show();
        volumeBar.setup();
        volumeIcon.classList.toggle("newVolumeIcon");
        if (!canMove) {
            scenes[activeScene].allowInteract(false);
            volumeIcon.style.display = "flex";
            volumeContainer.style.display = "flex";
            gameplayBackButton.style.display = "flex";
            gameplayMenuButton.style.display = "flex";
            ic_recipes.style.display = "none";
            chat_container.style.display = "none";
            ic_com.style.display = "none";
        } else {
            volumeIcon.style.display = "none";
            volumeContainer.style.display = "none";
            gameplayBackButton.style.display = "none";
            gameplayMenuButton.style.display = "none";
            ic_recipes.style.display = "flex";
            chat_container.style.display = "flex";
            ic_com.style.display = "flex";
            scenes[activeScene].allowInteract(true);
        }
    });

    gameplayBackButton.addEventListener("click", () => {
        scenes[activeScene].toggleOptions()
        volumeContainer.classList.toggle("newVolumeContainer");
        volumeBar.show();
        volumeBar.setup();
        volumeIcon.classList.toggle("newVolumeIcon");
        volumeIcon.style.display = "none";
        volumeContainer.style.display = "none";
        gameplayBackButton.style.display = "none";
        gameplayMenuButton.style.display = "none";
        ic_recipes.style.display = "flex";
        ic_recipes.style.display = "flex";
        chat_container.style.display = "flex";
        ic_com.style.display = "flex";
        scenes[activeScene].allowInteract(true);
    });

    gameplayMenuButton.addEventListener("click", () => {
        scenes[activeScene].toggleOptions()
        volumeContainer.classList.remove("newVolumeContainer");
        volumeBar.show();
        volumeBar.setup();
        volumeIcon.classList.remove("newVolumeIcon");
        volumeIcon.style.display = "none";
        volumeContainer.style.display = "none";
        gameplayBackButton.style.display = "none";
        gameplayMenuButton.style.display = "none";
        ic_timer.style.display = "none";
        timer.style.display = "none";
        ic_recipes.style.display = "none";
        slotItem.style.display = "none";
        ic_slot.style.display = "none";
        ic_options.style.display = "none";
        ic_com.style.display = "none";
        chat_container.style.display = "none";
        audio.switchAudio("startMenuAudio", audio.audio.volume);
        scenes[activeScene].resetCollider();
        scenes[activeScene].resetWinLose();
        switchToScene(sceneData.START_MENU.sceneId);
    });

    endMenuButton.addEventListener("click", () => {
        scenes[activeScene].toggleWinLose();
        scenes[activeScene].resetCollider();
        endMenuButton.style.display = "none";
        ic_timer.style.display = "none";
        ic_timer.style.display = "none";
        timer.style.display = "none";
        ic_recipes.style.display = "none";
        slotItem.style.display = "none";
        ic_slot.style.display = "none";
        ic_options.style.display = "none";
        ic_com.style.display = "none";
        chat_container.style.display = "none";
        audio.switchAudio("startMenuAudio", audio.audio.volume);
        plateItem.style.display = "none";
        scenes[activeScene].resetWinLose();
        switchToScene(sceneData.START_MENU.sceneId);
    });

    ic_recipes.addEventListener("click", () => {
        if (canMove) {
            scenes[activeScene].toggleRecipe()
            ic_options.style.display = "none";
            recipeText.style.display = "flex";
            chat_container.style.display = "none";
            ic_com.style.display = "none";
            scenes[activeScene].allowInteract(false);
        } else {
            scenes[activeScene].toggleRecipe()
            ic_options.style.display = "flex";
            recipeText.style.display = "none";
            chat_container.style.display = "flex";
            ic_com.style.display = "flex";
            scenes[activeScene].allowInteract(true);
        }
    });

    document.addEventListener("keydown", (e) => {
        const key = e.key;
        switch (key) {
            case "ArrowLeft":
                updateImageSource(leftArrow, "Assets/Sprites/GameplayUI/arrowLeft-press.png");
                break;
            case "ArrowUp":
                updateImageSource(upArrow, "Assets/Sprites/GameplayUI/arrowUp-press.png");
                break;
            case "ArrowRight":
                updateImageSource(rightArrow, "Assets/Sprites/GameplayUI/arrowRight-press.png");
                break;
            case "ArrowDown":
                updateImageSource(downArrow, "Assets/Sprites/GameplayUI/arrowDown-press.png");
                break;

            case "F8":
                REMEMBER_CHARACTER = "Chef";
                scenes[activeScene].chefMode(REMEMBER_CHARACTER);
                break;
        }
    });

    document.addEventListener("keyup", (e) => {
        const key = e.key;
        switch (key) {
            case "ArrowLeft":
                updateImageSource(leftArrow, "Assets/Sprites/GameplayUI/arrowLeft.png");
                break;
            case "ArrowUp":
                updateImageSource(upArrow, "Assets/Sprites/GameplayUI/arrowUp.png");
                break;
            case "ArrowRight":
                updateImageSource(rightArrow, "Assets/Sprites/GameplayUI/arrowRight.png");
                break;
            case "ArrowDown":
                updateImageSource(downArrow, "Assets/Sprites/GameplayUI/arrowDown.png");
                break;
        }
    });

    fishTile.addEventListener("click", () => {
        slotItem.style.width = "4vw";
        slotItem.src = fishTile.querySelector("#fish").src;
        scenes[activeScene].changeItemFromSlot(10);
        scenes[activeScene].closeInventory();

    });

    avocadoTile.addEventListener("click", () => {
        slotItem.style.width = "2.5vw";
        slotItem.src = avocadoTile.querySelector("#avocado").src;
        scenes[activeScene].changeItemFromSlot(6.5);
        scenes[activeScene].closeInventory();
    });

    cabbageTile.addEventListener("click", () => {
        slotItem.style.width = "3vw";
        slotItem.src = cabbageTile.querySelector("#cabbage").src;
        scenes[activeScene].changeItemFromSlot(8);
        scenes[activeScene].closeInventory();
    });

    carrotTile.addEventListener("click", () => {
        slotItem.style.width = "3.5vw";
        slotItem.src = carrotTile.querySelector("#carrot").src;
        scenes[activeScene].changeItemFromSlot(8.5);
        scenes[activeScene].closeInventory();
    });

    garlicTile.addEventListener("click", () => {
        slotItem.style.width = "2.5vw";
        slotItem.src = garlicTile.querySelector("#garlic").src;
        scenes[activeScene].changeItemFromSlot(7);
        scenes[activeScene].closeInventory();
    });

    noodlesTile.addEventListener("click", () => {
        slotItem.style.width = "2.5vw";
        slotItem.src = noodlesTile.querySelector("#noodles").src;
        scenes[activeScene].changeItemFromSlot(7);
        scenes[activeScene].closeInventory();
    });

    onionTile.addEventListener("click", () => {
        slotItem.style.width = "2vw";
        slotItem.src = onionTile.querySelector("#onion").src;
        scenes[activeScene].changeItemFromSlot(5.5);
        scenes[activeScene].closeInventory();
    });

    potatoTile.addEventListener("click", () => {
        slotItem.style.width = "2.5vw";
        slotItem.src = potatoTile.querySelector("#potato").src;
        scenes[activeScene].changeItemFromSlot(5.5);
        scenes[activeScene].closeInventory();
    });

    tomatoTile.addEventListener("click", () => {
        slotItem.style.width = "2.5vw";
        slotItem.src = tomatoTile.querySelector("#tomato").src;
        scenes[activeScene].changeItemFromSlot(7);
        scenes[activeScene].closeInventory();
    });

    redPepperTile.addEventListener("click", () => {
        slotItem.style.width = "2.5vw";
        slotItem.src = redPepperTile.querySelector("#red-pepper").src;
        scenes[activeScene].changeItemFromSlot(6);
        scenes[activeScene].closeInventory();
    });

    greenPepperTile.addEventListener("click", () => {
        slotItem.style.width = "2.5vw";
        slotItem.src = greenPepperTile.querySelector("#green-pepper").src;
        scenes[activeScene].changeItemFromSlot(6);
        scenes[activeScene].closeInventory();
    });

    mushroom1Tile.addEventListener("click", () => {
        slotItem.style.width = "2.5vw";
        slotItem.src = mushroom1Tile.querySelector("#mushroom1").src;
        scenes[activeScene].changeItemFromSlot(5.5);
        scenes[activeScene].closeInventory();
    });

    greenOnionTile.addEventListener("click", () => {
        slotItem.style.width = "3.5vw";
        slotItem.src = greenOnionTile.querySelector("#green-onion").src;
        scenes[activeScene].changeItemFromSlot(8);
        scenes[activeScene].closeInventory();
    });

    redMeatTile.addEventListener("click", () => {
        slotItem.style.width = "4vw";
        slotItem.src = redMeatTile.querySelector("#red-meat").src;
        scenes[activeScene].changeItemFromSlot(10);
        scenes[activeScene].closeInventory();
    });

    tortillaTile.addEventListener("click", () => {
        if (extractFileNameWithExtension(slotItem.src) === "fish_Cooked.png") {
            scenes[activeScene].closeInventory();
            scenes[activeScene].updateSinkItemSrc("ic_slot.png");
            slotItem.src = "Assets/Sprites/GameplayUI/ic_slot.png";
            plateItem.style.display = "flex";
        } else {
            slotItem.style.width = "3vw";
            slotItem.src = tortillaTile.querySelector("#tortilla").src;
            scenes[activeScene].changeItemFromSlot(8);
            scenes[activeScene].closeInventory();
        }
    });
});

// Add event listener for beforeunload event
window.addEventListener("beforeunload", () => {
    // Set user availability to false before leaving the site
    updateAvailability(false, USER_EMAIL, USER_PASSWORD);
});

const updateImageSource = (element, src) => {
    element.src = src;
}

const updateAvailability = (isAvailable, userEmail, password) => {
    $.ajax({
        url: "../Co-Chef-Backend/rest/updateUserAvailability/" + userEmail + "/" + password + "/" + isAvailable,
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
const updateWillPlay = (isWillPlay, userEmail, userPassword) => {
    $.ajax({
        url: "../Co-Chef-Backend/rest/updateUserWillPlay/" + userEmail + "/" + userPassword + "/" + isWillPlay,
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

const isUserAvailable = (userEmail, userPassword, callback) => {
    $.ajax({
        url: "../Co-Chef-Backend/rest/checkUserAvailability/" + userEmail + "/" + userPassword,
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
const isUserWillPlay = (userEmail, userPassword, callback) => {
    $.ajax({
        url: "../Co-Chef-Backend/rest/checkUserWillPlay/" + userEmail + "/" + userPassword,
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

const ListUsers = () => {
    $.ajax({
        url: "../Co-Chef-Backend/rest/users",
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
                    if (userEmail === USER_EMAIL && userPassword === USER_PASSWORD) {
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
                                .addClass("clickable") // Add clickable class for styling
                                .on("click", () => {
                                    // console.log("Clicked user email: " + userEmail)
                                    // console.log("Clicked user password: " + userPassword)
                                    // console.log("Current user email: " + USER_EMAIL)
                                    // console.log("Current user password: " + USER_PASSWORD)
                                    saveGameOpponent(username);
                                    updateWillPlay(true, userEmail, userPassword);
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

const getUserNameByEmailAndPassword = (email, password, callback) => {
    $.ajax({
        url: "../Co-Chef-Backend/rest/getUserNameByEmailAndPassword/" + email + "/" + password,
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

const saveGameOpponent = (opponentUsername) => {
    $.ajax({
        url: "../Co-Chef-Backend/rest/saveGameOpponent/" + USER_EMAIL + "/" + USER_PASSWORD + "/" + opponentUsername,
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

const getUserNameByGameOpponent = (gameOpponent, callback) => {
    $.ajax({
        url: "../Co-Chef-Backend/rest/getUserByGameOpponent/" + gameOpponent,
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

// Neka malo odmori
// const getGameOpponentByUserName = (username, callback) => {
//     $.ajax({
//         url: "../Co-Chef-Backend/rest/getGameOpponentByUser/" + username,
//         method: "GET",
//         success: (response) => {
//             if (response.gameOpponent) {
//                 const gameOpponent = response.gameOpponent;
//                 // Pass the game opponent to the callback function
//                 callback(gameOpponent);
//             } else {
//                 // No game opponent found
//                 callback(null);
//             }
//         },
//         error: (xhr, status, error) => {
//             // Handle error if the request fails
//             console.log("Error: " + error);
//             callback(null);
//         },
//     });
// };

const updateGameOpponent = (userEmail, gameOpponent) => {
    $.ajax({
        url: "../Co-Chef-Backend/rest/updateGameOpponent/" + userEmail + "/" + gameOpponent,
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

const updateUserGameId = (userName, gameId) => {
    $.ajax({
        url: "../Co-Chef-Backend/rest/updateGameId/" + userName + "/" + gameId,
        type: "PUT",
        success: function() {
            console.log("Game ID updated successfully");
            // Handle success response
        },
        error: function() {
            console.log("Failed to update game ID");
            // Handle error response
        }
    });
};

// Function to show the dialogue
const showDialogue = () => {
    let randomGameId = Math.floor(Math.random() * 1000) + 1;
    const confirmDialog = confirm("Do you want to play a game with?");
    if (confirmDialog) {
        updateUserGameId(USER_NAME, randomGameId);
        setOpponentsGameOpponent(USER_NAME, randomGameId);
    } else {
        alert("Rejected your game invitation.");
    }
};

// Function to periodically check if a user is willing to play
const checkUserWillPlayPeriodically = () => {
    willPlayIntervalId = setInterval(() => {
        isUserWillPlay(USER_EMAIL, USER_PASSWORD, (willPlay) => {
            if (willPlay) {
                showDialogue();
                updateWillPlay(false, USER_EMAIL, USER_PASSWORD);
            } else {
                clearInterval(willPlayIntervalId); // Stop the interval
            }
        });
    }, 5000);
};

const setOpponentsGameOpponent = (userName, randomGameId) => {
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

