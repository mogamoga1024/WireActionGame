
// 画像先読み
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
{
    const iamge = new Image();
    iamge.src = "assets/植木鉢くんの転倒1.png";
}
{
    const iamge = new Image();
    iamge.src = "assets/植木鉢くんの転倒2.png";
}
{
    const iamge = new Image();
    iamge.src = `assets/バレーボールくん.png`;
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
// SceneManager.start(new TitleScene());
SceneManager.start(new HelpScene());
