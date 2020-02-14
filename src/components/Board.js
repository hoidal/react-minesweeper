import React, { Component } from 'react'
import Rows from './Rows'

class Board extends Component {

    state = {
        width: 0,
        height: 0,
        gameboard: [],
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
                    flagAction = { this.flagHandler }
                />
            )
        })
    }

    clickHandler = (x, y) => {
        let updatedGameboard = this.state.gameboard

        if(this.state.gameboard[x][y].isMine){
            alert("Game Over")
            this.answerBoard()
        } else if (this.state.gameboard[x][y].isEmpty){
            updatedGameboard = this.discover(x, y, updatedGameboard)
        } else if (this.state.gameboard[x][y].minesAdjacent > 0){
            updatedGameboard[x][y].isRevealed = true
        }
        this.setState({ gameboard: updatedGameboard })
    }

    flagHandler = (event, x, y) => {
        event.preventDefault()
        let updatedGameboard = this.state.gameboard
        if(updatedGameboard[x][y].isFlagged){
            updatedGameboard[x][y].isFlagged = false
        }
        if(!updatedGameboard[x][y].isFlagged){
            updatedGameboard[x][y].isFlagged = true
        }
        this.setState({ gameboard: updatedGameboard })
    }

    discover = (x, y, board) => {
        const surroundingCells = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
        
        surroundingCells.map(cell => {
            return [cell[0] + x, cell[1] + y]
        }).filter(cell => {
            return cell[0] > -1
        }).filter(cell => {
            return cell[0] < this.props.height
        }).filter(cell => {
            return cell[1] > -1 
        }).filter(cell => {
            return cell[1] < this.props.width
        }).map(neighbor => {
            return board[neighbor[0]][neighbor[1]]
        }).map(neighbor => {
            if(!neighbor.isRevealed && (neighbor.isEmpty || !neighbor.isMine)){
                neighbor.isRevealed = true
                if(neighbor.isEmpty){
                    this.discover(neighbor.x, neighbor.y, board)
                }
            }
        })
        return board
    }

    answerBoard = () => {
        let answerboard = this.state.gameboard
        answerboard.map(row => {
            return row.map(cell => {
                return cell.isRevealed = true
            })
        })
        return answerboard
    }


    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.gameboard !== prevState.gameboard){
            return({ 
                height: nextProps.height,
                width: nextProps.width,
                gameboard: nextProps.gameboard,
                mines: nextProps.mines
            })
        }
        else return null
    }

    render(){
        return(
            <div id="grid">
                {this.createRows( this.props.gameboard )}
            </div>
        )
    }
}

export default Board