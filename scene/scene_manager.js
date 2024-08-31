
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
        }

        const onKeyDown = e => {
            this.#scene.onKeyDown(e)
        };
        const onKeyUp = e => {
            this.#scene.onKeyUp(e)
        };
        
        this.#onKeyDown = onkeydown;
        this.#onKeyUp = onKeyUp;

        this.#scene = scene;
        this.#scene.onStart();

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
    }
}
