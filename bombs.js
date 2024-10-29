// Function to spawn bombs
function spawnBombs(scene, count) {

  const bombs = scene.physics.add.group({
    key: "bomb",
    repeat: count - 1,
    setXY: {
      x: Phaser.Math.Between(100, 800),
      y: Phaser.Math.Between(100, 800),
    },
    setScale: { x: 2, y: 2 },
  });

  bombs.children.iterate((bomb) => {
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    const speedX = Phaser.Math.Between(-200, 200);
    const speedY = Phaser.Math.Between(-200, 200);
    bomb.setVelocity(speedX, speedY);
  });

  scene.physics.add.collider(bombs, bombs); // Collide bombs with each other
  return bombs; // Return the bombs group
}

function hitBomb(scene, playerSprite) {

<<<<<<< HEAD
    //Transparent background for the text
    const background = scene.add.rectangle(300, 300, 600, 700, 0x000000, 0.5);

    // Display game over text
    const gameOverText = scene.add.text(300, 300, 'Game Over', { 
        fontSize: '64px', 
        fill: '#ff0000',
        fontWeight: 'bold', 
        fontFamily: 'Arial' 
    }).setOrigin(0.5);
}
=======
  // Stops all physics
  scene.physics.pause();
  // Tint the player for GameOver
  playerSprite.setTint(0xff0000);

  //Transparent background for the text
  const background = scene.add.rectangle(300, 300, 600, 600, 0x000000, 0.5);

  // Display game over text
  const gameOverText = scene.add
    .text(300, 300, "Game Over", {
      fontSize: "64px",
      fill: "#ff0000",
      fontWeight: "bold",
      fontFamily: "Arial",
    })
    .setOrigin(0.5);
}
>>>>>>> a282d4a2209375446b4d73d3eb012e969051e481
