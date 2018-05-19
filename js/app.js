// Enemies our player must avoid
const Enemy = function(x, y, speed = this.shuffleSpeed()) {
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.hitboxX = 50;
    this.hitboxY = 30;

};

Enemy.prototype.shuffleSpeed = function(min = 150, max = 300) {
    return this.speed = Math.floor(Math.random() * (max - min) + min);
};

Enemy.prototype.update = function(dt) {
    if (this.x >= 505) {
        this.x = -100;
        this.shuffleSpeed();
    }

    this.x += this.speed * dt;
};

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
    player.checkCollision();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'left':
            if(this.x > 0) this.x -= 101;
            break;
        case 'up':
            if(this.y > -30) this.y -= 83;
            break;
        case 'right':
            if(this.x < 404) this.x += 101;
            break;
        case 'down':
            if(this.y < 385) this.y += 83;
    }

    if(this.y < 0) {
        cUnderlay.classList.toggle('score');
        setTimeout(() => cUnderlay.classList.toggle('score'), 200);
        this.reset();
    }
};

Player.prototype.checkCollision = function() {
      for (const enemy of allEnemies) {
          if(this.x + this.hitboxX >= enemy.x - enemy.hitboxX &&
              this.x - this.hitboxX <= enemy.x + enemy.hitboxX &&
              this.y + this.hitboxY >= enemy.y - enemy.hitboxY &&
              this.y - this.hitboxY <= enemy.y + enemy.hitboxY) {
              cUnderlay.classList.toggle('collision');
              setTimeout(() => cUnderlay.classList.toggle('collision'), 200);
              this.reset();
          }
      }
};

Player.prototype.reset = function() {
    this.x = this.args[0];
    this.y = this.args[1];
};

const cUnderlay = document.getElementsByClassName('canvas-underlay')[0];
const bug1 = new Enemy(150, 53, 100);
const bug2 = new Enemy(350, 122, 150);
const bug3 = new Enemy(150, 150, 250);
const bug4 = new Enemy(-100, 219, 200);
const bug5 = new Enemy(20, 395, 0);
const allEnemies = [bug1, bug2, bug3, bug4, bug5];
const player = new Player(202, 385);

document.addEventListener('keydown', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});