import React, { Component } from 'react';
import { getMyColor } from '../resources/functions';
import Tile from './Tile'

import { initGameAction, initGame } from '../redux/actions';
import { connect } from 'react-redux';

class Level extends Component {
    componentDidUpdate(){
        //TODO: check from array of states returnes if its solved, if not animate
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
                <button onClick={() => this.props.initGameAction()}>Init Level</button>
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
                                                selected ={row.selected}
                                                solved={this.props.solved}
                                                type={row.type}
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

const mapStateToProps = (state) => {
    const { initGame } = state
    const { tiles, tilewidth, tileheight, columns, rows, solved } = initGame;

    return {
        tiles: tiles,
        tilewidth: tilewidth,
        tileheight:tileheight,
        columns: columns,
        rows: rows,
        solved: solved
    }
}

export default connect(
    mapStateToProps, //this is the mapStateToProps argument
    { initGameAction }
)(Level);
