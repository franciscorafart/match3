var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'phaser-game',
  scene: [SceneMain]
};

var game = new Phaser.Game(config);