import {
    IntroScene, OptionsScene, StartMenuScene,
    TutorialScene, DishSelectionScene,
} from "../Scenes/scene.js";
import { sceneData } from "../Scenes/scene-data.js";
import { LazyAudio } from "../utils/audio.js";
import { VolumeBar } from "../utils/volume-bar.js";

window.addEventListener("load", () => {
    const scenes = [
        new IntroScene(sceneData.INTRO.canvasId, sceneData.INTRO.logo, sceneData.INTRO.background, false),
        new StartMenuScene(sceneData.START_MENU.canvasId, sceneData.START_MENU.background, true),
        new TutorialScene(sceneData.TUTORIAL.canvasId, sceneData.TUTORIAL.image, false),
        new OptionsScene(sceneData.OPTIONS.canvasId, sceneData.OPTIONS.image, false),
        new DishSelectionScene(sceneData.DISH_SELECTION.canvasId, false),
    ];

    const audio = new LazyAudio("startMenuAudio");
    const volumeBar = new VolumeBar('volumeBar', 'volumeContainer', audio);

    let introText = document.getElementById("introHeader");
    let activeScene = 0;
    let previousScene = 0;

    const intro = () => {
        scenes[activeScene].show();
        audio.stop();
        if (activeScene === 0) {
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
        audio.switchAudio("tutorialAudio", audio.audio.volume);
    });

    document.getElementById("connectButton-container").addEventListener("click", () => {
        switchToScene(sceneData.DISH_SELECTION.sceneId);
    });

    document.getElementById("optionsButton-container").addEventListener("click", () => {
        switchToScene(sceneData.OPTIONS.sceneId);
        document.getElementById("optionsHeader").style.display = "flex";
        document.getElementById("options-backButton-container").style.display = "flex";
        volumeBar.show();
        volumeBar.setup();
    });

    document.getElementById("restartButton-container").addEventListener("click", () => {
        switchToScene(sceneData.INTRO.sceneId);
        intro();
    });

    document.getElementById("tutorial-backButton-container").addEventListener("click", () => {
        switchToScene(sceneData.START_MENU.sceneId);
        audio.switchAudio("startMenuAudio", audio.audio.volume);
    });

    document.getElementById("options-backButton-container").addEventListener("click", () => {
        switchToScene(sceneData.START_MENU.sceneId);
        // audio.switchAudio("startMenuAudio");
        volumeBar.hide();
    });

});

