class level3 extends Phaser.Scene {
    constructor() {
      super("level3");  
    }
    preload() {
        this.load.image("map", "assets/level3/map.png");// the player map
        this.load.image("background", "assets/level3/background.jpg");// the map background 
        
        //Player Assets
        this.load.spritesheet("tard_left", "assets/level3/tard_left.png", { frameWidth: 24, frameHeight: 24, });
        this.load.spritesheet("tard_right", "assets/level3/tard_right.png", { frameWidth: 24, frameHeight: 24, });
        this.load.spritesheet("tard_top", "assets/level3/tard_top.png", { frameWidth: 24, frameHeight: 24, });
        this.load.spritesheet("tard_down", "assets/level3/tard_down.png", { frameWidth: 24, frameHeight: 24, });
        
    }

    create() {
        //map section
        this.add.image(450, 450, "background").setDisplaySize(900, 900);// to display the background image
        var mapImage = this.add.image(450, 450, "map").setDisplaySize(900, 900);// set the map image
    

        //player section
        player = this.physics.add.sprite(150, 110, "tard_left"); // add a player as a physical object on map
        


        
    }

    update() {

    }
}