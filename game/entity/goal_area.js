
class GoalArea extends RespawnArea {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    draw(context, viewport) {
        const ox =  viewport.offsetX;
        const oy =  viewport.offsetY;

        context.globalAlpha = 0.4;

        context.beginPath();
        context.rect(this.x + ox, this.y + oy, this.width, this.height);
        context.fillStyle = "#FFEB99";
        context.fill();

        context.globalAlpha = 1;
    }

    resolveCollision(player) {
        return player.resolveGoalCollision(this);
    }

    onCollision() {
        console.log("ゴール！");
    }
}
