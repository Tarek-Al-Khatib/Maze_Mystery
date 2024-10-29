export class scoreUpdates {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;
    }

    incrementScore(amount) {
        this.score += amount;
    }

    getScore() {
        return this.score;
    }
}
