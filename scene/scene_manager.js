
class SceneManager {
    static #scene = null;

    static start(scene) {
        if (scene === null) {
            throw new Error("Sceneが未指定");
        }

        const onKeyDown = e => {
            this.#scene.onKeyDown(e)
        };
        const onKeyUp = e => {
            this.#scene.onKeyUp(e)
        };

        if (this.#scene !== null) {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
        }

        this.#scene = scene;
        this.#scene.onStart();

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
    }
}
