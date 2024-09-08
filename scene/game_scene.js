
class GameScene extends Scene {
    #respawnId = -1;
    #startTime = null;
    #totalTime = 0;
    #goalTime = -1;

    #isPressedUp = false;
    #isPressedDown = false;
    #isPressedLeft = false;
    #isPressedRight = false;
    #isPressedX = false;
    #isPressedZ = false;
    
    #controlsDescriptionDom = null;
    #mapDescriptionDom = null;
    #helpDescriptionDom = null;
    #backgroundImage = null;
    #saveFunc = null;
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

    constructor(respawnId, totalTime = 0) {
        super();
        this.#respawnId = respawnId;
        this.#totalTime = totalTime;
    }

    async onStart() {
        this.#controlsDescriptionDom = document.querySelector("#controls-description");
        this.#mapDescriptionDom = document.querySelector("#map-description");
        this.#helpDescriptionDom = document.querySelector("#help-description");
        this.#canvas = document.querySelector("canvas");
        this.#context = this.#canvas.getContext("2d");

        let stateName = (new URL(window.location.href)).searchParams.keys().next().value;
        if (stateName === undefined) {
            stateName = "hard";
        }
        
        let {player, entityList, world} = MapFactory.create(stateName, this.#respawnId);
        this.#player = player;
        this.#entityList = entityList;
        this.#viewport = new Viewport(this.#canvas, world, this.#player);

        this.#updateDescription();
        this.#mapDescriptionDom.innerText = "C:マップ確認モード開始";
        this.#helpDescriptionDom.innerText = "H:ヘルプ";

        this.#backgroundImage = new Image();
        this.#backgroundImage.src = "assets/虚無.png";
        await new Promise(resolve => {
            this.#backgroundImage.onload = () => {
                resolve();
            };
            this.#backgroundImage.onerror = () => {
                resolve();
            };
        });

        this.#timerId = setInterval(() => {
            this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
            this.#context.globalAlpha = 0.3;
            this.#context.drawImage(this.#backgroundImage, 0, 0, this.#canvas.width, this.#canvas.height);
            this.#context.globalAlpha = 1;
            this.#update();
        }, dt * 1000);

        this.#saveFunc = () => {
            if (this.#player.isGoal) {
                return;
            }
            const totalTime = new Date() - this.#startTime;
            Cookies.set("total_time", String(totalTime), {expires: 365});
        };
        window.addEventListener("beforeunload", this.#saveFunc);
        window.addEventListener("popstate", this.#saveFunc);
        emitter.on("respawn-area-collision", this.#saveFunc);

        this.#startTime = new Date();
        if (this.#totalTime > 0) {
            this.#startTime.setTime(this.#startTime.getTime() - this.#totalTime);
        }
    }

    onEnd() {
        clearInterval(this.#timerId);
        this.#controlsDescriptionDom.innerText = "";
        this.#mapDescriptionDom.innerText = "";
        this.#helpDescriptionDom.innerText = "";
        window.removeEventListener("beforeunload", this.#saveFunc);
        window.removeEventListener("popstate", this.#saveFunc);
        emitter.off("respawn-area-collision", this.#saveFunc);
    }

    onKeyDown(e) {
        if (e.repeat) {
            e.preventDefault();
            return;
        }

        switch (e.key) {
            case "ArrowUp":    this.#isPressedUp    = true; e.preventDefault(); break;
            case "ArrowDown":  this.#isPressedDown  = true; e.preventDefault(); break;
            case "ArrowLeft":  this.#isPressedLeft  = true; e.preventDefault(); break;
            case "ArrowRight": this.#isPressedRight = true; e.preventDefault(); break;
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
        this.#updateText();

        if (this.#player.isGoal) {
            // todo
            console.log("ゴール！おめでとう！");
        }
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
        let text = "";
        if (this.#isMapMode) {
            text =  "↑↓←→:マップ移動";
        }
        else switch (this.#player.actStatus) {
            case "ground":
                text =  "X:ジャンプ Z:フックショット ←→:移動\n";
                text += "フックは↑↓←→で方向が決められる";
                break;
            case "furiko":
                text = "X:ジャンプ Z:フックを外す ↑:ワイヤージャンプ ↓:ワイヤーを伸ばす ←→:揺らす";
                break;
            case "jumping":
            case "falling":
                text = "Z:フックショット ←→:移動\n";
                text += "フックは↑↓←→で方向が決められる";
                break;
            case "furiko-ground":
                text = "X:ジャンプ Z:フックを外す ↑:ワイヤージャンプ ←→:移動";
                break;
            case "furiko-jumping":
            case "furiko-falling":
                text = "Z:フックを外す ←→:移動";
                break;
        }
        // DOMを頻繁に更新したくない ＆ 範囲選択できない
        if (this.#controlsDescriptionDom.innerText !== text) {
            this.#controlsDescriptionDom.innerText = text;
        }
    }

    #updateText() {
        this.#context.save();

        const time = this.#goalTime === -1 ? new Date() - this.#startTime : this.#goalTime;
        const timeText = formatMilliseconds(time);
        this.#context.font = "30px sans-serif";
        this.#context.textBaseline = "top";
        this.#context.fillStyle = "#000000";
        this.#context.strokeStyle = "#FFFFFF";
        this.#context.lineWidth = 5;
        drawStrokeText(this.#context, timeText, 20, 20);

        const helpText = "HELP! (Hキー)";
        this.#context.font = "20px sans-serif";
        this.#context.fillStyle = "#FF0000";
        this.#context.strokeStyle = "#FFCCCC";
        drawStrokeText(this.#context, helpText, this.#canvas.width - 160, this.#canvas.height - 40);

        this.#context.restore();

        if (this.#player.isGoal && this.#goalTime === -1) {
            this.#goalTime = time;
            const strOldGoalTime = Cookies.get("goal_time");
            if (strOldGoalTime === undefined) {
                Cookies.set("goal_time", String(time), {expires: 365});
            }
            else {
                const oldGoalTime = Number(strOldGoalTime);
                if (time < oldGoalTime) {
                    Cookies.set("goal_time", String(time), {expires: 365});
                }
            }
        }
    }
}
