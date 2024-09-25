
class PrologueScene extends Scene {
    #komaIndex = 0;
    #komaList = [
        {
            backgroundImage: null,
            sound: null,
            text: "植木鉢くんが目を覚ますと、見知らぬ不思議な場所にいました。\n" +
                  "周りは静かで、まるで時間が止まっているかのようです。"
        },
        {
            backgroundImage: null,
            sound: null,
            text: "何か大切なことを忘れている気がするけれど、思い出せません。\n" +
                  "それでも胸の奥には、どうしても消えない強い未練が残っていました。"
        },
        {
            backgroundImage: null,
            sound: null,
            text: "ふと遠くを見ると、まばゆい光が見えます。\n" +
                  "植木鉢くんはその光の正体が気になり、足を進めることにしました。"
        },
    ];
    #sound = null;

    onStart() {
        controlsDescriptionDom.innerText = "←:前へ →:次へ Z:プロローグ終了";

        const loadImagePromise = Promise.all([
            loadImage("assets/プロローグ/プロローグ1.png"),
            loadImage("assets/プロローグ/プロローグ2.png"),
            loadImage("assets/プロローグ/プロローグ3.png")
        ]);
        const loadSoundPromise = Promise.all([
            loadSound("プロローグ1"),
            loadSound("プロローグ2"),
            loadSound("プロローグ3")
        ]);

        Promise.all([loadImagePromise, loadSoundPromise]).then(([imageList, soundList]) => {
            for (let i = 0; i < imageList.length; i++) {
                this.#komaList[i].backgroundImage = imageList[i];
                this.#komaList[i].sound = soundList[i];
            }
            this.#sound = this.#komaList[0].sound;
            this.#sound.play();
            this.#draw();
        });
    }

    #draw() {
        const {backgroundImage, text} = this.#komaList[this.#komaIndex];
        drawKoma(backgroundImage, text);
    }

    onKeyDown(e) {
        if (e.repeat) {
            e.preventDefault();
            return;
        }

        switch (e.key) {
            case "ArrowLeft": {
                e.preventDefault();
                if (this.#komaIndex > 0) {
                    this.#komaIndex--;
                    this.#sound.stop();
                    this.#sound = this.#komaList[this.#komaIndex].sound;
                    this.#sound.play();
                    this.#draw();
                }
                return;
            }
            case "ArrowRight": case "x": {
                e.preventDefault();
                if (this.#komaIndex === this.#komaList.length - 1) {
                    this.#sound?.stop();
                    SceneManager.finish();
                }
                else {
                    this.#komaIndex++;
                    this.#sound.stop();
                    this.#sound = this.#komaList[this.#komaIndex].sound;
                    this.#sound.play();
                    this.#draw();
                }
                return;
            }
            case "z": {
                this.#sound?.stop();
                SceneManager.finish();
                return;
            }
        }
    }
}
