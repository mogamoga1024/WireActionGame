
class MapFactory {
    static create(name, respawnId) {
        let worldHeight = 500;
        const entityList = [];
        let player = null;

        const bp = entity => {
            entityList.push(entity);
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
                worldHeight = 1930;
                bp(new Block(9810, 20, 70, 10));
                bp(new Block(9890, 20, 50, 10));
                bp(new Block(9950, 20, 50, 10));
                bp(new Block(10010, 20, 10, 80));
                bp(new Block(10080, 20, 10, 60));
                bp(new Block(10100, 20, 10, 60));
                bp(new Block(9810, 30, 10, 70));
                bp(new Block(9890, 30, 10, 70));
                bp(new Block(9930, 30, 10, 70));
                bp(new Block(9950, 30, 10, 70));
                bp(new Block(9990, 30, 10, 70));
                bp(new Block(9830, 50, 50, 10));
                bp(new Block(9960, 50, 30, 10));
                bp(new Block(9850, 60, 10, 40));
                bp(new Block(9870, 60, 10, 40));
                bp(new Block(9820, 90, 30, 10));
                bp(new Block(9900, 90, 30, 10));
                bp(new Block(10020, 90, 50, 10));
                bp(new Block(10080, 90, 10, 10));
                bp(new Block(10100, 90, 10, 10));
                bp(new GoalArea(9820, 120, 280, 110));
                bp(new UnstickableBlock(6280, 230, 370, 40));
                bp(new DeathBlock(9140, 230, 210, 40));
                bp(new Block(9800, 240, 320, 80));
                bp(new DeathBlock(10270, 240, 40, 120));
                bp(new DeathBlock(10350, 240, 40, 120));
                bp(new UnstickableBlock(6280, 270, 40, 330));
                bp(new DeathBlock(6790, 270, 610, 20));
                bp(new UnstickableBlock(9140, 270, 40, 460));
                bp(new UnstickableBlock(9310, 270, 40, 300));
                bp(new DeathBlock(9520, 280, 40, 790));
                bp(new DeathBlock(6790, 290, 290, 20));
                bp(new Block(7080, 290, 320, 20));
                bp(new UnstickableBlock(4570, 300, 300, 40));
                bp(new DeathBlock(5050, 300, 180, 20));
                bp(new DeathBlock(7060, 310, 20, 350));
                bp(new Block(7080, 310, 20, 440));
                bp(new Block(8620, 310, 40, 120));
                bp(new DeathBlock(8790, 310, 350, 40));
                bp(new Block(5050, 320, 180, 20));
                bp(new DeathBlock(9800, 320, 20, 150));
                bp(new Block(9820, 320, 20, 170));
                bp(new Block(4570, 340, 40, 140));
                bp(new DeathBlock(5390, 340, 180, 20));
                bp(new DeathBlock(5730, 340, 180, 20));
                bp(new RespawnArea(6530, 350, 50, 50));
                bp(new UnstickableBlock(8920, 350, 220, 40));
                bp(new Block(5390, 360, 180, 20));
                bp(new Block(5730, 360, 180, 20));
                bp(new DeathBlock(10310, 360, 40, 120));
                bp(new RespawnArea(4740, 380, 50, 50));
                bp(new DeathBlock(6050, 390, 180, 20));
                bp(new DeathBlock(8080, 390, 220, 40));
                bp(new Block(8300, 390, 20, 180));
                bp(new DeathBlock(8960, 390, 40, 150));
                bp(new UnstickableBlock(9000, 390, 140, 150));
                bp(new Block(6050, 410, 180, 20));
                bp(new Block(6480, 410, 260, 40));
                bp(new DeathBlock(8080, 430, 40, 140));
                bp(new DeathBlock(8280, 430, 20, 140));
                bp(new UnstickableBlock(8620, 430, 40, 530));
                bp(new Block(4530, 440, 40, 170));
                bp(new UnstickableBlock(4720, 440, 150, 40));
                bp(new Block(6480, 450, 20, 150));
                bp(new UnstickableBlock(6500, 450, 20, 710));
                bp(new DeathBlock(9760, 450, 40, 20));
                bp(new DeathBlock(9760, 470, 20, 220));
                bp(new Block(9780, 470, 40, 20));
                bp(new UnstickableBlock(4720, 480, 40, 1450));
                bp(new RespawnArea(8790, 480, 50, 50));
                bp(new Block(9780, 490, 20, 220));
                bp(new DeathBlock(10270, 500, 120, 40));
                bp(new UnstickableBlock(1120, 520, 40, 290));
                bp(new DeathBlock(1160, 520, 90, 40));
                bp(new UnstickableBlock(1250, 520, 40, 350));
                bp(new Block(1290, 520, 220, 40));
                bp(new DeathBlock(1510, 520, 730, 40));
                bp(new DeathBlock(7430, 530, 20, 480));
                bp(new Block(7450, 530, 20, 230));
                bp(new Block(7740, 530, 40, 480));
                bp(new UnstickableBlock(8790, 540, 90, 420));
                bp(new UnstickableBlock(9050, 540, 90, 40));
                bp(new DeathBlock(10270, 540, 40, 200));
                bp(new DeathBlock(10350, 540, 40, 200));
                bp(new DeathBlock(2200, 560, 40, 240));
                bp(new RespawnArea(1380, 570, 50, 50));
                bp(new Block(4490, 570, 40, 170));
                bp(new DeathBlock(8060, 570, 20, 160));
                bp(new Block(8080, 570, 20, 160));
                bp(new Block(8320, 570, 40, 160));
                bp(new Block(9310, 570, 40, 50));
                bp(new DeathBlock(9090, 580, 40, 150));
                bp(new UnstickableBlock(9130, 580, 10, 150));
                bp(new Block(470, 600, 430, 40));
                bp(new DeathBlock(900, 600, 90, 40));
                bp(new Block(990, 600, 40, 40));
                bp(new UnstickableBlock(6280, 600, 20, 1060));
                bp(new Block(6300, 600, 20, 180));
                bp(new UnstickableBlock(6480, 600, 20, 180));
                bp(new Block(1380, 630, 20, 620));
                bp(new UnstickableBlock(1400, 630, 640, 40));
                bp(new Block(2040, 630, 50, 20));
                bp(new UnstickableBlock(2090, 630, 20, 40));
                bp(new Block(8100, 630, 220, 40));
                bp(new Block(470, 640, 40, 520));
                bp(new UnstickableBlock(730, 640, 40, 250));
                bp(new UnstickableBlock(860, 640, 40, 30));
                bp(new UnstickableBlock(990, 640, 40, 150));
                bp(new DeathBlock(5820, 640, 180, 20));
                bp(new UnstickableBlock(2040, 650, 50, 20));
                bp(new Block(5820, 660, 180, 20));
                bp(new Block(7060, 660, 20, 90));
                bp(new DeathBlock(1400, 670, 20, 580));
                bp(new DeathBlock(5500, 670, 180, 20));
                bp(new DeathBlock(9720, 670, 40, 20));
                bp(new Block(9310, 680, 40, 50));
                bp(new Block(5500, 690, 180, 20));
                bp(new UnstickableBlock(8880, 690, 40, 270));
                bp(new DeathBlock(9720, 690, 20, 220));
                bp(new Block(9740, 690, 40, 20));
                bp(new Block(4450, 700, 40, 170));
                bp(new DeathBlock(10310, 700, 40, 40));
                bp(new Block(600, 710, 20, 540));
                bp(new UnstickableBlock(620, 710, 20, 520));
                bp(new Block(9740, 710, 20, 220));
                bp(new UnstickableBlock(860, 720, 40, 510));
                bp(new DeathBlock(8040, 730, 20, 110));
                bp(new Block(8060, 730, 20, 160));
                bp(new Block(8360, 730, 40, 160));
                bp(new UnstickableBlock(8920, 730, 50, 230));
                bp(new DeathBlock(8970, 730, 40, 150));
                bp(new UnstickableBlock(9310, 730, 20, 230));
                bp(new Block(9330, 730, 20, 230));
                bp(new Block(7470, 740, 270, 20));
                bp(new UnstickableBlock(1510, 760, 20, 40));
                bp(new Block(1530, 760, 50, 20));
                bp(new UnstickableBlock(1580, 760, 460, 40));
                bp(new DeathBlock(2040, 760, 160, 40));
                bp(new DeathBlock(7450, 760, 290, 20));
                bp(new DeathBlock(10270, 760, 40, 240));
                bp(new DeathBlock(10350, 760, 40, 240));
                bp(new DeathBlock(5140, 770, 180, 20));
                bp(new UnstickableBlock(1530, 780, 50, 20));
                bp(new UnstickableBlock(6300, 780, 20, 160));
                bp(new Block(6480, 780, 20, 160));
                bp(new DeathBlock(7450, 780, 20, 230));
                bp(new Block(990, 790, 20, 60));
                bp(new UnstickableBlock(1010, 790, 20, 60));
                bp(new Block(5140, 790, 180, 20));
                bp(new DeathBlock(1910, 800, 50, 150));
                bp(new Block(1030, 810, 110, 40));
                bp(new UnstickableBlock(1140, 810, 20, 370));
                bp(new Block(4410, 830, 40, 230));
                bp(new Block(8040, 840, 20, 50));
                bp(new Block(1120, 850, 20, 330));
                bp(new DeathBlock(4810, 850, 180, 20));
                bp(new Block(1250, 870, 40, 80));
                bp(new Block(4810, 870, 180, 20));
                bp(new UnstickableBlock(8970, 880, 80, 80));
                bp(new DeathBlock(1420, 890, 160, 360));
                bp(new UnstickableBlock(1580, 890, 150, 40));
                bp(new DeathBlock(9680, 890, 40, 20));
                bp(new Block(0, 900, 470, 40));
                bp(new UnstickableBlock(990, 900, 40, 330));
                bp(new UnstickableBlock(1960, 910, 810, 40));
                bp(new DeathBlock(9680, 910, 20, 200));
                bp(new Block(9700, 910, 40, 20));
                bp(new DeathBlock(8660, 920, 130, 40));
                bp(new UnstickableBlock(9050, 920, 130, 40));
                bp(new Trampoline(9180, 920, 130, 40));
                bp(new DeathBlock(1580, 930, 100, 320));
                bp(new Block(9700, 930, 20, 200));
                bp(new Block(0, 940, 40, 990));
                bp(new Block(180, 940, 70, 220));
                bp(new UnstickableBlock(730, 940, 40, 290));
                bp(new Block(6300, 940, 20, 160));
                bp(new UnstickableBlock(6480, 940, 20, 160));
                bp(new Block(1910, 950, 50, 50));
                bp(new DeathBlock(2730, 950, 40, 280));
                bp(new DeathBlock(10310, 960, 40, 40));
                bp(new Block(340, 1010, 40, 240));
                bp(new UnstickableBlock(1250, 1010, 40, 220));
                bp(new Block(4370, 1020, 40, 230));
                bp(new Block(9520, 1070, 20, 500));
                bp(new DeathBlock(9540, 1070, 20, 140));
                bp(new DeathBlock(5410, 1080, 180, 20));
                bp(new DeathBlock(5040, 1090, 180, 20));
                bp(new DeathBlock(9600, 1090, 80, 20));
                bp(new Block(5410, 1100, 180, 20));
                bp(new DeathBlock(5860, 1100, 180, 20));
                bp(new UnstickableBlock(6300, 1100, 20, 110));
                bp(new Block(6480, 1100, 20, 100));
                bp(new Block(5040, 1110, 180, 20));
                bp(new DeathBlock(9600, 1110, 20, 100));
                bp(new Block(9620, 1110, 80, 20));
                bp(new Block(5860, 1120, 180, 20));
                bp(new Block(9620, 1130, 20, 260));
                bp(new Block(6500, 1160, 20, 40));
                bp(new DeathBlock(6520, 1160, 2420, 20));
                bp(new UnstickableBlock(8940, 1160, 40, 770));
                bp(new RespawnArea(190, 1170, 50, 50));
                bp(new Block(6520, 1180, 1050, 20));
                bp(new DeathBlock(7570, 1180, 1040, 20));
                bp(new Block(8610, 1180, 330, 20));
                bp(new DeathBlock(9560, 1190, 40, 20));
                bp(new Block(4330, 1210, 40, 190));
                bp(new Block(6300, 1210, 20, 270));
                bp(new DeathBlock(8550, 1210, 10, 70));
                bp(new Block(9540, 1210, 80, 20));
                bp(new DeathBlock(8250, 1220, 80, 10));
                bp(new DeathBlock(8410, 1220, 10, 70));
                bp(new DeathBlock(8450, 1220, 20, 10));
                bp(new DeathBlock(8480, 1220, 40, 10));
                bp(new Block(180, 1230, 160, 20));
                bp(new DeathBlock(380, 1230, 90, 20));
                bp(new Block(470, 1230, 130, 20));
                bp(new Block(620, 1230, 20, 20));
                bp(new DeathBlock(640, 1230, 90, 20));
                bp(new Block(730, 1230, 40, 20));
                bp(new Trampoline(770, 1230, 90, 20));
                bp(new Block(860, 1230, 40, 40));
                bp(new Trampoline(900, 1230, 90, 20));
                bp(new Block(990, 1230, 170, 20));
                bp(new Trampoline(1160, 1230, 90, 20));
                bp(new Block(1250, 1230, 40, 40));
                bp(new Trampoline(1290, 1230, 90, 20));
                bp(new DeathBlock(1680, 1230, 640, 20));
                bp(new UnstickableBlock(2320, 1230, 320, 40));
                bp(new UnstickableBlock(2730, 1230, 40, 590));
                bp(new DeathBlock(8290, 1230, 10, 60));
                bp(new DeathBlock(8340, 1230, 10, 60));
                bp(new DeathBlock(8380, 1230, 10, 60));
                bp(new DeathBlock(8420, 1230, 10, 10));
                bp(new DeathBlock(8440, 1230, 10, 10));
                bp(new DeathBlock(8460, 1230, 10, 60));
                bp(new DeathBlock(8480, 1230, 10, 70));
                bp(new DeathBlock(8520, 1230, 10, 30));
                bp(new Block(9540, 1230, 20, 340));
                bp(new Block(9600, 1230, 20, 160));
                bp(new DeathBlock(8430, 1240, 10, 10));
                bp(new UnstickableBlock(180, 1250, 70, 20));
                bp(new Block(250, 1250, 50, 20));
                bp(new UnstickableBlock(300, 1250, 190, 20));
                bp(new Block(490, 1250, 90, 20));
                bp(new UnstickableBlock(580, 1250, 180, 20));
                bp(new Block(760, 1250, 100, 20));
                bp(new Block(900, 1250, 30, 20));
                bp(new UnstickableBlock(930, 1250, 180, 20));
                bp(new Block(1110, 1250, 140, 20));
                bp(new Block(1290, 1250, 90, 20));
                bp(new UnstickableBlock(1380, 1250, 180, 20));
                bp(new Block(1560, 1250, 430, 20));
                bp(new UnstickableBlock(1990, 1250, 20, 680));
                bp(new DeathBlock(2010, 1250, 310, 20));
                bp(new DeathBlock(8250, 1260, 10, 30));
                bp(new DeathBlock(8490, 1260, 30, 10));
                bp(new Block(1680, 1270, 40, 220));
                bp(new Block(1970, 1270, 20, 660));
                bp(new RespawnArea(2660, 1280, 50, 50, "left"));
                bp(new DeathBlock(8260, 1290, 30, 10));
                bp(new DeathBlock(8350, 1290, 30, 10));
                bp(new DeathBlock(8550, 1290, 10, 10));
                bp(new Block(2340, 1320, 50, 50));
                bp(new UnstickableBlock(180, 1350, 40, 210));
                bp(new DeathBlock(4760, 1350, 1170, 20));
                bp(new DeathBlock(6000, 1350, 280, 40));
                bp(new Block(9640, 1350, 80, 40));
                bp(new Block(4260, 1360, 70, 40));
                bp(new DeathBlock(4760, 1370, 420, 20));
                bp(new Block(5180, 1370, 110, 20));
                bp(new DeathBlock(5290, 1370, 360, 20));
                bp(new Block(5650, 1370, 170, 20));
                bp(new DeathBlock(5820, 1370, 110, 20));
                bp(new UnstickableBlock(4190, 1380, 70, 40));
                bp(new Block(1790, 1390, 40, 210));
                bp(new Block(9680, 1390, 40, 100));
                bp(new Block(4120, 1400, 70, 40));
                bp(new RespawnArea(5940, 1400, 50, 50, "left"));
                bp(new RespawnArea(7690, 1400, 50, 50, "left"));
                bp(new UnstickableBlock(4050, 1420, 70, 40));
                bp(new Block(3980, 1440, 70, 40));
                bp(new Block(6480, 1440, 40, 40));
                bp(new Block(7530, 1440, 40, 40));
                bp(new Block(9720, 1450, 80, 40));
                bp(new UnstickableBlock(3910, 1460, 70, 40));
                bp(new Block(6320, 1460, 160, 20));
                bp(new DeathBlock(6520, 1460, 1010, 20));
                bp(new Block(7570, 1460, 250, 20));
                bp(new Block(2060, 1470, 50, 50));
                bp(new Block(2660, 1470, 50, 50));
                bp(new Block(3840, 1480, 70, 40));
                bp(new UnstickableBlock(6300, 1480, 1520, 20));
                bp(new Block(9760, 1490, 40, 180));
                bp(new RespawnArea(1730, 1500, 50, 50, "left"));
                bp(new UnstickableBlock(3770, 1500, 70, 40));
                bp(new UnstickableBlock(6300, 1500, 20, 160));
                bp(new Block(6720, 1500, 50, 50));
                bp(new DeathBlock(7530, 1500, 40, 300));
                bp(new Block(3700, 1520, 70, 40));
                bp(new UnstickableBlock(3630, 1540, 70, 40));
                bp(new Trampoline(40, 1560, 140, 20));
                bp(new Block(180, 1560, 40, 40));
                bp(new DeathBlock(220, 1560, 1340, 20));
                bp(new Block(1560, 1560, 230, 40));
                bp(new Block(3560, 1560, 70, 40));
                bp(new Block(40, 1580, 140, 20));
                bp(new Block(220, 1580, 1340, 20));
                bp(new UnstickableBlock(3490, 1580, 70, 40));
                bp(new DeathBlock(8040, 1590, 10, 70));
                bp(new DeathBlock(2220, 1600, 510, 20));
                bp(new Block(3420, 1600, 70, 40));
                bp(new DeathBlock(7740, 1600, 80, 10));
                bp(new DeathBlock(7900, 1600, 10, 70));
                bp(new DeathBlock(7940, 1600, 20, 10));
                bp(new DeathBlock(7970, 1600, 40, 10));
                bp(new DeathBlock(7780, 1610, 10, 60));
                bp(new DeathBlock(7830, 1610, 10, 60));
                bp(new DeathBlock(7870, 1610, 10, 60));
                bp(new DeathBlock(7910, 1610, 10, 10));
                bp(new DeathBlock(7930, 1610, 10, 10));
                bp(new DeathBlock(7950, 1610, 10, 60));
                bp(new DeathBlock(7970, 1610, 10, 70));
                bp(new DeathBlock(8010, 1610, 10, 30));
                bp(new DeathBlock(2220, 1620, 40, 20));
                bp(new Block(2260, 1620, 470, 20));
                bp(new UnstickableBlock(3350, 1620, 70, 40));
                bp(new Block(4860, 1620, 250, 20));
                bp(new DeathBlock(5110, 1620, 280, 40));
                bp(new Block(5390, 1620, 210, 20));
                bp(new DeathBlock(5600, 1620, 290, 40));
                bp(new Block(5890, 1620, 180, 20));
                bp(new DeathBlock(6070, 1620, 210, 40));
                bp(new DeathBlock(7920, 1620, 10, 10));
                bp(new Block(9800, 1630, 80, 40));
                bp(new Block(3280, 1640, 70, 40));
                bp(new DeathBlock(4860, 1640, 250, 20));
                bp(new DeathBlock(5390, 1640, 210, 20));
                bp(new DeathBlock(5890, 1640, 180, 20));
                bp(new DeathBlock(7740, 1640, 10, 30));
                bp(new DeathBlock(7980, 1640, 30, 10));
                bp(new UnstickableBlock(3210, 1660, 70, 40));
                bp(new DeathBlock(7750, 1670, 30, 10));
                bp(new DeathBlock(7840, 1670, 30, 10));
                bp(new DeathBlock(8040, 1670, 10, 10));
                bp(new Block(3140, 1680, 70, 40));
                bp(new UnstickableBlock(3070, 1700, 70, 40));
                bp(new Block(3000, 1720, 70, 40));
                bp(new UnstickableBlock(2930, 1740, 70, 40));
                bp(new Block(1790, 1750, 40, 180));
                bp(new Block(2860, 1760, 70, 40));
                bp(new Block(2770, 1780, 90, 40));
                bp(new RespawnArea(3150, 1830, 50, 50));
                bp(new Block(4920, 1830, 130, 40));
                bp(new Block(5150, 1830, 40, 40));
                bp(new Block(5290, 1830, 40, 40));
                bp(new RespawnArea(6440, 1830, 50, 50));
                bp(new Block(230, 1850, 130, 80));
                bp(new Block(610, 1850, 190, 80));
                bp(new Block(5430, 1850, 20, 20));
                bp(new Block(5550, 1850, 20, 20));
                bp(new Block(5670, 1850, 20, 20));
                bp(new Block(5790, 1850, 20, 20));
                bp(new Block(5910, 1850, 20, 20));
                bp(new Block(6030, 1850, 20, 20));
                bp(new Block(6150, 1850, 20, 20));
                bp(new Block(6270, 1850, 20, 20));
                bp(new Block(40, 1890, 190, 40));
                bp(new DeathBlock(360, 1890, 250, 40));
                bp(new DeathBlock(800, 1890, 990, 40));
                bp(new Trampoline(1830, 1890, 140, 40));
                bp(new DeathBlock(2010, 1890, 720, 40));
                bp(new Block(2730, 1890, 630, 40));
                bp(new DeathBlock(3360, 1890, 900, 40));
                bp(new Trampoline(4260, 1890, 110, 40));
                bp(new Block(4370, 1890, 350, 40));
                bp(new DeathBlock(4760, 1890, 1630, 40));
                bp(new UnstickableBlock(6390, 1890, 1350, 40));
                bp(new DeathBlock(7740, 1890, 790, 40));
                bp(new Block(8530, 1890, 220, 40));
                bp(new Trampoline(8750, 1890, 190, 40));
                bp(new DeathBlock(8980, 1890, 1440, 40));
                const respawnArea = this.#findRespawnArea(entityList, respawnId);
                player = new Player(80, 1850, respawnArea);
                break;
            }
            default:
                throw new Error(`マップがない：${name}`);
        }

        this.#sortBlockList(entityList);
        const world = this.#createWorld(entityList, worldHeight);
        this.#addGuardBlock(entityList, world);
        return {player, entityList, world};
    }

    static #createWorld(entityList, height = 500) {
        let width = 0;
        for (const entity of entityList) {
            if (width < entity.x + entity.width) {
                width = entity.x + entity.width;
            }
        }
        return {width, height};
    }

    static #addGuardBlock(entityList, world) {
        // 床
        entityList.push(new InvisibleBlock(0, world.height, world.width, 30));
        // 天井
        entityList.push(new InvisibleBlock(0, -30, world.width, 30));
        // 左
        entityList.push(new InvisibleBlock(-30, 0, 30, world.height));
        // 右
        entityList.push(new InvisibleBlock(world.width, 0, 30, world.height));
    }

    static #sortBlockList(entityList) {
        // Trampolineは先頭
        entityList.sort((a, b) => {
            if (a.constructor.name === "Trampoline") {
                return -1;
            }
            if (b.constructor.name === "Trampoline") {
                return 1;
            }
            return 0;
        });
    }

    static #findRespawnArea(entityList, respawnId) {
        if (respawnId === -1) {
            return null;
        }
        for (const entity of entityList) {
            if (entity.id === respawnId) {
                return entity;
            }
        }
        return null;
    }
}
