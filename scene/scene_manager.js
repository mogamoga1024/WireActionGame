
class SceneManager {
    static #scene = null;

    static #init() {
        window.addEventListener("keydown", e => {
            this.#scene?.onKeyDown(e)
        });
        window.addEventListener("keyup", e => {
            this.#scene?.onKeyUp(e)
        });
    }

    static start(scene, rememberCurrentScene = false) {
        if (scene === null) {
            throw new Error("Sceneが未指定");
        }

        if (rememberCurrentScene) {
            scene.prevScene = this.#scene;
        }

        if (this.#scene !== null) {
            if (rememberCurrentScene) {
                this.#scene.onStop();
            }
            else {
                this.#scene.onEnd();
            }
        }
        else {
            this.#init();
        }

        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawLoading(canvas);

        scene.onStart();
        this.#scene = scene;
    }

    static finish() {
        this.#scene.onEnd();
        this.#scene = this.#scene.prevScene;
        this.#scene.onResume();
    }
}
