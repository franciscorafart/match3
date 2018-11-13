import React, { Component } from 'react';
import { getMyColor } from '../resources/functions';
import Tile from './Tile'

import { initGame, checkAvailableMoves } from '../redux/actions';

import { connect } from 'react-redux';

class Level extends Component {

    componentDidUpdate(){

        // console.log('checking available moves')
        // setTimeout(this.props.checkAvailableMoves(), 1000)

        console.log('component updated')
    }

    render(){
        //re-render
        let divStyle = {
            width: this.props.columns*this.props.tilewidth,
            height: this.props.rows*this.props.tileheight,
            border: '1px solid black',
        }
        let colDivStyle = {
            float: 'left'
        }

        return (
            <div>
                <button onClick={() => this.props.initGame()}>Init Level</button>
                <button onClick={() => this.props.checkAvailableMoves()}>Next match</button>
                <div
                    className="level"
                    style={divStyle}
                >
                    {
                        this.props.tiles.map(
                            (column, colIdx) =>
                            <div
                                className="colum"
                                style={colDivStyle}
                            >
                                {
                                    column.map(
                                        (row, rowIdx) =>
                                            <Tile
                                                tilewidth={this.props.tilewidth}
                                                tileheight={this.props.tileheight}
                                                col={colIdx}
                                                row={rowIdx}
                                                myColor={getMyColor(colIdx, rowIdx, this.props.tiles)}
                                                key={'('+colIdx+','+rowIdx+')'}
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

//TODO: this state to props
const mapStateToProps = (state) => {
    console.log('state', state)
    const { initGame } = state
    const { tiles, tilewidth, tileheight, columns, rows } = initGame;

    return {
        tiles: tiles,
        tilewidth: tilewidth,
        tileheight:tileheight,
        columns: columns,
        rows: rows
    }
}

export default connect(
    mapStateToProps, //this is the mapStateToProps argument
    { initGame, checkAvailableMoves }
)(Level);
