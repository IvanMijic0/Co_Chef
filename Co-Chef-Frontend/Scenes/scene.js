export class Scene {
    constructor(canvasId, showButtons) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.showButtons = showButtons;
        this.originalCanvasWidth = 0;
        this.originalCanvasHeight = 0;
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
        this.originalCanvasWidth = this.canvas.width;
        this.originalCanvasHeight = this.canvas.height;
        window.addEventListener('resize', this.resizeCanvas, false);
        this.resizeCanvas();
    }

    resizeCanvas = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log(this.canvas.width + "\n" + this.canvas.height);
    }
}