/* JS for stage 1 of the game in which the creature will be thinking of different foods depicted by
silhouettes. The user then has to choose the matching food item during 3 rounds. */

/* LOGIC STEPS
1. The dialogue screen is hidden and the Canvas background is changed to a kitchen.
The creature sprite appears in the center of the Canvas.
2. An object list stores the variables for three food items. Each food item
has an x and y coordinate, a width and height, a base png and a silhouette png.
3. 

*/

// GAME MENTOR
let sprite = new Image();
sprite.src = "img/creature.jpg";
let spriteX
let spriteY
let currentFoodIndex = 0;

// Y1 is for silhouettes, Y2 is for the interactive option.
let fooditems = [
    { image: 'img/food1.jpg', silhouette: 'img/food1-silhouette.jpg', x: 520, y1: 250, width: 100, height: 100, name: 'Apple' },
    { image: 'img/food2.jpg', silhouette: 'img/food2-silhouette.jpg', x: 720, y1: 250, width: 100, height: 100, name: 'Cheese' },
    { image: 'img/food3.jpg', silhouette: 'img/food3-silhouette.jpg', x: 920, y1: 250, width: 100, height: 100, name: 'Fish' },
];

let silhouetteImage = new Image();
silhouetteImage.src = correctFood.silhouette;

let correctFood = fooditems[currentFoodIndex];

function stage1() {
    document.getElementById("dialogue").style.display = "none";
    console.log("stage1 start")

    drawStage1()
};

function drawStage1() {
    ctx.fillStyle = '#9be1f2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    spriteX = canvas.width / 2 - 200;
    spriteY = canvas.height / 2;
    ctx.drawImage(sprite, spriteX, spriteY, 200, 200);
    ctx.drawImage(silhouetteImage, spriteX, spriteY - 200)
    ctx.restore();

};

window.stage1 = stage1;
