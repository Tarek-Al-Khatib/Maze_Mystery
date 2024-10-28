const config = {
    type: Phaser.WEBGL,
    width: 600, // canvas size
    height: 500, //canvas size
    canvas: gameCanvas, //canvasID
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: true, // Enable debug to visualize movement (set it false to remove the box over the dino)
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };


const game = new Phaser.Game(config); //initialize phaser game


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

}
function update(){

}