
class Block {
    #x = 0;
    get x() { return this.#x }
    #y = 0;
    get y() { return this.#y }
    #width = 0;
    get width() { return this.#width }
    #height = 0;
    get height() { return this.#height }
    
    constructor(x, y, width, height) {
        if (width < 30 || height < 30) {
            // hookの速度以上の長さが必要
            throw new Error("一辺は30以上必要");
        }
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
    }

    draw(context, viewport) {
        const ox =  viewport.offsetX;
        const oy =  viewport.offsetY;

        context.beginPath();
        context.rect(this.x + ox, this.y + oy, this.width, this.height);
        context.fillStyle = "skyblue";
        context.fill();
    }
}
