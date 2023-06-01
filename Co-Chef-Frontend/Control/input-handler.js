const KEYS = {
    ARROW_DOWN: "ArrowDown",
    KEY_DOWN: "s",
    ARROW_UP: "ArrowUp",
    KEY_UP: "w",
    ARROW_LEFT: "ArrowLeft",
    KEY_LEFT: "a",
    ARROW_RIGHT: "ArrowRight",
    KEY_RIGHT: "d",
    SHIFT: "Shift",
    ENTER: "Enter",
    SPACE: " "
};

export class InputHandler {
    constructor() {
        this.keys = [];
        this.lastKey = "";

        window.addEventListener("keydown", e => {
            switch (e.key){
                case "ArrowLeft":
                    this.lastKey = "PRESS left";
                    break
                case "a":
                    this.lastKey = "PRESS left";
                    break
                case "ArrowRight":
                    this.lastKey = "PRESS right";
                    break
                case "d":
                    this.lastKey = "PRESS right";
                    break
                case "ArrowDown":
                    this.lastKey = "PRESS down";
                    break
                case "s":
                    this.lastKey = "PRESS down";
                    break
                case "ArrowUp":
                    this.lastKey = "PRESS up";
                    break
                case "w":
                    this.lastKey = "PRESS up";
                    break
                case " ":
                    this.lastKey = "PRESS up";
                    break
            }
            if (
                Object.values(KEYS).includes(e.key) &&
                !this.keys.includes(e.key)
            )
            {
                this.keys.push(e.key);
            }
        });

        window.addEventListener("keyup", e => {
            switch (e.key){
                case "ArrowLeft":
                    this.lastKey = "RELEASE left";
                    break
                case "a":
                    this.lastKey = "RELEASE left";
                    break
                case "ArrowRight":
                    this.lastKey = "RELEASE right";
                    break
                case "d":
                    this.lastKey = "RELEASE right";
                    break
                case "ArrowDown":
                    this.lastKey = "RELEASE down";
                    break
                case "s":
                    this.lastKey = "RELEASE down";
                    break
                case "ArrowUp":
                    this.lastKey = "RELEASE up";
                    break
                case "w":
                    this.lastKey = "RELEASE up";
                    break
            }
            const index = this.keys.indexOf(e.key);
            if (index !== -1) {
                this.keys.splice(index, 1);
            }
        });
    }
}