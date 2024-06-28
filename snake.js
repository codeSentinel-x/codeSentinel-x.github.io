//int array
let snake;
//int
let dx = 0, dy = -20;
let foodX, foodY;
let score;
let gameInstance = 0;
//bool
let changingDirection;

let colors = ['blue', 'green','lightblue','darkblue','lightgreen','darkgreen','orange',];
let colorI = 1;
let gameSpeed = 100;

//idk what 
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown", changeDirection);
document.addEventListener("keydown", manageUserInput);

start();

function main(instance) {
    if (gameInstance != instance) return;
    if (!isGameOver()) {       
        setTimeout(function onTick() {
            changeDirection = false;
            clearCanvas();
            drawFood();
            advanceSnake();
            drawSnake();
            main(instance);
        }, gameSpeed);
    } else {
        alert("GAME OVER\nYou get " + score + " points");
    }
}
    
function isGameOver() {
    let didHitWall;
    let didHitHimself;
    didHitWall = (snake[0].x > canvas.width - 20 || snake[0].x < 0 || snake[0].y > canvas.height - 20 || snake[0].y < 0);
    for (let i = 1; i < snake.length; i++){
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) didHitHimself = true;
    }
    return didHitWall || didHitHimself;
}

function clearCanvas() {
    ctx.fillStyle = "white";
    ctx.strokestyle = 'black';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart){
    ctx.fillStyle = colors[colorI];
    ctx.strokestyle = 'black';
    ctx.fillRect(snakePart.x, snakePart.y, 20,20);
    ctx.strokeRect(snakePart.x, snakePart.y, 20,20);
}

function advanceSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if (head.x === foodX && head.y === foodY) {
        score++;
        document.getElementById("score").innerHTML = "Points: " + score;
        createFood();
    } else {
        snake.pop();
    }
}

function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}

function createFood() {
    foodX = randomTen(0, gameCanvas.width - 20);
    foodY = randomTen(0, gameCanvas.height - 20);
    snake.forEach(function isFoodOnSnake(part) {
        const foodIsOnSnake = part.x == foodX && part.y == foodY;
        if (foodIsOnSnake) createFood();
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokestyle = 'darkred';
    ctx.fillRect(foodX, foodY, 20, 20);
    ctx.strokeRect(foodX, foodY, 20, 20);
}

function changeDirection(event) {
    if (changeDirection) return;
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;  
    const UP_KEY = 38;  
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goUp = dy === -20;
    const goDown = dy === 20;
    const goRight = dx === 20;
    const goLeft = dx === -20;
    if(keyPressed === LEFT_KEY && !goRight && !goLeft){dx = -20; dy = 0;changeDirection = true;}
    if(keyPressed === RIGHT_KEY && !goLeft && !goRight){dx = 20; dy = 0;changeDirection = true;}
    if(keyPressed === UP_KEY && !goDown && !goUp){dx = 0; dy = -20;changeDirection = true;}
    if(keyPressed === DOWN_KEY && !goUp && !goDown){dx = 0; dy = 20; changeDirection = true;}
}
function manageUserInput(event) {
    const keyPressed = event.keyCode;
    const SPEED_UP = 190;
    const SPEED_DOWN = 188;
    const RESET_SPEED = 222;
    const SHOW_KEYBINDS = 72;
    const CHANGE_COLOR = 69;
    const RESTART = 82;
    if (keyPressed === SPEED_UP) gameSpeed -= 4;
    if (keyPressed === SPEED_DOWN) gameSpeed += 4;
    if (keyPressed === RESET_SPEED) gameSpeed = 100;
    if (keyPressed === SHOW_KEYBINDS) showKeybinds();
    if (keyPressed === CHANGE_COLOR) changeColor();
    if (keyPressed === RESTART) start();
    
    

}
function showKeybinds() {
    alert("h - show help\n, - speed down\n. - speed up\n\' - reset speed\ne - change color\nr - restart");
}
function start() {
    dx = 20;
    dy = 0;
    gameSpeed = 100;
    snake = [{ x: 20, y: 20 }, { x: 40, y: 20 },];
    score = 0;   
    changeDirection = false;
    document.getElementById("score").innerHTML = "Points: " + score;
    createFood();
    gameInstance++;
    main(gameInstance);
}
function changeColor() {
    colorI++
    if (colorI >= colors.length) colorI = 0;
    document.getElementById("changeColor").innerHTML = 'current color: ' + colors[colorI];
    clearCanvas();
    drawSnake();
}