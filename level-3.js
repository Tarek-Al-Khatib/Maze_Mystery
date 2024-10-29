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
        
        this.load.image("next_level", "assets/winning-star.png"); // image assesst to win the game

    }

    create() {
        //map section
        this.add.image(450, 450, "background").setDisplaySize(900, 900);// to display the background image
        this.add.image(450, 450, "map").setDisplaySize(900, 900);// set the map image
        
        mapCanvas = document.createElement("canvas");
        mapCanvas.width = 900;
        mapCanvas.height = 900;
        mapContext = mapCanvas.getContext("2d");
        
        mapTexture = this.textures.get("map").getSourceImage();
        mapContext.drawImage(mapTexture, 0, 0, 900, 900);


        //player section
        player = this.physics.add.sprite(150, 110, "tard_left"); // add a player as a physical object on map
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setScale(1.25);

        //player movement animation 
        this.anims.create({ key: "left", frames: this.anims.generateFrameNumbers("tard_left", { start: 0, end: 22, }), frameRate: 20, repeat: -1, });
        this.anims.create({ key: "right",frames: this.anims.generateFrameNumbers("tard_right", {start: 0,end: 22,}),frameRate: 22,repeat: -1,});
        this.anims.create({ key: 'up', frames: this.anims.generateFrameNumbers('tard_top', { start: 0, end: 22 }), frameRate: 22, repeat: -1 });
        this.anims.create({ key: 'down', frames: this.anims.generateFrameNumbers('tard_down', { start: 0, end: 22 }), frameRate: 22, repeat: -1 });
        this.anims.create({ key: 'turn', frames: [{ key: 'tard_left', frame: 0 }], frameRate: 20 });
        
        //finish level
        this.next_level = this.physics.add.sprite(755, 795, "next_level").setDisplaySize(2, 2).setScale(0.05); 
        this.next_level.setCollideWorldBounds(true); 
        this.physics.add.overlap(player, this.next_level, this.level_finish, null, this);
  
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
        }else {
            this.move_player(player, moveX, moveY);
        }

    }
    move_player(player, dx, dy) {
        //get the next postion wall or not 
        const nextX = player.x + dx * 0.05;
        const nextY = player.y + dy * 0.05;
        
        
        //check if the next postion wall or not 
        if (this.is_wall(nextX, nextY)) {
            player.setVelocity(0, 0);
        } else {
            player.setVelocity(dx, dy);
        }
    }
    
    is_wall(x, y) {

        // to check if the pixel is in a specific position  if not player can move
        const pixel = mapContext.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
        return pixel[3] > 0;
    }
  
    level_finish(player, next_level) {
        next_level.disableBody(true, true); 
    }
  
    
  
}