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

    //Adding our Player to the map
    player = this.physics.add.sprite(180,40,"tard_left")

    //Adding animation for our Player
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("tard_left", { start: 0, end: 22 }),
        frameRate: 10,
        repeat: -1,
    })

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("tard_right", { start: 0, end: 22 }),
        frameRate: 10,
        repeat: -1,
    });

    // Prevent player from leaving the canvas bounds
    player.setCollideWorldBounds(true);

    // To capture keyboared Input
    cursors = this.input.keyboard.createCursorKeys();

}
function update(){
    // Adding movements to the player
    const speed = 200; 
    let moveX = 0; 
    let moveY = 0; 

    // Check input for movement
    if (cursors.left.isDown) {
        moveX = -speed; // Move left
        player.anims.play("left", true); // Play left animation
    } else if (cursors.right.isDown) {
        moveX = speed; // Move right
        player.anims.play("right", true); // Play right animation
    } else {
        player.anims.stop(); // Stop animation if not moving
        player.setTexture("tard_right"); // Set to idle texture or a default one
    }

    // To ensure the dino cant pass thru wall
    if (cursors.up.isDown) {
        moveY = -speed; // move up
    } else if (cursors.down.isDown) {
        moveY = speed; //move down
    }

    // Update the player position
    player.setVelocity(moveX, moveY);
 
}
