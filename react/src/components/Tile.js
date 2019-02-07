import React, { Component } from 'react';

import { clickTileAction } from '../redux/actions';
import { connect } from 'react-redux';
import { StyledTile, StyledExpolsionPng, StyledPng } from '../styles/components/Tile'
import explosionPng from '../images/explosion.png'


class Tile extends Component {
  componentDidUpdate(){
    console.log('TileUpdated')
  }

  clicked = (e) => {
    this.props.clickTileAction(
      {
        col: this.props.col,
        row: this.props.row,
        selected: this.props.selected,
      }
    )
  }

  render(){
    console.log('rendering tile')

    const red = this.props.myColor[0];
    const green = this.props.myColor[1];
    const blue = this.props.myColor[2];
    const border = '1px solid red';

    if (this.props.selected) console.log('selected');

    let explosion = <div></div>;

    //explosion img
    if (!this.props.solved && this.props.type === -1){
      explosion = <StyledPng>
                    <StyledExpolsionPng src={explosionPng}/>
                  </StyledPng>;
    }

    const divStyle = {
      background: "rgb("+red+","+green+","+blue+")",
    }

    return (
      <StyledTile style={divStyle} onClick={this.clicked}>
        {explosion}
      </StyledTile>
    );
  }
}

export default connect(null, { clickTileAction })(Tile);
