
function createMap(name) {
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
            return {player, blockList};
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
            return {player, blockList};
        }
        default:
            throw new Error(`マップがない：${name}`);
    }
}


