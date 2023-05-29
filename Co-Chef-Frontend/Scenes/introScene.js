import {Scene} from "./scene.js";

export class IntroScene extends Scene {
    constructor(canvasId, logo, background, showButtons) {
        super(canvasId, showButtons);
        this.logo = logo;
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
        this.context.drawImage(
            this.logo.source,
            (this.canvas.width - this.logo.width) * 0.5,
            (this.canvas.height - this.logo.height) * 0.5 - this.logo.height * .2
        );
    }
}