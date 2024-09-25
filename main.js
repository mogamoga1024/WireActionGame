
// DOM
const controlsDescriptionDom = document.querySelector("#controls-description");
const mapDescriptionDom = document.querySelector("#map-description");
const helpDescriptionDom = document.querySelector("#help-description");
const bgmDescriptionDom = document.querySelector("#bgm-description");

// Canvas設定
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

// えみたん
const emitter = new TinyEmitter();

// スマホは遊べない
const mobileRegex = /iphone;|(android|nokia|blackberry|bb10;).+mobile|android.+fennec|opera.+mobi|windows phone|symbianos/i;
const isMobileByUa = mobileRegex.test(navigator.userAgent);;
const isMobileByClientHint = navigator.userAgentData && navigator.userAgentData.mobile;
drawLoading.isMobile = isMobileByUa || isMobileByClientHint;

// BGM
bgmDescriptionDom.innerText = "B:BGM ON";
window.addEventListener("keydown", e => {
    if (e.repeat) {
        e.preventDefault();
        return;
    }

    if (e.key === "b") {
        if (SceneManager.sceneName === "TitleScene") {
            if (bgmDescriptionDom.innerText === "B:BGM ON") {
                bgmDescriptionDom.innerText = "B:BGM OFF";
            }
            else {
                bgmDescriptionDom.innerText = "B:BGM ON";
            }
        }
        else if (BGM.isPlaying) {
            BGM.stop();
            bgmDescriptionDom.innerText = "B:BGM OFF";
        }
        else {
            BGM.start();
            bgmDescriptionDom.innerText = "B:BGM ON";
        }
    }
});

const isInmu = (new URL(window.location.href)).searchParams.get("inmu") === "true";
const isDebug = (new URL(window.location.href)).searchParams.get("debug") === "true";
const edition = isInmu ? "INMU" : "健全";

// 画像とか音とか読み込んだ後にゲーム開始
let backgroundImagePath = `assets/${edition}/サブリミナル先輩.png`;
if (drawLoading.isMobile) {
    backgroundImagePath = "assets/ないです.png";
}

loadImage(backgroundImagePath).then(image => {
    drawLoading.backgroundImage = image;
    drawLoading();

    const imageLoadPromise = ImageStorage.create({
        "植木鉢くんL": "assets/植木鉢くんL.png",
        "植木鉢くんR": "assets/植木鉢くんR.png",
        "お花": "assets/お花.png",
        "植木鉢くんの最期1": "assets/植木鉢くんの最期1.png",
        "植木鉢くんの最期2": "assets/植木鉢くんの最期2.png",
        "バレーボールくん": "assets/バレーボールくん.png",
    });
    
    const soundLoadPromise = SoundStorage.create([
        "ドンッ",
        "あっ（確信犯）",
        "大破",
        "やりますねぇ",
        "ぬぁぁん疲れたもぉぉん",
        "これもうわかんねぇな",
        "閉廷",
        "ｼｭｰ",
        "ヌッ！"
    ]);
    
    Promise.all([imageLoadPromise, soundLoadPromise]).then(() => {
        // ゲームを開始
        SceneManager.start(new TitleScene());
        // SceneManager.start(new HelpScene());
        // SceneManager.start(new TutorialScene());
        // SceneManager.start(new PrologueScene());
        // SceneManager.start(new EndingScene());
    });
});
