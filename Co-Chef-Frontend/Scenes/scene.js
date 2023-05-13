export  class Scene {
    constructor(canvasId, backgroundColor, image, showButtons) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.backgroundColor = backgroundColor;
        this.image = image;
        this.showButtons = showButtons;

    }

    show = () => {
        if (!this.showButtons) {
            document.querySelectorAll(".Button-column").forEach(element => {
                element.style.display = "none";
            });
        } else {
            document.querySelectorAll(".Button-column").forEach(element => {
                element.style.display = "flex";
            });
        }
        this.canvas.style.display = "block";
        this.canvas.style.pointerEvents = "auto";
    }

    hide = () => {
        document.querySelectorAll(".Button-column").forEach(element => {
            element.style.display = "none";
        });
        this.canvas.style.display = "none";
        this.canvas.style.pointerEvents = "none";
    }

    draw = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(
            this.image.element,
            (this.canvas.width - this.image.width) * 0.5,
            (this.canvas.height - this.image.height) * 0.5 - this.image.height * 0.2
        );
    }
}

export class StartMenuScene extends Scene {
    constructor(canvasId, backgroundColor, image, showButtons) {
        super(canvasId, backgroundColor, image, showButtons);
    }
    draw = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(
            this.image.element,
            (this.canvas.width - this.image.width) * 0.5,
            (this.canvas.height - this.image.height) * 0.5 + this.image.height * .1
        );
    }
}
