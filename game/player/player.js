
class Player {
    #vx = 0;
    #vxMax = 3;
    #vy = 0;
    #vyMax = 10;
    #canBigJump = false;
    #wireJumpVyMax = 12.3;
    #trampolineJumpVyMax = 30;
    #accelerationX = 0.3;
    #decelerationX = 0.2;
    #hook = null;
    #direction = "right";
    get direction() { return this.#direction; }
    #prevActStatus = "ground";
    #actStatus = "ground";
    get actStatus() {
        if (
            this.#actStatus !== "furiko" &&
            this.#hook?.actStatus === "stuck"
        ) {
            return "furiko-" + this.#actStatus;
        }
        else {
            return this.#actStatus;
        }
    }
    #maxRadian = 0;
    #radianEpsilon = 0.02;
    #furikoLength = 0;
    #angularFrequency = 0;
    #furikoParam = 0;
    #furikoForceMode = "none"; // none, accelerate, decelerate
    #canClimbing = true;
    #canDescending = true;
    #wireVerticalState = "none"; // none, climbing, descending
    #shouldJumpOnTrampoline = false;
    #opacity = 1;
    get opacity() { return this.#opacity; }
    #respawnArea = null;
    #isGoal = false;
    get isGoal() { return this.#isGoal; }
    #uekibatiLImage = null;
    #uekibatiRImage = null;

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

    constructor(x, y, respawnArea, isGoal = false) {
        if (respawnArea != null) {
            const x = respawnArea.centerX - this.#width / 2;
            const y = respawnArea.centerY - this.#height / 2;
            this.#prevX = this.#x = x;
            this.#prevY = this.#y = y;
            this.#respawnArea = respawnArea;
            this.#direction = respawnArea.direction;
        }
        else {
            this.#prevX = this.#x = x;
            this.#prevY = this.#y = y;
            this.#respawnArea = new RespawnArea(this.#x, this.#y, this.#width, this.#height);
        }
        this.#isGoal = isGoal;

        this.#uekibatiLImage = new Image();
        this.#uekibatiLImage.src = "assets/植木鉢くんL.png";
        this.#uekibatiRImage = new Image();
        this.#uekibatiRImage.src = "assets/植木鉢くんR.png";
    }

    draw(context, viewport) {
        if (this.#actStatus === "death") {
            this.#opacity = Math.max(this.#opacity - 0.02, 0);
        }

        const ox =  viewport.offsetX;
        const oy =  viewport.offsetY;

        context.globalAlpha = this.#opacity;

        if (this.#hook !== null) {
            context.beginPath();
            context.strokeStyle = "#0ED145";
            context.lineWidth = 3;
            context.moveTo(this.centerX + ox, this.centerY + oy);
            context.lineTo(this.#hook.centerX + ox, this.#hook.centerY + oy);
            context.stroke();
            this.#hook.draw(context, viewport);
        }

        let uekibatiImage = null;
        if (this.#direction === "left") {
            uekibatiImage = this.#uekibatiLImage;
        }
        else {
            uekibatiImage = this.#uekibatiRImage;
        }
        const diffY = (uekibatiImage.naturalHeight - uekibatiImage.naturalWidth) * (this.#width / uekibatiImage.naturalWidth);
        context.drawImage(uekibatiImage, this.#x + ox, this.#y - diffY + oy, this.#width, this.#height + diffY);

        context.globalAlpha = 1;
    }

    // debug用
    ghostMove({horizontal, vertical}) {
        this.#actStatus = "ground";
        this.#vx = 0;
        this.#vy = 0;
        if (horizontal === "left") {
            this.#x -= 10;
        }
        else if (horizontal === "right") {
            this.#x += 10;
        }
        if (vertical === "up") {
            this.#y -= 10;
        }
        else if (vertical === "down") {
            this.#y += 10;
        }
    }

    applyForce({horizontal, vertical}) {
        if (this.#actStatus === "death") {
            return;
        }

        if (!this.#canClimbing && vertical !== "up") {
            this.#canClimbing = true;
        }

        if (horizontal === "left" || horizontal === "right") {
            this.#direction = horizontal;
        }

        if (vertical === "up") {
            if (this.#canClimbing) {
                this.#wireVerticalState = "climbing";
            }
            else {
                this.#wireVerticalState = "none";
            }
            this.#canClimbing = false;
        }
        else if (vertical === "down") {
            if (this.#canDescending) {
                this.#wireVerticalState = "descending";
            }
            else {
                this.#wireVerticalState = "none";
            }
        }
        else {
            this.#wireVerticalState = "none";
        }

        if (this.#actStatus === "furiko") {
            if (
                this.#vy >= 0 &&
                (horizontal === "left" && this.#vx <= 0 || horizontal === "right" && this.#vx >= 0)
            ) {
                this.#furikoForceMode = "accelerate";
            }
            else if (
                this.#vy <= 0 &&
                horizontal === "left" && this.#vx > 0 || horizontal === "right" && this.#vx < 0
            ) {
                this.#furikoForceMode = "decelerate";
            }
            return;
        }

        if (horizontal === "left") {
            this.#vx -= this.#accelerationX;
            if (this.#vx < -this.#vxMax) {
                if (this.#vx + this.#accelerationX >= -this.#vxMax) {
                    this.#vx = -this.#vxMax;
                }
                else {
                    this.#vx += this.#decelerationX;
                }
            }
        }
        else if (horizontal === "right") {
            this.#vx += this.#accelerationX;
            if (this.#vx > this.#vxMax) {
                if (this.#vx - this.#accelerationX <= this.#vxMax) {
                    this.#vx = this.#vxMax;
                }
                else {
                    this.#vx -= this.#decelerationX;
                }
            }
        }
        // 慣性 & 摩擦による減速
        else if (horizontal === "none" && this.#actStatus === "ground") {
            if (this.#vx > 0) {
                this.#vx -= this.#decelerationX;
                if (this.#vx < 0) {
                    this.#vx = 0;
                }
            }
            else if (this.#vx < 0) {
                this.#vx += this.#decelerationX;
                if (this.#vx > 0) {
                    this.#vx = 0;
                }
            }
        }
    }

    move(entityList) {
        if (this.#actStatus === "death") {
            this.#hookMove(entityList);
            return;
        }

        if (this.#actStatus !== "furiko") {
            this.#canBigJump = false;
        }

        if (this.#shouldJumpOnTrampoline) {
            this.jumpStart();
        }
        
        if (
            this.#hook !== null &&
            this.#vy >= 0 &&
            this.centerY >= this.#hook.centerY &&
            this.#hook?.canFuriko() &&
            this.#wireVerticalState !== "descending" &&
            (this.#actStatus === "jumping" || this.#actStatus === "falling")
        ) {
            // 横移動がないなら慣性を殺す
            if (this.#vx === 0) {
                this.#furikoStart(true);
            }
            // 振り子を伸ばせるなら慣性を残す
            else if (this.#canDescending) {
                this.#furikoStart(false);
            }
            // 振り子を伸ばせないなら慣性を殺す
            else {
                this.#furikoStart(true);
            }
        }

        if (this.#hook?.actStatus === "stuck") {
            if (this.#actStatus !== "jumping" && this.#wireVerticalState === "climbing") {
                this.#wireVerticalState = "none";
                this.jumpStart(false);
            }
            else if (this.#actStatus === "furiko" && this.#wireVerticalState === "descending") {
                this.#fallStart(true);
            }
        }
        
        if (this.#actStatus === "furiko") {
            const prevRad = this.#angularFrequency * this.#furikoParam % (Math.PI * 2);
            this.#furikoParam += dt * 10;
            let rad = this.#angularFrequency * this.#furikoParam % (Math.PI * 2);
            if (
                prevRad > Math.PI * 3 / 2 && prevRad < Math.PI * 2 &&
                rad > 0 && rad < Math.PI / 2
            ) {
                rad = 0;
            }
            else if (
                prevRad > Math.PI / 2 && prevRad < Math.PI &&
                rad > Math.PI && rad < Math.PI * 3 / 2
            ) {
                rad = Math.PI;
            }
            const radian = this.#maxRadian * Math.cos(rad);
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
                    const nextMaxRadian = this.#maxRadian * 1.2;
                    if (Math.abs(nextMaxRadian) < Math.PI / 8) {
                        this.#maxRadian = Math.sign(nextMaxRadian) * Math.PI / 8;
                    }
                    else if (Math.abs(nextMaxRadian) <= Math.PI * 3 / 8) {
                        this.#maxRadian = nextMaxRadian;
                    }
                }
                else if (this.#furikoForceMode === "decelerate") {
                    this.#furikoForceMode = "none";
                    this.#maxRadian *= 0.8;
                }
                else {
                    this.#maxRadian *= 0.9;
                    if (Math.abs(this.#maxRadian) < this.#radianEpsilon) {
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
        // 振り子以外
        else {
            if (this.#actStatus !== "ground") {
                this.#vy += dt * gravity;
                this.#prevY = this.#y;
                this.#y += this.#vy;
                if (this.#hook !== null && this.#y !== this.#hook.y) {
                    const tmpCenterY = this.centerY;
                    while (!this.#canExtendWire(this.centerX, this.centerY)) {
                        const prevY = this.#y;
                        this.#y += tmpCenterY > this.#hook.centerY ? -0.01 : 0.01;
                        if (
                            (tmpCenterY > this.#hook.centerY && this.centerY <= this.#hook.centerY) ||
                            (tmpCenterY < this.#hook.centerY && this.centerY >= this.#hook.centerY)
                        ) {
                            this.#y = prevY;
                            break;
                        }
                    }
                }
                if (this.#y !== this.#prevY + this.#vy) {
                    this.#vy = 0;
                    if (this.#wireVerticalState === "descending") {
                        this.#canDescending = false;
                        this.#wireVerticalState = "none";
                    }
                }
            }
            this.#prevX = this.#x;
            this.#x += this.#vx;
            if (this.#hook !== null && this.#x !== this.#hook.x) {
                const tmpCenterX = this.centerX;
                while (!this.#canExtendWire(this.centerX, this.centerY)) {
                    const prevX = this.#x;
                    this.#x += tmpCenterX > this.#hook.centerX ? -0.01 : 0.01;
                    if (
                        (tmpCenterX > this.#hook.centerX && this.centerX <= this.#hook.centerX) ||
                        (tmpCenterX < this.#hook.centerX && this.centerX >= this.#hook.centerX)
                    ) {
                        this.#x = prevX;
                        break;
                    }
                }
            }
            if (this.#x != this.#prevX + this.#vx) {
                this.#vx = 0;
            }
        }

        this.#hookMove(entityList);

        this.#resolveCollisionList(entityList);
    }

    jumpStart(shouldHookReturn = true) {
        if (this.#actStatus === "death") {
            return;
        }
        if (this.#actStatus === "jumping" || this.#actStatus === "falling") {
            return;
        }

        this.#canDescending = true;
        this.#prevActStatus = this.#actStatus;
        this.#actStatus = "jumping";

        if (this.#shouldJumpOnTrampoline) {
            this.#shouldJumpOnTrampoline = false;
            this.#vy = -this.#trampolineJumpVyMax;
        }
        else if (
            this.#canBigJump ||
            (this.#prevActStatus === "ground" && this.#hook?.actStatus === "stuck")
        ) {
            this.#vy = -this.#wireJumpVyMax;
        }
        else {
            this.#vy = -this.#vyMax;
        }
        
        if (shouldHookReturn) {
            this.#hook?.return();
        }
    }
    #fallStart(force = false) {
        if (!force && this.#actStatus !== "ground") {
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

    #furikoStart(shouldStopInertia = false) {
        if (
            !shouldStopInertia &&
            (this.#actStatus === "ground" || this.#actStatus === "furiko")
        ) {
            return;
        }

        const vecX = this.centerX - this.#hook.centerX;
        const vecY = this.centerY - this.#hook.centerY;
        const radianA = Math.atan2(vecY, vecX);
        let radian = Math.PI / 2 - radianA;
        if (radianA <= -1 * Math.PI / 2) {
            radian = -1 * Math.PI / 2 - (Math.PI + radianA);
        }

        if (Math.abs(radian) < this.#radianEpsilon) {
            radian = 0;
        }

        this.#furikoLength = Math.sqrt(Math.pow(vecX, 2) + Math.pow(vecY, 2));
        if (this.#furikoLength > this.#hook.maxWireLength) {
            console.error("ワイヤーが長い");
            console.error(this.#furikoLength);
        }
        this.#angularFrequency = Math.sqrt(gravity / this.#furikoLength);
        this.#furikoForceMode = "none";

        // 慣性を残す
        if (
            !shouldStopInertia &&
            this.#prevActStatus !== "ground" &&
            Math.abs(radian) < Math.abs(this.#maxRadian)
        ) {
            if (this.#vx < 0) {
                this.#maxRadian = Math.abs(this.#maxRadian);
            }
            else if (this.#vx > 0) {
                this.#maxRadian = -1 * Math.abs(this.#maxRadian);
            }
            // const radian = this.#maxRadian * Math.cos(this.#angularFrequency * this.#furikoParam);
            // Math.cos(this.#angularFrequency * this.#furikoParam) = radian / this.#maxRadian
            // this.#angularFrequency * this.#furikoParam = Math.acos(radian / this.#maxRadian)
            // this.#furikoParam = Math.acos(radian / this.#maxRadian) / this.#angularFrequency
            this.#furikoParam = Math.acos(radian / this.#maxRadian) / this.#angularFrequency;
        }
        // 慣性を殺す
        else {
            this.#maxRadian = radian;
            this.#furikoParam = 0;
        }

        if (this.#maxRadian === 0) {
            if (this.#vx !== 0) {
                this.#furikoParam = (Math.PI / 2) / this.#angularFrequency;
                this.#maxRadian = -1 * Math.sign(this.#vx) * Math.PI / 8;
            }
        }
        // else if ( // MEMO 降りたときにこれが発動すると変な感じ というかなんで書いた？
        //     !shouldStopInertia &&
        //     this.#vx !== 0 &&
        //     Math.abs(this.#maxRadian) < Math.PI / 8
        // ) {
        //     this.#maxRadian = -1 * Math.sign(this.#vx) * Math.PI / 8;
        //     this.#furikoParam = Math.acos(radian / this.#maxRadian) / this.#angularFrequency;
        // }

        this.#prevActStatus = this.#actStatus;
        this.#actStatus = "furiko";
    }

    fireHook(radian) {
        if (this.#actStatus === "death") {
            return;
        }
        if (this.#hook !== null) {
            if (this.#hook.actStatus === "stuck") {
                this.#prevActStatus = this.#actStatus;
                if (this.#actStatus !== "ground") {
                    this.#actStatus = "falling";
                }
                this.#canDescending = true;
                this.#hook.return();
            }
            return;
        }
        this.#hook = new Hook(this, radian);
    }
    #hookMove(entityList) {
        if (this.#hook === null) {
            return;
        }
        if (this.#hook.move(entityList)) {
            this.#hook = null;
            return;
        }
    }

    // フックが引っかかっているときにワイヤーを伸ばせるかどうかの判定
    #canExtendWire(playerCenterX, playerCenterY) {
        if (this.#hook === null) {
            return true;
        }
        return this.#hook.canExtendWire(playerCenterX, playerCenterY);
    }

    #resolveCollisionList(entityList) {
        let isFall = this.#actStatus === "ground";
        for (const entity of entityList) {
            const nextActStatus = entity.resolveCollision(this);
            if (nextActStatus === "death") {
                return;
            }
            if (nextActStatus !== "unknown" && nextActStatus !== "falling") {
                isFall = false;
            }
        }
        if (isFall) {
            this.#fallStart();
            this.#resolveCollisionList(entityList);
        }
    }

    setupTrampolineJump() {
        this.#shouldJumpOnTrampoline = true;
    }

    die() {
        this.#actStatus = "death";
    }

    nextPlayer() {
        return new Player(0, 0, this.#respawnArea, this.#isGoal);
    }

    // 戻り値：次のactStatus
    resolveBlockCollision(entity) {
        // 地面で左の壁に衝突
        if (
            this.#actStatus === "ground" &&
            this.#vx < 0 &&
            this.#y + this.#height > entity.y &&
            this.#y < entity.y + entity.height &&
            this.#x <= entity.x + entity.width &&
            this.#x + this.#width > entity.x + entity.width
        ) {
            this.#x = entity.x + entity.width;
            this.#prevX = this.#x;
            this.#vx = 0;
            entity.onCollision(this, "地面で左の壁に衝突");
            return this.#actStatus;
        }
        // 地面で右の壁に衝突
        if (
            this.#actStatus === "ground" &&
            this.#vx > 0 &&
            this.#y + this.#height > entity.y &&
            this.#y < entity.y + entity.height &&
            this.#x + this.#width >= entity.x &&
            this.#x < entity.x
        ) {
            this.#x = entity.x - this.#width;
            this.#prevX = this.#x;
            this.#vx = 0;
            entity.onCollision(this, "地面で右の壁に衝突");
            return this.#actStatus;
        }

        // 振り子中に天井に衝突
        if (
            this.#actStatus === "furiko" &&
            this.#vy < 0 &&
            !(this.#prevX + this.#width <= entity.x || this.#prevX >= entity.x + entity.width) &&
            this.#x + this.#width > entity.x &&
            this.#x < entity.x + entity.width &&
            this.#y <= entity.y + entity.height &&
            this.#y + this.#height > entity.y + entity.height
        ) {
            this.#y = entity.y + entity.height;
            this.#prevY = this.#y;

            if (this.#vx !== 0) {
                const tmpCenterX = this.centerX;
                while (!this.#canExtendWire(this.centerX, this.centerY)) {
                    const prevX = this.#x;
                    this.#x += tmpCenterX > this.#hook.centerX ? -0.01 : 0.01;
                    if (
                        (tmpCenterX > this.#hook.centerX && this.centerX <= this.#hook.centerX) ||
                        (tmpCenterX < this.#hook.centerX && this.centerX >= this.#hook.centerX)
                    ) {
                        this.#x = prevX;
                        break;
                    }
                }
            }

            this.#vx = this.#vy = 0;
            this.#furikoStart(true);
            entity.onCollision(this, "振り子中に天井に衝突");
            return this.#actStatus;
        }
        // 振り子中に地面に衝突
        if (
            this.#actStatus === "furiko" &&
            this.#vy > 0 &&
            !(this.#prevX + this.#width <= entity.x || this.#prevX >= entity.x + entity.width) &&
            this.#x + this.#width > entity.x &&
            this.#x < entity.x + entity.width &&
            this.#y + this.#height >= entity.y &&
            this.#y < entity.y
        ) {
            this.#y = entity.y - this.#height;
            this.#prevY = this.#y;

            this.#prevX = this.#x;
            this.#x = this.#prevX;
            if (this.#vx !== 0) {
                const tmpCenterX = this.centerX;
                while (!this.#canExtendWire(this.centerX, this.centerY)) {
                    const prevX = this.#x;
                    this.#x += tmpCenterX > this.#hook.centerX ? -0.01 : 0.01;
                    if (
                        (tmpCenterX > this.#hook.centerX && this.centerX <= this.#hook.centerX) ||
                        (tmpCenterX < this.#hook.centerX && this.centerX >= this.#hook.centerX)
                    ) {
                        this.#x = prevX;
                        break;
                    }
                }
            }

            this.#vx = this.#vy = 0;
            this.#prevActStatus = this.#actStatus;
            this.#actStatus = "ground";
            entity.onCollision(this, "振り子中に地面に衝突");
            return this.#actStatus;
        }

        // 振り子中に左の壁に衝突
        if (
            this.#actStatus === "furiko" &&
            this.#vx < 0 &&
            this.#y + this.#height > entity.y &&
            this.#y < entity.y + entity.height &&
            this.#x <= entity.x + entity.width &&
            this.#x + this.#width > entity.x + entity.width
        ) {
            this.#canBigJump = true;
            
            if (this.#prevX !== entity.x + entity.width) {
                this.#x = entity.x + entity.width;
                this.#prevX = this.#x;

                this.#prevY = this.#y;
                this.#y = this.#prevY;
                if (this.#vy !== 0) {
                    const tmpCenterY = this.centerY;
                    while (!this.#canExtendWire(this.centerX, this.centerY)) {
                        const prevY = this.#y;
                        this.#y += tmpCenterY > this.#hook.centerY ? -0.01 : 0.01;
                        if (
                            (tmpCenterY > this.#hook.centerY && this.centerY <= this.#hook.centerY) ||
                            (tmpCenterY < this.#hook.centerY && this.centerY >= this.#hook.centerY)
                        ) {
                            this.#y = prevY;
                            break;
                        }
                    }
                }
            }
            else {
                this.#x = this.#prevX;
                this.#y = this.#prevY;
            }

            this.#vx = this.#vy = 0;
            this.#furikoStart(true);
            entity.onCollision(this, "振り子中に左の壁に衝突");
            return this.#actStatus;
        }
        // 振り子中に右の壁に衝突
        if (
            this.#actStatus === "furiko" &&
            this.#vx > 0 &&
            this.#prevY + this.#height > entity.y &&
            this.#y + this.#height > entity.y &&
            this.#y < entity.y + entity.height &&
            this.#x + this.#width >= entity.x &&
            this.#x < entity.x
        ) {
            this.#canBigJump = true;
            
            if (this.#prevX !== entity.x - this.#width) {
                this.#x = entity.x - this.#width;
                this.#prevX = this.#x;

                this.#prevY = this.#y;
                this.#y = this.#prevY;
                if (this.#vy !== 0) {
                    const tmpCenterY = this.centerY;
                    while (!this.#canExtendWire(this.centerX, this.centerY)) {
                        const prevY = this.#y;
                        this.#y += tmpCenterY > this.#hook.centerY ? -0.01 : 0.01;
                        if (
                            (tmpCenterY > this.#hook.centerY && this.centerY <= this.#hook.centerY) ||
                            (tmpCenterY < this.#hook.centerY && this.centerY >= this.#hook.centerY)
                        ) {
                            this.#y = prevY;
                            break;
                        }
                    }
                }
            }
            else {
                this.#x = this.#prevX;
                this.#y = this.#prevY;
            }
            
            this.#vx = this.#vy = 0;
            this.#furikoStart(true);
            entity.onCollision(this, "振り子中に右の壁に衝突");
            return this.#actStatus;
        }

        // ジャンプ中に天井に衝突
        if (
            this.#actStatus !== "ground" &&
            this.#vy < 0 &&
            !(this.#prevX + this.#width <= entity.x || this.#prevX >= entity.x + entity.width) &&
            this.#x + this.#width > entity.x &&
            this.#x < entity.x + entity.width &&
            this.#y <= entity.y + entity.height &&
            this.#y + this.#height > entity.y + entity.height
        ) {
            this.#y = entity.y + entity.height;
            this.#prevY = this.#y;
            this.#vy = 0;
            entity.onCollision(this, "ジャンプ中に天井に衝突");
            return this.#actStatus;
        }

        // 落下中に床に衝突
        if (
            this.#actStatus !== "ground" &&
            this.#vy > 0 &&
            !(this.#prevX + this.#width <= entity.x || this.#prevX >= entity.x + entity.width) &&
            this.#x + this.#width > entity.x &&
            this.#x < entity.x + entity.width &&
            this.#y + this.#height >= entity.y &&
            this.#y < entity.y
        ) {
            this.#y = entity.y - this.#height;
            this.#prevY = this.#y;
            this.#fallEnd();
            entity.onCollision(this, "落下中に床に衝突");
            return this.#actStatus;
        }

        // 空中で左の壁に衝突
        if (
            this.#actStatus !== "ground" &&
            this.#vx < 0 &&
            this.#prevY + this.#height > entity.y &&
            this.#y + this.#height > entity.y &&
            this.#y < entity.y + entity.height &&
            this.#x <= entity.x + entity.width &&
            this.#x + this.#width > entity.x + entity.width
        ) {
            this.#x = entity.x + entity.width;
            this.#prevX = this.#x;
            this.#vx *= -0.8;
            entity.onCollision(this, "空中で左の壁に衝突");
            return this.#actStatus;
        }
        // 空中で右の壁に衝突
        if (
            this.#actStatus !== "ground" &&
            this.#vx > 0 &&
            this.#prevY + this.#height > entity.y &&
            this.#y + this.#height > entity.y &&
            this.#y < entity.y + entity.height &&
            this.#x + this.#width >= entity.x &&
            this.#x < entity.x
        ) {
            this.#x = entity.x - this.#width;
            this.#prevX = this.#x;
            this.#vx *= -0.8;
            entity.onCollision(this, "空中で右の壁に衝突");
            return this.#actStatus;
        }

        // 床に接しているか？
        if (
            this.#vy === 0 &&
            this.#x + this.#width >= entity.x &&
            this.#x <= entity.x + entity.width &&
            this.#y + this.#height === entity.y
        ) {
            entity.onCollision(this, "床に接している");
            return this.#actStatus;
        }
        else {
            return "falling";
        }
    }

    // 戻り値：次のactStatus
    resolveRespawnAreaCollision(entity) {
        if (
            this.#respawnArea === entity ||
            this.#x + this.#width <= entity.x || this.#x >= entity.x + entity.width ||
            this.#y + this.#height <= entity.y || this.#y >= entity.y + entity.height
        ) {
            // 何もしない
        }
        else {
            // エリア内
            this.#respawnArea = entity;
            entity.onCollision();
        }
        return "unknown";
    }

    resolveGoalCollision(entity) {
        if (
            this.#respawnArea === entity ||
            this.#x + this.#width <= entity.x || this.#x >= entity.x + entity.width ||
            this.#y + this.#height <= entity.y || this.#y >= entity.y + entity.height
        ) {
            // 何もしない
        }
        else {
            // ゴール！
            this.#isGoal = true;
            this.#respawnArea = entity;
            entity.onCollision();
        }
        return "unknown";
    }
}
