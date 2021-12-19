// EVERY React component needs this import statement. 
import React from 'react';
import './Board.css';
// App will render Board, but Board will render Square, hence the code for 
// a Square component is imported here. 
import Square from './Square';
// here, the project is importing prop(erty) types so that it can strictly define 
// what the format/data type/object type of each Board component prop(erty)
// should be. 
import PropTypes from 'prop-types';

// generateSquareComponents accepts squares, which is the value of Board's 
// 'squares' prop(erty), and 'onClickCallback', which is the function assigned
// to Board's 'onClickCallback' prop(erty), as input. 
//
// using the above inputs, generateSquareComponents renders a Square component 
// for each object in a subarray of 'squares', since each object represents 
// the id number and value of a particular Square rendered within a Board. 
//
// additionally, each Square component is assigned the onClickCallback function 
// from the Board component into the corresponding onClickCallback function in 
// the Square component. 
//
// the formatting of the Square components rendered as 
// part of this Board component is handled by src/components/Board.css, while
// the formatting of each individual Square component is handled by code calling
// src/components/Square.css AS CALLED IN src/components/Square.js, NOT by 
// Board. 
//
// note that this implementation is VERY similar to the generateSquares() 
// function in src/App.js, line 103. 
// 
// the difference is instead of adding 
// javascript objects to the output array of arrays, we are adding Square 
// components. 
const generateSquareComponents = (squares, onClickCallback) => {
  // start an empty grid to hold each square
  let squareGrid = []; 
  
  // nested for loops to generate an array of arrays to represent a 3x3 grid
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {

      // here we define the Square component we want to render and assign the 
      // corresponding values to the particular Square component's prop(erty)s:
      const currentSquare = 
      <Square
        // which Square this is based on the row and column of the element 
        // in 'squares' the nested for loops are on
        id={squares[row][col].id} 
        value={squares[row][col].value} // 'x', 'o', or ''

        // Each React Component generally needs a "key" identifier, especially 
        // if you are rendering multiple of the same component. 
        //
        // here, since we know each Square has a unique id based on the row and
        // column of a corresponding object in 'squares', we use the same value
        // as we do the the Square 'id' prop(erty).
        //
        // this 'key' prop(erty) is here so that React doesn't get angry. 
        // since only one Board is rendered on this app, we didn't assign a key 
        // to our Board component (and we... didn't have to or feel like it...). 
        //
        // however, if we were rendering MULTIPLE Board components, Board would
        // also require a key prop(erty). 
        key={squares[row][col].id} 
        onClickCallback={onClickCallback}
      />

      // now that you've defined what the Square component should look like, add 
      // it to squareGrid. 
      squareGrid.push(currentSquare); 
    }
  }
  
  // exit for loop, you now have an array of arrays of Square components for 
  // Board to render in line 83. 
  return squareGrid; 
}

// function to render the Board component, accepting input prop(erty)s 
// 'squares' and 'onClickCallback' as explained starting line 112
const Board = ({ squares, onClickCallback }) => {

  // generates the board of Square components to be rendered, see line 12 for 
  // more information
  const squareList = generateSquareComponents(squares, onClickCallback);

  // i think we forgot to remove this line, whoops...
  //
  // general rule of thumb is to not have console.log in your frontend React app
  // unless it's needed (like say, you're trying to print debugging logs for 
  // your app -- that said, there are usually packages that will handle this for 
  // you so you don't have to write them yourself in the code, and they will 
  // also usually ensure those logs are only printed in certain modes, aka not 
  // on the deployed, public version i believe)
  console.log(squareList);

  // return function will display the Square components as organized in 
  // squareList, formatted as defined by the 'grid' CSS property in 
  // src/components/Board.css
  return <div className="grid" >
    {squareList}
  </div>

  // for more information on Square component, visit src/components/Square.js
  //
  // if you are on GITHUB, follow the link below: 
  // https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/components/Square.js
}

// this segment of code defines each REQUIRED prop(erty) that Board needs in 
// order to properly render, and what the format of the prop(erty) should be. 
Board.propTypes = {
  // squares should be an array
  squares: PropTypes.arrayOf(
    // ALL elements in the 'squares' array should also be an array
    PropTypes.arrayOf(
      // ALL elements in each array in a "squares" array should be an object
      // which has the keys id (must be a number) and value (must be a string). 
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired
      })
    )
  ),
  // Board MUST have a property called onClickCallback that MUST be a function. 
  onClickCallback: PropTypes.func.isRequired,
};

// NOTE: YOU NEED THIS LINE SO THAT src/App.js CAN IMPORT AND USE BOARD. 
export default Board;

// IF READING ON GITHUB:
//
// DISCLAIMER AND NAVIGATION: 
// https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/WALKTHOUGH_DISCLAIMER.md
//
// GO HERE TO WALK THROUGH App.js:
// https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/App.js
//
// GO HERE TO WALK THOUGH Square.js
// https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/components/Square.js
//
// please let me know if this helps! i am happy to do the same (albeit in a more
// readable format) for Inspiration Board. 