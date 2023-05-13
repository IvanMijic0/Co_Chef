import Scene  from "../Scenes/scene.js";
import { sceneData } from "../Scenes/scene-data.js";

const scenes = [
    new Scene(sceneData.INTRO.canvasId, sceneData.INTRO.backgroundColor, sceneData.INTRO.image, false),
    new Scene(sceneData.START_MENU.canvasId, sceneData.START_MENU.backgroundColor, sceneData.START_MENU.image, true),
    new Scene(sceneData.TEST.canvasId, sceneData.TEST.backgroundColor, sceneData.TEST.image, false)
];

let activeScene = 0;
let previousScene = 0;



const drawActiveScene = () => {
    if (activeScene === 0) {
        setTimeout(() => {switchToScene(1);}, 3500);
    }
    scenes[activeScene].show();
    scenes[activeScene].draw();
    requestAnimationFrame(drawActiveScene);
};

drawActiveScene();

document.getElementById("switchButton-container").addEventListener("click", () => {
    switchToScene(sceneData.START_MENU.sceneId);
});

document.getElementById("testButton-container").addEventListener("click", () => {
    switchToScene(sceneData.TEST.sceneId);
});

document.getElementById("backButton-container").addEventListener("click", () => {
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

    console.log("Active scene -> " + activeScene);
    console.log("Previous scene -> " + previousScene);
});


const switchToScene = (sceneId) => {
    const currentScene = scenes[activeScene];
    const nextScene = scenes[sceneId];

    currentScene.hide();
    nextScene.show();

    previousScene = activeScene;
    activeScene = sceneId;

    console.log("Active scene -> " + activeScene);
    console.log("Previous scene -> " + previousScene);
};