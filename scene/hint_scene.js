
class HintScene extends Scene {
    #controlsDescriptionDom = null;

    #textIndex = 0;
    #textList = [];

    onStart() {
        this.#controlsDescriptionDom = document.querySelector("#controls-description");
        this.#controlsDescriptionDom.innerText = "←:前へ →:次へ Z:説明終了";

        let respawnId = -1;
        const strRespawnId = Cookies.get("respaon_area_id");
        if (strRespawnId !== undefined) {
            respawnId = Number(strRespawnId);
        }

        // todo
        switch (respawnId) {
            case -1:
                this.#textList = [
                    "ジャンプ[X]とワイヤー[Z]を\nタイミングよく交互に出そう"
                ];
                break;
            case 9:
                this.#textList = [
                    "↑を押しながらワイヤー[Z]を出すと\n上に射出できるぞ",
                    "ワイヤーは←→で揺らせるぞ",
                    "ワイヤー中に↑を押すと\nワイヤーの長さを縮められるぞ",
                    "分かってると思うけど\n赤いブロックにワイヤーはくっつかないぞ"
                ];
                break;
            case 5:
                this.#textList = [
                    "ワイヤー[Z]とジャンプ[X]を\n繰り返して上に登ろう",
                    "ワイヤー中に↓を押すと\nワイヤーが伸ばせる\nこれで落下死は怖くない",
                    "最後のトランポリンは\nワイヤー[Z]を横にくっつけて\n死を回避してくれ",
                    "難しいけど頑張って",
                ];
                break;
            case 4:
                this.#textList = [
                    "↓を押しながらワイヤー[Z]を出すと\n下に射出できるぞ\nこれを命綱にして落下しよう",
                    "飛んだ時の勢いは\n進行方向の逆のキーで\n抑えられるぞ"
                ];
                break;
            case 6:
                this.#textList = [
                    "最初は特にいうことなし",
                    "最後らへんは↓でワイヤーを伸ばして\nジャンプ[X]ワイヤー[Z]\nって感じ"
                ];
                break;
            case 10:
                this.#textList = [
                    "最初は特にいうことなし\n揺れて飛んで\n↑押してワイヤー[Z]って感じ",
                    "ネズミ返しゾーンは\n右にジャンプ[X]してから\n左上にワイヤー[Z]すれば登れるぞ",
                    "難しいけど頑張って"
                ];
                break;
            case 2:
                this.#textList = [
                    "右に行って～\n左に行って～\n右に行くよ～",
                    "最後の箇所、\n揺れは自然と収まるから待とう",
                    "かなり難しいけど頑張って"
                ];
                break;
            case 7:
                this.#textList = [
                    "下に行くときは\n↓を押しながらワイヤー[Z]で\n命綱を作って落ちよう",
                ];
                break;
            case 11:
                this.#textList = [
                    "難所だよ",
                    "まず上にワイヤー[Z]して\n←→で最大まで揺らそう",
                    "速くなってきたらワイヤーを離して[Z]\n右にダッシュ\nそしてジャンプ[X]！",
                    "トランポリンで飛んだら\n左ぎりぎりまで移動しよう",
                    "ワイヤーを最大まで伸ばして\n勢いよく左側にジャンプ[X]！",
                    "崖が見えたらすかさず\n←を押しながらワイヤー[Z]！",
                    "その後はジャンプ[↑]で崖を登ろう",
                    "ここを乗り切ればゴールは近いぞ\n諦めないでくれ"
                ];
                break;
            default:
                this.#textList = ["（データが）ないです。"];
                break;
        }
        this.#textList.push("終わり！閉廷！以上！皆解散！");

        this.#draw();
    }

    onEnd() {
        this.#controlsDescriptionDom.innerText = "";
    }

    #draw() {
        context.fillStyle = "#0000FF";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.textBaseline = "top";
        context.fillStyle = "#FFFFFF";

        const text = this.#textList[this.#textIndex];
        const lineTextList = text.split("\n");
        context.font = "900 40px sans-serif";
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

    onKeyDown(e) {
        if (e.repeat) {
            e.preventDefault();
            return;
        }

        switch (e.key) {
            case "ArrowLeft": {
                e.preventDefault();
                SoundStorage.get("閉廷").reset();
                if (this.#textIndex > 0) {
                    SoundStorage.get("ドンッ").play();
                    this.#textIndex--;
                    this.#draw();
                }
                return;
            }
            case "ArrowRight": case "x": {
                e.preventDefault();
                SoundStorage.get("閉廷").reset();
                if (this.#textIndex === this.#textList.length - 1) {
                    SceneManager.finish();
                }
                else {
                    if (this.#textIndex === this.#textList.length - 2) {
                        SoundStorage.get("閉廷").play();
                    }
                    else {
                        SoundStorage.get("ドンッ").play();
                    }

                    this.#textIndex++;
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
