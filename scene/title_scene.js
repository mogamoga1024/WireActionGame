
class TitleScene extends Scene {
    #controlsDescriptionDom = null;
    #currentMode = "saisyo";
    #respawnId = -1;
    #canvas = null;
    #context = null;

    onStart() {
        this.#controlsDescriptionDom = document.querySelector("#controls-description");
        this.#canvas = document.querySelector("canvas");
        this.#context = canvas.getContext("2d");

        const strRespawnId = Cookies.get("respaon_area_id");
        if (strRespawnId !== undefined) {
            this.#respawnId = Number(strRespawnId);
        }
        
        this.#controlsDescriptionDom.innerText = "↑↓:カーソル移動 X:決定"

        this.#update();
    }

    #textWidth(text) {
        const measure = this.#context.measureText(text);
        return measure.width;
    }

    #update() {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        {
            const titleText = "植木鉢くんの";
            this.#context.font = "48px sans-serif";
            this.#context.fillStyle = "#000000";
            const titleTextWidth = this.#textWidth(titleText);
            this.#context.fillText(titleText, (canvas.width - titleTextWidth) / 2, 128);
        }

        {
            const titleText = "苦行系ワイヤーアクション";
            this.#context.font = "48px sans-serif";
            this.#context.fillStyle = "#000000";
            const titleTextWidth = this.#textWidth(titleText);
            this.#context.fillText(titleText, (canvas.width - titleTextWidth) / 2, 192);
        }

        let saisyoText = "最初から";
        let tudukiText = "続きから";

        if (this.#currentMode === "saisyo") {
            saisyoText = `> ${saisyoText} <`;
        }
        else if (this.#currentMode === "tuduki") {
            tudukiText = `> ${tudukiText} <`;
        }
        
        this.#context.font = "32px sans-serif";
        const saisyoTextWidth = this.#textWidth(saisyoText);
        this.#context.fillText(saisyoText, (canvas.width - saisyoTextWidth) / 2, 300);

        if (this.#respawnId === -1) {
            this.#context.fillStyle = "#888888";
        }
        const tudukiTextWidth = this.#textWidth(tudukiText);
        this.#context.fillText(tudukiText, (canvas.width - tudukiTextWidth) / 2, 360);
    }

    onEnd() {
        this.#controlsDescriptionDom.innerText = "";
    }
    
    onKeyDown(e) {
        if (e.repeat) {
            return;
        }

        switch (e.key) {
            case "ArrowUp": {
                e.preventDefault();
                this.#currentMode = "saisyo";
                break;
            }
            case "ArrowDown": {
                e.preventDefault();
                if (this.#respawnId !== -1) {
                    this.#currentMode = "tuduki";
                }
                break;
            }
            case "x": {
                if (this.#currentMode === "saisyo") {
                    this.#respawnId = -1;
                }
                SceneManager.start(new GameScene(this.#respawnId));
                return;
            }
        }

        this.#update();
    }
    
    onKeyUp(e) {
        // noop
    }
}
