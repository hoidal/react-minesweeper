import React, { Component } from 'react'
import Board from './Board'

class Minesweeper extends Component {

    state = {
        boardWidth: 10,
        boardHeight: 10,
        mines: 10
    }

    setDifficulty = (event) => {
        if(event.target.value === "easy"){
            this.setState({
                boardWidth: 10,
                boardHeight: 10,
                mines: 10
            })
        } else if(event.target.value === "intermediate"){
            this.setState({
                boardWidth: 16,
                boardHeight: 16,
                mines: 40
            })
        } else if(event.target.value === "expert"){
            this.setState({
                boardWidth: 16,
                boardHeight: 30,
                mines: 99
            })
        }
    }

    render(){
        return(
            <div id="minesweeper-board">
                <div id="menu">
                    <h1>Minesweeper</h1>
                    <select id="difficulty" onChange={this.setDifficulty}>
                        <option id="easy" value="easy">Easy</option>
                        <option id="intermediate" value="intermediate">Intermediate</option>
                        <option id="expert" value="expert">Expert</option>
                    </select>
                    <button>Start</button>
                </div>

                <div>
                    <Board 
                        boardHeight={ this.state.boardHeight }
                        boardWidth={ this.state.boardWidth }
                        mines={ this.state.mines }
                    />
                </div>
            </div>
        )
    }
}

export default Minesweeper