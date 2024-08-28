
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
                worldHeight = 1780;
                bp(new UnstickableBlock(6280, 80, 370, 40));
                bp(new UnstickableBlock(9260, 90, 70, 10));
                bp(new UnstickableBlock(9340, 90, 50, 10));
                bp(new UnstickableBlock(9400, 90, 50, 10));
                bp(new UnstickableBlock(9460, 90, 10, 80));
                bp(new UnstickableBlock(9530, 90, 10, 60));
                bp(new UnstickableBlock(9550, 90, 10, 60));
                bp(new UnstickableBlock(9260, 100, 10, 70));
                bp(new UnstickableBlock(9340, 100, 10, 70));
                bp(new UnstickableBlock(9380, 100, 10, 70));
                bp(new UnstickableBlock(9400, 100, 10, 70));
                bp(new UnstickableBlock(9440, 100, 10, 70));
                bp(new UnstickableBlock(6280, 120, 40, 330));
                bp(new DeathBlock(6790, 120, 330, 20));
                bp(new UnstickableBlock(9280, 120, 50, 10));
                bp(new UnstickableBlock(9410, 120, 30, 10));
                bp(new UnstickableBlock(9300, 130, 10, 40));
                bp(new UnstickableBlock(9320, 130, 10, 40));
                bp(new DeathBlock(6790, 140, 160, 20));
                bp(new Block(6950, 140, 170, 20));
                bp(new UnstickableBlock(4570, 150, 300, 40));
                bp(new DeathBlock(5050, 150, 180, 20));
                bp(new DeathBlock(6930, 160, 20, 280));
                bp(new Block(6950, 160, 20, 320));
                bp(new UnstickableBlock(9270, 160, 30, 10));
                bp(new UnstickableBlock(9350, 160, 30, 10));
                bp(new UnstickableBlock(9470, 160, 50, 10));
                bp(new UnstickableBlock(9530, 160, 10, 10));
                bp(new UnstickableBlock(9550, 160, 10, 10));
                bp(new Block(5050, 170, 180, 20));
                bp(new RespawnArea(9250, 180, 330, 130));
                bp(new Block(4570, 190, 40, 140));
                bp(new DeathBlock(5390, 190, 180, 20));
                bp(new DeathBlock(5730, 190, 180, 20));
                bp(new DeathBlock(8360, 190, 130, 20));
                bp(new RespawnArea(6530, 200, 50, 50));
                bp(new Block(5390, 210, 180, 20));
                bp(new Block(5730, 210, 180, 20));
                bp(new UnstickableBlock(8360, 210, 20, 450));
                bp(new UnstickableBlock(8450, 210, 40, 220));
                bp(new RespawnArea(4740, 230, 50, 50));
                bp(new DeathBlock(6050, 240, 180, 20));
                bp(new DeathBlock(8640, 250, 40, 180));
                bp(new Block(6050, 260, 180, 20));
                bp(new Block(6480, 260, 260, 40));
                bp(new Block(8880, 280, 40, 20));
                bp(new Block(4530, 290, 40, 170));
                bp(new UnstickableBlock(4720, 290, 150, 40));
                bp(new Block(6480, 300, 20, 150));
                bp(new UnstickableBlock(6500, 300, 20, 710));
                bp(new Block(8900, 300, 20, 20));
                bp(new UnstickableBlock(9250, 310, 330, 40));
                bp(new DeathBlock(7700, 320, 220, 40));
                bp(new Block(7920, 320, 20, 380));
                bp(new Block(8840, 320, 20, 20));
                bp(new UnstickableBlock(4720, 330, 40, 1450));
                bp(new DeathBlock(7240, 340, 20, 360));
                bp(new Block(7260, 340, 20, 170));
                bp(new Block(7430, 340, 40, 360));
                bp(new Block(8860, 340, 20, 20));
                bp(new DeathBlock(7700, 360, 40, 120));
                bp(new DeathBlock(7900, 360, 20, 120));
                bp(new Block(8800, 360, 20, 20));
                bp(new UnstickableBlock(1120, 370, 40, 290));
                bp(new DeathBlock(1160, 370, 90, 40));
                bp(new UnstickableBlock(1250, 370, 40, 350));
                bp(new Block(1290, 370, 220, 40));
                bp(new DeathBlock(1510, 370, 730, 40));
                bp(new Block(8140, 380, 20, 100));
                bp(new UnstickableBlock(8230, 380, 130, 20));
                bp(new Block(8820, 380, 20, 20));
                bp(new UnstickableBlock(8240, 400, 120, 20));
                bp(new Block(8760, 400, 20, 20));
                bp(new DeathBlock(2200, 410, 40, 240));
                bp(new RespawnArea(1380, 420, 50, 50));
                bp(new Block(4490, 420, 40, 170));
                bp(new UnstickableBlock(8250, 420, 110, 20));
                bp(new Block(8780, 420, 20, 20));
                bp(new Block(8450, 430, 40, 50));
                bp(new Block(8640, 430, 40, 80));
                bp(new Block(6930, 440, 20, 40));
                bp(new UnstickableBlock(8260, 440, 100, 20));
                bp(new Block(8720, 440, 20, 20));
                bp(new Block(470, 450, 430, 40));
                bp(new DeathBlock(900, 450, 90, 40));
                bp(new Block(990, 450, 40, 40));
                bp(new UnstickableBlock(6280, 450, 20, 1060));
                bp(new Block(6300, 450, 20, 180));
                bp(new UnstickableBlock(6480, 450, 20, 180));
                bp(new DeathBlock(7740, 460, 160, 20));
                bp(new UnstickableBlock(8270, 460, 90, 20));
                bp(new Block(1380, 480, 20, 620));
                bp(new UnstickableBlock(1400, 480, 640, 40));
                bp(new Block(2040, 480, 50, 20));
                bp(new UnstickableBlock(2090, 480, 20, 40));
                bp(new Block(7700, 480, 220, 20));
                bp(new UnstickableBlock(8140, 480, 20, 320));
                bp(new UnstickableBlock(8280, 480, 80, 20));
                bp(new Block(8680, 480, 20, 30));
                bp(new Block(8780, 480, 20, 20));
                bp(new Block(470, 490, 40, 520));
                bp(new UnstickableBlock(730, 490, 40, 250));
                bp(new UnstickableBlock(860, 490, 40, 30));
                bp(new UnstickableBlock(990, 490, 40, 150));
                bp(new DeathBlock(5820, 490, 180, 20));
                bp(new Block(7280, 490, 150, 20));
                bp(new UnstickableBlock(2040, 500, 50, 20));
                bp(new DeathBlock(7680, 500, 20, 160));
                bp(new Block(7700, 500, 20, 200));
                bp(new Block(7940, 500, 20, 200));
                bp(new UnstickableBlock(8290, 500, 70, 20));
                bp(new Block(8700, 500, 20, 20));
                bp(new Block(8760, 500, 20, 20));
                bp(new Block(5820, 510, 180, 20));
                bp(new DeathBlock(7260, 510, 170, 20));
                bp(new UnstickableBlock(8220, 510, 10, 290));
                bp(new Block(8640, 510, 20, 200));
                bp(new DeathBlock(1400, 520, 20, 580));
                bp(new DeathBlock(5500, 520, 180, 20));
                bp(new UnstickableBlock(8300, 520, 60, 20));
                bp(new Block(8820, 520, 20, 20));
                bp(new DeathBlock(7260, 530, 20, 170));
                bp(new UnstickableBlock(8230, 530, 10, 270));
                bp(new Block(5500, 540, 180, 20));
                bp(new UnstickableBlock(8310, 540, 50, 20));
                bp(new Block(8450, 540, 40, 50));
                bp(new Block(8660, 540, 20, 170));
                bp(new Block(8800, 540, 20, 20));
                bp(new Block(4450, 550, 40, 170));
                bp(new UnstickableBlock(8240, 550, 10, 250));
                bp(new Block(600, 560, 20, 540));
                bp(new UnstickableBlock(620, 560, 20, 520));
                bp(new UnstickableBlock(8320, 560, 40, 20));
                bp(new Block(8860, 560, 20, 20));
                bp(new UnstickableBlock(860, 570, 40, 510));
                bp(new UnstickableBlock(8250, 570, 10, 230));
                bp(new UnstickableBlock(8330, 580, 30, 20));
                bp(new Block(8840, 580, 20, 20));
                bp(new UnstickableBlock(8260, 590, 10, 210));
                bp(new UnstickableBlock(8450, 590, 40, 210));
                bp(new UnstickableBlock(8340, 600, 20, 20));
                bp(new Block(8900, 600, 20, 20));
                bp(new UnstickableBlock(1510, 610, 20, 40));
                bp(new Block(1530, 610, 50, 20));
                bp(new UnstickableBlock(1580, 610, 460, 40));
                bp(new DeathBlock(2040, 610, 160, 40));
                bp(new UnstickableBlock(8270, 610, 10, 190));
                bp(new DeathBlock(5140, 620, 180, 20));
                bp(new UnstickableBlock(8350, 620, 10, 20));
                bp(new Block(8880, 620, 20, 20));
                bp(new UnstickableBlock(1530, 630, 50, 20));
                bp(new UnstickableBlock(6300, 630, 20, 160));
                bp(new Block(6480, 630, 20, 160));
                bp(new UnstickableBlock(8280, 630, 10, 170));
                bp(new Block(990, 640, 20, 60));
                bp(new UnstickableBlock(1010, 640, 20, 60));
                bp(new Block(5140, 640, 180, 20));
                bp(new Block(8940, 640, 20, 40));
                bp(new DeathBlock(1910, 650, 50, 150));
                bp(new UnstickableBlock(8290, 650, 10, 150));
                bp(new Block(1030, 660, 110, 40));
                bp(new UnstickableBlock(1140, 660, 20, 370));
                bp(new Block(7680, 660, 20, 40));
                bp(new UnstickableBlock(8370, 660, 10, 20));
                bp(new Block(8920, 660, 20, 20));
                bp(new UnstickableBlock(8300, 670, 10, 130));
                bp(new Block(4410, 680, 40, 230));
                bp(new UnstickableBlock(8310, 690, 10, 110));
                bp(new Block(1120, 700, 20, 330));
                bp(new DeathBlock(4810, 700, 180, 20));
                bp(new UnstickableBlock(8320, 710, 10, 90));
                bp(new Block(1250, 720, 40, 80));
                bp(new Block(4810, 720, 180, 20));
                bp(new UnstickableBlock(8330, 730, 10, 70));
                bp(new DeathBlock(1420, 740, 160, 360));
                bp(new UnstickableBlock(1580, 740, 150, 40));
                bp(new Block(0, 750, 470, 40));
                bp(new UnstickableBlock(990, 750, 40, 330));
                bp(new UnstickableBlock(8340, 750, 10, 50));
                bp(new UnstickableBlock(1960, 760, 810, 40));
                bp(new UnstickableBlock(8350, 770, 10, 30));
                bp(new DeathBlock(1580, 780, 100, 320));
                bp(new DeathBlock(8160, 780, 60, 20));
                bp(new UnstickableBlock(8360, 780, 20, 20));
                bp(new Trampoline(8380, 780, 70, 20));
                bp(new Block(0, 790, 40, 990));
                bp(new Block(180, 790, 70, 220));
                bp(new UnstickableBlock(730, 790, 40, 290));
                bp(new Block(6300, 790, 20, 160));
                bp(new UnstickableBlock(6480, 790, 20, 160));
                bp(new Block(1910, 800, 50, 50));
                bp(new DeathBlock(2730, 800, 40, 280));
                bp(new Block(340, 860, 40, 240));
                bp(new UnstickableBlock(1250, 860, 40, 220));
                bp(new Block(4370, 870, 40, 230));
                bp(new DeathBlock(5410, 930, 180, 20));
                bp(new DeathBlock(5040, 940, 180, 20));
                bp(new Block(5410, 950, 180, 20));
                bp(new DeathBlock(5860, 950, 180, 20));
                bp(new UnstickableBlock(6300, 950, 20, 110));
                bp(new Block(6480, 950, 20, 100));
                bp(new Block(5040, 960, 180, 20));
                bp(new Block(5860, 970, 180, 20));
                bp(new Block(6500, 1010, 20, 40));
                bp(new DeathBlock(6520, 1010, 2420, 20));
                bp(new UnstickableBlock(8940, 1010, 40, 770));
                bp(new RespawnArea(190, 1020, 50, 50));
                bp(new Block(6520, 1030, 1050, 20));
                bp(new DeathBlock(7570, 1030, 1040, 20));
                bp(new Block(8610, 1030, 330, 20));
                bp(new Block(4330, 1060, 40, 190));
                bp(new Block(6300, 1060, 20, 270));
                bp(new DeathBlock(8550, 1060, 10, 70));
                bp(new DeathBlock(8250, 1070, 80, 10));
                bp(new DeathBlock(8410, 1070, 10, 70));
                bp(new DeathBlock(8450, 1070, 20, 10));
                bp(new DeathBlock(8480, 1070, 40, 10));
                bp(new Block(180, 1080, 160, 20));
                bp(new DeathBlock(380, 1080, 90, 20));
                bp(new Block(470, 1080, 130, 20));
                bp(new Block(620, 1080, 20, 20));
                bp(new DeathBlock(640, 1080, 90, 20));
                bp(new Block(730, 1080, 40, 20));
                bp(new Trampoline(770, 1080, 90, 20));
                bp(new Block(860, 1080, 40, 40));
                bp(new Trampoline(900, 1080, 90, 20));
                bp(new Block(990, 1080, 170, 20));
                bp(new Trampoline(1160, 1080, 90, 20));
                bp(new Block(1250, 1080, 40, 40));
                bp(new Trampoline(1290, 1080, 90, 20));
                bp(new DeathBlock(1680, 1080, 640, 20));
                bp(new UnstickableBlock(2320, 1080, 320, 40));
                bp(new UnstickableBlock(2730, 1080, 40, 590));
                bp(new DeathBlock(8290, 1080, 10, 60));
                bp(new DeathBlock(8340, 1080, 10, 60));
                bp(new DeathBlock(8380, 1080, 10, 60));
                bp(new DeathBlock(8420, 1080, 10, 10));
                bp(new DeathBlock(8440, 1080, 10, 10));
                bp(new DeathBlock(8460, 1080, 10, 60));
                bp(new DeathBlock(8480, 1080, 10, 70));
                bp(new DeathBlock(8520, 1080, 10, 30));
                bp(new DeathBlock(8430, 1090, 10, 10));
                bp(new UnstickableBlock(180, 1100, 70, 20));
                bp(new Block(250, 1100, 50, 20));
                bp(new UnstickableBlock(300, 1100, 190, 20));
                bp(new Block(490, 1100, 90, 20));
                bp(new UnstickableBlock(580, 1100, 180, 20));
                bp(new Block(760, 1100, 100, 20));
                bp(new Block(900, 1100, 30, 20));
                bp(new UnstickableBlock(930, 1100, 180, 20));
                bp(new Block(1110, 1100, 140, 20));
                bp(new Block(1290, 1100, 90, 20));
                bp(new UnstickableBlock(1380, 1100, 180, 20));
                bp(new Block(1560, 1100, 430, 20));
                bp(new UnstickableBlock(1990, 1100, 20, 680));
                bp(new DeathBlock(2010, 1100, 310, 20));
                bp(new DeathBlock(8250, 1110, 10, 30));
                bp(new DeathBlock(8490, 1110, 30, 10));
                bp(new Block(1680, 1120, 40, 220));
                bp(new Block(1970, 1120, 20, 660));
                bp(new RespawnArea(2660, 1130, 50, 50));
                bp(new DeathBlock(8260, 1140, 30, 10));
                bp(new DeathBlock(8350, 1140, 30, 10));
                bp(new DeathBlock(8550, 1140, 10, 10));
                bp(new Block(2340, 1170, 50, 50));
                bp(new UnstickableBlock(180, 1200, 40, 210));
                bp(new DeathBlock(4760, 1200, 1170, 20));
                bp(new DeathBlock(6000, 1200, 280, 40));
                bp(new Block(4260, 1210, 70, 40));
                bp(new DeathBlock(4760, 1220, 420, 20));
                bp(new Block(5180, 1220, 110, 20));
                bp(new DeathBlock(5290, 1220, 360, 20));
                bp(new Block(5650, 1220, 170, 20));
                bp(new DeathBlock(5820, 1220, 110, 20));
                bp(new UnstickableBlock(4190, 1230, 70, 40));
                bp(new Block(1790, 1240, 40, 210));
                bp(new Block(4120, 1250, 70, 40));
                bp(new RespawnArea(5940, 1250, 50, 50));
                bp(new RespawnArea(7690, 1250, 50, 50));
                bp(new UnstickableBlock(4050, 1270, 70, 40));
                bp(new Block(3980, 1290, 70, 40));
                bp(new Block(6480, 1290, 40, 40));
                bp(new Block(7530, 1290, 40, 40));
                bp(new UnstickableBlock(3910, 1310, 70, 40));
                bp(new Block(6320, 1310, 160, 20));
                bp(new DeathBlock(6520, 1310, 1010, 20));
                bp(new Block(7570, 1310, 250, 20));
                bp(new Block(2060, 1320, 50, 50));
                bp(new Block(2660, 1320, 50, 50));
                bp(new Block(3840, 1330, 70, 40));
                bp(new UnstickableBlock(6300, 1330, 1520, 20));
                bp(new RespawnArea(1730, 1350, 50, 50));
                bp(new UnstickableBlock(3770, 1350, 70, 40));
                bp(new UnstickableBlock(6300, 1350, 20, 160));
                bp(new Block(6720, 1350, 50, 50));
                bp(new DeathBlock(7530, 1350, 40, 300));
                bp(new Block(3700, 1370, 70, 40));
                bp(new UnstickableBlock(3630, 1390, 70, 40));
                bp(new Trampoline(40, 1410, 140, 20));
                bp(new Block(180, 1410, 40, 40));
                bp(new DeathBlock(220, 1410, 1340, 20));
                bp(new Block(1560, 1410, 230, 40));
                bp(new Block(3560, 1410, 70, 40));
                bp(new Block(40, 1430, 140, 20));
                bp(new Block(220, 1430, 1340, 20));
                bp(new UnstickableBlock(3490, 1430, 70, 40));
                bp(new DeathBlock(8040, 1440, 10, 70));
                bp(new DeathBlock(2220, 1450, 510, 20));
                bp(new Block(3420, 1450, 70, 40));
                bp(new DeathBlock(7740, 1450, 80, 10));
                bp(new DeathBlock(7900, 1450, 10, 70));
                bp(new DeathBlock(7940, 1450, 20, 10));
                bp(new DeathBlock(7970, 1450, 40, 10));
                bp(new DeathBlock(7780, 1460, 10, 60));
                bp(new DeathBlock(7830, 1460, 10, 60));
                bp(new DeathBlock(7870, 1460, 10, 60));
                bp(new DeathBlock(7910, 1460, 10, 10));
                bp(new DeathBlock(7930, 1460, 10, 10));
                bp(new DeathBlock(7950, 1460, 10, 60));
                bp(new DeathBlock(7970, 1460, 10, 70));
                bp(new DeathBlock(8010, 1460, 10, 30));
                bp(new DeathBlock(2220, 1470, 40, 20));
                bp(new Block(2260, 1470, 470, 20));
                bp(new UnstickableBlock(3350, 1470, 70, 40));
                bp(new Block(4860, 1470, 250, 20));
                bp(new DeathBlock(5110, 1470, 280, 40));
                bp(new Block(5390, 1470, 210, 20));
                bp(new DeathBlock(5600, 1470, 290, 40));
                bp(new Block(5890, 1470, 180, 20));
                bp(new DeathBlock(6070, 1470, 210, 40));
                bp(new DeathBlock(7920, 1470, 10, 10));
                bp(new Block(3280, 1490, 70, 40));
                bp(new DeathBlock(4860, 1490, 250, 20));
                bp(new DeathBlock(5390, 1490, 210, 20));
                bp(new DeathBlock(5890, 1490, 180, 20));
                bp(new DeathBlock(7740, 1490, 10, 30));
                bp(new DeathBlock(7980, 1490, 30, 10));
                bp(new UnstickableBlock(3210, 1510, 70, 40));
                bp(new DeathBlock(7750, 1520, 30, 10));
                bp(new DeathBlock(7840, 1520, 30, 10));
                bp(new DeathBlock(8040, 1520, 10, 10));
                bp(new Block(3140, 1530, 70, 40));
                bp(new UnstickableBlock(3070, 1550, 70, 40));
                bp(new Block(3000, 1570, 70, 40));
                bp(new UnstickableBlock(2930, 1590, 70, 40));
                bp(new Block(1790, 1600, 40, 180));
                bp(new Block(2860, 1610, 70, 40));
                bp(new Block(2770, 1630, 90, 40));
                bp(new RespawnArea(3150, 1680, 50, 50));
                bp(new Block(4920, 1680, 130, 40));
                bp(new Block(5150, 1680, 40, 40));
                bp(new Block(5290, 1680, 40, 40));
                bp(new RespawnArea(6440, 1680, 50, 50));
                bp(new Block(230, 1700, 130, 80));
                bp(new Block(610, 1700, 190, 80));
                bp(new Block(5430, 1700, 20, 20));
                bp(new Block(5550, 1700, 20, 20));
                bp(new Block(5670, 1700, 20, 20));
                bp(new Block(5790, 1700, 20, 20));
                bp(new Block(5910, 1700, 20, 20));
                bp(new Block(6030, 1700, 20, 20));
                bp(new Block(6150, 1700, 20, 20));
                bp(new Block(6270, 1700, 20, 20));
                bp(new Block(40, 1740, 190, 40));
                bp(new DeathBlock(360, 1740, 250, 40));
                bp(new DeathBlock(800, 1740, 990, 40));
                bp(new Trampoline(1830, 1740, 140, 40));
                bp(new DeathBlock(2010, 1740, 720, 40));
                bp(new Block(2730, 1740, 630, 40));
                bp(new DeathBlock(3360, 1740, 900, 40));
                bp(new Trampoline(4260, 1740, 110, 40));
                bp(new Block(4370, 1740, 350, 40));
                bp(new DeathBlock(4760, 1740, 1630, 40));
                bp(new UnstickableBlock(6390, 1740, 1350, 40));
                bp(new DeathBlock(7740, 1740, 790, 40));
                bp(new Block(8530, 1740, 220, 40));
                bp(new Trampoline(8750, 1740, 190, 40));
                player = new Player(80, 1700);
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
