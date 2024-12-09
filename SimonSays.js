let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;
let speed = 1000;

const h2 = document.querySelector('h2');
const levelDisplay = document.getElementById('level-display');
const highScoreDisplay = document.getElementById('high-score');
const body = document.querySelector('body');
const btns = ['yellow', 'red', 'green', 'purple'];

highScoreDisplay.textContent = highScore;

document.addEventListener("keypress", () => {
    if (!started) {
        resetGame();
        started = true;
        nextLevel();
    }
});

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const userColor = btn.getAttribute("id");
        userSeq.push(userColor);
        userFlash(btn);

        if (!checkAnswer(userSeq.length - 1)) {
            gameOver();
        } else if (userSeq.length === gameSeq.length) {
            setTimeout(nextLevel, speed);
        }
    });
});

function nextLevel() {
    userSeq = [];
    level++;
    levelDisplay.textContent = level;

    if (level % 5 === 0 && speed > 400) {
        speed -= 100;
    }

    const randomColor = btns[Math.floor(Math.random() * 4)];
    gameSeq.push(randomColor);
    playSequence();
}

function playSequence() {
    let i = 0;

    const interval = setInterval(() => {
        const btn = document.querySelector(`#${gameSeq[i]}`);
        gameFlash(btn);
        i++;

        if (i >= gameSeq.length) {
            clearInterval(interval);
        }
    }, speed);
}

function checkAnswer(idx) {
    if (userSeq[idx] !== gameSeq[idx]) {
        return false;
    }
    return true;
}

function gameFlash(btn) {
    btn.classList.add("flash");
    playSound(btn.id);
    setTimeout(() => btn.classList.remove("flash"), 300);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    playSound(btn.id);
    setTimeout(() => btn.classList.remove("userFlash"), 200);
}

// Play sounds
function playSound(color) {
    const audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

//Game over
function gameOver() {
    h2.innerHTML = `Game Over! Your Score: <b>${level}</b>. Press any key to restart.`;
    body.classList.add("game-over");

    setTimeout(() => body.classList.remove("game-over"), 200);
    updateHighScore();
    resetGame();
}

//High score
function updateHighScore() {
    if (level > highScore) {
        highScore = level;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.textContent = highScore;
    }
}

//Reset
function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    speed = 1000;
    levelDisplay.textContent = 0;
}
