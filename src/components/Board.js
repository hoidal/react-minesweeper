import React, { Component } from 'react'
import Rows from './Rows'

class Board extends Component {

    state = {
        width: 0,
        height: 0,
        gameboard: [],
        mines: 0,
        minesRemaining: 0,
        gameStatus: "Not Started"
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

    clickHandler = (event, x, y) => {
        let updatedGameboard = this.state.gameboard

        if(this.state.gameStatus = "Not Started"){
            document.getElementById("difficulty-selector").style.display = "none"
            this.setState({ 
                gameStatus: "Playing"
            })
        }

        if(this.state.gameboard[x][y].isMine){
            this.setState({ gameStatus: "Game Over" })
            alert("Game Over")
            this.answerBoard()
            event.target.id = "losing-mine"
        } else if (this.state.gameboard[x][y].isEmpty){
            updatedGameboard = this.discover(x, y, updatedGameboard)
        } else if (this.state.gameboard[x][y].minesAdjacent > 0){
            updatedGameboard[x][y].isRevealed = true
        }
        this.setState({ gameboard: updatedGameboard })
    }

    flagHandler = (event, x, y) => {
        event.preventDefault()
        let mineCount = this.state.minesRemaining
        let updatedGameboard = this.state.gameboard
        if(updatedGameboard[x][y].isFlagged){
            updatedGameboard[x][y].isFlagged = false
            event.target.className = "cell-hidden"
        }
        if(!updatedGameboard[x][y].isFlagged){
            updatedGameboard[x][y].isFlagged = true
            if(updatedGameboard[x][y].isMine){
                mineCount--
            }
        }
        if(mineCount === 0){
            this.setState({ gameStatus: "You Win!!" })
            document.getElementById("mines-remaining").style.display = "none"
            this.answerBoard()
        }
        this.setState({ 
            gameboard: updatedGameboard,
            minesRemaining: mineCount
         })
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
                mines: nextProps.mines,
                minesRemaining: nextProps.minesRemaining
            })
        }
        else return null
    }

    render(){
        return(
            <div id="grid">
                <div id="game-status-menu">
                    <h4>Status: {this.state.gameStatus}</h4>
                    <h4 id="mines-remaining">Mines Remaining: {this.state.minesRemaining}</h4>
                </div>
                {this.createRows( this.props.gameboard )}
            </div>
        )
    }
}

export default Board