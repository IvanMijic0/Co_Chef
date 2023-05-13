import { createScene } from "../Scenes/scene.js";
import { sceneData } from "../Scenes/scene-data.js";

const scenes = [
    createScene(sceneData.INTRO.canvasId, sceneData.INTRO.backgroundColor, sceneData.INTRO.image),
    createScene(sceneData.START_MENU.canvasId, sceneData.START_MENU.backgroundColor, sceneData.START_MENU.image),
];

let activeScene = 0;

const drawActiveScene = () => {
    scenes[activeScene].draw();
    requestAnimationFrame(drawActiveScene);
};

drawActiveScene();

document.getElementById("switchButton").addEventListener("click", () => {
    const currentScene = scenes[activeScene];
    const nextScene = scenes[(activeScene + 1) % scenes.length];

    currentScene.hide();
    nextScene.show();

    activeScene = (activeScene + 1) % scenes.length;

    console.log("Current scene -> " + currentScene.canvas.style.display);
    console.log("Next scene -> " + nextScene.canvas.style.display);

});