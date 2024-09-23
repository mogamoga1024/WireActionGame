
class RespawnArea extends Entity {
    #id = -1;
    get id() { return this.#id; }
    get centerX() { return this.x + this.width / 2; }
    get centerY() { return this.y + this.height / 2; }
    #direction = "right";
    get direction() { return this.#direction; }

    constructor(x, y, width, height, direction = "right", id = -1) {
        super(x, y, width, height);
        this.#id = id;
        this.#direction = direction;
    }

    draw(viewport) {
        const ox = viewport.offsetX;
        const oy = viewport.offsetY;

        context.globalAlpha = 0.4;

        context.beginPath();
        context.roundRect(this.x + ox, this.y + oy, this.width, this.height, 20);
        context.fillStyle = "#32CD32";
        context.fill();

        context.globalAlpha = 1;
    }

    resolveCollision(player) {
        return player.resolveRespawnAreaCollision(this);
    }

    onCollision() {
        // console.log(`リスポーン更新 ${this.id}`);
        SoundStorage.get("やりますねぇ").play();
        Cookies.set("respaon_area_id", String(this.id), {expires: 365});
        emitter.emit("respawn-area-collision");
    }
}
