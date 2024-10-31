let player;
let cursors;
let mapCanvas; // Hidden canvas map pixel collsion detection
let mapContext; // To extract pixel data
let starGroup;
let score = 0; // Setting initially to 0
let scoreText;

const config = {
  type: Phaser.WEBGL,
  width: 600, // canvas size
  height: 600, //canvas size
  canvas: gameCanvas, //canvasID
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false, // Enable debug to visualize (set it false to remove the box over the dino)
    },
  },
  scene: [GameScene, Level1, Level2, level3],
};

const game = new Phaser.Game(config); //initialize phaser game
