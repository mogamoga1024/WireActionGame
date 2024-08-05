
class StaticObject {
    #x = 0;
    get x() { return this.#x }
    #y = 0;
    get y() { return this.#y }
    #width = 0;
    get width() { return this.#width }
    #height = 0;
    get height() { return this.#height }
    
    constructor(x, y, width, height) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "skyblue";
        context.fill();
    }
}
