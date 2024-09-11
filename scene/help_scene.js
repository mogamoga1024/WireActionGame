
class HelpScene extends Scene {
    #controlsDescriptionDom = null;
    #canvas = null;
    #context = null;
    #uekibatiLImage = null;
    #ballImage = null;
    #timer = 0;
    #selectedRow = 0;
    #ballRadian = 0;
    #isSelected = false;
    #ballOffsetX = 0;

    async onStart() {
        this.#controlsDescriptionDom = document.querySelector("#controls-description");
        this.#canvas = document.querySelector("canvas");
        this.#context = canvas.getContext("2d");

        this.#controlsDescriptionDom.innerText = "↑↓:カーソル移動 X:決定 Z:戻る";

        this.#uekibatiLImage = await loadImage("assets/植木鉢くんL.png");
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
        const uekbtHeight = (lineBaseBottomY - lineHeight) * 0.7;
        const uekbtWidth = this.#uekibatiLImage.naturalWidth / this.#uekibatiLImage.naturalHeight * uekbtHeight;
        const imageMarginX = 50;
        const imageMarginTop = lineBaseBottomY - lineHeight - uekbtHeight;
        const leftImageX = this.#canvas.width - uekbtWidth - imageMarginX;
        const textList = ["操作方法", "ヒント", "プロローグ"];
        const colorList = ["#3F48CC", "#FFF200", "#FFFFFF"];
        for (let i = 0; i < 3; i++) {
            // 背景
            this.#context.beginPath();
            this.#context.globalAlpha = 0.5;
            this.#context.fillStyle = colorList[i];
            this.#context.rect(0, lineBaseBottomY * i, this.#canvas.width, lineBaseBottomY - lineHeight/2);
            this.#context.fill();
            this.#context.globalAlpha = 1;

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
            this.#context.drawImage(this.#uekibatiLImage, leftImageX, lineBaseBottomY * i + imageMarginTop, uekbtWidth, uekbtHeight);
        }
        
        // バレーボール君
        const ballWidth = uekbtHeight;
        const ballHeight = uekbtHeight;
        if (this.#isSelected) {
            this.#ballOffsetX += 30;
        }
        this.#context.translate(ballWidth/2 + imageMarginX + this.#ballOffsetX, ballHeight/2 + this.#canvas.height * this.#selectedRow/3 + imageMarginTop);
        this.#context.rotate(this.#ballRadian);
        this.#context.drawImage(this.#ballImage, -ballWidth/2, -ballHeight/2, ballWidth, ballHeight);
        this.#context.rotate(-this.#ballRadian);
        this.#context.translate(-ballWidth/2 - imageMarginX - this.#ballOffsetX, -ballHeight/2 - this.#canvas.height * this.#selectedRow/3 - imageMarginTop);
        this.#ballRadian = (this.#ballRadian - 0.1 + Math.PI*2) % (Math.PI*2);

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
