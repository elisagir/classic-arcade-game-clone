// Set score and lives
let score = 0,
	lives = 3,
	addLives = document.querySelector('#lives span'),
	addScore = document.querySelector('#score span');

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
	addLives.innerText = lives;

    // When player reaches water reset position of enemy
    if (this.x > 510) {
        this.x = -76;
        this.speed = 100 + Math.floor(Math.random() * 340);
    }

    // Check collision between player and enemies
    if (player.x < this.x + 70 &&
        player.x + 45 > this.x &&
        player.y < this.y + 29 &&
        30 + player.y > this.y) {
        player.x = 300;
        player.y = 420;
		lives--;
		addLives.innerText = lives;
		if (lives === 0) {
			alert('Game Over! Play again.');
			lives = 3;
			score = 0;
			addLives.innerText = lives;
			addScore.innerText = '';
		}
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // Stop the player from moving off canvas
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching water 100 points will be added to their game score
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
		score++;
		addScore.innerText = score * 100;
		if (score === 10 && lives > 0) {
			confirm('You won the game!');
			lives = 3;
			score = 0;
			addLives.innerText = lives;
			addScore.innerText = '';
		}
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Position enemies to be created
var enemyPosition = [50, 130, 220];
var player = new Player(200, 400, 50);
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 500));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});