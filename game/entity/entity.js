
class Entity {
    #x = 0;
    get x() { return this.#x; }
    #y = 0;
    get y() { return this.#y; }
    #width = 0;
    get width() { return this.#width; }
    #height = 0;
    get height() { return this.#height; }

    constructor(x, y, width, height) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
    }

    canDraw(viewport) {
        const ox = viewport.offsetX;
        const oy = viewport.offsetY;
        const x = this.x + ox;
        const y = this.y + oy;
        if (
            x > canvas.width ||
            x + this.width < 0 ||
            y > canvas.height ||
            y + this.height < 0
        ) {
            return false;
        }
        return true;
    }
}
