import React, { Component } from 'react'

class Cells extends Component {

    renderCells = () => {
        if (!this.props.cell.isRevealed){
            return this.props.cell.isFlagged ? "🚩" : null
        }
        if (this.props.cell.isMine){
            return "💣"
        } else if (this.props.cell.minesAdjacent === 0){
            return null
        } else {
            return this.props.cell.minesAdjacent
        }
    }

    render(){
        let styling = ("cell" + 
            (this.props.cell.isRevealed ? "" : "-hidden") + 
            (this.props.cell.isFlagged && !this.props.cell.isRevealed ? "-flagged" : "") + 
            (this.props.cell.isRevealed && this.props.cell.minesAdjacent === 1 ? "-blue" : "") + 
            (this.props.cell.isRevealed && this.props.cell.minesAdjacent === 2 ? "-green" : "") + 
            (this.props.cell.isRevealed && this.props.cell.minesAdjacent === 3 ? "-red" : "") +
            (this.props.cell.isRevealed && this.props.cell.minesAdjacent === 4 ? "-navy" : "") +
            (this.props.cell.isRevealed && this.props.cell.minesAdjacent === 5 ? "-burgandy" : "") + 
            (this.props.cell.isRevealed && this.props.cell.minesAdjacent === 6 ? "-black" : "")
            )
        
        return (
            <div className={ styling } onClick={ this.props.guessAction } onContextMenu={ this.props.flagAction }>
                {this.renderCells()}
            </div>
        )
    }  
}

export default Cells