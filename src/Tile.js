import React, { Component } from 'react';

class Tile extends Component {
    constructor(props){
        super(props)

        this.state = {
            selected: false
        }

        this.selected = this.selected.bind(this)
    }

    // componentDidMount(){
    //     // let color = this.props.getMyColor(this.props.col, this.props.row)
    //     let color = this.props.myColor
    //     this.setState({
    //         red: color[0],
    //         green: color[1],
    //         blue: color[2]
    //     })
    // }
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
        console.log('rendering tile')

        let red = this.props.myColor[0]
        let green = this.props.myColor[1]
        let blue = this.props.myColor[2]

        let border = '1px solid black';
        if (this.state.selected)
            border = '1px solid red'

        let divStyle = {
            width: this.props.tilewidth-2,
            height: this.props.tileheight-2,
            border: border,
            display: 'block',
            background: "rgb("+red+","+green+","+blue+")",
        }
        return (
            <div className="tile" style={divStyle} onClick={this.selected}>

            </div>
        );
  }
}

export default Tile;
