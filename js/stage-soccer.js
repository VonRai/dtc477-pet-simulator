/* 
Pong-style mini-game against the Nightcrawler
First to 5 points wins

Fail Condition:
Lose the match → game over
*/

// LOGIC STEPS

// GAME MENTOR

function stage2() {
    currentDialogue = afterSoccerDialogue;
    currentLine = 0;

    document.getElementById("canvasBox").style.display = "block";
    document.getElementById("dialogue").style.display = "block";

    dialogueText.textContent = currentDialogue.text[currentLine];
}