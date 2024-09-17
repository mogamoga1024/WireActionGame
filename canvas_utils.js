
function measureText(context, text) {
    const measure = context.measureText(text);
    return {
        width: measure.width,
        height: Math.abs(measure.actualBoundingBoxAscent) + measure.actualBoundingBoxDescent
    };
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

function drawLoading() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.8;
    context.drawImage(drawLoading.backgroundImage, 0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;

    if (drawLoading.isMobile) {
        const text = "（PCじゃないと動か）ないです";
        context.textBaseline = "top";
        context.font = "900 36px sans-serif";
        context.fillStyle = "#FF0000";
        const textWidth = context.measureText(text).width;
        context.fillText(text, (canvas.width - textWidth)/2, 440);
    }
    else {
        const text = "Loading...";
        context.textBaseline = "top";
        context.font = "48px sans-serif";
        context.fillStyle = "#000000";
        context.strokeStyle = "#FFFFFF";
        context.lineWidth = 5;
        drawStrokeText(context, text, 530, 400);
    }
}



