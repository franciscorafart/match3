import React, { Component } from 'react';
import { List } from 'immutable';

import { StyledColumn } from '../styles/components/Level'
import Tile from './Tile'
import { getMyColor } from '../resources/functions';

import { initGameAction, initGame } from '../redux/actions';
import { connect } from 'react-redux';

class Level extends Component {
  state = {
    x: 250,
    y: 113,
    columns: 8,
    rows: 8,
    tileWidth: 40,
    tileHeight: 40,
    tiles: List([]),
    solved: false
  }
  componentDidUpdate(){
    //TODO: check from array of states returnes if its solved, if not animate
  }

  render(){
    //re-render
    let divStyle = {
      width: this.props.columns*this.props.tileWidth,
      height: this.props.rows*this.props.tileHeight,
      border: '1px solid black',
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
              <StyledColumn>
                {
                  column.map(
                    (row, rowIdx) =>
                      <Tile
                        tileWidth={this.props.tileWidth}
                        tileHeight={this.props.tileHeight}
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
              </StyledColumn>
            )
          }
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  const { initGame } = state;
  const { tiles, tileWidth, tileHeight, columns, rows, solved } = initGame;

  return {
    tiles,
    tileWidth,
    tileHeight,
    columns,
    rows,
    solved
  }
}

export default connect(
  mapStateToProps, //this is the mapStateToProps argument
  { initGameAction }
)(Level);
