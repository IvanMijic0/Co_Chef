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
    SPACE: " ",
    E: "e"
};

export class InputHandler {
    constructor() {
        this.keys = [];
        this.lastKey = "";
        this.debug = false;
        window.addEventListener("keydown", e => {
            if (e.key === "e"){
                this.lastKey = e.key;
            }
            else if (e.key === "ArrowUp"){
                this.lastKey = e.key;
            }
                if (
                    Object.values(KEYS).includes(e.key) &&
                    !this.keys.includes(e.key)
                ) {
                    this.keys.push(e.key);
                } else if (e.key === "F2") {
                    this.debug = !this.debug;
                    e.preventDefault();
                }
                console.log(this.keys)
                // console.log(this.lastKey)

        });

        window.addEventListener("keyup", e => {
            this.lastKey = "";
            const index = this.keys.indexOf(e.key);
            if (index !== -1) {
                this.keys.splice(index, 1);
            }
            console.log(this.keys)
            // console.log(this.lastKey)
        });
    }
}