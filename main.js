
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
}, dt * 1000);

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

const staticObj1 = new StaticObject(0, 400, 400, 100);
const staticObj2 = new StaticObject(600, 400, 400, 100);
const player = new Player(100, 360);

function update() {
    if (player.actStatus === "falling") {
        player.fall();
    }
    else if (isPressedSpace || player.actStatus === "jumping") {
        player.jump();
    }

    if (isPressedLeft && !isPressedRight) {
        player.move("left");
    }
    else if (!isPressedLeft && isPressedRight) {
        player.move("right");
    }
    else {
        // 慣性
        player.move("none");
    }

    // 衝突処理
    player.checkCollisionList([staticObj1, staticObj2]);

    staticObj1.draw(context);
    staticObj2.draw(context);
    player.draw(context);
}

