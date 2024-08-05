
class Hook {
    #x = 0;
    get x() { return this.#x }
    #y = 0;
    get y() { return this.#y }
    #width = 10;
    get width() { return this.#width }
    #height = 10;
    get height() { return this.#height }

    #v = 10;
    
    constructor(player) {
        this.#x = player.x + player.width / 2 - this.width / 2;
        this.#y = player.y + player.height / 2 - this.height / 2;
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "black";
        context.fill();
    }
}
