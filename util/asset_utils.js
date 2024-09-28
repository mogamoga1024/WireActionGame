
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

function loadSound(key) {
    let {path, volume = 1} = soundParams(key);
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
