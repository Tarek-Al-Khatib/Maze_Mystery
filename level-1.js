class Level1 extends Phaser.Scene {

    preload() {
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

        this.load.image("star", "assets/star.png");
        this.load.image("bomb", "assets/bomb.png");
        this.load.image("winningStar", "assets/winning-star.png");
    }

    create(){
        //Setting up the Background 
        this.cameras.main.setBackgroundColor('#8A2BE2')

        // Adding the Maze Map (with its size)
        const mapImage = this.add.image(300, 300, "map").setDisplaySize(600, 600); 
        
        
        cursors = this.input.keyboard.createCursorKeys();

        //Create a hidden canvas to access pixel data of the map maze
        mapCanvas= document.createElement("canvas");
        mapCanvas.width=600;
        mapCanvas.height=600;
        mapContext= mapCanvas.getContext("2d");

        //Drawing the maze map into the hidden canvas to detect the walls
        const texture = this.textures.get("map").getSourceImage();
        mapContext.drawImage(texture, 0, 0, 600, 600); 

        // Define boundary limits for this level
        const yBoundaryLimit = 80;
        const xBoundaryLimit = 0;

        // Create an instance of Character and store it as a property
        player1 = new Character(this, 210, 90, yBoundaryLimit, xBoundaryLimit);
        player1.mapContext = mapContext; // Pass the mapContext to the player in the Character class

        // Place stars manually within the maze
        const starPositions = [
            { x: 150, y: 250 },
            { x: 410, y: 200 },
            { x: 330, y: 300 },
            { x: 455, y: 290 },
            { x: 300, y: 145 },
            { x: 270, y: 410},
        ];

        // Creates a physics group for stars
        starGroup = this.physics.add.group(); 

        // Create stars at the defined positions
        starPositions.forEach((position) => { 
            const star = starGroup.create(position.x, position.y, 'star');
            star.setScale(0.7); // Adjusting star size 
        });

        // Add collision between the player and stars 
        this.physics.add.overlap(player1.player, starGroup, this.collectStars, null, this);      

        // Create the score text object
        scoreText = this.add.text(435, 16, 'Score: 0', { fontSize: '30px', fill: '#000'});

        // Calls the function spawnBombs
        this.bombs = spawnBombs(this, 2);

        // Add collision between the player and bombs
        this.physics.add.collider(player1.player, this.bombs, (playerSprite, bomb) => hitBomb(this, playerSprite), null, this);


        var winningStarGroup = this.physics.add.group();

        const winningStar = winningStarGroup.create(100, 290, "winningStar");

        winningStar.setScale(0.03);
        this.physics.add.collider( player1.player, winningStarGroup, () => this.collectWinningStar(this, winningStar), null, this);

    }
    update(){
        if (player1){
            player1.update(); 
        }
    }

    // collect the star
    collectStars(player, star) {
        star.disableBody(true, true); // Remove the star from the screen
        score += 10;
        scoreText.setText("Score: " + score);
    }

    collectWinningStar(scene, star) {
        star.disableBody(true, true);
        scene.physics.pause();
        scene.add.rectangle(300, 300, 600, 600, 0x000000, 0.5);
        scene.add
          .text(300, 300, "You win", {
            fontSize: "64px",
            fill: "#0f0",
            fontWeight: "bold",
            fontFamily: "Arial",
          })
          .setOrigin(0.5);
        setTimeout(() => {
          this.scene.start("level3");
        }, 3000);
      }
    
}

