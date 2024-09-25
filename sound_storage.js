
class SoundStorage {
    static #dic = {};

    static async create(soundKeyList) {
        const promises = soundKeyList.map(async key => {
            const sound = await loadSound(key);
            this.#dic[key] = sound;
        });
        await Promise.all(promises);
    }

    static get(key) {
        return this.#dic[key];
    }
}
