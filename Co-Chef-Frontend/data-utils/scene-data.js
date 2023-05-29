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
    INTRO: {
        canvasId: "intro-canvas",
        background: {source: document.getElementById("introBackground"), width: 1920, height: 1080},
        logo: {source: document.getElementById("logo"), width: 740, height: 640},
        sceneId: 2
    },
    START_MENU: {
        canvasId: "start-menu-canvas",
        background: {source: document.getElementById("startMenu"), width: 1920, height: 1080},
        sceneId: 3
    },
    TUTORIAL: {
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
        pupSpeechImage: {source: document.getElementById("pupSpeech"), width: 3000, height: 321},
        isabelleSpeechImage: {source: document.getElementById("isabelleSpeech"), width: 3000, height: 321},
        celineSpeechImage: {source: document.getElementById("celineSpeech"), width: 3000, height: 321},
        amuSpeechImage: {source: document.getElementById("amuSpeech"),width: 3000, height: 321},
        chatonSpeechImage: {source: document.getElementById("chatonSpeech"), width: 3000, height: 321},
        pupName: "Jacques Le pup",
        isabelleName: "Isabelle Le Fromage",
        celineName: "Celine La Lapine",
        amuName: "Petit Amu",
        chatonName: "Chaton Chanceux",
        characterDim: {width: 747, height: 747},
        sceneId: 6,
    },
}