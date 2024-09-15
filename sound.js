
class Sound {
    #audio = null;
    constructor(audio, volume = 1) {
        this.#audio = audio;
        this.#audio.volume = volume;
    }
    play() {
        this.#audio.pause();
        this.#audio.currentTime = 0;
        this.#audio.play();
    }
}
