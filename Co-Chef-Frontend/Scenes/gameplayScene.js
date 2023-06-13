import {Scene} from "./scene.js";
import {sceneData} from "../data-utils/scene-data.js";
import {InputHandler} from "../Control/input-handler.js";

export class GameplayScene extends Scene {
    constructor(canvasId, backgroundImage, playerImage, showButtons) {
        super(canvasId, showButtons);
        this.dynamicSink = {
            scaledX: 0,
            scaledY: 0,
            scaledWidth: 0,
            scaledHeight: 0
        }
        this.dynamicknife = {
            scaledX: 0,
            scaledY: 0,
            scaledWidth: 0,
            scaledHeight: 0
        }
        this.dynamicStirr = {
            scaledX: 0,
            scaledY: 0,
            scaledWidth: 0,
            scaledHeight: 0
        }
        this.dynamicFry = {
            scaledX: 0,
            scaledY: 0,
            scaledWidth: 0,
            scaledHeight: 0
        }
        this.dynamicInventory = {
            scaledX: 0,
            scaledY: 0,
            scaledWidth: 0,
            scaledHeight: 0
        }
        this.colliders = [
            {name: "sink", collider: this.dynamicSink},
            {name: "knife", collider: this.dynamicknife},
            {name: "stir", collider: this.dynamicStirr},
            {name: "fry", collider: this.dynamicFry},
            {name: "inventory", collider: this.dynamicInventory}
        ];
        this.backgroundImage = backgroundImage;
        this.playerImage = playerImage;

        // The coordinates were set based on primary computer screen
        // Could affect the formula if played on a screen bigger than mine...
        // I'll cross that bridge when I get there
        this.originalCanvasWidth = 7680;
        this.originalCanvasHeight = 3916;
        this.platformX = 0;
        this.platformY = 0;
        this.platformWidth = 0;
        this.platformHeight = 0;
        this.input = new InputHandler();
        this.speed = 0;
        this.speedScaler = 2;
        this.speedModifer = .005;
        this.isColliding = false;
        this.collisionCollider = null;
        this.playerColliderX = 0;
        this.playerColliderY = 0;
        this.playerColliderWidth = 0;
        this.playerColliderHeight = 0;
        this.gamePlayText = document.getElementById("gameplayText");
        this.menuX = 0;
        this.minGameX = 0;
        this.menuY = 0;
        this.menuWidth = 0;
        this.menuHeight = 0;
        this.showOptions = false;
        this.showRecipe = false;
        this.showSinkMiniGame = false;
        this.showKnifeMiniGame = false;
        this.showStirrMiniGame = false;
        this.showFryMiniGame = false;
        this.showInventoryMiniGame = false;
        this.canInteract = true;

        // Terrible solution, but I do not have time right now
        this.options = document.getElementById("ic_options")
        this.recipe = document.getElementById("ic_recipe")
        this.slot = document.getElementById("ic_slot")
        this.controls = document.getElementById("controls");
        this.chat = document.querySelector(".chat-input");
        this.slotItem = document.getElementById("item");
        this.sinkItem = document.getElementById("sink-item");
        this.sinkImage = sceneData.Gameplay.sink_mini_game;
        this.knifeImage = document.getElementById("knife");
        this.stirImage = sceneData.Gameplay.stir_mini_game;
        this.mini_game_timer = document.getElementById("mini-game-timer");
        this.timer = document.getElementById("timer")
        this.inventoryTiles = document.querySelector(".inventory");
        this.stirGridInterface = document.querySelector(".grid-container");
        this.stirText = document.getElementById("Stir-text");
        this.stirNumberElement = document.getElementById("stirNumber");
        this.stirNumber = 0;
        this.changeStirNum = true;

        this.timerValue = parseFloat(this.timer.innerText);
        this.mini_game_timer_value = parseFloat(this.mini_game_timer.innerText);
        this.mini_game_started = false;
        this.currentBottom = 8;
        this.cutCounter = 0;
        this.canCut = true;
        this.sinkItemOGWidth = 0;
        this.sinkItemOGHeight = 0;

        this.cuttableItems = [
            "red-meat.png",
            "red-pepper_Clean.png",
            "green-pepper_Clean.png",
            "tomato_Clean.png",
            "garlic_Clean.png",
            "onion_Clean.png",
            "mushroom1_Clean.png",
            "potato_Clean.png",
            "avocado_Clean.png",
            "carrot_Clean.png",
            "green-onion_Clean.png"
        ];

        this.stirrableItems = [
            "red-pepper_Pile.png",
            "green-pepper_Pile.png",
            "tomato_Pile.png",
            "garlic_Pile.png",
            "onion_Pile.png",
            "mushroom1_Pile.png",
            "potato_Pile.png",
            "avocado_Pile.png",
            "carrot_Pile.png",
            "green-onion_Pile.png",
            "red-meat_Cooked.png",
            "fish_Cooked.png"
        ];

        this.fryableItems = [
            "red-meat_Pile.png",
            "fish_Clean.png"
        ];
    }

    update = (deltaTime) => {
        this.updateTimer(deltaTime);
        if (this.mini_game_started) {
            this.updateMiniGameTimer(deltaTime);
        }
        if (canMove) {
            this.updatePlayerMovement(deltaTime);
        }
        this.updateScale();
        this.checkCollision();
        this.updateMenuScale();
        this.updateSinkItemInteraction();
        this.updateKnifeItemInteraction();
        this.updateStirItemInteraction();
        this.updateFryItemInteraction();
        // this.handleInventoryInteraction();
        this.showMiniGameTimer();
    };

    showMiniGameTimer() {
        if (
            !this.showSinkMiniGame && !this.showKnifeMiniGame &&
            !this.showStirrMiniGame && !this.showFryMiniGame &&
            !this.showFryMiniGame && !this.showInventoryMiniGame
        ) {
            this.mini_game_started = false;
            this.mini_game_timer.style.display = "none";
            this.mini_game_timer_value = 10000;
            this.mini_game_timer.style.color = "white";
        }
    }

    updateTimer = (deltaTime) => {
        this.timerValue -= deltaTime;
        const timerValueSec = (this.timerValue * 0.001).toFixed(0);

        if (timerValueSec <= 15 && timerValueSec >= 6) {
            this.timer.style.color = "#FBDD0D";
        } else if (timerValueSec <= 5) {
            this.timer.style.color = "#e10000";
        }
        this.timer.innerText = Math.max(timerValueSec, 0);
    };

    updateMiniGameTimer = (deltaTime) => {
        this.mini_game_timer_value -= deltaTime;
        const miniGameTimerValueSec = (this.mini_game_timer_value * 0.001).toFixed(0);

        if (miniGameTimerValueSec <= 10 && miniGameTimerValueSec >= 6) {
            this.mini_game_timer.style.color = "#FBDD0D";
        } else if (miniGameTimerValueSec <= 5) {
            this.mini_game_timer.style.color = "#e10000";
        }
        this.mini_game_timer.innerText = Math.max(miniGameTimerValueSec, 0);
    };

    updatePlayerMovement = (deltaTime) => {
        this.speedScaler = Math.min(this.scaledWidth, this.scaledHeight) * (deltaTime * this.speedModifer);

        if (this.input.keys.includes("ArrowUp") || this.input.keys.includes("w")) {
            this.updatePlayerImage("back");
            this.speed = this.speedScaler;
            if (this.playerY - this.speed >= this.platformY) {
                this.playerY -= this.speed;
            }
        } else if (this.input.keys.includes("ArrowDown") || this.input.keys.includes("s")) {
            this.updatePlayerImage("front");
            this.speed = this.speedScaler;
            if (this.playerY + this.scaledHeight <= this.platformY + this.platformHeight) {
                this.playerY += this.speed;
            }
        } else if (this.input.keys.includes("ArrowLeft") || this.input.keys.includes("a")) {
            this.updatePlayerImage("left");
            this.speed = this.speedScaler;
            if (this.playerX >= this.platformX) {
                this.playerX -= this.speed;
            }
        } else if (this.input.keys.includes("ArrowRight") || this.input.keys.includes("d")) {
            this.updatePlayerImage("right");
            this.speed = this.speedScaler;
            if (this.playerX + this.scaledWidth <= this.platformX + this.platformWidth) {
                this.playerX += this.speed;
            }
        } else {
            this.speed = 0;
        }
    };

    updatePlayerImage = (direction) => {
        this.playerImage.src = `Assets/Sprites/Player/${rememberCharacter}_${direction}.png`;
    };

    updateSinkItemInteraction = () => {
        if (!canMove && this.collisionCollider === "sink") {
            if (this.input.keys.includes("ArrowUp")) {
                this.sinkItem.style.bottom = sceneData.Gameplay.sink_new_transform;
                const timerValueSec = (this.mini_game_timer_value * 0.001).toFixed(0)
                setTimeout(() => {
                    this.sinkImage.src = sceneData.Gameplay.sink_mini_game_interact;
                    this.mini_game_timer.style.display = "flex";
                    if (timerValueSec <= 7 && timerValueSec > 5) {
                        this.sinkItem.src = "Assets/Sprites/GameplayUI/" + this.extractFileNameWithoutExtension(this.sinkItem.src) + "_Dirty2.png";
                    } else if (timerValueSec <= 5 && timerValueSec > 3) {
                        this.sinkItem.src = "Assets/Sprites/GameplayUI/" + this.extractFileNameWithoutExtension(this.sinkItem.src) + "_Dirty3.png";
                    } else if (timerValueSec <= 0) {
                        this.sinkItem.src = "Assets/Sprites/GameplayUI/" + this.extractFileNameWithoutExtension(this.sinkItem.src) + "_Clean.png";
                        this.slotItem.src = "Assets/Sprites/GameplayUI/" + this.extractFileNameWithoutExtension(this.sinkItem.src) + "_Clean.png";
                    }

                }, 200);
                this.mini_game_started = true;
            } else {
                this.sinkItem.style.bottom = sceneData.Gameplay.sink_original_transform;
                setTimeout(() => {
                    this.sinkImage.src = sceneData.Gameplay.sink_mini_game_idle;
                    this.mini_game_started = false;
                    this.mini_game_timer.style.display = "none";
                    this.mini_game_timer_value = 10000;
                    this.mini_game_timer.style.color = "white";
                }, 200);
            }
        }
    };

    updateKnifeItemInteraction = () => {
        if (!canMove && this.collisionCollider === "knife") {
            if (this.input.keys.includes("ArrowUp")) {
                this.knifeImage.style.bottom = sceneData.Gameplay.knife_new_transform;
                this.canCut = true;
            } else if (this.input.keys.includes("ArrowDown")) {
                this.knifeImage.style.bottom = sceneData.Gameplay.knife_original_transform;
                if (this.canCut && this.cutCounter <= 3) {
                    this.cutCounter++
                    this.sinkItem.src = "Assets/Sprites/GameplayUI/" + this.extractFileNameWithoutExtension(this.sinkItem.src) + "_Cut" + this.cutCounter + ".png";
                    this.sinkItem.style.width = "8vw"
                    this.sinkItem.style.height = "4vw"
                    this.canCut = false;
                    if (this.cutCounter >= 3) {
                        this.slotItem.src = "Assets/Sprites/GameplayUI/" + this.extractFileNameWithoutExtension(this.sinkItem.src) + "_Pile.png";
                        this.slotItem.style.width = "4vw";
                        this.sinkItem.src = "Assets/Sprites/GameplayUI/" + this.extractFileNameWithoutExtension(this.sinkItem.src) + "_Pile.png";
                        this.sinkItem.style.width = this.sinkItemOGWidth;
                        this.sinkItem.style.height = this.sinkItemOGHeight;
                    }
                }
            }
        } else {
            this.cutCounter = 0;
        }
    };

    updateStirItemInteraction = () => {
        if (!canMove && this.collisionCollider === "stir") {
            if (this.sinkItem.style.display === "flex") {
                this.currentBottom += 0.1;
                this.sinkItem.style.bottom = this.currentBottom + "vw";
            }
            if (this.currentBottom >= 33) {
                this.sinkItem.style.bottom = sceneData.Gameplay.stir_item_new_transform;
                this.sinkItem.style.display = "none";
                console.log(this.extractFileNameWithoutExtension(this.sinkItem.src))
                let pileNumElement = document.getElementById(this.extractFileNameWithoutExtension(this.sinkItem.src) + "_num");
                let pileNum = parseInt(pileNumElement.innerHTML[1]) + 1;
                pileNumElement.innerHTML = "x" + pileNum;
                this.currentBottom = 8;
            }
            if (this.sinkItem.style.bottom === sceneData.Gameplay.stir_item_new_transform) {
                if (this.input.keys.includes("ArrowRight")) {
                    if (this.extractFileNameWithExtension(this.stirImage.src) === "stir_mini-game_left.png") {
                        setTimeout(() => {
                            this.stirImage.src = "Assets/Sprites/GameplayUI/stir_mini-game_middle.png";
                        }, 200);
                    } else if (this.extractFileNameWithExtension(this.stirImage.src) === "stir_mini-game_middle.png") {
                        setTimeout(() => {
                            this.stirImage.src = "Assets/Sprites/GameplayUI/stir_mini-game_right.png";
                            if (this.changeStirNum) {
                                this.stirNumber++;
                                this.stirNumberElement.innerHTML = this.stirNumber;
                                this.changeStirNum = false;
                            }
                        }, 200);
                    }
                } else if (this.input.keys.includes("ArrowLeft")) {
                    if (this.extractFileNameWithExtension(this.stirImage.src) === "stir_mini-game_right.png") {
                        setTimeout(() => {
                            this.stirImage.src = "Assets/Sprites/GameplayUI/stir_mini-game_middle.png";
                        }, 200);
                    } else if (this.extractFileNameWithExtension(this.stirImage.src) === "stir_mini-game_middle.png") {
                        setTimeout(() => {
                            this.stirImage.src = "Assets/Sprites/GameplayUI/stir_mini-game_left.png";
                            this.changeStirNum = true;
                        }, 200);
                    }
                }
            }
        }
    };

    updateFryItemInteraction = () => {
        if (!canMove && this.collisionCollider === "fry") {
            if (this.input.keys.includes("ArrowUp")) {
                this.sinkItem.style.bottom = sceneData.Gameplay.fry_item_new_transform;
                setTimeout(() => {
                    this.mini_game_started = true;
                    this.mini_game_timer.style.display = "flex";
                    setTimeout(() => {
                        this.sinkItem.src = "Assets/Sprites/GameplayUI/" + this.extractFileNameWithoutExtension(this.sinkItem.src) + "_Cooked.png";
                        this.slotItem.src = "Assets/Sprites/GameplayUI/" + this.extractFileNameWithoutExtension(this.sinkItem.src) + "_Cooked.png";
                    }, this.mini_game_timer_value);
                }, 200)
            } else if (this.input.keys.includes("ArrowDown")) {
                this.sinkItem.style.bottom = sceneData.Gameplay.fry_item_original_transform;
                setTimeout(() => {
                    this.mini_game_timer.style.display = "none";
                    this.mini_game_started = false;
                    this.mini_game_timer_value = 10000;
                    this.mini_game_timer.style.color = "white";
                }, 200)
            }
        }
    };

    extractFileNameWithExtension = (path) => {
        return path.split("/").pop();
    }

    extractFileNameWithoutExtension = (filePath) => {
        const fileNameWithExtension = this.extractFileNameWithExtension(filePath);
        const fileNameWithoutExtension = fileNameWithExtension.split('.').slice(0, -1).join('.');
        const fileNameParts = fileNameWithoutExtension.split('_');
        return fileNameParts[0];
    }


    checkCollision = () => {
        this.isColliding = false;
        this.collisionCollider = null;

        for (const collider of this.colliders) {
            if (
                this.playerColliderX < collider.collider.scaledX + collider.collider.scaledWidth &&
                this.playerColliderX + this.playerColliderWidth > collider.collider.scaledX &&
                this.playerColliderY < collider.collider.scaledY + collider.collider.scaledHeight &&
                this.playerColliderY + this.playerColliderHeight > collider.collider.scaledY
            ) {
                this.isColliding = true;
                this.collisionCollider = collider.name;
                if (this.canInteract) {
                    if (this.input.lastKey === "e") {
                        if (this.collisionCollider === "sink") {
                            if (!["tortilla.png", "red-meat.png", "noodles.png"].includes(this.extractFileNameWithExtension(this.sinkItem.src))) {
                                this.showSinkMiniGame = !this.showSinkMiniGame;
                                canMove = !canMove;
                                if (!canMove) {
                                    this.controls.style.display = "block";
                                    this.options.style.display = "none";
                                    this.recipe.style.display = "none";
                                    this.chat.disabled = true;
                                    this.slot.style.display = "none";
                                    this.slotItem.style.display = "none";
                                    this.sinkItem.style.display = "flex";
                                } else {
                                    this.controls.style.display = "none";
                                    this.options.style.display = "flex";
                                    this.recipe.style.display = "flex";
                                    this.slot.style.display = "flex";
                                    this.slotItem.style.display = "flex";
                                    this.sinkItem.style.display = "none";
                                }
                            } else {
                                if (!this.showSinkMiniGame) {
                                    setTimeout(() => {
                                        this.slot.src = "Assets/Sprites/GameplayUI/ic_slot.png";
                                    }, 400)
                                    this.slot.src = "Assets/Sprites/GameplayUI/ic_slot_err.png"
                                }
                            }
                        } else if (this.collisionCollider === "knife") {
                            if (this.cuttableItems.includes(this.extractFileNameWithExtension(this.sinkItem.src))) {
                                this.showKnifeMiniGame = !this.showKnifeMiniGame;
                                canMove = !canMove;
                                this.controls.style.display = "block";
                                this.options.style.display = "none";
                                this.recipe.style.display = "none";
                                this.chat.disabled = true;
                                this.slot.style.display = "none";
                                this.slotItem.style.display = "none";
                                this.knifeImage.style.display = "flex";
                                this.sinkItem.style.bottom = sceneData.Gameplay.knife_original_transform;
                                this.sinkItem.style.display = "flex";
                            } else {
                                if (!this.showKnifeMiniGame) {
                                    setTimeout(() => {
                                        this.slot.src = "Assets/Sprites/GameplayUI/ic_slot.png";
                                    }, 400)
                                    this.slot.src = "Assets/Sprites/GameplayUI/ic_slot_err.png"
                                } else {
                                    this.showKnifeMiniGame = !this.showKnifeMiniGame;
                                    canMove = !canMove;
                                    this.controls.style.display = "none";
                                    this.options.style.display = "flex";
                                    this.recipe.style.display = "flex";
                                    this.slot.style.display = "flex";
                                    this.slotItem.style.display = "flex";
                                    this.knifeImage.style.display = "none";
                                    this.sinkItem.style.display = "none";
                                    this.knifeImage.style.bottom = sceneData.Gameplay.knife_new_transform;
                                }
                            }
                        } else if (this.collisionCollider === "stir") {
                            if (this.stirrableItems.includes(this.extractFileNameWithExtension(this.sinkItem.src))) {
                                this.showStirrMiniGame = !this.showStirrMiniGame;
                                canMove = !canMove;
                                if (!canMove) {
                                    this.controls.style.display = "block";
                                    this.options.style.display = "none";
                                    this.recipe.style.display = "none";
                                    this.chat.disabled = true;
                                    this.slot.style.display = "none";
                                    this.slotItem.style.display = "none";
                                    this.sinkItem.style.display = "flex";
                                    this.stirGridInterface.style.display = "grid";
                                    this.stirText.style.display = "flex";
                                } else {
                                    this.controls.style.display = "none";
                                    this.options.style.display = "flex";
                                    this.recipe.style.display = "flex";
                                    this.slot.style.display = "flex";
                                    this.slotItem.style.display = "flex";
                                    this.knifeImage.style.display = "none";
                                    this.sinkItem.style.display = "none";
                                    this.knifeImage.style.bottom = sceneData.Gameplay.knife_new_transform;
                                    this.stirGridInterface.style.display = "none";
                                    this.stirText.style.display = "none";
                                    this.stirNumber = 0;
                                    this.stirNumberElement.innerHTML = this.stirNumber;
                                    this.slotItem.style.display = "none";
                                    this.sinkItem.src = "";
                                }
                            } else {
                                if (!this.showStirrMiniGame) {
                                    setTimeout(() => {
                                        this.slot.src = "Assets/Sprites/GameplayUI/ic_slot.png";
                                    }, 400)
                                    this.slot.src = "Assets/Sprites/GameplayUI/ic_slot_err.png"
                                }
                            }
                        } else if (this.collisionCollider === "fry") {
                            if (this.fryableItems.includes(this.extractFileNameWithExtension(this.sinkItem.src))) {
                                this.showFryMiniGame = !this.showFryMiniGame;
                                canMove = !canMove;
                                if (!canMove) {
                                    this.controls.style.display = "block";
                                    this.options.style.display = "none";
                                    this.recipe.style.display = "none";
                                    this.chat.disabled = true;
                                    this.slot.style.display = "none";
                                    this.slotItem.style.display = "none";
                                    this.sinkItem.style.bottom = sceneData.Gameplay.fry_item_original_transform;
                                    this.sinkItem.style.display = "flex";
                                }
                            } else {
                                if (this.sinkItem.src === "Assets/Sprites/GameplayUI/" + this.extractFileNameWithoutExtension(this.sinkItem.src) + "_Cooked.png") {
                                    setTimeout(() => {
                                        this.slot.src = "Assets/Sprites/GameplayUI/ic_slot.png";
                                    }, 400)
                                    this.slot.src = "Assets/Sprites/GameplayUI/ic_slot_err.png"
                                } else {
                                    this.showFryMiniGame = !this.showFryMiniGame;
                                    canMove = !canMove;
                                    this.controls.style.display = "none";
                                    this.options.style.display = "flex";
                                    this.recipe.style.display = "flex";
                                    this.slot.style.display = "flex";
                                    this.slotItem.style.display = "flex";
                                    this.knifeImage.style.display = "none";
                                    this.sinkItem.style.display = "none";
                                    this.knifeImage.style.bottom = sceneData.Gameplay.knife_new_transform;
                                }
                            }
                        } else if (this.collisionCollider === "inventory") {
                            this.showInventoryMiniGame = !this.showInventoryMiniGame;
                            canMove = !canMove;
                            if (!canMove) {
                                this.controls.style.display = "block";
                                this.options.style.display = "none";
                                this.recipe.style.display = "none";
                                this.chat.disabled = true;
                                this.slot.style.display = "none";
                                this.slotItem.style.display = "none";
                                this.inventoryTiles.style.display = "grid";
                            } else {
                                this.controls.style.display = "none";
                                this.options.style.display = "flex";
                                this.recipe.style.display = "flex";
                                this.slot.style.display = "flex";
                                this.slotItem.style.display = "flex";
                                this.inventoryTiles.style.display = "none";
                            }
                        }
                    }
                    this.input.lastKey = "";
                }
                break;
            }
        }
    }

    draw = () => {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);


        // Draw the background image
        this.ctx.drawImage(
            this.backgroundImage,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        if (this.input.debug) {
            this.drawMiniGameColliders();
            this.drawPlatform();
        }

        this.drawPlayer();
        this.updatePlatform();
        this.textPopup();

        if (this.showOptions) {
            this.drawOptions();
        } else if (this.showRecipe) {
            this.drawRecipe();
        } else if (this.showSinkMiniGame) {
            this.drawSinkMiniGame();
        } else if (this.showKnifeMiniGame) {
            this.drawKnifeMiniGame();
        } else if (this.showStirrMiniGame) {
            this.drawStirMiniGame();
        } else if (this.showFryMiniGame) {
            this.drawFryMiniGame();
        } else if (this.showInventoryMiniGame) {
            this.drawInventoryMiniGame();
        }
    }

    drawKnifeMiniGame = () => {
        this.ctx.drawImage(
            sceneData.Gameplay.mini_game_background,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        this.ctx.drawImage(
            sceneData.Gameplay.knife_mini_game,
            this.minGameX,
            this.menuY,
            this.menuWidth,
            this.menuHeight
        );
    }
    drawStirMiniGame = () => {
        this.ctx.drawImage(
            sceneData.Gameplay.mini_game_background,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        this.ctx.drawImage(
            this.stirImage,
            this.minGameX,
            this.menuY,
            this.menuWidth,
            this.menuHeight
        );
    }
    drawFryMiniGame = () => {
        this.ctx.drawImage(
            sceneData.Gameplay.mini_game_background,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        this.ctx.drawImage(
            sceneData.Gameplay.fry_mini_game,
            this.minGameX,
            this.menuY,
            this.menuWidth,
            this.menuHeight
        );
    }
    drawInventoryMiniGame = () => {
        this.ctx.drawImage(
            sceneData.Gameplay.mini_game_background,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        this.ctx.drawImage(
            sceneData.Gameplay.inventory_mini_game,
            this.minGameX,
            this.menuY,
            this.menuWidth,
            this.menuHeight
        );
    }

    drawSinkMiniGame() {
        this.ctx.drawImage(
            sceneData.Gameplay.mini_game_background,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        this.ctx.drawImage(
            this.sinkImage,
            this.minGameX,
            this.menuY,
            this.menuWidth,
            this.menuHeight
        );
    }

    textPopup() {
        if (this.isColliding) {
            this.gamePlayText.style.display = "flex";
            this.gamePlayText.style.fontSize = "3.15vw";
            if (this.showSinkMiniGame) {
                this.gamePlayText.innerHTML = "<span style='color: white'>&nbsp;Hold up &nbsp;</span> " +
                    "<span style='color: #FF7F3F'>arrow key to wash</span>";
            } else if (this.showKnifeMiniGame) {
                this.gamePlayText.innerHTML = "<span style='color: white'>&nbsp;Press up &nbsp;</span> and " +
                    "<span style='color: white'>&nbsp; down &nbsp;</span><br><span style='color: #FF7F3F'>arrow keys to cut</span>";
            } else if (this.showStirrMiniGame) {
                this.gamePlayText.innerHTML = "<span style='color: white'>&nbsp;Press left &nbsp;</span> and " +
                    "<span style='color: white'>&nbsp; right &nbsp;</span><br><span style='color: #FF7F3F'>arrow keys to stir</span>";
            } else if (this.showFryMiniGame) {
                this.gamePlayText.innerHTML = "<span style='color: white'>&nbsp;Press up &nbsp;</span> and " +
                    "<span style='color: white'>&nbsp; down &nbsp;</span><br><span style='color: #FF7F3F'>arrow keys to fry</span>";
            } else if (this.showInventoryMiniGame) {
                this.gamePlayText.innerHTML = "<span style='color: white'>&nbsp;Click &nbsp;</span> on " +
                    "<span style='color: white'>&nbsp; food &nbsp;</span><br><span style='color: #FF7F3F'>to add to inventory</span>";
            } else {
                this.gamePlayText.innerHTML = "Press <span style='color: white'>&nbsp;E&nbsp;</span> to interact with " +
                    "<span style='color: white'>&nbsp;" + this.collisionCollider + "&nbsp;</span>";
            }
        } else {
            this.gamePlayText.style.display = "none";
        }
    }

    updatePlatform = () => {
        this.platformX = sceneData.Gameplay.playerPlatform.originalX * (this.canvas.width / this.originalCanvasWidth);
        this.platformY = sceneData.Gameplay.playerPlatform.originalY * (this.canvas.height / this.originalCanvasHeight);
        this.platformWidth = sceneData.Gameplay.playerPlatform.boxWidth * (this.canvas.width / this.originalCanvasWidth);
        this.platformHeight = sceneData.Gameplay.playerPlatform.boxHeight * (this.canvas.height / this.originalCanvasHeight);
    }

    drawPlayer = () => {
        this.scaledWidth = this.canvas.width * 0.12;
        this.scaledHeight = this.canvas.height * 0.25;
        this.playerColliderX = this.playerX + (this.scaledWidth * .2);
        this.playerColliderY = this.playerY + (this.scaledHeight * .5);
        this.playerColliderWidth = this.scaledWidth * .3;
        this.playerColliderHeight = this.scaledHeight * .2;

        this.ctx.drawImage(
            this.playerImage,
            this.playerX,
            this.playerY,
            this.scaledWidth,
            this.scaledHeight
        );
        if (this.input.debug) {
            this.ctx.save()
            this.ctx.strokeStyle = "yellow";
            this.ctx.lineWidth = 10;
            this.ctx.strokeRect(
                this.playerX,
                this.playerY,
                this.scaledWidth,
                this.scaledHeight
            );
            this.ctx.restore()

            this.ctx.save()
            this.ctx.strokeStyle = "cyan";
            this.ctx.lineWidth = 10;
            this.ctx.strokeRect(
                this.playerColliderX,
                this.playerColliderY,
                this.playerColliderWidth,
                this.playerColliderHeight
            );
            this.ctx.restore()
        }
    }

    drawPlatform = () => {
        this.ctx.save()
        this.ctx.strokeStyle = "blue";
        this.ctx.lineWidth = 9;

        this.ctx.strokeRect(this.platformX, this.platformY, this.platformWidth, this.platformHeight);
        this.ctx.restore()
    }

    drawMiniGameCollider = (scaledX, scaledY, scaledWidth, scaledHeight, color = "red") => {
        this.ctx.save()

        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 8;
        this.ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);

        this.ctx.restore()
    }

    drawMiniGameColliders = () => {
        this.drawMiniGameCollider(
            this.dynamicSink.scaledX,
            this.dynamicSink.scaledY,
            this.dynamicSink.scaledWidth,
            this.dynamicSink.scaledHeight,
        );

        this.drawMiniGameCollider(
            this.dynamicknife.scaledX,
            this.dynamicknife.scaledY,
            this.dynamicknife.scaledWidth,
            this.dynamicknife.scaledHeight,
        );

        this.drawMiniGameCollider(
            this.dynamicStirr.scaledX,
            this.dynamicStirr.scaledY,
            this.dynamicStirr.scaledWidth,
            this.dynamicStirr.scaledHeight,
        );

        this.drawMiniGameCollider(
            this.dynamicFry.scaledX,
            this.dynamicFry.scaledY,
            this.dynamicFry.scaledWidth,
            this.dynamicFry.scaledHeight,
        );

        this.drawMiniGameCollider(
            this.dynamicInventory.scaledX,
            this.dynamicInventory.scaledY,
            this.dynamicInventory.scaledWidth,
            this.dynamicInventory.scaledHeight,
        );
    }

    updateScale = () => {
        const canvasScaleWidth = this.canvas.width / this.originalCanvasWidth;
        const canvasScaleHeight = this.canvas.height / this.originalCanvasHeight;

        this.dynamicSink.scaledX = sceneData.Gameplay.sinkDim.originalX * canvasScaleWidth;
        this.dynamicSink.scaledY = sceneData.Gameplay.sinkDim.originalY * canvasScaleHeight;
        this.dynamicSink.scaledWidth = sceneData.Gameplay.sinkDim.boxWidth * canvasScaleWidth;
        this.dynamicSink.scaledHeight = sceneData.Gameplay.sinkDim.boxHeight * canvasScaleHeight;

        this.dynamicknife.scaledX = sceneData.Gameplay.knifeDim.originalX * canvasScaleWidth;
        this.dynamicknife.scaledY = sceneData.Gameplay.knifeDim.originalY * canvasScaleHeight;
        this.dynamicknife.scaledWidth = sceneData.Gameplay.knifeDim.boxWidth * canvasScaleWidth;
        this.dynamicknife.scaledHeight = sceneData.Gameplay.knifeDim.boxHeight * canvasScaleHeight;

        this.dynamicStirr.scaledX = sceneData.Gameplay.stirringDim.originalX * canvasScaleWidth;
        this.dynamicStirr.scaledY = sceneData.Gameplay.stirringDim.originalY * canvasScaleHeight;
        this.dynamicStirr.scaledWidth = sceneData.Gameplay.stirringDim.boxWidth * canvasScaleWidth;
        this.dynamicStirr.scaledHeight = sceneData.Gameplay.stirringDim.boxHeight * canvasScaleHeight;

        this.dynamicFry.scaledX = sceneData.Gameplay.fryingDim.originalX * canvasScaleWidth;
        this.dynamicFry.scaledY = sceneData.Gameplay.fryingDim.originalY * canvasScaleHeight;
        this.dynamicFry.scaledWidth = sceneData.Gameplay.fryingDim.boxWidth * canvasScaleWidth;
        this.dynamicFry.scaledHeight = sceneData.Gameplay.fryingDim.boxHeight * canvasScaleHeight;

        this.dynamicInventory.scaledX = sceneData.Gameplay.inventoryDim.originalX * canvasScaleWidth;
        this.dynamicInventory.scaledY = sceneData.Gameplay.inventoryDim.originalY * canvasScaleHeight;
        this.dynamicInventory.scaledWidth = sceneData.Gameplay.inventoryDim.boxWidth * canvasScaleWidth;
        this.dynamicInventory.scaledHeight = sceneData.Gameplay.inventoryDim.boxHeight * canvasScaleHeight;
    }

    drawOptions = () => {
        this.ctx.drawImage(
            sceneData.Gameplay.mini_game_background,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.ctx.drawImage(
            sceneData.Gameplay.options_background,
            this.menuX,
            this.menuY,
            this.menuWidth,
            this.menuHeight
        );
    }

    drawRecipe = () => {
        this.ctx.drawImage(
            sceneData.Gameplay.mini_game_background,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.ctx.drawImage(
            sceneData.Gameplay.recipe_background,
            this.menuX,
            this.menuY,
            this.menuWidth,
            this.menuHeight
        );
    }

    updateMenuScale = () => {
        this.minGameX = this.canvas.width * .13
        this.menuX = this.canvas.width * .1;
        this.menuY = this.canvas.height * .1;
        this.menuWidth = this.canvas.width * .55;
        this.menuHeight = this.canvas.height * .75;
    }

    toggleOptions = () => {
        this.showOptions = !this.showOptions;
        canMove = !canMove;
    }

    toggleRecipe = () => {
        this.showRecipe = !this.showRecipe;
        canMove = !canMove;
    }

    allowInteract = (yes) => {
        this.canInteract = yes;
    }

    setPlayerImage = () => {
        this.playerImage.src = "Assets/Sprites/Player/" + rememberCharacter + "_front.png";
    }

    chefMode = (char) => {
        this.playerImage.src = "Assets/Sprites/Player/" + char + "_front.png";
    }

    changeItemFromSlot = (newWidth) => {
        this.sinkItem.src = this.slotItem.src;
        this.sinkItem.style.width = newWidth + "vw";
        this.sinkItemOGWidth = this.sinkItem.style.width;
        this.sinkItemOGHeight = this.sinkItem.style.height;
    }

    closeInventory = () => {
        this.showInventoryMiniGame = false;
        canMove = true;
        this.controls.style.display = "none";
        this.options.style.display = "flex";
        this.recipe.style.display = "flex";
        this.slot.style.display = "flex";
        this.slotItem.style.display = "flex";
        this.inventoryTiles.style.display = "none";
    }
}

