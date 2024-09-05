
const canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 500;

const emitter = new TinyEmitter();

SceneManager.start(new TitleScene());
