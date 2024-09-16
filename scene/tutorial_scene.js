
class TutorialScene extends Scene {
    #controlsDescriptionDom = null;

    #textIndex = 0;
    #textList = [
        "～地上のとき～",
        "←→で移動！",
        "Xでジャンプ！",
        "Zでワイヤー！\n引っかかったワイヤーはZで戻せる！",
        "ワイヤーは↑↓←→で方向が指定できる！",
        "～ぶらさがりのとき～",
        "Xでジャンプ！\nワイヤーは解除されるから注意！",
        "↑でもジャンプ！\nワイヤーは解除されないから安心！\nワイヤーを縮めたいときに使おう！",
        "Zでワイヤー解除！",
        "タイミングよく←→を押すと揺らせる！",
        "↓でワイヤーを伸ばせる！",
        "～その他～",
        "Cでマップ確認モードになるぞ！\n↑↓←→でマップを確認しよう！\nもう一度Cを押すとマップ確認モードが終わるぞ！",
        "～最後に～",
        "いろいろ触って、いろいろ動かして慣れてくれ！\nというか画面外の下に操作方法書いてあるよ！",
        "終わり！閉廷！以上！皆解散！"
    ];

    onStart() {
        this.#controlsDescriptionDom = document.querySelector("#controls-description");
        this.#controlsDescriptionDom.innerText = "←:前へ →:次へ Z:説明終了";

        this.#draw();
    }

    #draw() {
        context.fillStyle = "#0000FF";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.textBaseline = "top";
        context.font = "900 60px sans-serif";
        context.fillStyle = "#FFFFFF";

        const text = this.#textList[this.#textIndex];
        const {width: textWidth, height: textHeight} = measureText(context, text);

        context.fillText(text, (canvas.width - textWidth)/2, (canvas.height - textHeight)/2);
    }

    onEnd() {
        this.#controlsDescriptionDom.innerText = "";
    }
    
    onKeyDown(e) {
        if (e.repeat) {
            e.preventDefault();
            return;
        }

        switch (e.key) {
            case "ArrowLeft": {
                e.preventDefault();
                if (this.#textIndex > 0) {
                    SoundStorage.get("ドンッ").play();
                    this.#textIndex--;
                    this.#draw();
                }
                return;
            }
            case "ArrowRight": case "x": {
                e.preventDefault();
                if (this.#textIndex === this.#textList.length - 1) {
                    SceneManager.finish();
                }
                else {
                    SoundStorage.get("ドンッ").play();
                    this.#textIndex++;
                    this.#draw();
                }
                return;
            }
            case "z": {
                SceneManager.finish();
                return;
            }
        }
    }
}
