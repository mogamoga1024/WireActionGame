
function createMap(name) {
    switch (name) {
        case "debug1": {
            const staticObj1 = new StaticObject(0, 400, 500, 100);
            const staticObj2 = new StaticObject(600, 400, 400, 100);
            const staticObj3 = new StaticObject(0, 200, 80, 200);
            const staticObj4 = new StaticObject(200, 350, 80, 50);
            const staticObj5 = new StaticObject(70, 200, 250, 30);
            const staticObj6 = new StaticObject(300, 100, 400, 30);
            const staticObj7 = new StaticObject(770, 100, 50, 300);
            const staticObjList = [staticObj1, staticObj2, staticObj3, staticObj4, staticObj5, staticObj6, staticObj7];
            const player = new Player(100, 360);
            return {player, staticObjList};
        }
        case "debug2": {
            const staticObj1 = new StaticObject(0, 400, 1600, 100);
            const staticObj2 = new StaticObject(0, 0, 50, 500);
            const staticObj3 = new StaticObject(1600 - 50, 0, 50, 500);
            const staticObj4 = new StaticObject(300, 0, 1000, 50);
            const staticObj5 = new StaticObject(200, 320, 100, 80);
            const staticObj6 = new StaticObject(1600 - 200 - 100, 320, 100, 80);
            const staticObjList = [staticObj1, staticObj2, staticObj3, staticObj4, staticObj5, staticObj6];
            const player = new Player(100, 360);
            return {player, staticObjList};
        }
        default:
            throw new Error(`マップがない：${name}`);
    }
}


