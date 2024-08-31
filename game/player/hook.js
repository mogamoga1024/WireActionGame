
class Hook {
    #relativeX = 0; #relativeY = 0;
    #prevX = 0;
    #x = 0;
    get x() { return this.#x; }
    #prevY = 0;
    #y = 0;
    get y() { return this.#y; }
    #width = 14;
    get width() { return this.#width; }
    #height = 14;
    get height() { return this.#height; }
    get centerX() { return this.#x + this.#width / 2; }
    get centerY() { return this.#y + this.#height / 2; }
    #centerX(x) { return x + this.#width / 2; }
    #centerY(y) { return y + this.#height / 2; }

    #player = null;
    #v = 30;
    #vx = 0;
    #vy = 0;
    #minWireLength = 110;
    #maxWireLength = 300;
    get maxWireLength() { return this.#maxWireLength; }
    #isShrinking = false;
    #canStuck = true;
    #actStatus = "moving";
    get actStatus() { return this.#actStatus; }
    
    constructor(player, radian) {
        this.#player = player;
        this.#x = player.x + player.width / 2 - this.#width / 2;
        this.#y = player.y + player.height / 2 - this.#height / 2;
        this.#prevX = this.#x;
        this.#prevY = this.#y;
        this.#vx = this.#v * Math.cos(radian);
        this.#vy = -1 * this.#v * Math.sin(radian);
    }

    draw(context, viewport) {
        const ox =  viewport.offsetX;
        const oy =  viewport.offsetY;

        context.beginPath();
        context.rect(this.#x + ox, this.#y + oy, this.#width, this.#height);
        context.fillStyle = "black";
        context.fill();
    }

    // 戻り値：フックを消去するべきか
    move(entityList) {
        if (this.#actStatus === "stuck") {
            return false;
        }
        if (this.#isShrinking) {
            const vecX = this.centerX - this.#player.centerX;
            const vecY = this.centerY - this.#player.centerY;
            const radian = Math.atan2(vecY, vecX);
            this.#vx = -1 * this.#v * 1.5 * Math.cos(radian);
            this.#vy = -1 * this.#v * 1.5 * Math.sin(radian);
        }
        // 縮む場合
        if (this.#isShrinking) {
            this.#prevX = this.#x;
            this.#prevY = this.#y;
            this.#x += this.#vx;
            this.#y += this.#vy;
        }
        // 伸びる場合
        else {
            this.#relativeX += this.#vx;
            this.#relativeY += this.#vy;
            this.#prevX = this.#x;
            this.#prevY = this.#y;
            this.#x = this.#player.centerX + this.#relativeX - this.#width / 2;
            this.#y = this.#player.centerY + this.#relativeY - this.#height / 2;
        }

        let wireLength = this.#calcWireLength(this.#player.centerX, this.#player.centerY);
        if (!this.#isShrinking) {
            if (wireLength >= this.#maxWireLength) {
                // prevは更新しなくてよい
                do {
                    this.#x -= this.#vx / 100;
                    this.#y -= this.#vy / 100;
                    wireLength = this.#calcWireLength(this.#player.centerX, this.#player.centerY);
                }
                while (wireLength >= this.#maxWireLength)
                this.#isShrinking = true;
            }
        }

        this.#resolveCollisionList(entityList);

        if (this.#isShrinking) {
            if (wireLength <= this.#v * 1.1) {
                return true;
            }
        }
        return false;
    }

    return() {
        this.#actStatus = "moving";
        this.#isShrinking = true;
    }

    canFuriko() {
        if (this.#actStatus !== "stuck") {
            return false;
        }
        const wireLength = this.#calcWireLength(this.#player.centerX, this.#player.centerY);
        return wireLength >= this.#minWireLength;
    }

    #calcWireLength(playerCenterX, playerCenterY) {
        const diffX = this.centerX - playerCenterX;
        const diffY = this.centerY - playerCenterY;
        return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    }

    // ワイヤーの長さが最大以内かどうか
    canExtendWire(playerCenterX, playerCenterY) {
        if (this.#actStatus !== "stuck") {
            return true;
        }
        const wireLength = this.#calcWireLength(playerCenterX, playerCenterY);
        return wireLength <= this.#maxWireLength;
    }

    #resolveCollisionList(entityList) {
        if (!this.#canStuck || this.#actStatus === "stuck") {
            return;
        }
        
        const vx = this.#x - this.#prevX;
        const vy = this.#y - this.#prevY;
        let resultList = [];
        let baseDistance = -1;
        for (const entity of entityList) {
            const result = this.#resolveCollision(entity, vx, vy);
            if (result.actStatus !== "moving") {
                if (
                    baseDistance === -1 ||
                    this.#isShrinking && baseDistance < result.distance ||
                    !this.#isShrinking && baseDistance > result.distance
                ) {
                    resultList = [];
                    baseDistance = result.distance;
                    resultList.push(result);
                }
                else if (baseDistance === result.distance) {
                    resultList.push(result);
                }
            }
        }

        if (resultList.length === 0) {
            return;
        }

        this.#canStuck = false;
        this.#x = resultList[0].x;
        this.#y = resultList[0].y;
        this.#prevX = this.#x;
        this.#prevY = this.#y;

        if (resultList.every(result => result.actStatus === "stuck")) {
            this.#actStatus = "stuck";
        }
        else {
            this.return();
        }
    }

    #resolveCollision(entity, vx, vy) {
        if (!(entity instanceof Block)) {
            return {actStatus: "moving"};
        }

        let x1 = this.#prevX;
        let y1 = this.#prevY;
        let x2 = this.#x;
        let y2 = this.#y;
        const w = this.#width;
        const h = this.#height;
        const bx = entity.x;
        const by = entity.y;
        const bw = entity.width;
        const bh = entity.height;
        const bcx = (bx + bw) / 2;
        const bcy = (by + bh) / 2;
        
        if (
            this.#x + w <= bx || this.#x >= bx + bw ||
            this.#y + h <= by || this.#y >= by + bh
        )
        while (true) {
            if (
                x1 + w <= bx && x2 + w <= bx ||
                x1 >= bx + bw && x2 >= bx + bw ||
                y1 + h <= by && y2 + h <= by ||
                y1 >= by + bh && y2 >= by + bh
            ) {
                // 衝突していない
                return {actStatus: "moving"};
            }
            // 二分探索
            const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2;
            if (
                cx + w <= bx || cx >= bx + bw ||
                cy + h <= by || cy >= by + bh
            ) {
                // 衝突していない可能性がある
            }
            else {
                // 衝突している
                break;
            }

            const d1a = this.#centerX(x1) - bcx;
            const d1b = this.#centerY(y1) - bcy;
            const d2a = this.#centerX(x2) - bcx;
            const d2b = this.#centerY(y2) - bcy;
            const d1 = d1a * d1a + d1b + d1b;
            const d2 = d2a * d2a + d2b + d2b;

            if (d1 < d2) {
                x2 = cx;
                y2 = cy;
            }
            else {
                x1 = cx;
                y1 = cy;
            }
        }

        // フックを接させる
        let x = this.#x;
        let y = this.#y;
        while (true) {
            const tmpX = x - vx / 100;
            const tmpY = y - vy / 100;
            if (
                vx > 0 && x + w <= bx ||
                vx < 0 && x >= bx + bw ||
                vy > 0 && y + h <= by ||
                vy < 0 && y >= by + bh
            ) {
                break;
            }
            x = tmpX;
            y = tmpY;
        }

        const diffX = this.#centerX(x) - this.#player.centerX;
        const diffY = this.#centerY(y) - this.#player.centerY;
        const distance = diffX * diffX + diffY * diffY;

        if (entity.canStick) {
            return {actStatus: "stuck", x, y, distance};
        }
        
        return {actStatus: "unstuck", x, y, distance};
    }
}
