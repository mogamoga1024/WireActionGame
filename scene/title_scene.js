
class TitleScene extends Scene {
    onStart() {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");

        context.font = "48px serif";
        context.fillText("Hello world", 10, 50);
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
