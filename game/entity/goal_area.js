
class GoalArea extends RespawnArea {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    canDraw(viewport) {
        const ox = viewport.offsetX;
        const oy = viewport.offsetY;
        const d = 120;
        const x = this.x + ox - d;
        const y = this.y + oy - d;
        const width = this.width + d*2;
        const height = this.height + d*2;
        if (
            x > canvas.width ||
            x + width < 0 ||
            y > canvas.height ||
            y + height < 0
        ) {
            return false;
        }
        return true;
    }

    draw(viewport) {
        const ox = viewport.offsetX;
        const oy = viewport.offsetY;
        const radius = this.height / 2;

        context.globalAlpha = 0.8;

        context.beginPath();
        context.roundRect(this.x + ox, this.y + oy, this.width, this.height, radius);
        context.fillStyle = "#FFFF00";
        context.fill();

        context.globalAlpha = 0.5;

        let d = 40;
        context.beginPath();
        context.roundRect(this.x + ox - d, this.y + oy - d, this.width + d*2 , this.height + d*2, radius + d);
        context.fillStyle = "#FFFF00";
        context.fill();

        context.globalAlpha = 0.3;

        d = 80;
        context.beginPath();
        context.roundRect(this.x + ox - d, this.y + oy - d, this.width + d*2 , this.height + d*2, radius + d);
        context.fillStyle = "#FFFF00";
        context.fill();

        context.globalAlpha = 0.2;

        d = 120;
        context.beginPath();
        context.roundRect(this.x + ox - d, this.y + oy - d, this.width + d*2 , this.height + d*2, radius + d);
        context.fillStyle = "#FFFF00";
        context.fill();

        context.globalAlpha = 1;
    }

    resolveCollision(player) {
        return player.resolveGoalCollision(this);
    }

    onCollision() {
        // console.log("ゴール！");
        Cookies.remove("respaon_area_id", {path: cookiePath});
        Cookies.remove("total_time", {path: cookiePath});
    }
}
