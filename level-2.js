import { Character } from "./character.js";
const config = {
  type: Phaser.WEBGL,
  width: 600, // canvas size
  height: 600, //canvas size
  canvas: gameCanvas, //canvasID
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true, // Enable debug to visualize (set it false to remove the box over the dino)
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
let player;
let cursors;
let mapCanvas; // Hidden canvas map pixel collsion detection
let mapContext; // To extract pixel data
let starGroup;
let score = 0; // Setting initially to 0
let scoreText;

function preload() {
  this.load.image("map2", "assets/map2.png");
  this.load.spritesheet("tard_left", "assets/tard_left_blue.png", {
    frameWidth: 24,
    frameHeight: 24,
  });

  this.load.spritesheet("tard_right", "assets/tard_right_blue.png", {
    frameWidth: 24,
    frameHeight: 24,
  });

  this.load.image("star", "assets/star.png");
  this.load.image("bomb", "assets/bomb.png");
}

function create() {
  this.cameras.main.setBackgroundColor("#fff");
  this.add.image(300, 300, "map2").setDisplaySize(600, 600);
  cursors = this.input.keyboard.createCursorKeys();
  mapCanvas = document.createElement("canvas");
  mapCanvas.width = 600;
  mapCanvas.height = 600;

  const texture = this.textures.get("map").getSourceImage();
  mapContext.drawImage(texture, 0, 0, 600, 600);

  player = new Character(this, 180, 40);
  player.mapContext = mapContext;

  const starPositions = [
    { x: 120, y: 120 },
    { x: 250, y: 180 },
    { x: 320, y: 340 },
    { x: 90, y: 240 },
    { x: 300, y: 120 },
    { x: 270, y: 415 },
  ];

  starGroup = this.physics.add.group();
  starPositions.forEach((position) => {
    const star = starGroup.create(position.x, position.y, "star");
    star.setScale(0.7); // Adjusting star size
  });

  this.physics.add.overlap(player.player, starGroup, collectStars, null, this);
  scoreText = this.add.text(435, 16, "Score: 0", {
    fontSize: "30px",
    fill: "#000",
  });

  this.bombs = this.physics.add.group();
  spawnBombs.call(this, 2);
  this.physics.add.collider(player.player, this.bombs, hitBomb, null, this);
}

function update() {
  if (player) {
    player.update();
  }
}

function collectStars(player, star) {
  star.disableBody(true, true); // Remove the star from the screen
  //Updating the Score
  score += 10;
  scoreText.setText("Score: " + score);
}

// Function to spawn bombs
function spawnBombs(count) {
  this.bombs = this.physics.add.group({
    key: "bomb",
    repeat: count - 1, // One bomb is created by default ( no need to create)
    setXY: {
      x: Phaser.Math.Between(100, 800),
      y: Phaser.Math.Between(100, 800),
    },
    setScale: { x: 2, y: 2 },
  });

  this.bombs.children.iterate((bomb) => {
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    const speedX = Phaser.Math.Between(-200, 200);
    const speedY = Phaser.Math.Between(-200, 200);
    bomb.setVelocity(speedX, speedY);
  });

  this.physics.add.collider(this.bombs, this.bombs);
}

function hitBomb(playerSprite, bomb) {
  // Stops all physics
  this.physics.pause();
  // Tint the player for GameOver
  playerSprite.setTint(0xff0000);

  //Transparent background for the text
  const background = this.add.rectangle(300, 250, 600, 500, 0x000000, 0.5);

  // Display game over text
  const gameOverText = this.add
    .text(250, 250, "Game Over", {
      fontSize: "64px",
      fill: "#ff0000",
      fontWeight: "bold",
      fontFamily: "Arial",
    })
    .setOrigin(0.5);
}
