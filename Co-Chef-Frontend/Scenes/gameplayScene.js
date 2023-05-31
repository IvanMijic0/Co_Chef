import {Scene} from "./scene.js";
import {sceneData} from "../data-utils/scene-data.js";

export class GameplayScene extends Scene {
    constructor(canvasId, image, showButtons) {
        super(canvasId, showButtons);
        this.image = image;
        // The coordinates were set based on primary computer screen
        // Could affect the formula if played on a screen bigger than mine...
        // I'll cross that bridge when I get there
        this.originalCanvasWidth = 7680;
        this.originalCanvasHeight = 3916;
    }

    draw = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the background image
        this.context.drawImage(
            this.image,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.drawColliders();
    }

    drawCollider = (originalX, originalY, boxWidth, boxHeight) => {
        this.context.strokeStyle = "red";
        this.context.lineWidth = 5;

        const scaledX = originalX * (this.canvas.width / this.originalCanvasWidth);
        const scaledY = originalY * (this.canvas.height / this.originalCanvasHeight);
        const scaledWidth = boxWidth * (this.canvas.width / this.originalCanvasWidth);
        const scaledHeight = boxHeight * (this.canvas.height / this.originalCanvasHeight);

        this.context.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);
    }

    drawColliders = () => {
        this.drawCollider(
            sceneData.Gameplay.sinkDim.originalX,
            sceneData.Gameplay.sinkDim.originalY,
            sceneData.Gameplay.sinkDim.boxWidth,
            sceneData.Gameplay.sinkDim.boxHeight
        );

        this.drawCollider(
            sceneData.Gameplay.knifeDim.originalX,
            sceneData.Gameplay.knifeDim.originalY,
            sceneData.Gameplay.knifeDim.boxWidth,
            sceneData.Gameplay.knifeDim.boxHeight
        );

        this.drawCollider(
            sceneData.Gameplay.stirringDim.originalX,
            sceneData.Gameplay.stirringDim.originalY,
            sceneData.Gameplay.stirringDim.boxWidth,
            sceneData.Gameplay.stirringDim.boxHeight
        );

        this.drawCollider(
            sceneData.Gameplay.fryingDim.originalX,
            sceneData.Gameplay.fryingDim.originalY,
            sceneData.Gameplay.fryingDim.boxWidth,
            sceneData.Gameplay.fryingDim.boxHeight
        );

        this.drawCollider(
            sceneData.Gameplay.inventoryDim.originalX,
            sceneData.Gameplay.inventoryDim.originalY,
            sceneData.Gameplay.inventoryDim.boxWidth,
            sceneData.Gameplay.inventoryDim.boxHeight
        );
    }

}