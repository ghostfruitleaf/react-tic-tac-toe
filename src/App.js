import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
}

const App = () => {

  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  const [currentSquare, setCurrentSquare] = useState(false); // false = X 

  const updateSquare = (id) => {
  
    let newSquares = []; 

    for (let row = 0; row < 3; row += 1) {
      newSquares.push([]); // 
      for (let col = 0; col < 3; col += 1) {
        if (id === squares[row][col].id) {
          if (!squares[row][col].value) {
            if (!currentSquare) {
              squares[row][col].value = PLAYER_1; 
            } else { 
              squares[row][col].value = PLAYER_2; 
            }
            setCurrentSquare(!currentSquare);
          }
        } 
        newSquares[row].push(squares[row][col])
      }
    }

    setSquares(newSquares);
  }


  const checkForWinner = () => {

    const WINNING_INDEX = [
      [[0, 0], [0, 1], [0, 2]], 
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];

    let hasBlank = false; // if the square is blank or not

    for (const winSet of WINNING_INDEX) {
      
      const currentRow = []
      for (const winPos of winSet) {
        const [x, y] = winPos;
        if(!squares[x][y].value){
          hasBlank = true; // we don't need to check for blank after since we check it here already
        }
        currentRow.push(squares[x][y].value);  
      }
      if(currentRow[0] && (currentRow[0] === currentRow[1] && currentRow[1] === currentRow[2] && currentRow[0])){ // ['x', 'o', 'x']
        return currentRow[0] === 'x' ? 'x' : 'o';
      }
    }

    return hasBlank ? '' : 'TIED';

  }

  const resetGame = () => {
    setSquares(generateSquares());
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>Winner is {!checkForWinner() ? 'IN-PROGRESS' : checkForWinner()}</h2>
        <button onClick = {resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={checkForWinner() ? () => {} : updateSquare}/> 
      </main>
    </div>
  );
}

export default App;
