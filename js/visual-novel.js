/* JS for the game interface including the "Title Screen," "Credits," "Instructions,"
as well as the visual novel aspects of the game. Dialogue, sprites, background */

// LOGIC STEPS
/*
1. A div containing the title screen and start buttons is displayed. When the user hits
the START button, the title screen is hidden and the visual novel GUI is displayed
2. An object list contains dialogue and sprites that appears in order when the user clicks the NEXT
button. Once the user reaches a certain point in the dialogue, the function for the 1st stage
is displayed and the VN GUI is hidden.
3. Once a stage is complete, the VN GUI is displayed again.

*/

// GAME MENTOR
document.getElementById("startbtn").addEventListener("click", function () {
    document.getElementById("title").style.display = "none";
    document.getElementById("dialogue").style.display = "block";
    dialogueText.textContent = dialogue.text[currentLine];
    console.log("yes")
});

let currentLine = 0
let dialogue = {
    speaker: "You",
    text: ["Who are you?", "Come on in", "Do you want a snack?"],
    background: "door.png",
    sprite: "creature.png",
    trigger: stage1
};

let dialogueText = document.getElementById("textbox");

document.getElementById("nextbtn").addEventListener("click", function () {
    currentLine += 1;
    if (currentLine < dialogue.text.length) {
        dialogueText.textContent = dialogue.text[currentLine];
    }
    else {
        dialogue.trigger();
    }
});