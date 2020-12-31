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


  //squares = [[{id: 0, value: ''},{id: 1, value: ''},{id: 2, value: ''}],[{...},{...},{...}],[{...},{...},{...}]]
  // squares[0][1]
  const updateSquare = (id) => {
    // search squares until you find a matching id 
    // update only the field you need 
    // --> update field: 
    // check if square blank !squares[row][col].value
    // if a square is blank: 
    //    if current player uses X = !currentSquare (AKA currentSquare == false) -> update with X

    // boolean variable = this 
    // this == false --> !this
    // this == true --> this 

    //    else if current player uses O = currentSquare ->  update with O
    //    change current player -> setCurrentSquare(!currentSquare)
    // create a copy of squares with the updated square
    // setSquares w/ new copy 
    let newSquares = []; 

    for (let row = 0; row < 3; row += 1) {
      newSquares.push([]); // 
      for (let col = 0; col < 3; col += 1) {
        if (id === squares[row][col].id) {
          if (!squares[row][col].value) {
            if (!currentSquare) { // currentSquare == false ! => false == 
              squares[row][col].value = PLAYER_1; 
            } else { // currentSquare, currentSquare == true
              squares[row][col].value = PLAYER_2; 
            }
            setCurrentSquare(!currentSquare);//set to the next player turn
          }
        } 
        newSquares[row].push(squares[row][col])
      }
    }

    setSquares(newSquares);
  }

  // Wave 2
  // You will need to create a method to change the square 
  //  When it is clicked on.
  //  Then pass it into the squares as a callback

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
    // Complete in Wave 4
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
