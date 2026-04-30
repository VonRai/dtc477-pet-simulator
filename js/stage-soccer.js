/* 
Pong-style mini-game against the Nightcrawler
First to 5 points wins

Fail Condition:
Lose the match → game over
*/

// LOGIC STEPS
//1. Game starts with two paddles, one on the left and one on the right, and a ball in the middle of the screen. The player can move one paddle up and down. Scores on both sides start at 0.
//2. Ball moves from side to side based on collision with paddles.
//3. When the ball goes past a paddle, the opposing side earns 1 point. 
//4. After each score, the ball gets slightly faster. 
//5. Game ends when a side earns 5 points.
// GAME MENTOR 

// GAME MENTOR

function stage2() {
    resumeVN(afterSoccerDialogue);}
const canvas = document.getElementById('canvasBox');
const context = canvas.getContext('2d');
const grid = 15;
const paddleHeight = grid * 5; // 80
const maxPaddleY = canvas.height - grid - paddleHeight;

let paddleSpeed = 6;
let aiSpeed = 1;
let ballSpeed = 2;
let ballSpeedMultiplier = 1;
let playerScore = 0;
let computerScore = 0;
let gameOver = false;


const leftPaddle = {
  // start in the middle of the game on the left side
  x: grid * 2,
  y: canvas.height / 2 - paddleHeight / 2,
  width: grid,
  height: paddleHeight,

  // paddle velocity
  dy: 0
};
const rightPaddle = {
  // start in the middle of the game on the right side
  x: canvas.width - grid * 3,
  y: canvas.height / 2 - paddleHeight / 2,
  width: grid,
  height: paddleHeight,

  // paddle velocity
  dy: 0
};
const ball = {
  // start in the middle of the game
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: grid,
  height: grid,

  // keep track of when need to reset the ball position
  resetting: false,

  // ball velocity (start going to the top-right corner)
  dx: ballSpeed,
  dy: -ballSpeed
};

// check for collision between two objects using axis-aligned bounding box (AABB)
// @see https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function collides(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

function resetBall() {
  ball.resetting = true;

  setTimeout(() => {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    // increase speed slightly each score
    ballSpeedMultiplier += 0.1;

    // random direction + scaling
    ball.dx = ballSpeed * ballSpeedMultiplier * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = ballSpeed * ballSpeedMultiplier * (Math.random() > 0.5 ? 1 : -1);

    ball.resetting = false;
  }, 400);
}

// game loop
function loop() {
    
  requestAnimationFrame(loop);
  context.clearRect(0,0,canvas.width,canvas.height);

   if (gameOver) {
    context.fillStyle = 'white';
    context.font = '30px Arial';
    context.textAlign = 'center';

    let winner = playerScore >= 5 ? "You Win!" : "The NightCrawler Wins!";

    context.fillText(winner, canvas.width / 2, canvas.height / 2);

    

    return;
  }
  context.fillStyle = 'white';
context.font = '20px Arial';

// computer score (left side)
context.fillText(computerScore, canvas.width / 4, 30);

// player score (right side)
context.fillText(playerScore, canvas.width * 3 / 4, 30);
  
      // move paddles by their velocity

let targetY = ball.y;

let diff = targetY - leftPaddle.y;

if (Math.abs(diff) > 5) {
  if (diff < 0) {
    leftPaddle.dy = -aiSpeed;
  } else {
    leftPaddle.dy = aiSpeed;
  }
} else {
  leftPaddle.dy = 0;
}
  

  leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

  // prevent paddles from going through walls
  if (leftPaddle.y < grid) {
    leftPaddle.y = grid;
  }
  else if (leftPaddle.y > maxPaddleY) {
    leftPaddle.y = maxPaddleY;
  }

  if (rightPaddle.y < grid) {
    rightPaddle.y = grid;
  }
  else if (rightPaddle.y > maxPaddleY) {
    rightPaddle.y = maxPaddleY;
  }

  // draw paddles
  context.fillStyle = 'white';
  context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

  // move ball by its velocity
  ball.x += ball.dx;
  ball.y += ball.dy;

  // prevent ball from going through walls by changing its velocity
  if (ball.y < grid) {
    ball.y = grid;
    ball.dy *= -1;
  }
  else if (ball.y + grid > canvas.height - grid) {
    ball.y = canvas.height - grid * 2;
    ball.dy *= -1;
  }


  if (ball.x < 0 && !ball.resetting) {
  playerScore++;
  resetBall();
}

if (ball.x > canvas.width && !ball.resetting) {
  computerScore++;
  resetBall();
}
    if (playerScore >= 5 || computerScore >= 5) {
  gameOver = true;
}

  // check to see if ball collides with paddle. if they do change x velocity
  if (collides(ball, leftPaddle)) {
    ball.dx *= -1;

    // move ball next to the paddle otherwise the collision will happen again
    // in the next frame
    ball.x = leftPaddle.x + leftPaddle.width;
  }
  else if (collides(ball, rightPaddle)) {
    ball.dx *= -1;

    // move ball next to the paddle otherwise the collision will happen again
    // in the next frame
    ball.x = rightPaddle.x - ball.width;
  }

  // draw ball
  context.fillRect(ball.x, ball.y, ball.width, ball.height);

  // draw walls
  context.fillStyle = 'lightgrey';
  context.fillRect(0, 0, canvas.width, grid);
  context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);

  // draw dotted line down the middle
  for (let i = grid; i < canvas.height - grid; i += grid * 2) {
    context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
  }
}

// listen to keyboard events to move the paddles
document.addEventListener('keydown', function(e) {

  // up arrow key
  if (e.which === 38) {
    rightPaddle.dy = -paddleSpeed;
  }
  // down arrow key
  else if (e.which === 40) {
    rightPaddle.dy = paddleSpeed;
  }

});

// listen to keyboard events to stop the paddle if key is released
document.addEventListener('keyup', function(e) {
  if (e.which === 38 || e.which === 40) {
    rightPaddle.dy = 0;
  }

 });


// start the game
requestAnimationFrame(loop);

