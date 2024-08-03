
class Player {
    #r = 20;
    #vx = 0;
    #vxMax = 10;
    #vy = 0;
    #vyMax = 10;

    #actStatus = "normal"; // 仮
    get actStatus() {
        return this.#actStatus;
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.#r, 0, Math.PI * 2);
        context.fillStyle = "blue";
        context.fill();
    }

    standStill() {
        this.#vx = 0;
    }

    run(direction) {
        this.#vx = this.#vxMax;
        if (direction === "left") {
            this.x -= this.#vx;
        }
        else if (direction === "right") {
            this.x += this.#vx;
        }
    }

    #jumpFrame = 0;
    jump() {
        // todo

        this.#actStatus = "jump";

        this.#jumpFrame++;

        this.#vy = this.#vyMax - this.#jumpFrame * dt * g;
        this.y -= this.#vy;
    }

    jumpEnd() {
        this.#vy = 0;
        this.#jumpFrame = 0;
    }

    resolveCollision(staticObj) {
        if (
            this.x + this.#r <= staticObj.x ||
            this.x - this.#r >= staticObj.x + staticObj.width ||
            this.y + this.#r <= staticObj.y ||
            this.y - this.#r >= staticObj.y + staticObj.height
        ) {
            return;
        }

        // todo 接させる

        // 落下中
        if (this.#vy > 0) {
            
        }

        this.#actStatus = "normal";
    }
}
