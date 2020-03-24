# React Minesweeper
A re-creation of the classic computer game, Minesweeper, built in React.

## Play React Minesweeper
Click to play: [React Minesweeper](https://react-minesweeper-99605.firebaseapp.com)

<img src="https://user-images.githubusercontent.com/55669941/77474603-03f7e880-6ddd-11ea-95ba-01557e391505.png" width="500" />

***
#### How to Play
- Start by selecting a difficulty level.
- After selecting a difficulty level, the board will be randomly populated with a set number of mines (10, 40, or 99 based on difficulty). The board will have all cells hidden with the goal of flagging every mine without blowing up.
- Simply click on any square to start the game, and reveal that selected cell. If empty, all neighboring empty cells will also reveal. If adjacent to a mine, the number on the revealed cell will indicate how many mines that cell is touching. If you open mine, you lose.
- Right click (Ctrl + click) to mark squares you suspect to be a mine. You can also unflag via the same action on any flagged cell.
- If you flag all mines, you win. If you open a cell that is a mine, you lose. Simple as that.
