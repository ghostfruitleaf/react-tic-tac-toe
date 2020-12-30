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
  //   When it is clicked on.
  //   Then pass it into the squares as a callback


  const checkForWinner = () => {

    const winnerX = ['x','x','x'];
    const winnerO = ['o','o','o']
    // [0][0][0][1][0][2], 
    // [1][0][1][1][1][2]
    // [2][0][2][1][2][2]

    // [[1, 2, 3][4, 5, 6][7, 8, 9]]
    const [first, second, third] = squares;
    const singleArraySquare = [...first, ...second, ...third]
    const valueSquares = singleArraySquare.map((square) => console.log(square) )
    console.log(valueSquares);
    // diagonal
    if (squares[0][0].value === squares[1][1].value && squares[2][2].value === squares[0][0].value) {
      if(squares[0][0].value){
        return squares[0][0].value === 'x'  ? 'x' : 'o'
      }
    }
    // const arrays = [...first, ...second, ...third]
    

    //diagonals: 
    // squares[0][0] squares[1][1] squares [2][2]
    // squares[0][2] squares[1][1] squares [2][0]
    
    // Complete in Wave 3
    // You will need to:
    // 1. Go accross each row to see if 
    //    3 squares in the same row match
    //    i.e. same value
    // 2. Go down each column to see if
    //    3 squares in each column match
    // 3. Go across each diagonal to see if 
    //    all three squares have the same value.

  }

  const resetGame = () => {
    // Complete in Wave 4
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is {checkForWinner()}</h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateSquare}/>
      </main>
    </div>
  );
}

export default App;
