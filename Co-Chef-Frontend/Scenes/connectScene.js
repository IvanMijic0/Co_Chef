import {Scene} from "./scene.js";

export class ConnectScene extends Scene {
    constructor(canvasId, image, showButtons) {
        super(canvasId, showButtons);
        this.image = image;
    }

    update = () => {

    }

    draw = () => {
        this.ctx.drawImage(
            this.image,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }
}