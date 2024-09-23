
class UnstickableBlock extends Block {
    canStick = false;

    draw(viewport) {
        const ox =  viewport.offsetX;
        const oy =  viewport.offsetY;

        context.beginPath();
        context.rect(this.x + ox, this.y + oy, this.width, this.height);
        context.fillStyle = "#FFA07A";
        context.fill();
    }
}
