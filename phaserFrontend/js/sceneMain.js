class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.image("gem1", "assets/gem1.png");
        this.load.image("gem2", "assets/gem2.png");
        this.load.image("gem5", "assets/gem5.png");
        this.load.image("gem6", "assets/gem6.png");


    }
    create() {
        var gridConfig = {
            'scene': this,
            'cols': 5,
            'rows': 5
        }
        
        this.aGrid = new AlignGrid(gridConfig);
        this.aGrid.showNumbers();
        //
        //
        this.gem1 = this.add.image(0, 0, "gem1");
        this.aGrid.placeAt(2,2,this.gem1);
        //scale the face
        this.gem1.displayWidth = game.config.width / 15;
        this.gem1.scaleY = this.gem1.scaleX;
        //place the face on the grid
        this.aGrid.placeAtIndex(18, this.gem1);

        this.gem2 = this.add.image(0, 0, "gem2");
        this.aGrid.placeAt(2,2,this.gem1);
        //scale the face
        this.gem2.displayWidth = game.config.width / 15;
        this.gem2.scaleY = this.gem2.scaleX;
        //place the face on the grid
        this.aGrid.placeAtIndex(10, this.gem2);

        this.gem5 = this.add.image(0, 0, "gem5");
        this.aGrid.placeAt(2,2,this.gem5);
        //scale the face
        this.gem5.displayWidth = game.config.width / 15;
        this.gem5.scaleY = this.gem5.scaleX;
        //place the face on the grid
        this.aGrid.placeAtIndex(4, this.gem5);

        this.gem6 = this.add.image(0, 0, "gem6");
        this.aGrid.placeAt(2,2,this.gem6);
        //scale the face
        this.gem6.displayWidth = game.config.width / 15;
        this.gem6.scaleY = this.gem6.scaleX;
        //place the face on the grid
        this.aGrid.placeAtIndex(23, this.gem6);
    }
    update() {}
}