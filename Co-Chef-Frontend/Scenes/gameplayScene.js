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
        this.speedModifier = 8;
        this.speedMod = .1;
    }

    update = () => {
        this.speedModifier = Math.min(this.scaledWidth, this.scaledHeight) * this.speedMod
        if (this.input.keys.includes("ArrowUp") || this.input.keys.includes("w")) {
            this.playerImage.src = "Assets/Sprites/Player/Chef_back.png"
            this.speed = this.speedModifier;
            if (this.playerY - this.speed >= this.platformY) {
                this.playerY -= this.speed;
            }
        } else if (this.input.keys.includes("ArrowDown") || this.input.keys.includes("s")) {
            this.playerImage.src = "Assets/Sprites/Player/Chef_front.png"
            this.speed = this.speedModifier;
            if (this.playerY + this.scaledHeight <= this.platformY + this.platformHeight) {
                this.playerY += this.speed;
            }
        }
        if (this.input.keys.includes("ArrowLeft") || this.input.keys.includes("a")) {
            this.playerImage.src = "Assets/Sprites/Player/Chef_left.png"
            this.speed = this.speedModifier;
            if (this.playerX >= this.platformX) {
                this.playerX -= this.speed;
            }
        } else if (this.input.keys.includes("ArrowRight") || this.input.keys.includes("d")) {
            this.playerImage.src = "Assets/Sprites/Player/Chef_right.png"
            this.speed = this.speedModifier;
            if (this.playerX + this.scaledWidth <= this.platformX + this.platformWidth) {
                this.playerX += this.speed;
            }
        } else {
            this.speed = 0;
        }

        this.updateScale();
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

    draw = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the background image
        this.context.drawImage(
            this.backgroundImage,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.drawColliders();
        this.drawPlatform();
        this.drawPlayer();
    }

    drawPlayer = () => {
        this.scaledWidth = this.canvas.width * 0.12;
        this.scaledHeight = this.canvas.height * 0.25;

        this.context.drawImage(
            this.playerImage,
            this.playerX,
            this.playerY,
            this.scaledWidth,
            this.scaledHeight
        );

        this.context.save()
        this.context.strokeStyle = "yellow";
        this.context.lineWidth = 10;

        this.context.strokeRect(
            this.playerX,
            this.playerY,
            this.scaledWidth,
            this.scaledHeight
        );
        this.context.restore()

    }

    drawPlatform = () => {
        this.context.save()
        this.context.strokeStyle = "blue";
        this.context.lineWidth = 9;

        this.platformX = sceneData.Gameplay.playerPlatform.originalX * (this.canvas.width / this.originalCanvasWidth);
        this.platformY = sceneData.Gameplay.playerPlatform.originalY * (this.canvas.height / this.originalCanvasHeight);
        this.platformWidth = sceneData.Gameplay.playerPlatform.boxWidth * (this.canvas.width / this.originalCanvasWidth);
        this.platformHeight = sceneData.Gameplay.playerPlatform.boxHeight * (this.canvas.height / this.originalCanvasHeight);

        this.context.strokeRect(this.platformX, this.platformY, this.platformWidth, this.platformHeight);
        this.context.restore()
    }

    // TODO As of now this wont work, I need to store these values for each collider, because they change dimensions depending on screen
    drawCollider = (scaledX, scaledY, scaledWidth, scaledHeight, color = "red") => {
        this.context.save()

        this.context.strokeStyle = color;
        this.context.lineWidth = 8;

        // const scaledX = originalX * (this.canvas.width / this.originalCanvasWidth);
        // const scaledY = originalY * (this.canvas.height / this.originalCanvasHeight);
        // const scaledWidth = boxWidth * (this.canvas.width / this.originalCanvasWidth);
        // const scaledHeight = boxHeight * (this.canvas.height / this.originalCanvasHeight);

        this.context.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);
        this.context.restore()
    }

    drawColliders = () => {
        this.drawCollider(
            this.dynamicSink.scaledX,
            this.dynamicSink.scaledY,
            this.dynamicSink.scaledWidth,
            this.dynamicSink.scaledHeight,
        );

        this.drawCollider(
            this.dynamicknife.scaledX,
            this.dynamicknife.scaledY,
            this.dynamicknife.scaledWidth,
            this.dynamicknife.scaledHeight,
        );

        this.drawCollider(
            this.dynamicStirr.scaledX,
            this.dynamicStirr.scaledY,
            this.dynamicStirr.scaledWidth,
            this.dynamicStirr.scaledHeight,
        );

        this.drawCollider(
            this.dynamicFry.scaledX,
            this.dynamicFry.scaledY,
            this.dynamicFry.scaledWidth,
            this.dynamicFry.scaledHeight,
        );

        this.drawCollider(
            this.dynamicInventory.scaledX,
            this.dynamicInventory.scaledY,
            this.dynamicInventory.scaledWidth,
            this.dynamicInventory.scaledHeight,
        );
    }
}