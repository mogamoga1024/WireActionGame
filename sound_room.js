
const $bgm = $("#bgm");

let isBgmPlaying = false;
$bgm.on("click", function() {
    isBgmPlaying = !isBgmPlaying;
    if (isBgmPlaying) {
        BGM.start();
    }
    else {
        BGM.stop();
    }
});

const $common = $("#common");
const $inmu = $("#inmu");
const $kenzen = $("#kenzen");

const soundNameList1 = [
    "ドンッ", "大破", "ないです",
    "プロローグ1", "プロローグ2", "プロローグ3",
    "エンディング1", "エンディング2", "エンディング3", "エンディング4",
    "エンディング5", "エンディング6", "エンディング7", "おしまい"
];

const soundNameList2 = [
    "あっ（確信犯）", "やりますねぇ", "ぬぁぁん疲れたもぉぉん",
    "これもうわかんねぇな", "閉廷", "ｼｭｰ", "ヌッ！", "ほらいくどー"
];

for (const name of soundNameList1) {
    const $button = createButton(name);
    $common.append($button);
}

for (const name of soundNameList2) {
    const $button = createButton(name, true);
    $inmu.append($button);
}

for (const name of soundNameList2) {
    const $button = createButton(name, false);
    $kenzen.append($button);
}

function createButton(name, isInmu) {
    const $button = $(`<button>${name}</button>`);
    let sound = null;
    $button.on("click", function() {
        if (sound === null) {
            if (isInmu) {
                window.isInmu = true;
                window.edition = "INMU";
            }
            else {
                window.isInmu = false;
                window.edition = "健全";
            }
            loadSound(name).then(s => {
                sound = s;
                sound.play();
            });
        }
        else {
            sound.play();
        }
    });
    return $button;
}

