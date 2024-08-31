
class SceneManager {
    static #scene = null;

    static start(scene) {
        if (this.#scene !== null) {
            window.removeEventListener("keydown", this.#scene.onKeyDown);
            window.removeEventListener("keyup", this.#scene.onKeyUp);
        }

        this.#scene = scene;
        this.#scene.onStart();

        window.addEventListener("keydown", this.#scene.onKeyDown);
        window.addEventListener("keyup", this.#scene.onKeyUp);
    }
}
