import React, { Component } from 'react'
import Rows from './Rows'

class Board extends Component {

    state = {
        width: 0,
        height: 0,
        gameboard: [],
        gameStatus: "Not Started",
        minesRemaining: 0,
        mines: 0
    }

    createRows = (board) => {
        let i = 0
        return board.map(row => {
            i++
            return (
                <Rows
                    key = { i }
                    rowContents = { row }
                    guessAction = { this.clickHandler }
                />
            )
        })
    }

    clickHandler = (x, y) => {
        let updatedGameboard = this.state.gameboard
        if(this.state.gameboard[x][y].isMine){
            // this.revealBoard()
            alert("Game Over")
        } else if (this.state.gameboard[x][y].isEmpty){
            updatedGameboard = this.discover(x, y, updatedGameboard)
            console.log(updatedGameboard)
        }
    }

    discover = (x, y, board) => {
        const surroundingCells = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
        
        surroundingCells.map(adjacentCell => {
            return [adjacentCell[0] + x, adjacentCell[1] + y]
        }).filter(validCell => {
            return validCell[0] > -1 && validCell[1] > -1 && validCell[0] < this.state.width && validCell[1] < this.state.height
        }).map(targetCell => {
            let neighbor = board[targetCell[0]][targetCell[1]]
            if(!neighbor.isRevealed && (neighbor.isEmpty || !neighbor.isMine)){
                neighbor.isRevealed = true
                if(neighbor.isEmpty){
                    this.discover(neighbor.x, neighbor.y, board)
                }
            }
        })
        return board
    }


    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.gameboard !== prevState.gameboard){
            return({ 
                height: nextProps.boardHeight,
                width: nextProps.boardWidth,
                gameboard: nextProps.gameboard,
                gameStatus: nextProps.gameStatus,
                minesRemaining: nextProps.minesRemaining,
                mines: 0
            })
       }
       else return null
     }
     
    //  componentDidUpdate(prevProps, prevState) {
    //    if(prevProps.someValue!==this.props.someValue){
    //      //Perform some operation here
    //      this.setState({someState: someValue});
    //      this.classMethod();
    //    }
    //  }

    render(){
        return(
            <div id="grid">
                {this.createRows( this.state.gameboard )}
            </div>
        )
    }
}

export default Board