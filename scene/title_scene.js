
class TitleScene extends Scene {
    #isLoaded = false;

    #currentMode = "saisyo";
    #respawnId = -1;
    #goalTime = -1;
    #backgroundImage = null;
    #xKeyCount = 0;

    onStart() {
        const strRespawnId = Cookies.get("respaon_area_id");
        if (strRespawnId !== undefined) {
            this.#respawnId = Number(strRespawnId);
            this.#currentMode = "tuduki";
        }

        const strGoalTime = Cookies.get("goal_time");
        if (strGoalTime !== undefined) {
            this.#goalTime = Number(strGoalTime);
        }

        controlsDescriptionDom.innerText = "↑↓:カーソル移動 X:決定";

        loadImage("assets/植木鉢くんの悲劇.png").then(image => {
            this.#backgroundImage = image;
            this.#update();
            this.#isLoaded = true;
        });
    }

    #update() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.globalAlpha = 0.8;
        context.drawImage(this.#backgroundImage, 0, 0, canvas.width, canvas.height);
        context.globalAlpha = 1;

        context.textBaseline = "top";
        context.font = "900 48px sans-serif";
        context.fillStyle = "#000000";
        context.strokeStyle = "#FFFFFF";
        context.lineWidth = 5;
        {
            const titleText = "植木鉢くんの";
            const titleTextWidth = context.measureText(titleText).width;
            drawStrokeText(context, titleText, (canvas.width - titleTextWidth) / 2, 114);
        }
        {
            const titleText = "苦行系ワイヤーアクション";
            const titleTextWidth = context.measureText(titleText).width;
            drawStrokeText(context, titleText, (canvas.width - titleTextWidth) / 2, 178);
        }

        if (this.#goalTime !== -1) {
            const goalTimeText = "クリア時間 " + formatMilliseconds(this.#goalTime);
            context.font = "900 30px sans-serif";
            context.strokeStyle = "#FFFFFF";
            context.lineWidth = 5;
            drawStrokeText(context, goalTimeText, 20, 20);
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
        
        context.font = "900 32px sans-serif";
        context.strokeStyle = saisyoStrokeStyle;
        context.lineWidth = 5;
        drawStrokeText(context, saisyoText, 270, 320);

        if (this.#respawnId === -1) {
            context.fillStyle = "#888888";
        }
        context.strokeStyle = tudukiStrokeStyle;
        drawStrokeText(context, tudukiText, 270, 374);

        if (this.#currentMode === "saisyo" && this.#respawnId !== -1) {
            const bikkuri = "！".repeat(this.#xKeyCount + 1);
            let text = `${bikkuri}続きからのデータが消えます${bikkuri}`;
            context.font = "900 32px sans-serif";
            context.fillStyle = "#FF0000";
            context.strokeStyle = "#FFFFFF";
            context.lineWidth = 5;
            const textWidth = context.measureText(text).width;
            drawStrokeText(context, text, (canvas.width - textWidth) / 2, 266);
        }
    }

    onEnd() {
        // noop
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

                SoundStorage.get("ほらいくどー").play();
                if (bgmDescriptionDom.innerText === "B:BGM ON") {
                    BGM.start();
                }
                
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
