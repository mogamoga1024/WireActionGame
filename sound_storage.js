
class SoundStorage {
    static #dic = {};

    static async create(soundDic) {
        const promises = Object.entries(soundDic).map(async ([name, {path, volume}]) => {
            const sound = await loadSound(path, volume);
            this.#dic[name] = sound;
        });
        await Promise.all(promises);
    }

    static get(name) {
        return this.#dic[name];
    }
}
