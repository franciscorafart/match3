import React, { Component } from 'react';
import funcs from './resources/functions';
import Tile from './Tile'

class Column extends Component {
    constructor(props){
        super(props);

    }

    render() {
        let divStyle = {
            float: 'left'
        }

        return (
            <div>
                <div
                    className="colum"
                    style={divStyle}
                >
                    {
                        this.props.column.map(
                            (row, idx) =>
                                <Tile
                                    tilewidth={this.props.tilewidth}
                                    tileheight={this.props.tileheight}
                                    col={this.props.colNum}
                                    row={idx}
                                    getMyColor={this.props.getMyColor}
                                    key={idx}
                                    addSelected={this.props.addSelected}
                                    selectedCount={this.props.selectedCount}
                                />
                        )
                    }
                </div>
            </div>

        );
  }
}

export default Column;
