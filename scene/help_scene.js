
class HelpScene extends Scene {
    #controlsDescriptionDom = null;
    #canvas = null;
    #context = null;
    #uekbtImageList = [];
    #ballImage = null;
    #timer = 0;
    #selectedRow = 0;
    #ballRadian = 0;
    #isSelected = false;
    #ballOffsetX = 0;
    #uekibatiTentouFrameCount = 0;

    async onStart() {
        this.#controlsDescriptionDom = document.querySelector("#controls-description");
        this.#canvas = document.querySelector("canvas");
        this.#context = canvas.getContext("2d");

        this.#controlsDescriptionDom.innerText = "↑↓:カーソル移動 X:決定 Z:戻る";

        this.#uekbtImageList.push(await loadImage("assets/植木鉢くんL.png"));
        this.#uekbtImageList.push(await loadImage("assets/植木鉢くんの最期1.png"));
        this.#uekbtImageList.push(await loadImage("assets/植木鉢くんの最期2.png"));
        this.#ballImage = await loadImage("assets/バレーボールくん.png");
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

            this.#uekibatiTentouFrameCount++;

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
        if (this.#isSelected) {
            this.#ballOffsetX += 30;
        }
        this.#context.translate(ballWidth/2 + ballMarginLeft + this.#ballOffsetX, ballHeight/2 + this.#canvas.height * this.#selectedRow/3 + ballMarginTop);
        this.#context.rotate(this.#ballRadian);
        this.#context.drawImage(this.#ballImage, -ballWidth/2, -ballHeight/2, ballWidth, ballHeight);
        this.#context.rotate(-this.#ballRadian);
        this.#context.translate(-ballWidth/2 - ballMarginLeft - this.#ballOffsetX, -ballHeight/2 - this.#canvas.height * this.#selectedRow/3 - ballMarginTop);
        this.#ballRadian = (this.#ballRadian - 0.1 + Math.PI*2) % (Math.PI*2);

        // 植木鉢くんの設定
        const uekbtIndex = Math.floor(this.#uekibatiTentouFrameCount / 20) % 3;
        const uekbtImage = this.#uekbtImageList[uekbtIndex];
        const uekbtBaseHeight = (lineBaseBottomY - lineHeight) * 0.8;
        let uekbtHeight = uekbtImage.naturalHeight * uekbtBaseHeight / this.#uekbtImageList[0].naturalHeight;
        if (uekbtIndex === 1) {
            uekbtHeight *= 1.3;
        }
        else if (uekbtIndex === 2) {
            uekbtHeight *= 1.3;
        }

        const uekbtWidth = uekbtImage.naturalWidth / uekbtImage.naturalHeight * uekbtHeight;
        const uekbtMarginTop = lineBaseBottomY - lineHeight - uekbtHeight;
        const leftImageX = this.#canvas.width - 170;
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
            this.#context.drawImage(uekbtImage, leftImageX, lineBaseBottomY * i + uekbtMarginTop, uekbtWidth, uekbtHeight);
        }
        
        this.#context.font = "20px sans-serif";
        this.#context.textBaseline = "top";
        this.#context.fillStyle = "#000000";
        this.#context.strokeStyle = "#FFFFFF";
        this.#context.lineWidth = 5;
        drawStrokeText(this.#context, "移動(↑↓キー) 決定(Xキー) 戻る(Zキー)", 10, 10);
    }

    onKeyDown(e) {
        if (e.repeat) {
            e.preventDefault();
            return;
        }

        switch (e.key) {
            case "ArrowUp": {
                e.preventDefault();
                if (!this.#isSelected && this.#selectedRow > 0) {
                    this.#selectedRow--;
                }
                break;
            }
            case "ArrowDown": {
                e.preventDefault();
                if (!this.#isSelected && this.#selectedRow < 2) {
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
