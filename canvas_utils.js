
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
    
    if (drawLoading.isMobile) {
        context.drawImage(drawLoading.backgroundImage, 0, 0, canvas.width, canvas.height);
        const text = "（PCじゃないと動か）ないです";
        context.textBaseline = "top";
        context.font = "900 36px sans-serif";
        context.fillStyle = "#FF0000";
        const textWidth = context.measureText(text).width;
        context.fillText(text, (canvas.width - textWidth)/2, 440);
    }
    else {
        context.globalAlpha = 0.8;
        context.drawImage(drawLoading.backgroundImage, 0, 0, canvas.width, canvas.height);
        context.globalAlpha = 1;
        const text = "Loading...";
        context.textBaseline = "top";
        context.font = "900 48px sans-serif";
        context.fillStyle = "#000000";
        context.strokeStyle = "#FFFFFF";
        context.lineWidth = 5;
        drawStrokeText(context, text, 530, 400);
    }
}

function drawKoma(backgroundImage, text) {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    context.textBaseline = "top";
    
    const lineTextList = text.split("\n");
    context.font = "900 24px sans-serif";
    const textSizeList = lineTextList.map(lineText => measureText(context, lineText))
    const textWindowPadding = 18;
    const textWindowStrokeWidth = 8;
    const totalTextHeight = textSizeList.reduce((acc, cur) => acc + cur.height, 0) + textWindowPadding * 2;
    let y = canvas.height - totalTextHeight - textWindowStrokeWidth/2;

    context.beginPath();
    context.fillStyle = "#FFFDD0";
    context.strokeStyle = "#8B4513";
    context.lineWidth = textWindowStrokeWidth;
    context.roundRect(textWindowStrokeWidth/2, y, canvas.width - textWindowStrokeWidth, totalTextHeight, 20);
    context.stroke();
    context.fill();

    y += textWindowPadding;
    context.fillStyle = "#000000";
    for (let i = 0; i < lineTextList.length; i++) {
        const lineText = lineTextList[i];
        const {width: textWidth, height: textHeight} = textSizeList[i];
        context.fillText(lineText, (canvas.width - textWidth)/2, y);
        y += textHeight;
    }
}

