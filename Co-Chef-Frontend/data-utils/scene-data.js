export const sceneData = {
    SIGNUP: {
        canvasId: "signup-canvas",
        image: document.getElementById("background"),
        sceneId: 0
    },
    LOGIN: {
        canvasId: "login-canvas",
        image: document.getElementById("background"),
        sceneId: 1
    },
    INTRO: {
        canvasId: "intro-canvas",
        background: {source: document.getElementById("introBackground"), width: 1920, height: 1080},
        logo: document.getElementById("logo"),
        sceneId: 2
    },
    START_MENU: {
        canvasId: "start-menu-canvas",
        background: {source: document.getElementById("startMenu"), width: 1920, height: 1080},
        sceneId: 3
    },
    CONNECT: {
        canvasId: "connect-canvas",
        image: document.getElementById("background"),
        sceneId: 4
    },
    TUTORIAL: {
        canvasId: "tutorial-canvas",
        image: {source: document.getElementById("tutorial"), width: 1920, height: 1080},
        sceneId: 5
    },
    OPTIONS: {
        canvasId: "options-canvas",
        image: {source: document.getElementById("background"), width: 1920, height: 1080},
        sceneId: 6
    },
    CHARACTER_SELECT: {
        canvasId: "characterSelect-canvas",
        pupSpeechImage: document.getElementById("pupSpeech"),
        isabelleSpeechImage: document.getElementById("isabelleSpeech"),
        celineSpeechImage: document.getElementById("celineSpeech"),
        amuSpeechImage: document.getElementById("amuSpeech"),
        chatonSpeechImage: document.getElementById("chatonSpeech"),
        pupName: "Jacques Le pup",
        isabelleName: "Isabelle Le Fromage",
        celineName: "Celine La Lapine",
        amuName: "Petit Amu",
        chatonName: "Chaton Chanceux",
        // characterDim: {width: 820, height: 820},
        sceneId: 7,
    },
    DISH_SELECT: {
        canvasId: "dishSelect-canvas",
        title: "Choose your dish",
        pierSpeechImage: {source: document.getElementById("pierSpeech"), width: 4000, height: 360},
        noodlesName: "noodles",
        curryName: "curry",
        fishTacoName: "fishTaco",
        sceneId: 8,
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
            originalX: 1260,
            originalY: 870,
            boxWidth: 500,
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
            originalX: 790,
            originalY: 300,
            boxWidth: 4200,
            boxHeight: 2700,
        },
        mini_game_background: document.getElementById("gameplayBackground"),
        options_background: document.getElementById("optionsBackground"),
        recipe_background: document.getElementById("recipeBackground"),
        sink_mini_game: document.getElementById("sink-mini-game"),
        sink_mini_game_idle: "Assets/Sprites/GameplayUI/sink_mini-game.png",
        sink_mini_game_interact: "Assets/Sprites/GameplayUI/sink_mini-game_interact.png",
        knife_mini_game: document.getElementById("knife-mini-game"),
        stir_mini_game: document.getElementById("stir-mini-game"),
        fry_mini_game: document.getElementById("fry-mini-game"),
        inventory_mini_game: document.getElementById("inventory-mini-game"),
        win_screen: document.getElementById("win-screen"),
        lose_screen: document.getElementById("lose-screen"),
        sink_original_transform: "14vh",
        sink_new_transform: "35vh",
        knife_original_transform: "40vh",
        knife_new_transform: "64vh",
        stir_item_original_transform: "40vh",
        stir_item_new_transform: "33vh",
        fry_item_original_transform: "14vh",
        fry_item_new_transform: "44vh",
        timerValue: 400000.2,
        sceneId: 9,
    },
}