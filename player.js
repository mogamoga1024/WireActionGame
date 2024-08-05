
class Player {
    #width = 40;
    #height = 40;
    #vx = 0;
    #vxMax = 10;
    #vy = 0;
    #vyMax = 10;

    #actStatus = "normal";
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

    move(direction) {
        if (direction === "left") {
            this.#vx -= 0.5;
            if (this.#vx < -this.#vxMax) {
                this.#vx = -this.#vxMax;
            }
        }
        else if (direction === "right") {
            this.#vx += 0.5;
            if (this.#vx > this.#vxMax) {
                this.#vx = this.#vxMax;
            }
        }
        else if (direction === "none") {
            if (this.#vx > 0) {
                this.#vx -= 0.2;
                if (this.#vx < 0) {
                    this.#vx = 0;
                }
            }
            else if (this.#vx < 0) {
                this.#vx += 0.2;
                if (this.#vx > 0) {
                    this.#vx = 0;
                }
            }
        }
        this.x += this.#vx;
    }

    #fallFrame = 0;
    jump() {
        this.#actStatus = "jumping";
        this.#fallFrame++;
        this.#vy = this.#fallFrame * dt * g - this.#vyMax;
        this.y += this.#vy;
    }
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

    checkCollisionList(staticObjList) {
        let isFall = this.#actStatus === "normal";
        for (const staticObj of staticObjList) {
            if (!this.#checkCollision(staticObj)) {
                isFall = false;
            }
        }
        if (isFall) {
            this.fall();
            this.checkCollisionList(staticObjList);
        }
    }

    // 戻り値：落下するかどうか
    #checkCollision(staticObj) {
        // if (
        //     this.x + this.#r <= staticObj.x ||
        //     this.x - this.#r >= staticObj.x + staticObj.width ||
        //     this.y + this.#r <= staticObj.y ||
        //     this.y - this.#r >= staticObj.y + staticObj.height
        // ) {
        //     return;
        // }

        // todo 接させる

        // 地面で左の壁に衝突
        if (
            this.#actStatus === "normal" &&
            this.#vx < 0 &&
            this.y + this.#height > staticObj.y &&
            this.y < staticObj.y + staticObj.height &&
            this.x <= staticObj.x + staticObj.width &&
            this.x + this.#width > staticObj.x + staticObj.width
        ) {
            this.x = staticObj.x + staticObj.width;
            return false;
        }
        // 落下中に床に衝突
        if (
            (this.#actStatus === "jumping" || this.#actStatus === "falling") &&
            this.#vy > 0 &&
            this.x + this.#width > staticObj.x &&
            this.x < staticObj.x + staticObj.width &&
            this.y + this.#height >= staticObj.y &&
            this.y < staticObj.y
        ) {
            this.y = staticObj.y - this.#height;
            this.#fallEnd();
            return false;
        }
        // 床に接しているか？
        if (
            this.#vy === 0 &&
            this.x + this.#width >= staticObj.x &&
            this.x <= staticObj.x + staticObj.width &&
            this.y + this.#height === staticObj.y
        ) {
            return false;
        }
        else {
            return true;
        }
    }
}
