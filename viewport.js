
class Viewport {
    #width = 0;
    #height = 0;
    #world = null;
    #player = null;

    constructor(canvas, world, player) {
        this.#width = canvas.width;
        this.#height = canvas.height;
        this.#world = world;
        this.#player = player;
    }

    get offsetX() {
        if (this.#player.centerX <= this.#width / 2 || this.#world.width <= this.#width) {
            return 0;
        }
        else if (this.#player.centerX >= this.#world.width - this.#width / 2) {
            return this.#width - this.#world.width;
        }
        else {
            return this.#width / 2 - this.#player.centerX;
        }
    }

    get offsetY() {
        const baseOffsetY = this.#height - this.#world.height;
        const baseY = this.#height * 2 / 3 - baseOffsetY;
        if (this.#height * 2 / 3 - this.#player.centerY >= 0) {
            return 0;
        }
        else if (this.#player.centerY >= baseY) {
            return baseOffsetY;
        }
        else {
            return baseOffsetY + baseY - this.#player.centerY;
        }
    }

    setPlayer(player) {
        this.#player = player;
    }
}
