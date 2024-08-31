
class Viewport {
    #width = 0;
    #height = 0;
    #world = null;
    #focus = null;

    constructor(canvas, world) {
        this.#width = canvas.width;
        this.#height = canvas.height;
        this.#world = world;
    }

    get offsetX() {
        if (this.#focus.x <= this.#width / 2 || this.#world.width <= this.#width) {
            return 0;
        }
        else if (this.#focus.x >= this.#world.width - this.#width / 2) {
            return this.#width - this.#world.width;
        }
        else {
            return this.#width / 2 - this.#focus.x;
        }
    }

    get offsetY() {
        const baseOffsetY = this.#height - this.#world.height;
        const baseY = this.#height * 2 / 3 - baseOffsetY;
        if (this.#height * 2 / 3 - this.#focus.y >= 0) {
            return 0;
        }
        else if (this.#focus.y >= baseY) {
            return baseOffsetY;
        }
        else {
            return baseOffsetY + baseY - this.#focus.y;
        }
    }

    setFocus(focus) {
        this.#focus = focus;
    }
}
