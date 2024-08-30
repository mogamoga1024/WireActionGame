
class Block {
    #x = 0;
    get x() { return this.#x; }
    #y = 0;
    get y() { return this.#y; }
    #width = 0;
    get width() { return this.#width; }
    #height = 0;
    get height() { return this.#height; }
    canStick = true;
    
    constructor(x, y, width, height) {
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

    resolveCollision(player) {
        return player.resolveBlockCollision(this);
    }

    onCollision(player, status) {
        if (status !== "床に接している") {
            console.log(status);
        }
    }
}
