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
        this.load.image("coin", "assets/star.png"); // star it's a coin collected by the player
        this.load.image('bomb', 'assets/bomb.png'); // bomb to kill the player

    }

    create() {
        //map section
        this.add.image(300, 300, "background").setDisplaySize(600, 600);// to display the background image
        this.add.image(300, 300, "map").setDisplaySize(600, 600);// set the map image
        
        mapCanvas = document.createElement("canvas");
        mapCanvas.width = 600;
        mapCanvas.height = 600;
        mapContext = mapCanvas.getContext("2d");
        
        const mapTexture = this.textures.get("map").getSourceImage();
        mapContext.drawImage(mapTexture, 0, 0, 600, 600);


        //player section
        player = this.physics.add.sprite(100, 70, "tard_left"); // add a player as a physical object on map
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
        this.next_level = this.physics.add.sprite(503, 529, "next_level").setDisplaySize(2, 2).setScale(0.03); 
        this.next_level.setCollideWorldBounds(true); 
        this.physics.add.overlap(player, this.next_level, this.level_finish, null, this);
  

        this.coins = this.physics.add.group(); 
        this.physics.add.overlap(player, this.coins, this.collect_coin, null, this);
        this.place_coins(30,'coin');


        this.bombs = this.physics.add.group();
        this.spawn_bombs(2);
    
        this.physics.add.collider(player, this.bombs, this.hit_bomb, null, this);

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
        //this.scene.start('level1');//next level
    }


    collect_coin(player, coin) {
        coin.destroy();
    }
    
    //to set coins randomly on maps and make sure their place to position can be reached by the player
    place_coins(count,type) {
        const mapMinX = 540; //540
        const mapMaxX = 55;//48 
        const mapMinY = 520;//520 
        const mapMaxY = 60;//60 
    
        let placed = 0;
    
        while (placed < count) {
            const x = Phaser.Math.Between(mapMinX, mapMaxX);
            const y = Phaser.Math.Between(mapMinY, mapMaxY);
    
            if (!this.is_wall(x, y)) { 
                const coin = this.coins.create(x, y, type);
                coin.setScale(0.5); 
                placed++;
            }
        }
    }  

    //if player hit bomb will puse and lose
    hit_bomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play("turn");
    }
    
    //to set more than one bomb as we want
    spawn_bombs(count) {
        this.bombs = this.physics.add.group({
            key: "bomb",
            repeat: count - 1,
            setXY: { x: Phaser.Math.Between(100, 800), y: Phaser.Math.Between(100, 800) },
            setScale: { x: 1.5, y: 1.5 } 
        });
    
        this.bombs.children.iterate((bomb) => {
            bomb.setBounce(1);  
            bomb.setCollideWorldBounds(true);
            bomb.setScale(2)
            bomb.setBounce(1)
            const speedX = Phaser.Math.Between(-200, 200);
            const speedY = Phaser.Math.Between(-200, 200);
            bomb.setVelocity(speedX, speedY);
        });
    
        this.physics.add.collider(this.bombs, this.bombs);
    }
}