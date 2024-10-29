import { Level1 } from './level-1-1.js';


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

const game = new Phaser.Game(config); //initialize phaser game