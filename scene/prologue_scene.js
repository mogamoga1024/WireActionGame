
class PrologueScene extends Scene {
    onStart() {
        // todo
    }
    
    onEnd() {
        // todo
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
