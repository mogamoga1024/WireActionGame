
// Canvas設定
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

// えみたん
const emitter = new TinyEmitter();

loadImage("assets/サブリミナル先輩.png").then(image => {
    const mobileRegex = /iphone;|(android|nokia|blackberry|bb10;).+mobile|android.+fennec|opera.+mobi|windows phone|symbianos/i;
    const isMobileByUa = mobileRegex.test(navigator.userAgent);;
    const isMobileByClientHint = navigator.userAgentData && navigator.userAgentData.mobile;
    drawLoading.isMobile = isMobileByUa || isMobileByClientHint;
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
    
    const soundLoadPromise = SoundStorage.create({
        "ドンッ": {path: "assets/ドンッ.mp3", volume: 0.5},
        "あっ（確信犯）": {path: "assets/あっ（確信犯）.mp3", volume: 0.9},
        "大破": {path: "assets/大破.mp3", volume: 0.9},
    });
    
    Promise.all([imageLoadPromise, soundLoadPromise]).then(() => {
        // ゲームを開始
        SceneManager.start(new TitleScene());
        // SceneManager.start(new HelpScene());
    });
});
