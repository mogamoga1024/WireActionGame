
class Player {
    #width = 40;
    #height = 40;
    #vx = 0;
    #vxMax = 7;
    #vy = 0;
    #vyMax = 10;

    #actStatus = "ground";
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
            this.#vx -= 0.3;
            if (this.#vx < -this.#vxMax) {
                this.#vx = -this.#vxMax;
            }
        }
        else if (direction === "right") {
            this.#vx += 0.3;
            if (this.#vx > this.#vxMax) {
                this.#vx = this.#vxMax;
            }
        }
        else if (direction === "none" && this.#actStatus === "ground") {
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
        this.#actStatus = "ground";
    }

    checkCollision(staticObjList) {
        let isFall = this.#actStatus === "ground";
        for (const staticObj of staticObjList) {
            if (this.#checkCollision(staticObj) !== "falling") {
                isFall = false;
            }
        }
        if (isFall) {
            this.fall();
            this.checkCollision(staticObjList);
        }
    }

    // 戻り値：次のactStatus
    #checkCollision(staticObj) {
        // 地面で左の壁に衝突
        if (
            this.#actStatus === "ground" &&
            this.#vx < 0 &&
            this.y + this.#height > staticObj.y &&
            this.y < staticObj.y + staticObj.height &&
            this.x <= staticObj.x + staticObj.width &&
            this.x + this.#width > staticObj.x + staticObj.width
        ) {
            this.#x = staticObj.x + staticObj.width;
            this.#prevX = this.x;
            this.#vx = 0;
            return this.#actStatus;
        }
        // 地面で右の壁に衝突
        if (
            this.#actStatus === "ground" &&
            this.#vx > 0 &&
            this.y + this.#height > staticObj.y &&
            this.y < staticObj.y + staticObj.height &&
            this.x + this.#width >= staticObj.x &&
            this.x < staticObj.x
        ) {
            this.#x = staticObj.x - this.#width;
            this.#prevX = this.x;
            this.#vx = 0;
            return this.#actStatus;
        }

        // ジャンプ中に天井に衝突
        if (
            this.#actStatus === "jumping" &&
            this.#vy < 0 &&
            !(this.#prevX + this.#width <= staticObj.x || this.#prevX >= staticObj.x + staticObj.width) &&
            this.x + this.#width > staticObj.x &&
            this.x < staticObj.x + staticObj.width &&
            this.y <= staticObj.y + staticObj.height &&
            this.y + this.#height > staticObj.y + staticObj.height
        ) {
            this.#y = staticObj.y + staticObj.height;
            this.#prevY = this.y;
            this.#vy *= -1;
            return this.#actStatus;
        }

        // 落下中に床に衝突
        if (
            (this.#actStatus === "jumping" || this.#actStatus === "falling") &&
            this.#vy > 0 &&
            !(this.#prevX + this.#width <= staticObj.x || this.#prevX >= staticObj.x + staticObj.width) &&
            this.x + this.#width > staticObj.x &&
            this.x < staticObj.x + staticObj.width &&
            this.y + this.#height >= staticObj.y &&
            this.y < staticObj.y
        ) {
            this.#y = staticObj.y - this.#height;
            this.#prevY = this.y;
            this.#fallEnd();
            return this.#actStatus;
        }

        // 空中で左の壁に衝突
        if (
            (this.#actStatus === "jumping" || this.#actStatus === "falling") &&
            this.#vx < 0 &&
            this.#prevY + this.#height > staticObj.y &&
            this.y + this.#height > staticObj.y &&
            this.y < staticObj.y + staticObj.height &&
            this.x <= staticObj.x + staticObj.width &&
            this.x + this.#width > staticObj.x + staticObj.width
        ) {
            this.#x = staticObj.x + staticObj.width;
            this.#prevX = this.x;
            this.#vx *= -0.8;
            return this.#actStatus;
        }
        // 空中で右の壁に衝突
        if (
            (this.#actStatus === "jumping" || this.#actStatus === "falling") &&
            this.#vx > 0 &&
            this.#prevY + this.#height > staticObj.y &&
            this.y + this.#height > staticObj.y &&
            this.y < staticObj.y + staticObj.height &&
            this.x + this.#width >= staticObj.x &&
            this.x < staticObj.x
        ) {
            this.#x = staticObj.x - this.#width;
            this.#prevX = this.x;
            this.#vx *= -0.8;
            return this.#actStatus;
        }

        // 床に接しているか？
        if (
            this.#vy === 0 &&
            this.x + this.#width >= staticObj.x &&
            this.x <= staticObj.x + staticObj.width &&
            this.y + this.#height === staticObj.y
        ) {
            return this.#actStatus;
        }
        else {
            return "falling";
        }
    }
}
