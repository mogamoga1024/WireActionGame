
class IDObject {
    static #nextId = 1;
    #id = 0;
    get id() {
        return this.#id;
    }

    constructor() {
        this.#id = IDObject.#nextId++;
    }
}
