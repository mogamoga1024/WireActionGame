
class Hook {
    #baseX = 0; #baseY = 0;
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
    #maxWireLength = 200;
    
    constructor(player, radian) {
        this.#baseX = this.#x = player.x + player.width / 2 - this.width / 2;
        this.#baseY = this.#y = player.y + player.height / 2 - this.height / 2;
        this.#vx = 10 * Math.cos(radian);
        this.#vy = -1 * 10 * Math.sin(radian);
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "black";
        context.fill();
    }

    // 戻り値：フックを消去するべきか
    move() {
        this.#x += this.#vx;
        this.#y += this.#vy;
        const diffX = this.x - this.#baseX;
        const diffY = this.y - this.#baseY;
        if (Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) >= this.#maxWireLength) {
            return true;
        }
        return false;
    }

    resolveCollision(staticObjList) {
        for (const staticObj of staticObjList) {
            if (this.#resolveCollision(staticObj)) {
                return;
            }
        }
    }

    #resolveCollision(staticObj) {
        // todo
    }
}
