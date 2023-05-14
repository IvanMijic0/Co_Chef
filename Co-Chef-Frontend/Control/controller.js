import { IntroScene, StartMenuScene, TutorialScene } from "../Scenes/scene.js";
import { sceneData } from "../Scenes/scene-data.js";
import { LazyAudio } from "../utils/audio.js";

const scenes = [
    new IntroScene(sceneData.INTRO.canvasId, sceneData.INTRO.logo, sceneData.INTRO.background, false),
    new StartMenuScene(sceneData.START_MENU.canvasId, sceneData.START_MENU.background, true),
    new TutorialScene(sceneData.TUTORIAL.canvasId, sceneData.TUTORIAL.image, false),
];

const audio = new LazyAudio("startMenuAudio");

let activeScene = 0;
let previousScene = 0;

const intro = () => {
    scenes[activeScene].show();
    audio.stop();
    if (activeScene === 0) {
        setTimeout(() => {
            switchToScene(sceneData.START_MENU.sceneId);
            audio.restart();
        }, 3500);
    }
}
intro();

const drawActiveScene = () => {
    scenes[activeScene].draw();
    requestAnimationFrame(drawActiveScene);
};
drawActiveScene();

function backToPrev() {
    for (let i = 0; i < scenes.length; i++) {
        if (activeScene === i && previousScene === i) {
            previousScene = 0;
            break;
        }
    }
    const currentScene = scenes[activeScene];
    const nextScene = scenes[previousScene];

    currentScene.hide();
    nextScene.show();

    activeScene = previousScene;
}

const switchToScene = (sceneId) => {
    const currentScene = scenes[activeScene];
    const nextScene = scenes[sceneId];

    currentScene.hide();
    nextScene.show();

    previousScene = activeScene;
    activeScene = sceneId;

    // console.log("Active scene -> " + activeScene);
    // console.log("Previous scene -> " + previousScene);
};

document.getElementById("tutorialButton-container").addEventListener("click", () => {
    switchToScene(sceneData.TUTORIAL.sceneId);
    audio.switchAudio("tutorialAudio");
});

document.getElementById("connectButton-container").addEventListener("click", () => {
    // TODO Finish Connect Scene
    console.log("Connect Scene -> In development...")
});

document.getElementById("optionsButton-container").addEventListener("click", () => {
    // TODO Finish Options Scene
    console.log("Options Scene -> In development...")
});

document.getElementById("restartButton-container").addEventListener("click", () => {
    switchToScene(sceneData.INTRO.sceneId);
    intro();
});

document.getElementById("backButton-container").addEventListener("click", () => {
    switchToScene(sceneData.START_MENU.sceneId);
    audio.switchAudio("startMenuAudio");
});


