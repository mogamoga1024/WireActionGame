
// 画像先読み
// Playerクラスで使う
{
    const iamge = new Image();
    iamge.src = "assets/植木鉢くんL.png";
}
{
    const iamge = new Image();
    iamge.src = "assets/植木鉢くんR.png";
}
{
    const iamge = new Image();
    iamge.src = "assets/お花.png";
}
for (let angle = 0; angle <= 330; angle += 30) {
    const iamge = new Image();
    iamge.src = `assets/回るバレーボールくん/${angle}.png`;
}

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
