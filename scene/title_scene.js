
class TitleScene extends Scene {
    onStart() {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");

        const titleText = "苦行系ワイヤーアクション";
        context.font = "48px sans-serif";
        const titleTextWidth = this.#textWidth(context, titleText);
        context.fillText(titleText, (canvas.width - titleTextWidth) / 2, 150);

        const saisyoText = "最初から";
        context.font = "32px sans-serif";
        const saisyoTextWidth = this.#textWidth(context, saisyoText);
        context.fillText(saisyoText, (canvas.width - saisyoTextWidth) / 2, 300);

        const tudukiText = "続きから";
        context.font = "32px sans-serif";
        const tudukiTextWidth = this.#textWidth(context, tudukiText);
        context.fillText(tudukiText, (canvas.width - tudukiTextWidth) / 2, 360);
    }

    #textWidth(context, text) {
        const measure = context.measureText(text);
        return measure.width;
    }

    onEnd() {
        // noop
    }
    
    onKeyDown(e) {
        SceneManager.start(new GameScene());
    }
    
    onKeyUp(e) {
        // noop
    }
}
