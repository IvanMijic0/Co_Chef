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
        playerImage: document.getElementById("player"),
        background: document.getElementById("kitchenBackground"),
        sinkDim: {
            originalX: 970,
            originalY: 2000,
            boxWidth: 100,
            boxHeight: 800,
        },
        knifeDim: {
            originalX: 970,
            originalY: 1200,
            boxWidth: 100,
            boxHeight: 400,
        },
        stirringDim: {
            originalX: 1400,
            originalY: 870,
            boxWidth: 450,
            boxHeight: 100,
        },
        fryingDim: {
            originalX: 2600,
            originalY: 870,
            boxWidth: 550,
            boxHeight: 100,
        },
        inventoryDim: {
            originalX: 4000,
            originalY: 870,
            boxWidth: 700,
            boxHeight: 100,
        },
        playerPlatform: {
            originalX: 490,
            originalY: 300,
            boxWidth: 4300,
            boxHeight: 2700,
        },
        sceneId: 8,
    },
}