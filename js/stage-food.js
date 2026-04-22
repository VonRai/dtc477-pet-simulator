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
sprite.src = "img/creature.jpg";
let spriteX
let spriteY
let currentFoodIndex = 0;

// Y1 is for silhouettes, Y2 is for the interactive option.
let fooditems = [
    { image: 'img/food1.jpg', silhouette: 'img/food1-silhouette.jpg', x: 150, y: 350, width: 80, height: 80, name: 'Apple' },
    { image: 'img/food2.jpg', silhouette: 'img/food2-silhouette.jpg', x: 250, y: 350, width: 80, height: 80, name: 'Cheese' },
    { image: 'img/food3.jpg', silhouette: 'img/food3-silhouette.jpg', x: 350, y: 350, width: 80, height: 80, name: 'Fish' },
];

let silhouetteImage = new Image();
let correctFood = fooditems[currentFoodIndex];
console.log(correctFood)
silhouetteImage.src = correctFood.silhouette;

fooditems.forEach(food => {
    food.img = new Image();
    food.img.src = food.image;
});

function stage1() {

    document.getElementById("dialogue").style.display = "none";
    console.log("stage1 start")

    // Add event listener for `click` events.
    canvas.addEventListener("click", function (event) {
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

                    currentFoodIndex++;

                    if (currentFoodIndex < fooditems.length) {
                        correctFood = fooditems[currentFoodIndex];
                        silhouetteImage.src = correctFood.silhouette;
                        silhouetteImage.onload = function () {
                            drawStage1();
                        }
                    } else {
                        currentDialogue = afterFoodDialogue;
                        currentLine = 0;

                        document.getElementById("canvasBox").style.display = "none";
                        document.getElementById("dialogue").style.display = "block";
                        document.getElementById("nextbtn").style.display = "block";

                        dialogueText.textContent = currentDialogue.text[currentLine];
                    }
                }
                else {
                    gameOver();
                }
            }
        });
    });
    drawStage1()
};

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
    ctx.drawImage(sprite, spriteX, spriteY, 200, 200);
    ctx.drawImage(silhouetteImage, spriteX, spriteY - 100, 80, 80)
    ctx.restore();

};

window.stage1 = stage1;
