
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
                bp(new Block(2310, 290, 30, 210));
                bp(new Block(2180, 300, 30, 200));
                bp(new Block(2050, 310, 30, 190));
                bp(new Block(1920, 320, 30, 180));
                bp(new Block(1790, 330, 30, 170));
                bp(new Block(1660, 340, 30, 160));
                bp(new Block(1530, 350, 30, 150));
                bp(new Block(1400, 360, 30, 140));
                bp(new Block(1270, 370, 30, 130));
                bp(new Block(1140, 380, 30, 120));
                bp(new Block(1010, 390, 30, 110));
                bp(new Block(880, 400, 30, 100));
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
                bp(new Block(2340, 470, 350, 30));
                player = new Player(20, 430);
                break;
            }
            // ワイヤー系 確認
            case "debug10": {
                worldHeight = 510;
                bp(new Block(0, 0, 5330, 30));
                bp(new Block(140, 30, 5190, 10));
                bp(new Block(280, 40, 5050, 10));
                bp(new Block(420, 50, 4910, 10));
                bp(new Block(560, 60, 4770, 10));
                bp(new Block(700, 70, 4630, 10));
                bp(new Block(840, 80, 4490, 10));
                bp(new Block(980, 90, 4350, 10));
                bp(new Block(1120, 100, 4210, 10));
                bp(new Block(1260, 110, 4070, 10));
                bp(new Block(1400, 120, 3930, 10));
                bp(new Block(1540, 130, 3790, 10));
                bp(new Block(1680, 140, 3650, 10));
                bp(new Block(1820, 150, 3510, 10));
                bp(new Block(1960, 160, 3370, 10));
                bp(new Block(2100, 170, 3230, 10));
                bp(new Block(2240, 180, 3090, 10));
                bp(new Block(2380, 190, 2950, 10));
                bp(new Block(2520, 200, 2810, 10));
                bp(new Block(2660, 210, 2670, 10));
                bp(new Block(2800, 220, 2530, 10));
                bp(new Block(2940, 230, 2390, 10));
                bp(new Block(3080, 240, 2250, 10));
                bp(new Block(3220, 250, 2110, 10));
                bp(new Block(3360, 260, 1970, 10));
                bp(new Block(3500, 270, 1830, 10));
                bp(new Block(3640, 280, 1690, 10));
                bp(new Block(3780, 290, 1550, 10));
                bp(new Block(3920, 300, 1410, 10));
                bp(new Block(4060, 310, 1270, 10));
                bp(new Block(4200, 320, 1130, 10));
                bp(new Block(4340, 330, 990, 10));
                bp(new Block(4480, 340, 850, 10));
                bp(new Block(4620, 350, 710, 10));
                bp(new Block(4760, 360, 570, 10));
                bp(new Block(4900, 370, 430, 10));
                bp(new Block(5040, 380, 290, 10));
                bp(new Block(5180, 390, 150, 10));
                bp(new Block(0, 480, 5330, 30));
                player = new Player(40, 440);
                break;
            }
            // 壁ジャンもどき
            case "debug11": {
                worldHeight = 660;
                bp(new Block(0, 0, 20, 660));
                bp(new UnstickableBlock(20, 0, 10, 110));
                bp(new Block(20, 110, 10, 150));
                bp(new Block(150, 110, 340, 30));
                bp(new Block(150, 140, 30, 50));
                bp(new UnstickableBlock(150, 190, 10, 70));
                bp(new Block(160, 190, 20, 350));
                bp(new UnstickableBlock(20, 260, 10, 70));
                bp(new Block(150, 260, 10, 70));
                bp(new Block(20, 330, 10, 70));
                bp(new UnstickableBlock(150, 330, 10, 70));
                bp(new UnstickableBlock(20, 400, 10, 70));
                bp(new Block(150, 400, 10, 70));
                bp(new Block(20, 470, 10, 190));
                bp(new UnstickableBlock(150, 470, 10, 70));
                bp(new Block(30, 630, 750, 30));
                player = new Player(70, 590);
                break;
            }
            // 難しい
            case "hard": {
                worldHeight = 1560;
                bp(new UnstickableBlock(1120, 150, 40, 290));
                bp(new DeathBlock(1160, 150, 90, 40));
                bp(new UnstickableBlock(1250, 150, 40, 350));
                bp(new Block(1290, 150, 220, 40));
                bp(new DeathBlock(1510, 150, 730, 40));
                bp(new DeathBlock(2200, 190, 40, 240));
                bp(new RespawnArea(1380, 200, 50, 50));
                bp(new Block(470, 230, 430, 40));
                bp(new DeathBlock(900, 230, 90, 40));
                bp(new Block(990, 230, 40, 40));
                bp(new Block(1380, 260, 20, 620));
                bp(new UnstickableBlock(1400, 260, 640, 40));
                bp(new Block(2040, 260, 50, 20));
                bp(new UnstickableBlock(2090, 260, 20, 40));
                bp(new Block(470, 270, 40, 520));
                bp(new UnstickableBlock(730, 270, 40, 250));
                bp(new UnstickableBlock(860, 270, 40, 30));
                bp(new UnstickableBlock(990, 270, 40, 150));
                bp(new UnstickableBlock(2040, 280, 50, 20));
                bp(new DeathBlock(1400, 300, 20, 580));
                bp(new Block(600, 340, 20, 540));
                bp(new UnstickableBlock(620, 340, 20, 520));
                bp(new UnstickableBlock(860, 350, 40, 510));
                bp(new UnstickableBlock(1510, 390, 20, 40));
                bp(new Block(1530, 390, 50, 20));
                bp(new UnstickableBlock(1580, 390, 460, 40));
                bp(new DeathBlock(2040, 390, 160, 40));
                bp(new UnstickableBlock(1530, 410, 50, 20));
                bp(new Block(990, 420, 20, 60));
                bp(new UnstickableBlock(1010, 420, 20, 60));
                bp(new DeathBlock(1910, 430, 50, 150));
                bp(new Block(1030, 440, 110, 40));
                bp(new UnstickableBlock(1140, 440, 20, 370));
                bp(new Block(1120, 480, 20, 330));
                bp(new Block(1250, 500, 40, 80));
                bp(new DeathBlock(1420, 520, 160, 360));
                bp(new UnstickableBlock(1580, 520, 150, 40));
                bp(new Block(0, 530, 470, 40));
                bp(new UnstickableBlock(990, 530, 40, 330));
                bp(new UnstickableBlock(1960, 540, 810, 40));
                bp(new DeathBlock(1580, 560, 100, 320));
                bp(new Block(0, 570, 40, 990));
                bp(new Block(180, 570, 70, 220));
                bp(new UnstickableBlock(730, 570, 40, 290));
                bp(new Block(1910, 580, 50, 50));
                bp(new DeathBlock(2730, 580, 40, 280));
                bp(new Block(340, 640, 40, 240));
                bp(new UnstickableBlock(1250, 640, 40, 220));
                bp(new RespawnArea(190, 800, 50, 50));
                bp(new Block(180, 860, 160, 20));
                bp(new DeathBlock(380, 860, 90, 20));
                bp(new Block(470, 860, 130, 20));
                bp(new Block(620, 860, 20, 20));
                bp(new DeathBlock(640, 860, 90, 20));
                bp(new Block(730, 860, 40, 20));
                bp(new Trampoline(770, 860, 90, 20));
                bp(new Block(860, 860, 40, 40));
                bp(new Trampoline(900, 860, 90, 20));
                bp(new Block(990, 860, 170, 20));
                bp(new Trampoline(1160, 860, 90, 20));
                bp(new Block(1250, 860, 40, 40));
                bp(new Trampoline(1290, 860, 90, 20));
                bp(new DeathBlock(1680, 860, 640, 20));
                bp(new UnstickableBlock(2320, 860, 320, 40));
                bp(new UnstickableBlock(2730, 860, 40, 590));
                bp(new UnstickableBlock(180, 880, 70, 20));
                bp(new Block(250, 880, 50, 20));
                bp(new UnstickableBlock(300, 880, 190, 20));
                bp(new Block(490, 880, 90, 20));
                bp(new UnstickableBlock(580, 880, 180, 20));
                bp(new Block(760, 880, 100, 20));
                bp(new Block(900, 880, 30, 20));
                bp(new UnstickableBlock(930, 880, 180, 20));
                bp(new Block(1110, 880, 140, 20));
                bp(new Block(1290, 880, 90, 20));
                bp(new UnstickableBlock(1380, 880, 180, 20));
                bp(new Block(1560, 880, 430, 20));
                bp(new UnstickableBlock(1990, 880, 20, 680));
                bp(new DeathBlock(2010, 880, 310, 20));
                bp(new Block(1680, 900, 40, 220));
                bp(new Block(1970, 900, 20, 660));
                bp(new RespawnArea(2660, 910, 50, 50));
                bp(new Block(2340, 950, 50, 50));
                bp(new UnstickableBlock(180, 980, 40, 210));
                bp(new Block(1790, 1020, 40, 210));
                bp(new Block(2060, 1100, 50, 50));
                bp(new Block(2660, 1100, 50, 50));
                bp(new RespawnArea(1730, 1130, 50, 50));
                bp(new Trampoline(40, 1190, 140, 20));
                bp(new Block(180, 1190, 40, 40));
                bp(new DeathBlock(220, 1190, 1340, 20));
                bp(new Block(1560, 1190, 230, 40));
                bp(new Block(40, 1210, 140, 20));
                bp(new Block(220, 1210, 1340, 20));
                bp(new DeathBlock(2220, 1230, 510, 20));
                bp(new DeathBlock(2220, 1250, 40, 20));
                bp(new Block(2260, 1250, 470, 20));
                bp(new Block(1790, 1380, 40, 180));
                bp(new RespawnArea(2780, 1460, 50, 50));
                bp(new Block(230, 1480, 130, 80));
                bp(new Block(610, 1480, 190, 80));
                bp(new Block(40, 1520, 190, 40));
                bp(new DeathBlock(360, 1520, 250, 40));
                bp(new DeathBlock(800, 1520, 990, 40));
                bp(new Trampoline(1830, 1520, 140, 40));
                bp(new DeathBlock(2010, 1520, 720, 40));
                bp(new Block(2730, 1520, 440, 40));
                player = new Player(80, 1480);
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
        blockList.sort((a, b) => {
            if (a.constructor.name === "Trampoline") {
                return -1;
            }
            if (b.constructor.name === "Trampoline") {
                return 1;
            }
            return 0;
        });
    }
}
