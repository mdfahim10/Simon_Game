let gameseq = [];
let userseq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// yaha se game start ho raha hai
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        level = 0;
        gameseq = [];
        h2.innerText = "Game Started";
        levelup();
    }
});

// game flash yaha hoga
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 400);
}

// user flash yaha hoga
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 200);
}

// level up
function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIndex = Math.floor(Math.random() * 4);
    let randColor = btns[randIndex];
    let randButton = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);
    gameFlash(randButton);
}

// button press
function btnPress() {
    if (!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.classList[1];
    userseq.push(userColor);

    checkAnswer(userseq.length - 1);
}

// user sequence & game sequence check 
function checkAnswer(idx) {
    if (userseq[idx] === gameseq[idx]) {
        // sequence matched so far
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        gameOver();
    }
}

// game over & reset
function gameOver() {
    h2.innerHTML = `❌ Game Over! <br> Score: <b>${level}</b> <br> Press any key to restart`;
    document.body.classList.add("game-over");

    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 300);

    resetGame();
}

// reset game
function resetGame() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

// add click events 
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
