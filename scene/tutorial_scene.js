
class TutorialScene extends Scene {
    #controlsDescriptionDom = null;

    onStart() {
        this.#controlsDescriptionDom = document.querySelector("#controls-description");
        this.#controlsDescriptionDom.innerText = "←:前へ →:次へ Z:説明終了";

        // todo
    }

    onEnd() {
        this.#controlsDescriptionDom.innerText = "";
    }
    
    onKeyDown(e) {
        if (e.repeat) {
            e.preventDefault();
            return;
        }

        switch (e.key) {
            case "ArrowLeft": {
                e.preventDefault();
                // todo 前へ
                break;
            }
            case "ArrowRight": {
                e.preventDefault();
                // todo 次へ
                break;
            }
            case "x": {
                // todo 次へ
                return;
            }
            case "z": {
                SceneManager.finish();
                return;
            }
        }
    }
}
