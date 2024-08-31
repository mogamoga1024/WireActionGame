
class SceneManager {
    static #scene = null;
    static #onKeyDown = null;
    static #onKeyUp = null;

    static start(scene) {
        if (scene === null) {
            throw new Error("Sceneが未指定");
        }

        if (this.#scene !== null) {
            window.removeEventListener("keydown", this.#onKeyDown);
            window.removeEventListener("keyup", this.#onKeyUp);
            this.#scene.onEnd();
        }

        const onKeyDown = e => {
            this.#scene.onKeyDown(e)
        };
        const onKeyUp = e => {
            this.#scene.onKeyUp(e)
        };
        
        this.#onKeyDown = onkeydown;
        this.#onKeyUp = onKeyUp;

        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        this.#scene = scene;
        this.#scene.onStart();

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
    }
}
