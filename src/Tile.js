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
    componentDidUpdate(){
        console.log('TileUpdated')

    }

    selected(e){
        let selectedPrevious = this.state.selected

        if (this.props.selectedCount<2){
            if(!selectedPrevious){//if user selected
                this.setState({selected: !selectedPrevious})
                this.props.addSelected(this.props.col, this.props.row, true)
            } else {
                this.setState({selected: !selectedPrevious})
                this.props.addSelected(this.props.col, this.props.row, false)
            }

        } else {
            if (selectedPrevious){
                this.setState({selected: !selectedPrevious})
                this.props.addSelected(this.props.col, this.props.row, false)
            } else {
                console.log('Only 2 selections allowed!')
            }
        }

    }

    render() {
        let border = '1px solid black';
        if (this.state.selected)
            border = '1px solid red'

        let divStyle = {
            width: this.props.tilewidth-2,
            height: this.props.tileheight-2,
            border: border,
            display: 'block',
            background: "rgb("+this.state.red+","+this.state.green+","+this.state.blue+")",
        }
        return (
            <div className="tile" style={divStyle} onClick={this.selected}>

            </div>
        );
  }
}

export default Tile;
