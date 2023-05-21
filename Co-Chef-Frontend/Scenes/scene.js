import { textData } from "../utils/text-data.js";
import { sceneData } from "./scene-data.js";

class Scene {
    constructor(canvasId, showButtons) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.showButtons = showButtons;
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
}

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
            (this.canvas.width - this.background.width),
            (this.canvas.height - this.background.height) * .5
        );
        this.context.drawImage(
            this.logo.source,
            (this.canvas.width - this.logo.width) * 0.5,
            (this.canvas.height - this.logo.height) * 0.5 - this.logo.height * .2
        );
    }
}

export class StartMenuScene extends Scene {
    constructor(canvasId, background, showButtons) {
        super(canvasId, showButtons);
        this.background = background;
    }

    draw = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(
            this.background.source,
            (this.canvas.width - this.background.width) * 0.5,
            (this.canvas.height - this.background.height) * 0.5
        );
    }
}

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
            (this.canvas.width - this.image.width) * 0.5,
            (this.canvas.height - this.image.height) * 0.5
        );
    }
}

export class OptionsScene extends Scene {
    constructor(canvasId, image, showButtons) {
        super(canvasId, showButtons);
        this.image = image;
    }
    draw = () => {
        this.context.drawImage(
            this.image.source,
            (this.canvas.width - this.image.width) * 0.5,
            (this.canvas.height - this.image.height) * 0.5
        );
    }
}
export class LoginScene extends Scene {
    constructor(canvasId, image, showButtons) {
        super(canvasId, showButtons);
        this.image = image;
    }
    draw = () => {
        this.context.drawImage(
            this.image.source,
            (this.canvas.width - this.image.width) * 0.5,
            (this.canvas.height - this.image.height) * 0.5
        );
    }
    show = () => {
        document.getElementById("login-container").style.display = "block";
        this.canvas.style.display = "block";
        this.canvas.style.pointerEvents = "auto";
    }
}
export class SignupScene extends Scene {
    constructor(canvasId, image, showButtons) {
        super(canvasId, showButtons);
        this.image = image;
    }
    draw = () => {
        this.context.drawImage(
            this.image.source,
            (this.canvas.width - this.image.width) * 0.5,
            (this.canvas.height - this.image.height) * 0.5
        );
    }
    show = () => {
        document.getElementById("signup-container").style.display = "block";
        this.canvas.style.display = "block";
        this.canvas.style.pointerEvents = "auto";
    }
}

export class CharacterSelectScene extends Scene {
    constructor(canvasId, speech, showButtons) {
        super(canvasId, showButtons);
        this.speech = speech;
        // TODO Finish this
        this.characters = [
            {src: "Assets/Sprites/pup.png", width: sceneData.CHARACTER_SELECT.pupDim.width, height: sceneData.CHARACTER_SELECT.pupDim.height},
            "Assets/Sprites/isabelle.png",
            "Assets/Sprites/celine.png",
            "Assets/Sprites/amu.png",
            "Assets/Sprites/chaton.png"
        ];
        this.currentIndex = 0;
    }

    draw = () => {
        this.context.fillStyle = "#DFFFAE";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawCharacter();

        this.drawSpeechBubble();

        this.context.font = "28px Handlee";
        this.context.fillStyle = "black";
        this.context.textAlign = "left";

        const text = textData.pup;

        const textX = this.canvas.width * 0.3;
        const textY = this.canvas.height - this.speech.height + this.speech.height * 0.6;

        const maxWidth = this.canvas.width - (textX + 2);
        const lines = this.splitTextIntoLines(text, maxWidth);

        this.drawTextLines(lines, textX, textY);

    }

    drawCharacter = () => {
        const character = document.getElementById("character");
        character.src = this.characters[this.currentIndex].src;

        const characterX = (this.canvas.width - this.characters[this.currentIndex].width) * .5;
        const characterY = (this.canvas.height - this.characters[this.currentIndex].height) * .4;
        this.context.drawImage(
            character,
            characterX,
            characterY,
            sceneData.CHARACTER_SELECT.pupDim.width,
            sceneData.CHARACTER_SELECT.pupDim.height
        );

        const throttledMouseMove = this.throttle((event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Check collision with character's bounding box
            if (
                mouseX >= characterX &&
                mouseX <= characterX + sceneData.CHARACTER_SELECT.pupDim.width - 150 &&
                mouseY >= characterY &&
                mouseY <= characterY + sceneData.CHARACTER_SELECT.pupDim.height - 80
            ) {
                // Collision detected
                console.log("yo");
                sceneData.CHARACTER_SELECT.pupDim.width = 545;
                sceneData.CHARACTER_SELECT.pupDim.height = 585;
            } else {
                sceneData.CHARACTER_SELECT.pupDim.width = 525;
                sceneData.CHARACTER_SELECT.pupDim.height = 565;
            }
        }, 2500); // Adjust the throttle delay as needed

        this.canvas.addEventListener("mousemove", throttledMouseMove);
    };

    throttle = (func, delay) => {
        let timeoutId;
        let lastExecTime = 0;

        return (...args) => {
            const context = this;
            const currentTimestamp = Date.now();

            const execute = () => {
                func.apply(context, args);
                lastExecTime = currentTimestamp;
            };

            if (currentTimestamp >= lastExecTime + delay) {
                execute();
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(execute, delay);
            }
        };
    };


    drawSpeechBubble = () => {
        this.context.drawImage(
            this.speech.source,
            0,
            this.canvas.height - this.speech.height
        );
    }

    splitTextIntoLines = (text, maxWidth) => {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words.shift();

        for (const word of words) {
            const width = this.context.measureText(`${currentLine} ${word}`).width;
            if (width < maxWidth) {
                currentLine += ` ${word}`;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }

        lines.push(currentLine);
        return lines;
    }

    drawTextLines = (lines, textX, textY) => {
        lines.forEach((line, index) => {
            const lineY = textY + (index * 37.38);
            this.context.fillText(line, textX, lineY);
        });
    }

}
