
// 画像先読み
{
    const iamge = new Image();
    iamge.src = "images/植木鉢くんL.png";
}
{
    const iamge = new Image();
    iamge.src = "images/植木鉢くんR.png";
}
{
    const iamge = new Image();
    iamge.src = "images/お花.png";
}

// Canvas設定
const canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 500;

// えみたん
const emitter = new TinyEmitter();

// ゲーム開始
SceneManager.start(new TitleScene());
