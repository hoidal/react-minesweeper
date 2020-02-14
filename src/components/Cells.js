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
            (this.props.cell.isRevaled && this.props.cell.minesAdjacent === 1 ? "-blue" : "")
            )
        
        return (
            <div className={ styling } onClick={ this.props.guessAction } onContextMenu={ this.props.flagAction }>
                {this.renderCells()}
            </div>
        )
    }  
}

export default Cells