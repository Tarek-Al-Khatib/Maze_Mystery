import { Character } from "./character.js";
const config = {
  type: Phaser.WEBGL,
  width: 600, // canvas size
  height: 500, //canvas size
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

function preload() {}

function create() {}

function update() {}
