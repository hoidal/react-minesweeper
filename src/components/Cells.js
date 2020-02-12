import React, { Component } from 'react'

class Cells extends Component {

    renderCells = () => {
        if (this.props.cellData.isMine){
            return "💣"
        } else if (this.props.cellData.minesAdjacent === 0){
            return null
        } else {
            return this.props.cellData.minesAdjacent
        }
    }

    

    render(){
        return (
            <div>
                {this.renderCells()}
            </div>
        )
    }  
}

export default Cells