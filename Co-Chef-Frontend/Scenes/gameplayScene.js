import {Scene} from "./scene.js";
import {sceneData} from "../data-utils/scene-data.js";
import {InputHandler} from "../Control/input-handler.js";

export class GameplayScene extends Scene {
    constructor(canvasId, backgroundImage, playerImage, showButtons) {
        super(canvasId, showButtons);
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
    }

    update = () => {
        this.speedModifier = Math.min(this.scaledWidth, this.scaledHeight) * .02
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

    drawCollider = (originalX, originalY, boxWidth, boxHeight, color = "red") => {
        this.context.save()

        this.context.strokeStyle = color;
        this.context.lineWidth = 8;

        const scaledX = originalX * (this.canvas.width / this.originalCanvasWidth);
        const scaledY = originalY * (this.canvas.height / this.originalCanvasHeight);
        const scaledWidth = boxWidth * (this.canvas.width / this.originalCanvasWidth);
        const scaledHeight = boxHeight * (this.canvas.height / this.originalCanvasHeight);

        this.context.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);
        this.context.restore()
    }

    drawColliders = () => {
        this.drawCollider(
            sceneData.Gameplay.sinkDim.originalX,
            sceneData.Gameplay.sinkDim.originalY,
            sceneData.Gameplay.sinkDim.boxWidth,
            sceneData.Gameplay.sinkDim.boxHeight,
        );

        this.drawCollider(
            sceneData.Gameplay.knifeDim.originalX,
            sceneData.Gameplay.knifeDim.originalY,
            sceneData.Gameplay.knifeDim.boxWidth,
            sceneData.Gameplay.knifeDim.boxHeight,
        );

        this.drawCollider(
            sceneData.Gameplay.stirringDim.originalX,
            sceneData.Gameplay.stirringDim.originalY,
            sceneData.Gameplay.stirringDim.boxWidth,
            sceneData.Gameplay.stirringDim.boxHeight,
        );

        this.drawCollider(
            sceneData.Gameplay.fryingDim.originalX,
            sceneData.Gameplay.fryingDim.originalY,
            sceneData.Gameplay.fryingDim.boxWidth,
            sceneData.Gameplay.fryingDim.boxHeight,
        );

        this.drawCollider(
            sceneData.Gameplay.inventoryDim.originalX,
            sceneData.Gameplay.inventoryDim.originalY,
            sceneData.Gameplay.inventoryDim.boxWidth,
            sceneData.Gameplay.inventoryDim.boxHeight,
        );
    }
}