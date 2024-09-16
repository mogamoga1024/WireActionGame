
class Sound {
    #audio = null;
    constructor(audio, volume = 1) {
        this.#audio = audio;
        this.#audio.volume = volume;
    }
    play() {
        this.reset();
        this.#audio.play();
    }
    reset() {
        if (!this.#audio.paused) {
            this.#audio.pause();
        }
        this.#audio.currentTime = 0;
    }
}
