
const map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,2,2,0,0,2,2,0,0,2,2,0,0,2,2,0,0,2,2,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,2,2,0,0,2,2,0,0,2,2,0,0,2,2,0,0,2,2,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,2],
    [2,2,3,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

const PLAYER = 1;
const BLOCK = 2;
const TRAMPOLINE = 3;
const DEATH = 4;

const unitSideLength = 30;

const worldHeight = unitSideLength * map.length;

const codeList = [];
let playerCode = "";

for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
        const x = unitSideLength * col;
        const y = unitSideLength * row;

        const type = map[row][col];

        if (type === PLAYER) {
            playerCode = `player = new Player(${x}, ${y});`;
        }
    }
}

let result = `worldHeight = ${worldHeight};\nconst h = worldHeight;\n`;

for (const code of codeList) {
    result += code + "\n";
}

result += playerCode + "\n";

console.log(result);
