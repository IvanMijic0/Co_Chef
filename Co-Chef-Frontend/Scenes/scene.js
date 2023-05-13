export const createScene = (canvasId, backgroundColor, image) => {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return {
        canvas,
        context,
        backgroundColor,
        image,
        show() {
            this.canvas.style.display = "block";
            this.canvas.style.pointerEvents = "auto";
        },
        hide() {
            this.canvas.style.display = "none";
            this.canvas.style.pointerEvents = "none";
        },
        draw() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.fillStyle = this.backgroundColor;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.drawImage(
                this.image.element,
                (this.canvas.width - this.image.width) * .5,
                (this.canvas.height - this.image.height) * .5,
            );
        },
    };
};