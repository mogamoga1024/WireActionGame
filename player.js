
class Player {
    #vx = 0;
    #vxMax = 7;
    #vy = 0;
    #vyMax = 10;
    #hook = null;
    #direction = "right";
    get direction() { return this.#direction; }
    #actStatus = "ground";
    get actStatus() { return this.#actStatus; }

    #x = 0; #prevX = 0;
    get x() { return this.#x; }
    #y = 0; #prevY = 0;
    get y() { return this.#y; }
    #width = 40;
    get width() { return this.#width }
    #height = 40;
    get height() { return this.#height }
    get centerX() { return this.#x + this.#width / 2; }
    get centerY() { return this.#y + this.#height / 2; }

    constructor(x, y) {
        this.#prevX = this.#x = x;
        this.#prevY = this.#y = y;
    }

    draw(context) {
        if (this.#hook !== null) {
            context.beginPath();
            context.moveTo(this.centerX, this.centerY);
            context.lineTo(this.#hook.centerX, this.#hook.centerY);
            context.stroke();
            this.#hook.draw(context);
        }

        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "blue";
        context.fill();
    }

    move(direction) {
        if (direction === "left") {
            this.#direction = direction;
            this.#vx -= 0.3;
            if (this.#vx < -this.#vxMax) {
                this.#vx = -this.#vxMax;
            }
        }
        else if (direction === "right") {
            this.#direction = direction;
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

    jumpStart() {
        this.#actStatus = "jumping";
        this.#vy = -this.#vyMax;
        this.jump();
    }
    jump() {
        this.#vy += dt * g;
        this.#prevY = this.#y;
        this.#y += this.#vy;
    }
    fallStart() {
        this.#actStatus = "falling";
        this.#vy = 0;
        this.fall();
    }
    fall() {
        this.#actStatus = "falling";
        this.#vy += dt * g;
        this.#prevY = this.#y;
        this.#y += this.#vy;
    }
    #fallEnd() {
        this.#vy = 0;
        this.#actStatus = "ground";
    }

    fireHook(radian) {
        if (this.#hook !== null) {
            return;
        }
        this.#hook = new Hook(this, radian);
    }
    hookMove(staticObjList) {
        if (this.#hook === null) {
            return;
        }
        if (this.#hook.move()) {
            this.#hook = null;
            return;
        }
        this.#hook.resolveCollision(staticObjList);
    }

    resolveCollision(staticObjList) {
        if (this.#hook !== null) {
            this.#hook.resolveCollision(staticObjList);
        }

        let isFall = this.#actStatus === "ground";
        for (const staticObj of staticObjList) {
            if (this.#resolveCollision(staticObj) !== "falling") {
                isFall = false;
            }
        }
        if (isFall) {
            this.fallStart();
            this.resolveCollision(staticObjList);
        }
    }

    // 戻り値：次のactStatus
    #resolveCollision(staticObj) {
        // 地面で左の壁に衝突
        if (
            this.#actStatus === "ground" &&
            this.#vx < 0 &&
            this.y + this.height > staticObj.y &&
            this.y < staticObj.y + staticObj.height &&
            this.x <= staticObj.x + staticObj.width &&
            this.x + this.width > staticObj.x + staticObj.width
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
            this.y + this.height > staticObj.y &&
            this.y < staticObj.y + staticObj.height &&
            this.x + this.width >= staticObj.x &&
            this.x < staticObj.x
        ) {
            this.#x = staticObj.x - this.width;
            this.#prevX = this.x;
            this.#vx = 0;
            return this.#actStatus;
        }

        // ジャンプ中に天井に衝突
        if (
            this.#actStatus === "jumping" &&
            this.#vy < 0 &&
            !(this.#prevX + this.width <= staticObj.x || this.#prevX >= staticObj.x + staticObj.width) &&
            this.x + this.width > staticObj.x &&
            this.x < staticObj.x + staticObj.width &&
            this.y <= staticObj.y + staticObj.height &&
            this.y + this.height > staticObj.y + staticObj.height
        ) {
            this.#y = staticObj.y + staticObj.height;
            this.#prevY = this.y;
            this.#vy *= -0.8;
            return this.#actStatus;
        }

        // 落下中に床に衝突
        if (
            (this.#actStatus === "jumping" || this.#actStatus === "falling") &&
            this.#vy > 0 &&
            !(this.#prevX + this.width <= staticObj.x || this.#prevX >= staticObj.x + staticObj.width) &&
            this.x + this.width > staticObj.x &&
            this.x < staticObj.x + staticObj.width &&
            this.y + this.height >= staticObj.y &&
            this.y < staticObj.y
        ) {
            this.#y = staticObj.y - this.height;
            this.#prevY = this.y;
            this.#fallEnd();
            return this.#actStatus;
        }

        // 空中で左の壁に衝突
        if (
            (this.#actStatus === "jumping" || this.#actStatus === "falling") &&
            this.#vx < 0 &&
            this.#prevY + this.height > staticObj.y &&
            this.y + this.height > staticObj.y &&
            this.y < staticObj.y + staticObj.height &&
            this.x <= staticObj.x + staticObj.width &&
            this.x + this.width > staticObj.x + staticObj.width
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
            this.#prevY + this.height > staticObj.y &&
            this.y + this.height > staticObj.y &&
            this.y < staticObj.y + staticObj.height &&
            this.x + this.width >= staticObj.x &&
            this.x < staticObj.x
        ) {
            this.#x = staticObj.x - this.width;
            this.#prevX = this.x;
            this.#vx *= -0.8;
            return this.#actStatus;
        }

        // 床に接しているか？
        if (
            this.#vy === 0 &&
            this.x + this.width >= staticObj.x &&
            this.x <= staticObj.x + staticObj.width &&
            this.y + this.height === staticObj.y
        ) {
            return this.#actStatus;
        }
        else {
            return "falling";
        }
    }
}
