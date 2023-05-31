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
        pupSpeechImage: {source: document.getElementById("pupSpeech"), width: 4000, height: 360},
        isabelleSpeechImage: {source: document.getElementById("isabelleSpeech"), width: 4000, height: 360},
        celineSpeechImage: {source: document.getElementById("celineSpeech"), width: 4000, height: 360},
        amuSpeechImage: {source: document.getElementById("amuSpeech"),width: 4000, height: 360},
        chatonSpeechImage: {source: document.getElementById("chatonSpeech"), width: 4000, height: 360},
        pupName: "Jacques Le pup",
        isabelleName: "Isabelle Le Fromage",
        celineName: "Celine La Lapine",
        amuName: "Petit Amu",
        chatonName: "Chaton Chanceux",
        characterDim: {width: 820, height: 820},
        sceneId: 6,
    },
    DISH_SELECT: {
        canvasId: "dishSelect-canvas",
        title: "Choose your dish",
        pierSpeechImage: {source: document.getElementById("pierSpeech"), width: 4000, height: 360},
        dishDim: {width: 650, height: 538},
        sceneId: 7,
    },
    Gameplay: {
        canvasId: "gameplay-canvas",
        background: document.getElementById("kitchenBackground"),
        sinkDim: {
            originalX: 950,
            originalY: 1850,
            boxWidth: 300,
            boxHeight: 1060,
        },
        sceneId: 8,
    },
}