
class HelpScene extends Scene {
    #shouldAnimation = true;
    #respaonOrdinalNum = -1;
    #selectedRow = 0;
    #ballRadian = 0;
    #isSelected = false;
    #ballOffsetX = 0;
    #isHitUekibati = false;
    #uekibatiAnimeFrameCount = 1;

    onStart() {
        controlsDescriptionDom.innerText = "↑↓:カーソル移動 X:決定 Z:戻る";
        this.#respaonOrdinalNum = respaonOrdinalNum();
        this.#startAnimation();
    }

    onEnd() {
        this.#shouldAnimation = false;
    }

    onResume() {
        this.#ballRadian = 0;
        this.#isSelected = false;
        this.#ballOffsetX = 0;
        this.#isHitUekibati = false;
        this.#uekibatiAnimeFrameCount = 1;
        this.onStart();
    }

    onStop() {
        this.onEnd();
    }

    #startAnimation() {
        this.#shouldAnimation = true;
        let prevTime = -1;
        const anime = (time) => {
            if (this.#shouldAnimation) {
                if (prevTime === -1 || time - prevTime >= deltaTime * 1000 * 0.9) {
                    prevTime = time;
                    if (this.#isHitUekibati) {
                        this.#uekibatiAnimeFrameCount++;
                    }
                    this.#update();
                }
                requestAnimationFrame(anime);
            }
        };
        anime(performance.now());
    }

    #update() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        const lineHeight = 3;
        const lineBaseBottomY = canvas.height / 3;

        // 背景
        const colorList = ["#3F48CC", "#FFF200", "#FFFFFF"];
        for (let i = 0; i < 3; i++) {
            context.beginPath();
            context.globalAlpha = 0.5;
            context.fillStyle = colorList[i];
            context.rect(0, lineBaseBottomY * i, canvas.width, lineBaseBottomY - lineHeight/2);
            context.fill();
            context.globalAlpha = 1;
        }

        // バレーボールくん
        const ballWidth = (lineBaseBottomY - lineHeight) * 0.7;;
        const ballHeight = ballWidth;
        const ballMarginLeft = 50;
        const ballMarginTop = lineBaseBottomY - lineHeight - ballHeight;
        const ballX = ballMarginLeft + this.#ballOffsetX;
        if (this.#isSelected) {
            this.#ballOffsetX += 18;
        }
        context.translate(ballWidth/2 + ballMarginLeft + this.#ballOffsetX, ballHeight/2 + canvas.height * this.#selectedRow/3 + ballMarginTop);
        context.rotate(this.#ballRadian);
        context.drawImage(ImageStorage.get("バレーボールくん"), -ballWidth/2, -ballHeight/2, ballWidth, ballHeight);
        context.rotate(-this.#ballRadian);
        context.translate(-ballWidth/2 - ballMarginLeft - this.#ballOffsetX, -ballHeight/2 - canvas.height * this.#selectedRow/3 - ballMarginTop);
        this.#ballRadian = (this.#ballRadian - 0.1 + Math.PI*2) % (Math.PI*2);

        // 植木鉢くんの設定
        const defaultUekibatiImage = ImageStorage.get("植木鉢くんL");
        const defaultUekibatiHeihgt = (lineBaseBottomY - lineHeight) * 0.8;
        const defaultUekibatiWidth = defaultUekibatiImage.naturalWidth / defaultUekibatiImage.naturalHeight * defaultUekibatiHeihgt;
        const defaultUekibatiMarginTop = lineBaseBottomY - lineHeight - defaultUekibatiHeihgt;
        const defaultUekibatiX = canvas.width - 120 - defaultUekibatiWidth/2;

        if (!this.#isHitUekibati && ballX + ballWidth > defaultUekibatiX) {
            SoundStorage.get("大破").play();
            this.#isHitUekibati = true;
        }
        
        let uekibatiImage = ImageStorage.get("植木鉢くんL");
        if (this.#isSelected) {
            if (this.#uekibatiAnimeFrameCount <= 10) {
                uekibatiImage = ImageStorage.get("植木鉢くんの最期1");
            }
            else {
                uekibatiImage = ImageStorage.get("植木鉢くんの最期2");
            }
        }
        let uekibatiHeight = uekibatiImage.naturalHeight * defaultUekibatiHeihgt / defaultUekibatiImage.naturalHeight;
        const uekibatiWidth = uekibatiImage.naturalWidth / uekibatiImage.naturalHeight * uekibatiHeight;
        const uekibatiMarginTop = lineBaseBottomY - lineHeight - uekibatiHeight;
        const uekibatiX = canvas.width - 120 - uekibatiWidth/2;

        const textList = ["操作方法", `ヒント${this.#respaonOrdinalNum}`, "プロローグ"];
        for (let i = 0; i < 3; i++) {
            // 文字
            const text = textList[i];
            context.font = "900 70px sans-serif";
            context.textBaseline = "top";
            context.fillStyle = "#000000";
            context.strokeStyle = "#FFFFFF";
            context.lineWidth = 5;
            const {width: textWidth, height: textHeight} = measureText(context, text);
            const textMarginBottom = (lineBaseBottomY - textHeight) / 2 - 5;
            drawStrokeText(
                context, text,
                (canvas.width - textWidth) / 2,
                lineBaseBottomY * (i + 1) - lineHeight - textHeight - textMarginBottom
            );

            // 区切り線
            context.beginPath();
            context.fillStyle = "#000000";
            context.rect(0, lineBaseBottomY * (i + 1) - lineHeight, canvas.width, lineHeight);
            context.fill();

            // 植木鉢くん
            if (i === this.#selectedRow && this.#isHitUekibati) {
                context.drawImage(uekibatiImage, uekibatiX, lineBaseBottomY * i + uekibatiMarginTop, uekibatiWidth, uekibatiHeight);
            }
            else {
                context.drawImage(defaultUekibatiImage, defaultUekibatiX, lineBaseBottomY * i + defaultUekibatiMarginTop, defaultUekibatiWidth, defaultUekibatiHeihgt);
            }
        }
        
        // バレーボールが通過したら、画面遷移
        if (
            this.#isSelected &&
            ballX > canvas.width * 1.2 &&
            this.#uekibatiAnimeFrameCount > 20
        ) {
            if (this.#selectedRow === 0) {
                SceneManager.start(new TutorialScene(), true);
            }
            else if (this.#selectedRow === 1) {
                SceneManager.start(new HintScene(), true);
            }
            else if (this.#selectedRow === 2) {
                SceneManager.start(new PrologueScene(), true);
            }
        }
    }

    onKeyDown(e) {
        if (e.repeat) {
            e.preventDefault();
            return;
        }

        if (this.#isSelected) {
            // 画面遷移が完了するまで操作禁止
            e.preventDefault();
            return;
        }

        switch (e.key) {
            case "ArrowUp": {
                e.preventDefault();
                if (this.#selectedRow > 0) {
                    SoundStorage.get("ドンッ").play();
                    this.#selectedRow--;
                }
                return;
            }
            case "ArrowDown": {
                e.preventDefault();
                if (this.#selectedRow < 2) {
                    SoundStorage.get("ドンッ").play();
                    this.#selectedRow++;
                }
                return;
            }
            case "x": {
                SoundStorage.get("あっ（確信犯）").play();
                this.#isSelected = true;
                return;
            }
            case "z": {
                SceneManager.finish();
                return;
            }
        }
    }
}
