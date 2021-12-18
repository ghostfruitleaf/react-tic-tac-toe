import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';

// INTRO 
// hello! i was informed that it would be helpful to walk through a solution 
// for react tic tac toe, so i (pauline) have created this branch to walk 
// though the solution we ended up submitting for this project!

// THE REACT + COOKING/BAKING ANALOGY (skip if you don't want/need this)
// okay, so THIS was the project where we came up with this amazing analogy
// for explaining react:
//
// * think of your favorite recipe -- it has ingredients
// you have to put together to make the dish, right? 
//
// * in react, the app is your final dish.
//
// * as such, the components are the ingredients. 
//
//   just like each ingredient has its own variant (ex. using elbow pasta or 
//   spiral pasta for a mac and cheese recipe), each component has their own 
//   "props", whose values are stored in the app state. 
//
// * think of rendering your app like cooking your dish. you may follow the 
//   recipe to the tee, you may swap an ingredient or two, you may add some more 
//   of an ingredient or take something out. but more or less it will 
//   hopefully come out as the final fish.
// 
// * in react, this would be the same as re-rending your app to reflect the 
//   app's current state. what the user sees on the screen as a result of the 
//   app's state is equivalent to the "final dish"
//
// * when you re-render in react, you are "re-cooking the dish," and that is 
//   essentially what useState () is helping you control. 
//
// * if you use an egg to make a cheese omelette, for instance, you can't use 
//   that egg again to make a spinach omelette, because you already used it -- 
//   so you still need to use an egg, but you have to grab a new egg for the
//   spinach omelette. it might be a brown egg, a duck egg, or an animal-free
//   egg substitute, but it will still be serve the purpose of the egg or 
//   egg substitute in your omelette
//
// * similarly, when you update React's app state, you have to re-render ALL the 
//   components along with the information you updated. so in the line: 
// 
//   const [squares, setSquares] = useState(generateSquares());
//
//   useState(generateSquares) informs your app that the first time you render/
//   cook your dish, the 'squares' from const [squares, setSquares], will come 
//   from the output of generateSquares().
//   
//   in turn, squares will tell your App what "kind" of squares you will send 
//   into your Board component: 
// 
//   <Board squares={squares} onClickCallback={checkForWinner() ? () => {} : updateSquare}/>
//   
//   setSquares from const[squares, setSquares] is the function you use to 
//   tell your app to re-render (cook a new batch of your recipe), and it updates
//   your app to re-render with the new squares in your Board component (aka 
//   cook a new batch of your recipe with a variation). 
//
//   this is why setSquares has to regenerate the ENTIRE board, instead of just 
//   needing to update the square that changed
//
//   hopefully this analogy helps someone out with understanding state in React!
//   if i can remember to do it, i'd like to turn this into a medium article, which 
//   will be easier to read.


// SETTING UP FUNCTIONS AND VARIABLES 
// for default variables and functions that do the same thing regardless of 
// the current app state. 

// if i recall, player 1 always started with 'x' and player 2 always started
// with 'o'
const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

// this function generates an array of 3-element arrays of object as below: 
//
// [ [ {id: 0, value: ''}, {id: 0, value: ''}, {id: 0, value: ''} ],
//   [ {id: 0, value: ''}. {id: 0, value: ''}, {id: 0, value: ''} ],
//   [ {id: 0, value: ''}, {id: 0, value: ''}, {id: 0, value: ''} ] ]
//
// in each object: 
//
// {
//    id: <what square this object represents>
//    value: <either 'x' or 'o' depending on which player clicked it>
// }
//
// the ids correspond to a 3x3 square as follows: 
// 
// [ 0, 1, 2 ]
// [ 3, 4, 5 ]
// [ 6, 7, 8 ]
//
// this is used to generate the initial empty "board" before the game starts,
// as well as reset the board to its initial empty "board" state after a game is
// finished. 
// 
const generateSquares = () => {
  // start with an empty array
  const squares = [];

  // for consistency with javascript being 0-indexed
  let currentId = 0;

  // the outer loop will add each row of squares
  for (let row = 0; row < 3; row += 1) {
    squares.push([]);

    // within each row, the inner loop to add the individual "squares"
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1; // only updates after adding a single square
    }
  }

  return squares;
}

// THE APP FUNCTION ITSELF 
// where the app maintains its state and figures out what to render
const App = () => {
  // the line below takes a variable, "squares", that represents the 3x3
  // grid of squares the Board component will use to check who has selected 
  // what square. 
  //
  // "setSquares" defines the function that will take the current
  // value of the squares variable and update the app's state. 
  //
  // "useState" informs
  // that the initial state of squares will come from the output of 
  // generateSquares()
  const [squares, setSquares] = useState(generateSquares());
  // the line below takes a variable, "currentSquare", that represents the 
  // current player ('x' or 'o') -- this variable could have been named a lot
  // better. that is to say, it will inform whether the next square clicked will
  // be 'x' or 'o'
  //
  // "setCurrentSquare" defines the function that will change the currentSquare
  // to represent the next player AFTER the current player has chosen their 
  // square
  // 
  // "useState" informs
  // that the initial state of currentSquare will be "false", and that "false"
  // will represent "x", while "true" will represent "o"
  // ^^^ while it makes this easier, i think we could have not used a boolean 
  // to make this clearer
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
