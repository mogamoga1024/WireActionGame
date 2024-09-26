
function soundParams(key) {
    const ondoku = 0.8;
    switch (key) {
        case "ドンッ": return {path: "asset/ドンッ.mp3", volume: 0.4};
        case "大破": return {path: "asset/大破.mp3", volume: 0.6};
        case "ないです": return {path: "asset/ないです.mp3", volume: 0.6};
        case "プロローグ1": return {path: "asset/プロローグ/プロローグ1.mp3", volume: ondoku};
        case "プロローグ2": return {path: "asset/プロローグ/プロローグ2.mp3", volume: ondoku};
        case "プロローグ3": return {path: "asset/プロローグ/プロローグ3.mp3", volume: ondoku};
        case "エンディング1": return {path: "asset/エンディング/エンディング1.mp3", volume: ondoku};
        case "エンディング2": return {path: "asset/エンディング/エンディング2.mp3", volume: ondoku};
        case "エンディング3": return {path: "asset/エンディング/エンディング3.mp3", volume: ondoku};
        case "エンディング4": return {path: "asset/エンディング/エンディング4.mp3", volume: ondoku};
        case "エンディング5": return {path: "asset/エンディング/エンディング5.mp3", volume: ondoku};
        case "エンディング6": return {path: "asset/エンディング/エンディング6.mp3", volume: ondoku};
        case "エンディング7": return {path: "asset/エンディング/エンディング7.mp3", volume: ondoku};
        case "おしまい": return {path: "asset/エンディング/おしまい.mp3", volume: ondoku};
    }
    
    if (isInmu) {
        switch (key) {
            case "あっ（確信犯）": return {path: `asset/${edition}/あっ（確信犯）.mp3`, volume: 0.8};
            case "やりますねぇ": return {path: `asset/${edition}/やりますねぇ.mp3`, volume: 0.7};
            case "ぬぁぁん疲れたもぉぉん": return {path: `asset/${edition}/ぬぁぁん疲れたもぉぉん.mp3`, volume: 0.3};
            case "これもうわかんねぇな": return {path: `asset/${edition}/これもうわかんねぇな.mp3`, volume: 0.9};
            case "閉廷": return {path: `asset/${edition}/終わり！！閉廷！！以上！！皆解散！！.mp3`, volume: 1};
            case "ｼｭｰ": return {path: `asset/${edition}/ｼｭｰ.mp3`, volume: 0.5};
            case "ヌッ！": return {path: `asset/${edition}/ヌッ！.mp3`, volume: 0.6};
            case "ほらいくどー": return {path: `asset/${edition}/ほらいくどー.mp3`, volume: 0.7};
        }
    }
    else {
        const volume = 0.9;
        switch (key) {
            case "あっ（確信犯）": return {path: `asset/${edition}/あっ（確信犯）.mp3`, volume};
            case "やりますねぇ": return {path: `asset/${edition}/やりますねぇ.mp3`, volume};
            case "ぬぁぁん疲れたもぉぉん": return {path: `asset/${edition}/ぬぁぁん疲れたもぉぉん.mp3`, volume};
            case "これもうわかんねぇな": return {path: `asset/${edition}/これもうわかんねぇな.mp3`, volume};
            case "閉廷": return {path: `asset/${edition}/終わり！！閉廷！！以上！！皆解散！！.mp3`, volume};
            case "ｼｭｰ": return {path: `asset/${edition}/ｼｭｰ.mp3`};
            case "ヌッ！": return {path: `asset/${edition}/ヌッ！.mp3`};
            case "ほらいくどー": return {path: `asset/${edition}/ほらいくどー.mp3`, volume};
        }
    }
    throw new Error(`存在しないkey：${key}`);
}


