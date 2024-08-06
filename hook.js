
class Hook {
    #relativeX = 0; #relativeY = 0;
    #x = 0;
    get x() { return this.#x; }
    #y = 0;
    get y() { return this.#y; }
    #width = 14;
    get width() { return this.#width; }
    #height = 14;
    get height() { return this.#height; }
    get centerX() { return this.#x + this.#width / 2; }
    get centerY() { return this.#y + this.#height / 2; }

    #player = null;
    #v = 10;
    #vx = 0;
    #vy = 0;
    #maxWireLength = 200;
    #isShrinking = false;
    #actStatus = "moving";
    get actStatus() { return this.#actStatus; } 
    
    constructor(player, radian) {
        this.#player = player;
        this.#x = player.x + player.width / 2 - this.width / 2;
        this.#y = player.y + player.height / 2 - this.height / 2;
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
        if (this.#actStatus === "stuck") {
            return false;
        }
        if (this.#isShrinking) {
            const vecX = this.centerX - this.#player.centerX;
            const vecY = this.centerY - this.#player.centerY;
            const radian = Math.atan2(vecY, vecX);
            this.#vx = -1 * this.#v * 1.5 * Math.cos(radian);
            this.#vy = -1 * this.#v * 1.5 * Math.sin(radian);
        }
        this.#relativeX += this.#vx;
        this.#relativeY += this.#vy;
        this.#x = this.#player.centerX + this.#relativeX - this.#width / 2;
        this.#y = this.#player.centerY + this.#relativeY - this.#height / 2;
        const diffX = this.centerX - this.#player.centerX;
        const diffY = this.centerY - this.#player.centerY;
        const wireLength = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
        if (!this.#isShrinking) {
            if (wireLength >= this.#maxWireLength) {
                this.#isShrinking = true;
            }
        }
        else {
            if (wireLength <= this.#v * 1.1) {
                return true;
            }
        }
        return false;
    }

    return() {
        this.#actStatus = "moving";
        this.#isShrinking = true;
    }

    resolveCollision(staticObjList) {
        if (this.#isShrinking || this.#actStatus === "stuck") {
            return;
        }
        for (const staticObj of staticObjList) {
            if (this.#resolveCollision(staticObj) === "stuck") {
                this.#actStatus = "stuck";
                return;
            }
        }
    }

    #resolveCollision(staticObj) {
        if (
            this.x + this.width <= staticObj.x ||
            this.x >= staticObj.x + staticObj.width ||
            this.y + this.height <= staticObj.y ||
            this.y >= staticObj.y + staticObj.height
        ) {
            return "moving";
        }
        else {
            return "stuck";
        }
    }
}
