
class DeathBlock extends UnstickableBlock {
    draw(viewport) {
        const ox =  viewport.offsetX;
        const oy =  viewport.offsetY;

        context.beginPath();
        context.rect(this.x + ox, this.y + oy, this.width, this.height);
        context.fillStyle = "#4B0082";
        context.fill();
    }

    onCollision(player, status) {
        SoundStorage.get("大破").play();
        super.onCollision(player, status);
        player.die();
    }
}
