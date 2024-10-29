export function createStars(scene, positions) {
    const starGroup = scene.physics.add.group();

    positions.forEach(position => {
        const star = starGroup.create(position.x, position.y, 'star');
        star.setScale(0.7);
    });

    return starGroup;
}

export function collectStars(player, star, scoreManager) {
    star.disableBody(true, true);
    scoreManager.collectStar();
}
