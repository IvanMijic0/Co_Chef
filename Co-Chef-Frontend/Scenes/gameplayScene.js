import {Scene} from "./scene.js";

export class GameplayScene extends Scene {
    constructor(canvasId, image, showButtons) {
        super(canvasId, showButtons);
        this.image = image;
    }


    draw = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


        this.context.font = "100px CoffeCake";
        this.context.fillStyle = "black";
        this.context.textAlign = "center";

        this.context.save();

        const text = "Gameplay";
        this.context.fillStyle = "white";
        const x = this.canvas.width / 2;
        const y = this.canvas.height / 2;

        this.context.fillText(text, x, y);

        this.context.restore();
    }
}