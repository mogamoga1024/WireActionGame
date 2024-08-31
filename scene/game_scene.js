
class GameScene extends Scene {
    #isPressedUp = false;
    #isPressedDown = false;
    #isPressedLeft = false;
    #isPressedRight = false;
    #isPressedX = false;
    #isPressedZ = false;
    
    #controlsDescriptionDom = null;
    #mapDescriptionDom = null;
    #isMapMode = false;
    #isGhost = false;
    
    #canvas = null;
    #context = null;
    
    #timerId = 0;
    #fireHookWaitFrame = 0;
    #fireHookWaitFrameMax = 15;

    #player = null;
    #entityList = [];
    #viewport = null;

    onStart() {
        this.#controlsDescriptionDom = document.querySelector("#controls-description");
        this.#mapDescriptionDom = document.querySelector("#map-description");
        this.#canvas = document.querySelector("canvas");
        this.#context = this.#canvas.getContext("2d");

        let stateName = (new URL(window.location.href)).searchParams.keys().next().value;
        if (stateName === undefined) {
            stateName = "hard";
        }
        
        let {player, entityList, world} = MapFactory.create(stateName);
        this.#player = player;
        this.#entityList = entityList;
        this.#viewport = new Viewport(this.#canvas, world, this.#player);

        this.#timerId = setInterval(() => {
            this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
            this.#update();
        }, dt * 1000);

        this.#updateDescription();
        this.#mapDescriptionDom.innerText = "C:マップ確認モード開始";
    }

    onEnd() {
        clearInterval(this.#timerId);
        this.#controlsDescriptionDom.innerText = "";
        this.#mapDescriptionDom.innerText = "";
    }

    onKeyDown(e) {
        if (e.repeat) {
            return;
        }

        switch (e.key) {
            case "ArrowUp":    this.#isPressedUp    = true; break;
            case "ArrowDown":  this.#isPressedDown  = true; break;
            case "ArrowLeft":  this.#isPressedLeft  = true; break;
            case "ArrowRight": this.#isPressedRight = true; break;
            case "x": this.#isPressedX = true; break;
            case "z": this.#isPressedZ = true; break;
            case "c": {
                this.#isMapMode = !this.#isMapMode;
                if (this.#isMapMode) {
                    this.#mapDescriptionDom.innerText = "C:マップ確認モード終了";
                }
                else {
                    this.#viewport.dx = 0;
                    this.#viewport.dy = 0;
                    this.#mapDescriptionDom.innerText = "C:マップ確認モード開始";
                }
                break;
            }
            case "g": {
                this.#isGhost = !this.#isGhost;
                break;
            }
        }
        console.log(this.#isMapMode);
    }

    onKeyUp(e) {
        switch (e.key) {
            case "ArrowUp":    this.#isPressedUp    = false; break;
            case "ArrowDown":  this.#isPressedDown  = false; break;
            case "ArrowLeft":  this.#isPressedLeft  = false; break;
            case "ArrowRight": this.#isPressedRight = false; break;
            case "x": this.#isPressedX = false; break;
            case "z": this.#isPressedZ = false; break;
        }
    }

    #update() {
        if (this.#isMapMode) {
            this.#updateCamera();
        }
        else {
            this.#updatePlayer();
        }
    
        // 描画する
        this.#entityList.forEach(entity => {
            entity.draw(this.#context, this.#viewport);
        });
        this.#player.draw(this.#context, this.#viewport);
    
        this.#updateDescription();
    }
    
    #updatePlayer() {
        if (this.#fireHookWaitFrame !== 0) {
            this.#fireHookWaitFrame++;
            if (this.#fireHookWaitFrame >= this.#fireHookWaitFrameMax) {
                this.#fireHookWaitFrame = 0;
            }
        }
    
        if (this.#player.opacity === 0) {
            this.#player = this.#player.nextPlayer();
            this.#viewport.setPlayer(this.#player);
        }
    
        if (this.#isGhost) {
            this.#player.ghostMove(this.#forceDirection());
        }
        else {
            this.#playerMove();
        }
    }
    
    #updateCamera() {
        if (this.#isPressedLeft) {
            this.#viewport.dx -= 20;
        }
        else if (this.#isPressedRight) {
            this.#viewport.dx += 20;
        }
        if (this.#isPressedUp) {
            this.#viewport.dy -= 20;
        }
        else if (this.#isPressedDown) {
            this.#viewport.dy += 20;
        }
    }
    
    #playerMove() {
        if (this.#isPressedZ && this.#fireHookWaitFrame === 0) {
            this.#fireHookWaitFrame++;
            this.#player.fireHook(this.#fireHookRadian());
        }
    
        if (this.#isPressedX) {
            this.#player.jumpStart();
        }
    
        this.#player.applyForce(this.#forceDirection());
    
        this.#player.move(this.#entityList);
    }
    
    #fireHookRadian() {
        if (this.#isPressedUp && !this.#isPressedDown && !this.#isPressedLeft && !this.#isPressedRight) {
            return Math.PI / 2;
        }
        else if (this.#isPressedUp && !this.#isPressedDown && this.#isPressedLeft && !this.#isPressedRight) {
            return Math.PI * 3 / 4;
        }
        else if (this.#isPressedUp && !this.#isPressedDown && !this.#isPressedLeft && this.#isPressedRight) {
            return Math.PI / 4;
        }
        else if (!this.#isPressedUp && !this.#isPressedDown && this.#isPressedLeft && !this.#isPressedRight) {
            return Math.PI;
        }
        else if (!this.#isPressedUp && !this.#isPressedDown && !this.#isPressedLeft && this.#isPressedRight) {
            return 0;
        }
        else if (!this.#isPressedUp && this.#isPressedDown && !this.#isPressedLeft && !this.#isPressedRight) {
            return -1 * Math.PI / 2;
        }
        else if (this.#player.direction === "up") {
            return Math.PI / 2;
        }
        else if (this.#player.direction === "down") {
            return -1 * Math.PI / 2;
        }
        else if (this.#player.direction === "right") {
            return Math.PI / 4;
        }
        else if (this.#player.direction === "left") {
            return Math.PI * 3 / 4;
        }
        throw new Error("想定外の入力");
    }
    
    #forceDirection() {
        let horizontal = "none";
        let vertical = "none";
    
        if (this.#isPressedLeft && !this.#isPressedRight) {
            horizontal = "left";
        }
        else if (!this.#isPressedLeft && this.#isPressedRight) {
            horizontal = "right";
        }
    
        if (this.#isPressedUp && !this.#isPressedDown) {
            vertical = "up";
        }
        else if (!this.#isPressedUp && this.#isPressedDown) {
            vertical = "down";
        }
        
        return {horizontal, vertical};
    }
    
    #updateDescription() {
        if (this.#isMapMode) {
            this.#controlsDescriptionDom.innerText =  "↑↓←→:マップ移動";
        }
        else switch (this.#player.actStatus) {
            case "ground":
                this.#controlsDescriptionDom.innerText =  "X:ジャンプ Z:フックショット ←→:移動\n";
                this.#controlsDescriptionDom.innerText += "フックは↑↓←→で方向が決められる";
                break;
            case "furiko":
                this.#controlsDescriptionDom.innerText = "X:ジャンプ Z:フックを外す ↑:ワイヤージャンプ ↓:ワイヤーを伸ばす ←→:揺らす";
                break;
            case "jumping":
            case "falling":
                this.#controlsDescriptionDom.innerText = "Z:フックショット ←→:移動\n";
                this.#controlsDescriptionDom.innerText += "フックは↑↓←→で方向が決められる";
                break;
            case "furiko-ground":
                this.#controlsDescriptionDom.innerText = "X:ジャンプ Z:フックを外す ↑:ワイヤージャンプ ←→:移動";
                break;
            case "furiko-jumping":
            case "furiko-falling":
                this.#controlsDescriptionDom.innerText = "Z:フックを外す ←→:移動";
                break;
        }
    }
}
