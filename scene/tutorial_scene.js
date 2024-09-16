
class TutorialScene extends Scene {
    #controlsDescriptionDom = null;

    #textDataIndex = 0;
    #textDataList = [];

    onStart() {
        this.#controlsDescriptionDom = document.querySelector("#controls-description");
        this.#controlsDescriptionDom.innerText = "←:前へ →:次へ Z:説明終了";

        const tmpTextList = [
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

        let section = "";
        for (const text of tmpTextList) {
            if (text[0] === "～") {
                section = text;
                this.#textDataList.push({section: "", text});
            }
            else {
                this.#textDataList.push({section, text});
            }
        }

        this.#draw();
    }

    #draw() {
        context.fillStyle = "#0000FF";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.textBaseline = "top";
        context.fillStyle = "#FFFFFF";

        const {section, text} = this.#textDataList[this.#textDataIndex];
        const lineTextList = text.split("\n");
        const textSizeList = lineTextList.map(lineText => measureText(context, lineText))
        const totalTextHeight = textSizeList.reduce((acc, cur) => acc + cur.height, 0);
        let y = (canvas.height - totalTextHeight)/2;
        for (let i = 0; i < lineTextList.length; i++) {
            context.font = "900 28px sans-serif";
            context.fillText(section, 40, 40);

            context.font = "900 40px sans-serif";
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
                SoundStorage.get("閉廷").reset();
                if (this.#textDataIndex > 0) {
                    SoundStorage.get("ドンッ").play();
                    this.#textDataIndex--;
                    this.#draw();
                }
                return;
            }
            case "ArrowRight": case "x": {
                e.preventDefault();
                SoundStorage.get("閉廷").reset();
                if (this.#textDataIndex === this.#textDataList.length - 1) {
                    SceneManager.finish();
                }
                else {
                    if (this.#textDataIndex === this.#textDataList.length - 2) {
                        SoundStorage.get("閉廷").play();
                    }
                    else {
                        SoundStorage.get("ドンッ").play();
                    }

                    this.#textDataIndex++;
                    this.#draw();
                }
                return;
            }
            case "z": {
                SoundStorage.get("閉廷").reset();
                SceneManager.finish();
                return;
            }
        }
    }
}
