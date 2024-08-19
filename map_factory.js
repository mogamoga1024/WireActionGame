
class MapFactory {
    static create(name) {
        switch (name) {
            case "debug1": {
                const block1 = new Block(0, 400, 500, 100);
                const block2 = new Block(600, 400, 400, 100);
                const block3 = new Block(0, 200, 80, 200);
                const block4 = new Block(200, 350, 80, 50);
                const block5 = new Block(70, 200, 250, 30);
                const block6 = new Block(300, 100, 400, 30);
                const block7 = new Block(770, 100, 50, 300);
                const blockList = [block1, block2, block3, block4, block5, block6, block7];
                const player = new Player(100, 360);
                const world = this.#createWorld(blockList);
                this.#addGuardBlock(blockList, world);
                return {player, blockList, world};
            }
            case "debug2": {
                const block1 = new Block(0, 400, 1600, 100);
                const block2 = new Block(0, 0, 50, 500);
                const block3 = new Block(1600 - 50, 0, 50, 500);
                const block4 = new Block(300, 0, 1000, 50);
                const block5 = new Block(200, 320, 100, 80);
                const block6 = new Block(1600 - 200 - 100, 320, 100, 80);
                const blockList = [block1, block2, block3, block4, block5, block6];
                const player = new Player(100, 360);
                const world = this.#createWorld(blockList);
                this.#addGuardBlock(blockList, world);
                return {player, blockList, world};
            }
            case "debug3": {
                const block1 = new UnstickableBlock(100, 400, 300, 100);
                const block2 = new UnstickableBlock(500, 400, 300, 100);
                const block3 = new UnstickableBlock(300, 150, 250, 50);
                const blockList = [block1, block2, block3];
                const player = new Player(100, 360);
                const world = this.#createWorld(blockList);
                this.#addGuardBlock(blockList, world);
                return {player, blockList, world};
            }
            default:
                throw new Error(`マップがない：${name}`);
        }
    }

    static #createWorld(blockList) {
        let width = 0;
        for (const block of blockList) {
            if (width < block.x + block.width) {
                width = block.x + block.width;
            }
        }
        return {width, height: 500};
    }

    static #addGuardBlock(blockList, world) {
        // 床
        blockList.push(new InvisibleBlock(0, world.height, world.width, 30));
        // 左
        blockList.push(new InvisibleBlock(-30, 0, 30, world.height));
        // 右
        blockList.push(new InvisibleBlock(world.width, 0, 30, world.height));
    }
}
