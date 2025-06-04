// Variabili del gioco
const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score-display');
const livesDisplay = document.getElementById('lives-display');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

let playerX = 375;
let playerY = 400;
let score = 0;
let lives = 3;
let gameSpeed = 2;
let gameRunning = false;
let trashElements = [];
let turtleElements = [];
let keysPressed = {};
let trashInterval;
let turtleInterval;

// Movimento del giocatore
function updatePlayerPosition() {
    const moveSpeed = 5;

    if (keysPressed['ArrowLeft'] && playerX > 0) {
        playerX -= moveSpeed;
    }
    if (keysPressed['ArrowRight'] && playerX < gameContainer.offsetWidth - player.offsetWidth) {
        playerX += moveSpeed;
    }
    if (keysPressed['ArrowUp'] && playerY > 0) {
        playerY -= moveSpeed;
    }
    if (keysPressed['ArrowDown'] && playerY < gameContainer.offsetHeight - player.offsetHeight) {
        playerY += moveSpeed;
    }

    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
}

// Gestione tasti
document.addEventListener('keydown', (e) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        keysPressed[e.key] = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        keysPressed[e.key] = false;
    }
});

// Crea spazzatura
function createTrash() {
    if (!gameRunning) return;

    const trashTypes = ['plastic', 'oil'];
    const trashType = trashTypes[Math.floor(Math.random() * trashTypes.length)];
    
    const trash = document.createElement('div');
    trash.className = `trash ${trashType}`;
    trash.style.left = Math.random() * (gameContainer.offsetWidth - 30) + 'px';
    trash.style.top = '-30px';
    gameContainer.appendChild(trash);
    trashElements.push(trash);
}

// Crea tartarughe
function createTurtle() {
    if (!gameRunning) return;

    const turtle = document.createElement('div');
    turtle.className = 'turtle';
    turtle.style.left = Math.random() * (gameContainer.offsetWidth - 40) + 'px';
    turtle.style.top = '-40px';
    gameContainer.appendChild(turtle);
    turtleElements.push(turtle);
}

// Muovi oggetti
function moveObjects() {
   