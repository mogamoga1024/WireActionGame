
let isPressedUp = false;
let isPressedDown = false;
let isPressedLeft = false;
let isPressedRight = false;
let isPressedX = false;
let isPressedZ = false;

addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp":    isPressedUp    = true; break;
        case "ArrowDown":  isPressedDown  = true; break;
        case "ArrowLeft":  isPressedLeft  = true; break;
        case "ArrowRight": isPressedRight = true; break;
        case "x": isPressedX = true; break;
        case "z": isPressedZ = true; break;
    }
});

addEventListener("keyup", e => {
    switch (e.key) {
        case "ArrowUp":    isPressedUp    = false; break;
        case "ArrowDown":  isPressedDown  = false; break;
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
// }, 50);

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;
const globalWidth = canvas.width * 2;
const globalHeight = canvas.height;

const {player, staticObjList} = createMap("debug2");
const viewport = new Viewport(0, 0, canvas.width, canvas.height, globalWidth, globalHeight, player);

let fireHookWaitFrame = 0;
const fireHookWaitFrameMax = 15;

function update() {
    if (fireHookWaitFrame !== 0) {
        fireHookWaitFrame++;
        if (fireHookWaitFrame >= fireHookWaitFrameMax) {
            fireHookWaitFrame = 0;
        }
    }

    if (isPressedZ && fireHookWaitFrame === 0) {
        fireHookWaitFrame++;
        player.fireHook(fireHookRadian());
    }

    if (isPressedX) {
        player.jumpStart();
    }

    player.applyForce(forceDirection());

    player.move(staticObjList);

    // 描画する
    staticObjList.forEach(staticObj => {
        staticObj.draw(context, viewport);
    });
    player.draw(context, viewport);
}

function fireHookRadian() {
    if (isPressedUp && !isPressedDown && !isPressedLeft && !isPressedRight) {
        return Math.PI / 2;
    }
    else if (isPressedUp && !isPressedDown && isPressedLeft && !isPressedRight) {
        return Math.PI * 3 / 4;
    }
    else if (isPressedUp && !isPressedDown && !isPressedLeft && isPressedRight) {
        return Math.PI / 4;
    }
    else if (!isPressedUp && !isPressedDown && isPressedLeft && !isPressedRight) {
        return Math.PI;
    }
    else if (!isPressedUp && !isPressedDown && !isPressedLeft && isPressedRight) {
        return 0;
    }
    else if (!isPressedUp && isPressedDown && !isPressedLeft && !isPressedRight) {
        return -1 * Math.PI / 2;
    }
    else if (player.direction === "up") {
        return Math.PI / 2;
    }
    else if (player.direction === "down") {
        return -1 * Math.PI / 2;
    }
    else if (player.direction === "right") {
        return Math.PI / 4;
    }
    else if (player.direction === "left") {
        return Math.PI * 3 / 4;
    }
    throw new Error("想定外の入力");
}

function forceDirection() {
    if (isPressedLeft && !isPressedRight) {
        return "left";
    }
    else if (!isPressedLeft && isPressedRight) {
        return "right";
    }
    else if (isPressedUp && !isPressedDown) {
        return "up";
    }
    else if (!isPressedUp && isPressedDown) {
        return "down";
    }
    else {
        return "none";
    }
}
