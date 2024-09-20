
class Scene {
    prevScene = null;
    onStart() {}
    onEnd() {}
    onResume() {}
    onStop() {}
    onKeyDown(e) {
        if (e.key === "b") {
            if (BGM.isPlaying) {
                BGM.stop();
            }
            else {
                BGM.start();
            }
        }
    }
    onKeyUp(e) {}
}
