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

let gameState = "playing";

// OBJECTS
const cushion = {
    xClosed: 70,
    yClosed: 190,

    xOpen: 60,
    yOpen: 150,

    width: 130,
    height: 140,

    isOpen: false,
    win: false
};

const drawer = {
    xClosed: 490,
    yClosed: 180,

    xOpen: 430,
    yOpen: 180,

    width: 100,
    height: 100,

    isOpen: false,
    win: false
};

const lampshade = {
    xClosed: 110,
    yClosed: 110,

    xOpen: 100,
    yOpen: 70,

    width: 100,
    height: 100,

    isOpen: false,
    win: true
};

const safe = {
    xClosed: 190,
    yClosed: 0,

    xOpen: 190,
    yOpen: 0,

    width: 230,
    height: 120,

    isOpen: false,
    win: false
}

const carpet = {
    xClosed: 250,
    yClosed: 200,

    xOpen: 250,
    yOpen: 200,

    width: 200,
    height: 250,

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
                console.log("working");
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

    requestAnimationFrame(stage3);
}


function stage3(timestamp) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(livingRoom, 0, 0, 600, 450);

    // TIMER
    let timer = 10;
    let endTime = 0;
    let deltaTime = (timestamp - endTime) / 1000;
    endTime = timestamp;

    if (gameState === "playing") {
        timer -= deltaTime;

        if (timer <= 0) {
            gameState = "lose";
            timer = 0;
            console.log("lose");
            return;
        }
    }

    ctx.fillStyle = "white";
    ctx.font = "20px sans-serif";
    ctx.fillText("Time: " + timer.toFixed(1), 10, 20);


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

    ctx.fillStyle = "blue";
    ctx.drawImage(couchOpen, drawX, drawY, cushion.width, cushion.height);

    if (drawer.isOpen) {
        drawX = drawer.xOpen;
        drawY = drawer.yOpen;
    } else {
        drawX = drawer.xClosed;
        drawY = drawer.yClosed;
    }

    ctx.fillStyle = "red";
    ctx.drawImage(drawerOpen, drawX, drawY, drawer.width, drawer.height);


    if (lampshade.isOpen) {
        drawX = lampshade.xOpen;
        drawY = lampshade.yOpen;
    } else {
        drawX = lampshade.xClosed;
        drawY = lampshade.yClosed;
    }

    ctx.fillStyle = "yellow";
    ctx.drawImage(lampOpen, drawX, drawY, lampshade.width, lampshade.height);

    if (safe.isOpen) {
        drawX = safe.xOpen;
        drawY = safe.yOpen;
    } else {
        drawX = safe.xClosed;
        drawY = safe.yClosed;
    }

    ctx.fillStyle = "green";
    ctx.drawImage(safeOpen, drawX, drawY, safe.width, safe.height);

    if (carpet.isOpen) {
        drawX = carpet.xOpen;
        drawY = carpet.yOpen;
    } else {
        drawX = carpet.xClosed;
        drawY = carpet.yClosed;
    }

    ctx.fillStyle = "purple";
    ctx.drawImage(carpetOpen, drawX, drawY, carpet.width, carpet.height);

    requestAnimationFrame(stage3);

}

//stage3();