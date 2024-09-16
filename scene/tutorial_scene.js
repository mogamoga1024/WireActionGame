
class TutorialScene extends Scene {
    #controlsDescriptionDom = null;

    #textIndex = 0;
    #textList = [
        "～地上のとき～",
        "←→で移動！",
        "Xでジャンプ！",
        "Zでワイヤー！\n" +
        "引っかかったワイヤーはZで戻せる！",
        "ワイヤーは↑↓←→で方向が指定できる！",
        "～ぶらさがりのとき～",
        "Xでジャンプ！\n" +
        "ワイヤーは解除されるから注意！",
        "↑でもジャンプ！\n" +
        "ワイヤーは解除されないから安心！\n" +
        "ワイヤーを縮めたいときに使おう！",
        "Zでワイヤー解除！",
        "タイミングよく←→を押すと揺らせる！",
        "↓でワイヤーを伸ばせる！",
        "～その他～",
        "Cでマップ確認モードになるぞ！\n" +
        "↑↓←→でマップを確認しよう！",
        "～最後に～",
        "いろいろ動かして慣れてくれ！\n" +
        "画面外の下にも操作方法書いてあるよ！",
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
        context.font = "900 40px sans-serif";
        context.fillStyle = "#FFFFFF";

        const text = this.#textList[this.#textIndex];
        const lineTextList = text.split("\n");
        const textSizeList = lineTextList.map(lineText => measureText(context, lineText))
        const totalTextHeight = textSizeList.reduce((acc, cur) => acc + cur.height, 0);
        let y = (canvas.height - totalTextHeight)/2;
        for (let i = 0; i < lineTextList.length; i++) {
            const lineText = lineTextList[i];
            const {width: textWidth, height: textHeight} = textSizeList[i];
            context.fillText(lineText, (canvas.width - textWidth)/2, y);
            y += textHeight;
        }
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
            case "z": {
                SceneManager.finish();
                return;
            }
            default: {
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
        }
    }
}
