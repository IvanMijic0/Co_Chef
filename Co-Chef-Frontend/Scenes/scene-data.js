export const sceneData = {
    INTRO:  {
        canvasId: "intro-canvas",
        background: {source: document.getElementById("background"), width: 1920, height: 1080},
        logo: {source: document.getElementById("logo"), width: 740, height: 640},
        sceneId: 0
    },
    START_MENU:  {
        canvasId: "start-menu-canvas",
        background: {source: document.getElementById("startMenu"), width: 1920, height: 1080},
        sceneId: 1
    },
    TUTORIAL:  {
        canvasId: "tutorial-canvas",
        image: {source: document.getElementById("tutorial"), width: 1920, height: 1080},
        sceneId: 2
    },
    OPTIONS: {
        canvasId: "options-canvas",
        image: {source: document.getElementById("background"), width: 1920, height: 1080},
        sceneId: 3
    },
    DISH_SELECTION: {
        canvasId: "dishSelection-canvas",
        image: {source: document.getElementById("background"), width: 1920, height: 1080},
        sceneId: 4
    },
}