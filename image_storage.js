
class ImageStorage {
    static #dic = {};
    
    static async create(imageDic) {
        const promises = Object.entries(imageDic).map(async ([name, path]) => {
            const image = await loadImage(path);
            this.#dic[name] = image;
        });
        await Promise.all(promises);
    }

    static get(name) {
        return this.#dic[name];
    }
}
