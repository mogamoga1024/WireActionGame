
class Player {
    #vx = 0;
    #vxMax = 3;
    #vy = 0;
    #vyMax = 10;
    #hook = null;
    #direction = "right";
    get direction() { return this.#direction; }
    #actStatus = "ground";
    get actStatus() { return this.#actStatus; }
    #maxRadian = 0;
    #furikoLength = 0;
    #angularFrequency = 0;
    #furikoParam = 0;

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

    #centerX(x) { return x + this.#width / 2; }
    #centerY(y) { return y + this.#height / 2; }

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

    applyForce(direction) {
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
        // 慣性 & 摩擦による減速
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
    }

    move(staticObjList) {
        if (this.#hook?.actStatus === "stuck" && this.#actStatus !== "furiko") {
            this.#furikoStart();
        }

        if (this.#actStatus === "furiko") {
            this.#furikoParam += dt * 10;
            const radian = this.#maxRadian * Math.cos(this.#angularFrequency * this.#furikoParam);
            this.#prevX = this.#x;
            this.#prevY = this.#y;
            this.#x = this.#hook.centerX + this.#furikoLength * Math.sin(radian) - this.#width / 2;
            this.#y = this.#hook.centerY + this.#furikoLength * Math.cos(radian) - this.#height / 2;
            return; // todo 仮 後で外す
        }

        if (this.#actStatus !== "ground") {
            this.#vy += dt * gravity;
            if (this.#canExtendWire(this.centerX, this.#centerY(this.#y + this.#vy))) {
                this.#prevY = this.#y;
                this.#y += this.#vy;
            }
            else {
                this.#vy = 0;
            }
        }

        if (this.#canExtendWire(this.#centerX(this.#x + this.#vx), this.centerY)) {
            this.#prevX = this.#x;
            this.#x += this.#vx;
        }
        else {
            this.#vx = 0;
        }

        this.#resolveCollisionList(staticObjList);
        this.#hookMove(staticObjList);
    }

    jumpStart() {
        if (this.#actStatus !== "ground") {
            return;
        }
        this.#actStatus = "jumping";
        this.#vy = -this.#vyMax;
    }
    fallStart() {
        if (this.#actStatus !== "ground") {
            return;
        }
        this.#actStatus = "falling";
        this.#vy = 0;
    }
    #fallEnd() {
        this.#vy = 0;
        this.#actStatus = "ground";
    }

    #furikoStart() {
        // todo
        this.#actStatus = "furiko";
        // const vecX = this.#hook.centerX - this.centerX;
        // const vecY = this.#hook.centerY - this.centerY;
        const vecX = this.centerX - this.#hook.centerX;
        const vecY = this.centerY - this.#hook.centerY;
        this.#maxRadian = Math.PI / 2 - Math.atan2(vecY, vecX);
        this.#furikoLength = Math.sqrt(vecX * vecX, vecY * vecY);
        this.#angularFrequency = Math.sqrt(gravity / this.#furikoLength);
        this.#furikoParam = 0;
    }

    fireHook(radian) {
        if (this.#hook !== null) {
            if (this.#hook.actStatus === "stuck") {
                this.#hook.return();
            }
            return;
        }
        this.#hook = new Hook(this, radian);
    }
    #hookMove(staticObjList) {
        if (this.#hook === null) {
            return;
        }
        if (this.#hook.move()) {
            this.#hook = null;
            return;
        }
        this.#hook.resolveCollision(staticObjList);
    }

    // フックが引っかかっているときにプレイヤーが動けるかどうかの判定
    // todo 伸ばせるようにしたいが、とりあえず固定しとく
    #canExtendWire(playerCenterX, playerCenterY) {
        if (this.#hook === null) {
            return true;
        }
        return this.#hook.canExtendWire(playerCenterX, playerCenterY);
    }

    #resolveCollisionList(staticObjList) {
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
            this.#resolveCollisionList(staticObjList);
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
            this.#actStatus !== "ground" &&
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
            this.#actStatus !== "ground" &&
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
            this.#actStatus !== "ground" &&
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
            this.#actStatus !== "ground" &&
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
