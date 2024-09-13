
class ImageStorage {
    static #dic = {};
    
    static async create(imageDic) {
        // todo promise.all
        for (let [name, path] of Object.entries(imageDic)) {
            const image = await loadImage(path);
            this.#dic[name] = image;
        }
    }

    static get(name) {
        return this.#dic[name];
    }
}
