export class Character{
    constructor(scene, x, y) {
        this.scene = scene; 
       
        //Adding our Player to the map
        this.player = scene.physics.add.sprite(180,40,"tard_left");

        //Adding animation for our Player
        scene.anims.create({
            key: "left",
            frames: scene.anims.generateFrameNumbers("tard_left", { start: 0, end: 22 }),
            frameRate: 10,
            repeat: -1,
        })

        scene.anims.create({
            key: "right",
            frames: scene.anims.generateFrameNumbers("tard_right", { start: 0, end: 22 }),
            frameRate: 10,
            repeat: -1,
        });

        // Prevent player from leaving the canvas bounds
        this.player.setCollideWorldBounds(true);
    }

    update(){
        // Adding movements to the player
        const speed = 200; 
        let moveX = 0; 
        let moveY = 0; 

        // Check for input from the cursor keys
        const cursors = this.scene.input.keyboard.createCursorKeys();

        // Check input for movement
        if (cursors.left.isDown) {
            moveX = -speed; // Move left
            this.player.anims.play("left", true); // Play left animation
        } else if (cursors.right.isDown) {
            moveX = speed; // Move right
            this.player.anims.play("right", true); // Play right animation
        } else {
            this.player.anims.stop(); // Stop animation 
            this.player.setTexture("tard_right"); 
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
    
        // Check if wall
        if (this.isWall(nextX, nextY)) {
            this.player.setVelocity(0); // Stop 
        } else {
            this.player.setVelocity(dx, dy); // Move the player
        }
    }
    
    isWall(x, y) {
        // Get the pixel data at the players next position
        const pixel = this.mapContext.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    
        // Check if the pixel has a non-zero alpha (indicating a wall)
        return pixel[3] > 0;
    }
 
}