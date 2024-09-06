
class Sound {
    #audio = null;
    constructor(path) {
        this.#audio = new Audio(path);
    }
    play() {
        this.#audio.pause();
        this.#audio.currentTime = 0;
        this.#audio.play();
    }
}
