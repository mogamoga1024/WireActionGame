
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

    #x = 0; #prevX = 0;
    get x() {
        return this.#x;
    }
    #y = 0; #prevY = 0;
    get y() {
        return this.#y;
    }

    constructor(x, y) {
        this.#prevX = this.#x = x;
        this.#prevY = this.#y = y;
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
        this.#prevX = this.#x;
        this.#x += this.#vx;
    }

    #fallFrame = 0;
    jump() {
        this.#actStatus = "jumping";
        this.#fallFrame++;
        this.#vy = this.#fallFrame * dt * g - this.#vyMax;
        this.#prevY = this.#y;
        this.#y += this.#vy;
    }
    fall() {
        this.#actStatus = "falling";
        this.#fallFrame++;
        this.#vy = this.#fallFrame * dt * g;
        this.#prevY = this.#y;
        this.#y += this.#vy;
    }
    #fallEnd() {
        this.#vy = 0;
        this.#fallFrame = 0;
        this.#actStatus = "normal";
    }

    checkCollision(staticObjList) {
        let isFall = this.#actStatus === "normal";
        for (const staticObj of staticObjList) {
            if (!this.#checkCollision(staticObj)) {
                isFall = false;
            }
        }
        if (isFall) {
            this.fall();
            this.checkCollision(staticObjList);
        }
    }

    // 戻り値：落下するかどうか
    #checkCollision(staticObj) {
        // 地面で左の壁に衝突
        if (
            this.#actStatus === "normal" &&
            this.#vx < 0 &&
            this.#prevY + this.#height > staticObj.y &&
            this.y + this.#height > staticObj.y &&
            this.y < staticObj.y + staticObj.height &&
            this.x <= staticObj.x + staticObj.width &&
            this.x + this.#width > staticObj.x + staticObj.width
        ) {
            this.#x = staticObj.x + staticObj.width;
            this.#prevX = this.x;
            this.#vx = 0;
            return false;
        }
        // 地面で右の壁に衝突
        if (
            this.#actStatus === "normal" &&
            this.#vx > 0 &&
            this.#prevY + this.#height > staticObj.y &&
            this.y + this.#height > staticObj.y &&
            this.y < staticObj.y + staticObj.height &&
            this.x + this.#width >= staticObj.x &&
            this.x < staticObj.x
        ) {
            this.#x = staticObj.x - this.#width;
            this.#prevX = this.x;
            this.#vx = 0;
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
            this.#y = staticObj.y - this.#height;
            this.#prevY = this.y;
            this.#fallEnd();
            return false;
        }

        // 空中で左の壁に衝突
        if (
            (this.#actStatus === "jumping" || this.#actStatus === "falling") &&
            this.#vx < 0 &&
            this.y + this.#height > staticObj.y &&
            this.y < staticObj.y + staticObj.height &&
            this.x <= staticObj.x + staticObj.width &&
            this.x + this.#width > staticObj.x + staticObj.width
        ) {
            this.#x = staticObj.x + staticObj.width;
            this.#prevX = this.x;
            this.#vx *= -0.8;
            return true;
        }
        // 空中で右の壁に衝突
        if (
            (this.#actStatus === "jumping" || this.#actStatus === "falling") &&
            this.#vx > 0 &&
            this.y + this.#height > staticObj.y &&
            this.y < staticObj.y + staticObj.height &&
            this.x + this.#width >= staticObj.x &&
            this.x < staticObj.x
        ) {
            this.#x = staticObj.x - this.#width;
            this.#prevX = this.x;
            this.#vx *= -0.8;
            return true;
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
