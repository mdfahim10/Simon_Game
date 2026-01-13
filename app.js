let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let title = document.querySelector("#title");
let startBtn = document.querySelector("#startBtn");

// START GAME
function startGame() {
    if (!started) {
        started = true;
        startBtn.style.display = "none";
        level = 0;
        gameSeq = [];
        userSeq = [];
        levelUp();
    }
}

startBtn.addEventListener("click", startGame);

// LEVEL UP
function levelUp() {
    userSeq = [];
    level++;
    title.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);

    let randBtn = document.querySelector(`#${randColor}`);
    gameFlash(randBtn);
}

// FLASH EFFECT
function gameFlash(btn) {
    btn.classList.add("pressed");
    setTimeout(() => {
        btn.classList.remove("pressed");
    }, 300);
}

// BUTTON CLICK
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", function () {
        if (!started) return;

        let userColor = btn.getAttribute("id");
        userSeq.push(userColor);

        btnFlash(btn);
        checkAns(userSeq.length - 1);
    });
}

function btnFlash(btn) {
    btn.classList.add("pressed");
    setTimeout(() => {
        btn.classList.remove("pressed");
    }, 200);
}

// CHECK ANSWER
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        title.innerHTML = `Game Over!<br>Your Score: ${level - 1}<br>Tap Start to Restart`;
        document.body.classList.add("game-over");

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);

        resetGame();
    }
}

// RESET
function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    startBtn.style.display = "inline-block";
}
