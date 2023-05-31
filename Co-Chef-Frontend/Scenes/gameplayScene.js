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

        // Calculate the scaled position and size based on canvas dimensions
        // const scaleX = this.canvas.width / this.originalCanvasWidth;
        // const scaleY = this.canvas.height / this.originalCanvasHeight;
        // const scaledX = originalX * scaleX;
        // const scaledY = originalY * scaleY;
        // const scaledWidth = boxWidth * scaleX;
        // const scaledHeight = boxHeight * scaleY;

        // Draw the scaled box
        this.context.strokeStyle = "red";
        this.context.lineWidth = 5;
        this.context.strokeRect(
            sceneData.Gameplay.sinkDim.originalX * (this.canvas.width / this.originalCanvasWidth),
            sceneData.Gameplay.sinkDim.originalY * (this.canvas.height / this.originalCanvasHeight),
            sceneData.Gameplay.sinkDim.boxWidth * (this.canvas.width / this.originalCanvasWidth),
            sceneData.Gameplay.sinkDim.boxHeight * (this.canvas.height / this.originalCanvasHeight)
        );
    }

}