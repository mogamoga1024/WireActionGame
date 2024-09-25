
class ImageStorage {
    static #dic = {};
    
    static async create(imageDic) {
        const promises = Object.entries(imageDic).map(async ([key, path]) => {
            const image = await loadImage(path);
            this.#dic[key] = image;
        });
        await Promise.all(promises);
    }

    static get(key) {
        return this.#dic[key];
    }
}
