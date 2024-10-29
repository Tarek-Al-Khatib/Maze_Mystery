class Character {
<<<<<<< HEAD
  constructor(scene, x, y, yBoundary, xBoundary) {
    this.scene = scene;
    this.yBoundary = yBoundary; 
    this.xBoundary = xBoundary; 

=======

  constructor(scene, x, y, characterName) {
    this.scene = scene;
    this.characterName = characterName;
    console.log(characterName);
>>>>>>> a282d4a2209375446b4d73d3eb012e969051e481
    //Adding our Player to the map
    this.player = scene.physics.add.sprite(
      x,
      y,
      this.characterName == "draven" ? "draven-left" : "tard_left"
    );

    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers(
        this.characterName == "draven" ? "draven-left" : "tard_left",
        {
          start: 0,
          end: 22,
        }
      ),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers(
        this.characterName == "draven" ? "draven-right" : "tard_right",
        {
          start: 0,
          end: 22,
        }
      ),
      frameRate: 10,
      repeat: -1,
    });

    this.player.setCollideWorldBounds(true);
  }

  update() {
    const speed = 200;
    let moveX = 0;
    let moveY = 0;

    const cursors = this.scene.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      moveX = -speed;
      this.player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      moveX = speed; // Move right
      this.player.anims.play("right", true);
    } else {
      this.player.anims.stop();
      this.player.setTexture(
        this.characterName == "draven" ? "draven-right" : "tard_right"
      );
    }

    // To ensure the dino cant pass thru wall
    if (cursors.up.isDown) {
      moveY = -speed; // move up
    } else if (cursors.down.isDown) {
      moveY = speed; //move down
    }

    // Attempt to move the player
    this.movePlayer(moveX, moveY);
  }

  movePlayer(dx, dy) {
    const nextX = this.player.x + dx * 0.05; // calculate players next potential position based on their current
    const nextY = this.player.y + dy * 0.05;


    // Restrict movement to prevent the player from going out of the map
    if (nextY < this.yBoundary) {
      dy = 0; // Stop vertical 
    }

    if (nextX < this.xBoundary) {
      dx = 0; // Stop horizontal 
    }

    // Check if wall
    if (this.isWall(nextX, nextY)) {
      this.player.setVelocity(0); // Stop
    } else {
      this.player.setVelocity(dx, dy); // Move the player
    }
  }

  isWall(x, y) {
    // Get the pixel data at the players next position
    const pixel = this.mapContext.getImageData(
      Math.floor(x),
      Math.floor(y),
      1,
      1
    ).data;

    // Check if the pixel has a non-zero alpha (indicating a wall)
    return pixel[3] > 0;
  }
}
