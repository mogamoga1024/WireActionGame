
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
            // 横に長い
            // ぴょいーん ぴょいーん
            case "debug2": {
                worldHeight = 800;
                const h = worldHeight;
                bp(new Block(0, h - 100, 1600, 100));
                bp(new Block(0, h - 500, 50, h));
                bp(new Block(1600 - 50, h - 500, 50, h));
                bp(new Block(300, h - 500, 1000, 50));
                bp(new Block(200, h - 180, 100, 80));
                bp(new Block(1600 - 200 - 100, h - 180, 100, 80));
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
                worldHeight = 800;
                const h = worldHeight;
                bp(new Block(100, h - 100, 300, 100));
                bp(new Block(500, h - 100, 300, 100));
                bp(new Block(700, h - 200, 250, 200));
                bp(new Block(300, h - 350, 250, 50));
                bp(new Block(600, h - 700, 300, 250));
                bp(new Trampoline(0, h - 100, 100, 100));
                // player = new Player(120, h - 200);
                player = new Player(400, h - 500);
                // player = new Player(400, h - 200);
                break;
            }
            // フック貫通させたくない
            case "debug5": {
                const h = worldHeight;
                bp(new Block(0, h - 100, 800, 100));
                // bp(new Block(0, h - 310, 200, 1));
                bp(new Block(0, h - 323, 200, 1));
                // bp(new Block(300, h - 400, 1, 400));
                // bp(new Block(300, h - 261.3, 1, 400));
                bp(new Block(350, h - 400, 50, 400));
                player = new Player(118.5, 360);
                break;
            }
            // 自動生成のテスト
            case "debug6": {
                worldHeight = 520;
                bp(new Block(200, 160, 80, 40));
                bp(new Block(360, 160, 80, 40));
                bp(new Block(520, 160, 80, 40));
                bp(new Block(680, 160, 80, 40));
                bp(new Block(840, 160, 80, 40));
                bp(new Block(120, 280, 80, 40));
                bp(new Block(280, 280, 80, 40));
                bp(new Block(440, 280, 80, 40));
                bp(new Block(600, 280, 80, 40));
                bp(new Block(760, 280, 80, 40));
                bp(new Block(1000, 320, 40, 200));
                bp(new Block(960, 360, 40, 160));
                bp(new Block(0, 400, 40, 120));
                bp(new DeathBlock(880, 400, 40, 80));
                bp(new Block(920, 400, 40, 120));
                bp(new Block(40, 440, 40, 80));
                bp(new Trampoline(80, 440, 40, 40));
                bp(new Block(80, 480, 840, 40));
                player = new Player(160, 440);
                break;
            }
            // くっつかずの動確
            case "debug7": {
                worldHeight = 520;
                bp(new UnstickableBlock(0, 320, 120, 40));
                bp(new Block(120, 320, 120, 40));
                bp(new UnstickableBlock(240, 320, 120, 40));
                bp(new Block(0, 480, 360, 40));
                player = new Player(40, 440);
                break;
            }
            // 死のブロック 動確
            case "debug8": {
                worldHeight = 520;
                bp(new Block(120, 280, 200, 40));
                bp(new DeathBlock(440, 360, 40, 40));
                bp(new Block(0, 480, 160, 40));
                bp(new DeathBlock(160, 480, 120, 40));
                bp(new Block(280, 480, 280, 40));
                bp(new RespawnArea(40, 360, 40, 40));
                player = new Player(40, 440);
                break;
            }
            // ジャンプの高さ確認
            case "debug9": {
                worldHeight = 500;
                bp(new Block(2440, 290, 30, 210));
                bp(new Block(2310, 300, 30, 200));
                bp(new Block(2180, 310, 30, 190));
                bp(new Block(2050, 320, 30, 180));
                bp(new Block(1920, 330, 30, 170));
                bp(new Block(1790, 340, 30, 160));
                bp(new Block(1660, 350, 30, 150));
                bp(new Block(1530, 360, 30, 140));
                bp(new Block(1400, 370, 30, 130));
                bp(new Block(1270, 380, 30, 120));
                bp(new Block(1140, 390, 30, 110));
                bp(new Block(880, 400, 30, 100));
                bp(new Block(1010, 400, 30, 100));
                bp(new Block(750, 410, 30, 90));
                bp(new Block(620, 420, 30, 80));
                bp(new Block(490, 430, 30, 70));
                bp(new Block(360, 440, 30, 60));
                bp(new Block(230, 450, 30, 50));
                bp(new Block(100, 460, 30, 40));
                bp(new Block(0, 470, 100, 30));
                bp(new Block(130, 470, 100, 30));
                bp(new Block(260, 470, 100, 30));
                bp(new Block(390, 470, 100, 30));
                bp(new Block(520, 470, 100, 30));
                bp(new Block(650, 470, 100, 30));
                bp(new Block(780, 470, 100, 30));
                bp(new Block(910, 470, 100, 30));
                bp(new Block(1040, 470, 100, 30));
                bp(new Block(1170, 470, 100, 30));
                bp(new Block(1300, 470, 100, 30));
                bp(new Block(1430, 470, 100, 30));
                bp(new Block(1560, 470, 100, 30));
                bp(new Block(1690, 470, 100, 30));
                bp(new Block(1820, 470, 100, 30));
                bp(new Block(1950, 470, 100, 30));
                bp(new Block(2080, 470, 100, 30));
                bp(new Block(2210, 470, 100, 30));
                bp(new Block(2340, 470, 100, 30));
                bp(new Block(2470, 470, 350, 30));
                player = new Player(20, 430);
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
        // 天井
        blockList.push(new InvisibleBlock(0, -30, world.width, 30));
        // 左
        blockList.push(new InvisibleBlock(-30, 0, 30, world.height));
        // 右
        blockList.push(new InvisibleBlock(world.width, 0, 30, world.height));
    }

    static #sortBlockList(blockList) {
        // Trampolineは先頭
        // くっつかない系のブロックは後ろ
        blockList.sort((a, b) => {
            if (a.constructor.name === "Trampoline") {
                return -1;
            }
            if (b.constructor.name === "Trampoline") {
                return 1;
            }
            if (a.canStick) {
                return -1;
            }
            if (b.canStick) {
                return 1;
            }
            return 0;
        });
    }
}
