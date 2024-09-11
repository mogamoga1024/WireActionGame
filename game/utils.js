
function rad2deg(radian) {
    return radian * (180 / Math.PI);
}

function drawStrokeText(context, text, x, y) {
    context.strokeText(text, x, y);
    context.fillText(text, x, y);
}

function formatMilliseconds(ms) {
    // 時間、分、秒、ミリ秒を計算
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = (ms % 1000) / 1000;

    // 時間、分がゼロなら省略
    let strTime = "";

    if (hours > 0) {
        strTime += `${hours}:`;
    }

    if (minutes > 0 || hours > 0) { // 分を表示するのは、時間がある場合
        strTime += `${minutes.toString().padStart(2, '0')}:`;
    }

    // 小数点以下2桁にフォーマット
    const formattedMilliseconds = milliseconds.toFixed(2).slice(2);

    strTime += `${seconds.toString().padStart(2, '0')}.${formattedMilliseconds}`;

    return strTime;
}

function loadImage(path) {
    const image = new Image();
    image.src = path;
    return new Promise(resolve => {
        image.onload = () => {
            resolve(image);
        };
        image.onerror = () => {
            resolve(image);
        };
    });
}

