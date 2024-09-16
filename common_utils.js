
function rad2deg(radian) {
    return radian * (180 / Math.PI);
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

function loadSound(path, volume) {
    const audio = new Audio(path);
    return new Promise(resolve => {
        audio.oncanplaythrough = () => {
            resolve(new Sound(audio, volume));
        };
        audio.onerror = () => {
            resolve(new Sound(audio, volume));
        };
    });
}

function loadTestWait() {
    return new Promise(resolve => {
        setTimeout(resolve, 3000);
    });
}
