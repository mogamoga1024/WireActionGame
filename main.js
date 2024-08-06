
let isPressedUp = false;
let isPressedLeft = false;
let isPressedRight = false;
let isPressedX = false;
let isPressedZ = false;

addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp":    isPressedUp    = true; break;
        case "ArrowLeft":  isPressedLeft  = true; break;
        case "ArrowRight": isPressedRight = true; break;
        case "x": isPressedX = true; break;
        case "z": isPressedZ = true; break;
    }
});

addEventListener("keyup", e => {
    switch (e.key) {
        case "ArrowUp":    isPressedUp    = false; break;
        case "ArrowLeft":  isPressedLeft  = false; break;
        case "ArrowRight": isPressedRight = false; break;
        case "x": isPressedX = false; break;
        case "z": isPressedZ = false; break;
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

const staticObj1 = new StaticObject(0, 400, 500, 100);
const staticObj2 = new StaticObject(600, 400, 400, 100);
const staticObj3 = new StaticObject(0, 200, 80, 200);
const staticObj4 = new StaticObject(200, 350, 80, 50);
const staticObj5 = new StaticObject(70, 210, 250, 20);
const player = new Player(100, 360);

const staticObjList = [staticObj1, staticObj2, staticObj3, staticObj4, staticObj5];

let fireHookWaitFrame = 0;
const fireHookWaitFrameMax = 10;

function update() {
    if (fireHookWaitFrame !== 0) {
        fireHookWaitFrame++;
        if (fireHookWaitFrame >= fireHookWaitFrameMax) {
            fireHookWaitFrame = 0;
        }
    }

    if (isPressedZ && fireHookWaitFrame === 0) {
        fireHookWaitFrame++;
        if (isPressedUp && !isPressedLeft && !isPressedRight) {
            player.fireHook(Math.PI / 2);
        }
        else if (isPressedUp && isPressedLeft && !isPressedRight) {
            player.fireHook(Math.PI * 3 / 4);
        }
        else if (isPressedUp && !isPressedLeft && isPressedRight) {
            player.fireHook(Math.PI / 4);
        }
        else if (!isPressedUp && isPressedLeft && !isPressedRight) {
            player.fireHook(Math.PI);
        }
        else if (!isPressedUp && !isPressedLeft && isPressedRight) {
            player.fireHook(0);
        }
        else if (player.direction === "right") {
            player.fireHook(Math.PI / 4);
        }
        else if (player.direction === "left") {
            player.fireHook(Math.PI * 3 / 4);
        }
    }

    if (player.actStatus === "falling") {
        player.fall();
    }
    else if (player.actStatus === "jumping") {
        player.jump();
    }
    else if (isPressedX) {
        player.jumpStart();
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
    player.resolveCollision(staticObjList);

    player.hookMove(staticObjList);

    // 描画する
    staticObjList.forEach(staticObj => {
        staticObj.draw(context);
    });
    player.draw(context);
}

