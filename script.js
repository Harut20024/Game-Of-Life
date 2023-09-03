let matrix = [];
let n = 30;
let m = 60;

function characters(quant, index) {
    let k = 0;
    while (k < quant) {
        let x = Math.floor(random(0, m));
        let y = Math.floor(random(0, n));
        if (matrix[y][x] == 0) {
            matrix[y][x] = index;
            k++
        }
    }
}


let side = 20;
let grassArr = []
let grassEaterArr = []
let predatorArr = []
let bombArr = []

function setup() {
    for (let i = 0; i < n; i++) {
        matrix.push([]);
        for (let j = 0; j < m; j++) {
            matrix[i].push(0)
        }
    }

    characters(50, 1)
    characters(30, 2)
    characters(5, 3)
    characters(20, 6)

    frameRate(5);

    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y, 1)
                grassArr.push(grass)
            }
            else if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y, 2)
                grassEaterArr.push(grassEater)
            }
            else if (matrix[y][x] == 3) {
                let predator = new Predator(x, y, 3)
                predatorArr.push(predator)
            }
            else if (matrix[y][x] == 6) {
                let bomb = new Bomb(x, y, 5)
                bombArr.push(bomb)
            }
        }
    }
}

function draw() {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == "boom") {
                fill("red");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("blue");
            } else if (matrix[y][x] == 6) {
                fill("black");
            }

            rect(x * side, y * side, side, side);
        }
    }

    if (bombArr.length === 0) {
        characters(10, 6); 
        bombArr = [];
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] === 6) {
                    let bomb = new Bomb(x, y, 1);
                    bombArr.push(bomb);
                }
            }
        }
    }
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat();
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat();
    }
    for (let i = 0; i < bombArr.length; i++) {
        bombArr[i].update();
    }
}

