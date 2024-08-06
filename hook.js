
class Hook {
    #baseX = 0; #baseY = 0;
    #relativeX = 0; #relativeY = 0;
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
    get baseCenterX() { return this.#baseX + this.#width / 2; }
    get baseCenterY() { return this.#baseY + this.#height / 2; }

    #player = null;
    #v = 10;
    #vx = 0;
    #vy = 0;
    #maxWireLength = 200;
    #isShrinking = false;
    
    constructor(player, radian) {
        this.#player = player;
        this.#x = player.x + player.width / 2 - this.width / 2;
        this.#y = player.y + player.height / 2 - this.height / 2;
        this.#baseX = this.#x
        this.#baseY = this.#y
        this.#vx = this.#v * Math.cos(radian);
        this.#vy = -1 * this.#v * Math.sin(radian);
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "black";
        context.fill();
    }

    // 戻り値：フックを消去するべきか
    move() {
        if (this.#isShrinking) {
            const vecX = this.centerX - this.#player.centerX;
            const vecY = this.centerY - this.#player.centerY;
            const radian = Math.atan2(vecY, vecX);
            this.#vx = -1 * this.#v * 1.5 * Math.cos(radian);
            this.#vy = -1 * this.#v * 1.5 * Math.sin(radian);
        }
        this.#x += this.#vx;
        this.#y += this.#vy;
        if (!this.#isShrinking) {
            // const diffX = this.centerX - this.baseCenterX;
            // const diffY = this.centerY - this.baseCenterY;
            const diffX = this.centerX - this.#player.centerX;
            const diffY = this.centerY - this.#player.centerY;
            if (Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) >= this.#maxWireLength) {
                this.#isShrinking = true;
            }
        }
        else {
            const diffX = this.centerX - this.#player.centerX;
            const diffY = this.centerY - this.#player.centerY;
            if (Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) <= this.#v * 1.1) {
                return true;
            }
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
