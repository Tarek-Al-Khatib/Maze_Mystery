class Level2 extends Phaser.Scene {
  constructor() {
    super("Level2");
  }
  preload() {
    this.load.image("map2", "assets/map2.png");
    this.load.image("winningStar", "assets/winning-star.png");
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
    this.cameras.main.setBackgroundColor("#fff");
    const mapImage = this.add.image(300, 300, "map2").setDisplaySize(600, 600);
    cursors = this.input.keyboard.createCursorKeys();
    mapCanvas = document.createElement("canvas");
    mapCanvas.width = 600;
    mapCanvas.height = 600;
    mapContext = mapCanvas.getContext("2d");

    const texture = this.textures.get("map2").getSourceImage();
    mapContext.drawImage(texture, 0, 0, 600, 600);

    player = new Character(this, 0, 240);
    player.mapContext = mapContext;

    const starPositions = [
      { x: 120, y: 120 },
      { x: 250, y: 180 },
      { x: 320, y: 340 },
      { x: 90, y: 240 },
      { x: 300, y: 120 },
      { x: 270, y: 415 },
    ];

    starGroup = this.physics.add.group();
    starPositions.forEach((position) => {
      const star = starGroup.create(position.x, position.y, "star");
      star.setScale(0.7); // Adjusting star size
    });

    var winningStarGroup = this.physics.add.group();

    var winningStar = winningStarGroup.create(300, 300, "winningStar");
    winningStar.setScale(0.05);
    this.physics.add.collider(
      player.player,
      winningStarGroup,
      () => this.collectWinningStar(this, winningStar),
      null,
      this
    );

    this.physics.add.overlap(
      player.player,
      starGroup,
      this.collectStars,
      null,
      this
    );
    scoreText = this.add.text(450, 0, "Score: 0", {
      fontSize: "25px",
      fill: "#fff",
    });

    this.bombs = spawnBombs(this, 4);
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

  collectStars(player, star) {
    star.disableBody(true, true); // Remove the star from the screen
    //Updating the Score
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
  }
}