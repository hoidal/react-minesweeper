import React, { Component } from 'react'
import Cells from './Cells'

class Rows extends Component {

    cellRows = () => {
        let i = 0
        let row = this.props.rowContents
        return row.map(cell => {
            i++
            return (
                <Cells
                    key = { i }
                    cell = { cell }
                    guessAction = { () => this.props.guessAction(cell.x, cell.y) }
                />
            )
        })
    }

   render(){
        return(
            <div className="cell-row">
                {this.cellRows()}
            </div>
        ) 
   }
}

export default Rows