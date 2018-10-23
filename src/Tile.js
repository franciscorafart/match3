import React, { Component } from 'react';

class Tile extends Component {
    constructor(props){
        super(props)

        this.state = {
            red: 255,
            green: 255,
            blue: 255,
        }
    }

    componentDidMount(){
        let color = this.props.getMyColor(this.props.col, this.props.row)

        this.setState({
            red: color[0],
            green: color[1],
            blue: color[2]
        })
    }

    render() {
        let divStyle = {
            width: this.props.tilewidth-2,
            height: this.props.tileheight-2,
            border: '1px solid red',
            display: 'block',
            background: "rgb("+this.state.red+","+this.state.green+","+this.state.blue+")",
        }
        return (
            <div className="tile" style={divStyle}>

            </div>
        );
  }
}

export default Tile;
