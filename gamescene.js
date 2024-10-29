class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.username = "";
    this.selectedCharacter = "draven";
  }

  preload() {
    this.load.image("draven", "assets/draven.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image("seraphine", "assets/seraphine.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(180, 230, "draven").setScale(0.5); // Adjust scale as needed

    // Add Seraphine image above the button
    this.add.image(450, 235, "seraphine").setScale(0.5); // Adjust scale as needed

    var dravenButton = this.add
      .text(100, 300, "Select Draven", { fontSize: "24px", fill: "#fff" })
      .setInteractive();
    var seraphineButton = this.add
      .text(350, 300, "Select Seraphine", { fontSize: "24px", fill: "#fff" })
      .setInteractive();
    var startButton = this.add
      .text(240, 400, "Start Game", { fontSize: "24px", fill: "#fff" })
      .setInteractive();

    dravenButton.on("pointerdown", () => {
      this.selectedCharacter = "draven";
      dravenButton.setStyle({ fill: "#0f0" });
      seraphineButton.setStyle({ fill: "#fff" });
    });

    seraphineButton.on("pointerdown", () => {
      this.selectedCharacter = "seraphine";
      seraphineButton.setStyle({ fill: "#0f0" });
      dravenButton.setStyle({ fill: "#fff" });
    });

    startButton.on("pointerdown", () => {
      this.username = document.getElementById("username").value;
      if (this.username) {
        this.moveToLevel();
      } else {
        alert("Please enter a username!");
      }
    });
  }

  moveToLevel() {
    this.scene.start("Level2", {
      username: this.username,
      character: this.selectedCharacter,
    });
  }
}
