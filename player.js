
class Player {
    #canOperate = true;
    get canOperate() {
        return this.#canOperate;
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 20;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        context.fillStyle = "blue";
        context.fill();
    }

    run(direction) {
        if (direction === "left") {
            this.x -= 10;
        }
        else if (direction === "right") {
            this.x += 10;
        }
    }

    jump() {
        // todo
    }
}
