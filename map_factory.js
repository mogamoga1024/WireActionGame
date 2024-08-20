
class MapFactory {
    static create(name) {
        let worldHeight = 500;
        const blockList = [];
        let player = null;

        const bp = block => {
            blockList.push(block);
        }

        switch (name) {
            case "debug1": {
                bp(new Block(0, 400, 500, 100));
                bp(new Block(600, 400, 400, 100));
                bp(new Block(0, 200, 80, 200));
                bp(new Block(200, 350, 80, 50));
                bp(new Block(70, 200, 250, 30));
                bp(new Block(300, 100, 400, 30));
                bp(new Block(770, 100, 50, 300));
                player = new Player(100, 360);
                break;
            }
            // ぴょいーん ぴょいーん
            case "debug2": {
                bp(new Block(0, 400, 1600, 100));
                bp(new Block(0, 0, 50, 500));
                bp(new Block(1600 - 50, 0, 50, 500));
                bp(new Block(300, 0, 1000, 50));
                bp(new Block(200, 320, 100, 80));
                bp(new Block(1600 - 200 - 100, 320, 100, 80));
                player = new Player(100, 360);
                break;
            }
            // くっつかず
            case "debug3": {
                bp(new UnstickableBlock(100, 400, 300, 100));
                bp(new UnstickableBlock(500, 400, 300, 100));
                bp(new UnstickableBlock(300, 150, 250, 50));
                player = new Player(100, 360);
                break;
            }
            // 高い
            case "debug4": {
                worldHeight = 5000;
                const h = worldHeight;
                bp(new Block(100, h - 100, 300, 100));
                bp(new Block(500, h - 100, 300, 100));
                bp(new Block(700, h - 200, 250, 200));
                bp(new Block(300, h - 350, 250, 50));
                bp(new Block(600, h - 700, 300, 250));
                bp(new Trampoline(0, h - 100, 100, 100));
                player = new Player(120, h - 200);
                break;
            }
            default:
                throw new Error(`マップがない：${name}`);
        }

        this.#sortBlockList(blockList);
        const world = this.#createWorld(blockList, worldHeight);
        this.#addGuardBlock(blockList, world);
        return {player, blockList, world};
    }

    static #createWorld(blockList, height = 500) {
        let width = 0;
        for (const block of blockList) {
            if (width < block.x + block.width) {
                width = block.x + block.width;
            }
        }
        return {width, height};
    }

    static #addGuardBlock(blockList, world) {
        // 床
        blockList.push(new InvisibleBlock(0, world.height, world.width, 30));
        // 左
        blockList.push(new InvisibleBlock(-30, 0, 30, world.height));
        // 右
        blockList.push(new InvisibleBlock(world.width, 0, 30, world.height));
    }

    static #sortBlockList(blockList) {
        blockList.sort((a, b) => {
            if (a.constructor.name === "Trampoline") {
                return -1;
            }
            else if (b.constructor.name === "Trampoline") {
                return 1;
            }
            return 0;
        });
    }
}
