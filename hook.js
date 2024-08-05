
class Hook {
    #x = 0;
    get x() { return this.#x }
    #y = 0;
    get y() { return this.#y }
    #width = 14;
    get width() { return this.#width }
    #height = 14;
    get height() { return this.#height }
    get centerX() { return this.#x + this.#width / 2; }
    get centerY() { return this.#y + this.#height / 2; }

    #vx = 0;
    #vy = 0;
    
    constructor(player, radian) {
        this.#x = player.x + player.width / 2 - this.width / 2;
        this.#y = player.y + player.height / 2 - this.height / 2;
        this.#vx = 10 * Math.cos(radian);
        this.#vy = -1 * 10 * Math.sin(radian);
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "black";
        context.fill();
    }

    move() {
        this.#x += this.#vx;
        this.#y += this.#vy;
    }
}
