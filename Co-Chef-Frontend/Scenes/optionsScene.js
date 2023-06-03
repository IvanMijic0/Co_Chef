import {Scene} from "./scene.js";

export class OptionsScene extends Scene {
    constructor(canvasId, image, showButtons) {
        super(canvasId, showButtons);
        this.image = image;
    }
    draw = () => {
        this.context.drawImage(
            this.image.source,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }
}