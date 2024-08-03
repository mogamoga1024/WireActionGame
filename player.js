
class Player {
    #r = 20;
    #vx = 10;
    #vy = 10;

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

    run(direction) {
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

        this.y -= this.#vy - this.#jumpFrame * dt * g;
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

        this.#actStatus = "normal";
    }
}
