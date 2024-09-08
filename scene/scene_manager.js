
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

        // todo rememberCurrentScene

        if (this.#scene !== null) {
            this.#scene.onEnd();
        }
        else {
            this.#init();
        }

        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        scene.onStart();
        this.#scene = scene;
    }

    static finish() {
        // todo
    }
}
