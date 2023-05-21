export const sceneData = {
    SIGNUP: {
        canvasId: "signup-canvas",
        image: {source: document.getElementById("background"), width: 1920, height: 1080},
        sceneId: 0
    },
    LOGIN: {
        canvasId: "login-canvas",
        image: {source: document.getElementById("background"), width: 1920, height: 1080},
        sceneId: 1
    },
    INTRO:  {
        canvasId: "intro-canvas",
        background: {source: document.getElementById("introBackground"), width: 1920, height: 1080},
        logo: {source: document.getElementById("logo"), width: 740, height: 640},
        sceneId: 2
    },
    START_MENU:  {
        canvasId: "start-menu-canvas",
        background: {source: document.getElementById("startMenu"), width: 1920, height: 1080},
        sceneId: 3
    },
    TUTORIAL:  {
        canvasId: "tutorial-canvas",
        image: {source: document.getElementById("tutorial"), width: 1920, height: 1080},
        sceneId: 4
    },
    OPTIONS: {
        canvasId: "options-canvas",
        image: {source: document.getElementById("background"), width: 1920, height: 1080},
        sceneId: 5
    },
    CHARACTER_SELECT: {
        canvasId: "characterSelect-canvas",
        pupSpeechImage: {source: document.getElementById("speech"), width: 1920, height: 297},
        pupDim: {width: 525, height: 565},
        sceneId: 6,
    },
}