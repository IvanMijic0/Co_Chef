import {sceneData} from "../data-utils/scene-data.js";
import {textData} from "../data-utils/text-data.js";
import {Scene} from "./scene.js"

export class CharacterSelectScene extends Scene {
    constructor(canvasId, showButtons) {
        super(canvasId, showButtons);
        this.characters = [
            {
                src: "Assets/Sprites/Characters/pup.png",
                name: sceneData.CHARACTER_SELECT.pupName,
                width: sceneData.CHARACTER_SELECT.characterDim.width,
                height: sceneData.CHARACTER_SELECT.characterDim.height,
                hoverWidth: sceneData.CHARACTER_SELECT.characterDim.width + 20,
                hoverHeight: sceneData.CHARACTER_SELECT.characterDim.height + 20,
                speechImage: sceneData.CHARACTER_SELECT.pupSpeechImage,
                text: textData.pup
            },
            {
                src: "Assets/Sprites/Characters/isabelle.png",
                name: sceneData.CHARACTER_SELECT.isabelleName,
                width: sceneData.CHARACTER_SELECT.characterDim.width,
                height: sceneData.CHARACTER_SELECT.characterDim.height,
                hoverWidth: sceneData.CHARACTER_SELECT.characterDim.width + 20,
                hoverHeight: sceneData.CHARACTER_SELECT.characterDim.height + 20,
                speechImage: sceneData.CHARACTER_SELECT.isabelleSpeechImage,
                text: textData.isabelle
            },
            {
                src: "Assets/Sprites/Characters/celine.png",
                name: sceneData.CHARACTER_SELECT.celineName,
                width: sceneData.CHARACTER_SELECT.characterDim.width,
                height: sceneData.CHARACTER_SELECT.characterDim.height,
                hoverWidth: sceneData.CHARACTER_SELECT.characterDim.width + 20,
                hoverHeight: sceneData.CHARACTER_SELECT.characterDim.height + 20,
                speechImage: sceneData.CHARACTER_SELECT.celineSpeechImage,
                text: textData.celine
            },
            {
                src: "Assets/Sprites/Characters/amu.png",
                name: sceneData.CHARACTER_SELECT.amuName,
                width: sceneData.CHARACTER_SELECT.characterDim.width,
                height: sceneData.CHARACTER_SELECT.characterDim.height,
                hoverWidth: sceneData.CHARACTER_SELECT.characterDim.width + 20,
                hoverHeight: sceneData.CHARACTER_SELECT.characterDim.height + 20,
                speechImage: sceneData.CHARACTER_SELECT.amuSpeechImage,
                text: textData.amu
            },
            {
                src: "Assets/Sprites/Characters/chaton.png",
                name: sceneData.CHARACTER_SELECT.chatonName,
                width: sceneData.CHARACTER_SELECT.characterDim.width,
                height: sceneData.CHARACTER_SELECT.characterDim.height,
                hoverWidth: sceneData.CHARACTER_SELECT.characterDim.width + 20,
                hoverHeight: sceneData.CHARACTER_SELECT.characterDim.height + 20,
                speechImage: sceneData.CHARACTER_SELECT.chatonSpeechImage,
                text: textData.chaton
            }
        ];
        this.currentIndex = 0;
        this.characterName = document.getElementById("character-name");
        this.character = document.getElementById("character");
        this.character.src = this.characters[this.currentIndex].src;
        this.characterName.innerHTML = this.characters[this.currentIndex].name;
        this.isClicked = false;
    }

    draw = () => {
        this.context.fillStyle = "#DFFFAE";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawCharacter();
        this.drawSpeechBubble();

        this.context.font = "40px Handlee";
        this.context.fillStyle = "black";
        this.context.textAlign = "left";

        const text = this.characters[this.currentIndex].text;

        const textX = this.canvas.width * 0.2;
        const textY = this.canvas.height - this.characters[this.currentIndex].speechImage.height +
            this.characters[this.currentIndex].speechImage.height * 0.6;

        const maxWidth = this.canvas.width - (textX + 2);
        const lines = this.splitTextIntoLines(text, maxWidth);

        this.drawTextLines(lines, textX, textY);

    }

    drawCharacter = () => {
        const characterX = (this.canvas.width - this.characters[this.currentIndex].width) * .5;
        const characterY = (this.canvas.height - this.characters[this.currentIndex].height) * .4;
        this.context.drawImage(
            this.character,
            characterX,
            characterY,
            this.characters[this.currentIndex].width,
            this.characters[this.currentIndex].height,
        );

        const throttledMouseMove = this.throttle((event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Check collision with character's bounding box
            if (
                mouseX >= characterX &&
                mouseX <= characterX + this.characters[this.currentIndex].width &&
                mouseY >= characterY &&
                mouseY <= characterY + this.characters[this.currentIndex].height
            ) {
                // Collision detected
                this.characters[this.currentIndex].width = this.characters[this.currentIndex].hoverWidth;
                this.characters[this.currentIndex].height = this.characters[this.currentIndex].hoverHeight;
            } else {
                this.characters[this.currentIndex].width = this.characters[this.currentIndex].hoverWidth - 20;
                this.characters[this.currentIndex].height = this.characters[this.currentIndex].hoverHeight - 20;
            }

        }, 2000); // Adjust the throttle delay as needed

        const handleCharacterClick = () => {

            if (!this.isClicked) {
                console.log("clicked");
                this.isClicked = true;
            }

            this.canvas.removeEventListener("click", handleCharacterClick);

        };

        this.canvas.addEventListener("mousemove", throttledMouseMove);
        this.canvas.addEventListener("click", handleCharacterClick);
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
            this.characters[this.currentIndex].speechImage.source,
            0,
            this.canvas.height - this.characters[this.currentIndex].speechImage.height,
            this.characters[this.currentIndex].speechImage.width + 400,
            this.characters[this.currentIndex].speechImage.height
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
            const lineY = textY + (index * 55);
            this.context.fillText(line, textX, lineY);
        });
    }

    changeCharacterRight = () => {
        if (this.currentIndex >= this.characters.length - 1) {
            this.currentIndex = this.characters.length - 1
        } else {
            this.currentIndex++;
            this.character.src = this.characters[this.currentIndex].src;
            this.characterName.innerHTML = this.characters[this.currentIndex].name
            this.isClicked = false;
        }
    }
    changeCharacterLeft = () => {
        if (this.currentIndex <= 0) {
            this.currentIndex = 0
        } else {
            this.currentIndex--;
            this.character.src = this.characters[this.currentIndex].src;
            this.characterName.innerHTML = this.characters[this.currentIndex].name
            this.isClicked = false;
        }
    }
}