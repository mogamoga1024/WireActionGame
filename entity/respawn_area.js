
class RespawnArea {
    #x = 0;
    get x() { return this.#x; }
    #y = 0;
    get y() { return this.#y; }
    #width = 0;
    get width() { return this.#width; }
    #height = 0;
    get height() { return this.#height; }
    get centerX() { return this.#x + this.#width / 2; }
    get centerY() { return this.#y + this.#height / 2; }
    #direction = "right";
    get direction() { return this.#direction; }

    constructor(x, y, width, height, direction = "right") {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#direction = direction;
    }

    draw(context, viewport) {
        const ox =  viewport.offsetX;
        const oy =  viewport.offsetY;

        context.globalAlpha = 0.4;

        context.beginPath();
        context.rect(this.x + ox, this.y + oy, this.width, this.height);
        context.fillStyle = "#32CD32";
        context.fill();

        context.globalAlpha = 1;
    }

    resolveCollision(player) {
        return player.resolveRespawnAreaCollision(this);
    }

    onCollision() {
        console.log("リスポーン更新");
    }
}
