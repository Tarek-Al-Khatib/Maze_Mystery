class level3 extends Phaser.Scene {
    constructor() {
      super("level3");  
    }
    preload() {
        this.load.image("map", "assets/level3/map.png");// the player map
        this.load.image("background", "assets/level3/background.jpg");// the map background  
    }

    create() {
        this.add.image(450, 450, "background").setDisplaySize(900, 900);
        var mapImage = this.add.image(450, 450, "map").setDisplaySize(900, 900);
    }

    update() {

    }
}