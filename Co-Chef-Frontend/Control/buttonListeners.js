import { sceneData } from "../Scenes/scene-data.js";
import { switchToScene, volumeBar, audio, intro } from "./controller.js";

const tutorialButton = document.getElementById("tutorialButton-container");
const connectButton = document.getElementById("connectButton-container");
const optionsButton = document.getElementById("optionsButton-container");
const restartButton = document.getElementById("restartButton-container");
const tutorialBackButton = document.getElementById("tutorial-backButton-container");
const optionsBackButton = document.getElementById("options-backButton-container");

tutorialButton.addEventListener("click", () => {
    switchToScene(sceneData.TUTORIAL.sceneId);
    audio.switchAudio("tutorialAudio", audio.audio.volume);
});

connectButton.addEventListener("click", () => {
    // TODO: Finish Connect Scene
    console.log("Connect Scene -> In development...");
});

optionsButton.addEventListener("click", () => {
    switchToScene(sceneData.OPTIONS.sceneId);
    document.getElementById("optionsHeader").style.display = "flex";
    document.getElementById("options-backButton-container").style.display = "flex";
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
});

optionsBackButton.addEventListener("click", () => {
    switchToScene(sceneData.START_MENU.sceneId);
    // audio.switchAudio("startMenuAudio");
    volumeBar.hide();
});
