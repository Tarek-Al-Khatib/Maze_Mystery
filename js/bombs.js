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

  scene.physics.add.collider(bombs, bombs);
  return bombs; 
}

function hitBomb(scene, playerSprite,level = '') {
  
  scene.physics.pause();
  playerSprite.setTint(0xff0000);

  
  const background = scene.add.rectangle(300, 300, 600, 600, 0x000000, 0.5);

  
  const gameOverText = scene.add
    .text(300, 300, "Game Over", {
      fontSize: "64px",
      fill: "#ff0000",
      fontWeight: "bold",
      fontFamily: "Arial",
    })
    .setOrigin(0.5);

    var restartButton = scene.add.text(300,400 , 'Restart', {
        fontSize: "32px",
        fill: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
    }).setOrigin(0.5).setInteractive();

    restartButton.on('pointerdown', () => {
        scene.score = 0; 

        if (scene.scoreText) {
            scene.scoreText.setText("Score: " + scene.score);
        }
        if(level != '')
          scene.scene.start(level); 
        else
          scene.scene.start('Level1'); 
      });

    restartButton.on('pointerover', () => {
        restartButton.setStyle({ fill: '#8A2BE2' });
    });
    
    restartButton.on('pointerout', () => {
        restartButton.setStyle({ fill: '#ffffff' });
    });
 
    

}
