
class Sound {
    #audio = null;
    constructor(path, volume = 1) {
        this.#audio = new Audio(path);
        this.#audio.volume = volume;
    }
    play() {
        this.#audio.pause();
        this.#audio.currentTime = 0;
        this.#audio.play();
    }
}
