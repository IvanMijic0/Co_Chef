import {Scene} from "./scene.js";

export class SignupScene extends Scene {
    constructor(canvasId, image, showButtons) {
        super(canvasId, showButtons);
        this.image = image;
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
    show = () => {
        document.getElementById("signup-container").style.display = "block";
        this.canvas.style.display = "block";
        this.canvas.style.pointerEvents = "auto";
    }
}