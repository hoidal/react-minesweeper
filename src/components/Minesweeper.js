import React, { Component } from 'react'
import Board from './Board'

class Minesweeper extends Component {

    state = {
        boardWidth: 10,
        boardHeight: 10,
        mines: 10,
        gameboard: []
    }

    setDifficulty = (event) => {
        if (event.target.value === "easy"){
            this.setState({
                boardHeight: 10,
                boardWidth: 10,
                mines: 10,
                gameboard: this.initializeBoard(10, 10, 10)
            })
        } else if (event.target.value === "intermediate"){
            this.setState({
                boardHeight: 16,
                boardWidth: 16,
                mines: 40,
                gameboard: this.initializeBoard(16, 16, 40)
            })
        } else if (event.target.value === "expert"){
            this.setState({
                boardHeight: 16,
                boardWidth: 30,
                mines: 99,
                gameboard: this.initializeBoard(30, 16, 99)
            })
        }
    }

    initializeBoard = (boardHeight, boardWidth, mines) => {
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

    setMines = (board, boardHeight, boardWidth, mines) => {
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
    
    getNumMinesAdjacent = (board, boardHeight, boardWidth) => {
        const surroundingCells = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

        board.map((row, rowIndex) => {
            row.map((column, columnIndex) => {
                if(board[rowIndex][columnIndex].isMine){
                    surroundingCells.map(adjacentCell => {
                        let neighbor = [rowIndex + adjacentCell[0], columnIndex + adjacentCell[1]]
                        if((neighbor[0] > -1 && neighbor[0] < boardWidth) && (neighbor[1] > -1 && neighbor[1] < boardHeight)){
                            if(!board[neighbor[0]][neighbor[1]].isMine){
                                board[neighbor[0]][neighbor[1]].minesAdjacent += 1
                            }
                        }
                    })
                }
            })
        })
        return board
    }

    getEmptyCells = (board) => {
        board.map((row, rowIndex) => {
            row.map((column, columnIndex) => {
                if((!board[rowIndex][columnIndex].isMine) && (board[rowIndex][columnIndex].minesAdjacent === 0)){
                    board[rowIndex][columnIndex].isEmpty = true
                }
            })
        })
        return board
    }

    componentDidMount = () => {
        this.setState({
            gameboard: this.initializeBoard(this.state.boardHeight, this.state.boardWidth, this.state.mines)
        })
    }

    render(){
        return(
            <div id="minesweeper-board">
                <div id="menu">
                    <h1 id="title">Minesweeper</h1>
                    <div id="difficulty-selector">
                        <label>Select Difficulty:</label>
                        <select id="difficulty" onChange={ this.setDifficulty }>
                            <option id="easy" value="easy">Easy</option>
                            <option id="intermediate" value="intermediate">Intermediate</option>
                            <option id="expert" value="expert">Expert</option>
                        </select>
                    </div>
                </div>

                <div id="board">
                    <Board 
                        mines={ this.state.mines }
                        gameboard={ this.state.gameboard }
                        width={ this.state.boardWidth }
                        height={ this.state.boardHeight }
                        minesRemaining={ this.state.mines }
                    />
                </div>
            </div>
        )
    }
}

export default Minesweeper