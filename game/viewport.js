
class Viewport {
    dx = 0;
    dy = 0;
    #world = null;
    #player = null;

    constructor(world, player) {
        this.#world = world;
        this.#player = player;
    }

    get offsetX() {
        if (this.#player.centerX <= canvas.width / 2 || this.#world.width <= canvas.width) {
            return 0 - this.dx;
        }
        else if (this.#player.centerX >= this.#world.width - canvas.width / 2) {
            return canvas.width - this.#world.width - this.dx;
        }
        else {
            return canvas.width / 2 - this.#player.centerX - this.dx;
        }
    }

    get offsetY() {
        const baseOffsetY = canvas.height - this.#world.height;
        const baseY = canvas.height * 2 / 3 - baseOffsetY;
        if (canvas.height * 2 / 3 - this.#player.centerY >= 0) {
            return 0 - this.dy;
        }
        else if (this.#player.centerY >= baseY) {
            return baseOffsetY - this.dy;
        }
        else {
            return baseOffsetY + baseY - this.#player.centerY - this.dy;
        }
    }

    setPlayer(player) {
        this.#player = player;
    }
}
