
class HelpScene extends Scene {
    #controlsDescriptionDom = null;
    #canvas = null;
    #context = null;
    #uekibatiImageList = [];
    #timer = 0;
    #selectedRow = 0;
    #ballRadian = 0;
    #isSelected = false;
    #ballOffsetX = 0;
    #isHitUekibati = false;
    #uekibatiAnimeFrameCount = 1;

    onStart() {
        this.#controlsDescriptionDom = document.querySelector("#controls-description");
        this.#canvas = document.querySelector("canvas");
        this.#context = this.#canvas.getContext("2d");

        this.#controlsDescriptionDom.innerText = "↑↓:カーソル移動 X:決定 Z:戻る";

        this.#uekibatiImageList.push(ImageStorage.get("植木鉢くんL"));
        this.#uekibatiImageList.push(ImageStorage.get("植木鉢くんの最期1"));
        this.#uekibatiImageList.push(ImageStorage.get("植木鉢くんの最期2"));
        this.#timer = this.#startAnimation();
    }

    onEnd() {
        clearInterval(this.#timer);
        this.#controlsDescriptionDom.innerText = "";
    }

    #startAnimation() {
        // let time1 = performance.now();
        return setInterval(() => {
            // const time2 = performance.now();

            if (this.#isHitUekibati) {
                this.#uekibatiAnimeFrameCount++;
            }
            this.#update();
            
            // const fps = 1000 / (time2 - time1);
            // time1 = time2;
            // if (fps <= 60/2) {
            //     console.error(fps);
            // }
            // else {
            //     console.log(fps);
            // }
        }, 1000 / 60);
    }

    #update() {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        const lineHeight = 3;
        const lineBaseBottomY = this.#canvas.height / 3;

        // 背景
        const colorList = ["#3F48CC", "#FFF200", "#FFFFFF"];
        for (let i = 0; i < 3; i++) {
            this.#context.beginPath();
            this.#context.globalAlpha = 0.5;
            this.#context.fillStyle = colorList[i];
            this.#context.rect(0, lineBaseBottomY * i, this.#canvas.width, lineBaseBottomY - lineHeight/2);
            this.#context.fill();
            this.#context.globalAlpha = 1;
        }

        // バレーボールくん
        const ballWidth = (lineBaseBottomY - lineHeight) * 0.7;;
        const ballHeight = ballWidth;
        const ballMarginLeft = 50;
        const ballMarginTop = lineBaseBottomY - lineHeight - ballHeight;
        const ballX = ballMarginLeft + this.#ballOffsetX;
        if (this.#isSelected) {
            this.#ballOffsetX += 25;
        }
        this.#context.translate(ballWidth/2 + ballMarginLeft + this.#ballOffsetX, ballHeight/2 + this.#canvas.height * this.#selectedRow/3 + ballMarginTop);
        this.#context.rotate(this.#ballRadian);
        this.#context.drawImage(ImageStorage.get("バレーボールくん"), -ballWidth/2, -ballHeight/2, ballWidth, ballHeight);
        this.#context.rotate(-this.#ballRadian);
        this.#context.translate(-ballWidth/2 - ballMarginLeft - this.#ballOffsetX, -ballHeight/2 - this.#canvas.height * this.#selectedRow/3 - ballMarginTop);
        this.#ballRadian = (this.#ballRadian - 0.1 + Math.PI*2) % (Math.PI*2);

        // 植木鉢くんの設定
        const defaultUekibatiImage = this.#uekibatiImageList[0];
        const defaultUekibatiHeihgt = (lineBaseBottomY - lineHeight) * 0.8;
        const defaultUekibatiWidth = defaultUekibatiImage.naturalWidth / defaultUekibatiImage.naturalHeight * defaultUekibatiHeihgt;
        const defaultUekibatiMarginTop = lineBaseBottomY - lineHeight - defaultUekibatiHeihgt;
        const defaultUekibatiX = this.#canvas.width - 120 - defaultUekibatiWidth/2;

        if (!this.#isHitUekibati) {
            uekibatiBreakSound.play();
            this.#isHitUekibati = ballX + ballWidth > defaultUekibatiX;
        }
        
        let uekibatiIndex = 0;
        if (this.#isSelected) {
            if (this.#uekibatiAnimeFrameCount <= 10) {
                uekibatiIndex = 1;
            }
            else {
                uekibatiIndex = 2;
            }
        }

        const uekibatiImage = this.#uekibatiImageList[uekibatiIndex];
        let uekibatiHeight = uekibatiImage.naturalHeight * defaultUekibatiHeihgt / defaultUekibatiImage.naturalHeight;
        if (uekibatiIndex === 1 || uekibatiIndex === 2) {
            uekibatiHeight *= 1.3;
        }
        const uekibatiWidth = uekibatiImage.naturalWidth / uekibatiImage.naturalHeight * uekibatiHeight;
        const uekibatiMarginTop = lineBaseBottomY - lineHeight - uekibatiHeight;
        const uekibatiX = this.#canvas.width - 120 - uekibatiWidth/2;

        const textList = ["操作方法", "ヒント", "プロローグ"];
        for (let i = 0; i < 3; i++) {
            // 文字
            const text = textList[i];
            this.#context.font = "70px sans-serif";
            this.#context.textBaseline = "top";
            this.#context.fillStyle = "#000000";
            this.#context.strokeStyle = "#FFFFFF";
            this.#context.lineWidth = 5;
            const {width: textWidth, height: textHeight} = measureText(this.#context, text);
            const textMarginBottom = (lineBaseBottomY - textHeight) / 2 - 5;
            drawStrokeText(
                this.#context, text,
                (this.#canvas.width - textWidth) / 2,
                lineBaseBottomY * (i + 1) - lineHeight - textHeight - textMarginBottom
            );

            // 区切り線
            this.#context.beginPath();
            this.#context.fillStyle = "#000000";
            this.#context.rect(0, lineBaseBottomY * (i + 1) - lineHeight, this.#canvas.width, lineHeight);
            this.#context.fill();

            // 植木鉢くん
            if (i === this.#selectedRow && this.#isHitUekibati) {
                this.#context.drawImage(uekibatiImage, uekibatiX, lineBaseBottomY * i + uekibatiMarginTop, uekibatiWidth, uekibatiHeight);
            }
            else {
                this.#context.drawImage(defaultUekibatiImage, defaultUekibatiX, lineBaseBottomY * i + defaultUekibatiMarginTop, defaultUekibatiWidth, defaultUekibatiHeihgt);
            }
        }
        
        this.#context.font = "20px sans-serif";
        this.#context.textBaseline = "top";
        this.#context.fillStyle = "#000000";
        this.#context.strokeStyle = "#FFFFFF";
        this.#context.lineWidth = 5;
        drawStrokeText(this.#context, "移動(↑↓キー) 決定(Xキー) 戻る(Zキー)", 10, 10);

        // todo バレーボールが通過したら、画面遷移
        if (
            this.#isSelected &&
            ballX > this.#canvas.width * 1.2 &&
            this.#uekibatiAnimeFrameCount > 20
        ) {
            // todo
            SceneManager.start(new TitleScene()); // todo 仮置き
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
                    uekibatiBreakSound.play(); // todo
                    this.#selectedRow--;
                }
                break;
            }
            case "ArrowDown": {
                e.preventDefault();
                if (this.#selectedRow < 2) {
                    uekibatiBreakSound.play(); // todo
                    this.#selectedRow++;
                }
                break;
            }
            case "x": {
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
