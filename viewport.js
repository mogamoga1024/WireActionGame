
class Viewport {
    #globalX = 0;
    #globalY = 0;
    #width = 0;
    #height = 0;
    #globalWidth = 0;
    #globalHeight = 0;
    #player = null;

    constructor(globalX, globalY, viewportWidth, viewportHeight, globalWidth, globalHeight, player) {
        this.#globalX = globalX;
        this.#globalY = globalY;
        this.#width = viewportWidth;
        this.#height = viewportHeight;
        this.#globalWidth = globalWidth;
        this.#globalHeight = globalHeight;
        this.#player = player;
    }

    get offsetX() {

    }

    get offsetY() {
        
    }
}
