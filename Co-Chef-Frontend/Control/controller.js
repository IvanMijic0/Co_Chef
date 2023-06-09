import {LoginScene} from "../Scenes/loginScreen.js";
import {SignupScene} from "../Scenes/signupScreen.js";
import {CharacterSelectScene} from "../Scenes/characterSelectScene.js";
import {DishSelectScene} from "../Scenes/dishSelectScene.js";
import {IntroScene} from "../Scenes/introScene.js";
import {StartMenuScene} from "../Scenes/startMenuScene.js";
import {TutorialScene} from "../Scenes/tutorialScene.js";
import {OptionsScene} from "../Scenes/optionsScene.js";
import {GameplayScene} from "../Scenes/gameplayScene.js";
import {sceneData} from "../data-utils/scene-data.js";
import {LazyAudio} from "../utils/audio.js";
import {VolumeBar} from "../utils/volume-bar.js";
import {ConnectScene} from "../Scenes/connectScene.js";

// Check if the Screen Orientation API is supported
if (screen.orientation && screen.orientation.lock) {
    // Attempt to lock the screen orientation to landscape
    screen.orientation
        .lock("landscape")
        .then(() => {
            console.log("Screen orientation locked to landscape");
        })
        .catch((error) => {
            console.log("Failed to lock screen orientation:", error);
        });
} else {
    console.log("Screen Orientation API is not supported");
}

export const scenes = [
    new SignupScene(sceneData.SIGNUP.canvasId, sceneData.SIGNUP.image, false),
    new LoginScene(sceneData.LOGIN.canvasId, sceneData.LOGIN.image, false),
    new IntroScene(sceneData.INTRO.canvasId, sceneData.INTRO.logo, sceneData.INTRO.background, false),
    new StartMenuScene(sceneData.START_MENU.canvasId, sceneData.START_MENU.background, true),
    new ConnectScene(sceneData.CONNECT.canvasId, sceneData.CONNECT.image,false),
    new TutorialScene(sceneData.TUTORIAL.canvasId, sceneData.TUTORIAL.image, false),
    new OptionsScene(sceneData.OPTIONS.canvasId, sceneData.OPTIONS.image, false),
    new CharacterSelectScene(sceneData.CHARACTER_SELECT.canvasId, false),
    new DishSelectScene(sceneData.DISH_SELECT.canvasId, false),
    new GameplayScene(sceneData.Gameplay.canvasId, sceneData.Gameplay.background, sceneData.Gameplay.playerImage, false)
];

const maxIterations = 5;
export const audio = new LazyAudio("startMenuAudio");
export const volumeBar = new VolumeBar("volumeBar", "volumeContainer", audio);


let introText = document.getElementById("introHeader");
export let activeScene = 0;
let previousScene = 0;
let lastTime = 0;
let currentImageIndex = 0;
let iterations = 0;
let changeLogoTimeout;

scenes[activeScene].show();

const logoImages = [
    "Assets/Sprites/Icons/logo_anim1.png",
    "Assets/Sprites/Icons/logo_anim2.png",
    "Assets/Sprites/Icons/logo_anim3.png",
    "Assets/Sprites/Icons/logo_anim4.png",
    "Assets/Sprites/Icons/logo_anim5.png",
];

const updateLogoImage = () => {
    const logoImage = logoImages[currentImageIndex];
    scenes[activeScene].updateLogoImage(logoImage);
    currentImageIndex = (currentImageIndex + 1) % logoImages.length;
    iterations++;

    if (iterations >= maxIterations) {
        // Stop the sequence after reaching the desired number of iterations
        clearInterval(changeLogoTimeout);
    }
}

export const intro = () => {
    scenes[activeScene].show();
    audio.stop();

    // Logo animation
    changeLogoTimeout = setInterval(updateLogoImage, 700);

    setTimeout(() => {
        introText.style.display = "flex";
        document.addEventListener("click", () => {
            switchToScene(sceneData.START_MENU.sceneId);
            introText.style.display = "none";
            audio.restart();
        }, {once: true});
    }, 3500);
}

const drawActiveScene = (timestamp) => {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    if (activeScene === sceneData.Gameplay.sceneId) {
        scenes[activeScene].update(deltaTime);
    }
    scenes[activeScene].draw();
    requestAnimationFrame(drawActiveScene);
};
drawActiveScene(0);

export const switchToScene = (sceneId) => {
    const currentScene = scenes[activeScene];
    const nextScene = scenes[sceneId];
    currentScene.hide();
    nextScene.show();
    previousScene = activeScene;
    activeScene = sceneId;
};



