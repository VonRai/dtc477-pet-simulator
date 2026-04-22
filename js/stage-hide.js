/* */

// LOGIC STEPS

// GAME MENTOR

ctx = canvas.getContext('2d');
canvas.style.backgroundColor = "green";

let gameState = "playing";

const cushion = {
    xClosed: 100,
    yClosed: 150,

    xOpen: 100,
    yOpen: 200,

    width: 100,
    height: 40,

    isOpen: false,
    win: false
};

const drawer = {
    xClosed: 50,
    yClosed: 100,

    xOpen: 300,
    yOpen: 200,

    width: 100,
    height: 40,

    isOpen: false,
    win: false
};

const lampshade = {
    xClosed: 300,
    yClosed: 100,

    xOpen: 300,
    yOpen: 200,

    width: 100,
    height: 40,

    isOpen: false,
    win: true
};

//console.log(`Cushion: ${cushion.isOpen}`)
//console.log(`Drawer: ${drawer.isOpen}`);

const objects = [cushion, drawer, lampshade];

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


function stage3(timestamp) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    ctx.fillRect(drawX, drawY, cushion.width, cushion.height);

    if (drawer.isOpen) {
        drawX = drawer.xOpen;
        drawY = drawer.yOpen;
    } else {
        drawX = drawer.xClosed;
        drawY = drawer.yClosed;
    }

    ctx.fillStyle = "red";
    ctx.fillRect(drawX, drawY, drawer.width, drawer.height);


    if (lampshade.isOpen) {
        drawX = lampshade.xOpen;
        drawY = lampshade.yOpen;
    } else {
        drawX = lampshade.xClosed;
        drawY = lampshade.yClosed;
    }

    ctx.fillStyle = "yellow";
    ctx.fillRect(drawX, drawY, lampshade.width, lampshade.height);

    requestAnimationFrame(stage3);

}

stage3();