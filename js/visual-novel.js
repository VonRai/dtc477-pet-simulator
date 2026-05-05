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

// DEVELOPER: VON MILLER
/* GAME MENTOR LOGS
1. https://chatgpt.com/share/69f8c641-4200-83e8-97c1-0be755128efd
2. https://chatgpt.com/share/69f8c657-0cac-83e8-9e43-5f226c78b6ad
*/

let currentLine = 0;
let gameLocked = false;


let introDialogue = {
    text: ["ONE LATE NIGHT YOU HEAR A SCRATCHING SOUND AT YOUR DOOR . . .", '"WOAH! What are you doing here, little guy?"', "You look upset. Do you want a snack?"],
    background: ["img/door-close.png", "img/door-open.png"],
    sprite: [null, "img/nightcrawler-sad.svg"],
    audio: ["audio/scratch.mp3","audio/angry-noise.mp3","audio/happy-noise.mp3"],
    trigger: stage1
};

let afterFoodDialogue = {
    text: ["You look a lot better now that you've had a meal!", "Wish you didn't eat my pet fish, though. . .", "Now what do you want to do?"],
    background: "img/food-bg.png",
    sprite: "img/nightcrawler-happy.svg",
    audio: ["audio/happy-noise.mp3","audio/angry-noise.mp3","audio/thinking-noise.mp3"],
    trigger: stage2
};

let afterSoccerDialogue = {
    text: ["AFTER YOUR SOCCER GAME YOU HEAD BACK INSIDE", "Phew, that was a good game!", "Aww don't look so mad - Wait where are you going?!"],
    background: ["img/soccer-bg.png", "img/door-open.png", "img/door-close.png"],
    sprite: [null, "img/nightcrawler-angry.svg", "img/nightcrawler-angry.svg"],
    audio: [null, "audio/angry-noise.mp3", "audio/run.mp3"],
    trigger: startStage3
};

// After Stage 3: Hide & Seek
let endDialogue = {
    text: ["Wow! That was a good hiding spot.", "I'm glad we could play together... and you didn't even try to eat me!", "It is 3 AM though, and I'm getting exhausted.", "YOU MAKE YOUR WAY TO YOUR BEDROOM, THE CREATURE FOLLOWING CLOSE BEHIND", "Sweet dreams little fellow! This truly was the strangest night of my life.", "THE END!"],
    background: ["img/hide-bg.png", "img/hide-bg.png", "img/hide-bg.png", "img/bedroom1.png", "img/bedroom2.png", "img/bedroom2.png"],
    sprite: null,
    audio: ["audio/happy-noise.mp3", "audio/thinking-noise.mp3", null, null, "audio/sleeping-noise.mp3"],
    trigger: restart
};

let gameOverDialogue = {
    text: ["GAME OVER"],
    background: ["img/door-close.png"],
    sprite: ["img/nightcrawler-monster.svg"],
    audio: ["audio/growl.mp3"],
    trigger: restart
}

let currentDialogue = introDialogue;
let currentAudio = new Audio();
currentAudio.volume = 0.1;

let dialogueText = document.getElementById("textbox");

document.getElementById("startbtn").addEventListener("click", function () {
    document.getElementById("title").style.display = "none";
    document.getElementById("dialogue").style.display = "block";
    dialogueText.textContent = currentDialogue.text[currentLine];
    console.log("yes");
    drawDialogueScene();
});


document.getElementById("nextbtn").addEventListener("click", function () {
    currentLine += 1;
    if (currentLine < currentDialogue.text.length) {
        dialogueText.textContent = currentDialogue.text[currentLine];
        playLineAudio();
        drawDialogueScene();
    }
    else {
        if (currentDialogue.trigger) {
            currentDialogue.trigger();
        }
    }
});

let dialogueBackground = new Image();
let dialogueSprite = new Image();

function drawDialogueScene() {

    let bgSrc;
    let spriteSrc;

    // 1. Pick correct sources
    if (Array.isArray(currentDialogue.background)) {
        bgSrc = currentDialogue.background[currentLine];
    } else {
        bgSrc = currentDialogue.background;
    }

    if (Array.isArray(currentDialogue.sprite)) {
        spriteSrc = currentDialogue.sprite[currentLine];
    } else {
        spriteSrc = currentDialogue.sprite;
    }

    // 2. Setup positions
    let spriteX = canvas.width / 2 - 100;
    let spriteY = canvas.height / 2;

    let bgReady = false;
    let spriteReady = false;

    // 3. Load background
    dialogueBackground.onload = function () {
        bgReady = true;

        if (spriteReady) {
            draw();
        }
    };

    dialogueBackground.src = bgSrc;
    console.log(currentLine, bgSrc);

    // 4. Load sprite ONLY if it exists
    if (spriteSrc) {
        dialogueSprite.onload = function () {
            spriteReady = true;

            if (bgReady) {
                draw();
            }
        };

        dialogueSprite.src = spriteSrc;
    } else {
        // No sprite this frame → treat as "ready"
        spriteReady = true;
    }

    // 5. Draw function
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw background
        ctx.drawImage(dialogueBackground, 0, 0, canvas.width, canvas.height);

        // draw sprite ONLY if it exists
        if (spriteSrc) {
            ctx.drawImage(dialogueSprite, spriteX, spriteY, 200, 200);
        }
    }
}

function playLineAudio() {

    let audioSrc;


    if (Array.isArray(currentDialogue.audio)) {
        audioSrc = currentDialogue.audio[currentLine];
    } else {
        audioSrc = currentDialogue.audio;
    }

    if (!audioSrc) return;

    currentAudio.pause();
    currentAudio = new Audio(audioSrc);
    currentAudio.volume = 0.3;
    currentAudio.play();
}

function resumeVN(nextDialogue) {
    currentDialogue = nextDialogue;
    currentLine = 0;

    document.getElementById("canvasBox").style.display = "block";
    document.getElementById("dialogue").style.display = "block";

    dialogueText.textContent = currentDialogue.text[currentLine];
    document.getElementById("score").textContent = "";

    drawDialogueScene();
}

function gameOver() {
    document.getElementById("score").textContent = "";
    timerDisplay.style.display = "none";

    gameLocked = true;

    currentDialogue = gameOverDialogue;
    currentLine = 0;

    document.getElementById("dialogue").style.display = "block";
    document.getElementById("canvasBox").style.display = "block";

    dialogueText.textContent = currentDialogue.text[currentLine];

    playLineAudio();
    drawDialogueScene();
}

function restart() {
    window.location.reload();
    gameBox.style.display = "flex";
}