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

function stage1() {
    document.getElementById("dialogue").style.display = "none";
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log("stage1 start")
}

window.stage1 = stage1;