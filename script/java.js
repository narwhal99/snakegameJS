filter_allconst boardsize = 20
let defaultLong = 5
let xMove = 1
let yMove = 1
let Rx
let Ry
let gameStatus = 'playing'
let pushButton = false
var snake = [{
    x: 1,
    y: 1
}, {
    x: 6,
    y: 1
}, {
    x: 7,
    y: 1
}, {
    x: 8,
    y: 1
}, {
    x: 9,
    y: 1
}]

let whereMove = 'right'
const table = document.querySelector("#game-board")
const makeBoard = function (size) {
    for (y = 0; y < size; y++) {
        const row = document.createElement('tr')
        table.appendChild(row)

        for (x = 0; x < size; x++) {
            const theader = document.createElement('td')
            theader.dataset.x = x
            theader.dataset.y = y
            row.appendChild(theader)
        }
    }
}
makeBoard(boardsize)

const createFood = () => {
    let data = document.querySelectorAll('td')
    let min = 0
    let max = boardsize - 1
    Rx = Math.floor(Math.random() * (max - min + 1)) + min
    Ry = Math.floor(Math.random() * (max - min + 1)) + min
    for (i = 0; i < defaultLong; i++)
        if (Ry === snake[i].y && Rx === snake[i].x) {
            createFood()
        } else {
            data.forEach(e => {
                let x = Number(e.dataset.x)
                let y = Number(e.dataset.y)
                for (i = 0; i < defaultLong; i++)
                    if (Rx === x && Ry === y) {
                        e.classList.add('food')
                    } else {
                        e.classList.remove('food')
                    }
            })
        }

}

createFood()

const createSnake = function (snakeLong) {
    if (gameStatus === 'playing') {
        let data = document.querySelectorAll('td')
        data.forEach(e => {
            let x = Number(e.dataset.x)
            let y = Number(e.dataset.y)

            for (i = 0; i < snakeLong; i++) {
                if (x === snake[i].x && y === snake[i].y) {
                    e.classList.add('snake-color')
                } else if (x === snake[0].x && y === snake[0].y) {
                    e.classList.remove('snake-color')
                }
            }
        })
        if (Rx === snake[defaultLong - 1].x && Ry === snake[defaultLong - 1].y) {
            snake.splice(1, 0, {
                x: snake[0].x,
                y: snake[0].y
            })
            defaultLong = defaultLong + 1
            createFood()
        }
    }
}

createSnake(defaultLong)

window.addEventListener('keypress', (e) => {
    const key = String.fromCharCode(e.charCode)
    if (pushButton === true) {
        if (key === 'w' && whereMove !== 'down') {
            whereMove = 'up'
        } else if (key === 's' && whereMove !== 'up') {
            whereMove = 'down'
        } else if (key === 'a' && whereMove !== 'right') {
            whereMove = 'left'
        } else if (key === 'd' && whereMove !== 'left') {
            whereMove = 'right'
        }
        pushButton = false
        e.preventDefault()
    }
})

const moveSnake = function () {
    if (whereMove === 'up') {
        snake.push({
            x: snake[defaultLong - 1].x,
            y: snake[defaultLong - 1].y - 1
        })
        snake.shift()
    } else if (whereMove === 'down') {
        snake.push({
            x: snake[defaultLong - 1].x,
            y: snake[defaultLong - 1].y + 1
        })
        snake.shift()
    } else if (whereMove === 'left') {
        snake.push({
            x: snake[defaultLong - 1].x - 1,
            y: snake[defaultLong - 1].y
        })
        snake.shift()
    } else if (whereMove === 'right') {
        snake.push({
            x: snake[defaultLong - 1].x + 1,
            y: snake[defaultLong - 1].y
        })
        snake.shift()
    }
    pushButton = true
    createSnake(defaultLong)
}

const status = () => {
    const stat = document.querySelector('#status')
    if (snake[defaultLong - 1].x >= boardsize || snake[defaultLong - 1].x <= -1 || snake[defaultLong - 1].y >= boardsize || snake[defaultLong - 1].y <= -1) {
        gameStatus = 'failed'
        stat.innerHTML = 'You died!'
    }

    for (i = 0; i < defaultLong - 1; i++) {
        if (snake[defaultLong - 1].x === snake[i].x && snake[defaultLong - 1].y === snake[i].y) {
            gameStatus = 'failed'
            stat.innerHTML = 'You died!'
        }
    }

    moveSnake()
}
status()
window.setInterval(status, 100);
