import React, { Component } from 'react';

class Tile extends Component {
    constructor(props){
        super(props)

        this.state = {
            red: 255,
            green: 255,
            blue: 255,
            selected: false
        }

        this.selected = this.selected.bind(this)
    }

    componentDidMount(){
        let color = this.props.getMyColor(this.props.col, this.props.row)

        this.setState({
            red: color[0],
            green: color[1],
            blue: color[2]
        })
    }

    selected(e){
        let selectedNow = this.state.selected
        this.setState({selected: !selectedNow})

        //Trigger move function
    }

    render() {
        let background;
        if (this.state.selected)
            background = "rgb("+String(78)+","+String(92)+","+String(11)+")"
        else
            background = "rgb("+this.state.red+","+this.state.green+","+this.state.blue+")"

        let divStyle = {
            width: this.props.tilewidth-2,
            height: this.props.tileheight-2,
            border: '1px solid red',
            display: 'block',
            background: background,
        }
        return (
            <div className="tile" style={divStyle} onClick={this.selected}>

            </div>
        );
  }
}

export default Tile;
