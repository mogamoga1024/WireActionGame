
class PrologueScene extends Scene {
    onStart() {
        controlsDescriptionDom.innerText = "←:前へ →:次へ Z:プロローグ終了";
        // todo
    }
    
    onEnd() {
        // noop
    }

    onKeyDown(e) {
        if (e.repeat) {
            e.preventDefault();
            return;
        }

        switch (e.key) {
            case "ArrowLeft": {
                e.preventDefault();
                // todo
                return;
            }
            case "ArrowRight": case "x": {
                e.preventDefault();
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
