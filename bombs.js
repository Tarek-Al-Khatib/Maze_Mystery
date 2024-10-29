// Function to spawn bombs
export function spawnBombs(scene, count) {
    const bombs = scene.physics.add.group({
        key: "bomb",
        repeat: count - 1,
        setXY: { x: Phaser.Math.Between(100, 800), y: Phaser.Math.Between(100, 800) },
        setScale: { x: 2, y: 2 }
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

export function hitBomb(scene, playerSprite) {
    // Stops all physics
    scene.physics.pause();
    // Tint the player for GameOver
    playerSprite.setTint(0xff0000);

    //Transparent background for the text
    const background = scene.add.rectangle(300, 250, 600, 500, 0x000000, 0.5);

    // Display game over text
    const gameOverText = scene.add.text(250, 250, 'Game Over', { 
        fontSize: '64px', 
        fill: '#ff0000',
        fontWeight: 'bold', 
        fontFamily: 'Arial' 
    }).setOrigin(0.5);
}