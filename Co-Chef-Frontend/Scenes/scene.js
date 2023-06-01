export class Scene {
    constructor(canvasId, showButtons) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.showButtons = showButtons;
        this.playerX = this.canvas.width * 0.3;
        this.playerY = this.canvas.height * 0.3;
        this.initialize();
    }

    show = () => {
        document.querySelectorAll(".Button-column").forEach(element => {
            element.style.display = this.showButtons ? "flex" : "none";
        });
        this.canvas.style.display = "block";
        this.canvas.style.pointerEvents = "auto";
    }

    hide = () => {
        document.querySelectorAll(".Button-column").forEach(element => {
            element.style.display = "none";
        });
        document.getElementById("optionsHeader").style.display = "none";
        document.getElementById("login-container").style.display = "none";
        document.getElementById("signup-container").style.display = "none";
        document.getElementById("volumeIcon").style.display = "none";
        this.canvas.style.display = "none";
        this.canvas.style.pointerEvents = "none";
    }

    initialize = () => {
        window.addEventListener('resize', this.resizeCanvas.bind(this), false);
        this.resizeCanvas();
    }

    resizeCanvas = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.reset();
        // console.log(this.canvas.width + "\n" + this.canvas.height);
    }

    reset = () => {
        this.playerX = window.innerWidth * 0.3;
        this.playerY = window.innerHeight * 0.3;
    }
}