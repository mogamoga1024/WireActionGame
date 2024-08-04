
class Player {
    #width = 40;
    #height = 40;
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
        context.rect(this.x, this.y, this.#width, this.#height);
        context.fillStyle = "blue";
        context.fill();
    }

    // standStill() {
    //     this.#vx = 0;
    // }

    move(direction) {
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
        this.#actStatus = "jumping";
        this.#jumpFrame++;
        this.#vy = this.#jumpFrame * dt * g - this.#vyMax;
        this.y += this.#vy;
    }

    #jumpEnd() {
        this.#vy = 0;
        this.#jumpFrame = 0;
        this.#actStatus = "normal";
    }

    #fallFrame = 0;
    fall() {
        this.#actStatus = "falling";
        this.#fallFrame++;
        this.#vy = this.#fallFrame * dt * g;
        this.y += this.#vy;
    }

    #fallEnd() {
        this.#vy = 0;
        this.#fallFrame = 0;
        this.#actStatus = "normal";
    }

    resolveCollision(staticObj) {
        // if (
        //     this.x + this.#r <= staticObj.x ||
        //     this.x - this.#r >= staticObj.x + staticObj.width ||
        //     this.y + this.#r <= staticObj.y ||
        //     this.y - this.#r >= staticObj.y + staticObj.height
        // ) {
        //     return;
        // }

        // todo 接させる

        // 落下中に床に衝突
        if (
            this.#vy > 0 &&
            this.x + this.#width >= staticObj.x &&
            this.x <= staticObj.x + staticObj.width &&
            this.y + this.#height >= staticObj.y
        ) {
            this.y = staticObj.y - this.#height;
            this.#jumpEnd();
        }
        else {
            return;
        }
    }
}
