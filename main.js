
let isPressedUp = false;
let isPressedDown = false;
let isPressedLeft = false;
let isPressedRight = false;
let isPressedX = false;
let isPressedZ = false;

const controlsDescriptionDom = document.querySelector("#controls-description");
const showControlsDescriptionDom = document.querySelector("#show-controls-description");
let showControlsDescription = true;
let isGhost = false;

addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp":    isPressedUp    = true; break;
        case "ArrowDown":  isPressedDown  = true; break;
        case "ArrowLeft":  isPressedLeft  = true; break;
        case "ArrowRight": isPressedRight = true; break;
        case "x": isPressedX = true; break;
        case "z": isPressedZ = true; break;
        case "h": {
            showControlsDescription = !showControlsDescription;
            if (showControlsDescription) {
                showControlsDescriptionDom.innerText = "H:操作説明を隠す";
                controlsDescriptionDom.style.display = "";
            }
            else {
                showControlsDescriptionDom.innerText = "H:操作説明";
                controlsDescriptionDom.style.display = "none";
            }
        }
        case "g": {
            isGhost = !isGhost;
        }
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

let stateName = (new URL(window.location.href)).searchParams.keys().next().value;
if (stateName === undefined) {
    stateName = "hard";
}

canvas.width = 800;
canvas.height = 500;
let {player, blockList, world} = MapFactory.create(stateName);
const viewport = new Viewport(canvas, world, player);

let fireHookWaitFrame = 0;
const fireHookWaitFrameMax = 15;

function update() {
    if (fireHookWaitFrame !== 0) {
        fireHookWaitFrame++;
        if (fireHookWaitFrame >= fireHookWaitFrameMax) {
            fireHookWaitFrame = 0;
        }
    }

    if (player.opacity === 0) {
        player = player.nextPlayer();
        viewport.setPlayer(player);
    }

    if (isGhost) {
        player.ghostMove(forceDirection());
    }
    else {
        playerMove();
    }

    // 描画する
    blockList.forEach(block => {
        block.draw(context, viewport);
    });
    player.draw(context, viewport);

    switch (player.actStatus) {
        case "ground":
            controlsDescriptionDom.innerText =  "X:ジャンプ Z:フックショット ←→:移動\n";
            controlsDescriptionDom.innerText += "フックは↑↓←→で方向が決められる";
            break;
        case "furiko":
            controlsDescriptionDom.innerText = "X:ジャンプ Z:フックを外す ↑:ワイヤージャンプ ↓:ワイヤーを伸ばす ←→:揺らす";
            break;
        case "jumping":
        case "falling":
            controlsDescriptionDom.innerText = "Z:フックショット ←→:移動\n";
            controlsDescriptionDom.innerText += "フックは↑↓←→で方向が決められる";
            break;
        case "furiko-ground":
            controlsDescriptionDom.innerText = "X:ジャンプ Z:フックを外す ↑:ワイヤージャンプ ←→:移動";
            break;
        case "furiko-jumping":
        case "furiko-falling":
            controlsDescriptionDom.innerText = "Z:フックを外す ←→:移動";
            break;
    }
}

function playerMove() {
    if (isPressedZ && fireHookWaitFrame === 0) {
        fireHookWaitFrame++;
        player.fireHook(fireHookRadian());
    }

    if (isPressedX) {
        player.jumpStart();
    }

    player.applyForce(forceDirection());

    player.move(blockList);
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
    let horizontal = "none";
    let vertical = "none";

    if (isPressedLeft && !isPressedRight) {
        horizontal = "left";
    }
    else if (!isPressedLeft && isPressedRight) {
        horizontal = "right";
    }

    if (isPressedUp && !isPressedDown) {
        vertical = "up";
    }
    else if (!isPressedUp && isPressedDown) {
        vertical = "down";
    }
    
    return {horizontal, vertical};
}
