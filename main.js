
let isPressedLeft = false;
let isPressedRight = false;
let isPressedSpace = false;

addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowLeft":  isPressedLeft = true;  break;
        case "ArrowRight": isPressedRight = true; break;
        case " ": isPressedSpace = true; break;
    }
});

addEventListener("keyup", e => {
    switch (e.key) {
        case "ArrowLeft":  isPressedLeft = false;  break;
        case "ArrowRight": isPressedRight = false; break;
        case " ": isPressedSpace = false; break;
    }
});

setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    update();
}, 1000 / 60);

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

const obj = new StaticObject(-10, 400, 820, 110);
const player = new Player(100, 380);

function update() {
    if (!player.canOperate) {
        // 何もしない
    }
    else if (isPressedLeft) {
        player.run("left");
    }
    else if (isPressedRight) {
        player.run("right");
    }
    else if (isPressedSpace) {
        player.jump();
    }

    obj.draw(context);
    player.draw(context);
}

