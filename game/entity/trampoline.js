
class Trampoline extends UnstickableBlock {
    draw(viewport) {
        const ox =  viewport.offsetX;
        const oy =  viewport.offsetY;

        context.beginPath();
        context.rect(this.x + ox, this.y + oy, this.width, this.height);
        context.fillStyle = "#006400";
        context.fill();
    }

    onCollision(player, status) {
        super.onCollision(player, status);
        if (status === "落下中に床に衝突") {
            player.setupTrampolineJump();
        }
    }
}
