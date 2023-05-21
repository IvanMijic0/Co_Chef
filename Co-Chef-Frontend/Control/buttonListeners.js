import { sceneData } from "../Scenes/scene-data.js";
import { switchToScene, volumeBar, audio, intro } from "./controller.js";

document.addEventListener("DOMContentLoaded", () => {

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
    const charSelectBackButton = document.getElementById("CharSelect-backButton-container");

    loginButton.addEventListener("click", (e) => {
        // TODO Add login functionality
        e.preventDefault();
        switchToScene(sceneData.INTRO.sceneId);
        intro()
    });

    loginButton0.addEventListener("click", () => {
        switchToScene(sceneData.LOGIN.sceneId);
    });

    signupButton.addEventListener("click", () => {
        switchToScene(sceneData.SIGNUP.sceneId);
    });

    signupButton0.addEventListener("click", (e) => {
        // TODO Add signup functionality
        e.preventDefault();
        switchToScene(sceneData.INTRO.sceneId);
        intro();
    });

    tutorialButton.addEventListener("click", () => {
        switchToScene(sceneData.TUTORIAL.sceneId);
        audio.switchAudio("tutorialAudio", audio.audio.volume);
    });

    connectButton.addEventListener("click", () => {
        switchToScene(sceneData.CHARACTER_SELECT.sceneId);
        document.getElementById("CharSelect-backButton-container").style.display = "flex";
        document.getElementById("character-name").style.display = "flex";
        document.getElementById("character-container").style.display = "flex";
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
        switchToScene(sceneData.INTRO.sceneId);
        intro();
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
        if (volumeIcon.src.includes("muteVolumeIcon.png")) {
            volumeIcon.src = "Assets/Sprites/volumeIcon.png";
            volumeIcon.style.width = "15%";
            volumeIcon.style.transform = "translate(-180%, -50%)"
            volumeBar.unmuteVolume();
        }
        else {
            volumeIcon.src = "Assets/Sprites/muteVolumeIcon.png";
            volumeIcon.style.width = "13%";
            volumeIcon.style.transform = "translate(-210%, -50%)"
            volumeBar.setVolume(0);
        }
    });

    charSelectBackButton.addEventListener("click", () => {
        switchToScene(sceneData.START_MENU.sceneId);
        charSelectBackButton.style.display = "none";
        document.getElementById("character-name").style.display = "none";
        document.getElementById("character-container").style.display = "none";
    })
});

