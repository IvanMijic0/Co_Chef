export class Scene {
    constructor(canvasId, showButtons) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.showButtons = showButtons;
        // ...
        import("./gameplayScene.js")
            .then(({ GameplayScene }) => {
                if (this instanceof GameplayScene) {
                    this.playerX = this.canvas.width * 0.3;
                    this.playerY = this.canvas.height * 0.3;
                }
            })
            .catch(error => {
                console.error("Cannot access GameplayScene before it is instantiated.", error);
            });
        this.initialize();
    }

    show = () => {
        document.getElementById("button-column").style.display = this.showButtons ? "flex" : "none";

        this.canvas.style.display = "block";
        this.canvas.style.pointerEvents = "auto";
    }
    hide = () => {
        document.getElementById("button-column").style.display = "none";

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