
let snake = [{ x: 150, y: 150 }, { x: 140, y: 150 },];
let dx = 0, dy = -10;
let foodX, foodY;
let score = 0;
let changingDirection = false;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown",changeDirection);
document.getElementById("score").innerHTML = score;

createFood();
main();

function main() {
    if (!isGameOver()) {       
        setTimeout(function onTick() {
            changeDirection = false;
            clearCanvas();
            drawFood();
            advanceSnake();
            drawSnake();
            main();
        }, 100);
    } else {
        alert("GAME OVER\nYour score: " + score);
    }
}
    
function isGameOver() {
    let didHitWall;
    let didHitHimself;
    didHitWall = (snake[0].x > canvas.width - 10 || snake[0].x < 0 || snake[0].y > canvas.height - 10 || snake[0].y < 0);
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
function drawSnake(){
    snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart){
    ctx.fillStyle = 'lightgreen';
    ctx.strokestyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10,10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10,10);
}
function advanceSnake(){
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if (head.x === foodX && head.y === foodY) {
        score++;
        document.getElementById("score").innerHTML = score;
        createFood();
    } else {
        snake.pop();
    }
}
function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}
function createFood() {
    foodX = randomTen(0, gameCanvas.width - 10);
    foodY = randomTen(0, gameCanvas.height - 10);
    snake.forEach(function isFoodOnSnake(part) {
        const foodIsOnSnake = part.x == foodX && part.y == foodY;
        if (foodIsOnSnake) createFood();
    });
}
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokestyle = 'darkred';
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}
function changeDirection(event) {
    if (changeDirection) return;
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;  
    const UP_KEY = 38;  
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goUp = dy === -10;
    const goDown = dy === 10;
    const goRight = dx === 10;
    const goLeft = dx === -10;
    if(keyPressed === LEFT_KEY && !goRight){dx = -10; dy = 0;}
    if(keyPressed === RIGHT_KEY && !goLeft){dx = 10; dy = 0;}
    if(keyPressed === UP_KEY && !goDown){dx = 0; dy = -10;}
    if(keyPressed === DOWN_KEY && !goUp){dx = 0; dy = 10;}
    changeDirection = true;
}