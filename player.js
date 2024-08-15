
class Player {
    #vx = 0;
    #vxMax = 3;
    #vy = 0;
    #vyMax = 10;
    #hook = null;
    #direction = "right";
    get direction() { return this.#direction; }
    #prevActStatus = "ground";
    #actStatus = "ground";
    #maxRadian = 0;
    #furikoLength = 0;
    #angularFrequency = 0;
    #furikoParam = 0;
    #furikoForceMode = "none"; // none, accelerate, decelerate

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

    draw(context, viewport) {
        const ox =  viewport.offsetX;
        const oy =  viewport.offsetY;

        if (this.#hook !== null) {
            context.beginPath();
            context.moveTo(this.centerX + ox, this.centerY + oy);
            context.lineTo(this.#hook.centerX + ox, this.#hook.centerY + oy);
            context.stroke();
            this.#hook.draw(context, viewport);
        }

        context.beginPath();
        context.rect(this.x + ox, this.y + oy, this.width, this.height);
        context.fillStyle = "blue";
        context.fill();

        context.beginPath();
        if (this.direction === "left") {
            context.rect(this.x + ox, this.y + 10 + oy, 10, 10);
        }
        else if (this.direction === "right") {
            context.rect(this.x + this.width - 10 + ox, this.y + 10 + oy, 10, 10);
        }
        context.fillStyle = "yellow";
        context.fill();
    }

    applyForce(direction) {
        if (direction !== "none") {
            this.#direction = direction;
        }

        if (this.#actStatus === "furiko") {
            if (
                direction === "left" && this.#vx <= 0 ||
                direction === "right" && this.#vx >= 0
            ) {
                this.#furikoForceMode = "accelerate";
            }
            else if (
                direction === "left" && this.#vx > 0 ||
                direction === "right" && this.#vx < 0
            ) {
                this.#furikoForceMode = "decelerate";
            }
            return;
        }

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
        if (
            this.#vy >= 0 &&
            this.#hook?.canFuriko() &&
            (this.#actStatus === "jumping" || this.#actStatus === "falling")
        ) {
            this.#furikoStart();
        }

        if (this.#actStatus === "furiko") {
            this.#furikoParam += dt * 10;
            const radian = this.#maxRadian * Math.cos(this.#angularFrequency * this.#furikoParam);
            this.#prevX = this.#x;
            this.#prevY = this.#y;
            this.#x = this.#hook.centerX + this.#furikoLength * Math.sin(radian) - this.#width / 2;
            this.#y = this.#hook.centerY + this.#furikoLength * Math.cos(radian) - this.#height / 2;
            const prevVx = this.#vx;
            const prevVy = this.#vy;
            this.#vx = this.#x - this.#prevX;
            this.#vy = this.#y - this.#prevY;

            if (
                this.#furikoParam > dt * 10 &&
                Math.sign(prevVx) * Math.sign(this.#vx) === 1 &&
                Math.sign(prevVy) * Math.sign(this.#vy) === -1
            ) {
                if (this.#furikoForceMode === "accelerate") {
                    this.#furikoForceMode = "none";
                    this.#maxRadian *= 1.1;
                }
                else if (this.#furikoForceMode === "decelerate") {
                    this.#furikoForceMode = "none";
                    this.#maxRadian *= 0.8;
                }
                else {
                    this.#maxRadian *= 0.9;
                    if (Math.abs(this.#maxRadian) < 0.04) {
                        this.#maxRadian = 0;
                    }
                }
            }
            else if (this.#maxRadian === 0 && this.#furikoForceMode === "accelerate") {
                if (this.#direction === "left") {
                    this.#furikoParam = (Math.PI / 2) / this.#angularFrequency;
                    this.#maxRadian = Math.PI / 8;
                }
                else if (this.#direction === "right") {
                    this.#furikoParam = (Math.PI / 2) / this.#angularFrequency;
                    this.#maxRadian = -Math.PI / 8;
                }
            }
        }
        else {
            if (this.#actStatus !== "ground") {
                if (this.#canExtendWire(this.centerX, this.#centerY(this.#y + this.#vy))) {
                    this.#vy += dt * gravity;
                    this.#prevY = this.#y;
                    this.#y += this.#vy;
                }
                else {
                    this.#prevY = this.#y;
                    this.#y += this.#vy;
                    do {
                        this.#y += this.#vy > 0 ? -0.01 : 0.01;
                    }
                    while (!this.#canExtendWire(this.centerX, this.centerY));
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
        }

        this.#resolveCollisionList(staticObjList);
        this.#hookMove(staticObjList);
    }

    jumpStart() {
        if (this.#actStatus === "jumping" || this.#actStatus === "falling") {
            return;
        }

        this.#prevActStatus = this.#actStatus;
        this.#actStatus = "jumping";

        if (this.#actStatus === "furiko") {
            this.#vy += -this.#vyMax;
        }
        else {
            this.#vy = -this.#vyMax;
        }
        
        this.#hook?.return();
    }
    #fallStart() {
        if (this.#actStatus !== "ground") {
            return;
        }
        this.#prevActStatus = this.#actStatus;
        this.#actStatus = "falling";
        this.#vy = 0;
    }
    #fallEnd() {
        this.#vy = 0;
        this.#prevActStatus = this.#actStatus;
        this.#actStatus = "ground";
    }

    #furikoStart(force = false) {
        if (
            !force &&
            (this.#actStatus === "ground" || this.#actStatus === "furiko")
        ) {
            return;
        }
        const vecX = this.centerX - this.#hook.centerX;
        const vecY = this.centerY - this.#hook.centerY;
        const radian = Math.PI / 2 - Math.atan2(vecY, vecX);
        this.#furikoLength = Math.sqrt(vecX * vecX + vecY * vecY);
        this.#angularFrequency = Math.sqrt(gravity / this.#furikoLength);
        this.#furikoForceMode = "none";
        if (
            !force &&
            this.#prevActStatus !== "ground" &&
            Math.abs(radian) < Math.abs(this.#maxRadian)
        ) {
            if (this.#vx <= 0) {
                this.#maxRadian = Math.abs(this.#maxRadian);
            }
            else {
                this.#maxRadian = -1 * Math.abs(this.#maxRadian);
            }
            // const radian = this.#maxRadian * Math.cos(this.#angularFrequency * this.#furikoParam);
            // Math.cos(this.#angularFrequency * this.#furikoParam) = radian / this.#maxRadian
            // this.#angularFrequency * this.#furikoParam = Math.acos(radian / this.#maxRadian)
            // this.#furikoParam = Math.acos(radian / this.#maxRadian) / this.#angularFrequency
            this.#furikoParam = Math.acos(radian / this.#maxRadian) / this.#angularFrequency;
        }
        else {
            this.#maxRadian = radian;
            this.#furikoParam = 0;
        }
        this.#prevActStatus = this.#actStatus;
        this.#actStatus = "furiko";
    }

    fireHook(radian) {
        if (this.#hook !== null) {
            if (this.#hook.actStatus === "stuck") {
                this.#prevActStatus = this.#actStatus;
                this.#actStatus = "falling";
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
        if (this.#hook.move(staticObjList)) {
            this.#hook = null;
            return;
        }
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
        let isFall = this.#actStatus === "ground";
        for (const staticObj of staticObjList) {
            if (this.#resolveCollision(staticObj) !== "falling") {
                isFall = false;
            }
        }
        if (isFall) {
            this.#fallStart();
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

        // 振り子中に左の壁に衝突
        if (
            this.#actStatus === "furiko" &&
            this.#vx < 0 &&
            this.y + this.height > staticObj.y &&
            this.y < staticObj.y + staticObj.height &&
            this.x <= staticObj.x + staticObj.width &&
            this.x + this.width > staticObj.x + staticObj.width
        ) {
            // TODO 振り子 接触点の厳密な計算
            if (this.#centerX(this.#prevX) > this.#hook.centerX) {
                this.#x = staticObj.x + staticObj.width;
                this.#y = this.#prevY;
                this.#prevX = this.x;
                this.#furikoStart(true);
            }
            else {
                this.#x = this.#prevX;
                this.#y = this.#prevY;
                this.#furikoStart(true);
            }
            return this.#actStatus;
        }
        // 振り子中に右の壁に衝突
        if (
            this.#actStatus === "furiko" &&
            this.#vx > 0 &&
            this.#prevY + this.height > staticObj.y &&
            this.y + this.height > staticObj.y &&
            this.y < staticObj.y + staticObj.height &&
            this.x + this.width >= staticObj.x &&
            this.x < staticObj.x
        ) {
            // TODO 振り子 接触点の厳密な計算
            if (this.#centerX(this.#prevX) > this.#hook.centerX) {
                this.#x = staticObj.x - this.width;
                this.#y = this.#prevY;
                this.#prevX = this.x;
                this.#furikoStart(true);
            }
            else {
                this.#x = this.#prevX;
                this.#y = this.#prevY;
                this.#furikoStart(true);
            }
            return this.#actStatus;
        }
        // 振り子中に天井に衝突
        if (
            this.#actStatus === "furiko" &&
            this.#vy < 0 &&
            !(this.#prevX + this.width <= staticObj.x || this.#prevX >= staticObj.x + staticObj.width) &&
            this.x + this.width > staticObj.x &&
            this.x < staticObj.x + staticObj.width &&
            this.y <= staticObj.y + staticObj.height &&
            this.y + this.height > staticObj.y + staticObj.height
        ) {
            // TODO 振り子 接触点の厳密な計算
            this.#x = this.#prevX;
            this.#y = this.#prevY;
            this.#furikoStart(true);
            return this.#actStatus;
        }
        // 振り子中に地面に衝突
        if (
            this.#actStatus === "furiko" &&
            this.#vy > 0 &&
            !(this.#prevX + this.width <= staticObj.x || this.#prevX >= staticObj.x + staticObj.width) &&
            this.x + this.width > staticObj.x &&
            this.x < staticObj.x + staticObj.width &&
            this.y + this.height >= staticObj.y &&
            this.y < staticObj.y
        ) {
            // TODO 振り子 接触点の厳密な計算
            this.#y = staticObj.y - this.height;
            this.#prevY = this.y;

            this.#prevX = this.x;
            while (!this.#canExtendWire(this.centerX, this.centerY)) {
                this.#x += this.#vx > 0 ? 0.01 : -0.01;
            }

            this.#vx = this.#vy = 0;
            this.#prevActStatus = this.#actStatus;
            this.#actStatus = "ground";
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
            this.#vy = 0;
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
