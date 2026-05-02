/* */

// LOGIC STEPS

// GAME MENTOR

ctx = canvas.getContext('2d');
let couchOpen = document.getElementById("couch");
let drawerOpen = document.getElementById("drawer");
let lampOpen = document.getElementById("lamp");
let safeOpen = document.getElementById("safe");
let carpetOpen = document.getElementById("carpet");
let livingRoom = document.getElementById("living-room");
let drawerLayer = document.getElementById("drawer-layer");

let gameState = null;
let startTime = null;

// OBJECTS
const cushion = {
    xClosed: 95,
    yClosed: 255,
    
    xOpen: 75,
    yOpen: 200,

    width: 100,
    height: 80,

    isOpen: false,
    win: false
};

const drawer = {
    xClosed: 476,
    yClosed: 210,

    xOpen: 445,
    yOpen: 210,

    width: 80,
    height: 80,

    isOpen: false,
    win: false
};

const lampshade = {
    xClosed: 120,
    yClosed: 115,

    xOpen: 100,
    yOpen: 70,

    width: 75,
    height: 75,

    isOpen: false,
    win: true
};

const safe = {
    xClosed: 200,
    yClosed: 10,

    xOpen: 90,
    yOpen: -10,

    width: 210,
    height: 100,

    isOpen: false,
    win: false
}

const carpet = {
    xClosed: 230,
    yClosed: 210,

    xOpen: 230,
    yOpen: 270,

    width: 200,
    height: 220,

    isOpen: false,
    win: false
}

const objects = [cushion, drawer, lampshade, safe, carpet];

// INTERACTION
canvas.addEventListener("click", (e) => {
    
    if (gameState !== "playing") {
        console.log("win");
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    objects.forEach(function (obj) {

        let currentX;
        let currentY;

        if (obj.isOpen) {
            currentX = obj.xOpen;
            currentY = obj.yOpen;
        } else {
            currentX = obj.xClosed;
            currentY = obj.yClosed;
        }

        if (
            mouseX >= currentX &&
            mouseX <= currentX + obj.width &&
            mouseY >= currentY &&
            mouseY <= currentY + obj.height
        ) {

            if (obj.win === true && obj.isOpen === false) {
                gameState = "win";
                console.log(gameState);
                resumeVN(endDialogue);
            }

            obj.isOpen = !obj.isOpen;
        }
    });
})

// Starting stage3 for transition
function startStage3() {
    document.getElementById("dialogue").style.display = "none";
    document.getElementById("canvasBox").style.display = "block";

    gameState = "playing";

    startTime = performance.now();
    
    requestAnimationFrame(stage3);
}


function stage3(timestamp) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(livingRoom, 0, 0, 600, 450);

    // TIMER
    let elapsed = (timestamp - startTime) / 1000;
    let timeLeft = 10 - elapsed;

    if (gameState === "playing") {
        // DISPLAY TIMER
        timerDisplay.style.display = "block";
        timerDisplay.innerHTML = `${timeLeft.toFixed(1)}`;

        if (timeLeft <= 0) {
            gameState = "lose";
            timeLeft = 0;
            console.log(gameState);
            gameOver();
        }
    }

    // OBJECT INTERACTION
    let drawX;
    let drawY;

    if (cushion.isOpen) {
        drawX = cushion.xOpen;
        drawY = cushion.yOpen;
    } else {
        drawX = cushion.xClosed;
        drawY = cushion.yClosed;
    }

    ctx.drawImage(couchOpen, drawX, drawY, cushion.width, cushion.height);

    if (drawer.isOpen) {
        drawX = drawer.xOpen;
        drawY = drawer.yOpen;
    } else {
        drawX = drawer.xClosed;
        drawY = drawer.yClosed;
    }

    ctx.drawImage(drawerOpen, drawX, drawY, drawer.width, drawer.height);

    if (lampshade.isOpen) {
        drawX = lampshade.xOpen;
        drawY = lampshade.yOpen;
    } else {
        drawX = lampshade.xClosed;
        drawY = lampshade.yClosed;
    }

    ctx.drawImage(lampOpen, drawX, drawY, lampshade.width, lampshade.height);

    if (safe.isOpen) {
        drawX = safe.xOpen;
        drawY = safe.yOpen;
    } else {
        drawX = safe.xClosed;
        drawY = safe.yClosed;
    }

    ctx.drawImage(safeOpen, drawX, drawY, safe.width, safe.height);

    if (carpet.isOpen) {
        drawX = carpet.xOpen;
        drawY = carpet.yOpen;
    } else {
        drawX = carpet.xClosed;
        drawY = carpet.yClosed;
    }

    ctx.drawImage(carpetOpen, drawX, drawY, carpet.width, carpet.height);

    ctx.drawImage(drawerLayer, 0, 0, 600, 450);

    requestAnimationFrame(stage3);
}

//startStage3();