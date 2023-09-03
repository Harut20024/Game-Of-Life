let matrix = [];
let n = 30;
let m = 60;

const heading = document.querySelector("h1")
heading.innerHTML = ""
let bodyElement = document.body;
let time = 0;

function characters(cout, index) {
    let k = 0;
    while (k < cout) {
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
let fireArr = []
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

    characters(100, 1)
    characters(30, 2)
    characters(5, 3)
    characters(5, 6)

    createCanvas(matrix[0].length * side, matrix.length * side);
    frameRate(6);



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
            else if (matrix[y][x] == 4) {
                let fire = new Fire(x, y, 4)
                fireArr.push(fire)
            }
            else if (matrix[y][x] == 6) {
                let bomb = new Bomb(x, y, 6)
                bombArr.push(bomb)
            }
        }
    }
}

function draw() {
    if (heading.innerHTML === "Winter") {
        const copyFireArr = [...fireArr];

        for (let i = 0; i < copyFireArr.length; i++) {
            const fire = copyFireArr[i];
            const x = fire.x;
            const y = fire.y;
            fireArr.splice(fireArr.indexOf(fire), 1);
            matrix[y][x] = 0;
        }
    }


    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (heading.innerHTML === "Autumn") {
                    fill("#D2691E");
                }
                else if (heading.innerHTML === "Winter") {
                    fill("#2E8B57 ");
                }
                else fill("green")
            } else if (matrix[y][x] == 4) {
                fill("#FF6600");
            } else if (matrix[y][x] == "boom") {
                fill("red");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("blue");
            } else if (matrix[y][x] == 6) {
                fill("black");
            } else if (matrix[y][x] == 0) {
                fill("#acacac");
            }

            rect(x * side, y * side, side, side);
        }
    }

    if (bombArr.length === 0) {
        characters(3, 6);
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
    for (let i = 0; i < fireArr.length; i++) {
        fireArr[i].eat();
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat();
    }
    for (let i = 0; i < bombArr.length; i++) {
        bombArr[i].update();
    }
    time++
    if (time === 80) time = 0

    if (time <= 1) {
        heading.innerHTML = "Spring"
        bodyElement.style.backgroundColor = "#32CD32 ";
    } else if (time === 20) {
        heading.innerHTML = "Summer"
        bodyElement.style.backgroundColor = "#FFD700 ";
    } else if (time === 40) {
        heading.innerHTML = "Autumn"
        bodyElement.style.backgroundColor = "#8B4513 ";
    }
    else if (time === 60) {
        heading.innerHTML = "Winter"
        bodyElement.style.backgroundColor = "#F8F8FF ";
    }

    if (heading.innerHTML === "Autumn") {
        let fire = new Fire(30, 15, 4)
        fireArr.push(fire)
    }

}

