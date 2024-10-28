import { Character } from './character.js'; 

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
let player;
let cursors; 
let mapCanvas; // Hidden canvas map pixel collsion detection
let mapContext; // To extract pixel data



function preload(){
    // Load the maze PNG and other assets
    this.load.image("map", "assets_hanan/map.png");

    // Load the Player
    this.load.spritesheet("tard_left", "assets_hanan/tard_left.png", {
        frameWidth: 24,
        frameHeight: 24,
    });
    
    this.load.spritesheet("tard_right", "assets_hanan/tard_right.png", {
        frameWidth: 24,
        frameHeight: 24,
    });


}
function create(){
    //Setting up the Background White
    this.cameras.main.setBackgroundColor('#fff')

    // Adding the Maze Map (with its size)
    const mapImage = this.add.image(250, 250, "map").setDisplaySize(500, 500); 
    
    // To capture keyboared Input
    cursors = this.input.keyboard.createCursorKeys();

    //Create a hidden canvas to access pixel data of the map maze
    mapCanvas= document.createElement("canvas");
    mapCanvas.width=500;
    mapCanvas.height=500;
    mapContext= mapCanvas.getContext("2d");

    //Drawing the maze map into the hidden canvas to detect the walls
    const texture = this.textures.get("map").getSourceImage();
    mapContext.drawImage(texture, 0, 0, 500, 500); 

    // Create an instance of Character and store it as a property
    player = new Character(this, 180, 40, mapCanvas); // Store reference in the outer scope

    player.mapContext = mapContext; // Pass the mapContext to the player in the Character class
}
function update(){
    if (player){
        player.update(); 
    }
}
