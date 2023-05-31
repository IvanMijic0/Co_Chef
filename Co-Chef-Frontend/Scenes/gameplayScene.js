import {Scene} from "./scene.js";
import {sceneData} from "../data-utils/scene-data.js";

export class GameplayScene extends Scene {
    constructor(canvasId, image, showButtons) {
        super(canvasId, showButtons);
        this.image = image;
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

        this.context.strokeStyle = "red";
        this.context.lineWidth = 5;
        this.context.strokeRect(
            sceneData.Gameplay.sinkDim.originalX * (this.canvas.width / this.originalCanvasWidth),
            sceneData.Gameplay.sinkDim.originalY * (this.canvas.height / this.originalCanvasHeight),
            sceneData.Gameplay.sinkDim.boxWidth * (this.canvas.width / this.originalCanvasWidth),
            sceneData.Gameplay.sinkDim.boxHeight * (this.canvas.height / this.originalCanvasHeight)
        );
        this.context.strokeRect(
            sceneData.Gameplay.knifeDim.originalX * (this.canvas.width / this.originalCanvasWidth),
            sceneData.Gameplay.knifeDim.originalY * (this.canvas.height / this.originalCanvasHeight),
            sceneData.Gameplay.knifeDim.boxWidth * (this.canvas.width / this.originalCanvasWidth),
            sceneData.Gameplay.knifeDim.boxHeight * (this.canvas.height / this.originalCanvasHeight)
        );
        this.context.strokeRect(
            sceneData.Gameplay.stirringDim.originalX * (this.canvas.width / this.originalCanvasWidth),
            sceneData.Gameplay.stirringDim.originalY * (this.canvas.height / this.originalCanvasHeight),
            sceneData.Gameplay.stirringDim.boxWidth * (this.canvas.width / this.originalCanvasWidth),
            sceneData.Gameplay.stirringDim.boxHeight * (this.canvas.height / this.originalCanvasHeight)
        );
        this.context.strokeRect(
            sceneData.Gameplay.fryingDim.originalX * (this.canvas.width / this.originalCanvasWidth),
            sceneData.Gameplay.fryingDim.originalY * (this.canvas.height / this.originalCanvasHeight),
            sceneData.Gameplay.fryingDim.boxWidth * (this.canvas.width / this.originalCanvasWidth),
            sceneData.Gameplay.fryingDim.boxHeight * (this.canvas.height / this.originalCanvasHeight)
        );
        this.context.strokeRect(
            sceneData.Gameplay.inventoryDim.originalX * (this.canvas.width / this.originalCanvasWidth),
            sceneData.Gameplay.inventoryDim.originalY * (this.canvas.height / this.originalCanvasHeight),
            sceneData.Gameplay.inventoryDim.boxWidth * (this.canvas.width / this.originalCanvasWidth),
            sceneData.Gameplay.inventoryDim.boxHeight * (this.canvas.height / this.originalCanvasHeight)
        );
    }
}