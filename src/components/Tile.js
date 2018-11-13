import React, { Component } from 'react';

import { clickTile } from '../redux/actions';
import { connect } from 'react-redux';
import explosion_png from '../resources/explosion.png'

class Tile extends Component {
    constructor(props){
        super(props)
        this.clicked = this.clicked.bind(this)
    }

    componentDidUpdate(){
        console.log('TileUpdated')
    }

    clicked(e){
        this.props.clickTile(
            {
                col: this.props.col,
                row: this.props.row,
                selected: this.props.selected,
            }
        )
    }

    render(){
        console.log('rendering tile')

        let red = this.props.myColor[0]
        let green = this.props.myColor[1]
        let blue = this.props.myColor[2]

        let border = '1px solid black';
        if (this.props.selected)
            border = '1px solid red'
        let explosion = <div></div>

        //explosion img
        if (!this.props.solved && this.props.type == -1){
            let divImgStyle = {
                height: this.props.tileheight*1.3+'px',
                width: this.props.tilewidth*1.3+'px',
                display: 'block',
            }
            let imgStyle = {
                height: '100%',
                width: '100%',
                display: 'block',
            }
            explosion = <div style={divImgStyle}><img style={imgStyle} src={explosion_png}/></div>
        }

        let divStyle = {
            width: this.props.tilewidth-2,
            height: this.props.tileheight-2,
            border: border,
            display: 'block',
            background: "rgb("+red+","+green+","+blue+")",
        }


        return (
            <div className="tile" style={divStyle} onClick={this.clicked}>
                {
                    explosion
                }
            </div>
        );
  }
}

export default connect(
    null,
    { clickTile }
)(Tile);
