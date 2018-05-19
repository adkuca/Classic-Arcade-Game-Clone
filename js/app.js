'use strict';

// Enemies our player must avoid
const Enemy = function(x, y, speed = this.shuffleSpeed()) {
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.hitboxX = 50;
    this.hitboxY = 30;
};

// Method returns and sets Enemy objects speed to a random number between min and max
Enemy.prototype.shuffleSpeed = function(min = 150, max = 300) {
    return this.speed = Math.floor(Math.random() * (max - min) + min);
};

/**
 * @description Update the enemy's position
 * @param {number} dt - a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    if (this.x >= 505) {
        this.x = -100;
        this.shuffleSpeed();
    }

    this.x += this.speed * dt;
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function(x, y) {
    this.args = [...arguments];
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.hitboxX = 15;
    this.hitboxY = 30;
};

Player.prototype.update = function() {
    checkCollisions();
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Method that handles character movement and calls function won() whether it meets the win condition
 * @param {string} direction - arrow keys input
 */
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            if (this.x > 0) this.x -= 101;
            break;
        case 'up':
            if (this.y > -30) this.y -= 83;
            break;
        case 'right':
            if (this.x < 404) this.x += 101;
            break;
        case 'down':
            if (this.y < 385) this.y += 83;
    }

    if (this.y < 0) won();
};

// Resets the players coordinates/location
Player.prototype.reset = function() {
    this.x = this.args[0];
    this.y = this.args[1];
};

// Checks for collisions between the player and the enemies and calls function lost() accordingly
function checkCollisions() {
    for (const enemy of allEnemies) {
        if (player.x + player.hitboxX >= enemy.x - enemy.hitboxX &&
            player.x - player.hitboxX <= enemy.x + enemy.hitboxX &&
            player.y + player.hitboxY >= enemy.y - enemy.hitboxY &&
            player.y - player.hitboxY <= enemy.y + enemy.hitboxY) {
            lost();
        }
    }
}

// Flashes the canvas underlay and calls the Player.reset() method
function won() {
    cUnderlay.classList.toggle('score');
    setTimeout(() => cUnderlay.classList.toggle('score'), 200);
    player.reset();
}

// Flashes the canvas underlay and calls the Player.reset() method
function lost() {
    cUnderlay.classList.toggle('collision');
    setTimeout(() => cUnderlay.classList.toggle('collision'), 200);
    player.reset();
}

const cUnderlay = document.getElementsByClassName('canvas-underlay')[0];
const allEnemies = [
    new Enemy(150, 53, 100),
    new Enemy(350, 122, 150),
    new Enemy(150, 150, 250),
    new Enemy(-100, 219, 200)
];
const player = new Player(202, 385);

// This listens for key presses and sends the keys to Player.handleInput() method
document.addEventListener('keydown', e => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});