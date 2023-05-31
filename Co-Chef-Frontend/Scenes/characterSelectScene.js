import {sceneData} from "../data-utils/scene-data.js";
import {textData} from "../data-utils/text-data.js";
import {Scene} from "./scene.js"
import {throttle} from "../utils/throttling.js"

export class CharacterSelectScene extends Scene {
    constructor(canvasId, showButtons) {
        super(canvasId, showButtons);
        this.characters = [
            {
                src: "Assets/Sprites/Characters/pup.png",
                name: sceneData.CHARACTER_SELECT.pupName,
                speechImage: sceneData.CHARACTER_SELECT.pupSpeechImage,
                defaultText: textData.pup,
                selectText: textData.pupSelected
            },
            {
                src: "Assets/Sprites/Characters/isabelle.png",
                name: sceneData.CHARACTER_SELECT.isabelleName,
                speechImage: sceneData.CHARACTER_SELECT.isabelleSpeechImage,
                defaultText: textData.isabelle,
                selectText: textData.isabelleSelected
            },
            {
                src: "Assets/Sprites/Characters/celine.png",
                name: sceneData.CHARACTER_SELECT.celineName,
                speechImage: sceneData.CHARACTER_SELECT.celineSpeechImage,
                defaultText: textData.celine,
                selectText: textData.celineSelected
            },
            {
                src: "Assets/Sprites/Characters/amu.png",
                name: sceneData.CHARACTER_SELECT.amuName,
                speechImage: sceneData.CHARACTER_SELECT.amuSpeechImage,
                defaultText: textData.amu,
                selectText: textData.amuSelected
            },
            {
                src: "Assets/Sprites/Characters/chaton.png",
                name: sceneData.CHARACTER_SELECT.chatonName,
                speechImage: sceneData.CHARACTER_SELECT.chatonSpeechImage,
                defaultText: textData.chaton,
                selectText: textData.chatonSelected
            }
        ];
        this.currentIndex = 0;
        this.characterName = document.getElementById("character-name");
        this.character = document.getElementById("character");
        this.character.src = this.characters[this.currentIndex].src;
        this.characterName.innerHTML = this.characters[this.currentIndex].name;
        this.rememberCharacter = 0;
        this.text = document.getElementById("speechText");
        this.text.textContent = this.characters[this.currentIndex].defaultText;
        this.scaledWidth = 0;
        this.scaledHeight = 0;
        this.sizeModifier = 0;
    }

    draw = () => {
        this.context.fillStyle = "#DFFFAE";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawCharacter();
        this.drawSpeechBubble();
    }

    drawCharacter = () => {
        this.scaledWidth = this.canvas.width * 0.3;
        this.scaledHeight = this.canvas.height * 0.6;
        const characterX = (this.canvas.width - this.scaledWidth) * 0.5;
        const characterY = (this.canvas.height - this.scaledHeight) * 0.4;

        this.context.drawImage(
            this.character,
            characterX,
            characterY,
            this.scaledWidth + this.sizeModifier,
            this.scaledHeight + this.sizeModifier
        );

        // Draw collision box
        this.context.strokeStyle = "black";
        this.context.lineWidth = 5;
        this.context.strokeRect(
            characterX,
            characterY,
            this.scaledWidth + this.sizeModifier,
            this.scaledHeight + this.sizeModifier
        );

        const throttledMouseMove = throttle((event) => {
            this.handleCharacterCollision(event, characterX, characterY, this.scaledWidth, this.scaledHeight);
        }, 1000); // Adjust the throttle delay as needed

        const handleCharacterClick = (event) => {
            this.handleCharacterCollision(event, characterX, characterY, this.scaledWidth, this.scaledHeight, true);
            this.canvas.removeEventListener("click", handleCharacterClick);
        };

        this.canvas.addEventListener("click", handleCharacterClick);
        this.canvas.addEventListener("mousemove", throttledMouseMove);
    };

    handleCharacterCollision = (event, characterX, characterY, scaledWidth, scaledHeight, isClickEvent = false) => {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Check collision with character's bounding box
        const collisionDetected =
            mouseX >= characterX &&
            mouseX <= characterX + scaledWidth &&
            mouseY >= characterY &&
            mouseY <= characterY + scaledHeight;

        if (collisionDetected) {
            this.sizeModifier = 40;
            this.canvas.style.cursor = "pointer"; // Change cursor to finger pointer

            if (isClickEvent && !this.isClicked) {
                const charConfirmBackButton = document.getElementById("CharSelect-confirmButton-container");
                charConfirmBackButton.style.display = "flex";
                this.sizeModifier = 40;
                this.text.textContent = this.characters[this.currentIndex].selectText;
                this.isClicked = true;
            }
        } else {
            if (!this.isClicked) {
                this.sizeModifier = 0;
            }
            this.canvas.style.cursor = "default"; // Change cursor back to default
        }
    };


    drawSpeechBubble = () => {
        this.context.drawImage(
            this.characters[this.currentIndex].speechImage.source,
            0,
            this.canvas.height - this.canvas.height * .25,
            this.canvas.width * 1.6,
            this.canvas.height * .25,
        );
    }

    changeRight = () => {
        if (this.currentIndex >= this.characters.length - 1) {
            this.currentIndex = this.characters.length - 1
        } else {
            this.currentIndex++;
            this.character.src = this.characters[this.currentIndex].src;
            this.characterName.innerHTML = this.characters[this.currentIndex].name
        }
    }
    changeLeft = () => {
        if (this.currentIndex <= 0) {
            this.currentIndex = 0
        } else {
            this.currentIndex--;
            this.character.src = this.characters[this.currentIndex].src;
            this.characterName.innerHTML = this.characters[this.currentIndex].name
        }
    }

    rememberPick = () => {
        this.rememberCharacter = this.characters[this.currentIndex].name;
        console.log("Picked character: " + this.rememberCharacter);
    }

    restartClick = () => {
        this.isClicked = false;
    }

    changeText = () => {
        this.text.textContent = this.characters[this.currentIndex].defaultText;
    }
}