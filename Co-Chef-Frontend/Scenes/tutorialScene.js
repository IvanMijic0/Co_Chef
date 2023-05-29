import {Scene} from "./scene.js";

export class TutorialScene extends Scene {
    constructor(canvasId, image, showButtons) {
        super(canvasId, showButtons);
        this.image = image;
    }

    show = () => {
        document.querySelectorAll(".Button-column").forEach(element => {
            element.style.display = this.showButtons ? "flex" : "none";
        });
        document.getElementById("tutorial-backButton-container").style.display = "flex";
        this.canvas.style.display = "block";
        this.canvas.style.pointerEvents = "auto";
    }

    draw = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(
            this.image.source,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }
}