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
let currentLine = 0;

let introDialogue = {
    speaker: "You",
    text: ["Who are you?", "Come on in", "Do you want a snack?"],
    background: "door.png",
    sprite: "creature.png",
    trigger: stage1
};

let afterFoodDialogue = {
    speaker: "You",
    text: ["Text1", "Text2", "Text3"],
    background: "outside.png",
    sprite: "creature.png",
    trigger: stage2
};

let afterSoccerDialogue = {
    speaker: "You",
    text: ["Text1", "Text2", "Text3"],
    background: "livingroom.png",
    sprite: "creature.png",
    trigger: startStage3
};

// After Stage 3: Hide & Seek
let endDialogue = {
    speaker: "You",
    text: ["Text1", "Text2", "Text3"],
    background: "bedroom.png",
    sprite: "creature.png",
    trigger: null
};

let currentDialogue = introDialogue;

let dialogueText = document.getElementById("textbox");

document.getElementById("startbtn").addEventListener("click", function () {
    document.getElementById("title").style.display = "none";
    document.getElementById("dialogue").style.display = "block";
    dialogueText.textContent = currentDialogue.text[currentLine];
    console.log("yes")
});

document.getElementById("nextbtn").addEventListener("click", function () {
    currentLine += 1;
    if (currentLine < currentDialogue.text.length) {
        dialogueText.textContent = currentDialogue.text[currentLine];
    }
    else {
        if (currentDialogue.trigger) {
            currentDialogue.trigger();
        }
    }
});

function resumeVN(nextDialogue) {
    currentDialogue = nextDialogue;
    currentLine = 0;

    document.getElementById("canvasBox").style.display = "none";
    document.getElementById("dialogue").style.display = "block";

    dialogueText.textContent = currentDialogue.text[currentLine];
}

function gameOver() {
    document.getElementById("canvasBox").style.display = "none";
    document.getElementById("dialogue").style.display = "block";
    document.getElementById("nextbtn").style.display = "none";
    dialogueText.textContent = "Game over!"
}