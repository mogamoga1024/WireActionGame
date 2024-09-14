
// 音
const donSound = new Sound("assets/ドンッ.mp3", 0.8);
const kakusinhanSound = new Sound("assets/あっ（確信犯）.mp3");
const uekibatiBreakSound = new Sound("assets/大破.mp3");

// Canvas設定
const canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 500;

// えみたん
const emitter = new TinyEmitter();

(async () => {
    // 背景以外の画像
    await ImageStorage.create({
        "植木鉢くんL": "assets/植木鉢くんL.png",
        "植木鉢くんR": "assets/植木鉢くんR.png",
        "お花": "assets/お花.png",
        "植木鉢くんの最期1": "assets/植木鉢くんの最期1.png",
        "植木鉢くんの最期2": "assets/植木鉢くんの最期2.png",
        "バレーボールくん": "assets/バレーボールくん.png",
    });

    // ゲーム開始
    SceneManager.start(new TitleScene());
    // SceneManager.start(new HelpScene());
})();
