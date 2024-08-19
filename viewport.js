
class Viewport {
    #width = 0;
    #height = 0;
    #worldWidth = 0;
    #player = null;

    constructor(canvas, worldWidth, player) {
        this.#width = canvas.width;
        this.#height = canvas.height;
        this.#worldWidth = worldWidth;
        this.#player = player;
    }

    get offsetX() {
        if (this.#player.centerX <= this.#width / 2) {
            return 0;
        }
        else if (this.#player.centerX >= this.#worldWidth - this.#width / 2) {
            return this.#width - this.#worldWidth;
        }
        else {
            return this.#width / 2 - this.#player.centerX;
        }
    }

    get offsetY() {
        return 0; // todo 仮
    }
}
