class Bomb {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.time = 20;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],

            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }

    update() {
        this.time--;
        if (this.time <= 0) {
            this.detonate();
        }
    }

    detonate() {
        if (!this.detonated && this.time <= 0) {
            let newDirections = this.directions;
            for (let i = 0; i < newDirections.length; i++) {
                let newX = newDirections[i][0];
                let newY = newDirections[i][1];
                if (newX >= 0 && newX < matrix[0].length && newY >= 0 && newY < matrix.length) {
                    this.die();
                    matrix[newY][newX] = 10;
                    matrix[newY][newX] = "boom";
                }
            }
            this.detonated = true;

            setTimeout(() => {
                for (let y = 0; y < matrix.length; y++) {
                    for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] === "boom") {
                            matrix[y][x] = 1;
                            let grass = new Grass(x, y, 1)
                            grassArr.push(grass)
                        }
                    }
                }
            }, 1000);


        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (let i in bombArr) {
            if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                bombArr.splice(i, 1);
                break;
            }
        }
    }
}
