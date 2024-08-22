
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

const NONE = 0;
const PLAYER = 1;
const BLOCK = 2;
const TRAMPOLINE = 3;
const DEATH = 4;

const unitSideLength = 40;

const worldHeight = unitSideLength * map.length;

const blockList = [];
let playerCode = "";

const rowMax = map.length;
const colMax = map[0].length;

for (let row = 0; row < rowMax; row++) {
    for (let col = 0; col < colMax; col++) {
        const x = unitSideLength * col;
        const y = unitSideLength * row;

        const type = map[row][col];

        if (type === PLAYER) {
            playerCode = `player = new Player(${x}, ${y});`;
            continue;
        }
        else if (type === NONE) {
            continue;
        }

        let width = unitSideLength;
        let nextCol = col + 1;
        while (nextCol < colMax) {
            if (map[row][nextCol] !== type) {
                break;
            }
            map[row][nextCol] = NONE;
            width += unitSideLength;
            nextCol++;
        }

        let height = unitSideLength;
        let nextRow = row + 1;
        while (nextRow < rowMax) {
            let shouldBreak = false;
            for (let c = col; c < nextCol; c++) {
                if (map[nextRow][c] !== type) {
                    shouldBreak = true;
                    break;
                }
            }
            if (shouldBreak) {
                break;
            }
            for (let c = col; c < nextCol; c++) {
                map[nextRow][c] = NONE;
            }
            height += unitSideLength;
            nextRow++;
        }

        let className = "";
        switch (type) {
            case BLOCK: className = "Block"; break;
            case TRAMPOLINE: className = "Trampoline"; break;
            case DEATH: className = "DeathBlock"; break;
        }
        blockList.push(`bp(new ${className}(${x}, ${y}, ${width}, ${height}));`);
    }
}

let result = `worldHeight = ${worldHeight};\n`;

for (const code of blockList) {
    result += code + "\n";
}

result += playerCode + "\nbreak;\n";

console.log(result);
