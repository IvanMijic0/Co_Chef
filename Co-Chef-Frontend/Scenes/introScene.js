import {Scene} from "./scene.js";

export class IntroScene extends Scene {
    constructor(canvasId, logo, background, showButtons) {
        super(canvasId, showButtons);
        this.logo = logo;
        this.background = background;
        this.sizeModifier = .2;
    }

    draw = () => {
        this.scaledWidth = this.canvas.width * 0.32;
        this.scaledHeight = this.canvas.height * 0.5;
        const logoX = (this.canvas.width - this.scaledWidth) * 0.5;
        const logoY = (this.canvas.height - this.scaledHeight) * 0.1;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(
            this.background.source,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        this.ctx.drawImage(
            this.logo,
            logoX,
            logoY,
            this.scaledWidth + this.sizeModifier,
            this.scaledHeight + this.sizeModifier
        );
    }

    updateLogoImage = (logoImage) => {
        this.logo = logoImage;
    }
}