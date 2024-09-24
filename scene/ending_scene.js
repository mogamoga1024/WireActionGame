
class EndingScene extends Scene {
    #komaIndex = 0;
    #komaList = [
        {
            backgroundImage: null,
            text: "ついに光の場所にたどり着いた植木鉢くん。\n" +
                  "その瞬間、彼はすべてを思い出しました。"
        },
        {
            backgroundImage: null,
            text: "自分を大切に育ててくれたおじさんのこと。\n" +
                  "そして、真夏の日におじさんを守るために\n" +
                  "バレーボールを受けて割れてしまったこと。"
        },
        {
            backgroundImage: null,
            text: "何より今まで、おじさんに「ありがとう」を伝えられなかったことが、\n" +
                  "彼をずっと縛り続けていたのです。"
        },
        {
            backgroundImage: null,
            text: "そのとき、光の中からGOという神様が現れました。\n" +
                  "「植木鉢くん、長い間、苦しんだね。\n" +
                  "未練を抱えて迷い続ける道は、つらかっただろう。\n" +
                  "でも、君はその苦行を乗り越え、ここまでたどり着いたんだ。」"
        },
        {
            backgroundImage: null,
            text: "GOは優しく微笑みました。\n" +
                  "「さあ、何でも叶えてあげよう。」"
        },
        {
            backgroundImage: null,
            text: "植木鉢くんは、少しの間、考えてから言いました。\n" +
                  "「おじさんに、ありがとうを伝えてほしいんだ。\n" +
                  "それができれば、僕はもう十分だよ。」"
        },
        {
            backgroundImage: null,
            text: "GOが静かにうなずくと、光がますます暖かく、まばゆく輝きました。\n" +
                  "植木鉢くんは安らかな微笑みを浮かべながら、\n" +
                  "静かに光の中へ消えていきました。"
        },
        {
            backgroundImage: null,
            text: "おしまい"
        },
    ];
    #canKeyDown = true;

    onStart() {
        controlsDescriptionDom.innerText = "←:前へ →:次へ";

        const promiseList = [
            loadImage("assets/エンディング/エンディング1.png"),
            loadImage("assets/エンディング/エンディング2.png"),
            loadImage("assets/エンディング/エンディング3.png"),
            loadImage("assets/エンディング/エンディング4.png"),
            loadImage("assets/エンディング/エンディング5.png"),
            loadImage("assets/エンディング/エンディング6.png"),
            loadImage("assets/エンディング/エンディング7.png"),
            loadImage("assets/虚無.png"),
        ];

        Promise.all(promiseList).then(imageList => {
            for (let i = 0; i < imageList.length; i++) {
                this.#komaList[i].backgroundImage = imageList[i];
            }
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

        if (!this.#canKeyDown) {
            return;
        }

        switch (e.key) {
            case "ArrowLeft": {
                e.preventDefault();
                if (this.#komaIndex > 0) {
                    this.#komaIndex--;
                    this.#draw();
                }
                return;
            }
            case "ArrowRight": case "x": {
                e.preventDefault();
                if (this.#komaIndex === this.#komaList.length - 1) {
                    this.#canKeyDown = false;
                    setTimeout(() => {
                        SceneManager.start(new TitleScene());
                    }, 500);
                }
                else {
                    this.#komaIndex++;
                    this.#draw();
                }
                return;
            }
        }
    }
}
