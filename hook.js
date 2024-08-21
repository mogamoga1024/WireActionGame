
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
    #isStuckOnce = false;
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
    move(blockList) {
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

        this.#resolveCollisionList(blockList);

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

    #resolveCollisionList(blockList) {
        if (this.#isStuckOnce || this.#actStatus === "stuck") {
            return;
        }
        for (const block of blockList) {
            const result = this.#resolveCollision(block);
            if (result === "stuck") {
                this.#isStuckOnce = true;
                this.#actStatus = "stuck";
                return;
            }
            else if (result === "unstuck") {
                return;
            }
        }
    }

    #resolveCollision(block) {
        let x1 = this.#prevX;
        let y1 = this.#prevY;
        let x2 = this.#x;
        let y2 = this.#y;
        const w = this.#width;
        const h = this.#height;
        const bx = block.x;
        const by = block.y;
        const bw = block.width;
        const bh = block.height;
        const bcx = (bx + bw) / 2;
        const bcy = (by + bh) / 2;
        
        // if (this.#isShrinking) {
        //     debugger
        // }

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
                return "moving";
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

            const d1 = Math.abs(this.#centerX(x1) - bcx) + Math.abs(this.#centerY(y1) - bcy);
            const d2 = Math.abs(this.#centerX(x2) - bcx) + Math.abs(this.#centerY(y2) - bcy);

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
        const vx = this.#x - this.#prevX;
        const vy = this.#y - this.#prevY;
        while (true) {
            const tmpX = this.#x - vx / 100;
            const tmpY = this.#y - vy / 100;
            if (
                vx > 0 && this.#x + w <= bx ||
                vx < 0 && this.#x >= bx + bw ||
                vy > 0 && this.#y + h <= by ||
                vy < 0 && this.#y >= by + bh
            ) {
                break;
            }
            this.#x = tmpX;
            this.#y = tmpY;
        }
        this.#prevX = this.#x;
        this.#prevY = this.#y;

        if (block.canStick) {
            return "stuck";
        }
        
        this.return();
        return "unstuck";
    }
}
