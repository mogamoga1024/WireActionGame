
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
            // フックバグ 調査
            case "debug12": {
                worldHeight = 500;
                bp(new Block(50, 280, 120, 20));
                bp(new DeathBlock(240, 280, 120, 20));
                bp(new Block(470, 280, 40, 20));
                bp(new DeathBlock(50, 300, 120, 20));
                bp(new Block(240, 300, 120, 20));
                bp(new DeathBlock(470, 300, 20, 180));
                bp(new Block(490, 300, 20, 200));
                bp(new Block(0, 480, 490, 20));
                bp(new Block(510, 480, 200, 20));
                player = new Player(20, 430);
                break;
            }
            // 難しい
            case "hard": {
                worldHeight = 1700;
                bp(new UnstickableBlock(6280, 0, 40, 1430));
                bp(new UnstickableBlock(4570, 70, 300, 40));
                bp(new DeathBlock(5050, 70, 180, 20));
                bp(new Block(5050, 90, 180, 20));
                bp(new Block(4570, 110, 40, 140));
                bp(new DeathBlock(5390, 110, 180, 20));
                bp(new DeathBlock(5730, 110, 180, 20));
                bp(new Block(5390, 130, 180, 20));
                bp(new Block(5730, 130, 180, 20));
                bp(new RespawnArea(4740, 150, 50, 50));
                bp(new DeathBlock(6050, 160, 180, 20));
                bp(new Block(6050, 180, 180, 20));
                bp(new Block(4530, 210, 40, 170));
                bp(new UnstickableBlock(4720, 210, 150, 40));
                bp(new UnstickableBlock(4720, 250, 40, 1450));
                bp(new UnstickableBlock(1120, 290, 40, 290));
                bp(new DeathBlock(1160, 290, 90, 40));
                bp(new UnstickableBlock(1250, 290, 40, 350));
                bp(new Block(1290, 290, 220, 40));
                bp(new DeathBlock(1510, 290, 730, 40));
                bp(new DeathBlock(2200, 330, 40, 240));
                bp(new RespawnArea(1380, 340, 50, 50));
                bp(new Block(4490, 340, 40, 170));
                bp(new Block(470, 370, 430, 40));
                bp(new DeathBlock(900, 370, 90, 40));
                bp(new Block(990, 370, 40, 40));
                bp(new Block(1380, 400, 20, 620));
                bp(new UnstickableBlock(1400, 400, 640, 40));
                bp(new Block(2040, 400, 50, 20));
                bp(new UnstickableBlock(2090, 400, 20, 40));
                bp(new Block(470, 410, 40, 520));
                bp(new UnstickableBlock(730, 410, 40, 250));
                bp(new UnstickableBlock(860, 410, 40, 30));
                bp(new UnstickableBlock(990, 410, 40, 150));
                bp(new DeathBlock(5820, 410, 180, 20));
                bp(new UnstickableBlock(2040, 420, 50, 20));
                bp(new Block(5820, 430, 180, 20));
                bp(new DeathBlock(1400, 440, 20, 580));
                bp(new DeathBlock(5500, 440, 180, 20));
                bp(new Block(5500, 460, 180, 20));
                bp(new Block(4450, 470, 40, 170));
                bp(new Block(600, 480, 20, 540));
                bp(new UnstickableBlock(620, 480, 20, 520));
                bp(new UnstickableBlock(860, 490, 40, 510));
                bp(new UnstickableBlock(1510, 530, 20, 40));
                bp(new Block(1530, 530, 50, 20));
                bp(new UnstickableBlock(1580, 530, 460, 40));
                bp(new DeathBlock(2040, 530, 160, 40));
                bp(new DeathBlock(5140, 540, 180, 20));
                bp(new UnstickableBlock(1530, 550, 50, 20));
                bp(new Block(990, 560, 20, 60));
                bp(new UnstickableBlock(1010, 560, 20, 60));
                bp(new Block(5140, 560, 180, 20));
                bp(new DeathBlock(1910, 570, 50, 150));
                bp(new Block(1030, 580, 110, 40));
                bp(new UnstickableBlock(1140, 580, 20, 370));
                bp(new Block(4410, 600, 40, 230));
                bp(new Block(1120, 620, 20, 330));
                bp(new DeathBlock(4810, 620, 180, 20));
                bp(new Block(1250, 640, 40, 80));
                bp(new Block(4810, 640, 180, 20));
                bp(new DeathBlock(1420, 660, 160, 360));
                bp(new UnstickableBlock(1580, 660, 150, 40));
                bp(new Block(0, 670, 470, 40));
                bp(new UnstickableBlock(990, 670, 40, 330));
                bp(new UnstickableBlock(1960, 680, 810, 40));
                bp(new DeathBlock(1580, 700, 100, 320));
                bp(new Block(0, 710, 40, 990));
                bp(new Block(180, 710, 70, 220));
                bp(new UnstickableBlock(730, 710, 40, 290));
                bp(new Block(1910, 720, 50, 50));
                bp(new DeathBlock(2730, 720, 40, 280));
                bp(new Block(340, 780, 40, 240));
                bp(new UnstickableBlock(1250, 780, 40, 220));
                bp(new Block(4370, 790, 40, 230));
                bp(new DeathBlock(5410, 850, 180, 20));
                bp(new DeathBlock(5040, 860, 180, 20));
                bp(new Block(5410, 870, 180, 20));
                bp(new DeathBlock(5860, 870, 180, 20));
                bp(new Block(5040, 880, 180, 20));
                bp(new Block(5860, 890, 180, 20));
                bp(new RespawnArea(190, 940, 50, 50));
                bp(new Block(4330, 980, 40, 190));
                bp(new Block(180, 1000, 160, 20));
                bp(new DeathBlock(380, 1000, 90, 20));
                bp(new Block(470, 1000, 130, 20));
                bp(new Block(620, 1000, 20, 20));
                bp(new DeathBlock(640, 1000, 90, 20));
                bp(new Block(730, 1000, 40, 20));
                bp(new Trampoline(770, 1000, 90, 20));
                bp(new Block(860, 1000, 40, 40));
                bp(new Trampoline(900, 1000, 90, 20));
                bp(new Block(990, 1000, 170, 20));
                bp(new Trampoline(1160, 1000, 90, 20));
                bp(new Block(1250, 1000, 40, 40));
                bp(new Trampoline(1290, 1000, 90, 20));
                bp(new DeathBlock(1680, 1000, 640, 20));
                bp(new UnstickableBlock(2320, 1000, 320, 40));
                bp(new UnstickableBlock(2730, 1000, 40, 590));
                bp(new UnstickableBlock(180, 1020, 70, 20));
                bp(new Block(250, 1020, 50, 20));
                bp(new UnstickableBlock(300, 1020, 190, 20));
                bp(new Block(490, 1020, 90, 20));
                bp(new UnstickableBlock(580, 1020, 180, 20));
                bp(new Block(760, 1020, 100, 20));
                bp(new Block(900, 1020, 30, 20));
                bp(new UnstickableBlock(930, 1020, 180, 20));
                bp(new Block(1110, 1020, 140, 20));
                bp(new Block(1290, 1020, 90, 20));
                bp(new UnstickableBlock(1380, 1020, 180, 20));
                bp(new Block(1560, 1020, 430, 20));
                bp(new UnstickableBlock(1990, 1020, 20, 680));
                bp(new DeathBlock(2010, 1020, 310, 20));
                bp(new Block(1680, 1040, 40, 220));
                bp(new Block(1970, 1040, 20, 660));
                bp(new RespawnArea(2660, 1050, 50, 50));
                bp(new Block(2340, 1090, 50, 50));
                bp(new UnstickableBlock(180, 1120, 40, 210));
                bp(new DeathBlock(4760, 1120, 1170, 20));
                bp(new DeathBlock(6000, 1120, 280, 40));
                bp(new Block(4260, 1130, 70, 40));
                bp(new DeathBlock(4760, 1140, 420, 20));
                bp(new Block(5180, 1140, 110, 20));
                bp(new DeathBlock(5290, 1140, 360, 20));
                bp(new Block(5650, 1140, 170, 20));
                bp(new DeathBlock(5820, 1140, 110, 20));
                bp(new UnstickableBlock(4190, 1150, 70, 40));
                bp(new Block(1790, 1160, 40, 210));
                bp(new Block(4120, 1170, 70, 40));
                bp(new RespawnArea(5940, 1170, 50, 50));
                bp(new UnstickableBlock(4050, 1190, 70, 40));
                bp(new Block(3980, 1210, 70, 40));
                bp(new UnstickableBlock(3910, 1230, 70, 40));
                bp(new Block(2060, 1240, 50, 50));
                bp(new Block(2660, 1240, 50, 50));
                bp(new Block(3840, 1250, 70, 40));
                bp(new DeathBlock(7530, 1260, 40, 310));
                bp(new RespawnArea(1730, 1270, 50, 50));
                bp(new UnstickableBlock(3770, 1270, 70, 40));
                bp(new Block(6720, 1270, 50, 50));
                bp(new Block(3700, 1290, 70, 40));
                bp(new UnstickableBlock(3630, 1310, 70, 40));
                bp(new Trampoline(40, 1330, 140, 20));
                bp(new Block(180, 1330, 40, 40));
                bp(new DeathBlock(220, 1330, 1340, 20));
                bp(new Block(1560, 1330, 230, 40));
                bp(new Block(3560, 1330, 70, 40));
                bp(new Block(40, 1350, 140, 20));
                bp(new Block(220, 1350, 1340, 20));
                bp(new UnstickableBlock(3490, 1350, 70, 40));
                bp(new DeathBlock(2220, 1370, 510, 20));
                bp(new Block(3420, 1370, 70, 40));
                bp(new DeathBlock(2220, 1390, 40, 20));
                bp(new Block(2260, 1390, 470, 20));
                bp(new UnstickableBlock(3350, 1390, 70, 40));
                bp(new Block(4860, 1390, 250, 20));
                bp(new DeathBlock(5110, 1390, 280, 40));
                bp(new Block(5390, 1390, 210, 20));
                bp(new DeathBlock(5600, 1390, 290, 40));
                bp(new Block(5890, 1390, 180, 20));
                bp(new DeathBlock(6070, 1390, 210, 40));
                bp(new Block(3280, 1410, 70, 40));
                bp(new DeathBlock(4860, 1410, 250, 20));
                bp(new DeathBlock(5390, 1410, 210, 20));
                bp(new DeathBlock(5890, 1410, 180, 20));
                bp(new UnstickableBlock(3210, 1430, 70, 40));
                bp(new Block(3140, 1450, 70, 40));
                bp(new UnstickableBlock(3070, 1470, 70, 40));
                bp(new Block(3000, 1490, 70, 40));
                bp(new UnstickableBlock(2930, 1510, 70, 40));
                bp(new Block(1790, 1520, 40, 180));
                bp(new Block(2860, 1530, 70, 40));
                bp(new Block(2770, 1550, 90, 40));
                bp(new RespawnArea(3150, 1600, 50, 50));
                bp(new Block(4920, 1600, 130, 40));
                bp(new Block(5150, 1600, 40, 40));
                bp(new Block(5290, 1600, 40, 40));
                bp(new RespawnArea(6410, 1600, 50, 50));
                bp(new Block(230, 1620, 130, 80));
                bp(new Block(610, 1620, 190, 80));
                bp(new Block(5430, 1620, 20, 20));
                bp(new Block(5550, 1620, 20, 20));
                bp(new Block(5670, 1620, 20, 20));
                bp(new Block(5790, 1620, 20, 20));
                bp(new Block(5910, 1620, 20, 20));
                bp(new Block(6030, 1620, 20, 20));
                bp(new Block(6150, 1620, 20, 20));
                bp(new Block(6270, 1620, 20, 20));
                bp(new Block(40, 1660, 190, 40));
                bp(new DeathBlock(360, 1660, 250, 40));
                bp(new DeathBlock(800, 1660, 990, 40));
                bp(new Trampoline(1830, 1660, 140, 40));
                bp(new DeathBlock(2010, 1660, 720, 40));
                bp(new Block(2730, 1660, 630, 40));
                bp(new DeathBlock(3360, 1660, 900, 40));
                bp(new Trampoline(4260, 1660, 110, 40));
                bp(new Block(4370, 1660, 240, 40));
                bp(new DeathBlock(4610, 1660, 110, 40));
                bp(new DeathBlock(4760, 1660, 1630, 40));
                bp(new Block(6390, 1660, 1350, 40));
                bp(new DeathBlock(7740, 1660, 770, 40));
                bp(new Block(8510, 1660, 630, 40));
                player = new Player(80, 1620);
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
