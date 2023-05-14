import { Scene, StartMenuScene }  from "../Scenes/scene.js";
import { sceneData } from "../Scenes/scene-data.js";

const scenes = [
    new Scene(sceneData.INTRO.canvasId, sceneData.INTRO.backgroundColor, sceneData.INTRO.image, false),
    new StartMenuScene(sceneData.START_MENU.canvasId, sceneData.START_MENU.backgroundColor, sceneData.START_MENU.image, true),
];

let activeScene = 0;
let previousScene = 0;


const intro = () => {
    scenes[activeScene].show();
    if (activeScene === 0) {
        setTimeout(() => {switchToScene(1);}, 3500);
    }
}
intro();

const drawActiveScene = () => {
    scenes[activeScene].draw();
    requestAnimationFrame(drawActiveScene);
};
drawActiveScene();

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

document.getElementById("connectButton-container").addEventListener("click", () => {
    console.log("Connect Scene -> In development...")
});

document.getElementById("tutorialButton-container").addEventListener("click", () => {
    console.log("Tutorial Scene -> In development...")
});
document.getElementById("optionsButton-container").addEventListener("click", () => {
    console.log("Options Scene -> In development...")
});

document.getElementById("restartButton-container").addEventListener("click", () => {
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
    intro();

    // console.log("Active scene -> " + activeScene);
    // console.log("Previous scene -> " + previousScene);
});


