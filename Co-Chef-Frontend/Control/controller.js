import {
    IntroScene, OptionsScene, StartMenuScene,
    TutorialScene, LoginScene, SignupScene
} from "../Scenes/scene.js";
import { sceneData } from "../Scenes/scene-data.js";
import { LazyAudio } from "../utils/audio.js";
import { VolumeBar } from "../utils/volume-bar.js";

const scenes = [
    new SignupScene(sceneData.SIGNUP.canvasId, sceneData.SIGNUP.image, false),
    new LoginScene(sceneData.LOGIN.canvasId, sceneData.LOGIN.image, false),
    new IntroScene(sceneData.INTRO.canvasId, sceneData.INTRO.logo, sceneData.INTRO.background, false),
    new StartMenuScene(sceneData.START_MENU.canvasId, sceneData.START_MENU.background, true),
    new TutorialScene(sceneData.TUTORIAL.canvasId, sceneData.TUTORIAL.image, false),
    new OptionsScene(sceneData.OPTIONS.canvasId, sceneData.OPTIONS.image, false),
];

export const audio = new LazyAudio("startMenuAudio");
export const volumeBar = new VolumeBar('volumeBar', 'volumeContainer', audio);

let introText = document.getElementById("introHeader");
let activeScene = 0;
let previousScene = 0;

export const intro = () => {
    if (activeScene === 2) {
        scenes[activeScene].show();
        audio.stop();

        setTimeout(() => {
            introText.style.display = "flex";
            document.addEventListener("click", () => {
                switchToScene(sceneData.START_MENU.sceneId);
                introText.style.display = "none";
                audio.restart();
            }, {once: true});
        }, 3500);
    }
}
intro();

const drawActiveScene = () => {
    scenes[activeScene].draw();
    scenes[activeScene].show();
    requestAnimationFrame(drawActiveScene);
};
drawActiveScene();

function backToPrev() {
    for (let i = 2; i < scenes.length; i++) {
        if (activeScene === i && previousScene === i) {
            previousScene = sceneData.INTRO.sceneId;
            break;
        }
    }
    const currentScene = scenes[activeScene];
    const nextScene = scenes[previousScene];

    currentScene.hide();
    nextScene.show();

    activeScene = previousScene;
}

export const switchToScene = (sceneId) => {
    const currentScene = scenes[activeScene];
    const nextScene = scenes[sceneId];

    currentScene.hide();
    nextScene.show();

    previousScene = activeScene;
    activeScene = sceneId;

    // console.log("Active scene -> " + activeScene);
    // console.log("Previous scene -> " + previousScene);
};
