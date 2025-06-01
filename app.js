// Have to document this code !!!
// Document this project -> Challenges and Learnings

// Refactoring -> 
// 1. Flashing with same color !
// 2. UpdateNextLevel p thing !!
// 3. High Score !!!

let boxes = ["one", "two", "three", "four"];
let game_sq = [];
let user_sq = [];
let lvl = 0;
let acceptingInput = false;

// Event Listeners to boxes
for (let box of boxes) {
    let b = document.getElementById(box);
    b.addEventListener("click", function() {
        if (!acceptingInput) return;

        btnFlash(b);
        user_sq.push(box);

        // Checking
        if (game_sq[user_sq.length - 1] !== box) {
            gameOver();
            return;
        }

        // If checking is completed
        if (user_sq.length === game_sq.length) {
            acceptingInput = false;
            setTimeout(levelUp, 800);
        }
    });
}

// Start
let start = document.querySelector(".start");
start.addEventListener("click", function() {
    start.remove();

    startGame();
});

function btnFlash(btn) {
    let original = btn.style.backgroundColor;
    btn.style.backgroundColor = 'white';
    setTimeout(function() {
        btn.style.backgroundColor = original;
    }, 150);
}

function randomBox() {
    return Math.floor(Math.random() * 4);
}

function playSequence() {
    acceptingInput = false;
    user_sq = [];
    game_sq.forEach((col, idx) => {
        setTimeout(() => {
            let b = document.getElementById(col);
            btnFlash(b);
            if (idx === game_sq.length - 1) {
                acceptingInput = true;
            }
        }, 600 * idx);
    })
}

function levelUp() {
    lvl++;
    updateLevelText();
    game_sq.push(boxes[randomBox()]);
    playSequence();
}

function startGame() {
    game_sq = [];
    user_sq = [];
    lvl = 0;
    lose = false;
    updateLevelText();
    levelUp();
}

function updateLevelText() {
    let div = document.getElementById("starter");
    let p = document.getElementById('lvl');

    if (!p) {
        p = document.createElement("p");
        p.setAttribute('id', 'lvl');
        div.appendChild(p);
    }

    p.innerText = `Level: ${lvl}`;
}

function gameOver() {
    let body = document.querySelector('body');
    body.style.backgroundColor = '#A14444';
    setTimeout(function() {
        body.style.backgroundColor =' #1e3c72';
    }, 100);
    acceptingInput = false;

    let msg = document.getElementById('lvl');
    msg.innerText = `Game Over! Your Score was ${lvl - 1}`;

    let div = document.getElementById('starter');
    let btn = document.createElement('button');
    btn.innerText = 'Start Over?';
    btn.classList.add('start');
    div.appendChild(btn);

    btn.addEventListener('click', function() {
        btn.remove();
        msg.remove();
        let start = document.createElement('button');
        start.innerText = 'Start';
        start.classList.add('start');
        div.appendChild(start);

        start.addEventListener('click', () => {
            start.remove();
            startGame();
        });
    })
}