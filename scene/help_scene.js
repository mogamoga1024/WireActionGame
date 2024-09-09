
class HelpScene extends Scene {
    #controlsDescriptionDom = null;
    #canvas = null;
    #context = null;
    #uekibatiLImage = null;
    #ballImage = null;
    #timer = 0;
    #ballRadian = 0;

    async onStart() {
        this.#controlsDescriptionDom = document.querySelector("#controls-description");
        this.#canvas = document.querySelector("canvas");
        this.#context = canvas.getContext("2d");

        this.#controlsDescriptionDom.innerText = "↑↓:カーソル移動 X:決定 Z:戻る";

        this.#uekibatiLImage = await loadImage("assets/植木鉢くんL.png");
        this.#ballImage = await loadImage("assets/バレーボールくん.png");

        this.#timer = setInterval(() => {
            this.#update();
        }, 1000 / 60);
    }

    onEnd() {
        clearInterval(this.#timer);
        this.#controlsDescriptionDom.innerText = "";
    }

    #update() {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        const lineHeight = 3;
        this.#context.fillStyle = "#000000";
        this.#context.rect(0, this.#canvas.height * 1/3 - lineHeight, this.#canvas.width, lineHeight);
        this.#context.rect(0, this.#canvas.height * 2/3 - lineHeight, this.#canvas.width, lineHeight);
        this.#context.rect(0, this.#canvas.height * 3/3 - lineHeight, this.#canvas.width, lineHeight);
        this.#context.fill();

        const uekbtHeight = (this.#canvas.height * 1/3 - lineHeight) * 0.7;
        const uekbtWidth = this.#uekibatiLImage.naturalWidth / this.#uekibatiLImage.naturalHeight * uekbtHeight;
        const imageMarginX = 50;
        const imageMarginY = this.#canvas.height * 1/3 - lineHeight - uekbtHeight;
        const leftImageX = this.#canvas.width - uekbtWidth - imageMarginX;
        this.#context.drawImage(this.#uekibatiLImage, leftImageX, imageMarginY, uekbtWidth, uekbtHeight);
        this.#context.drawImage(this.#uekibatiLImage, leftImageX, this.#canvas.height * 1/3 + imageMarginY, uekbtWidth, uekbtHeight);
        this.#context.drawImage(this.#uekibatiLImage, leftImageX, this.#canvas.height * 2/3 + imageMarginY, uekbtWidth, uekbtHeight);

        // ボール回転
        const ballWidth = uekbtHeight;
        const ballHeight = uekbtHeight;
        this.#context.translate(ballWidth/2 + imageMarginX, ballHeight/2 + imageMarginY);
        this.#context.rotate(this.#ballRadian);
        this.#context.drawImage(this.#ballImage, -ballWidth/2, -ballHeight/2, ballWidth, ballHeight);
        this.#context.rotate(-this.#ballRadian);
        this.#context.translate(-ballWidth/2 - imageMarginX, -ballHeight/2 - imageMarginY);
        this.#ballRadian -= 0.1;

        this.#context.font = "20px sans-serif";
        this.#context.fillStyle = "#000000";
        this.#context.strokeStyle = "#FFFFFF";
        this.#context.lineWidth = 5;
        drawStrokeText(this.#context, "決定(Xキー) 戻る(Zキー)", lineHeight, 10);
    }

    onKeyDown(e) {
        if (e.repeat) {
            e.preventDefault();
            return;
        }

        switch (e.key) {
            case "ArrowUp": {
                e.preventDefault();
                // todo
                break;
            }
            case "ArrowDown": {
                e.preventDefault();
                // todo
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
