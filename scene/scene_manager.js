
class SceneManager {
    static #scene = null;
    static get sceneName() {
        if (this.#scene === null) {
            return "";
        }
        return this.#scene.constructor.name;
    }

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

        context.clearRect(0, 0, canvas.width, canvas.height);
        drawLoading();

        scene.onStart();
        this.#scene = scene;
    }

    static finish() {
        this.#scene.onEnd();
        this.#scene = this.#scene.prevScene;
        this.#scene.onResume();
    }
}
