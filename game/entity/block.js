
class Block extends Entity {
    canStick = true;

    draw(viewport) {
        const ox =  viewport.offsetX;
        const oy =  viewport.offsetY;

        context.beginPath();
        context.rect(this.x + ox, this.y + oy, this.width, this.height);
        context.fillStyle = "#00BFFF";
        context.fill();
    }

    resolveCollision(player) {
        return player.resolveBlockCollision(this);
    }

    onCollision(player, status) {
        // if (status !== "床に接している") {
        //     console.log(status);
        // }
    }
}
