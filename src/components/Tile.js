import React, { Component } from 'react';

import { clickTile } from '../redux/actions'
import { connect } from 'react-redux';

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
                selected: this.props.selected
            }
        )

        // console.log('selected', this.props.selected)
        // let selectedPrevious = this.props.selected
        //
        // if(!selectedPrevious){//if user selected
        //         this.props.addSelected(this.props.col, this.props.row, true)
        //     } else {
        //         this.props.addSelected(this.props.col, this.props.row, false)
        //     }
    }

    render(){
        console.log('rendering tile')

        let red = this.props.myColor[0]
        let green = this.props.myColor[1]
        let blue = this.props.myColor[2]

        let border = '1px solid black';
        if (this.props.selected)
            border = '1px solid red'

        let divStyle = {
            width: this.props.tilewidth-2,
            height: this.props.tileheight-2,
            border: border,
            display: 'block',
            background: "rgb("+red+","+green+","+blue+")",
        }
        return (
            <div className="tile" style={divStyle} onClick={this.clicked}>

            </div>
        );
  }
}

// const mapStateToProps = (state) => {
//     console.log('state in Tile.js', state)
//     const { playGame } = state
//     const
// }

export default connect(
    null,
    { clickTile }
)(Tile);
