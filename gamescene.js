class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.username = "";
    this.selectedCharacter = "draven";
  }

  preload() {}

  create() {}

  moveToLevel() {
    this.scene.start("Level2", {
      username: this.username,
      character: this.selectedCharacter,
    });
  }
}
