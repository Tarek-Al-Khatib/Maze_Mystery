class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
  }
  init(data) {
    this.username = data.username;
    this.character = data.character;
    console.log(data);
  }
  preload() {
    // Load the maze PNG and other assets
    this.load.image("map", "assets/map.png");

    this.load.image("winningStar", "assets/winning-star.png");
    this.load.spritesheet("draven-left", "assets/draven-left.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.spritesheet("draven-right", "assets/draven-right.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
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
  }

  create() {
    //Setting up the Background
    this.cameras.main.setBackgroundColor("#8A2BE2");

    // Adding the Maze Map (with its size)
    const mapImage = this.add.image(250, 250, "map").setDisplaySize(500, 500);

    cursors = this.input.keyboard.createCursorKeys();

    //Create a hidden canvas to access pixel data of the map maze
    mapCanvas = document.createElement("canvas");
    mapCanvas.width = 500;
    mapCanvas.height = 500;
    mapContext = mapCanvas.getContext("2d");

    //Drawing the maze map into the hidden canvas to detect the walls
    const texture = this.textures.get("map").getSourceImage();
    mapContext.drawImage(texture, 0, 0, 500, 500);

    var xBoundaryLimit = 80;
    var yBoundaryLimit = 0;
    // Create an instance of Character and store it as a property
    player = new Character(this, 180, 40, this.character, 80, 0); // Store reference in the outer scope
    player.mapContext = mapContext; // Pass the mapContext to the player in the Character class

    // Place stars manually within the maze
    const starPositions = [
      { x: 120, y: 120 },
      { x: 250, y: 180 },
      { x: 320, y: 340 },
      { x: 90, y: 240 },
      { x: 300, y: 120 },
      { x: 270, y: 415 },
    ];
    var winningStarGroup = this.physics.add.group();

    var winningStar = winningStarGroup.create(360, 450, "winningStar");
    winningStar.setScale(0.05);
    this.physics.add.collider(
      player.player,
      winningStarGroup,
      () => this.collectWinningStar(this, winningStar),
      null,
      this
    );
    // Creates a physics group for stars
    starGroup = this.physics.add.group();

    // Create stars at the defined positions
    starPositions.forEach((position) => {
      const star = starGroup.create(position.x, position.y, "star");
      star.setScale(0.7); // Adjusting star size
    });

    // Add collision between the player and stars
    this.physics.add.overlap(
      player.player,
      starGroup,
      this.collectStars,
      null,
      this
    );

    // Create the score text object
    scoreText = this.add.text(435, 16, "Score: 0", {
      fontSize: "30px",
      fill: "#000",
    });

    // Calls the function spawnBombs
    this.bombs = spawnBombs(this, 2);

    // Add collision between the player and bombs
    this.physics.add.collider(
      player.player,
      this.bombs,
      (playerSprite, bomb) => hitBomb(this, playerSprite),
      null,
      this
    );
  }
  update() {
    if (player) {
      player.update();
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
      this.scene.start("Level2");
    }, 3000);
  }
}
