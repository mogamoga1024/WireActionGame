
class Viewport {
    #x = 0;
    #y = 0;
    #width = 0;
    #height = 0;
    #globalWidth = 0;
    #globalHeight = 0;
    #player = null;

    constructor(viewportX, viewportY, viewportWidth, viewportHeight, globalWidth, globalHeight, player) {
        this.#x = viewportX;
        this.#y = viewportY;
        this.#width = viewportWidth;
        this.#height = viewportHeight;
        this.#globalWidth = globalWidth;
        this.#globalHeight = globalHeight;
        this.#player = player;
    }
}
