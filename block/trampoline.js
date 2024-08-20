
class Trampoline extends UnstickableBlock {
    draw(context, viewport) {
        const ox =  viewport.offsetX;
        const oy =  viewport.offsetY;

        context.beginPath();
        context.rect(this.x + ox, this.y + oy, this.width, this.height);
        context.fillStyle = "#006400";
        context.fill();
    }
}
