# Fresno Nightcrawler Care Game

## Project Overview

In our game, the Fresno Nightcrawler appears at your front door. You invite it inside and attempt to care for it. Each stage presents a different challenge, testing your ability to understand and respond to the creature’s needs.

Will you befriend the creature, or become its next meal?

## Game Overview

Night Encounter is a visual novel point-and-click game where players welcome a mysterious Nightcrawler into their home and must care for it, or face the consequences. Will you befriend the creature or become its next meal?

Intended for a young audience that enjoys interactive storytelling and a spooky atmosphere.

Playtime: Approximately 5-10 minutes

---

## Instructions

Click the start button to begin. Click the about button for more information
on the creation of the game.

Once you enter the game, click the next button to proceed through the story.

### Stage 1

In this stage, you will feed the Nightcrawler its favorite foods!
Wait for the thought bubble to appear, and click the matching food item to feed it.
But be careful! If you click the wrong food item, the Nightcrawler might get upset.

### Stage 2 
In this stage, you will play a game of soccer with the Nightcrawler!
Use the arrow keys to move up and down the screen, and try to hit the ball past the Nightcrawler.
                
If the ball hits the left side of the screen, you will score a point. If it hits the right side, the Nightcrawler will score.
Try and make it to 5 points to proceed to the next stage!

### Stage 3
In this stage, you will play hide and seek with the Nightcrawler!
Quickly click around the screen to find the Nightcrawler.
Try and find it before the time runs out!

---

## Team & Roles

* **Tiffany** – Background design
* **Jamie** – Character + asset illustrations
* **Von** – JavaScript, CSS, Game Logic, Visual Novel, Stage 1

---

## Game Structure

### Stage 1: Food

* Choose between different food items
* Match the correct food to the creature’s preference using a silhouette hint
* Progress by satisfying the creature

**Fail Condition:**

* Choose incorrectly → creature becomes angry → game over

---

### Stage 2: Bath

* Clean the Nightcrawler through interactive actions
* Dress-up / salon-style mechanic
* Complete cleaning before time runs out

**Fail Condition:**

* Timer runs out → game over

---

### Stage 3: Soccer

* Pong-style mini-game against the Nightcrawler
* First to 5 points wins

**Fail Condition:**

* Lose the match → game over

---

### Stage 4: Hide & Seek

* “Where’s Waldo”-style gameplay
* Find the Nightcrawler in a detailed scene
* Click interactive elements to locate it

**Fail Condition:**

* Timer runs out → game over

---

## Core Systems

### Gameplay Loop

All stages share the same structure:

1. The player is presented with a situation and interactive elements
2. The player clicks or interacts
3. The game evaluates the action
4. **Correct action** → creature becomes happy → progress
5. **Incorrect action** → creature becomes angry → game over

### Interaction Style

* Point-and-click mechanics
* Visual feedback through creature expressions

---

## Creature States

* Sad
* Angry
* Happy
* Sleeping
* Dirty
* Pixel version (used in soccer stage)

---

## Backgrounds

* Front door (nighttime intro scene)
* Kitchen / Dining room
* Bathroom
* Bedroom
* Living room
* Backyard

---

## Assets

* Food items
* Soap
* Lampshade
* Couch
* Drawer

---

## Folder Structure

```
index.html

/css
  css.styles
  css.reset

/js
  (game files)

/img
/mp3
```

---

## Setup Instructions

1. Clone or download the repository
2. Open the project folder
3. Open `index.html` in a browser

**Optional (recommended):**

* Use a live server (e.g., VS Code Live Server)

---

## Git Workflow

* Each team member works on their own branch

**Branch naming:**

* `feature/backgrounds`
* `feature/game-logic`
* `feature/assets`

**Process:**

1. Make changes
2. Commit with clear messages
3. Open pull request
4. Merge into main

---

## Naming Conventions

* Variables: `camelCase` (playerScore, currentStage)
* Functions: verb-based camelCase (checkAnswer(), updateState())
* Files: lowercase with dashes (game-logic.js)
* Assets: descriptive names (food-apple.png, bg-kitchen.png)

---

## Style Guide

* **Color Palette:** Bright, playful, high contrast
* **Typography:** Handwritten / whimsical fonts

**Art Style:**

* Illustrated backgrounds
* Expressive character design
* Mix of illustration + pixel art

**UI Feel:**

* Fun, quirky, slightly eerie

---

## Goals

* Create a simple but memorable narrative experience
* Blend humor with light horror elements
* Keep gameplay intuitive and replayable

---

## Credits

Created by:

* Tiffany
* Jamie
* Von

Fresno Nightcrawler inspired by internet folklore.
