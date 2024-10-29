import { Character } from './character.js'; 
import { spawnBombs, hitBomb } from './bombs.js';

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

let player1;
let cursors; 
let mapCanvas; // Hidden canvas map pixel collsion detection
let mapContext; // To extract pixel data
let starGroup;
let score = 0; // Setting initially to 0
let scoreText; 



function preload(){
    // Load the maze PNG and other assets
    this.load.image("map", "assets/map.png");

    // Load the Player
    this.load.spritesheet("tard_left", "assets/tard_left_blue.png", {
        frameWidth: 24,
        frameHeight: 24,
    });
    
    this.load.spritesheet("tard_right", "assets/tard_right_blue.png", {
        frameWidth: 24,
        frameHeight: 24,
    });

    this.load.image("star","assets/star.png");
    this.load.image('bomb', 'assets/bomb.png');


}
function create(){
    //Setting up the Background White
    this.cameras.main.setBackgroundColor('#8A2BE2')

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
    player1 = new Character(this, 180, 40); // Store reference in the outer scope

    player1.mapContext = mapContext; // Pass the mapContext to the player in the Character class

    // Place stars manually within the maze
    const starPositions = [
        { x: 120, y: 120 },
        { x: 250, y: 180 },
        { x: 320, y: 340 },
        { x: 90, y: 240 },
        { x: 300, y: 120 },
        { x: 270, y: 415},
    ];

    // Creates a physics group for stars
    starGroup = this.physics.add.group(); 

    // Create stars at the defined positions
    starPositions.forEach((position) => { 
        const star = starGroup.create(position.x, position.y, 'star');
        star.setScale(0.7); // Adjusting star size 
    });

    // Add collision between the player and stars 
    this.physics.add.overlap(player1.player, starGroup, collectStars, null, this);      

    // Create the score text object
    scoreText = this.add.text(435, 16, 'Score: 0', { fontSize: '30px', fill: '#000'});

    // Calls the function spawnBombs
    this.bombs = spawnBombs(this, 2);

    // Add collision between the player and bombs
    this.physics.add.collider(player1.player, this.bombs, (playerSprite, bomb) => hitBomb(this, playerSprite), null, this);


}
function update(){
    if (player1){
        player1.update(); 
    }
}

// Function to collect the star
function collectStars(player, star) {
    star.disableBody(true, true); // Remove the star from the screen
    //Updating the Score
    score += 10;
    scoreText.setText("Score: " + score);
}