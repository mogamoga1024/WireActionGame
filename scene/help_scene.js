
class HelpScene extends Scene {
    #controlsDescriptionDom = null;
    #canvas = null;
    #context = null;
    #uekibatiLImage = null;
    #hananasiUekibatiLImage = null;

    async onStart() {
        this.#controlsDescriptionDom = document.querySelector("#controls-description");
        this.#canvas = document.querySelector("canvas");
        this.#context = canvas.getContext("2d");

        this.#controlsDescriptionDom.innerText = "↑↓:カーソル移動 X:決定 Z:戻る";

        this.#uekibatiLImage = await loadImage("assets/植木鉢くんL.png");
        this.#hananasiUekibatiLImage = await loadImage("assets/花無し植木鉢くんL.png");

        this.#update();
    }

    onEnd() {
        this.#controlsDescriptionDom.innerText = "";
    }

    #update() {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        // todo

        const lineHeight = 3;
        this.#context.fillStyle = "#000000";
        this.#context.rect(0, this.#canvas.height * 1/3 - lineHeight, this.#canvas.width, lineHeight);
        this.#context.rect(0, this.#canvas.height * 2/3 - lineHeight, this.#canvas.width, lineHeight);
        this.#context.rect(0, this.#canvas.height * 3/3 - lineHeight, this.#canvas.width, lineHeight);
        this.#context.fill();

        const imageHeight = (this.#canvas.height * 1/3 - lineHeight) * 0.7;
        const imageWidth = this.#uekibatiRImage.naturalWidth / this.#uekibatiRImage.naturalHeight * imageHeight;
        const imageMarginX = 50;
        const imageMarginY = this.#canvas.height * 1/3 - lineHeight - imageHeight;
        const leftImageX = this.#canvas.width - imageWidth - imageMarginX;
        this.#context.drawImage(this.#uekibatiRImage, imageMarginX, imageMarginY, imageWidth, imageHeight);
        this.#context.drawImage(this.#hananasiUekibatiRImage, imageMarginX, this.#canvas.height * 1/3 + imageMarginY, imageWidth, imageHeight);
        this.#context.drawImage(this.#hananasiUekibatiRImage, imageMarginX, this.#canvas.height * 2/3 + imageMarginY, imageWidth, imageHeight);
        this.#context.drawImage(this.#uekibatiLImage, leftImageX, imageMarginY, imageWidth, imageHeight);
        this.#context.drawImage(this.#hananasiUekibatiLImage, leftImageX, this.#canvas.height * 1/3 + imageMarginY, imageWidth, imageHeight);
        this.#context.drawImage(this.#hananasiUekibatiLImage, leftImageX, this.#canvas.height * 2/3 + imageMarginY, imageWidth, imageHeight);

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
