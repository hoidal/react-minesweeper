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
                    guessAction = { (event) => this.props.guessAction(event, cell.x, cell.y) }
                    flagAction = { (event) => this.props.flagAction(event, cell.x, cell.y) }
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