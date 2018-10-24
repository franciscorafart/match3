import React, { Component } from 'react';
import funcs from './resources/functions';
import Column from './Column'

class Level extends Component {
    constructor(props){
        super(props);

        this.state = {
            x: 250,
            y: 113,
            columns: 8,
            rows: 8,
            tilewidth: 40,
            tileheight: 40,
            tiles: [],
            selectedtiles:[]
        }

        this.getRandomTile = this.getRandomTile.bind(this)
        this.initLevel = this.initLevel.bind(this)
        this.createLevel = this.createLevel.bind(this)
        this.initializeLevel = this.initializeLevel.bind(this)
        this.getMyColor = this.getMyColor.bind(this)
        this.resolveClusters = this.resolveClusters.bind(this)
        this.findClusters = this.findClusters.bind(this)
        this.shiftTiles = this.shiftTiles.bind(this)
        this.swap = this.swap.bind(this)
        this.findMoves = this.findMoves.bind(this)
        this.addSelected = this.addSelected.bind(this)
    }

    getRandomTile(){
        return Math.floor(Math.random() * funcs.tilecolors.length)
    }

    initLevel(){
        let tiles = []
        for (let i=0; i<this.state.columns;i++){
            tiles[i] = []
            for (let j=0; j<this.state.rows; j++){
                tiles[i][j] = {type: 0, shifter: 0}
            }
        }

        return tiles
    }

    createLevel(tiles){
        let done = false;
        // let tiles = []
        while(!done){
            for (let i=0; i<this.state.columns;i++){
                // let tiles[i]=[]
                for (let j=0; j<this.state.rows; j++){
                    tiles[i][j].type = this.getRandomTile()
                }
            }

            tiles = this.resolveClusters(tiles)
            let moves = this.findMoves(tiles)

            if (moves.length > 0)
                done = true
        }

        return tiles
    }

    initializeLevel(){
        let tiles = this.initLevel()
        tiles = this.createLevel(tiles)

        this.setState({tiles: tiles})
    }

    getMyColor(x,y){
        let type = this.state.tiles[x][y].type
        let color = funcs.tilecolors[type]

        return color
    }

    resolveClusters(tiles){
        let clusters = this.findClusters(tiles)
        let count = 0
        while (clusters.length>0 && count<1000){
            console.log('clusters',clusters, 'count', count)
            tiles = this.removeClusters(tiles, clusters)
            tiles = this.shiftTiles(tiles)
            clusters = this.findClusters(tiles)
            count+=1
        }

        return tiles
    }

    findClusters(tiles){
        //reset
        let clusters = []

        for (let j=0; j<this.state.rows; j++){
            let matchlength = 1;
            for (let i=0; i<this.state.columns;i++){
                let checkcluster = false;

                if (i == this.state.columns-1){
                    checkcluster = true;
                } else {
                    //check type of next tile
                    if (tiles[i][j].type == tiles[i+1][j].type && tiles[i][j].type != -1){
                            //if same type increase matchlength
                            matchlength += 1;
                        } else {
                            //different type
                            checkcluster = true
                        }
                }
                //was there a cluster or end of row?
                if (checkcluster){
                    if (matchlength >= 3){
                        //begining of the row match and the length of it
                        clusters.push({column: i+1-matchlength, row: j, length: matchlength, horizontal: true})
                    }
                    //reset
                    matchlength = 1;
                }
            }
        }

        //Vertical Clusters
        for (let i=0; i<this.state.columns; i++){
            let matchlength = 1;
            for (let j=0; j<this.state.rows; j++){
                let checkcluster = false

                if (j == this.state.rows-1){
                    checkcluster = true;
                } else {
                    if (tiles[i][j].type == tiles[i][j+1].type && tiles[i][j].type != -1){
                        matchlength+=1;
                    } else{
                        checkcluster=true;
                    }
                }

                if (checkcluster){
                    if (matchlength>=3){
                        //Found Vertical cluster
                        clusters.push({column: i, row:j+1-matchlength, length: matchlength, horizontal: false})
                    }
                    matchlength = 1;
                }
            }
        }

        return clusters
    }

    removeClusters(tiles, cluster){
        //Loop Clusters
        for (let z=0;z<cluster.length; z++){
            let c = cluster[z]

            if (c.horizontal == true){
                let y = c.row
                for (let x=c.column; x<c.column+c.length; x++){
                    tiles[y][x].type = -1
                }
            } else {
                let x = c.column
                for (let y=c.row; y<c.row+c.length; y++){
                    tiles[y][x].type = -1
                }
            }
        }

        //Remove Clusters
        for (let i=0; i<this.state.columns; i++){
            let shift = 0;
            for (let j=this.state.rows-1; j>=0; j--){
                if (tiles[i][j].type == -1){
                    shift ++;
                    tiles[i][j].shifter = 0;
                } else {
                    tiles[i][j].shifter = shift
                }
            }
        }

        //TODO: sould I do here or pass as a result?
        // this.setState({tiles: tiles})
        return tiles
    }

    shiftTiles(tiles){
        for (let i=0; i<this.state.columns; i++) {
            for (let j=this.state.rows-1; j>=0; j--){
                if (tiles[i][j].type == -1){
                    tiles[i][j].type = this.getRandomTile();
                } else {
                    let shift = tiles[i][j].shifter;
                    if (shift > 0){
                        tiles = this.swap(i,j,i,j+shift, tiles)
                    }
                }

                //Reset shift
                tiles[i][j].shifter = 0;
            }
        }
        return tiles
    }

    //swap to tiles in the level
    swap(x1, y1, x2, y2, tiles){
        let typeswap = tiles[x1][y1].type;
        tiles[x1][y1].type = tiles[x2][y2].type
        tiles[x2][y2].type = typeswap;

        return tiles
    }

    findMoves(tiles){
        //reset

        let moves = []
        let clusters = []
        //check horizontal swaps
        for (let j=0; j<this.state.rows; j++){
            for (let i=0; i<this.state.columns-1; i++){
                //swap, find cluster and swap back
                tiles = this.swap(i, j, i+1, j, tiles);
                clusters = this.findClusters(tiles)
                tiles = this.swap(i, j, i+1, j, tiles);

                //check if swap made cluster
                if (clusters.length > 0){
                    moves.push({column1: i, row1: j, column2: i+1, row2: j});
                }
            }
        }
        // clusters = []
        //check vertical swaps and moves
        for (let i=0; i<this.state.rows; i++){
            for (var j=0; j<this.state.columns-1; j++){
                //swap, find clusters and swap back
                tiles = this.swap(i,j,i,j+1, tiles);
                clusters = this.findClusters(tiles);
                tiles = this.swap(i, j, i, j+1, tiles);

                //Check if swap made cluster
                if (clusters.length > 0){
                    //found move
                    moves.push({column1: i, row1: j, column2: i, row2: j+1})
                }
            }
        }
        return moves
    }

    addSelected(col, row, addBool){
        console.log('col: ', col, 'row: ', row, 'addBool: ', addBool)

        let all_selected = this.state.selectedtiles.slice() //new copy of array
        let selectedCount = all_selected.length
        console.log('selectedCount in Level.js: ',selectedCount)
        let selected = {column:col,row:row}

        if (addBool && selectedCount<2){
            all_selected.push(selected)
        } else if (!addBool && selectedCount>0){
            for (let i=0; i<selectedCount; i++){
                console.log('i: ',i)
                if (this.state.selectedtiles[i].column===col && this.state.selectedtiles[i].row===row)
                    all_selected.splice(i,1)
            }
        }

        this.setState({selectedtiles: all_selected})
    }

    render() {
        // console.log('this.state.tiles', this.state.tiles)
        console.log('selected: ',this.state.selectedtiles)

        let divStyle = {
            width: this.state.columns*this.state.tilewidth,
            height: this.state.rows*this.state.tileheight,
            border: '1px solid black',
        }

        return (
            <div>
                <button onClick={this.initializeLevel}>Init Level</button>
                <div
                    className="level"
                    style={divStyle}
                >
                    {
                        this.state.tiles.map(
                            (column, idx) => <Column
                                column={column}
                                colNum={idx}
                                tilewidth={this.state.tilewidth}
                                tileheight={this.state.tileheight}
                                getMyColor={this.getMyColor}
                                key={idx}
                                addSelected={this.addSelected}
                                selectedCount={this.state.selectedtiles.length}
                            />
                        )
                    }
                </div>
            </div>

        );
  }
}

export default Level;
