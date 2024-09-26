
function rad2deg(radian) {
    return radian * (180 / Math.PI);
}

function loadTestWait() {
    return new Promise(resolve => {
        setTimeout(resolve, 3000);
    });
}
