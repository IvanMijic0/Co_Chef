import {sceneData} from "../data-utils/scene-data.js";
import {switchToScene, volumeBar, audio, intro, activeScene, scenes} from "./controller.js";
import {extractFileNameWithExtension} from "../utils/string-manipulation.js";
import {
    checkUsersHaveWaitingToPlay,
    checkUserWillPlayPeriodically,
    deleteUsersWithSameNonZeroGameId, getGameOpponentByUserName, getRecipeByUserName,
    getUserNameByEmailAndPassword,
    getUserNameByGameOpponent,
    ListUsers,
    resetGameOpponent,
    resetRecipe,
    updateAvailability,
    updateRecipe,
    updateUserGameId, updateUserTaskCompleted,
    updateWaitingToPlay,
    updateWillPlay
} from "../Services/user-service.js";

export const userHeader = document.getElementById("userHeader");
export const userListContainer = document.getElementById("userListContainer");
export const userContainer = document.getElementById("userContainer");
export const userBackground = document.getElementById("user-background");
export const connectBackButton = document.getElementById("connect-backButton-container");
export const connectRefreshButton = document.getElementById("connect-refreshButton-container");
export const speechText = document.getElementById("speechText");
export const SelectBackButton = document.getElementById("CharSelect-backButton-container");
export const characterName = document.getElementById("character-name");
export const characterContainer = document.getElementById("character-container");

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
    const SelectConfirmButton = document.getElementById("CharSelect-confirmButton-container");
    const SelectRightArrowButton = document.getElementById("rightArrow");
    const SelectLeftArrowButton = document.getElementById("leftArrow");
    const dishName = document.getElementById("dish-name");
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


    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        const userEmail = $("#username").val();
        const userPassword = $("#password").val();
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/checkUserByEmailAndPassword/" + userEmail + "/" + userPassword,
            method: "GET",
            success: (response) => {
                if (response) {
                    toastr.success("Login Successful!");
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
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/user",
            method: "POST",
            data: {
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword
            },
            success: (response, status, xhr) => {
                if (xhr.status === 201) {
                    toastr.success("Signup Successful!");
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
        userListContainer.style.display = "block";
        userContainer.style.display = "block";
        connectBackButton.style.display = "flex";
        connectRefreshButton.style.display = "flex";
        updateAvailability(1, USER_EMAIL, USER_PASSWORD);
        ListUsers();
        if (activeScene === sceneData.CONNECT.sceneId) {
            checkUserWillPlayPeriodically();
        }
    });

    connectBackButton.addEventListener("click", () => {
        userBackground.style.display = "none";
        userHeader.style.display = "none";
        userListContainer.style.display = "none";
        connectBackButton.style.display = "none";
        connectRefreshButton.style.display = "none";
        userContainer.innerHTML = "";
        if (willPlayIntervalId) {
            clearInterval(willPlayIntervalId);
        }
        updateAvailability(0, USER_EMAIL, USER_PASSWORD);
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
            switchToScene(sceneData.CONNECT.sceneId);
            deleteUsersWithSameNonZeroGameId(USER_NAME);
            userHeader.style.display = "block";
            userListContainer.style.display = "block";
            connectBackButton.style.display = "flex";
            connectRefreshButton.style.display = "flex";
            userBackground.style.display = "flex";
            updateAvailability(1, USER_EMAIL, USER_PASSWORD);
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
            updateWaitingToPlay(USER_NAME, 1);
            getGameOpponentByUserName(USER_NAME, (gameOpponent) => {
                if (gameOpponent) {
                    checkUsersHaveWaitingToPlay(USER_NAME, gameOpponent, (isWaitingToPlay) => {
                        if (isWaitingToPlay) {
                            dishName.style.display = "none";
                            SelectBackButton.style.display = "none";
                            SelectConfirmButton.style.display = "none";
                            characterContainer.style.display = "none";
                            speechText.style.display = "none";
                            scenes[activeScene].rememberPick();
                            getGameOpponentByUserName(USER_NAME, (gameOpponent) => {
                                if (gameOpponent) {
                                    updateRecipe(gameOpponent, REMEMBER_DISH);
                                }
                            });
                            switchToScene(sceneData.Gameplay.sceneId);
                            updateAvailability(0, USER_EMAIL, USER_PASSWORD);
                            toastr.info("Wait for connection");
                            scenes[activeScene].setPlayerImage();
                            setTimeout(() => {
                                getUserNameByGameOpponent(USER_NAME, (gameOpponent) => {
                                    if (gameOpponent) {
                                        checkUsersHaveWaitingToPlay(USER_NAME, gameOpponent, (isWaitingToPlay) => {
                                            if (isWaitingToPlay) {
                                                alert("Successfully connected!");
                                                scenes[activeScene].resetTimer();
                                                scenes[activeScene].allowInteract(true);
                                                updateWaitingToPlay(USER_NAME, 0);
                                            } else {
                                                alert("Opponent did not choose on time.")
                                                updateWaitingToPlay(USER_NAME, 0);
                                                resetGameOpponent(USER_EMAIL);
                                                updateUserGameId(USER_NAME, 0);
                                                resetRecipe(USER_EMAIL);
                                                updateUserGameId(USER_NAME, 0);
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
                                            }
                                        });
                                    }
                                });
                                getRecipeByUserName(USER_NAME, (recipe) => {
                                    if (recipe) {
                                        console.log(USER_NAME + " " + recipe)
                                        if (recipe === sceneData.DISH_SELECT.noodlesName) {
                                            for (let i = 0; i < recipeListItems.length; i++) {
                                                let recipeItem = recipeItems[i].getElementsByTagName("span")[0];
                                                recipeItem.innerHTML = NOODLE_RECIPE.recipeArr[i];
                                            }
                                            scenes[activeScene].resetRecipe(NOODLE_RECIPE);
                                            scenes[activeScene].resetWinLose();
                                        }
                                    } else if (recipe === sceneData.DISH_SELECT.curryName) {
                                        for (let i = 0; i < recipeListItems.length; i++) {
                                            let recipeItem = recipeItems[i].getElementsByTagName("span")[0];
                                            recipeItem.innerHTML = CURRY_RECIPE.recipeArr[i];
                                        }
                                        scenes[activeScene].resetRecipe(CURRY_RECIPE);
                                        scenes[activeScene].resetWinLose();
                                    } else if (recipe === sceneData.DISH_SELECT.fishTacoName) {
                                        for (let i = 0; i < recipeListItems.length; i++) {
                                            let recipeItem = recipeItems[i].getElementsByTagName("span")[0];
                                            recipeItem.innerHTML = FISH_TACO_RECIPE.recipeArr[i];
                                        }
                                        scenes[activeScene].resetRecipe(FISH_TACO_RECIPE);
                                        scenes[activeScene].resetWinLose();
                                    }
                                });

                                audio.switchAudio("gameplayAudio", audio.audio.volume);
                                ic_options.style.display = "flex";
                                ic_recipes.style.display = "flex";
                                ic_slot.style.display = "flex";
                                ic_com.style.display = "flex";
                                ic_timer.style.display = "flex";
                                timer.style.display = "flex";
                                chat_container.style.display = "block";
                            }, 10000);

                        } else {
                            alert("Wait for the other user to confirm")
                        }
                    });
                }
            });
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
        if (!CAN_MOVE) {
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
        updateWaitingToPlay(USER_NAME, 0);
        updateAvailability(0, USER_EMAIL, USER_PASSWORD);
        updateUserTaskCompleted(USER_NAME, 0);
        deleteUsersWithSameNonZeroGameId(USER_NAME);
        resetGameOpponent(USER_EMAIL);
        updateUserGameId(USER_NAME, 0);
        resetRecipe(USER_EMAIL);
        updateUserGameId(USER_NAME, 0);
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
        updateWaitingToPlay(USER_NAME, 0);
        updateAvailability(0, USER_EMAIL, USER_PASSWORD);
        updateUserTaskCompleted(USER_NAME, 0);
        resetGameOpponent(USER_EMAIL);
        updateUserGameId(USER_NAME, 0);
        resetRecipe(USER_EMAIL);
        updateUserGameId(USER_NAME, 0);
        scenes[activeScene].toggleWinLose();
        scenes[activeScene].resetCollider();
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
        endMenuButton.style.display = "none";
        switchToScene(sceneData.START_MENU.sceneId);
    });

    ic_recipes.addEventListener("click", () => {
        if (CAN_MOVE) {
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

    // Add event listener for beforeunload event
    window.addEventListener("beforeunload", () => {
        // Set user availability to false before leaving the site
        if (USER_NAME !== "" || USER_EMAIL !== "" || USER_PASSWORD !== "") {
            resetGameOpponent(USER_EMAIL);
            updateAvailability(false, USER_EMAIL, USER_PASSWORD);
            updateUserTaskCompleted(USER_NAME, 0);
            updateWillPlay(0, USER_EMAIL, USER_PASSWORD);
            updateUserGameId(USER_NAME, 0);
            resetRecipe(USER_EMAIL);
            updateWaitingToPlay(USER_NAME, 0);
            deleteUsersWithSameNonZeroGameId(USER_NAME);
            getGameOpponentByUserName(USER_NAME, (gameOpponent) => {
                if (gameOpponent) {
                    deleteUsersWithSameNonZeroGameId(USER_NAME, gameOpponent);
                }
            });
        }
    });

    const updateImageSource = (element, src) => {
        element.src = src;
    }
});

