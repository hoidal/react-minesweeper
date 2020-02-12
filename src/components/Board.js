import React, { Component } from 'react'
import Cells from './Cells'

class Board extends Component {
   
    initializeBoard(boardHeight, boardWidth, mines){
        let board = []
        for(let x = 0; x < boardWidth; x++){
            board.push([])
            for (let y = 0; y < boardHeight; y++){
                board[x][y] = {
                    x,
                    y,
                    minesAdjacent: 0,
                    isMine: false,
                    isEmpty: false,
                    isRevealed: false,
                    isFlagged: false
                }
            }
        }
        board = this.setMines(board, boardHeight, boardWidth, mines)
        board = this.getNumMinesAdjacent(board, boardHeight, boardWidth)
        board = this.getEmptyCells(board)
        return board
    }

    setMines(board, boardHeight, boardWidth, mines){
        let minesPlaced = 0
        while(minesPlaced < mines){
            let mineCoordinateX = this.randomizeXCoordinate(boardWidth)
            let mineCoordinateY = this.randomizeYCoordinate(boardHeight)
            if(!board[mineCoordinateX][mineCoordinateY].isMine){
                board[mineCoordinateX][mineCoordinateY].isMine = true
                minesPlaced++
            }
        }
        return board
    }

    randomizeXCoordinate = width => Math.floor(Math.random() * width)
    randomizeYCoordinate = height => Math.floor(Math.random() * height)
    
    getNumMinesAdjacent(board, boardHeight, boardWidth){
        const surroundingCells = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

        board.map((row, rowIndex) => {
            row.map((column, columnIndex) => {
                if(board[rowIndex][columnIndex].isMine === true){
                    surroundingCells.map(adjacentCell => {
                        let neighbor = [rowIndex + adjacentCell[0], columnIndex + adjacentCell[1]]
                        if((neighbor[0] > -1 && neighbor[0] < boardWidth - 1) && (neighbor[1] > -1 && neighbor[1] < boardHeight - 1)){
                            if(board[neighbor[0]][neighbor[1]].isMine === false){
                                board[neighbor[0]][neighbor[1]].minesAdjacent += 1
                            }
                        }
                    })
                }
            })
        })
        return board
    }

    getEmptyCells(board){
        board.map((row, rowIndex) => {
            row.map((column, columnIndex) => {
                if((board[rowIndex][columnIndex].isMine === false) && (board[rowIndex][columnIndex].minesAdjacent === 0)){
                    board[rowIndex][columnIndex].isEmpty = true
                }
            })
        })
        return board
    }

    createBoard(board){
        let i = 0
        return board.map((row, rowIndex) => {
            return row.map((column, columnIndex) => {
                i++
                let info = board[rowIndex][columnIndex]
                return (
                    <Cells
                        key = { i }
                        cellData = { info }
                    />
                )
            })
        })
    }

    render(){
        // console.log(this.initializeBoard(this.props.boardHeight, this.props.boardWidth, this.props.mines))
        // console.log(this.createBoard(this.initializeBoard(this.props.boardHeight, this.props.boardWidth, this.props.mines)))
        return(
            <div className="board">
                {this.createBoard(this.initializeBoard(this.props.boardHeight, this.props.boardWidth, this.props.mines))}
            </div>
        )
    }
}

export default Board