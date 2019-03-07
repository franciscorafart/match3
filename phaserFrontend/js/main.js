let gameScene = new Phaser.Scene('Game');

gameScene.init = function() {

}

gameScene.preload = function() {
  console.log("Working");

  // load images
  this.load.image('background','assets/blackBG.png')
  this.load.image('orangeGem', 'assets/1x/gem1.png');
  this.load.image('blueGem', 'assets/1x/gem2.png');
  this.load.image('pinkGem', 'assets/1x/gem5.png');
  this.load.image('greenGem', 'assets/1x/gem6.png');

};

gameScene.create = function () {
  // background
 let bg = this.add.sprite(100, 100, 'background').setOrigin(0,0);
 let orange = this.add.sprite(110,210,'orangeGem').setScale(0.1);
 let blue = this.add.sprite(245,145,'blueGem').setScale(0.1);
 let pink = this.add.sprite(270,270,'pinkGem').setScale(0.1);
 let green = this.add.sprite(300,200,'greenGem').setScale(0.1);
}

let config = {
 type: Phaser.AUTO,
 scene: gameScene,
 pixelArt: false,
};

let game = new Phaser.Game(config);
