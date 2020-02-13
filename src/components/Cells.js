import React, { Component } from 'react'

class Cells extends Component {

    renderCells = () => {
        if (this.props.cell.isMine){
            return "💣"
        } else if (this.props.cell.minesAdjacent === 0){
            return null
        } else {
            return this.props.cell.minesAdjacent
        }
    }

    render(){
        let styling = "cell" + (this.props.cell.isRevealed ? "" : "-hidden")
        
        return (
            <div className={styling} onClick={ this.props.guessAction }>
                {this.renderCells()}
            </div>
        )
    }  
}

export default Cells