
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

    jump() {
        // todo

        this.#actStatus = "jump";

        this.y -= this.#vy;
    }
}
