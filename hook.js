
class Hook {
    #x = 0;
    get x() { return this.#x }
    #y = 0;
    get y() { return this.#y }
    #width = 10;
    get width() { return this.#width }
    #height = 10;
    get height() { return this.#height }
    
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "black";
        context.fill();
    }
}
