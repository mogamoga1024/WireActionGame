
class TitleScene extends Scene {
    #isLoaded = false;

    #controlsDescriptionDom = null;
    #canvas = null;
    #context = null;
    #currentMode = "saisyo";
    #respawnId = -1;
    #goalTime = -1;
    #backgroundImage = null;
    #xKeyCount = 0;

    onStart() {
        this.#controlsDescriptionDom = document.querySelector("#controls-description");
        this.#canvas = document.querySelector("canvas");
        this.#context = this.#canvas.getContext("2d");

        const strRespawnId = Cookies.get("respaon_area_id");
        if (strRespawnId !== undefined) {
            this.#respawnId = Number(strRespawnId);
            this.#currentMode = "tuduki";
        }

        const strGoalTime = Cookies.get("goal_time");
        if (strGoalTime !== undefined) {
            this.#goalTime = Number(strGoalTime);
        }

        this.#controlsDescriptionDom.innerText = "↑↓:カーソル移動 X:決定";

        loadImage("assets/植木鉢くんの悲劇.png").then(image => {
            this.#backgroundImage = image;
            this.#update();
            this.#isLoaded = true;
        });
    }

    #update() {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        this.#context.globalAlpha = 0.8;
        this.#context.drawImage(this.#backgroundImage, 0, 0, this.#canvas.width, this.#canvas.height);
        this.#context.globalAlpha = 1;

        this.#context.textBaseline = "top";
        this.#context.font = "48px sans-serif";
        this.#context.fillStyle = "#000000";
        this.#context.strokeStyle = "#FFFFFF";
        this.#context.lineWidth = 5;
        {
            const titleText = "植木鉢くんの";
            const titleTextWidth = this.#context.measureText(titleText).width;
            drawStrokeText(this.#context, titleText, (this.#canvas.width - titleTextWidth) / 2, 114);
        }
        {
            const titleText = "苦行系ワイヤーアクション";
            const titleTextWidth = this.#context.measureText(titleText).width;
            drawStrokeText(this.#context, titleText, (this.#canvas.width - titleTextWidth) / 2, 178);
        }

        if (this.#goalTime !== -1) {
            const goalTimeText = "クリア時間 " + formatMilliseconds(this.#goalTime);
            this.#context.font = "30px sans-serif";
            this.#context.strokeStyle = "#FFFFFF";
            this.#context.lineWidth = 5;
            drawStrokeText(this.#context, goalTimeText, 20, 20);
        }

        let saisyoText = "最初から";
        let tudukiText = "続きから";
        let saisyoStrokeStyle = "#FFFFFF";
        let tudukiStrokeStyle = "#FFFFFF";

        if (this.#currentMode === "saisyo") {
            saisyoText += " (Xキー)";
            saisyoStrokeStyle = "#FFFF99";
        }
        else if (this.#currentMode === "tuduki") {
            tudukiText += " (Xキー)";
            tudukiStrokeStyle = "#FFFF99";
        }
        
        this.#context.font = "32px sans-serif";
        this.#context.strokeStyle = saisyoStrokeStyle;
        this.#context.lineWidth = 5;
        drawStrokeText(this.#context, saisyoText, 270, 320);

        if (this.#respawnId === -1) {
            this.#context.fillStyle = "#888888";
        }
        this.#context.strokeStyle = tudukiStrokeStyle;
        drawStrokeText(this.#context, tudukiText, 270, 374);

        if (this.#currentMode === "saisyo" && this.#respawnId !== -1) {
            const bikkuri = "！".repeat(this.#xKeyCount + 1);
            let text = `${bikkuri}続きからのデータが消えます${bikkuri}`;
            this.#context.font = "32px sans-serif";
            this.#context.fillStyle = "#FF0000";
            this.#context.strokeStyle = "#FFFFFF";
            this.#context.lineWidth = 5;
            const textWidth = this.#context.measureText(text).width;
            drawStrokeText(this.#context, text, (canvas.width - textWidth) / 2, 266);
        }
    }

    onEnd() {
        this.#controlsDescriptionDom.innerText = "";
    }
    
    onKeyDown(e) {
        if (e.repeat) {
            e.preventDefault();
            return;
        }
        if (!this.#isLoaded) {
            return;
        }

        switch (e.key) {
            case "ArrowUp": {
                e.preventDefault();
                this.#currentMode = "saisyo";
                this.#update();
                return;
            }
            case "ArrowDown": {
                e.preventDefault();
                if (this.#respawnId !== -1) {
                    this.#currentMode = "tuduki";
                }
                this.#xKeyCount = 0;
                this.#update();
                return;
            }
            case "x": {
                if (this.#currentMode === "saisyo" && this.#respawnId !== -1 && this.#xKeyCount < 5) {
                    this.#xKeyCount++;
                    // todo sound 本当？
                    this.#update();
                    return;
                }

                SoundStorage.get("ドンッ").play();
                
                let totalTime = 0;
                if (this.#currentMode === "saisyo") {
                    this.#respawnId = -1;
                    Cookies.remove("respaon_area_id")
                }
                // 実質、this.#currentMode === "tuduki"と同じ
                else {
                    const strTotalTime = Cookies.get("total_time");
                    if (strTotalTime !== undefined) {
                        totalTime = Number(strTotalTime);
                    }
                }
                SceneManager.start(new GameScene(this.#respawnId, totalTime));
                return;
            }
        }
    }
    
    onKeyUp(e) {
        // noop
    }
}
