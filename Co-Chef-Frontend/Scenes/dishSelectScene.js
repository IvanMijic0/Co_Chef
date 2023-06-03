import {Scene} from "./scene.js";
import {sceneData} from "../data-utils/scene-data.js";
import {textData} from "../data-utils/text-data.js";
import {throttle} from "../utils/throttling.js";

export class DishSelectScene extends Scene {
    constructor(canvasId, showButtons) {
        super(canvasId, showButtons);
        this.dishes = [
            {
                src: "Assets/Sprites/Dishes/noodles.png",
                text: textData.noodlesSelect,
            },
            {
                src: "Assets/Sprites/Dishes/curry.png",
                text: textData.currySelect
            },
            {
                src: "Assets/Sprites/Dishes/fishTaco.png",
                text: textData.fishSelect
            },

        ];
        this.speechImage = sceneData.DISH_SELECT.pierSpeechImage;
        this.currentDishIndex = 0;
        this.dish = document.getElementById("dish");
        this.dish.src = this.dishes[this.currentDishIndex].src;
        this.isClicked = false;
        this.text = document.getElementById("speechText");
        this.text.textContent = textData.dishSelection;
        this.scaledWidth = 0;
        this.scaledHeight = 0;
        this.sizeModifier = 0;
    }

    draw = () => {
        this.context.fillStyle = "#F6D860";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawDish();
        this.drawSpeechBubble();
    }

    drawDish = () => {
        this.scaledWidth = this.canvas.width * 0.28;
        this.scaledHeight = this.canvas.height * 0.45;
        const dishX = (this.canvas.width - this.scaledWidth) * 0.5;
        const dishY = (this.canvas.height - this.scaledHeight) * 0.3;

        this.context.drawImage(
            this.dish,
            dishX,
            dishY,
            this.scaledWidth + this.sizeModifier,
            this.scaledHeight + this.sizeModifier
        );

        const throttledDishMouseMove = throttle((event) => {
            this.handleDishCollision(event, dishX, dishY, this.scaledWidth, this.scaledHeight);
        }, 1000); // Adjust the throttle delay as needed

        const handleDishClick = (event) => {
            this.handleDishCollision(event, dishX, dishY, this.scaledWidth, this.scaledHeight, true);
            this.canvas.removeEventListener("click", handleDishClick);
        };

        this.canvas.addEventListener("click", handleDishClick);
        this.canvas.addEventListener("mousemove", throttledDishMouseMove);
    };

    handleDishCollision = (event, dishX, dishY, scaledWidth, scaledHeight, isClickEvent = false) => {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Check collision with dishes bounding box
        const collisionDetected =
            mouseX >= dishX &&
            mouseX <= dishX + scaledWidth &&
            mouseY >= dishY &&
            mouseY <= dishY + scaledHeight;

        if (collisionDetected) {
            this.sizeModifier = 40;
            this.canvas.style.cursor = "pointer"; // Change cursor to finger pointer

            if (isClickEvent && !this.isClicked) {
                const charConfirmBackButton = document.getElementById("CharSelect-confirmButton-container");
                charConfirmBackButton.style.display = "flex";
                this.sizeModifier = 40;
                this.isClicked = true;
                this.text.textContent = this.dishes[this.currentDishIndex].text;
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
            this.speechImage.source,
            0,
            this.canvas.height - this.canvas.height * .25,
            this.canvas.width * 1.6,
            this.canvas.height * .25,
        );
    }

    changeRight = () => {
        if (this.currentDishIndex >= this.dishes.length - 1) {
            this.currentDishIndex = this.dishes.length - 1
        } else {
            this.currentDishIndex++;
            this.dish.src = this.dishes[this.currentDishIndex].src;
        }
    }
    changeLeft = () => {
        if (this.currentDishIndex <= 0) {
            this.currentDishIndex = 0
        } else {
            this.currentDishIndex--;
            this.dish.src = this.dishes[this.currentDishIndex].src;
        }
    }

    rememberPick = () => {
        this.rememberCharacter = this.dishes[this.currentDishIndex].name;
        console.log("Picked Dish: " + this.rememberCharacter);
    }

    restartClick = () => {
        this.isClicked = false;
    }


    changeText = () => {
        this.text.textContent = textData.dishSelection;
    }
}