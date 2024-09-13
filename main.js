
// 背景以外の画像
ImageStorage.create({
    "植木鉢くんL": "assets/植木鉢くんL.png",
    "植木鉢くんR": "assets/植木鉢くんR.png",
    "お花": "assets/お花.png",
    "植木鉢くんの最期1": "assets/植木鉢くんの最期1.png",
    "植木鉢くんの最期2": "assets/植木鉢くんの最期2.png",
    "バレーボールくん": "assets/バレーボールくん.png",
});

// 音
const uekibatiBreakSound = new Sound("assets/大破.mp3");

// Canvas設定
const canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 500;

// えみたん
const emitter = new TinyEmitter();

// ゲーム開始
SceneManager.start(new TitleScene());
// SceneManager.start(new HelpScene());
