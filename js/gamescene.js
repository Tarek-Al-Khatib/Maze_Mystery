class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.username = "";
    this.selectedCharacter = "draven";
  }

  preload() {
    this.load.image("background", "assets/selection.png");

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
    this.add.image(450, 450, "background").setDisplaySize(900, 900); // to display the background image

    this.add.image(180, 230, "draven").setScale(0.5);
    this.add.image(450, 235, "seraphine").setScale(0.5);

    var dravenButton = this.add
      .text(100, 300, "Select Draven", { fontSize: "24px", fill: "#000" })
      .setInteractive();
    var seraphineButton = this.add
      .text(350, 300, "Select Seraphine", { fontSize: "24px", fill: "#000" })
      .setInteractive();
    var startButton = this.add
      .text(240, 400, "Start Game", { fontSize: "24px", fill: "#000" })
      .setInteractive();

    dravenButton.on("pointerdown", () => {
      this.selectedCharacter = "draven";
      dravenButton.setStyle({ fill: "#255" });
      seraphineButton.setStyle({ fill: "#000" });
    });

    seraphineButton.on("pointerdown", () => {
      this.selectedCharacter = "seraphine";
      seraphineButton.setStyle({ fill: "#255" });
      dravenButton.setStyle({ fill: "#000" });
    });

    startButton.on("pointerdown", () => {
      var userinput = document.getElementById("username");
      var label = document.getElementById("userlabel");
      if (userinput.value) {
        userinput.style.display = "none";
        label.innerHTML =
          "Let's go " +
          userinput.value +
          " Finish the game as " +
          this.selectedCharacter;
        this.moveToLevel();
      } else {
        alert("Please enter a username!");
      }
    });
  }

  moveToLevel() {
    this.scene.start("Level1", {
      username: this.username,
      character: this.selectedCharacter,
    });
  }
}
