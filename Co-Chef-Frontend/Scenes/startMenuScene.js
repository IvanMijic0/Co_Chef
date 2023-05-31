import {Scene} from "./scene.js";

export class StartMenuScene extends Scene {
    constructor(canvasId, background, showButtons) {
        super(canvasId, showButtons);
        this.background = background;

    }
    draw = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(
            this.background.source,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }
}