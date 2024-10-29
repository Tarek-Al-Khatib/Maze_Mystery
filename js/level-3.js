class level3 extends Phaser.Scene {
    constructor() {
      super("level3");  
    }
    init(data) {
        this.username = data.username;
        this.character = data.character;
        console.log(data);
    }
    
    preload() {
        this.load.image("level3map", "assets/level3/map.png");// the player map
        this.load.image("background", "assets/level3/background.jpg");// the map background 
        this.load.spritesheet("draven-left", "assets/draven-left.png", {
            frameWidth: 24,
            frameHeight: 24,
        });
        this.load.spritesheet("draven-right", "assets/draven-right.png", {
        frameWidth: 24,
        frameHeight: 24,
        });
        
        //Player Assets
        this.load.spritesheet("tard_left", "assets/level3/tard_left.png", { frameWidth: 24, frameHeight: 24, });
        this.load.spritesheet("tard_right", "assets/level3/tard_right.png", { frameWidth: 24, frameHeight: 24, });
        this.load.spritesheet("tard_top", "assets/level3/tard_top.png", { frameWidth: 24, frameHeight: 24, });
        this.load.spritesheet("tard_down", "assets/level3/tard_down.png", { frameWidth: 24, frameHeight: 24, });
        
        this.load.spritesheet("draven-top", "assets/draven-top.png", { frameWidth: 24, frameHeight: 24, });
        this.load.spritesheet("draven-down", "assets/draven-down.png", { frameWidth: 24, frameHeight: 24, });
    
        this.load.spritesheet("draven-left", "assets/draven-left.png", { frameWidth: 24, frameHeight: 24, });
        this.load.spritesheet("draven-right", "assets/draven-right.png", { frameWidth: 24, frameHeight: 24, });

        this.load.image("next_level", "assets/winning-star.png"); // image assesst to win the game
        this.load.image("coin", "assets/star.png"); // star it's a coin collected by the player
        this.load.image('bomb', 'assets/bomb.png'); // bomb to kill the player

    }

    create() {
        //map section
        this.add.image(300, 300, "background").setDisplaySize(600, 600);// to display the background image
        this.add.image(300, 300, "level3map").setDisplaySize(600, 600);// set the map image
        
        mapCanvas = document.createElement("canvas");
        mapCanvas.width = 600;
        mapCanvas.height = 600;
        mapContext = mapCanvas.getContext("2d");
        
        const mapTexture = this.textures.get("level3map").getSourceImage();
        mapContext.drawImage(mapTexture, 0, 0, 600, 600);


        //player section
        player = new Character(this, 100, 70, this.character, 0, 0);
        player.mapContext = mapContext;


        //player movement animation 
        this.anims.create({ key: 'up', frames: this.anims.generateFrameNumbers('tard_top', { start: 0, end: 22 }), frameRate: 22, repeat: -1 });
        this.anims.create({ key: 'down', frames: this.anims.generateFrameNumbers('tard_down', { start: 0, end: 22 }), frameRate: 22, repeat: -1 });
        
        //finish level
        this.next_level = this.physics.add.sprite(503, 529, "next_level").setDisplaySize(2, 2).setScale(0.03); 
        this.next_level.setCollideWorldBounds(true); 
        this.physics.add.overlap(player, this.next_level, this.level_finish, null, this);
  

        this.coins = this.physics.add.group(); 
        this.physics.add.overlap(player.player, this.coins, this.collect_coin, null, this);
        this.place_coins(30,'coin');


        this.bombs = this.physics.add.group();
        this.spawn_bombs(2);
    
        this.physics.add.collider(player.player, this.bombs, 
            (playerSprite, bomb) => hitBomb(this, playerSprite),
            null, this);

        scoreText = this.add.text(450, 0, "Score: 0", {
            fontSize: "25px",
            fill: "#fff",
        });
      
        //to detect user input
        cursors = this.input.keyboard.createCursorKeys();

    }

    update() {
        //set action animation to player when user press up,down, left or wright
        if (player) {
            player.update();
        }      
    }
    
    is_wall(x, y) {
        // to check if the pixel is in a specific position  if not player can move
        const pixel = mapContext.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
        return pixel[3] > 0;
    }
  
    level_finish(player, next_level) {
        next_level.disableBody(true, true); 
        scene.physics.pause();
        scene.add.rectangle(300, 300, 600, 600, 0x000000, 0.5);
        scene.add
        .text(300, 300, "winner winner chicken dinner ", {
            fontSize: "64px",
            fill: "#0f0",
            fontWeight: "bold",
            fontFamily: "Arial",
        })
        .setOrigin(0.5);
    
    }


    collect_coin(player, coin) {
        coin.destroy();
        score += 10;
        scoreText.setText("Score: " + score);
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