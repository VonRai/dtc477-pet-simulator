/* JS for stage 1 of the game in which the creature will be thinking of different foods depicted by
silhouettes. The user then has to choose the matching food item during 3 rounds. */

/* LOGIC STEPS
1. The dialogue screen is hidden and the Canvas background is changed to a kitchen.
The creature sprite appears in the center of the Canvas.
2. An object list stores the variables for three food items. Each food item
has an x and y coordinate, a width and height, a base png and a silhouette png.
3. 
*/

// DEVELOPER: VON MILLER
// GAME MENTOR
let sprite = new Image();
sprite.src = "img/nightcrawler-sad.svg";

let spriteHappy = new Image();
spriteHappy.src = "img/nightcrawler-happy.svg";

let currentSprite = sprite;


let spriteX
let spriteY
let roundsWon = 0;
let silhouetteTime = 3000;
let canClick = false;
let showSilhouette = true;
let correctFood = null;
let silhouetteImage = new Image();

// Y1 is for silhouettes, Y2 is for the interactive option.
let fooditems = [
    { image: 'img/food1.svg', silhouette: 'img/food1-silhouette.svg', x: 150, y: 350, width: 80, height: 80, name: 'Apple' },
    { image: 'img/food2.svg', silhouette: 'img/food2-silhouette.svg', x: 250, y: 350, width: 80, height: 80, name: 'Cheese' },
    { image: 'img/food3.svg', silhouette: 'img/food3-silhouette.svg', x: 350, y: 350, width: 80, height: 80, name: 'Fish' },
];

fooditems.forEach(food => {
    food.img = new Image();
    food.img.src = food.image;
});


canvas.addEventListener("click", function (event) {
    if (!canClick) return;

    let mouseX = event.offsetX;
    let mouseY = event.offsetY;

    fooditems.forEach(function (food) {

        if (
            mouseX > food.x &&
            mouseX < food.x + food.width &&
            mouseY > food.y &&
            mouseY < food.y + food.height
        ) {
            if (food.name === correctFood.name) {

                roundsWon++;

                currentSprite = spriteHappy;
                drawStage1();

                setTimeout(function () {
                    currentSprite = sprite;

                    if (roundsWon < 5) {
                        startRound();
                    } else {
                        resumeVN(afterFoodDialogue);
                    }
                }, 2000);

            } else {
                gameOver();
            }
        }
    });
});

function stage1() {

    document.getElementById("dialogue").style.display = "none";
    console.log("stage1 start")
    startRound();
    drawStage1()
};

function startRound() {
    // make game slightly faster each round
    silhouetteTime -= 500;

    // prevent it from getting too fast
    if (silhouetteTime < 1000) {
        silhouetteTime = 1000;
    }

    // choose random food
    let randomIndex = Math.floor(Math.random() * fooditems.length);
    correctFood = fooditems[randomIndex];

    // update silhouette image
    silhouetteImage.src = correctFood.silhouette;

    // show silhouette first
    showSilhouette = true;
    canClick = false;

    silhouetteImage.src = correctFood.silhouette;

    silhouetteImage.onload = function () {
        drawStage1();
    };

    // hide silhouette after timer ends
    setTimeout(function () {
        showSilhouette = false;
        canClick = true;
        drawStage1();
    }, silhouetteTime);
}

function drawStage1() {
    ctx.fillStyle = '#9be1f2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fooditems.forEach(food => {
        ctx.drawImage(
            food.img,
            food.x,
            food.y,
            food.width,
            food.height
        );
    });

    ctx.save();
    spriteX = canvas.width / 2 - 200;
    spriteY = canvas.height / 2 - 100;
    ctx.drawImage(currentSprite, spriteX, spriteY, 200, 200);
    if (showSilhouette) {
        ctx.drawImage(silhouetteImage, spriteX, spriteY - 100, 120, 120);
    }
    ctx.restore();

};

window.stage1 = stage1;
