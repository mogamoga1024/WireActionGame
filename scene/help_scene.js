
class HelpScene extends Scene {
    #controlsDescriptionDom = null;
    #canvas = null;
    #context = null;
    #uekibatiLImage = null;
    #ballImage = null;
    #timer = 0;
    #selectedRow = 0;
    #ballRadian = 0;

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
        let time1 = performance.now();
        return setInterval(() => {
            const time2 = performance.now();

            this.#update();
            
            const fps = 1000 / (time2 - time1);
            time1 = time2;
            if (fps <= 60/2) {
                console.error(fps);
            }
            else {
                console.log(fps);
            }
        }, 1000 / 60);
    }

    #update() {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        // 区切り線
        this.#context.fillStyle = "#000000";
        const lineHeight = 3;
        const lineBaseBottomY = this.#canvas.height / 3;
        this.#context.beginPath();
        this.#context.rect(0, lineBaseBottomY * 1 - lineHeight, this.#canvas.width, lineHeight);
        this.#context.rect(0, lineBaseBottomY * 2 - lineHeight, this.#canvas.width, lineHeight);
        this.#context.rect(0, lineBaseBottomY * 3 - lineHeight, this.#canvas.width, lineHeight);
        this.#context.fill();

        // 文字
        const textList = ["操作方法", "ヒント", "プロローグ"];
        for (let i = 0; i < 3; i++) {
            const text = textList[i];
            this.#context.font = "70px sans-serif";
            this.#context.textBaseline = "top";
            this.#context.fillStyle = "#000000";
            this.#context.strokeStyle = "#FFFFFF";
            this.#context.lineWidth = 5;
            const {width: textWidth, height: textHeight} = measureText(this.#context, text);
            const textMarginBottom = (lineBaseBottomY - textHeight) / 2;
            drawStrokeText(
                this.#context, text,
                (this.#canvas.width - textWidth) / 2,
                lineBaseBottomY * (i + 1) - lineHeight - textHeight - textMarginBottom
            );
        }
        // 2段目
        
        // 3段目

        // 植木鉢くん
        const uekbtHeight = (lineBaseBottomY - lineHeight) * 0.7;
        const uekbtWidth = this.#uekibatiLImage.naturalWidth / this.#uekibatiLImage.naturalHeight * uekbtHeight;
        const imageMarginX = 50;
        const imageMarginTop = lineBaseBottomY - lineHeight - uekbtHeight;
        const leftImageX = this.#canvas.width - uekbtWidth - imageMarginX;
        this.#context.drawImage(this.#uekibatiLImage, leftImageX, imageMarginTop, uekbtWidth, uekbtHeight);
        this.#context.drawImage(this.#uekibatiLImage, leftImageX, lineBaseBottomY + imageMarginTop, uekbtWidth, uekbtHeight);
        this.#context.drawImage(this.#uekibatiLImage, leftImageX, lineBaseBottomY * 2 + imageMarginTop, uekbtWidth, uekbtHeight);

        // ボール回転
        const ballWidth = uekbtHeight;
        const ballHeight = uekbtHeight;
        this.#context.translate(ballWidth/2 + imageMarginX, ballHeight/2 + this.#canvas.height * this.#selectedRow/3 + imageMarginTop);
        this.#context.rotate(this.#ballRadian);
        this.#context.drawImage(this.#ballImage, -ballWidth/2, -ballHeight/2, ballWidth, ballHeight);
        this.#context.rotate(-this.#ballRadian);
        this.#context.translate(-ballWidth/2 - imageMarginX, -ballHeight/2 - this.#canvas.height * this.#selectedRow/3 - imageMarginTop);
        this.#ballRadian = (this.#ballRadian - 0.1 + Math.PI*2) % (Math.PI*2);

        this.#context.font = "20px sans-serif";
        this.#context.textBaseline = "top";
        this.#context.fillStyle = "#000000";
        this.#context.strokeStyle = "#FFFFFF";
        this.#context.lineWidth = 5;
        drawStrokeText(this.#context, "決定(Xキー) 戻る(Zキー)", 10, 10);
    }

    onKeyDown(e) {
        if (e.repeat) {
            e.preventDefault();
            return;
        }

        switch (e.key) {
            case "ArrowUp": {
                e.preventDefault();
                if (this.#selectedRow > 0) {
                    this.#selectedRow--;
                }
                break;
            }
            case "ArrowDown": {
                e.preventDefault();
                if (this.#selectedRow < 2) {
                    this.#selectedRow++;
                }
                break;
            }
            case "x": {
                // todo
                return;
            }
            case "z": {
                // todo
                SceneManager.finish();
                return;
            }
        }
    }
}
