import React, { Component } from 'react';
import funcs from './resources/functions';
import Tile from './Tile'
import {List, Map} from 'immutable';

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
            tiles: List([]),
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
        this.playMove = this.playMove.bind(this)
        this.isValidMove = this.isValidMove.bind(this)
        this.countSelected = this.countSelected.bind(this)
        this.resetAllSelected = this.resetAllSelected.bind(this)
        this.printTiles = this.printTiles.bind(this)

        this.secTls = []
    }

    componentDidUpdate(){
        // console.log('component updated')
    }

    getRandomTile(){
        return Math.floor(Math.random() * funcs.tilecolors.length)
    }

    initLevel(){
        let tiles = List([])

        for (let i=0; i<this.state.columns;i++){
            tiles = tiles.set(i, List([]))
            for (let j=0; j<this.state.rows; j++){
                tiles = tiles.setIn([i,j], Map({type: 0, shifter: 0, selected:false}))
            }
        }

        return tiles
    }

    createLevel(tiles){
        let done = false;
        let locTiles = tiles
        let countCreateLevel = 0

        while(!done){
            //Note:reset locTiles?
            locTiles = tiles

            // console.log('countCreateLevel: ', countCreateLevel)

            for (let i=0; i<this.state.columns;i++){
                for (let j=0; j<this.state.rows; j++){
                    locTiles = locTiles.setIn([i,j,'type'], this.getRandomTile())
                }
            }
            locTiles = this.resolveClusters(locTiles)
            let moves = this.findMoves(locTiles)

            if (moves.length > 0){
                done = true
            }
            countCreateLevel++
        }

        return locTiles
    }

    initializeLevel(){
        let tiles = this.initLevel()
        tiles= this.createLevel(tiles)

        this.setState({tiles: tiles})
    }

    getMyColor(x,y){
        let tiles = this.state.tiles
        let type = tiles.getIn([x,y,'type'])
        let color = funcs.tilecolors[type]

        return color
    }

    resolveClusters(tiles){
        let locTiles = tiles
        let clusters = this.findClusters(locTiles)

        let count = 0

        while (clusters.length>0){
            locTiles = this.removeClusters(locTiles, clusters)
            locTiles = this.shiftTiles(locTiles)
            clusters = this.findClusters(locTiles)
            count+=1
        }
        // console.log('Clean Tiles',locTiles, 'count', count)
        return locTiles
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
                    if (tiles.getIn([i,j,'type']) == tiles.getIn([i+1,j,'type']) && tiles.getIn([i, j, 'type'])!= -1){
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
                    if (tiles.getIn([i,j,'type']) == tiles.getIn([i,j+1,'type']) && tiles.getIn([i,j,'type']) != -1){
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

        // console.log('clusters', clusters)
        return clusters
    }

    removeClusters(tiles, cluster){
        let locTiles = tiles
        //Loop Clusters //NOTE: loop not working
        for (let z=0;z<cluster.length; z++){
            let c = cluster[z]
            if (c.horizontal == true){
                let y = c.row
                for (let x=c.column; x<c.column+c.length; x++){
                    locTiles = locTiles.setIn([x,y,'type'], -1)
                }
            } else {
                let x = c.column
                for (let y=c.row; y<c.row+c.length; y++){
                    locTiles = locTiles.setIn([x,y,'type'], -1)
                }
            }
        }
        // this.printTiles('remove Cluster Tiles loop',locTiles)

        //Remove Clusters
        for (let i=0; i<this.state.columns; i++){
            let shift = 0;
            for (let j=this.state.rows-1; j>=0; j--){
                if (locTiles.getIn([i,j,'type']) == -1){
                    shift ++;
                    locTiles = locTiles.setIn([i,j, 'shifter'], 0)
                } else {
                    locTiles = locTiles.setIn([i,j, 'shifter'], shift)
                }
            }
        }

        return locTiles
    }

    shiftTiles(tiles){

        let locTiles = tiles

        for (let i=0; i<this.state.columns; i++) {
            for (let j=this.state.rows-1; j>=0; j--){
                if (locTiles.getIn([i,j,'type']) == -1){
                    locTiles = locTiles.setIn([i,j,'type'], this.getRandomTile())
                } else {
                    let shift = locTiles.getIn([i,j,'shifter'])
                    if (shift > 0){
                        locTiles = this.swap(i,j,i,j+shift, locTiles)
                    }
                }

                //Reset shift
                locTiles = locTiles.setIn([i,j,'shifter'], 0)
            }
        }
        return locTiles
    }

    //swap to tiles in the level
    swap(x1, y1, x2, y2, tiles){
        let tilescp = tiles
        let typeswap = tilescp.getIn([x1, y1, 'type']);

        let tilecp2Type = tilescp.getIn([x2, y2, 'type']);

        tilescp = tilescp.setIn([x1,y1,'type'], tilecp2Type);

        tilescp = tilescp.setIn([x2,y2,'type'], typeswap);

        return tilescp
    }

    findMoves(tiles){
        let locTiles = tiles

        let moves = []
        let clusters = []
        //check horizontal swaps
        for (let j=0; j<this.state.rows; j++){
            for (let i=0; i<this.state.columns-1; i++){
                //swap, find cluster and swap back
                locTiles = this.swap(i, j, i+1, j, locTiles);
                clusters = this.findClusters(locTiles)
                locTiles = this.swap(i, j, i+1, j, locTiles);

                //check if swap made cluster
                if (clusters.length > 0){
                    moves.push({column1: i, row1: j, column2: i+1, row2: j});
                }
            }
        }

        //check vertical swaps and moves
        for (let i=0; i<this.state.columns; i++){
            for (var j=0; j<this.state.rows-1; j++){
                //swap, find clusters and swap back
                locTiles = this.swap(i,j,i,j+1, locTiles);
                clusters = this.findClusters(locTiles);
                locTiles = this.swap(i, j, i, j+1, locTiles);

                //Check if swap made cluster
                if (clusters.length > 0){
                    moves.push({column1: i, row1: j, column2: i, row2: j+1})
                }
            }
        }
        return moves
    }

    addSelected(col, row, addBool){

        let locTiles = this.state.tiles

        locTiles = locTiles.setIn([col,row,'selected'],addBool)

        if (this.countSelected(locTiles) === 2){
            locTiles = this.playMove(locTiles)
        } else {
            // locTiles = this.resetAllSelected(locTiles)
            this.setState({tiles: locTiles})
        }
    }

    playMove(tiles){
        let resolvedTiles = tiles;
            let isValidMove = this.isValidMove(
                this.secTls[0][0],
                this.secTls[0][1],
                this.secTls[1][0],
                this.secTls[1][1],
                resolvedTiles
                )
            if (isValidMove){

                resolvedTiles = this.swap(
                    this.secTls[0][0],
                    this.secTls[0][1],
                    this.secTls[1][0],
                    this.secTls[1][1],
                    resolvedTiles
                )
                resolvedTiles = this.resolveClusters(resolvedTiles)
            }

            //reset all selected if valid or not valid
            resolvedTiles = this.resetAllSelected(resolvedTiles)
            this.setState({tiles: resolvedTiles})
    }

    isValidMove(c1,r1,c2,r2, tiles){
        let locTiles = tiles
        let moves = this.findMoves(locTiles)
        let valid = false

        for (let move of moves){
            if (move.column1 === c1 && move.column2 === c2 && move.row1 === r1 && move.row2 === r2){
                valid = true
                break;
            }
        }
        return valid
    }

    countSelected(tiles){
        let locTiles = tiles
        this.secTls = []
        let count = 0
        for (let y=0;y<this.state.rows; y++){
            for (let x=0; x<this.state.columns; x++){
                if(locTiles.getIn([x, y, 'selected'])){
                    this.secTls.push([x,y])
                    count++
                }
            }
        }
        return count
    }

    resetAllSelected(tiles){
        let locTiles = tiles
        for (let y=0;y<this.state.rows; y++){
            for (let x=0; x<this.state.columns; x++){
                locTiles = locTiles.setIn([x,y,'selected'], false)
            }
        }
        this.secTls = []

        return locTiles
    }

    printTiles(mess, tiles){
        for (let row of tiles.toArray()){
            let localVar = []
            for (let tile of row.toArray()){
                localVar.push(tile.toObject().type)
            }
        }
    }

    render(){
        //re-render
        let divStyle = {
            width: this.state.columns*this.state.tilewidth,
            height: this.state.rows*this.state.tileheight,
            border: '1px solid black',
        }
        let colDivStyle = {
            float: 'left'
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
                            (column, colIdx) =>
                            <div
                                className="colum"
                                style={colDivStyle}
                            >
                                {
                                    column.map(
                                        (row, rowIdx) =>
                                            <Tile
                                                tilewidth={this.state.tilewidth}
                                                tileheight={this.state.tileheight}
                                                col={colIdx}
                                                row={rowIdx}
                                                myColor={this.getMyColor(colIdx, rowIdx)}
                                                key={'('+colIdx+','+rowIdx+')'}
                                                addSelected={this.addSelected}
                                                selected={row.get('selected')}
                                            />
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>

        );
  }
}

export default Level;
