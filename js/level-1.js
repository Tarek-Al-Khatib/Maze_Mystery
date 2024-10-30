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
    this.load.spritesheet("draven-top", "assets/draven-top.png", { frameWidth: 24, frameHeight: 24, });
    this.load.spritesheet("draven-down", "assets/draven-down.png", { frameWidth: 24, frameHeight: 24, });

    this.load.spritesheet("draven-left", "assets/draven-left.png", { frameWidth: 24, frameHeight: 24, });
    this.load.spritesheet("draven-right", "assets/draven-right.png", { frameWidth: 24, frameHeight: 24, });

    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
  }

  create() {
    this.score= 0 
    //Setting up the Background
    this.cameras.main.setBackgroundColor("#8A2BE2");

    // Adding the Maze Map (with its size)
    const mapImage = this.add.image(300, 300, "map").setDisplaySize(600, 600);

    cursors = this.input.keyboard.createCursorKeys();

    //Create a hidden canvas to access pixel data of the map maze
    mapCanvas = document.createElement("canvas");
    mapCanvas.width = 600;
    mapCanvas.height = 600;
    mapContext = mapCanvas.getContext("2d");

    //Drawing the maze map into the hidden canvas to detect the walls
    const texture = this.textures.get("map").getSourceImage();
    mapContext.drawImage(texture, 0, 0, 600, 600);

    // Define Boundary limits
    const yBoundary = 82;
    const xBoundary = 0;

    // Create an instance of Character and store it as a property
    player = new Character(this, 210, 85, this.character, yBoundary, xBoundary); // Store reference in the outer scope

    player.mapContext = mapContext; // Pass the mapContext to the player in the Character class

    // Place stars manually within the maze
    const starPositions = [
      { x: 150, y: 140 }, 
      { x: 240, y: 190 }, 
      { x: 305, y: 140 },
      { x: 330, y: 300 },
      { x: 410, y: 200 },
      { x: 455, y: 390 },
      { x: 240, y: 450 },
    ];

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

    var winningStarGroup = this.physics.add.group();

    var winningStar = winningStarGroup.create(100, 285, "winningStar");
    winningStar.setScale(0.03);
    this.physics.add.collider(
      player.player,
      winningStarGroup,
      () => this.collectWinningStar(this, winningStar),
      null,
      this
    );

    scoreText = this.add.text(450, 0, "Score: " + this.score,{
        fontSize: "25px",
        fill: "#fff",
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
    this.score += 10;
    scoreText.setText("Score: " + this.score);
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
      this.scene.start("Level2", {
        username: this.username,
        character: this.character,
        score: this.score,
      });
    }, 3000);
  }
}
