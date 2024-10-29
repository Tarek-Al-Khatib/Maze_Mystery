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
        
        //player movement animation 
        this.anims.create({ key: "left", frames: this.anims.generateFrameNumbers("tard_left", { start: 0, end: 22, }), frameRate: 20, repeat: -1, });
        this.anims.create({ key: "right",frames: this.anims.generateFrameNumbers("tard_right", {start: 0,end: 22,}),frameRate: 22,repeat: -1,});
        this.anims.create({ key: 'up', frames: this.anims.generateFrameNumbers('tard_top', { start: 0, end: 22 }), frameRate: 22, repeat: -1 });
        this.anims.create({ key: 'down', frames: this.anims.generateFrameNumbers('tard_down', { start: 0, end: 22 }), frameRate: 22, repeat: -1 });
        this.anims.create({ key: 'turn', frames: [{ key: 'tard_left', frame: 0 }], frameRate: 20 });
        
        //to detect user input
        cursors = this.input.keyboard.createCursorKeys();


    }

    update() {

        //set action animation to player when user press up,down, left or wright
        const speed = 200;
        let moveX = 0;
        let moveY = 0;

        if (cursors.left.isDown) {
            moveX = -speed;
            player.anims.play("left", true);
        } else if (cursors.right.isDown) {
            moveX = speed;
            player.anims.play("right", true);
        }

        if (cursors.up.isDown) {
            moveY = -speed;
            player.anims.play("up", true);
        } else if (cursors.down.isDown) {
            moveY = speed;
            player.anims.play("down", true);
        }

        if (moveX === 0 && moveY === 0) {
            player.setVelocity(0, 0);
            player.anims.play("turn", true);
        }

    }
}